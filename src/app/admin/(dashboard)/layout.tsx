import type { ReactNode } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth, signOut } from '@/auth'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 border-r bg-white p-4">
        <div className="mb-6 font-bold text-[#002D62]">Intech Admin</div>
        <nav className="flex flex-col gap-1 text-sm">
          <Link href="/admin" className="rounded px-3 py-2 hover:bg-gray-100">Tổng quan</Link>
          <Link href="/admin/blog" className="rounded px-3 py-2 hover:bg-gray-100">Blog</Link>
        </nav>
        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/admin/login' })
          }}
          className="mt-6"
        >
          <button className="text-sm text-gray-500 hover:text-red-600">Đăng xuất</button>
        </form>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
