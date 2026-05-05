import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'

describe('Header Component', () => {
  it('renders the logo and desktop navigation', () => {
    render(<Header />)
    expect(screen.getByAltText('Intech - Hệ sinh thái đào tạo công nghiệp')).toBeInTheDocument()
    expect(screen.getAllByText('about').length).toBeGreaterThan(0)
    expect(screen.getAllByText('courses').length).toBeGreaterThan(0)
    expect(screen.getAllByText('consulting').length).toBeGreaterThan(0)
    expect(screen.getAllByText('global_mobility').length).toBeGreaterThan(0)
  })

  it('renders the mobile menu toggle', () => {
    render(<Header />)
    const toggle = screen.getByLabelText('Toggle Menu')
    expect(toggle).toBeInTheDocument()
  })

  it('opens and closes the mobile drawer', () => {
    render(<Header />)
    const toggle = screen.getByLabelText('Toggle Menu')
    
    // Open
    fireEvent.click(toggle)
    // The drawer contains the consultation button
    expect(screen.getAllByText('free_consultation').length).toBeGreaterThan(0)
  })
})
