'use client'

import { useState, type ReactNode } from 'react'
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
  type FormInstance,
} from 'antd'
import type { UploadProps } from 'antd'
import {
  UploadCloud, Save, Plus, Trash2, Info, FileText, Sparkles,
  CalendarDays, Users, Images, ImageOff, ImagePlus,
} from 'lucide-react'
import { saveTour, type TourInput } from './actions'
import { Section, LangToggle, ADMIN_NAVY as NAVY } from '../Section'

type Lang = 'vi' | 'en'

export interface Highlight { title: string; desc: string }
export interface ItineraryRow { period: string; theme: string; activities: string }
export interface GalleryItem { src: string; alt: string; name: string }

export interface TourFormValues {
  id?: string
  slug: string
  status: string
  order: number
  coverImage: string
  duration_vi: string; duration_en: string
  name_vi: string; name_en: string
  subtitle_vi: string; subtitle_en: string
  destination_vi: string; destination_en: string
  price_vi: string; price_en: string
  groupSize_vi: string; groupSize_en: string
  certificate_vi: string; certificate_en: string
  whyJoin_vi: string; whyJoin_en: string
  customization_vi: string; customization_en: string
  highlights_vi: Highlight[]; highlights_en: Highlight[]
  audience_vi: string[]; audience_en: string[]
  itinerary_vi: ItineraryRow[]; itinerary_en: ItineraryRow[]
  includes_vi: string[]; includes_en: string[]
  excludes_vi: string[]; excludes_en: string[]
  gallery_vi: GalleryItem[]; gallery_en: GalleryItem[]
}

const empty: TourFormValues = {
  slug: '', status: 'PUBLISHED', order: 0, coverImage: '',
  duration_vi: '', duration_en: '', name_vi: '', name_en: '',
  subtitle_vi: '', subtitle_en: '', destination_vi: '', destination_en: '',
  price_vi: '', price_en: '', groupSize_vi: '', groupSize_en: '',
  certificate_vi: '', certificate_en: '', whyJoin_vi: '', whyJoin_en: '',
  customization_vi: '', customization_en: '',
  highlights_vi: [], highlights_en: [], audience_vi: [], audience_en: [],
  itinerary_vi: [], itinerary_en: [], includes_vi: [], excludes_vi: [],
  includes_en: [], excludes_en: [], gallery_vi: [], gallery_en: [],
}

async function uploadToS3(file: File): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
  if (!res.ok) throw new Error('upload failed')
  const { url } = await res.json()
  return url as string
}

/** A numbered, removable row wrapper for repeatable Form.List entries. */
function RowItem({ index, onRemove, children }: { index: number; onRemove: () => void; children: ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        border: '1px solid #eef0f3',
        borderRadius: 10,
        padding: '16px 48px 4px 52px',
        marginBottom: 12,
        background: '#fcfcfd',
      }}
    >
      <span
        style={{
          position: 'absolute', left: 14, top: 16, width: 26, height: 26, borderRadius: '50%',
          background: NAVY, color: '#fff', fontSize: 12, fontWeight: 700,
          display: 'grid', placeItems: 'center',
        }}
      >
        {index + 1}
      </span>
      {children}
      <Button
        danger
        type="text"
        icon={<Trash2 size={15} />}
        onClick={onRemove}
        style={{ position: 'absolute', right: 8, top: 10 }}
      />
    </div>
  )
}

/** One gallery row: image upload + preview + alt text. */
function GalleryRow({
  form, lng, name, index, onRemove,
}: {
  form: FormInstance
  lng: Lang
  name: number
  index: number
  onRemove: () => void
}) {
  const { message } = App.useApp()
  const [uploading, setUploading] = useState(false)
  const src = Form.useWatch([`gallery_${lng}`, name, 'src'], form) as string | undefined

  const customRequest: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    setUploading(true)
    try {
      const url = await uploadToS3(file as File)
      form.setFieldValue([`gallery_${lng}`, name, 'src'], url)
      message.success('Đã tải ảnh')
      onSuccess?.(url)
    } catch (e) {
      message.error('Tải ảnh thất bại')
      onError?.(e as Error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <RowItem index={index} onRemove={onRemove}>
      <Space align="start" size="middle" style={{ width: '100%' }}>
        {src ? (
          <Image src={src} alt="gallery" width={104} height={70} style={{ objectFit: 'cover', borderRadius: 8 }} />
        ) : (
          <div style={{ width: 104, height: 70, borderRadius: 8, background: '#f5f6f8', border: '1px dashed #d9d9d9', display: 'grid', placeItems: 'center', color: '#bfbfbf' }}>
            <ImageOff size={20} />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <Upload showUploadList={false} accept="image/*" customRequest={customRequest}>
            <Button size="small" icon={<UploadCloud size={14} />} loading={uploading}>
              {src ? 'Đổi ảnh' : 'Tải ảnh'}
            </Button>
          </Upload>
          <Form.Item name={[name, 'alt']} style={{ marginTop: 10, marginBottom: 8 }}>
            <Input placeholder="Alt text (mô tả ảnh)" />
          </Form.Item>
          <Form.Item name={[name, 'name']} hidden>
            <Input />
          </Form.Item>
        </div>
      </Space>
    </RowItem>
  )
}

export default function TourForm({ tour }: { tour?: TourFormValues }) {
  const v = tour ?? empty
  const router = useRouter()
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const [editLang, setEditLang] = useState<Lang>('vi')
  const [submitting, setSubmitting] = useState(false)
  const [cover, setCover] = useState(v.coverImage)
  const [coverUploading, setCoverUploading] = useState(false)

  const uploadCover: UploadProps['customRequest'] = async ({ file, onSuccess, onError }) => {
    setCoverUploading(true)
    try {
      const url = await uploadToS3(file as File)
      setCover(url)
      message.success('Đã tải ảnh đại diện')
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
    const input: TourInput = {
      id: tour?.id,
      slug: tour?.slug,
      status: values.published ? 'PUBLISHED' : 'DRAFT',
      order: (values.order as number) ?? 0,
      coverImage: cover,
      duration_vi: values.duration_vi as string, duration_en: values.duration_en as string,
      name_vi: values.name_vi as string, name_en: values.name_en as string,
      subtitle_vi: values.subtitle_vi as string, subtitle_en: values.subtitle_en as string,
      destination_vi: values.destination_vi as string, destination_en: values.destination_en as string,
      price_vi: values.price_vi as string, price_en: values.price_en as string,
      groupSize_vi: values.groupSize_vi as string, groupSize_en: values.groupSize_en as string,
      certificate_vi: values.certificate_vi as string, certificate_en: values.certificate_en as string,
      whyJoin_vi: values.whyJoin_vi as string, whyJoin_en: values.whyJoin_en as string,
      customization_vi: values.customization_vi as string, customization_en: values.customization_en as string,
      highlights_vi: (values.highlights_vi as Highlight[]) ?? [], highlights_en: (values.highlights_en as Highlight[]) ?? [],
      audience_vi: (values.audience_vi as string[]) ?? [], audience_en: (values.audience_en as string[]) ?? [],
      itinerary_vi: (values.itinerary_vi as ItineraryRow[]) ?? [], itinerary_en: (values.itinerary_en as ItineraryRow[]) ?? [],
      includes_vi: (values.includes_vi as string[]) ?? [], includes_en: (values.includes_en as string[]) ?? [],
      excludes_vi: (values.excludes_vi as string[]) ?? [], excludes_en: (values.excludes_en as string[]) ?? [],
      gallery_vi: (values.gallery_vi as GalleryItem[]) ?? [], gallery_en: (values.gallery_en as GalleryItem[]) ?? [],
    }
    const res = await saveTour(input)
    if (res?.error) {
      message.error(res.error)
      setSubmitting(false)
    }
  }

  const initialValues = {
    published: v.status === 'PUBLISHED',
    order: v.order,
    duration_vi: v.duration_vi, duration_en: v.duration_en,
    name_vi: v.name_vi, name_en: v.name_en,
    subtitle_vi: v.subtitle_vi, subtitle_en: v.subtitle_en,
    destination_vi: v.destination_vi, destination_en: v.destination_en,
    price_vi: v.price_vi, price_en: v.price_en,
    groupSize_vi: v.groupSize_vi, groupSize_en: v.groupSize_en,
    certificate_vi: v.certificate_vi, certificate_en: v.certificate_en,
    whyJoin_vi: v.whyJoin_vi, whyJoin_en: v.whyJoin_en,
    customization_vi: v.customization_vi, customization_en: v.customization_en,
    highlights_vi: v.highlights_vi, highlights_en: v.highlights_en,
    audience_vi: v.audience_vi, audience_en: v.audience_en,
    itinerary_vi: v.itinerary_vi, itinerary_en: v.itinerary_en,
    includes_vi: v.includes_vi, includes_en: v.includes_en,
    excludes_vi: v.excludes_vi, excludes_en: v.excludes_en,
    gallery_vi: v.gallery_vi, gallery_en: v.gallery_en,
  }

  const tagSelect = (placeholder: string) => (
    <Select mode="tags" open={false} suffixIcon={null} placeholder={placeholder} style={{ width: '100%' }} />
  )

  // Per-language content (both stay mounted so antd Form keeps their values).
  const langFields = (lng: Lang) => (
    <div style={{ display: editLang === lng ? 'block' : 'none' }}>
      <Section icon={<Info size={16} />} title="Thông tin cơ bản">
        <Row gutter={16}>
          <Col xs={24} sm={16}>
            <Form.Item name={`name_${lng}`} label="Tên tour">
              <Input placeholder={lng === 'vi' ? 'Tên chương trình' : 'Program name'} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item name={`duration_${lng}`} label="Thời lượng">
              <Input placeholder={lng === 'vi' ? '7 Ngày' : '7 Days'} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name={`subtitle_${lng}`} label="Phụ đề">
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 3 }} placeholder={lng === 'vi' ? 'Mô tả ngắn dưới tiêu đề' : 'Short subtitle'} />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name={`destination_${lng}`} label="Điểm đến">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name={`groupSize_${lng}`} label="Quy mô nhóm">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name={`price_${lng}`} label="Học phí">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name={`certificate_${lng}`} label="Chứng chỉ">
              <Input.TextArea autoSize={{ minRows: 1, maxRows: 3 }} />
            </Form.Item>
          </Col>
        </Row>
      </Section>

      <Section icon={<FileText size={16} />} title="Giới thiệu chương trình">
        <Form.Item name={`whyJoin_${lng}`} label="Vì sao nên tham gia" style={{ marginBottom: 16 }}>
          <Input.TextArea autoSize={{ minRows: 4, maxRows: 10 }} />
        </Form.Item>
        <Form.Item name={`customization_${lng}`} label="Tùy chỉnh chương trình" style={{ marginBottom: 0 }}>
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
        </Form.Item>
      </Section>

      <Section
        icon={<Sparkles size={16} />}
        title="Điểm nổi bật"
        extra={<Typography.Text type="secondary" style={{ fontSize: 12 }}>tiêu đề + mô tả</Typography.Text>}
      >
        <Form.List name={`highlights_${lng}`}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, idx) => (
                <RowItem key={field.key} index={idx} onRemove={() => remove(field.name)}>
                  <Form.Item name={[field.name, 'title']} style={{ marginBottom: 10 }}>
                    <Input placeholder="Tiêu đề điểm nổi bật" />
                  </Form.Item>
                  <Form.Item name={[field.name, 'desc']} style={{ marginBottom: 8 }}>
                    <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} placeholder="Mô tả" />
                  </Form.Item>
                </RowItem>
              ))}
              <Button type="dashed" block icon={<Plus size={15} />} onClick={() => add({ title: '', desc: '' })}>
                Thêm điểm nổi bật
              </Button>
            </>
          )}
        </Form.List>
      </Section>

      <Section
        icon={<CalendarDays size={16} />}
        title="Lịch trình"
        extra={<Typography.Text type="secondary" style={{ fontSize: 12 }}>mốc · chủ đề · hoạt động</Typography.Text>}
      >
        <Form.List name={`itinerary_${lng}`}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, idx) => (
                <RowItem key={field.key} index={idx} onRemove={() => remove(field.name)}>
                  <Row gutter={10}>
                    <Col xs={24} sm={8}>
                      <Form.Item name={[field.name, 'period']} style={{ marginBottom: 10 }}>
                        <Input placeholder={lng === 'vi' ? 'Ngày 1' : 'Day 1'} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={16}>
                      <Form.Item name={[field.name, 'theme']} style={{ marginBottom: 10 }}>
                        <Input placeholder="Chủ đề" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item name={[field.name, 'activities']} style={{ marginBottom: 8 }}>
                    <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} placeholder="Hoạt động" />
                  </Form.Item>
                </RowItem>
              ))}
              <Button type="dashed" block icon={<Plus size={15} />} onClick={() => add({ period: '', theme: '', activities: '' })}>
                Thêm mốc lịch trình
              </Button>
            </>
          )}
        </Form.List>
      </Section>

      <Section icon={<Users size={16} />} title="Đối tượng & Chi phí">
        <Form.Item name={`audience_${lng}`} label="Đối tượng phù hợp">
          {tagSelect('Nhập đối tượng rồi nhấn Enter')}
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name={`includes_${lng}`} label="Chi phí bao gồm" style={{ marginBottom: 0 }}>
              {tagSelect('Nhập rồi nhấn Enter')}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name={`excludes_${lng}`} label="Không bao gồm" style={{ marginBottom: 0 }}>
              {tagSelect('Nhập rồi nhấn Enter')}
            </Form.Item>
          </Col>
        </Row>
      </Section>

      <Section icon={<Images size={16} />} title="Thư viện ảnh">
        <Form.List name={`gallery_${lng}`}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, idx) => (
                <GalleryRow key={field.key} form={form} lng={lng} name={field.name} index={idx} onRemove={() => remove(field.name)} />
              ))}
              <Button type="dashed" block icon={<Plus size={15} />} onClick={() => add({ src: '', alt: '', name: '' })}>
                Thêm ảnh
              </Button>
            </>
          )}
        </Form.List>
      </Section>
    </div>
  )

  return (
    <Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish} requiredMark="optional">
      <div style={{ maxWidth: 920, margin: '0 auto', paddingBottom: 48 }}>
        {/* Header: title + language switch */}
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12, marginBottom: 20,
          }}
        >
          <Typography.Title level={3} style={{ color: NAVY, margin: 0 }}>
            {tour?.id ? 'Sửa tour' : 'Tour mới'}
          </Typography.Title>
          <LangToggle value={editLang} onChange={setEditLang} />
        </div>

        <Section icon={<Info size={16} />} title="Trạng thái & hiển thị">
          <Row gutter={16} align="bottom">
            <Col xs={12} sm={8}>
              <Form.Item name="published" label="Trạng thái" valuePropName="checked" style={{ marginBottom: 0 }}>
                <Switch checkedChildren="Đã đăng" unCheckedChildren="Nháp" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={8}>
              <Form.Item name="order" label="Thứ tự hiển thị" style={{ marginBottom: 0 }}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Section>

        <Section icon={<ImagePlus size={16} />} title="Ảnh đại diện">
          <Space align="start" size="large">
            <Upload showUploadList={false} accept="image/*" customRequest={uploadCover}>
              <Button icon={<UploadCloud size={16} />} loading={coverUploading}>
                {cover ? 'Đổi ảnh' : 'Chọn ảnh'}
              </Button>
            </Upload>
            {cover && (
              <Space orientation="vertical" size={4}>
                <Image src={cover} alt="cover" width={200} height={120} style={{ objectFit: 'cover', borderRadius: 8 }} />
                <Button type="link" danger size="small" onClick={() => setCover('')}>
                  Xóa ảnh
                </Button>
              </Space>
            )}
          </Space>
          <Typography.Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0, fontSize: 12 }}>
            Dùng làm ảnh thẻ ở trang danh sách và ảnh nền hero ở trang chi tiết.
          </Typography.Paragraph>
        </Section>

        {langFields('vi')}
        {langFields('en')}

        <Space style={{ marginTop: 4 }}>
          <Button type="primary" htmlType="submit" icon={<Save size={16} />} size="large" loading={submitting}>
            Lưu tour
          </Button>
          <Button size="large" onClick={() => router.push('/admin/tours')}>
            Huỷ
          </Button>
        </Space>
      </div>
    </Form>
  )
}
