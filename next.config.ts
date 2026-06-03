import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  transpilePackages: ['swiper'],
  async redirects() {
    return [
      {
        source: '/insights/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      {
        source: '/en/insights/:path*',
        destination: '/en/blog/:path*',
        permanent: true,
      },
      {
        source: '/vi/insights/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default withNextIntl(nextConfig);
