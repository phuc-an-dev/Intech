import { prisma } from '@/lib/db'
import CourseForm, { type Option, type CourseRef } from '../CourseForm'

export const dynamic = 'force-dynamic'

export default async function NewCoursePage() {
  const [topics, courses] = await Promise.all([
    prisma.topic.findMany({ orderBy: { name_vi: 'asc' }, select: { id: true, name_vi: true } }),
    prisma.course.findMany({ orderBy: { title_vi: 'asc' }, select: { slug: true, title_vi: true, topicId: true } }),
  ])
  const topicOptions: Option[] = topics.map((t) => ({ value: t.id, label: t.name_vi }))
  const courseRefs: CourseRef[] = courses.map((c) => ({ slug: c.slug, title: c.title_vi, topicId: c.topicId }))

  return <CourseForm topics={topicOptions} courses={courseRefs} />
}
