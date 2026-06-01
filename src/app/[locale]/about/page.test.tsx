import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AboutPage from './page'

describe('About Page', () => {
  it('renders the real-world learning gallery', () => {
    render(<AboutPage />)

    expect(screen.getByText('gallery_title')).toBeInTheDocument()
    expect(screen.getByText('gallery_desc')).toBeInTheDocument()
    expect(screen.queryByText('gallery_count_label')).not.toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /open gallery image/i })).toHaveLength(20)

    fireEvent.click(screen.getByRole('button', { name: /^open gallery image 1$/i }))

    expect(screen.getByRole('dialog', { name: /gallery image preview/i })).toBeInTheDocument()
    expect(screen.getByText('1 / 20')).toBeInTheDocument()
  })
})
