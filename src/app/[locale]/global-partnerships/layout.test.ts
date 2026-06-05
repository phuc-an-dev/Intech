import { describe, expect, it } from 'vitest'
import { generateMetadata } from './layout'

describe('global partnerships metadata', () => {
  it('sets canonical and language alternates for the page URL', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })

    expect(metadata.alternates).toEqual({
      canonical: 'https://www.intechisc.com/en/global-partnerships',
      languages: {
        vi: 'https://www.intechisc.com/global-partnerships',
        en: 'https://www.intechisc.com/en/global-partnerships',
      },
    })
    expect(metadata.openGraph).toEqual(
      expect.objectContaining({
        url: 'https://www.intechisc.com/en/global-partnerships',
      })
    )
  })
})
