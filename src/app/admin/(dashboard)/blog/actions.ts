'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { auth } from '@/auth'

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

export async function deletePost(id: string) {
  await requireSession()
  const post = await prisma.post.findUnique({ where: { id }, select: { slug: true } })
  await prisma.post.delete({ where: { id } })
  revalidateBlog(post?.slug)
  revalidatePath('/admin/blog')
}
