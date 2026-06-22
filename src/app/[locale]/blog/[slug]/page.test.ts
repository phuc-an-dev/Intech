import { describe, expect, it, vi } from 'vitest'
import { generateMetadata } from './page'

const mockPost = {
  id: 'test-id',
  slug: 'sample-post',
  status: 'PUBLISHED' as const,
  lang: 'en',
  categoryKey: 'ai-workforce',
  category_vi: 'AI & Nhân lực',
  category_en: 'AI & Workforce',
  title_vi: 'Tiêu đề bài viết',
  title_en: 'Sample Post Title',
  excerpt_vi: 'Tóm tắt bài viết',
  excerpt_en: 'Sample post excerpt',
  body_vi: 'Nội dung bài viết',
  body_en: 'Sample post body',
  tags: ['AI', 'Vietnam'],
  gradient: 'from-[#002D62] to-blue-800',
  coverImage: '/images/sample.jpg',
  readTime: 10,
  date: new Date('2025-11-01'),
  authorName: 'Intech ISC Editorial Team',
  authorRole_vi: 'Đội ngũ chuyên môn',
  authorRole_en: 'Editorial team',
  authorImage: '/logo.svg',
  authorImageAlt: 'Intech ISC',
  relatedCourseSlug: 'ai-strategic-leadership',
  createdAt: new Date(),
  updatedAt: new Date(),
}

vi.mock('@/lib/posts', () => ({
  getPublishedSlugs: vi.fn(async () => [{ slug: 'sample-post' }]),
  getPublishedPosts: vi.fn(async () => [mockPost]),
  getPostBySlug: vi.fn(async () => mockPost),
  getPostTitle: (p: typeof mockPost, locale: string) => locale === 'vi' ? p.title_vi : p.title_en,
  getPostExcerpt: (p: typeof mockPost, locale: string) => locale === 'vi' ? p.excerpt_vi : p.excerpt_en,
  getPostCategory: (p: typeof mockPost, locale: string) => locale === 'vi' ? p.category_vi : p.category_en,
  getPostBody: (p: typeof mockPost, locale: string) => locale === 'vi' ? p.body_vi : p.body_en,
  getPostTags: (p: typeof mockPost) => p.tags,
  formatPostDate: (d: Date, _locale: string) => d.toISOString().slice(0, 10),
}))

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => key),
  setRequestLocale: vi.fn(),
}))

describe('blog article metadata', () => {
  it('sets canonical and language alternates for each article URL', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'sample-post' }),
    })

    expect(metadata.alternates).toEqual({
      canonical: 'https://www.intechisc.com/en/blog/sample-post',
      languages: {
        vi: 'https://www.intechisc.com/blog/sample-post',
        en: 'https://www.intechisc.com/en/blog/sample-post',
      },
    })
    expect(metadata.openGraph).toEqual(
      expect.objectContaining({
        url: 'https://www.intechisc.com/en/blog/sample-post',
      })
    )
  })
})
