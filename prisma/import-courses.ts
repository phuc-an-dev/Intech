/**
 * One-off, idempotent import of Topics + Courses from Google Sheets into the DB.
 * Reads the raw bilingual rows (both _vi and _en columns), upserts Topic by slug,
 * then upserts Course by slug linked to its topic. Safe to re-run.
 *
 *   DATABASE_URL=... GOOGLE_SHEET_ID=... npx tsx prisma/import-courses.ts
 */
import { PrismaClient, CourseLevel, CourseStatus } from '@prisma/client'
import { fetchCoursesSheet, fetchTopicsSheet } from '../src/lib/sheets'

const prisma = new PrismaClient()

const LEVELS = new Set<string>(['foundation', 'tools', 'application', 'advanced', 'strategic'])

function parsePipe(value: string): string[] {
  if (!value?.trim()) return []
  return value.split('|').map((s) => s.trim()).filter(Boolean)
}

function parseComma(value: string): string[] {
  if (!value?.trim()) return []
  return value.split(',').map((s) => s.trim()).filter(Boolean)
}

function courseImageUrl(row: Record<string, string>): string {
  const slug = row.slug?.trim()
  const canonical = `/images/courses/course-${slug}.webp`
  const imageUrl = row.image_url?.trim()
  if (!imageUrl) return canonical
  if (/^\/images\/courses\/[^/]+\.jpg$/i.test(imageUrl)) return canonical
  if (/^\/images\/course-[^/]+\.jpg$/i.test(imageUrl)) return canonical
  return imageUrl
}

async function main() {
  // ---- Topics ----
  const topicRows = (await fetchTopicsSheet()).filter((r) => r.slug?.trim())
  const topicIdBySlug = new Map<string, string>()

  for (const r of topicRows) {
    const slug = r.slug.trim()
    const data = {
      name_vi: r.name_vi ?? '',
      name_en: r.name_en ?? r.name_vi ?? '',
      description_vi: r.description_vi ?? '',
      description_en: r.description_en ?? r.description_vi ?? '',
    }
    const topic = await prisma.topic.upsert({
      where: { slug },
      update: data,
      create: { slug, ...data },
    })
    topicIdBySlug.set(slug, topic.id)
  }
  console.log(`Topics upserted: ${topicIdBySlug.size}`)

  // ---- Courses ----
  const courseRows = (await fetchCoursesSheet()).filter((r) => r.slug?.trim())
  let imported = 0
  let skipped = 0

  for (const r of courseRows) {
    const slug = r.slug.trim()
    const topicSlug = r.topic_slug?.trim() ?? ''
    let topicId = topicIdBySlug.get(topicSlug)

    // Topic referenced by a course but missing from the topics sheet → create a stub.
    if (!topicId && topicSlug) {
      const stub = await prisma.topic.upsert({
        where: { slug: topicSlug },
        update: {},
        create: {
          slug: topicSlug,
          name_vi: topicSlug,
          name_en: topicSlug,
          description_vi: '',
          description_en: '',
        },
      })
      topicId = stub.id
      topicIdBySlug.set(topicSlug, topicId)
    }

    if (!topicId) {
      console.warn(`  skip "${slug}": no topic_slug`)
      skipped++
      continue
    }

    const level = (LEVELS.has(r.level) ? r.level : 'foundation') as CourseLevel
    const status = (r.status === 'published' ? 'PUBLISHED' : 'DRAFT') as CourseStatus
    const priceSaleRaw = r.price_sale?.trim() ? parseInt(r.price_sale) : NaN

    const data = {
      topicId,
      level,
      status,
      durationHours: parseInt(r.duration_hours) || 0,
      durationSessions: parseInt(r.duration_sessions) || 0,
      title_vi: r.title_vi ?? '',
      title_en: r.title_en ?? r.title_vi ?? '',
      description_vi: r.description_vi ?? '',
      description_en: r.description_en ?? r.description_vi ?? '',
      learningOutcome_vi: r.learning_outcome_vi ?? '',
      learningOutcome_en: r.learning_outcome_en ?? r.learning_outcome_vi ?? '',
      targetAudience_vi: parsePipe(r.target_audience_vi ?? ''),
      targetAudience_en: parsePipe(r.target_audience_en ?? r.target_audience_vi ?? ''),
      modules_vi: parsePipe(r.modules_vi ?? ''),
      modules_en: parsePipe(r.modules_en ?? r.modules_vi ?? ''),
      finalProject_vi: r.final_project_vi ?? '',
      finalProject_en: r.final_project_en ?? r.final_project_vi ?? '',
      deliveryFormat_vi: r.delivery_format_vi ?? 'Online / Hybrid',
      deliveryFormat_en: r.delivery_format_en ?? r.delivery_format_vi ?? 'Online / Hybrid',
      tags: parseComma(r.tags ?? ''),
      prerequisite: r.prerequisite?.trim() || null,
      priceOriginal: parseInt(r.price_original) || 0,
      priceSale: Number.isNaN(priceSaleRaw) ? null : priceSaleRaw,
      imageUrl: courseImageUrl(r),
    }

    await prisma.course.upsert({
      where: { slug },
      update: data,
      create: { slug, ...data },
    })
    imported++
  }

  console.log(`Courses upserted: ${imported}, skipped: ${skipped}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
