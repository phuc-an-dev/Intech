import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GlobalPartnershipsPage from './page'

describe('GlobalPartnershipsPage', () => {
  it('renders hero section', () => {
    render(<GlobalPartnershipsPage />)
    expect(screen.getByText('hero_tagline')).toBeInTheDocument()
    expect(screen.getByText('hero_title_line1')).toBeInTheDocument()
    expect(screen.getByText('hero_title_line2')).toBeInTheDocument()
  })

  it('renders stats', () => {
    render(<GlobalPartnershipsPage />)
    expect(screen.getByText('hero_stat1_label')).toBeInTheDocument()
    expect(screen.getByText('hero_stat2_label')).toBeInTheDocument()
    expect(screen.getByText('hero_stat3_label')).toBeInTheDocument()
  })

  it('renders overview floating card', () => {
    render(<GlobalPartnershipsPage />)
    expect(screen.getByText('overview_title')).toBeInTheDocument()
    expect(screen.getByText('overview_desc')).toBeInTheDocument()
  })

  it('renders partner categories', () => {
    render(<GlobalPartnershipsPage />)
    expect(screen.getByText('partners_title')).toBeInTheDocument()
    expect(screen.getByText('partner_cat1')).toBeInTheDocument()
    expect(screen.getByText('partner_cat4')).toBeInTheDocument()
  })

  it('renders collaboration models', () => {
    render(<GlobalPartnershipsPage />)
    expect(screen.getByText('models_title')).toBeInTheDocument()
    expect(screen.getByText('model1_title')).toBeInTheDocument()
    expect(screen.getByText('model5_title')).toBeInTheDocument()
  })

  it('renders CTA section', () => {
    render(<GlobalPartnershipsPage />)
    expect(screen.getByText('cta_title')).toBeInTheDocument()
    expect(screen.getByText('cta_button')).toBeInTheDocument()
  })
})
