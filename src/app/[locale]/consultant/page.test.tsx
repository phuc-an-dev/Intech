import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ConsultingPage from './page'

describe('Consulting Page', () => {
  it('renders hero section', () => {
    render(<ConsultingPage />)
    expect(screen.getByText('hero_tagline')).toBeInTheDocument()
    expect(screen.getByText('hero_title_line1')).toBeInTheDocument()
    expect(screen.getByText('hero_title_line2')).toBeInTheDocument()
  })

  it('renders tagline sequence', () => {
    render(<ConsultingPage />)
    expect(screen.getAllByText('tagline_start').length).toBeGreaterThan(0)
    expect(screen.getAllByText('tagline_scale').length).toBeGreaterThan(0)
    expect(screen.getAllByText('tagline_global').length).toBeGreaterThan(0)
  })

  it('renders overview section', () => {
    render(<ConsultingPage />)
    expect(screen.getByText('overview_title')).toBeInTheDocument()
    expect(screen.getByText('overview_pillar1')).toBeInTheDocument()
  })

  it('renders service tab buttons', () => {
    render(<ConsultingPage />)
    expect(screen.getByText('tab1_name')).toBeInTheDocument()
    expect(screen.getByText('tab2_name')).toBeInTheDocument()
    expect(screen.getByText('tab3_name')).toBeInTheDocument()
    expect(screen.getByText('tab4_name')).toBeInTheDocument()
  })

  it('renders first tab content by default', () => {
    render(<ConsultingPage />)
    expect(screen.getByText('tab1_title')).toBeInTheDocument()
    expect(screen.getByText('tab1_item1_title')).toBeInTheDocument()
    expect(screen.getByText('tab1_item3_title')).toBeInTheDocument()
  })

  it('renders industries section', () => {
    render(<ConsultingPage />)
    expect(screen.getByText('industries_title')).toBeInTheDocument()
    expect(screen.getByText('industry1_title')).toBeInTheDocument()
  })

  it('renders case studies section', () => {
    render(<ConsultingPage />)
    expect(screen.getByText('cases_title')).toBeInTheDocument()
    expect(screen.getAllByText('case_coming_soon').length).toBe(3)
  })

  it('renders approach section with all steps', () => {
    render(<ConsultingPage />)
    expect(screen.getByText('approach_title')).toBeInTheDocument()
    expect(screen.getByText('step1_title')).toBeInTheDocument()
    expect(screen.getByText('step5_title')).toBeInTheDocument()
  })

  it('renders glossary', () => {
    render(<ConsultingPage />)
    expect(screen.getByText('glossary_title')).toBeInTheDocument()
    expect(screen.getByText('glossary_gemba')).toBeInTheDocument()
  })

  it('renders CTA with contact link', () => {
    render(<ConsultingPage />)
    expect(screen.getByText('cta_button')).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /cta_button/i })
    expect(link).toHaveAttribute('href', '/contact')
  })
})
