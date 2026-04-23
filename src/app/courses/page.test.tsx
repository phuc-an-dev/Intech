import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CoursesPage from './page'

describe('Courses Page', () => {
  it('renders the main heading', () => {
    render(<CoursesPage />)
    const heading = screen.getByRole('heading', { level: 1, name: /Khám phá Khóa học/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the search bar', () => {
    render(<CoursesPage />)
    expect(screen.getByPlaceholderText(/Tìm kiếm khóa học bạn quan tâm/i)).toBeInTheDocument()
  })

  it('renders course categories', () => {
    render(<CoursesPage />)
    expect(screen.getAllByText('Technology').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Design').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Business').length).toBeGreaterThan(0)
  })

  it('renders course cards with details', () => {
    render(<CoursesPage />)
    // Check for a specific course title
    expect(screen.getByText(/Lập trình Fullstack Next.js Pro/i)).toBeInTheDocument()
    // Check for duration and level info
    expect(screen.getAllByText(/Tuần/i).length).toBeGreaterThan(0)
  })

  it('renders the consultant CTA section', () => {
    render(<CoursesPage />)
    expect(screen.getByText(/Bạn chưa tìm thấy khóa học phù hợp/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Nhận tư vấn miễn phí/i })).toBeInTheDocument()
  })
})
