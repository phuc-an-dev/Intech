'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'
import type { PostStatus } from '@prisma/client'

export async function requireSession() {
  const session = await auth()
  if (!session) redirect('/admin/login')
}

export function revalidateBlog(slug?: string) {
  revalidatePath('/vi/blog')
  revalidatePath('/en/blog')
  if (slug) {
    revalidatePath(`/vi/blog/${slug}`)
    revalidatePath(`/en/blog/${slug}`)
  }
}

export async function savePost(formData: FormData) {
  await requireSession()
  const get = (k: string) => (formData.get(k) as string | null)?.trim() ?? ''
  const id = get('id')
  const slug = get('slug')
  const tags = get('tags').split(',').map((t) => t.trim()).filter(Boolean)
  const status: PostStatus = get('status') === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT'

  const data = {
    slug,
    status,
    lang: get('lang') || 'vi',
    categoryKey: get('categoryKey'),
    category_vi: get('category_vi'),
    category_en: get('category_en'),
    title_vi: get('title_vi'),
    title_en: get('title_en'),
    excerpt_vi: get('excerpt_vi'),
    excerpt_en: get('excerpt_en'),
    body_vi: get('body_vi'),
    body_en: get('body_en'),
    tags,
    gradient: get('gradient') || 'from-[#002D62] to-blue-800',
    coverImage: get('coverImage') || null,
    readTime: parseInt(get('readTime')) || 5,
    date: get('date') ? new Date(get('date')) : new Date(),
    authorName: get('authorName') || 'Intech ISC Editorial Team',
    authorRole_vi: get('authorRole_vi'),
    authorRole_en: get('authorRole_en'),
    authorImage: get('authorImage') || '/logo.svg',
    authorImageAlt: get('authorImageAlt') || get('authorName') || 'Intech ISC',
    relatedCourseSlug: get('relatedCourseSlug') || null,
  }

  if (id) {
    await prisma.post.update({ where: { id }, data })
  } else {
    await prisma.post.create({ data })
  }
  revalidateBlog(slug)
  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}

export async function deletePost(id: string) {
  await requireSession()
  const post = await prisma.post.findUnique({ where: { id }, select: { slug: true } })
  await prisma.post.delete({ where: { id } })
  revalidateBlog(post?.slug)
  revalidatePath('/admin/blog')
}
