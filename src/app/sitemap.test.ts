import { describe, expect, it, vi } from 'vitest'
import sitemap from './sitemap'

vi.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
  },
}))

vi.mock('@/lib/posts', () => ({
  getPublishedSlugs: vi.fn(async () => [{ slug: 'sample-post' }]),
}))

describe('sitemap', () => {
  it('uses the canonical Intech ISC domain and blog URLs', async () => {
    const entries = await sitemap()

    expect(entries).toContainEqual(
      expect.objectContaining({
        url: 'https://www.intechisc.com/blog/sample-post',
      })
    )
    expect(entries).toContainEqual(
      expect.objectContaining({
        url: 'https://www.intechisc.com/en/blog/sample-post',
      })
    )
    expect(entries.some((entry) => entry.url.includes('/insights'))).toBe(false)
    expect(entries.some((entry) => entry.url.startsWith('https://intech.edu.vn'))).toBe(false)
  })

  it('includes all public service pages for both locales', async () => {
    const entries = await sitemap()

    expect(entries).toContainEqual(
      expect.objectContaining({ url: 'https://www.intechisc.com/global-mobility' })
    )
    expect(entries).toContainEqual(
      expect.objectContaining({ url: 'https://www.intechisc.com/en/global-mobility' })
    )
    expect(entries).toContainEqual(
      expect.objectContaining({ url: 'https://www.intechisc.com/global-partnerships' })
    )
    expect(entries).toContainEqual(
      expect.objectContaining({ url: 'https://www.intechisc.com/en/global-partnerships' })
    )
  })
})
