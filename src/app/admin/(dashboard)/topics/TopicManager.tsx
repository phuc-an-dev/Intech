'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table, Button, Modal, Form, Input, Space, Typography, Card, Tag, App } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { saveTopic, deleteTopic, type TopicInput } from './actions'
import { langLabel } from '../langLabel'

export interface TopicRow {
  id: string
  slug: string
  name_vi: string
  name_en: string
  description_vi: string
  description_en: string
  courseCount: number
}

export default function TopicManager({ topics }: { topics: TopicRow[] }) {
  const router = useRouter()
  const { message, modal } = App.useApp()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<TopicRow | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  // Mount the Modal only after hydration — forceRender would otherwise SSR the
  // portal (targets document.body) and mismatch the server HTML.
  const [mounted, setMounted] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: defer portal to post-hydration
  useEffect(() => setMounted(true), [])

  function openCreate() {
    setEditing(null)
    form.resetFields()
    setOpen(true)
  }

  function openEdit(row: TopicRow) {
    setEditing(row)
    form.setFieldsValue({
      name_vi: row.name_vi,
      name_en: row.name_en,
      description_vi: row.description_vi,
      description_en: row.description_en,
    })
    setOpen(true)
  }

  async function onSubmit() {
    const values = await form.validateFields()
    setSaving(true)
    const input: TopicInput = { id: editing?.id, ...values }
    const res = await saveTopic(input)
    setSaving(false)
    if (res?.error) {
      message.error(res.error)
      return
    }
    message.success(editing ? 'Đã cập nhật chủ đề' : 'Đã thêm chủ đề')
    setOpen(false)
    router.refresh()
  }

  async function handleDelete(row: TopicRow) {
    setDeletingId(row.id)
    const res = await deleteTopic(row.id)
    setDeletingId(null)
    if (res?.error) {
      message.error(res.error)
      return
    }
    message.success('Đã xóa chủ đề')
    router.refresh()
  }

  function confirmDelete(row: TopicRow) {
    modal.confirm({
      title: 'Xóa chủ đề này?',
      content: `"${row.name_vi}" sẽ bị xóa. Hành động không thể hoàn tác.`,
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: () => handleDelete(row),
    })
  }

  const columns: ColumnsType<TopicRow> = [
    {
      title: langLabel('Tên', 'vi'),
      dataIndex: 'name_vi',
      key: 'name_vi',
      render: (name: string, row) => (
        <div>
          <div style={{ fontWeight: 500 }}>{name}</div>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {row.slug}
          </Typography.Text>
        </div>
      ),
    },
    { title: langLabel('Tên', 'en'), dataIndex: 'name_en', key: 'name_en' },
    {
      title: 'Khóa học',
      dataIndex: 'courseCount',
      key: 'courseCount',
      width: 110,
      render: (n: number) => <Tag>{n}</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 170,
      align: 'right',
      render: (_, row) => (
        <Space>
          <Button size="small" icon={<Pencil size={14} />} onClick={() => openEdit(row)}>
            Sửa
          </Button>
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
            Chủ đề
          </Typography.Title>
          <Typography.Text type="secondary">{topics.length} chủ đề</Typography.Text>
        </div>
        <Button type="primary" icon={<Plus size={18} />} size="large" onClick={openCreate}>
          Thêm chủ đề
        </Button>
      </div>

      <Card variant="borderless" style={{ overflow: 'hidden' }} styles={{ body: { padding: 0 } }}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={topics}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
          locale={{ emptyText: 'Chưa có chủ đề nào' }}
        />
      </Card>

      {mounted && (
      <Modal
        title={editing ? 'Sửa chủ đề' : 'Thêm chủ đề'}
        open={open}
        onOk={onSubmit}
        onCancel={() => setOpen(false)}
        confirmLoading={saving}
        okText="Lưu"
        cancelText="Hủy"
        forceRender
      >
        <Form form={form} layout="vertical" requiredMark={false} style={{ marginTop: 12 }}>
          <Form.Item name="name_vi" label={langLabel('Tên', 'vi')} rules={[{ required: true, message: 'Bắt buộc' }]}>
            <Input placeholder="Trí tuệ nhân tạo" />
          </Form.Item>
          <Form.Item name="name_en" label={langLabel('Tên', 'en')} rules={[{ required: true, message: 'Bắt buộc' }]}>
            <Input placeholder="Artificial Intelligence" />
          </Form.Item>
          <Form.Item name="description_vi" label={langLabel('Mô tả', 'vi')}>
            <Input.TextArea rows={3} placeholder="Mô tả ngắn về chủ đề…" />
          </Form.Item>
          <Form.Item name="description_en" label={langLabel('Mô tả', 'en')}>
            <Input.TextArea rows={3} placeholder="Short description…" />
          </Form.Item>
        </Form>
      </Modal>
      )}
    </div>
  )
}
