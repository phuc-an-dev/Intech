import { describe, expect, it, vi } from 'vitest'
import sitemap from './sitemap'
import { insights } from '@/data/insights'

vi.mock('@/i18n/routing', () => ({
  routing: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
  },
}))

describe('sitemap', () => {
  it('uses the canonical Intech ISC domain and blog URLs', () => {
    const entries = sitemap()
    const firstInsight = insights[0]

    expect(entries).toContainEqual(
      expect.objectContaining({
        url: `https://www.intechisc.com/blog/${firstInsight.slug}`,
      })
    )
    expect(entries).toContainEqual(
      expect.objectContaining({
        url: `https://www.intechisc.com/en/blog/${firstInsight.slug}`,
      })
    )
    expect(entries.some((entry) => entry.url.includes('/insights'))).toBe(false)
    expect(entries.some((entry) => entry.url.startsWith('https://intech.edu.vn'))).toBe(false)
  })

  it('includes all public service pages for both locales', () => {
    const entries = sitemap()

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
