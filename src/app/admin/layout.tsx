import type { ReactNode } from 'react'

export const metadata = { title: 'Intech Admin', robots: { index: false, follow: false } }

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-gray-50 text-gray-900">{children}</div>
}
