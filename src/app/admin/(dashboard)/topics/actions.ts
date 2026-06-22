'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db'
import { requireSession } from '../blog/actions'

const TopicSchema = z.object({
  id: z.string().optional(),
  name_vi: z.string().trim().min(1, 'Tên (VI) là bắt buộc'),
  name_en: z.string().trim().min(1, 'Tên (EN) là bắt buộc'),
  description_vi: z.string().trim().default(''),
  description_en: z.string().trim().default(''),
})

export type TopicInput = z.input<typeof TopicSchema>

/** Stable URL-safe slug derived from the Vietnamese name. */
function slugify(input: string): string {
  return (input || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = base || 'chu-de'
  let candidate = root
  let n = 1
  while (n < 1000) {
    const existing = await prisma.topic.findUnique({ where: { slug: candidate }, select: { id: true } })
    if (!existing || existing.id === excludeId) return candidate
    n += 1
    candidate = `${root}-${n}`
  }
  return `${root}-${Date.now()}`
}

export async function saveTopic(input: TopicInput): Promise<{ error: string } | void> {
  await requireSession()
  const parsed = TopicSchema.safeParse(input)
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ' }
  const { id, name_vi, name_en, description_vi, description_en } = parsed.data

  try {
    if (id) {
      // Keep the existing slug stable on edit (courses reference it).
      await prisma.topic.update({ where: { id }, data: { name_vi, name_en, description_vi, description_en } })
    } else {
      const slug = await uniqueSlug(slugify(name_vi))
      await prisma.topic.create({ data: { slug, name_vi, name_en, description_vi, description_en } })
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { error: 'Slug đã tồn tại, vui lòng đổi tên' }
    }
    return { error: 'Lưu thất bại, vui lòng thử lại' }
  }

  revalidatePath('/admin/topics')
  revalidatePath('/vi/courses')
  revalidatePath('/en/courses')
}

export async function deleteTopic(id: string): Promise<{ error: string } | void> {
  await requireSession()
  const count = await prisma.course.count({ where: { topicId: id } })
  if (count > 0) {
    return { error: `Không thể xóa: còn ${count} khóa học thuộc chủ đề này` }
  }
  try {
    await prisma.topic.delete({ where: { id } })
  } catch {
    // already gone
  }
  revalidatePath('/admin/topics')
}
