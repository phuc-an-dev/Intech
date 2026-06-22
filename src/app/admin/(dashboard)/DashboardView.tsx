'use client'

import Link from 'next/link'
import { Row, Col, Card, Typography, Tag } from 'antd'
import { FileText, CheckCircle2, Pencil } from 'lucide-react'
import type { ReactNode } from 'react'

function StatCard({
  icon,
  label,
  value,
  color,
  bg,
}: {
  icon: ReactNode
  label: string
  value: number
  color: string
  bg: string
}) {
  return (
    <Card styles={{ body: { padding: 20 } }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: bg,
            color,
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 13, color: '#8c8c8c', marginBottom: 2 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, color: '#1f1f1f' }}>{value}</div>
        </div>
      </div>
    </Card>
  )
}

export interface RecentPost {
  id: string
  title_vi: string
  status: string
  updatedAt: string
}

export default function DashboardView({
  total,
  published,
  draft,
  recent,
}: {
  total: number
  published: number
  draft: number
  recent: RecentPost[]
}) {
  return (
    <div>
      <Typography.Title level={3} style={{ color: '#002D62', marginTop: 0 }}>
        Tổng quan
      </Typography.Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <StatCard icon={<FileText size={24} />} label="Tổng bài viết" value={total} color="#002D62" bg="#e6effa" />
        </Col>
        <Col xs={24} sm={8}>
          <StatCard icon={<CheckCircle2 size={24} />} label="Đã đăng" value={published} color="#16a34a" bg="#e7f6ec" />
        </Col>
        <Col xs={24} sm={8}>
          <StatCard icon={<Pencil size={24} />} label="Bài nháp" value={draft} color="#d99100" bg="#fdf3e0" />
        </Col>
      </Row>

      <Card
        title="Bài viết gần đây"
        extra={<Link href="/admin/blog">Xem tất cả →</Link>}
        styles={{ body: { padding: 0 } }}
      >
        <div>
          {recent.map((p, i) => (
            <div
              key={p.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 24px',
                borderTop: i === 0 ? 'none' : '1px solid #f5f5f5',
              }}
            >
              <Typography.Text style={{ flex: 1, marginRight: 16 }} ellipsis>
                {p.title_vi}
              </Typography.Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {p.status === 'PUBLISHED' ? (
                  <Tag color="success">Đã đăng</Tag>
                ) : (
                  <Tag color="warning">Nháp</Tag>
                )}
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {p.updatedAt}
                </Typography.Text>
                <Link href={`/admin/blog/${p.id}/edit`}>Sửa</Link>
              </div>
            </div>
          ))}
          {recent.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: '#bbb' }}>
              Chưa có bài viết nào
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
