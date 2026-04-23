import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ConsultantPage from './page'

describe('Consultant Page', () => {
  it('renders the main heading', () => {
    render(<ConsultantPage />)
    const heading = screen.getByRole('heading', { level: 1, name: /Chuyên gia đầu ngành/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders expert profiles', () => {
    render(<ConsultantPage />)
    expect(screen.getByText('TS. Nguyễn Văn A')).toBeInTheDocument()
    expect(screen.getByText('ThS. Trần Thị B')).toBeInTheDocument()
    expect(screen.getByText('Ông Lê Văn C')).toBeInTheDocument()
  })

  it('renders specialty and education info for experts', () => {
    render(<ConsultantPage />)
    expect(screen.getAllByText(/Chuyên môn/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Học vấn/i).length).toBeGreaterThan(0)
  })

  it('renders CTA buttons for booking', () => {
    render(<ConsultantPage />)
    expect(screen.getAllByText(/Đặt lịch tư vấn/i).length).toBeGreaterThan(0)
  })

  it('renders the values section', () => {
    render(<ConsultantPage />)
    expect(screen.getByText(/Giá trị từ sự dẫn dắt/i)).toBeInTheDocument()
  })
})
