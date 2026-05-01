import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import BackToTop from './BackToTop'

beforeEach(() => {
  Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true })
})

describe('BackToTop', () => {
  it('does not show button on initial render', () => {
    render(<BackToTop />)
    expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
  })

  it('shows button when scrollY exceeds 300', () => {
    render(<BackToTop />)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 301, writable: true, configurable: true })
      fireEvent.scroll(window)
    })
    expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
  })

  it('hides button when scrollY drops to 300 or below', () => {
    render(<BackToTop />)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 301, writable: true, configurable: true })
      fireEvent.scroll(window)
    })
    expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true, configurable: true })
      fireEvent.scroll(window)
    })
    // AnimatePresence keeps element in DOM during exit animation (opacity:0), check visibility instead
    expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeVisible()
  })

  it('calls window.scrollTo when button is clicked', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    render(<BackToTop />)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 301, writable: true, configurable: true })
      fireEvent.scroll(window)
    })
    fireEvent.click(screen.getByRole('button', { name: /back to top/i }))
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    scrollToSpy.mockRestore()
  })

  it('has correct aria-label', () => {
    render(<BackToTop />)
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 301, writable: true, configurable: true })
      fireEvent.scroll(window)
    })
    expect(screen.getByLabelText('Back to top')).toBeInTheDocument()
  })
})
