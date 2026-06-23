import { prisma } from '@/lib/db'
import type { Tour } from '@prisma/client'

export type ItineraryRow = { period: string; theme: string; activities: string }
export type TourHighlight = { title: string; desc: string }

export type TourData = {
  slug: string
  coverImage: string
  duration: string
  name: string
  subtitle: string
  destination: string
  price: string
  groupSize: string
  certificate: string
  whyJoin: string
  highlights: TourHighlight[]
  audience: string[]
  itinerary: ItineraryRow[]
  includes: string[]
  excludes: string[]
  customization: string
  gallery?: Array<{ src?: string; alt: string; name: string }>
}

const isVi = (locale: string) => locale === 'vi'

function toTourData(t: Tour, locale: string): TourData {
  const v = isVi(locale)
  const pick = <T,>(vi: T, en: T): T => (v ? vi : en)
  return {
    slug: t.slug,
    coverImage: t.coverImage,
    duration: pick(t.duration_vi, t.duration_en),
    name: pick(t.name_vi, t.name_en),
    subtitle: pick(t.subtitle_vi, t.subtitle_en),
    destination: pick(t.destination_vi, t.destination_en),
    price: pick(t.price_vi, t.price_en),
    groupSize: pick(t.groupSize_vi, t.groupSize_en),
    certificate: pick(t.certificate_vi, t.certificate_en),
    whyJoin: pick(t.whyJoin_vi, t.whyJoin_en),
    customization: pick(t.customization_vi, t.customization_en),
    highlights: pick(t.highlights_vi, t.highlights_en) as TourHighlight[],
    audience: pick(t.audience_vi, t.audience_en) as string[],
    itinerary: pick(t.itinerary_vi, t.itinerary_en) as ItineraryRow[],
    includes: pick(t.includes_vi, t.includes_en) as string[],
    excludes: pick(t.excludes_vi, t.excludes_en) as string[],
    gallery: pick(t.gallery_vi, t.gallery_en) as TourData['gallery'],
  }
}

export async function getTourBySlug(slug: string, locale: string): Promise<TourData | undefined> {
  const tour = await prisma.tour.findFirst({ where: { slug, status: 'PUBLISHED' } })
  return tour ? toTourData(tour, locale) : undefined
}

export interface TourCard {
  slug: string
  coverImage: string
  name: string
  duration: string
  destination: string
  price: string
  highlights: string[]
}

/** Lightweight published tours for the listing page (cards). */
export async function getToursList(locale: string): Promise<TourCard[]> {
  const tours = await prisma.tour.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  })
  const v = isVi(locale)
  return tours.map((t) => {
    const highlights = (v ? t.highlights_vi : t.highlights_en) as TourHighlight[] | null
    return {
      slug: t.slug,
      coverImage: t.coverImage,
      name: v ? t.name_vi : t.name_en,
      duration: v ? t.duration_vi : t.duration_en,
      destination: v ? t.destination_vi : t.destination_en,
      price: v ? t.price_vi : t.price_en,
      highlights: (Array.isArray(highlights) ? highlights : []).slice(0, 3).map((h) => h.title).filter(Boolean),
    }
  })
}

export async function getAllTourSlugs(): Promise<{ slug: string }[]> {
  const tours = await prisma.tour.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    select: { slug: true },
  })
  return tours
}
