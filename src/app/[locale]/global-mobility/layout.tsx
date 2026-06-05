import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildSiteMetadata } from '@/lib/metadata'

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({ locale, namespace: 'globalMobility' })

  return buildSiteMetadata({
    locale,
    path: '/global-mobility',
    title: `${t('hero_title_line1')} ${t('hero_title_line2')} | Intech ISC`,
    description: t('overview_desc'),
    image: '/og/og-global-mobility.webp',
  })
}

export default function GlobalMobilityLayout({ children }: { children: React.ReactNode }) {
  return children
}
