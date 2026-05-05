import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GlobalMobilityPage from './page'

describe('Global Mobility Page', () => {
  it('renders hero section', () => {
    render(<GlobalMobilityPage />)
    expect(screen.getByText('hero_tagline')).toBeInTheDocument()
    expect(screen.getByText('hero_title_line1')).toBeInTheDocument()
    expect(screen.getByText('hero_title_line2')).toBeInTheDocument()
  })

  it('renders stat counters', () => {
    render(<GlobalMobilityPage />)
    expect(screen.getByText('hero_stat1_label')).toBeInTheDocument()
    expect(screen.getByText('hero_stat2_label')).toBeInTheDocument()
    expect(screen.getByText('hero_stat3_label')).toBeInTheDocument()
  })

  it('renders overview section', () => {
    render(<GlobalMobilityPage />)
    expect(screen.getByText('overview_title')).toBeInTheDocument()
    expect(screen.getByText('overview_desc')).toBeInTheDocument()
  })

  it('renders tour tab buttons', () => {
    render(<GlobalMobilityPage />)
    expect(screen.getByText('tab_inbound')).toBeInTheDocument()
    expect(screen.getByText('tab_outbound')).toBeInTheDocument()
    expect(screen.getByText('tab_exchange')).toBeInTheDocument()
  })

  it('renders first tab content by default', () => {
    render(<GlobalMobilityPage />)
    expect(screen.getByText('inbound_title')).toBeInTheDocument()
    expect(screen.getByText('inbound_item1')).toBeInTheDocument()
    expect(screen.getByText('inbound_item3')).toBeInTheDocument()
  })

  it('renders tour cards', () => {
    render(<GlobalMobilityPage />)
    expect(screen.getByText('tour1_name')).toBeInTheDocument()
    expect(screen.getByText('tour2_name')).toBeInTheDocument()
    expect(screen.getByText('tour3_name')).toBeInTheDocument()
  })

  it('renders tour card destinations and highlights', () => {
    render(<GlobalMobilityPage />)
    expect(screen.getByText('tour1_destination')).toBeInTheDocument()
    expect(screen.getByText('tour1_highlight1')).toBeInTheDocument()
  })

  it('renders academic pathways section', () => {
    render(<GlobalMobilityPage />)
    expect(screen.getByText('academic_title')).toBeInTheDocument()
    expect(screen.getByText('pathway1_title')).toBeInTheDocument()
    expect(screen.getByText('pathway2_title')).toBeInTheDocument()
    expect(screen.getByText('pathway3_title')).toBeInTheDocument()
  })

  it('renders pathway items', () => {
    render(<GlobalMobilityPage />)
    expect(screen.getByText('pathway1_item1')).toBeInTheDocument()
    expect(screen.getByText('pathway3_item3')).toBeInTheDocument()
  })

  it('renders CTA section with contact link', () => {
    render(<GlobalMobilityPage />)
    expect(screen.getByText('cta_title')).toBeInTheDocument()
    const link = screen.getByText('cta_button').closest('a')
    expect(link).toHaveAttribute('href', '/contact')
  })
})
