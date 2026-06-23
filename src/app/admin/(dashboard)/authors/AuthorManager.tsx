'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table, Button, Modal, Form, Input, Space, Typography, Card, Tag, Upload, Image, App,
} from 'antd'
import type { UploadProps } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Plus, Pencil, Trash2, UploadCloud } from 'lucide-react'
import { saveAuthor, deleteAuthor, type AuthorInput } from './actions'
import { langLabel } from '../langLabel'
import { LangToggle, type EditLang } from '../Section'

export interface AuthorRow {
  id: string
  name: string
  role_vi: string
  role_en: string
  image: string
  imageAlt: string
  postCount: number
}

export default function AuthorManager({ authors }: { authors: AuthorRow[] }) {
  const router = useRouter()
  const { message, modal } = App.useApp()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<AuthorRow | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [image, setImage] = useState('/logo.svg')
  const [uploading, setUploading] = useState(false)
  // Mount the Modal only after hydration — forceRender would otherwise SSR the
  // portal (targets document.body) and mismatch the server HTML.
  const [mounted, setMounted] = useState(false)
  const [editLang, setEditLang] = useState<EditLang>('vi')
  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: defer portal to post-hydration
  useEffect(() => setMounted(true), [])

  function openCreate() {
    setEditing(null)
    setEditLang('vi')
    form.resetFields()
    setImage('/logo.svg')
    setOpen(true)
  }

  function openEdit(row: AuthorRow) {
    setEditing(row)
    setEditLang('vi')
    form.setFieldsValue({ name: row.name, role_vi: row.role_vi, role_en: row.role_en, imageAlt: row.imageAlt })
    setImage(row.image)
    setOpen(true)
  }

  const uploadImage: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file as File)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      const { url } = await res.json()
      setImage(url)
      message.success('Đã tải ảnh')
      onSuccess?.(url)
    } catch (e) {
      message.error('Tải ảnh thất bại')
      onError?.(e as Error)
    } finally {
      setUploading(false)
    }
  }

  async function onSubmit() {
    const values = await form.validateFields()
    setSaving(true)
    const input: AuthorInput = { id: editing?.id, ...values, image }
    const res = await saveAuthor(input)
    setSaving(false)
    if (res?.error) {
      message.error(res.error)
      return
    }
    message.success(editing ? 'Đã cập nhật tác giả' : 'Đã thêm tác giả')
    setOpen(false)
    router.refresh()
  }

  async function handleDelete(row: AuthorRow) {
    setDeletingId(row.id)
    const res = await deleteAuthor(row.id)
    setDeletingId(null)
    if (res?.error) {
      message.error(res.error)
      return
    }
    message.success('Đã xóa tác giả')
    router.refresh()
  }

  function confirmDelete(row: AuthorRow) {
    modal.confirm({
      title: 'Xóa tác giả này?',
      content: `"${row.name}" sẽ bị xóa. Hành động không thể hoàn tác.`,
      okText: 'Xóa',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk: () => handleDelete(row),
    })
  }

  const columns: ColumnsType<AuthorRow> = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 72,
      render: (image: string, row) => (
        <Image src={image} alt={row.imageAlt} width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span style={{ fontWeight: 500 }}>{name}</span>,
    },
    { title: langLabel('Chức danh', 'vi'), dataIndex: 'role_vi', key: 'role_vi' },
    { title: langLabel('Chức danh', 'en'), dataIndex: 'role_en', key: 'role_en' },
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
            Tác giả
          </Typography.Title>
          <Typography.Text type="secondary">{authors.length} tác giả</Typography.Text>
        </div>
        <Button type="primary" icon={<Plus size={18} />} size="large" onClick={openCreate}>
          Thêm tác giả
        </Button>
      </div>

      <Card variant="borderless" style={{ overflow: 'hidden' }} styles={{ body: { padding: 0 } }}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={authors}
          pagination={{ pageSize: 10, hideOnSinglePage: true }}
          locale={{ emptyText: 'Chưa có tác giả nào' }}
        />
      </Card>

      {mounted && (
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingInlineEnd: 28 }}>
            <span>{editing ? 'Sửa tác giả' : 'Thêm tác giả'}</span>
            <LangToggle size="small" value={editLang} onChange={setEditLang} />
          </div>
        }
        open={open}
        onOk={onSubmit}
        onCancel={() => setOpen(false)}
        confirmLoading={saving}
        okText="Lưu"
        cancelText="Hủy"
        forceRender
      >
        <Form form={form} layout="vertical" requiredMark={false} style={{ marginTop: 12 }}>
          <Form.Item name="name" label="Tên tác giả" rules={[{ required: true, message: 'Tên là bắt buộc' }]}>
            <Input placeholder="Intech ISC Editorial Team" />
          </Form.Item>
          <div style={{ display: editLang === 'vi' ? 'block' : 'none' }}>
            <Form.Item name="role_vi" label="Chức danh">
              <Input placeholder="Đội ngũ chuyên môn…" />
            </Form.Item>
          </div>
          <div style={{ display: editLang === 'en' ? 'block' : 'none' }}>
            <Form.Item name="role_en" label="Chức danh">
              <Input placeholder="Editorial team…" />
            </Form.Item>
          </div>
          <Form.Item label="Ảnh tác giả">
            <Space align="center" size="middle">
              <Upload showUploadList={false} accept="image/*" customRequest={uploadImage}>
                <Button icon={<UploadCloud size={16} />} loading={uploading}>
                  Tải lên
                </Button>
              </Upload>
              {image && (
                <Image src={image} alt="author" width={48} height={48} style={{ borderRadius: '50%', objectFit: 'cover' }} />
              )}
            </Space>
          </Form.Item>
          <Form.Item name="imageAlt" label="Alt text ảnh">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      )}
    </div>
  )
}
