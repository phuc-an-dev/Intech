import { prisma } from '@/lib/db'
import TopicManager, { type TopicRow } from './TopicManager'

export const dynamic = 'force-dynamic'

export default async function TopicsPage() {
  const topics = await prisma.topic.findMany({
    orderBy: { name_vi: 'asc' },
    include: { _count: { select: { courses: true } } },
  })

  const rows: TopicRow[] = topics.map((t) => ({
    id: t.id,
    slug: t.slug,
    name_vi: t.name_vi,
    name_en: t.name_en,
    description_vi: t.description_vi,
    description_en: t.description_en,
    courseCount: t._count.courses,
  }))

  return <TopicManager topics={rows} />
}
