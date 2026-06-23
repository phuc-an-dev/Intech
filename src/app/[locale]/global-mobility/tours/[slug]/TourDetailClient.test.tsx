import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { TourData } from '@/data/tours'
import TourDetailClient from './TourDetailClient'

const tour: TourData = {
  slug: 'vietnam-industry-culture-experience',
  coverImage: '',
  duration: '7 days',
  name: 'Vietnam Industry & Culture Experience',
  subtitle: 'Study tour',
  destination: 'Vietnam',
  price: 'Contact us',
  groupSize: '15 - 40',
  certificate: 'Certificate',
  whyJoin: 'Why join text',
  highlights: [{ title: 'Highlight', desc: 'Highlight description' }],
  audience: ['Students'],
  itinerary: [{ period: 'Day 1', theme: 'Arrival', activities: 'Orientation' }],
  includes: ['Accommodation'],
  excludes: ['Flights'],
  customization: 'Customizable program',
  gallery: [{ name: 'tour-vn-culture-gallery-1.webp', alt: 'Program activity' }],
}

const labels = {
  whyTitle: 'Why join',
  highlightsTitle: 'Highlights',
  whoTitle: 'Who should join',
  itineraryTitle: 'Itinerary',
  feeTitle: 'Fee',
  includesTitle: 'Includes',
  excludesTitle: 'Excludes',
  customTitle: 'Customization',
  cta: 'Contact us',
  back: 'Back',
  groupLabel: 'Group',
  certificateLabel: 'Certificate',
  galleryTitle: 'Program Gallery',
}

describe('TourDetailClient', () => {
  it('does not render the program gallery section', () => {
    render(<TourDetailClient tour={tour} labels={labels} />)

    expect(screen.queryByText('Program Gallery')).not.toBeInTheDocument()
  })
})
