import { prisma } from '@/lib/db'
import DashboardView, { type RecentPost } from './DashboardView'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [
    total, published, draft,
    courses, coursesPublished,
    tours, topics, categories, authors,
    posts,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: 'PUBLISHED' } }),
    prisma.post.count({ where: { status: 'DRAFT' } }),
    prisma.course.count(),
    prisma.course.count({ where: { status: 'PUBLISHED' } }),
    prisma.tour.count(),
    prisma.topic.count(),
    prisma.category.count(),
    prisma.author.count(),
    prisma.post.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { id: true, title_vi: true, status: true, updatedAt: true },
    }),
  ])

  const recent: RecentPost[] = posts.map((p) => ({
    id: p.id,
    title_vi: p.title_vi,
    status: p.status,
    updatedAt: p.updatedAt.toISOString().slice(0, 10),
  }))

  return (
    <DashboardView
      stats={{ total, published, draft, courses, coursesPublished, tours, topics, categories, authors }}
      recent={recent}
    />
  )
}
