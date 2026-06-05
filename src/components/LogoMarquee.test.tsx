import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LogoMarquee from './LogoMarquee'

describe('LogoMarquee', () => {
  it('uses partner alt text when rendering fallback logo files', () => {
    render(<LogoMarquee logos={[{ name: 'partner-logo-1', alt: 'Acme Industrial' }]} />)

    expect(screen.getAllByAltText('Acme Industrial')).toHaveLength(2)
  })
})
