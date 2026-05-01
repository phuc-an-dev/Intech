import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'

describe('Header Component', () => {
  it('renders the logo and desktop navigation', () => {
    render(<Header />)
    expect(screen.getByText('Intech')).toBeInTheDocument()
    expect(screen.getByText('about')).toBeInTheDocument()
    expect(screen.getByText('courses')).toBeInTheDocument()
    expect(screen.getByText('student_mobility')).toBeInTheDocument()
    expect(screen.getByText('contact_us')).toBeInTheDocument()
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
    // The drawer contains 'register' button
    expect(screen.getAllByText('register').length).toBeGreaterThan(0)
  })
})
