/**
 * One-off backfill: extract Category & Author entities from the inline post
 * columns, then link every post via categoryId/authorId.
 *
 * Run with:  DATABASE_URL="..." npx tsx prisma/backfill-category-author.ts
 * Idempotent — safe to re-run (upserts by key/name).
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Raw read of the still-present inline columns (typed loosely on purpose).
  const posts = await prisma.$queryRawUnsafe<
    Array<{
      id: string
      categoryKey: string
      category_vi: string
      category_en: string
      authorName: string
      authorRole_vi: string
      authorRole_en: string
      authorImage: string
      authorImageAlt: string
    }>
  >(
    `SELECT id, categoryKey, category_vi, category_en,
            authorName, authorRole_vi, authorRole_en, authorImage, authorImageAlt
     FROM Post`,
  )

  console.log(`Found ${posts.length} posts to backfill`)

  const categoryByKey = new Map<string, string>()
  const authorByName = new Map<string, string>()

  for (const p of posts) {
    // --- Category (dedupe by key; fall back to a slug of the VI name) ---
    const key = p.categoryKey?.trim() || slugify(p.category_vi) || 'uncategorized'
    let categoryId = categoryByKey.get(key)
    if (!categoryId) {
      const cat = await prisma.category.upsert({
        where: { key },
        update: { name_vi: p.category_vi || key, name_en: p.category_en || key },
        create: { key, name_vi: p.category_vi || key, name_en: p.category_en || key },
      })
      categoryId = cat.id
      categoryByKey.set(key, categoryId)
    }

    // --- Author (dedupe by name) ---
    const name = p.authorName?.trim() || 'Intech ISC Editorial Team'
    let authorId = authorByName.get(name)
    if (!authorId) {
      // No unique on name → find-or-create manually.
      const existing = await prisma.author.findFirst({ where: { name } })
      const author =
        existing ??
        (await prisma.author.create({
          data: {
            name,
            role_vi: p.authorRole_vi || '',
            role_en: p.authorRole_en || '',
            image: p.authorImage || '/logo.svg',
            imageAlt: p.authorImageAlt || name,
          },
        }))
      authorId = author.id
      authorByName.set(name, authorId)
    }

    await prisma.post.update({ where: { id: p.id }, data: { categoryId, authorId } })
  }

  console.log(
    `Done. Categories: ${categoryByKey.size}, Authors: ${authorByName.size}. All posts linked.`,
  )
}

function slugify(input: string): string {
  return (input || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
