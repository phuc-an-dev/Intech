import { prisma } from '@/lib/db'
import CourseTable, { type CourseRow } from './CourseTable'
import type { CourseLevelKey } from './levels'

export const dynamic = 'force-dynamic'

export default async function AdminCourseList() {
  const courses = await prisma.course.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true, slug: true, title_vi: true, level: true, status: true,
      priceOriginal: true, priceSale: true, updatedAt: true,
      topic: { select: { name_vi: true } },
    },
  })

  const rows: CourseRow[] = courses.map((c) => ({
    id: c.id,
    slug: c.slug,
    title_vi: c.title_vi,
    topicName: c.topic.name_vi,
    level: c.level as CourseLevelKey,
    status: c.status,
    priceOriginal: c.priceOriginal,
    priceSale: c.priceSale,
    updatedAt: c.updatedAt.toISOString().slice(0, 16).replace('T', ' '),
  }))

  return <CourseTable courses={rows} />
}
