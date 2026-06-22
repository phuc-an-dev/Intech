import { prisma } from '@/lib/db'
import AuthorManager, { type AuthorRow } from './AuthorManager'

export const dynamic = 'force-dynamic'

export default async function AuthorsPage() {
  const authors = await prisma.author.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { posts: true } } },
  })

  const rows: AuthorRow[] = authors.map((a) => ({
    id: a.id,
    name: a.name,
    role_vi: a.role_vi,
    role_en: a.role_en,
    image: a.image,
    imageAlt: a.imageAlt,
    postCount: a._count.posts,
  }))

  return <AuthorManager authors={rows} />
}
