'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { Prisma, type CourseStatus, type CourseLevel } from '@prisma/client'
import { prisma } from '@/lib/db'
import { requireSession } from '../blog/actions'

function revalidateCourses(slug?: string) {
  revalidatePath('/vi/courses')
  revalidatePath('/en/courses')
  if (slug) {
    revalidatePath(`/vi/courses/${slug}`)
    revalidatePath(`/en/courses/${slug}`)
  }
}

/** ASCII slug from any title (handles Vietnamese diacritics). */
function slugify(input: string): string {
  return (input || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = base || 'khoa-hoc'
  let candidate = root
  let n = 1
  while (n < 1000) {
    const existing = await prisma.course.findUnique({ where: { slug: candidate }, select: { id: true } })
    if (!existing || existing.id === excludeId) return candidate
    n += 1
    candidate = `${root}-${n}`
  }
  return `${root}-${Date.now()}`
}

const strArray = z.array(z.string().trim().min(1)).default([])

const CourseInputSchema = z
  .object({
    id: z.string().optional(),
    slug: z.string().trim().optional(),
    status: z.enum(['DRAFT', 'PUBLISHED']),
    level: z.enum(['foundation', 'tools', 'application', 'advanced', 'strategic']),
    topicId: z.string().trim().min(1, 'Vui lòng chọn chủ đề'),
    durationHours: z.coerce.number().int().min(0).default(0),
    durationSessions: z.coerce.number().int().min(0).default(0),
    title_vi: z.string().trim().default(''),
    title_en: z.string().trim().default(''),
    description_vi: z.string().trim().default(''),
    description_en: z.string().trim().default(''),
    learningOutcome_vi: z.string().trim().default(''),
    learningOutcome_en: z.string().trim().default(''),
    targetAudience_vi: strArray,
    targetAudience_en: strArray,
    modules_vi: strArray,
    modules_en: strArray,
    finalProject_vi: z.string().trim().default(''),
    finalProject_en: z.string().trim().default(''),
    deliveryFormat_vi: z.string().trim().default(''),
    deliveryFormat_en: z.string().trim().default(''),
    tags: strArray,
    prerequisite: z.string().trim().optional(),
    priceOriginal: z.coerce.number().int().min(0).default(0),
    priceSale: z.coerce.number().int().min(0).nullable().default(null),
    imageUrl: z.string().trim().default(''),
  })
  .refine((d) => d.title_vi.length > 0 || d.title_en.length > 0, {
    message: 'Cần ít nhất một tiêu đề (VI hoặc EN)',
    path: ['title_vi'],
  })

export type CourseInput = z.input<typeof CourseInputSchema>

export async function saveCourse(input: CourseInput): Promise<{ error: string } | void> {
  await requireSession()

  const parsed = CourseInputSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ' }
  }
  const d = parsed.data

  const base = slugify(d.title_vi || d.title_en)
  const slug = d.id && d.slug ? d.slug : await uniqueSlug(base, d.id)

  const data = {
    slug,
    status: d.status as CourseStatus,
    level: d.level as CourseLevel,
    topicId: d.topicId,
    durationHours: d.durationHours,
    durationSessions: d.durationSessions,
    title_vi: d.title_vi,
    title_en: d.title_en,
    description_vi: d.description_vi,
    description_en: d.description_en,
    learningOutcome_vi: d.learningOutcome_vi,
    learningOutcome_en: d.learningOutcome_en,
    targetAudience_vi: d.targetAudience_vi,
    targetAudience_en: d.targetAudience_en,
    modules_vi: d.modules_vi,
    modules_en: d.modules_en,
    finalProject_vi: d.finalProject_vi,
    finalProject_en: d.finalProject_en,
    deliveryFormat_vi: d.deliveryFormat_vi || 'Online / Hybrid',
    deliveryFormat_en: d.deliveryFormat_en || d.deliveryFormat_vi || 'Online / Hybrid',
    tags: d.tags,
    prerequisite: d.prerequisite || null,
    priceOriginal: d.priceOriginal,
    priceSale: d.priceSale,
    imageUrl: d.imageUrl,
  }

  try {
    if (d.id) {
      await prisma.course.update({ where: { id: d.id }, data })
    } else {
      await prisma.course.create({ data })
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { error: 'Slug đã tồn tại, vui lòng đổi tiêu đề' }
    }
    return { error: 'Lưu thất bại, vui lòng thử lại' }
  }

  revalidateCourses(data.slug)
  revalidatePath('/admin/courses')
  redirect('/admin/courses')
}

export async function deleteCourse(id: string) {
  await requireSession()
  let slug: string | undefined
  try {
    const course = await prisma.course.delete({ where: { id }, select: { slug: true } })
    slug = course.slug
  } catch {
    // P2025 — already deleted
  }
  revalidateCourses(slug)
  revalidatePath('/admin/courses')
}
