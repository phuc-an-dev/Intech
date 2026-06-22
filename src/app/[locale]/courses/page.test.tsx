import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Course data now comes from the DB; the page test only asserts static UI,
// so stub the data accessors (keeping real exports like COURSE_LEVELS).
vi.mock('@/lib/courses', async (importActual) => ({
  ...(await importActual<typeof import('@/lib/courses')>()),
  getCourses: vi.fn().mockResolvedValue([]),
  getTopics: vi.fn().mockResolvedValue([]),
}))

import CoursesPage, { generateMetadata } from './page'

describe('Courses Page', () => {
  async function renderCoursesPage() {
    const component = await CoursesPage({ params: Promise.resolve({ locale: 'en' }) })
    render(component)
  }

  it('renders the main heading and description', async () => {
    await renderCoursesPage()
    expect(screen.getByText('page_title')).toBeInTheDocument()
    expect(screen.getByText('page_description')).toBeInTheDocument()
  })

  it('renders the search bar', async () => {
    await renderCoursesPage()
    expect(screen.getByText('filters.search')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('filters.search_placeholder')).toBeInTheDocument()
  })

  it('renders course categories/topics filters', async () => {
    await renderCoursesPage()
    expect(screen.getByText('filters.topics')).toBeInTheDocument()
    expect(screen.getByText('filters.all_topics')).toBeInTheDocument()
  })

  it('renders level filters', async () => {
    await renderCoursesPage()
    expect(screen.getByText('filters.levels')).toBeInTheDocument()
    expect(screen.getByText('filters.all_levels')).toBeInTheDocument()
  })

  it('renders results count section', async () => {
    await renderCoursesPage()
    expect(screen.getByText('results_count')).toBeInTheDocument()
  })

  it('sets canonical and language alternates for the courses page', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en' }),
    })

    expect(metadata.alternates).toEqual({
      canonical: 'https://www.intechisc.com/en/courses',
      languages: {
        vi: 'https://www.intechisc.com/courses',
        en: 'https://www.intechisc.com/en/courses',
      },
    })
    expect(metadata.openGraph).toEqual(
      expect.objectContaining({
        url: 'https://www.intechisc.com/en/courses',
      })
    )
  })
})
