'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Form,
  Input,
  InputNumber,
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
import { UploadCloud, Save, Info, Image as ImageIcon, FileText } from 'lucide-react'
import { Section, LangToggle, ADMIN_NAVY } from '../Section'
import { saveCourse, type CourseInput } from './actions'
import { LEVEL_OPTIONS, type CourseLevelKey } from './levels'

export interface CourseFormValues {
  id?: string
  slug: string
  status: string
  level: CourseLevelKey
  topicId: string
  durationHours: number
  durationSessions: number
  title_vi: string; title_en: string
  description_vi: string; description_en: string
  learningOutcome_vi: string; learningOutcome_en: string
  targetAudience_vi: string[]; targetAudience_en: string[]
  modules_vi: string[]; modules_en: string[]
  finalProject_vi: string; finalProject_en: string
  deliveryFormat_vi: string; deliveryFormat_en: string
  tags: string[]
  prerequisite: string
  priceOriginal: number
  priceSale: number | null
  imageUrl: string
}

export interface Option {
  value: string
  label: string
}

export interface CourseRef {
  slug: string
  title: string
  topicId: string
}

const empty: CourseFormValues = {
  slug: '', status: 'DRAFT', level: 'foundation', topicId: '',
  durationHours: 0, durationSessions: 0,
  title_vi: '', title_en: '', description_vi: '', description_en: '',
  learningOutcome_vi: '', learningOutcome_en: '',
  targetAudience_vi: [], targetAudience_en: [], modules_vi: [], modules_en: [],
  finalProject_vi: '', finalProject_en: '', deliveryFormat_vi: '', deliveryFormat_en: '',
  tags: [], prerequisite: '', priceOriginal: 0, priceSale: null, imageUrl: '',
}

const asArray = (v: unknown): string[] => (Array.isArray(v) ? (v as string[]) : [])

export default function CourseForm({
  course,
  topics,
  courses,
}: {
  course?: CourseFormValues
  topics: Option[]
  courses: CourseRef[]
}) {
  const v = course ?? empty
  const router = useRouter()
  const { message } = App.useApp()
  const [form] = Form.useForm()

  // Prerequisite options: other courses sharing the currently-selected topic.
  const selectedTopicId = (Form.useWatch('topicId', form) as string | undefined) ?? v.topicId
  const prereqOptions = courses
    .filter((c) => c.topicId === selectedTopicId && c.slug !== course?.slug)
    .map((c) => ({ value: c.slug, label: c.title }))

  const [editLang, setEditLang] = useState<'vi' | 'en'>('vi')
  const [image, setImage] = useState(v.imageUrl)
  const [imageUploading, setImageUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const uploadImage: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    setImageUploading(true)
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
      setImageUploading(false)
    }
  }

  async function onFinish(values: Record<string, unknown>) {
    setSubmitting(true)
    const input: CourseInput = {
      id: course?.id,
      slug: course?.slug,
      status: values.published ? 'PUBLISHED' : 'DRAFT',
      level: values.level as CourseLevelKey,
      topicId: values.topicId as string,
      durationHours: values.durationHours as number,
      durationSessions: values.durationSessions as number,
      title_vi: values.title_vi as string,
      title_en: values.title_en as string,
      description_vi: values.description_vi as string,
      description_en: values.description_en as string,
      learningOutcome_vi: values.learningOutcome_vi as string,
      learningOutcome_en: values.learningOutcome_en as string,
      targetAudience_vi: asArray(values.targetAudience_vi),
      targetAudience_en: asArray(values.targetAudience_en),
      modules_vi: asArray(values.modules_vi),
      modules_en: asArray(values.modules_en),
      finalProject_vi: values.finalProject_vi as string,
      finalProject_en: values.finalProject_en as string,
      deliveryFormat_vi: values.deliveryFormat_vi as string,
      deliveryFormat_en: values.deliveryFormat_en as string,
      tags: Array.isArray(values.tags) ? (values.tags as string[]) : [],
      prerequisite: values.prerequisite as string,
      priceOriginal: values.priceOriginal as number,
      priceSale: (values.priceSale as number | null) ?? null,
      imageUrl: image,
    }
    const res = await saveCourse(input)
    if (res?.error) {
      message.error(res.error)
      setSubmitting(false)
    }
  }

  const initialValues = {
    published: v.status === 'PUBLISHED',
    level: v.level,
    topicId: v.topicId || undefined,
    durationHours: v.durationHours,
    durationSessions: v.durationSessions,
    title_vi: v.title_vi, title_en: v.title_en,
    description_vi: v.description_vi, description_en: v.description_en,
    learningOutcome_vi: v.learningOutcome_vi, learningOutcome_en: v.learningOutcome_en,
    targetAudience_vi: v.targetAudience_vi, targetAudience_en: v.targetAudience_en,
    modules_vi: v.modules_vi, modules_en: v.modules_en,
    finalProject_vi: v.finalProject_vi, finalProject_en: v.finalProject_en,
    deliveryFormat_vi: v.deliveryFormat_vi, deliveryFormat_en: v.deliveryFormat_en,
    tags: v.tags,
    prerequisite: v.prerequisite,
    priceOriginal: v.priceOriginal,
    priceSale: v.priceSale,
  }

  // Per-language fields (both stay mounted so antd Form keeps their values).
  const langFields = (lng: 'vi' | 'en') => (
    <div style={{ display: editLang === lng ? 'block' : 'none' }}>
      <Form.Item name={`title_${lng}`} label="Tiêu đề">
        <Input placeholder={lng === 'vi' ? 'Tên khóa học' : 'Course title'} />
      </Form.Item>
      <Form.Item name={`description_${lng}`} label="Mô tả">
        <Input.TextArea rows={3} placeholder={lng === 'vi' ? 'Mô tả ngắn về khóa học…' : 'Short description…'} />
      </Form.Item>
      <Form.Item name={`learningOutcome_${lng}`} label="Kết quả đạt được">
        <Input.TextArea rows={2} placeholder={lng === 'vi' ? 'Học viên sẽ…' : 'Learners will…'} />
      </Form.Item>
      <Form.Item name={`targetAudience_${lng}`} label="Đối tượng">
        <Select
          mode="tags"
          open={false}
          suffixIcon={null}
          placeholder={lng === 'vi' ? 'Nhập từng đối tượng rồi nhấn Enter' : 'Type each item, press Enter'}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item name={`modules_${lng}`} label="Nội dung / Module">
        <Select
          mode="tags"
          open={false}
          suffixIcon={null}
          placeholder={lng === 'vi' ? 'Nhập từng module rồi nhấn Enter' : 'Type each module, press Enter'}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item name={`finalProject_${lng}`} label="Dự án cuối khóa">
        <Input.TextArea rows={2} placeholder={lng === 'vi' ? 'Mô tả dự án cuối khóa…' : 'Capstone project…'} />
      </Form.Item>
      <Form.Item name={`deliveryFormat_${lng}`} label="Hình thức học">
        <Input placeholder="Online / Hybrid" />
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
          {course?.id ? 'Sửa khóa học' : 'Khóa học mới'}
        </Typography.Title>
        <LangToggle value={editLang} onChange={setEditLang} />
      </div>

      <Section icon={<Info size={16} />} title="Thông tin chung">
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="topicId" label="Chủ đề" rules={[{ required: true, message: 'Chọn chủ đề' }]}>
              <Select
                placeholder="Chọn chủ đề"
                options={topics}
                showSearch
                optionFilterProp="label"
                notFoundContent="Chưa có chủ đề — tạo ở mục Chủ đề"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="level" label="Cấp độ" rules={[{ required: true, message: 'Chọn cấp độ' }]}>
              <Select placeholder="Chọn cấp độ" options={LEVEL_OPTIONS} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="published" label="Trạng thái" valuePropName="checked">
              <Switch checkedChildren="Đã đăng" unCheckedChildren="Nháp" />
            </Form.Item>
          </Col>
          <Col xs={12} sm={8}>
            <Form.Item name="durationHours" label="Số giờ">
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={12} sm={8}>
            <Form.Item name="durationSessions" label="Số buổi">
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={12} sm={8}>
            <Form.Item name="priceOriginal" label="Giá gốc (VNĐ)">
              <InputNumber<number>
                min={0}
                style={{ width: '100%' }}
                formatter={(val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(val) => Number((val ?? '').replace(/,/g, ''))}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={8}>
            <Form.Item name="priceSale" label="Giá khuyến mãi">
              <InputNumber<number>
                min={0}
                style={{ width: '100%' }}
                formatter={(val) => (val === undefined || val === null ? '' : `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','))}
                parser={(val) => Number((val ?? '').replace(/,/g, ''))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name="prerequisite" label="Điều kiện tiên quyết">
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                placeholder="Chọn khóa học tiên quyết (cùng chủ đề)"
                options={prereqOptions}
                notFoundContent={
                  selectedTopicId ? 'Không có khóa học khác cùng chủ đề' : 'Hãy chọn chủ đề trước'
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
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
        </Row>
      </Section>

      <Section icon={<ImageIcon size={16} />} title="Ảnh khóa học">
        <Space align="start" size="large">
          <Upload showUploadList={false} accept="image/*" customRequest={uploadImage}>
            <Button icon={<UploadCloud size={16} />} loading={imageUploading}>
              {image ? 'Đổi ảnh' : 'Chọn ảnh'}
            </Button>
          </Upload>
          {image && (
            <Space orientation="vertical" size={4}>
              <Image src={image} alt="course" width={180} height={120} style={{ objectFit: 'cover', borderRadius: 8 }} />
              <Button type="link" danger size="small" onClick={() => setImage('')}>
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
      </Section>

      <Space>
        <Button type="primary" htmlType="submit" icon={<Save size={16} />} size="large" loading={submitting}>
          Lưu khóa học
        </Button>
        <Button size="large" onClick={() => router.push('/admin/courses')}>
          Huỷ
        </Button>
      </Space>
    </Form>
  )
}
