import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ConsultantPage from './page'

describe('Consultant Page', () => {
  it('renders the main heading', () => {
    render(<ConsultantPage />)
    expect(screen.getByText('title_line1')).toBeInTheDocument()
    expect(screen.getByText('title_line2')).toBeInTheDocument()
  })

  it('renders expert profiles', () => {
    render(<ConsultantPage />)
    expect(screen.getByText('experts.1.name')).toBeInTheDocument()
    expect(screen.getByText('experts.2.name')).toBeInTheDocument()
    expect(screen.getByText('experts.3.name')).toBeInTheDocument()
  })

  it('renders specialty and education info labels', () => {
    render(<ConsultantPage />)
    expect(screen.getAllByText('specialty_label').length).toBeGreaterThan(0)
    expect(screen.getAllByText('education_label').length).toBeGreaterThan(0)
  })

  it('renders CTA buttons for booking', () => {
    render(<ConsultantPage />)
    expect(screen.getAllByText('book_button').length).toBeGreaterThan(0)
  })

  it('renders the values section', () => {
    render(<ConsultantPage />)
    expect(screen.getByText('why_title')).toBeInTheDocument()
  })
})
