'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table, Button, Modal, Form, Input, Space, Typography, Card, Tag, App } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { saveCategory, deleteCategory, type CategoryInput } from './actions'
import { langLabel } from '../langLabel'

export interface CategoryRow {
  id: string
  key: string
  name_vi: string
  name_en: string
  postCount: number
}

export default function CategoryManager({ categories }: { categories: CategoryRow[] }) {
  const router = useRouter()
  const { message, modal } = App.useApp()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<CategoryRow | null>(null)
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

  function openEdit(row: CategoryRow) {
    setEditing(row)
    form.setFieldsValue({ name_vi: row.name_vi, name_en: row.name_en })
    setOpen(true)
  }

  async function onSubmit() {
    const values = await form.validateFields()
    setSaving(true)
    const input: CategoryInput = { id: editing?.id, ...values }
    const res = await saveCategory(input)
    setSaving(false)
    if (res?.error) {
      message.error(res.error)
      return
    }
    message.success(editing ? 'Đã cập nhật danh mục' : 'Đã thêm danh mục')
    setOpen(false)
    router.refresh()
  }

  async function handleDelete(row: CategoryRow) {
    setDeletingId(row.id)
    const res = await deleteCategory(row.id)
    setDeletingId(null)
    if (res?.error) {
      message.error(res.error)
      return
    }
    message.success('Đã xóa danh mục')
    router.refresh()
  }

  function confirmDelete(row: CategoryRow) {
    modal.confirm({
      title: 'Xóa danh mục này?',
      content: `"${row.name_vi}" sẽ bị xóa. Hành động không thể hoàn tác.`,
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: () => handleDelete(row),
    })
  }

  const columns: ColumnsType<CategoryRow> = [
    { title: langLabel('Tên', 'vi'), dataIndex: 'name_vi', key: 'name_vi' },
    { title: langLabel('Tên', 'en'), dataIndex: 'name_en', key: 'name_en' },
    {
      title: 'Bài viết',
      dataIndex: 'postCount',
      key: 'postCount',
      width: 100,
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
            Danh mục
          </Typography.Title>
          <Typography.Text type="secondary">{categories.length} danh mục</Typography.Text>
        </div>
        <Button type="primary" icon={<Plus size={18} />} size="large" onClick={openCreate}>
          Thêm danh mục
        </Button>
      </div>

      <Card variant="borderless" style={{ overflow: 'hidden' }} styles={{ body: { padding: 0 } }}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={categories}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
          locale={{ emptyText: 'Chưa có danh mục nào' }}
        />
      </Card>

      {mounted && (
      <Modal
        title={editing ? 'Sửa danh mục' : 'Thêm danh mục'}
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
            <Input placeholder="AI & Nhân lực" />
          </Form.Item>
          <Form.Item name="name_en" label={langLabel('Tên', 'en')} rules={[{ required: true, message: 'Bắt buộc' }]}>
            <Input placeholder="AI & Workforce" />
          </Form.Item>
        </Form>
      </Modal>
      )}
    </div>
  )
}
