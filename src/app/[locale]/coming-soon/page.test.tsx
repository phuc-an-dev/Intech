import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ComingSoon from './page'

describe('Coming Soon Page', () => {
  it('renders the coming soon title', async () => {
    const component = await ComingSoon()
    render(component)
    expect(screen.getByText('title')).toBeInTheDocument()
  })

  it('renders the return to home link', async () => {
    const component = await ComingSoon()
    render(component)
    const homeLink = screen.getByRole('link', { name: /back_to_home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders the notification and subscribe section', async () => {
    const component = await ComingSoon()
    render(component)
    expect(screen.getByRole('button', { name: /notify_button/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email_placeholder/i)).toBeInTheDocument()
  })
})
