import { prisma } from '@/lib/db'
import BlogTable, { type BlogRow } from './BlogTable'

export const dynamic = 'force-dynamic'

export default async function AdminBlogList() {
  const posts = await prisma.post.findMany({
    orderBy: [{ pinned: 'desc' }, { updatedAt: 'desc' }],
    select: {
      id: true, slug: true, title_vi: true, status: true, date: true, updatedAt: true, pinned: true,
      category: { select: { name_vi: true } },
    },
  })

  const rows: BlogRow[] = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title_vi: p.title_vi,
    status: p.status,
    date: p.date.toISOString().slice(0, 10),
    updatedAt: p.updatedAt.toISOString().slice(0, 16).replace('T', ' '),
    pinned: p.pinned,
    category: p.category.name_vi,
  }))

  return <BlogTable posts={rows} />
}
