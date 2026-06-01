import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AboutPage from './page'

describe('About Page', () => {
  it('renders the real-world learning gallery', () => {
    render(<AboutPage />)

    expect(screen.getByText('gallery_title')).toBeInTheDocument()
    expect(screen.getByText('gallery_desc')).toBeInTheDocument()
    expect(screen.queryByText('gallery_count_label')).not.toBeInTheDocument()
    expect(screen.getAllByAltText(/gallery image/i)).toHaveLength(5)
  })
})
