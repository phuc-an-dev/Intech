import type { Metadata } from 'next'
import { getAbsoluteUrl } from './site'

type SiteMetadataInput = {
  locale: string
  path: string
  title: string
  description: string
  image?: string
}

export function buildSiteMetadata({
  locale,
  path,
  title,
  description,
  image = '/og/og-default.webp',
}: SiteMetadataInput): Metadata {
  const canonicalUrl = getAbsoluteUrl(locale, path)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        vi: getAbsoluteUrl('vi', path),
        en: getAbsoluteUrl('en', path),
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
