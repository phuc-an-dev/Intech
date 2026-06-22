import Link from 'next/link'
import { prisma } from '@/lib/db'
import { deletePost } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminBlogList() {
  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: 'desc' },
    select: { id: true, slug: true, title_vi: true, status: true, date: true },
  })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#002D62]">Blog</h1>
        <Link href="/admin/blog/new"
          className="rounded bg-[#002D62] px-4 py-2 text-sm font-semibold text-white">
          + Bài mới
        </Link>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b text-left text-gray-500">
            <th className="py-2 pr-4">Tiêu đề (VI)</th>
            <th className="py-2 pr-4">Trạng thái</th>
            <th className="py-2 pr-4">Ngày</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-2 pr-4">{p.title_vi}</td>
              <td className="py-2 pr-4">
                <span className={p.status === 'PUBLISHED' ? 'text-green-600' : 'text-gray-400'}>
                  {p.status === 'PUBLISHED' ? 'Đã đăng' : 'Nháp'}
                </span>
              </td>
              <td className="py-2 pr-4">{p.date.toISOString().slice(0, 10)}</td>
              <td className="py-2 text-right">
                <Link href={`/admin/blog/${p.id}/edit`}
                  className="mr-3 text-[#00A3C1] hover:underline">Sửa</Link>
                <form action={deletePost.bind(null, p.id)} className="inline">
                  <button className="text-red-600 hover:underline">Xóa</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
