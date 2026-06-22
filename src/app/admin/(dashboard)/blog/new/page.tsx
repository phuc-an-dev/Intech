import { prisma } from '@/lib/db'
import PostForm, { type Option } from '../PostForm'

export const dynamic = 'force-dynamic'

export default async function NewPostPage() {
  const [categories, authors] = await Promise.all([
    prisma.category.findMany({ orderBy: { name_vi: 'asc' }, select: { id: true, name_vi: true, key: true } }),
    prisma.author.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])
  const categoryOptions: Option[] = categories.map((c) => ({ value: c.id, label: `${c.name_vi} (${c.key})` }))
  const authorOptions: Option[] = authors.map((a) => ({ value: a.id, label: a.name }))

  return <PostForm categories={categoryOptions} authors={authorOptions} />
}
