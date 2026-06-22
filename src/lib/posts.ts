import { prisma } from '@/lib/db'
import type { Post } from '@prisma/client'

export type PostRecord = Post

export function getPublishedPosts(): Promise<Post[]> {
  return prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { date: 'desc' },
  })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post || post.status !== 'PUBLISHED') return null
  return post
}

export function getPublishedSlugs(): Promise<{ slug: string }[]> {
  return prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
  })
}

type Localized = Pick<
  Post,
  | 'title_vi' | 'title_en'
  | 'excerpt_vi' | 'excerpt_en'
  | 'category_vi' | 'category_en'
  | 'body_vi' | 'body_en'
>

export function getPostTitle(p: Localized, locale: string): string {
  return locale === 'vi' ? p.title_vi : p.title_en
}
export function getPostExcerpt(p: Localized, locale: string): string {
  return locale === 'vi' ? p.excerpt_vi : p.excerpt_en
}
export function getPostCategory(p: Localized, locale: string): string {
  return locale === 'vi' ? p.category_vi : p.category_en
}
export function getPostBody(p: Localized, locale: string): string {
  return locale === 'vi' ? p.body_vi : p.body_en
}

export function getPostTags(p: Pick<Post, 'tags'>): string[] {
  return Array.isArray(p.tags) ? (p.tags as string[]) : []
}

export function formatPostDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(date)
}
