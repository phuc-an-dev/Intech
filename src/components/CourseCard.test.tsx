import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CourseCard from './CourseCard'
import { type LocalizedCourse } from '@/lib/courses'

const mockCourse: LocalizedCourse = {
  slug: 'test-course-slug',
  topicSlug: 'ai-in-action',
  topicName: 'AI Ứng dụng',
  level: 'foundation',
  duration: { hours: 16, sessions: 8 },
  title: 'Test Course',
  description: 'Test description',
  tags: ['AI', 'LLM', 'Prompt'],
  learningOutcome: 'Test outcome',
  priceOriginal: 3500000,
  priceSale: null,
  prerequisite: null,
  targetAudience: [],
  modules: [],
  finalProject: '',
  deliveryFormat: 'Online / Hybrid',
  imageUrl: '/images/courses/course-test-course-slug.webp',
}

describe('CourseCard', () => {
  it('renders course title and description', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('Test Course')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders level badge', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('foundation')).toBeInTheDocument()
  })

  it('renders topic badge', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('AI Ứng dụng')).toBeInTheDocument()
  })

  it('renders duration info', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('16 giờ')).toBeInTheDocument()
    expect(screen.getByText('8 buổi')).toBeInTheDocument()
  })

  it('renders price in VNĐ', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText(/VNĐ/)).toBeInTheDocument()
  })

  it('renders contact label when price is zero', () => {
    render(<CourseCard course={{ ...mockCourse, priceOriginal: 0, priceSale: null }} />)
    expect(screen.getByText('Liên hệ')).toBeInTheDocument()
    expect(screen.queryByText(/0 VNĐ/)).not.toBeInTheDocument()
  })

  it('links to the correct course detail page', () => {
    render(<CourseCard course={mockCourse} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/courses/test-course-slug')
  })

  it('renders up to 3 tags', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('AI')).toBeInTheDocument()
    expect(screen.getByText('LLM')).toBeInTheDocument()
    expect(screen.getByText('Prompt')).toBeInTheDocument()
  })

  it('uses the imageUrl supplied by course data', () => {
    render(<CourseCard course={mockCourse} />)
    const image = screen.getByAltText('Test Course')
    expect(image).toHaveAttribute('src', expect.stringContaining('course-test-course-slug.webp'))
  })
})
