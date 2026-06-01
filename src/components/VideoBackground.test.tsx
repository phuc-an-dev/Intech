import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import VideoBackground from './VideoBackground'

const originalMatchMedia = window.matchMedia

afterEach(() => {
  window.matchMedia = originalMatchMedia
})

function setReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

describe('VideoBackground', () => {
  it('renders video only for tablet and desktop layouts with a poster image', () => {
    setReducedMotion(false)

    render(
      <VideoBackground
        src="/videos/hero_loop.mp4"
        poster="/hero-image-pc.jpg"
        alt="Home hero"
        className="opacity-80"
      />,
    )

    const video = screen.getByTestId('video-background')
    expect(video).toHaveClass('hidden', 'md:block', 'opacity-80')
    expect(video).toHaveAttribute('poster', '/hero-image-pc.jpg')
    expect(video).toHaveAttribute('autoPlay')
    expect(video).toHaveProperty('muted', true)
    expect(video).toHaveAttribute('loop')
    expect(video).toHaveAttribute('playsInline')
  })

  it('falls back to the poster image when the video errors', () => {
    setReducedMotion(false)

    render(
      <VideoBackground
        src="/videos/hero_loop.mp4"
        poster="/hero-image-pc.jpg"
        alt="Home hero"
      />,
    )

    fireEvent.error(screen.getByTestId('video-background'))

    expect(screen.getByAltText('Home hero')).toBeInTheDocument()
    expect(screen.queryByTestId('video-background')).not.toBeInTheDocument()
  })

  it('shows the poster image instead of video when reduced motion is enabled', () => {
    setReducedMotion(true)

    render(
      <VideoBackground
        src="/videos/hero_loop.mp4"
        poster="/hero-image-pc.jpg"
        alt="Home hero"
      />,
    )

    expect(screen.getByAltText('Home hero')).toBeInTheDocument()
    expect(screen.queryByTestId('video-background')).not.toBeInTheDocument()
  })
})
