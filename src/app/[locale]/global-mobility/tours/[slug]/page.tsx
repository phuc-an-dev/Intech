import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getTourBySlug, getAllTourSlugs } from '@/data/tours'
import TourDetailClient from './TourDetailClient'

export function generateStaticParams() {
  return getAllTourSlugs()
}

export async function generateMetadata(props: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await props.params
  const tour = getTourBySlug(slug, locale)
  if (!tour) return { title: 'Tour not found' }
  return {
    title: `${tour.name} | Intech ISC`,
    description: tour.whyJoin.slice(0, 160),
  }
}

export default async function TourDetailPage(props: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await props.params
  setRequestLocale(locale)

  const tour = getTourBySlug(slug, locale)
  if (!tour) notFound()

  const t = await getTranslations({ locale, namespace: 'globalMobility' })

  const labels = {
    whyTitle: t('tour_detail_why_title'),
    highlightsTitle: t('tour_detail_highlights_title'),
    whoTitle: t('tour_detail_who_title'),
    itineraryTitle: t('tour_detail_itinerary_title'),
    feeTitle: t('tour_detail_fee_title'),
    includesTitle: t('tour_detail_includes_title'),
    excludesTitle: t('tour_detail_excludes_title'),
    customTitle: t('tour_detail_custom_title'),
    cta: t('tour_detail_cta'),
    back: t('tour_detail_back'),
    groupLabel: t('tour_detail_group_label'),
    certificateLabel: t('tour_certificate_label'),
  }

  return <TourDetailClient tour={tour} labels={labels} />
}
