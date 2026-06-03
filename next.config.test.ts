import { describe, expect, it } from 'vitest'
import nextConfig from './next.config'

describe('next redirects', () => {
  it('permanently redirects legacy insight URLs to blog URLs', async () => {
    expect(nextConfig.redirects).toBeTypeOf('function')

    const redirects = await nextConfig.redirects?.()

    expect(redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: '/insights/:path*',
          destination: '/blog/:path*',
          permanent: true,
        }),
        expect.objectContaining({
          source: '/en/insights/:path*',
          destination: '/en/blog/:path*',
          permanent: true,
        }),
      ])
    )
  })
})
