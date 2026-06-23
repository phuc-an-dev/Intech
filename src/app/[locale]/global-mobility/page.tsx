import { setRequestLocale } from 'next-intl/server'
import { getToursList } from '@/data/tours'
import GlobalMobilityClient from './GlobalMobilityClient'

export const revalidate = 60

export default async function GlobalMobilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const tours = await getToursList(locale)
  return <GlobalMobilityClient tours={tours} />
}
