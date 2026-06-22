import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import CourseForm, { type CourseFormValues, type Option, type CourseRef } from '../../CourseForm'
import type { CourseLevelKey } from '../../levels'

export const dynamic = 'force-dynamic'

const strArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []

export default async function EditCoursePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [c, topics, courses] = await Promise.all([
    prisma.course.findUnique({ where: { id } }),
    prisma.topic.findMany({ orderBy: { name_vi: 'asc' }, select: { id: true, name_vi: true } }),
    prisma.course.findMany({ orderBy: { title_vi: 'asc' }, select: { slug: true, title_vi: true, topicId: true } }),
  ])
  if (!c) notFound()

  const values: CourseFormValues = {
    id: c.id,
    slug: c.slug,
    status: c.status,
    level: c.level as CourseLevelKey,
    topicId: c.topicId,
    durationHours: c.durationHours,
    durationSessions: c.durationSessions,
    title_vi: c.title_vi, title_en: c.title_en,
    description_vi: c.description_vi, description_en: c.description_en,
    learningOutcome_vi: c.learningOutcome_vi, learningOutcome_en: c.learningOutcome_en,
    targetAudience_vi: strArray(c.targetAudience_vi), targetAudience_en: strArray(c.targetAudience_en),
    modules_vi: strArray(c.modules_vi), modules_en: strArray(c.modules_en),
    finalProject_vi: c.finalProject_vi, finalProject_en: c.finalProject_en,
    deliveryFormat_vi: c.deliveryFormat_vi, deliveryFormat_en: c.deliveryFormat_en,
    tags: strArray(c.tags),
    prerequisite: c.prerequisite ?? '',
    priceOriginal: c.priceOriginal,
    priceSale: c.priceSale,
    imageUrl: c.imageUrl,
  }

  const topicOptions: Option[] = topics.map((t) => ({ value: t.id, label: t.name_vi }))
  const courseRefs: CourseRef[] = courses.map((cr) => ({ slug: cr.slug, title: cr.title_vi, topicId: cr.topicId }))

  return <CourseForm course={values} topics={topicOptions} courses={courseRefs} />
}
