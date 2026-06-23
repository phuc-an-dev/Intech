'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Table, Tag, Button, Space, Typography, Card, Input, App } from 'antd'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import type { ColumnsType } from 'antd/es/table'
import { deleteTour } from './actions'

export interface TourRow {
  id: string
  slug: string
  name_vi: string
  destination_vi: string
  duration_vi: string
  status: string
  updatedAt: string
}

export default function TourTable({ tours }: { tours: TourRow[] }) {
  const router = useRouter()
  const { message, modal } = App.useApp()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 300)
    return () => clearTimeout(t)
  }, [searchInput])

  const data = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tours.filter((t) => q === '' || t.name_vi.toLowerCase().includes(q) || t.slug.includes(q))
  }, [tours, search])

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      await deleteTour(id)
      message.success('Đã xóa tour')
      router.refresh()
    } catch {
      message.error('Xóa thất bại')
    } finally {
      setDeletingId(null)
    }
  }

  function confirmDelete(row: TourRow) {
    modal.confirm({
      title: 'Xóa tour này?',
      content: `"${row.name_vi}" sẽ bị xóa. Hành động không thể hoàn tác.`,
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: () => handleDelete(row.id),
    })
  }

  const columns: ColumnsType<TourRow> = [
    {
      title: 'Tên tour',
      dataIndex: 'name_vi',
      key: 'name_vi',
      sorter: (a, b) => a.name_vi.localeCompare(b.name_vi),
      render: (name: string, row) => (
        <div>
          <div style={{ fontWeight: 500, color: '#1f1f1f' }}>{name}</div>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {row.slug}
          </Typography.Text>
        </div>
      ),
    },
    { title: 'Điểm đến', dataIndex: 'destination_vi', key: 'destination_vi', width: 220, render: (d: string) => <Tag>{d}</Tag> },
    { title: 'Thời lượng', dataIndex: 'duration_vi', key: 'duration_vi', width: 120 },
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
          <Link href={`/admin/tours/${row.id}/edit`}>
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
            Study Tour
          </Typography.Title>
          <Typography.Text type="secondary">{tours.length} tour</Typography.Text>
        </div>
        <Link href="/admin/tours/new">
          <Button type="primary" icon={<Plus size={18} />} size="large">
            Tour mới
          </Button>
        </Link>
      </div>

      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          allowClear
          prefix={<Search size={15} style={{ color: '#bfbfbf' }} />}
          placeholder="Tìm theo tên hoặc slug"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ width: 280 }}
        />
      </Space>

      <Card variant="borderless" style={{ overflow: 'hidden' }} styles={{ body: { padding: 0 } }}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10, hideOnSinglePage: true, style: { marginInlineEnd: 16 } }}
          locale={{ emptyText: 'Không có tour phù hợp' }}
        />
      </Card>
    </div>
  )
}
