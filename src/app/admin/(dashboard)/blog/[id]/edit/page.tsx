import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import PostForm, { type PostFormValues } from '../../PostForm'

export const dynamic = 'force-dynamic'

export default async function EditPostPage(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params
  const p = await prisma.post.findUnique({ where: { id } })
  if (!p) notFound()

  const values: PostFormValues = {
    id: p.id,
    slug: p.slug,
    status: p.status,
    lang: p.lang,
    categoryKey: p.categoryKey,
    category_vi: p.category_vi,
    category_en: p.category_en,
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
    authorName: p.authorName,
    authorRole_vi: p.authorRole_vi,
    authorRole_en: p.authorRole_en,
    authorImage: p.authorImage,
    authorImageAlt: p.authorImageAlt,
    relatedCourseSlug: p.relatedCourseSlug ?? '',
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#002D62]">Sửa bài</h1>
      <PostForm post={values} />
    </div>
  )
}
