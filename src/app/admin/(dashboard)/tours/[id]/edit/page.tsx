import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import TourForm, { type TourFormValues, type Highlight, type ItineraryRow, type GalleryItem } from '../../TourForm'

export const dynamic = 'force-dynamic'

const strArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
const objArray = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])

export default async function EditTourPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const t = await prisma.tour.findUnique({ where: { id } })
  if (!t) notFound()

  const values: TourFormValues = {
    id: t.id,
    slug: t.slug,
    status: t.status,
    order: t.order,
    coverImage: t.coverImage,
    duration_vi: t.duration_vi, duration_en: t.duration_en,
    name_vi: t.name_vi, name_en: t.name_en,
    subtitle_vi: t.subtitle_vi, subtitle_en: t.subtitle_en,
    destination_vi: t.destination_vi, destination_en: t.destination_en,
    price_vi: t.price_vi, price_en: t.price_en,
    groupSize_vi: t.groupSize_vi, groupSize_en: t.groupSize_en,
    certificate_vi: t.certificate_vi, certificate_en: t.certificate_en,
    whyJoin_vi: t.whyJoin_vi, whyJoin_en: t.whyJoin_en,
    customization_vi: t.customization_vi, customization_en: t.customization_en,
    highlights_vi: objArray<Highlight>(t.highlights_vi), highlights_en: objArray<Highlight>(t.highlights_en),
    audience_vi: strArray(t.audience_vi), audience_en: strArray(t.audience_en),
    itinerary_vi: objArray<ItineraryRow>(t.itinerary_vi), itinerary_en: objArray<ItineraryRow>(t.itinerary_en),
    includes_vi: strArray(t.includes_vi), includes_en: strArray(t.includes_en),
    excludes_vi: strArray(t.excludes_vi), excludes_en: strArray(t.excludes_en),
    gallery_vi: objArray<GalleryItem>(t.gallery_vi), gallery_en: objArray<GalleryItem>(t.gallery_en),
  }

  return <TourForm tour={values} />
}
