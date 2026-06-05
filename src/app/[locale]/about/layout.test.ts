import { describe, expect, it } from 'vitest'
import { generateMetadata } from './layout'

describe('about metadata', () => {
  it('sets a page-specific title, description, and canonical URL', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })

    expect(metadata.title).not.toBe('title')
    expect(metadata.description).not.toBe('description')
    expect(metadata.alternates).toEqual({
      canonical: 'https://www.intechisc.com/en/about',
      languages: {
        vi: 'https://www.intechisc.com/about',
        en: 'https://www.intechisc.com/en/about',
      },
    })
    expect(metadata.openGraph).toEqual(
      expect.objectContaining({
        url: 'https://www.intechisc.com/en/about',
      })
    )
  })
})
