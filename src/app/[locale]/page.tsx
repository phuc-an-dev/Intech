import { setRequestLocale } from 'next-intl/server'
import { getCourses } from '@/lib/courses'
import HomeClient from './HomeClient'

export const revalidate = 60

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const allCourses = await getCourses(locale)
  const featuredCourses = allCourses.slice(0, 3)

  return <HomeClient featuredCourses={featuredCourses} />
}
