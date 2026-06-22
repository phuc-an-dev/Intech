import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { insights } from '../src/data/insights'

const prisma = new PrismaClient()

async function seedPosts() {
  for (const i of insights) {
    // Category — dedupe by unique key.
    const category = await prisma.category.upsert({
      where: { key: i.categoryKey },
      update: { name_vi: i.category_vi, name_en: i.category_en },
      create: { key: i.categoryKey, name_vi: i.category_vi, name_en: i.category_en },
    })

    // Author — dedupe by name (no unique constraint → find-or-create).
    const author =
      (await prisma.author.findFirst({ where: { name: i.author.name } })) ??
      (await prisma.author.create({
        data: {
          name: i.author.name,
          role_vi: i.author.role_vi,
          role_en: i.author.role_en,
          image: i.author.image,
          imageAlt: i.author.imageAlt,
        },
      }))

    await prisma.post.upsert({
      where: { slug: i.slug },
      update: {},
      create: {
        slug: i.slug,
        status: 'PUBLISHED',
        lang: i.lang,
        categoryId: category.id,
        authorId: author.id,
        title_vi: i.title_vi,
        title_en: i.title_en,
        excerpt_vi: i.excerpt_vi,
        excerpt_en: i.excerpt_en,
        body_vi: i.body_vi,
        body_en: i.body_en,
        tags: i.tags,
        gradient: i.gradient,
        coverImage: i.coverImage ?? null,
        readTime: i.readTime,
        date: new Date(i.date),
        relatedCourseSlug: i.relatedCourseSlug || null,
      },
    })
  }
  console.log(`Seeded ${insights.length} posts`)
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) throw new Error('ADMIN_EMAIL / ADMIN_PASSWORD not set')
  if (password === 'change-me-before-seeding') {
    throw new Error('Set a real ADMIN_PASSWORD before seeding')
  }
  const passwordHash = await bcrypt.hash(password, 10)
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: 'Admin' },
  })
  console.log(`Seeded admin: ${email}`)
}

async function main() {
  await seedPosts()
  await seedAdmin()
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
