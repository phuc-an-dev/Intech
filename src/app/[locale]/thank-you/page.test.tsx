import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ThankYouPage from './page'

describe('ThankYouPage', () => {
  it('renders contact_title when type=contact', async () => {
    const jsx = await ThankYouPage({ searchParams: Promise.resolve({ type: 'contact' }) })
    render(jsx)
    expect(screen.getByText('contact_title')).toBeInTheDocument()
    expect(screen.getByText('contact_desc')).toBeInTheDocument()
  })

  it('renders registration_title when type=registration', async () => {
    const jsx = await ThankYouPage({ searchParams: Promise.resolve({ type: 'registration' }) })
    render(jsx)
    expect(screen.getByText('registration_title')).toBeInTheDocument()
    expect(screen.getByText('registration_desc')).toBeInTheDocument()
  })

  it('renders "Bước tiếp theo" steps only for registration', async () => {
    const jsx = await ThankYouPage({ searchParams: Promise.resolve({ type: 'registration' }) })
    render(jsx)
    expect(screen.getByText('Bước tiếp theo:')).toBeInTheDocument()
  })

  it('does not show "Bước tiếp theo" for contact type', async () => {
    const jsx = await ThankYouPage({ searchParams: Promise.resolve({ type: 'contact' }) })
    render(jsx)
    expect(screen.queryByText('Bước tiếp theo:')).not.toBeInTheDocument()
  })

  it('renders default_title when no type provided', async () => {
    const jsx = await ThankYouPage({ searchParams: Promise.resolve({}) })
    render(jsx)
    expect(screen.getByText('default_title')).toBeInTheDocument()
    expect(screen.getByText('default_desc')).toBeInTheDocument()
  })

  it('renders back home and explore courses links', async () => {
    const jsx = await ThankYouPage({ searchParams: Promise.resolve({ type: 'contact' }) })
    render(jsx)
    const links = screen.getAllByRole('link')
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/courses')
  })
})
