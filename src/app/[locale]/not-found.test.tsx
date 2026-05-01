import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NotFound from './not-found'

describe('Not Found Page (404)', () => {
  it('renders the 404 text and main heading', () => {
    render(<NotFound />)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /Không tìm thấy trang/i })).toBeInTheDocument()
  })

  it('renders the back to home button', () => {
    render(<NotFound />)
    const homeLink = screen.getByRole('link', { name: /Về Trang chủ/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders helpful links', () => {
    render(<NotFound />)
    expect(screen.getByText(/Bạn đang tìm kiếm điều gì khác/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Liên hệ/i })).toBeInTheDocument()
  })
})
