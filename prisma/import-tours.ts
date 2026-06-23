/**
 * One-off, idempotent import of study tours from the hardcoded snapshot into the DB.
 * Merges the EN and VI variants (matched by slug) into a single bilingual Tour row.
 * Safe to re-run.
 *
 *   DATABASE_URL=... npx tsx prisma/import-tours.ts
 */
import { PrismaClient, TourStatus } from '@prisma/client'
import { toursEn, toursVi, type TourData } from './tours-seed-data'

const prisma = new PrismaClient()

// Existing curated thumbnails (previously hardcoded on the listing page), by slug.
const COVER_BY_SLUG: Record<string, string> = {
  'vietnam-industry-culture-experience': '/images/tour-vietnam-culture.webp',
  'vietnam-tech-immersion': '/images/tour-vietnam-tech.webp',
  'global-industry-leadership': '/images/tour-global-leadership.webp',
  'international-internship-robotics-iot-smart-information-systems': '/images/tour-global-internship.webp',
}

async function main() {
  const viBySlug = new Map<string, TourData>(toursVi.map((t) => [t.slug, t]))
  let imported = 0

  for (let i = 0; i < toursEn.length; i++) {
    const en = toursEn[i]
    const vi = viBySlug.get(en.slug) ?? en // fall back to EN if a VI variant is missing

    const data = {
      status: 'PUBLISHED' as TourStatus,
      order: i,
      coverImage: COVER_BY_SLUG[en.slug] ?? '',
      duration_vi: vi.duration, duration_en: en.duration,
      name_vi: vi.name, name_en: en.name,
      subtitle_vi: vi.subtitle, subtitle_en: en.subtitle,
      destination_vi: vi.destination, destination_en: en.destination,
      price_vi: vi.price, price_en: en.price,
      groupSize_vi: vi.groupSize, groupSize_en: en.groupSize,
      certificate_vi: vi.certificate, certificate_en: en.certificate,
      whyJoin_vi: vi.whyJoin, whyJoin_en: en.whyJoin,
      customization_vi: vi.customization, customization_en: en.customization,
      highlights_vi: vi.highlights, highlights_en: en.highlights,
      audience_vi: vi.audience, audience_en: en.audience,
      itinerary_vi: vi.itinerary, itinerary_en: en.itinerary,
      includes_vi: vi.includes, includes_en: en.includes,
      excludes_vi: vi.excludes, excludes_en: en.excludes,
      gallery_vi: vi.gallery ?? [], gallery_en: en.gallery ?? [],
    }

    await prisma.tour.upsert({
      where: { slug: en.slug },
      update: data,
      create: { slug: en.slug, ...data },
    })
    imported++
  }

  console.log(`Tours upserted: ${imported}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
