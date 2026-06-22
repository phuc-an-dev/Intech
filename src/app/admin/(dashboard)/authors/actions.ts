'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { requireSession } from '../blog/actions'

const AuthorSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, 'Tên là bắt buộc'),
  role_vi: z.string().trim().default(''),
  role_en: z.string().trim().default(''),
  image: z.string().trim().default('/logo.svg'),
  imageAlt: z.string().trim().default(''),
})

export type AuthorInput = z.input<typeof AuthorSchema>

export async function saveAuthor(input: AuthorInput): Promise<{ error: string } | void> {
  await requireSession()
  const parsed = AuthorSchema.safeParse(input)
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ' }
  const { id, name, role_vi, role_en } = parsed.data
  const image = parsed.data.image || '/logo.svg'
  const imageAlt = parsed.data.imageAlt || name

  try {
    if (id) {
      await prisma.author.update({ where: { id }, data: { name, role_vi, role_en, image, imageAlt } })
    } else {
      await prisma.author.create({ data: { name, role_vi, role_en, image, imageAlt } })
    }
  } catch {
    return { error: 'Lưu thất bại, vui lòng thử lại' }
  }

  revalidatePath('/admin/authors')
  revalidatePath('/vi/blog')
  revalidatePath('/en/blog')
}

export async function deleteAuthor(id: string): Promise<{ error: string } | void> {
  await requireSession()
  const count = await prisma.post.count({ where: { authorId: id } })
  if (count > 0) {
    return { error: `Không thể xóa: còn ${count} bài viết của tác giả này` }
  }
  try {
    await prisma.author.delete({ where: { id } })
  } catch {
    // already gone
  }
  revalidatePath('/admin/authors')
}
