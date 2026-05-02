import { setRequestLocale } from 'next-intl/server'
import { getCourses, getTopics } from '@/lib/courses'
import CoursesClient from './CoursesClient'

export const revalidate = 60

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const [courses, topics] = await Promise.all([getCourses(locale), getTopics(locale)])

  return <CoursesClient courses={courses} topics={topics} />
}
