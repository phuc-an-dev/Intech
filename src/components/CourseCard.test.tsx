import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CourseCard from './CourseCard'
import { type Course } from '@/data/courses'

const mockCourse: Course = {
  id: 'test-course',
  slug: 'test-course-slug',
  title: 'Test Course',
  description: 'Test description',
  topicSlug: 'ai-in-action',
  level: 'foundation',
  duration: { hours: 16, sessions: 8 },
  price: 3500000,
  tags: ['AI', 'LLM', 'Prompt'],
  learningOutcome: 'Test outcome',
  prerequisite: null,
}

describe('CourseCard', () => {
  it('renders course title and description', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getAllByText('test-course.title').length).toBeGreaterThan(0)
    expect(screen.getByText('test-course.description')).toBeInTheDocument()
  })

  it('renders level badge', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('foundation')).toBeInTheDocument()
  })

  it('renders topic badge', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('ai-in-action.name')).toBeInTheDocument()
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

  it('links to the correct course detail page', () => {
    render(<CourseCard course={mockCourse} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/courses/test-course-slug')
  })

  it('renders up to 3 tags', () => {
    render(<CourseCard course={mockCourse} />)
    expect(screen.getByText('test-course.tags.0')).toBeInTheDocument()
    expect(screen.getByText('test-course.tags.1')).toBeInTheDocument()
    expect(screen.getByText('test-course.tags.2')).toBeInTheDocument()
  })
})
