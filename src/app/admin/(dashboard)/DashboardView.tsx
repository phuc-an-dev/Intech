'use client'

import Link from 'next/link'
import { Card, Typography, Tag, Button } from 'antd'
import {
  FileText, CheckCircle2, Pencil, GraduationCap, Shapes, Users, FolderTree, Plane, Plus, ArrowRight,
} from 'lucide-react'
import type { ReactNode } from 'react'

const NAVY = '#002D62'

function StatCard({
  icon, label, value, color, bg, href, hint,
}: {
  icon: ReactNode
  label: string
  value: number
  color: string
  bg: string
  href: string
  hint?: string
}) {
  return (
    <Link href={href} style={{ display: 'block', height: '100%' }}>
      <Card hoverable style={{ height: '100%', borderColor: '#eef0f3' }} styles={{ body: { padding: 18 } }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 8 }}>{label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
              <span style={{ fontSize: 30, fontWeight: 800, lineHeight: 1, color: '#1f2937' }}>{value}</span>
              {hint && <span style={{ fontSize: 12, color: '#9aa3af' }}>{hint}</span>}
            </div>
          </div>
          <div
            style={{
              width: 44, height: 44, borderRadius: 12, background: bg, color,
              display: 'grid', placeItems: 'center', flexShrink: 0,
            }}
          >
            {icon}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export interface RecentPost {
  id: string
  title_vi: string
  status: string
  updatedAt: string
}

export interface DashboardStats {
  total: number
  published: number
  draft: number
  courses: number
  coursesPublished: number
  tours: number
  topics: number
  categories: number
  authors: number
}

function GroupTitle({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 14px' }}>
      <span style={{ width: 4, height: 16, borderRadius: 2, background: '#00A3C1' }} />
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#6b7280' }}>
        {children}
      </span>
    </div>
  )
}

const grid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: 16,
  marginBottom: 28,
}

export default function DashboardView({ stats, recent }: { stats: DashboardStats; recent: RecentPost[] }) {
  const totalContent = stats.total + stats.courses + stats.tours

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12, marginBottom: 28,
        }}
      >
        <div>
          <Typography.Title level={3} style={{ color: NAVY, margin: 0 }}>
            Tổng quan
          </Typography.Title>
          <Typography.Text type="secondary">
            Bảng điều khiển nội dung · {totalContent} mục đang quản lý
          </Typography.Text>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link href="/admin/courses/new">
            <Button icon={<Plus size={15} />}>Khóa học</Button>
          </Link>
          <Link href="/admin/tours/new">
            <Button icon={<Plus size={15} />}>Study Tour</Button>
          </Link>
          <Link href="/admin/blog/new">
            <Button type="primary" icon={<Plus size={15} />}>Bài viết</Button>
          </Link>
        </div>
      </div>

      <GroupTitle>Blog</GroupTitle>
      <div style={grid}>
        <StatCard icon={<FileText size={22} />} label="Tổng bài viết" value={stats.total} color="#002D62" bg="#e6effa" href="/admin/blog" />
        <StatCard icon={<CheckCircle2 size={22} />} label="Đã đăng" value={stats.published} color="#16a34a" bg="#e7f6ec" href="/admin/blog" />
        <StatCard icon={<Pencil size={22} />} label="Bài nháp" value={stats.draft} color="#d99100" bg="#fdf3e0" href="/admin/blog" />
        <StatCard icon={<FolderTree size={22} />} label="Danh mục" value={stats.categories} color="#7c3aed" bg="#f1ebfd" href="/admin/categories" />
        <StatCard icon={<Users size={22} />} label="Tác giả" value={stats.authors} color="#0891b2" bg="#e3f5f9" href="/admin/authors" />
      </div>

      <GroupTitle>Khóa học & Study Tour</GroupTitle>
      <div style={grid}>
        <StatCard icon={<GraduationCap size={22} />} label="Khóa học" value={stats.courses} color="#002D62" bg="#e6effa" href="/admin/courses" hint={`${stats.coursesPublished} đã đăng`} />
        <StatCard icon={<Shapes size={22} />} label="Chủ đề" value={stats.topics} color="#7c3aed" bg="#f1ebfd" href="/admin/topics" />
        <StatCard icon={<Plane size={22} />} label="Study Tour" value={stats.tours} color="#0891b2" bg="#e3f5f9" href="/admin/tours" />
      </div>

      <Card
        title={<span style={{ color: NAVY, fontWeight: 600 }}>Bài viết gần đây</span>}
        extra={
          <Link href="/admin/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            Xem tất cả <ArrowRight size={14} />
          </Link>
        }
        styles={{ body: { padding: 6 }, header: { borderBottom: '1px solid #f5f6f8' } }}
        style={{ borderColor: '#eef0f3' }}
      >
        {recent.map((p) => (
          <Link
            key={p.id}
            href={`/admin/blog/${p.id}/edit`}
            className="dash-recent-row"
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 14px', borderRadius: 10, color: 'inherit', transition: 'background .15s',
            }}
          >
            <span
              style={{
                width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                background: '#f0f4fa', color: NAVY, display: 'grid', placeItems: 'center',
              }}
            >
              <FileText size={15} />
            </span>
            <Typography.Text style={{ flex: 1, fontWeight: 500, color: '#1f2937' }} ellipsis>
              {p.title_vi}
            </Typography.Text>
            {p.status === 'PUBLISHED' ? <Tag color="success">Đã đăng</Tag> : <Tag color="warning">Nháp</Tag>}
            <Typography.Text type="secondary" style={{ fontSize: 12, width: 92, textAlign: 'right' }}>
              {p.updatedAt}
            </Typography.Text>
          </Link>
        ))}
        {recent.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: '#bbb' }}>Chưa có bài viết nào</div>
        )}
        <style>{`.dash-recent-row:hover{background:#f7f9fc}`}</style>
      </Card>
    </div>
  )
}
