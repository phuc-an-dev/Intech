import type { ReactNode } from 'react'
import 'antd/dist/reset.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import AdminProviders from './AdminProviders'

export const metadata = { title: 'Intech Admin', robots: { index: false, follow: false } }

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, background: '#f5f6f8' }} suppressHydrationWarning>
        <AntdRegistry>
          <AdminProviders>{children}</AdminProviders>
        </AntdRegistry>
      </body>
    </html>
  )
}
