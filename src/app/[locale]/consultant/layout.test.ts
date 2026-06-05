import { describe, expect, it } from 'vitest'
import { generateMetadata } from './layout'

describe('consultant metadata', () => {
  it('sets canonical and language alternates for the page URL', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })

    expect(metadata.alternates).toEqual({
      canonical: 'https://www.intechisc.com/en/consultant',
      languages: {
        vi: 'https://www.intechisc.com/consultant',
        en: 'https://www.intechisc.com/en/consultant',
      },
    })
    expect(metadata.openGraph).toEqual(
      expect.objectContaining({
        url: 'https://www.intechisc.com/en/consultant',
      })
    )
  })
})
