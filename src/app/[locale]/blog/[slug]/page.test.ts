import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { insights } from '@/data/insights'
import BlogDetailPage, { generateMetadata } from './page'

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

  it('renders a visible related-course CTA before the supporting sections', async () => {
    const insight = insights[0]

    const component = await BlogDetailPage({
      params: Promise.resolve({ locale: 'vi', slug: insight.slug }),
    })
    render(component)

    const ctaHeading = screen.getByText('Khóa học liên quan')
    const tagsRegion = screen.getByText(insight.tags[0])
    const ctaLink = screen.getByRole('link', { name: 'cta_button' })

    expect(ctaLink).toHaveAttribute('href', `/courses/${insight.relatedCourseSlug}`)
    expect(
      ctaHeading.compareDocumentPosition(tagsRegion) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })
})
