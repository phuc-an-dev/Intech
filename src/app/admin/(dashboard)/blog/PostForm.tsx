'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import dayjs from 'dayjs'
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Switch,
  Select,
  Button,
  Row,
  Col,
  Upload,
  Space,
  Image,
  Typography,
  App,
} from 'antd'
import type { UploadProps } from 'antd'
import { UploadCloud, Save, HelpCircle, Info, FileText, Image as ImageIcon } from 'lucide-react'
import { savePost, type PostInput } from './actions'
import { Section, LangToggle, ADMIN_NAVY } from '../Section'

const MarkdownEditor = dynamic(() => import('./MarkdownEditor'), {
  ssr: false,
  loading: () => (
    <div style={{ height: 440, display: 'grid', placeItems: 'center', color: '#bbb' }}>
      Đang tải trình soạn thảo…
    </div>
  ),
})

export interface PostFormValues {
  id?: string
  slug: string; status: string; lang: string
  categoryId: string; authorId: string
  title_vi: string; title_en: string
  excerpt_vi: string; excerpt_en: string
  body_vi: string; body_en: string
  tags: string; gradient: string; coverImage: string; readTime: string
  date: string; relatedCourseSlug: string
}

export interface Option {
  value: string
  label: string
}

const empty: PostFormValues = {
  slug: '', status: 'DRAFT', lang: 'vi', categoryId: '', authorId: '',
  title_vi: '', title_en: '', excerpt_vi: '', excerpt_en: '',
  body_vi: '', body_en: '', tags: '', gradient: 'from-[#002D62] to-blue-800',
  coverImage: '', readTime: '5', date: dayjs().format('YYYY-MM-DD'), relatedCourseSlug: '',
}

export default function PostForm({
  post,
  categories,
  authors,
}: {
  post?: PostFormValues
  categories: Option[]
  authors: Option[]
}) {
  const v = post ?? empty
  const router = useRouter()
  const { message } = App.useApp()
  const [form] = Form.useForm()

  const [editLang, setEditLang] = useState<'vi' | 'en'>('vi')
  const [bodyVi, setBodyVi] = useState(v.body_vi)
  const [bodyEn, setBodyEn] = useState(v.body_en)
  const [cover, setCover] = useState(v.coverImage)
  const [coverUploading, setCoverUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const uploadCover: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    setCoverUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file as File)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      const { url } = await res.json()
      setCover(url)
      message.success('Đã tải ảnh bìa')
      onSuccess?.(url)
    } catch (e) {
      message.error('Tải ảnh thất bại')
      onError?.(e as Error)
    } finally {
      setCoverUploading(false)
    }
  }

  async function onFinish(values: Record<string, unknown>) {
    setSubmitting(true)
    const tags = Array.isArray(values.tags) ? (values.tags as string[]).join(',') : ''
    const input: PostInput = {
      id: post?.id,
      slug: post?.slug, // existing slug on edit; server auto-generates otherwise
      status: values.published ? 'PUBLISHED' : 'DRAFT',
      lang: 'vi',
      categoryId: values.categoryId as string,
      authorId: values.authorId as string,
      title_vi: values.title_vi as string,
      title_en: values.title_en as string,
      excerpt_vi: values.excerpt_vi as string,
      excerpt_en: values.excerpt_en as string,
      tags,
      gradient: v.gradient,
      readTime: values.readTime as number,
      date: values.date ? (values.date as dayjs.Dayjs).format('YYYY-MM-DD') : undefined,
      relatedCourseSlug: values.relatedCourseSlug as string,
      coverImage: cover,
      body_vi: bodyVi,
      body_en: bodyEn,
    }
    const res = await savePost(input)
    if (res?.error) {
      message.error(res.error)
      setSubmitting(false)
    }
  }

  const initialValues = {
    published: v.status === 'PUBLISHED',
    categoryId: v.categoryId || undefined,
    authorId: v.authorId || undefined,
    title_vi: v.title_vi,
    title_en: v.title_en,
    excerpt_vi: v.excerpt_vi,
    excerpt_en: v.excerpt_en,
    tags: v.tags ? v.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    readTime: Number(v.readTime) || 5,
    date: v.date ? dayjs(v.date) : dayjs(),
    relatedCourseSlug: v.relatedCourseSlug,
  }

  // Per-language text fields (both stay mounted so antd Form keeps their values).
  const langFields = (lng: 'vi' | 'en') => (
    <div style={{ display: editLang === lng ? 'block' : 'none' }}>
      <Form.Item name={`title_${lng}`} label="Tiêu đề">
        <Input placeholder={lng === 'vi' ? 'Tiêu đề bài viết' : 'Article title'} />
      </Form.Item>
      <Form.Item name={`excerpt_${lng}`} label="Tóm tắt">
        <Input.TextArea
          rows={3}
          placeholder={lng === 'vi' ? 'Mô tả ngắn hiển thị trên danh sách…' : 'Short description…'}
        />
      </Form.Item>
    </div>
  )

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      requiredMark="optional"
      style={{ maxWidth: 960, margin: '0 auto', paddingBottom: 48 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <Typography.Title level={3} style={{ color: ADMIN_NAVY, margin: 0 }}>
          {post?.id ? 'Sửa bài viết' : 'Bài viết mới'}
        </Typography.Title>
        <LangToggle value={editLang} onChange={setEditLang} />
      </div>

      <Section icon={<Info size={16} />} title="Thông tin chung">
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true, message: 'Chọn danh mục' }]}>
              <Select
                placeholder="Chọn danh mục"
                options={categories}
                showSearch
                optionFilterProp="label"
                notFoundContent="Chưa có danh mục — tạo ở mục Danh mục"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="authorId" label="Tác giả" rules={[{ required: true, message: 'Chọn tác giả' }]}>
              <Select
                placeholder="Chọn tác giả"
                options={authors}
                showSearch
                optionFilterProp="label"
                notFoundContent="Chưa có tác giả — tạo ở mục Tác giả"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="published" label="Trạng thái" valuePropName="checked">
              <Switch checkedChildren="Đã đăng" unCheckedChildren="Nháp" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="date" label="Ngày đăng">
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="readTime" label="Read time (phút)">
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={16}>
            <Form.Item name="tags" label="Tags">
              <Select
                mode="tags"
                open={false}
                suffixIcon={null}
                tokenSeparators={[',']}
                placeholder="Nhập tag rồi nhấn Enter"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="relatedCourseSlug" label="Related course slug">
              <Input placeholder="(tuỳ chọn)" />
            </Form.Item>
          </Col>
        </Row>
      </Section>

      <Section icon={<ImageIcon size={16} />} title="Ảnh bìa">
        <Space align="start" size="large">
          <Upload showUploadList={false} accept="image/*" customRequest={uploadCover}>
            <Button icon={<UploadCloud size={16} />} loading={coverUploading}>
              {cover ? 'Đổi ảnh' : 'Chọn ảnh'}
            </Button>
          </Upload>
          {cover && (
            <Space orientation="vertical" size={4}>
              <Image
                src={cover}
                alt="cover"
                width={180}
                height={120}
                style={{ objectFit: 'cover', borderRadius: 8 }}
              />
              <Button type="link" danger size="small" onClick={() => setCover('')}>
                Xóa ảnh
              </Button>
            </Space>
          )}
        </Space>
        <Typography.Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0, fontSize: 12 }}>
          JPEG, PNG, WebP, AVIF · tối đa 5MB · nhấp ảnh để xem to
        </Typography.Paragraph>
      </Section>

      <Section icon={<FileText size={16} />} title="Nội dung">
        {langFields('vi')}
        {langFields('en')}

        <Form.Item
          label={
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Nội dung Markdown
              <a
                href="https://www.markdownguide.org/basic-syntax/"
                target="_blank"
                rel="noreferrer"
                title="Cách dùng Markdown"
                style={{ display: 'inline-flex', color: '#00A3C1' }}
              >
                <HelpCircle size={15} />
              </a>
            </span>
          }
          style={{ marginBottom: 0 }}
        >
          <MarkdownEditor
            key={editLang}
            value={editLang === 'vi' ? bodyVi : bodyEn}
            onChange={editLang === 'vi' ? setBodyVi : setBodyEn}
          />
        </Form.Item>
      </Section>

      {/* ── Actions ── */}
      <Space>
        <Button type="primary" htmlType="submit" icon={<Save size={16} />} size="large" loading={submitting}>
          Lưu bài viết
        </Button>
        <Button size="large" onClick={() => router.push('/admin/blog')}>
          Huỷ
        </Button>
      </Space>
    </Form>
  )
}
