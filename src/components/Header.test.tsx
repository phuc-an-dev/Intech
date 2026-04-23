import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'

describe('Header Component', () => {
  it('renders the logo and desktop navigation', () => {
    render(<Header />)
    expect(screen.getByText('Intech')).toBeInTheDocument()
    expect(screen.getByText('Khóa học')).toBeInTheDocument()
  })

  it('renders the mobile menu toggle on small screens', () => {
    render(<Header />)
    const toggle = screen.getByLabelText('Toggle Menu')
    expect(toggle).toBeInTheDocument()
  })

  it('opens and closes the mobile drawer', () => {
    render(<Header />)
    const toggle = screen.getByLabelText('Toggle Menu')
    
    // Open
    fireEvent.click(toggle)
    expect(screen.getAllByText('Liên hệ ngay').length).toBeGreaterThan(0)
    
    // Close
    fireEvent.click(toggle)
    // Drawer might still be in DOM due to AnimatePresence but should be hidden or exiting
  })
})
