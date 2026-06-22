import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [published, draft] = await Promise.all([
    prisma.post.count({ where: { status: 'PUBLISHED' } }),
    prisma.post.count({ where: { status: 'DRAFT' } }),
  ])
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[#002D62]">Tổng quan</h1>
      <div className="flex gap-4">
        <div className="rounded-2xl border bg-white p-6">
          <div className="text-3xl font-bold text-green-600">{published}</div>
          <div className="text-sm text-gray-500">Bài đã đăng</div>
        </div>
        <div className="rounded-2xl border bg-white p-6">
          <div className="text-3xl font-bold text-gray-400">{draft}</div>
          <div className="text-sm text-gray-500">Bài nháp</div>
        </div>
      </div>
    </div>
  )
}
