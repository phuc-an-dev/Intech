import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import PostForm, { type PostFormValues, type Option } from '../../PostForm'

export const dynamic = 'force-dynamic'

export default async function EditPostPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const [p, categories, authors] = await Promise.all([
    prisma.post.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name_vi: 'asc' }, select: { id: true, name_vi: true, key: true } }),
    prisma.author.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ])
  if (!p) notFound()

  const values: PostFormValues = {
    id: p.id,
    slug: p.slug,
    status: p.status,
    lang: p.lang,
    categoryId: p.categoryId,
    authorId: p.authorId,
    title_vi: p.title_vi,
    title_en: p.title_en,
    excerpt_vi: p.excerpt_vi,
    excerpt_en: p.excerpt_en,
    body_vi: p.body_vi,
    body_en: p.body_en,
    tags: (Array.isArray(p.tags) ? (p.tags as string[]) : []).join(', '),
    gradient: p.gradient,
    coverImage: p.coverImage ?? '',
    readTime: String(p.readTime),
    date: p.date.toISOString().slice(0, 10),
    relatedCourseSlug: p.relatedCourseSlug ?? '',
  }

  const categoryOptions: Option[] = categories.map((c) => ({ value: c.id, label: `${c.name_vi} (${c.key})` }))
  const authorOptions: Option[] = authors.map((a) => ({ value: a.id, label: a.name }))

  return <PostForm post={values} categories={categoryOptions} authors={authorOptions} />
}
