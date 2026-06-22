import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Featured courses now load from the DB; stub the data accessors so the home
// page renders without a live database (tests assert static translated keys).
vi.mock('@/lib/courses', async (importActual) => ({
  ...(await importActual<typeof import('@/lib/courses')>()),
  getCourses: vi.fn().mockResolvedValue([]),
  getTopics: vi.fn().mockResolvedValue([]),
}))

import Home from './page'

describe('Home Page', () => {
  it('renders the hero section with translated keys', () => {
    render(<Home params={Promise.resolve({ locale: 'en' })} />)
    expect(screen.getByText(/hero.tagline/i)).toBeInTheDocument()
    expect(screen.getByText(/hero.title_line1/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /hero.cta_explore/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /hero.cta_consult/i })).toBeInTheDocument()
  })

  it('renders the core pillars section', () => {
    render(<Home params={Promise.resolve({ locale: 'en' })} />)
    expect(screen.getByText('pillars.title')).toBeInTheDocument()
    expect(screen.getByText('pillars.pillar1.title')).toBeInTheDocument()
    expect(screen.getByText('pillars.pillar2.title')).toBeInTheDocument()
    expect(screen.getByText('pillars.pillar3.title')).toBeInTheDocument()
  })

  it('renders the featured courses section', () => {
    render(<Home params={Promise.resolve({ locale: 'en' })} />)
    expect(screen.getByText('featured_courses.title')).toBeInTheDocument()
  })

  it('renders the why choose us section', () => {
    render(<Home params={Promise.resolve({ locale: 'en' })} />)
    expect(screen.getByText('why_choose_us.title')).toBeInTheDocument()
  })

  it('renders the workshop lead magnet section', () => {
    render(<Home params={Promise.resolve({ locale: 'en' })} />)
    expect(screen.getByText('workshop.tag')).toBeInTheDocument()
    expect(screen.getByText('workshop.title')).toBeInTheDocument()
    expect(screen.getByText('workshop.form.title')).toBeInTheDocument()
  })

  it('renders the vision section', () => {
    render(<Home params={Promise.resolve({ locale: 'en' })} />)
    expect(screen.getByText('vision.tag')).toBeInTheDocument()
    expect(screen.getByText('vision.text')).toBeInTheDocument()
  })
})
