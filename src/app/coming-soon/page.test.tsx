import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ComingSoon from './page'

describe('Coming Soon Page', () => {
  it('renders the coming soon title', () => {
    render(<ComingSoon />)
    const heading = screen.getByRole('heading', { level: 1, name: /Tính năng đang được/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the return to home link', () => {
    render(<ComingSoon />)
    const homeLink = screen.getByRole('link', { name: /Quay lại Trang chủ/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders the notification and subscribe section', () => {
    render(<ComingSoon />)
    expect(screen.getByRole('button', { name: /Nhận thông báo/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Email của bạn/i)).toBeInTheDocument()
  })
})
