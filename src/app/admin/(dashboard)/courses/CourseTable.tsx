'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Table, Tag, Button, Space, Typography, Card, Input, Select, App } from 'antd'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import type { ColumnsType } from 'antd/es/table'
import { deleteCourse } from './actions'
import { LEVEL_META, type CourseLevelKey } from './levels'

export interface CourseRow {
  id: string
  slug: string
  title_vi: string
  topicName: string
  level: CourseLevelKey
  status: string
  priceOriginal: number
  priceSale: number | null
  updatedAt: string
}

export default function CourseTable({ courses }: { courses: CourseRow[] }) {
  const router = useRouter()
  const { message, modal } = App.useApp()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [topic, setTopic] = useState<string | undefined>()
  const [level, setLevel] = useState<CourseLevelKey | undefined>()

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 300)
    return () => clearTimeout(t)
  }, [searchInput])

  const topicOptions = useMemo(
    () => Array.from(new Set(courses.map((c) => c.topicName))).sort().map((t) => ({ value: t, label: t })),
    [courses],
  )

  const levelOptions = useMemo(
    () => (Object.keys(LEVEL_META) as CourseLevelKey[]).map((k) => ({ value: k, label: LEVEL_META[k].label })),
    [],
  )

  const data = useMemo(() => {
    const q = search.trim().toLowerCase()
    return courses.filter(
      (c) =>
        (q === '' || c.title_vi.toLowerCase().includes(q) || c.slug.includes(q)) &&
        (!topic || c.topicName === topic) &&
        (!level || c.level === level),
    )
  }, [courses, search, topic, level])

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      await deleteCourse(id)
      message.success('Đã xóa khóa học')
      router.refresh()
    } catch {
      message.error('Xóa thất bại')
    } finally {
      setDeletingId(null)
    }
  }

  function confirmDelete(row: CourseRow) {
    modal.confirm({
      title: 'Xóa khóa học này?',
      content: `"${row.title_vi}" sẽ bị xóa. Hành động không thể hoàn tác.`,
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: () => handleDelete(row.id),
    })
  }

  const columns: ColumnsType<CourseRow> = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title_vi',
      key: 'title_vi',
      sorter: (a, b) => a.title_vi.localeCompare(b.title_vi),
      render: (title: string, row) => (
        <div>
          <div style={{ fontWeight: 500, color: '#1f1f1f' }}>{title}</div>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {row.slug}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: 'Chủ đề',
      dataIndex: 'topicName',
      key: 'topicName',
      width: 170,
      render: (t: string) => <Tag>{t}</Tag>,
    },
    {
      title: 'Cấp độ',
      dataIndex: 'level',
      key: 'level',
      width: 120,
      render: (lv: CourseLevelKey) => <Tag color={LEVEL_META[lv].color}>{LEVEL_META[lv].label}</Tag>,
    },
    {
      title: 'Giá',
      key: 'price',
      width: 150,
      render: (_, row) => {
        // Effective price mirrors the public page: priceSale ?? priceOriginal.
        const effective = row.priceSale ?? row.priceOriginal
        if (effective <= 0) return <Typography.Text type="secondary">Liên hệ</Typography.Text>
        if (row.priceSale != null && row.priceSale > 0) {
          return (
            <span>
              <span style={{ color: '#cf1322', fontWeight: 500 }}>{row.priceSale.toLocaleString('vi-VN')}đ</span>{' '}
              <span style={{ textDecoration: 'line-through', color: '#bfbfbf', fontSize: 12 }}>
                {row.priceOriginal.toLocaleString('vi-VN')}đ
              </span>
            </span>
          )
        }
        return <span>{row.priceOriginal.toLocaleString('vi-VN')}đ</span>
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: string) =>
        status === 'PUBLISHED' ? <Tag color="success">Đã đăng</Tag> : <Tag color="warning">Nháp</Tag>,
    },
    {
      title: 'Cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 150,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.updatedAt.localeCompare(b.updatedAt),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 180,
      align: 'right',
      render: (_, row) => (
        <Space>
          <Link href={`/admin/courses/${row.id}/edit`}>
            <Button size="small" icon={<Pencil size={14} />}>
              Sửa
            </Button>
          </Link>
          <Button
            size="small"
            danger
            icon={<Trash2 size={14} />}
            loading={deletingId === row.id}
            onClick={() => confirmDelete(row)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <Typography.Title level={3} style={{ margin: 0, color: '#002D62' }}>
            Khóa học
          </Typography.Title>
          <Typography.Text type="secondary">{courses.length} khóa học</Typography.Text>
        </div>
        <Link href="/admin/courses/new">
          <Button type="primary" icon={<Plus size={18} />} size="large">
            Khóa học mới
          </Button>
        </Link>
      </div>

      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          allowClear
          prefix={<Search size={15} style={{ color: '#bfbfbf' }} />}
          placeholder="Tìm theo tiêu đề hoặc slug"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ width: 280 }}
        />
        <Select
          allowClear
          placeholder="Lọc theo chủ đề"
          options={topicOptions}
          value={topic}
          onChange={(v) => setTopic(v)}
          style={{ width: 200 }}
        />
        <Select
          allowClear
          placeholder="Lọc theo cấp độ"
          options={levelOptions}
          value={level}
          onChange={(v) => setLevel(v)}
          style={{ width: 180 }}
        />
      </Space>

      <Card variant="borderless" style={{ overflow: 'hidden' }} styles={{ body: { padding: 0 } }}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10, hideOnSinglePage: true, style: { marginInlineEnd: 16 } }}
          locale={{ emptyText: 'Không có khóa học phù hợp' }}
        />
      </Card>
    </div>
  )
}
