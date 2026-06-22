import { prisma } from '@/lib/db'
import type { Post, Category, Author } from '@prisma/client'

/** A post with its category and author relations loaded. */
export type PostWithRelations = Post & { category: Category; author: Author }

const withRelations = { category: true, author: true } as const

export function getPublishedPosts(): Promise<PostWithRelations[]> {
  // Pinned post (at most one) floats to the top → becomes the featured article.
  return prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: [{ pinned: 'desc' }, { date: 'desc' }],
    include: withRelations,
  })
}

export async function getPostBySlug(slug: string): Promise<PostWithRelations | null> {
  const post = await prisma.post.findUnique({ where: { slug }, include: withRelations })
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
  'title_vi' | 'title_en' | 'excerpt_vi' | 'excerpt_en' | 'body_vi' | 'body_en'
>

export function getPostTitle(p: Localized, locale: string): string {
  return locale === 'vi' ? p.title_vi : p.title_en
}
export function getPostExcerpt(p: Localized, locale: string): string {
  return locale === 'vi' ? p.excerpt_vi : p.excerpt_en
}
export function getPostBody(p: Localized, locale: string): string {
  return locale === 'vi' ? p.body_vi : p.body_en
}

export function getPostCategory(p: { category: Pick<Category, 'name_vi' | 'name_en'> }, locale: string): string {
  return locale === 'vi' ? p.category.name_vi : p.category.name_en
}

export function getPostAuthorRole(p: { author: Pick<Author, 'role_vi' | 'role_en'> }, locale: string): string {
  return locale === 'vi' ? p.author.role_vi : p.author.role_en
}

export function getPostTags(p: Pick<Post, 'tags'>): string[] {
  return Array.isArray(p.tags) ? (p.tags as string[]) : []
}

export function formatPostDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(date)
}
