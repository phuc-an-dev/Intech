import { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getCourses, getTopics } from '@/lib/courses'
import { buildSiteMetadata } from '@/lib/metadata'
import CoursesClient from './CoursesClient'

export const revalidate = 60

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({ locale, namespace: 'courses' })
  const title = `${t('page_title')} | Intech Global Academy`
  const description = t('page_description')
  return buildSiteMetadata({
    locale,
    path: '/courses',
    title,
    description,
    image: '/og/og-courses.webp',
  })
}

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const [courses, topics] = await Promise.all([getCourses(locale), getTopics(locale)])

  return <CoursesClient courses={courses} topics={topics} />
}
