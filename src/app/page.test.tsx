import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from './page'

describe('Home Page', () => {
  it('renders the hero section with the main slogan', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { level: 1, name: /Intech/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the primary call-to-action buttons', () => {
    render(<Home />)
    const exploreBtn = screen.getByRole('link', { name: /Khám phá khóa học/i })
    const consultBtn = screen.getByRole('link', { name: /Nhận tư vấn ngay/i })
    expect(exploreBtn).toBeInTheDocument()
    expect(consultBtn).toBeInTheDocument()
  })

  it('renders the core domains (Course, Mobility, Consultant)', () => {
    render(<Home />)
    expect(screen.getByText(/Giới thiệu khóa học/i)).toBeInTheDocument()
    expect(screen.getByText(/Student Mobility/i)).toBeInTheDocument()
    expect(screen.getByText(/Industry Consultant/i)).toBeInTheDocument()
  })
  
  it('renders the strategic partners section', () => {
    render(<Home />)
    expect(screen.getByText(/Đối tác chiến lược/i)).toBeInTheDocument()
  })

  it('renders the why choose us section', () => {
    render(<Home />)
    expect(screen.getByText(/Tại sao chọn Intech/i)).toBeInTheDocument()
  })

  it('renders the testimonials section', () => {
    render(<Home />)
    expect(screen.getByText(/Cảm nhận từ học viên/i)).toBeInTheDocument()
  })
})
