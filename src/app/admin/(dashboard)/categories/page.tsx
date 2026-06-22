import { prisma } from '@/lib/db'
import CategoryManager, { type CategoryRow } from './CategoryManager'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name_vi: 'asc' },
    include: { _count: { select: { posts: true } } },
  })

  const rows: CategoryRow[] = categories.map((c) => ({
    id: c.id,
    key: c.key,
    name_vi: c.name_vi,
    name_en: c.name_en,
    postCount: c._count.posts,
  }))

  return <CategoryManager categories={rows} />
}
