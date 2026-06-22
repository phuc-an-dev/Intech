'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db'
import { requireSession } from '../blog/actions'

const CategorySchema = z.object({
  id: z.string().optional(),
  name_vi: z.string().trim().min(1, 'Tên (VI) là bắt buộc'),
  name_en: z.string().trim().min(1, 'Tên (EN) là bắt buộc'),
})

export type CategoryInput = z.input<typeof CategorySchema>

/** Stable URL-safe key derived from the Vietnamese name. */
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

async function uniqueKey(base: string, excludeId?: string): Promise<string> {
  const root = base || 'danh-muc'
  let candidate = root
  let n = 1
  while (n < 1000) {
    const existing = await prisma.category.findUnique({ where: { key: candidate }, select: { id: true } })
    if (!existing || existing.id === excludeId) return candidate
    n += 1
    candidate = `${root}-${n}`
  }
  return `${root}-${Date.now()}`
}

export async function saveCategory(input: CategoryInput): Promise<{ error: string } | void> {
  await requireSession()
  const parsed = CategorySchema.safeParse(input)
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ' }
  const { id, name_vi, name_en } = parsed.data

  try {
    if (id) {
      // Keep the existing key stable on edit (it may be referenced elsewhere).
      await prisma.category.update({ where: { id }, data: { name_vi, name_en } })
    } else {
      const key = await uniqueKey(slugify(name_vi))
      await prisma.category.create({ data: { key, name_vi, name_en } })
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { error: 'Key đã tồn tại, vui lòng chọn key khác' }
    }
    return { error: 'Lưu thất bại, vui lòng thử lại' }
  }

  revalidatePath('/admin/categories')
  revalidatePath('/vi/blog')
  revalidatePath('/en/blog')
}

export async function deleteCategory(id: string): Promise<{ error: string } | void> {
  await requireSession()
  const count = await prisma.post.count({ where: { categoryId: id } })
  if (count > 0) {
    return { error: `Không thể xóa: còn ${count} bài viết thuộc danh mục này` }
  }
  try {
    await prisma.category.delete({ where: { id } })
  } catch {
    // already gone
  }
  revalidatePath('/admin/categories')
}
