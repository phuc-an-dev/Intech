import { prisma } from '@/lib/db'
import TourTable, { type TourRow } from './TourTable'

export const dynamic = 'force-dynamic'

export default async function AdminTourList() {
  const tours = await prisma.tour.findMany({
    orderBy: [{ order: 'asc' }, { updatedAt: 'desc' }],
    select: { id: true, slug: true, name_vi: true, destination_vi: true, duration_vi: true, status: true, updatedAt: true },
  })

  const rows: TourRow[] = tours.map((t) => ({
    id: t.id,
    slug: t.slug,
    name_vi: t.name_vi,
    destination_vi: t.destination_vi,
    duration_vi: t.duration_vi,
    status: t.status,
    updatedAt: t.updatedAt.toISOString().slice(0, 16).replace('T', ' '),
  }))

  return <TourTable tours={rows} />
}
