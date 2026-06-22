'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Layout, Menu, Avatar, Dropdown, Grid } from 'antd'
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Users,
  GraduationCap,
  Shapes,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'

const { Sider, Header, Content } = Layout
const { useBreakpoint } = Grid

// Single source of truth for admin navigation (antd Menu item shape).
// Phase 2+ (Courses, Topics, Tours) → add a group/entry here and a matching page.
const NAV_ITEMS = [
  { key: '/admin', icon: <LayoutDashboard size={17} />, label: 'Tổng quan' },
  {
    type: 'group' as const,
    label: <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Blog</span>,
    children: [
      { key: '/admin/blog', icon: <FileText size={17} />, label: 'Blog' },
      { key: '/admin/categories', icon: <FolderTree size={17} />, label: 'Danh mục' },
      { key: '/admin/authors', icon: <Users size={17} />, label: 'Tác giả' },
    ],
  },
  {
    type: 'group' as const,
    label: <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Khóa học</span>,
    children: [
      { key: '/admin/topics', icon: <Shapes size={17} />, label: 'Chủ đề' },
      { key: '/admin/courses', icon: <GraduationCap size={17} />, label: 'Khóa học' },
    ],
  },
]

// Flat list of routable keys, used to resolve the active menu item.
const NAV_KEYS = ['/admin', '/admin/blog', '/admin/categories', '/admin/authors', '/admin/topics', '/admin/courses']

export default function AdminShell({
  children,
  userName,
  userEmail,
  onSignOut,
}: {
  children: ReactNode
  userName: string
  userEmail: string
  onSignOut: () => Promise<void>
}) {
  const router = useRouter()
  const pathname = usePathname()
  const screens = useBreakpoint()
  const [collapsed, setCollapsed] = useState(false)

  // Longest matching nav prefix wins (so /admin/blog/123/edit selects "Blog").
  const selectedKey =
    NAV_KEYS.filter((k) => pathname === k || pathname.startsWith(k + '/'))
      .sort((a, b) => b.length - a.length)[0] ?? '/admin'

  const initial = (userName || userEmail || 'A').charAt(0).toUpperCase()

  const collapsedWidth = screens.lg ? 80 : 0
  const siderWidth = collapsed ? collapsedWidth : 232

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="dark"
        collapsible
        collapsed={collapsed}
        trigger={null}
        breakpoint="lg"
        collapsedWidth={collapsedWidth}
        onBreakpoint={(broken) => setCollapsed(broken)}
        width={232}
        style={{
          background: '#002D62',
          position: 'fixed',
          insetInlineStart: 0,
          top: 0,
          bottom: 0,
          height: '100vh',
          overflow: 'auto',
          zIndex: 20,
        }}
      >
        {/* Brand */}
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            paddingInline: collapsed ? 0 : 24,
            borderBottom: '1px solid rgba(255,255,255,.1)',
          }}
        >
          <Image
            src="/logo-white.svg"
            alt="Intech Admin"
            width={120}
            height={28}
            priority
            style={{
              width: collapsed ? 30 : 120,
              height: 'auto',
              objectFit: 'contain',
              transition: 'width .2s',
            }}
          />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={NAV_ITEMS}
          onClick={({ key }) => router.push(key)}
          style={{ background: 'transparent', borderInlineEnd: 'none', paddingTop: 8 }}
        />
      </Sider>

      <Layout style={{ marginInlineStart: siderWidth, transition: 'margin-inline-start .2s' }}>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 18,
              color: '#002D62',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Toggle menu"
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>

          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                {
                  key: 'user',
                  disabled: true,
                  label: (
                    <div style={{ padding: '4px 0' }}>
                      <div style={{ fontWeight: 600, color: '#1f1f1f' }}>{userName}</div>
                      <div style={{ fontSize: 12, color: '#8c8c8c' }}>{userEmail}</div>
                    </div>
                  ),
                },
                { type: 'divider' },
                {
                  key: 'signout',
                  icon: <LogOut size={15} />,
                  danger: true,
                  label: 'Đăng xuất',
                  onClick: () => {
                    void onSignOut()
                  },
                },
              ],
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <Avatar style={{ background: '#002D62' }}>{initial}</Avatar>
              <span style={{ fontWeight: 500, color: '#1f1f1f' }}>{userName}</span>
            </div>
          </Dropdown>
        </Header>

        <Content style={{ margin: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  )
}
