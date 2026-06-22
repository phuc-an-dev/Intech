'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { Prisma, type PostStatus } from '@prisma/client'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

export async function requireSession() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  return session
}

function revalidateBlog(slug?: string) {
  revalidatePath('/vi/blog')
  revalidatePath('/en/blog')
  if (slug) {
    revalidatePath(`/vi/blog/${slug}`)
    revalidatePath(`/en/blog/${slug}`)
  }
}

/** ASCII slug from any title (handles Vietnamese diacritics). */
function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

/** Returns `base`, or `base-2`, `base-3`… so the slug is unique (excluding self). */
async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = base || 'bai-viet'
  let candidate = root
  let n = 1
  // Bounded loop — collisions are rare.
  while (n < 1000) {
    const existing = await prisma.post.findUnique({
      where: { slug: candidate },
      select: { id: true },
    })
    if (!existing || existing.id === excludeId) return candidate
    n += 1
    candidate = `${root}-${n}`
  }
  return `${root}-${Date.now()}`
}

const PostInputSchema = z
  .object({
    id: z.string().optional(),
    slug: z.string().trim().optional(),
    status: z.enum(['DRAFT', 'PUBLISHED']),
    lang: z.string().trim().default('vi'),
    categoryId: z.string().trim().min(1, 'Vui lòng chọn danh mục'),
    authorId: z.string().trim().min(1, 'Vui lòng chọn tác giả'),
    title_vi: z.string().trim().default(''),
    title_en: z.string().trim().default(''),
    excerpt_vi: z.string().trim().default(''),
    excerpt_en: z.string().trim().default(''),
    body_vi: z.string().default(''),
    body_en: z.string().default(''),
    tags: z.string().default(''),
    gradient: z.string().trim().default('from-[#002D62] to-blue-800'),
    coverImage: z.string().trim().optional(),
    readTime: z.coerce.number().int().positive().default(5),
    date: z.string().trim().optional(), // YYYY-MM-DD
    relatedCourseSlug: z.string().trim().optional(),
  })
  .refine((d) => d.title_vi.length > 0 || d.title_en.length > 0, {
    message: 'Cần ít nhất một tiêu đề (VI hoặc EN)',
    path: ['title_vi'],
  })

export type PostInput = z.input<typeof PostInputSchema>

export async function savePost(input: PostInput): Promise<{ error: string } | void> {
  await requireSession()

  const parsed = PostInputSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ' }
  }
  const d = parsed.data

  // Slug: auto-generated from the title. On edit we keep the existing slug
  // (stable public URL) unless it is somehow empty.
  const base = slugify(d.title_vi || d.title_en)
  const slug =
    d.id && d.slug ? d.slug : await uniqueSlug(base, d.id)

  const data = {
    slug,
    status: d.status as PostStatus,
    lang: d.lang || 'vi',
    categoryId: d.categoryId,
    authorId: d.authorId,
    title_vi: d.title_vi,
    title_en: d.title_en,
    excerpt_vi: d.excerpt_vi,
    excerpt_en: d.excerpt_en,
    body_vi: d.body_vi,
    body_en: d.body_en,
    tags: d.tags.split(',').map((t) => t.trim()).filter(Boolean),
    gradient: d.gradient || 'from-[#002D62] to-blue-800',
    coverImage: d.coverImage || null,
    readTime: d.readTime,
    date: d.date ? new Date(d.date) : new Date(),
    relatedCourseSlug: d.relatedCourseSlug || null,
  }

  try {
    if (d.id) {
      await prisma.post.update({ where: { id: d.id }, data })
    } else {
      await prisma.post.create({ data })
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { error: 'Slug đã tồn tại, vui lòng chọn slug khác' }
    }
    return { error: 'Lưu thất bại, vui lòng thử lại' }
  }

  revalidateBlog(data.slug)
  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}

/**
 * Pin a post (only one can be pinned at a time). Pinning a new one unpins the
 * rest in a single transaction; pinning an already-pinned post unpins it.
 */
export async function togglePin(id: string) {
  await requireSession()
  const post = await prisma.post.findUnique({ where: { id }, select: { pinned: true } })
  if (!post) return

  if (post.pinned) {
    await prisma.post.update({ where: { id }, data: { pinned: false } })
  } else {
    await prisma.$transaction([
      prisma.post.updateMany({ where: { pinned: true }, data: { pinned: false } }),
      prisma.post.update({ where: { id }, data: { pinned: true } }),
    ])
  }

  revalidateBlog()
  revalidatePath('/admin/blog')
}

export async function deletePost(id: string) {
  await requireSession()
  let slug: string | undefined
  try {
    const post = await prisma.post.delete({ where: { id }, select: { slug: true } })
    slug = post.slug
  } catch {
    // P2025 — already deleted, nothing to do
  }
  revalidateBlog(slug)
  revalidatePath('/admin/blog')
}
