import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CoursesPage from './page'

describe('Courses Page', () => {
  it('renders the main heading and description', () => {
    render(<CoursesPage />)
    expect(screen.getByText('page_title')).toBeInTheDocument()
    expect(screen.getByText('page_description')).toBeInTheDocument()
  })

  it('renders the search bar', () => {
    render(<CoursesPage />)
    expect(screen.getByText('filters.search')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('filters.search_placeholder')).toBeInTheDocument()
  })

  it('renders course categories/topics filters', () => {
    render(<CoursesPage />)
    expect(screen.getByText('filters.topics')).toBeInTheDocument()
    expect(screen.getByText('filters.all_topics')).toBeInTheDocument()
  })

  it('renders level filters', () => {
    render(<CoursesPage />)
    expect(screen.getByText('filters.levels')).toBeInTheDocument()
    expect(screen.getByText('filters.all_levels')).toBeInTheDocument()
  })

  it('renders results count section', () => {
    render(<CoursesPage />)
    expect(screen.getByText('results_count')).toBeInTheDocument()
  })
})
