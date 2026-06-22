import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { auth, signOut } from '@/auth'
import AdminShell from './AdminShell'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  async function handleSignOut() {
    'use server'
    await signOut({ redirectTo: '/admin/login' })
  }

  return (
    <AdminShell
      userName={session.user?.name ?? 'Admin'}
      userEmail={session.user?.email ?? ''}
      onSignOut={handleSignOut}
    >
      {children}
    </AdminShell>
  )
}
