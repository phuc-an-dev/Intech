import { describe, expect, it } from 'vitest'
import { insights } from '@/data/insights'
import { generateMetadata } from './page'

describe('blog article metadata', () => {
  it('sets canonical and language alternates for each article URL', async () => {
    const insight = insights[0]

    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: insight.slug }),
    })

    expect(metadata.alternates).toEqual({
      canonical: `https://www.intechisc.com/en/blog/${insight.slug}`,
      languages: {
        vi: `https://www.intechisc.com/blog/${insight.slug}`,
        en: `https://www.intechisc.com/en/blog/${insight.slug}`,
      },
    })
    expect(metadata.openGraph).toEqual(
      expect.objectContaining({
        url: `https://www.intechisc.com/en/blog/${insight.slug}`,
      })
    )
  })
})
