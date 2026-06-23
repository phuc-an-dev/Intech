'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { Prisma, type TourStatus } from '@prisma/client'
import { prisma } from '@/lib/db'
import { requireSession } from '../blog/actions'

function revalidateTours(slug?: string) {
  revalidatePath('/vi/global-mobility')
  revalidatePath('/en/global-mobility')
  if (slug) {
    revalidatePath(`/vi/global-mobility/tours/${slug}`)
    revalidatePath(`/en/global-mobility/tours/${slug}`)
  }
}

function slugify(input: string): string {
  return (input || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const root = base || 'study-tour'
  let candidate = root
  let n = 1
  while (n < 1000) {
    const existing = await prisma.tour.findUnique({ where: { slug: candidate }, select: { id: true } })
    if (!existing || existing.id === excludeId) return candidate
    n += 1
    candidate = `${root}-${n}`
  }
  return `${root}-${Date.now()}`
}

const strArr = z.array(z.string().trim().min(1)).default([])
const highlight = z.object({ title: z.string().trim().default(''), desc: z.string().trim().default('') })
const itineraryRow = z.object({
  period: z.string().trim().default(''),
  theme: z.string().trim().default(''),
  activities: z.string().trim().default(''),
})
const galleryItem = z.object({
  src: z.string().trim().default(''),
  alt: z.string().trim().default(''),
  name: z.string().trim().default(''),
})

const bilingualText = () => z.string().trim().default('')

const TourInputSchema = z
  .object({
    id: z.string().optional(),
    slug: z.string().trim().optional(),
    status: z.enum(['DRAFT', 'PUBLISHED']),
    order: z.coerce.number().int().min(0).default(0),
    duration_vi: bilingualText(), duration_en: bilingualText(),
    name_vi: bilingualText(), name_en: bilingualText(),
    subtitle_vi: bilingualText(), subtitle_en: bilingualText(),
    destination_vi: bilingualText(), destination_en: bilingualText(),
    price_vi: bilingualText(), price_en: bilingualText(),
    groupSize_vi: bilingualText(), groupSize_en: bilingualText(),
    certificate_vi: bilingualText(), certificate_en: bilingualText(),
    whyJoin_vi: bilingualText(), whyJoin_en: bilingualText(),
    customization_vi: bilingualText(), customization_en: bilingualText(),
    highlights_vi: z.array(highlight).default([]), highlights_en: z.array(highlight).default([]),
    audience_vi: strArr, audience_en: strArr,
    itinerary_vi: z.array(itineraryRow).default([]), itinerary_en: z.array(itineraryRow).default([]),
    includes_vi: strArr, includes_en: strArr,
    excludes_vi: strArr, excludes_en: strArr,
    gallery_vi: z.array(galleryItem).default([]), gallery_en: z.array(galleryItem).default([]),
  })
  .refine((d) => d.name_vi.length > 0 || d.name_en.length > 0, {
    message: 'Cần ít nhất một tên tour (VI hoặc EN)',
    path: ['name_vi'],
  })

export type TourInput = z.input<typeof TourInputSchema>

// Drop rows whose every field is blank (empty Form.List entries).
const cleanRows = <T extends Record<string, string>>(rows: T[]): T[] =>
  rows.filter((r) => Object.values(r).some((val) => (val ?? '').trim() !== ''))

export async function saveTour(input: TourInput): Promise<{ error: string } | void> {
  await requireSession()
  const parsed = TourInputSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ' }
  }
  const d = parsed.data

  const base = slugify(d.name_en || d.name_vi)
  const slug = d.id && d.slug ? d.slug : await uniqueSlug(base, d.id)

  const data = {
    slug,
    status: d.status as TourStatus,
    order: d.order,
    duration_vi: d.duration_vi, duration_en: d.duration_en,
    name_vi: d.name_vi, name_en: d.name_en,
    subtitle_vi: d.subtitle_vi, subtitle_en: d.subtitle_en,
    destination_vi: d.destination_vi, destination_en: d.destination_en,
    price_vi: d.price_vi, price_en: d.price_en,
    groupSize_vi: d.groupSize_vi, groupSize_en: d.groupSize_en,
    certificate_vi: d.certificate_vi, certificate_en: d.certificate_en,
    whyJoin_vi: d.whyJoin_vi, whyJoin_en: d.whyJoin_en,
    customization_vi: d.customization_vi, customization_en: d.customization_en,
    highlights_vi: cleanRows(d.highlights_vi), highlights_en: cleanRows(d.highlights_en),
    audience_vi: d.audience_vi, audience_en: d.audience_en,
    itinerary_vi: cleanRows(d.itinerary_vi), itinerary_en: cleanRows(d.itinerary_en),
    includes_vi: d.includes_vi, includes_en: d.includes_en,
    excludes_vi: d.excludes_vi, excludes_en: d.excludes_en,
    gallery_vi: cleanRows(d.gallery_vi), gallery_en: cleanRows(d.gallery_en),
  }

  try {
    if (d.id) {
      await prisma.tour.update({ where: { id: d.id }, data })
    } else {
      await prisma.tour.create({ data })
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      return { error: 'Slug đã tồn tại, vui lòng đổi tên tour' }
    }
    return { error: 'Lưu thất bại, vui lòng thử lại' }
  }

  revalidateTours(data.slug)
  revalidatePath('/admin/tours')
  redirect('/admin/tours')
}

export async function deleteTour(id: string) {
  await requireSession()
  let slug: string | undefined
  try {
    const tour = await prisma.tour.delete({ where: { id }, select: { slug: true } })
    slug = tour.slug
  } catch {
    // P2025 — already deleted
  }
  revalidateTours(slug)
  revalidatePath('/admin/tours')
}
