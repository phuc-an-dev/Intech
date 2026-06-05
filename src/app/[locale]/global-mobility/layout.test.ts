import { describe, expect, it } from 'vitest'
import { generateMetadata } from './layout'

describe('global mobility metadata', () => {
  it('sets canonical and language alternates for the page URL', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })

    expect(metadata.alternates).toEqual({
      canonical: 'https://www.intechisc.com/en/global-mobility',
      languages: {
        vi: 'https://www.intechisc.com/global-mobility',
        en: 'https://www.intechisc.com/en/global-mobility',
      },
    })
    expect(metadata.openGraph).toEqual(
      expect.objectContaining({
        url: 'https://www.intechisc.com/en/global-mobility',
      })
    )
  })
})
