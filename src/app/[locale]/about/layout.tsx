import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildSiteMetadata } from '@/lib/metadata'

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({ locale, namespace: 'about' })

  return buildSiteMetadata({
    locale,
    path: '/about',
    title: `${t('title')} | Intech ISC`,
    description: t('subtitle'),
    image: '/og/og-default.webp',
  })
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
