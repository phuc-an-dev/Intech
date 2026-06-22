'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { savePost } from './actions'

export interface PostFormValues {
  id?: string
  slug: string; status: string; lang: string; categoryKey: string
  category_vi: string; category_en: string
  title_vi: string; title_en: string
  excerpt_vi: string; excerpt_en: string
  body_vi: string; body_en: string
  tags: string; gradient: string; coverImage: string; readTime: string
  date: string; authorName: string; authorRole_vi: string; authorRole_en: string
  authorImage: string; authorImageAlt: string; relatedCourseSlug: string
}

const empty: PostFormValues = {
  slug: '', status: 'DRAFT', lang: 'vi', categoryKey: '',
  category_vi: '', category_en: '', title_vi: '', title_en: '',
  excerpt_vi: '', excerpt_en: '', body_vi: '', body_en: '',
  tags: '', gradient: 'from-[#002D62] to-blue-800', coverImage: '', readTime: '5',
  date: new Date().toISOString().slice(0, 10), authorName: 'Intech ISC Editorial Team',
  authorRole_vi: '', authorRole_en: '', authorImage: '/logo.svg', authorImageAlt: '',
  relatedCourseSlug: '',
}

function Field({ name, label, defaultValue, textarea }: {
  name: string; label: string; defaultValue?: string; textarea?: boolean
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-gray-600">{label}</span>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue} rows={3}
          className="w-full rounded border px-3 py-2 text-sm" />
      ) : (
        <input name={name} defaultValue={defaultValue} className="w-full rounded border px-3 py-2" />
      )}
    </label>
  )
}

export default function PostForm({ post }: { post?: PostFormValues }) {
  const v = post ?? empty
  const [lang, setLang] = useState<'vi' | 'en'>('vi')
  const [bodyVi, setBodyVi] = useState(v.body_vi)
  const [bodyEn, setBodyEn] = useState(v.body_en)
  const [cover, setCover] = useState(v.coverImage)
  const [preview, setPreview] = useState(false)
  const [uploading, setUploading] = useState(false)

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    setUploading(false)
    if (res.ok) { const { url } = await res.json(); setCover(url) }
    else alert('Upload thất bại')
  }

  return (
    <form action={savePost} className="flex max-w-3xl flex-col gap-4">
      {post?.id && <input type="hidden" name="id" defaultValue={post.id} />}
      <input type="hidden" name="coverImage" value={cover} />
      <input type="hidden" name="body_vi" value={bodyVi} />
      <input type="hidden" name="body_en" value={bodyEn} />

      {/* Metadata grid */}
      <div className="grid grid-cols-2 gap-4">
        <Field name="slug" label="Slug" defaultValue={v.slug} />
        <label className="block text-sm">
          <span className="mb-1 block text-gray-600">Trạng thái</span>
          <select name="status" defaultValue={v.status} className="w-full rounded border px-3 py-2">
            <option value="DRAFT">Nháp</option>
            <option value="PUBLISHED">Đã đăng</option>
          </select>
        </label>
        <Field name="categoryKey" label="Category key" defaultValue={v.categoryKey} />
        <Field name="date" label="Ngày (YYYY-MM-DD)" defaultValue={v.date} />
        <Field name="readTime" label="Read time (phút)" defaultValue={v.readTime} />
        <Field name="tags" label="Tags (phân tách bằng dấu phẩy)" defaultValue={v.tags} />
        <Field name="gradient" label="Gradient CSS" defaultValue={v.gradient} />
        <Field name="relatedCourseSlug" label="Related course slug" defaultValue={v.relatedCourseSlug} />
      </div>

      {/* Cover image */}
      <div className="text-sm">
        <span className="mb-1 block text-gray-600">Ảnh bìa</span>
        <input type="file" accept="image/*" onChange={onUpload} className="text-sm" />
        {uploading && <span className="ml-2 text-gray-400 text-xs">Đang tải…</span>}
        {cover && <img src={cover} alt="" className="mt-2 h-32 rounded object-cover" />}
      </div>

      {/* Language tabs */}
      <div className="flex gap-2 border-b">
        {(['vi', 'en'] as const).map((l) => (
          <button key={l} type="button" onClick={() => setLang(l)}
            className={`px-4 py-2 text-sm ${lang === l ? 'border-b-2 border-[#002D62] font-semibold' : 'text-gray-400'}`}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* VI fields */}
      <div className={lang === 'vi' ? 'flex flex-col gap-4' : 'hidden'}>
        <Field name="title_vi" label="Tiêu đề (VI)" defaultValue={v.title_vi} />
        <Field name="excerpt_vi" label="Tóm tắt (VI)" defaultValue={v.excerpt_vi} textarea />
        <Field name="category_vi" label="Category (VI)" defaultValue={v.category_vi} />
        <Field name="authorRole_vi" label="Author role (VI)" defaultValue={v.authorRole_vi} />
        <label className="block text-sm">
          <span className="mb-1 block text-gray-600">Nội dung Markdown (VI)</span>
          <textarea value={bodyVi} onChange={(e) => setBodyVi(e.target.value)}
            rows={16} className="w-full rounded border px-3 py-2 font-mono text-sm" />
        </label>
      </div>

      {/* EN fields */}
      <div className={lang === 'en' ? 'flex flex-col gap-4' : 'hidden'}>
        <Field name="title_en" label="Title (EN)" defaultValue={v.title_en} />
        <Field name="excerpt_en" label="Excerpt (EN)" defaultValue={v.excerpt_en} textarea />
        <Field name="category_en" label="Category (EN)" defaultValue={v.category_en} />
        <Field name="authorRole_en" label="Author role (EN)" defaultValue={v.authorRole_en} />
        <label className="block text-sm">
          <span className="mb-1 block text-gray-600">Markdown body (EN)</span>
          <textarea value={bodyEn} onChange={(e) => setBodyEn(e.target.value)}
            rows={16} className="w-full rounded border px-3 py-2 font-mono text-sm" />
        </label>
      </div>

      {/* Author */}
      <Field name="authorName" label="Author name" defaultValue={v.authorName} />
      <Field name="authorImage" label="Author image path" defaultValue={v.authorImage} />
      <Field name="authorImageAlt" label="Author image alt" defaultValue={v.authorImageAlt} />

      {/* Preview */}
      <button type="button" onClick={() => setPreview((p) => !p)}
        className="self-start text-sm text-[#00A3C1] hover:underline">
        {preview ? 'Ẩn xem trước' : 'Xem trước'} ({lang.toUpperCase()})
      </button>
      {preview && (
        <div className="prose max-w-none rounded border bg-white p-4 text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {lang === 'vi' ? bodyVi : bodyEn}
          </ReactMarkdown>
        </div>
      )}

      <button className="self-start rounded bg-[#002D62] px-6 py-2 font-semibold text-white hover:bg-[#00396e]">
        Lưu
      </button>
    </form>
  )
}
