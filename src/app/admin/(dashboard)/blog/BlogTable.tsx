'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Table, Tag, Button, Space, Typography, Card, Input, Select, App } from 'antd'
import { Plus, Pencil, Trash2, Pin, PinOff, Search } from 'lucide-react'
import type { ColumnsType } from 'antd/es/table'
import { deletePost, togglePin } from './actions'

export interface BlogRow {
  id: string
  slug: string
  title_vi: string
  status: string
  date: string
  updatedAt: string
  pinned: boolean
  category: string
}

export default function BlogTable({ posts }: { posts: BlogRow[] }) {
  const router = useRouter()
  const { message, modal } = App.useApp()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [pinningId, setPinningId] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string | undefined>()

  // Debounce the search box (300ms) so filtering doesn't run on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 300)
    return () => clearTimeout(t)
  }, [searchInput])

  const categoryOptions = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category))).sort().map((c) => ({ value: c, label: c })),
    [posts],
  )

  const data = useMemo(() => {
    const q = search.trim().toLowerCase()
    return posts.filter(
      (p) =>
        (q === '' || p.title_vi.toLowerCase().includes(q) || p.slug.includes(q)) &&
        (!category || p.category === category),
    )
  }, [posts, search, category])

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      await deletePost(id)
      message.success('Đã xóa bài viết')
      router.refresh()
    } catch {
      message.error('Xóa thất bại')
    } finally {
      setDeletingId(null)
    }
  }

  function confirmDelete(row: BlogRow) {
    modal.confirm({
      title: 'Xóa bài viết này?',
      content: `"${row.title_vi}" sẽ bị xóa. Hành động không thể hoàn tác.`,
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: () => handleDelete(row.id),
    })
  }

  async function handlePin(row: BlogRow) {
    setPinningId(row.id)
    try {
      await togglePin(row.id)
      message.success(row.pinned ? 'Đã bỏ ghim' : 'Đã ghim bài viết')
      router.refresh()
    } catch {
      message.error('Thao tác thất bại')
    } finally {
      setPinningId(null)
    }
  }

  const columns: ColumnsType<BlogRow> = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title_vi',
      key: 'title_vi',
      sorter: (a, b) => a.title_vi.localeCompare(b.title_vi),
      render: (title: string, row) => (
        <div>
          <div style={{ fontWeight: 500, color: '#1f1f1f', display: 'flex', alignItems: 'center', gap: 8 }}>
            {row.pinned && (
              <Tag color="processing" style={{ marginInlineEnd: 0 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Pin size={11} /> Ghim
                </span>
              </Tag>
            )}
            {title}
          </div>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {row.slug}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      width: 160,
      render: (c: string) => <Tag>{c}</Tag>,
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
      title: 'Ngày đăng',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      sorter: (a, b) => a.date.localeCompare(b.date),
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
      width: 250,
      align: 'right',
      render: (_, row) => (
        <Space>
          <Button
            size="small"
            type={row.pinned ? 'primary' : 'default'}
            icon={row.pinned ? <PinOff size={14} /> : <Pin size={14} />}
            loading={pinningId === row.id}
            onClick={() => handlePin(row)}
          >
            {row.pinned ? 'Bỏ ghim' : 'Ghim'}
          </Button>
          <Link href={`/admin/blog/${row.id}/edit`}>
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <Typography.Title level={3} style={{ margin: 0, color: '#002D62' }}>
            Blog
          </Typography.Title>
          <Typography.Text type="secondary">{posts.length} bài viết</Typography.Text>
        </div>
        <Link href="/admin/blog/new">
          <Button type="primary" icon={<Plus size={18} />} size="large">
            Bài mới
          </Button>
        </Link>
      </div>

      {/* Toolbar: search + category filter */}
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
          placeholder="Lọc theo danh mục"
          options={categoryOptions}
          value={category}
          onChange={(v) => setCategory(v)}
          style={{ width: 220 }}
        />
      </Space>

      <Card variant="borderless" style={{ overflow: 'hidden' }} styles={{ body: { padding: 0 } }}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10, hideOnSinglePage: true, style: { marginInlineEnd: 16 } }}
          locale={{ emptyText: 'Không có bài viết phù hợp' }}
        />
      </Card>
    </div>
  )
}
