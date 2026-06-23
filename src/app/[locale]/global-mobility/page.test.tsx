import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import GlobalMobilityClient from './GlobalMobilityClient'
import type { TourCard } from '@/data/tours'

const tours: TourCard[] = [
  { slug: 'tour-one', coverImage: '', name: 'Tour One', duration: '7 Days', destination: 'Ho Chi Minh City', price: 'USD 500', highlights: ['Highlight A', 'Highlight B'] },
  { slug: 'tour-two', coverImage: '', name: 'Tour Two', duration: '14 Days', destination: 'Hanoi', price: 'USD 900', highlights: ['Highlight C'] },
]

const renderPage = () => render(<GlobalMobilityClient tours={tours} />)

describe('Global Mobility Page', () => {
  it('renders hero section', () => {
    renderPage()
    expect(screen.getByText('hero_tagline')).toBeInTheDocument()
    expect(screen.getByText('hero_title_line1')).toBeInTheDocument()
    expect(screen.getByText('hero_title_line2')).toBeInTheDocument()
  })

  it('renders stat counters', () => {
    renderPage()
    expect(screen.getByText('hero_stat1_label')).toBeInTheDocument()
    expect(screen.getByText('hero_stat2_label')).toBeInTheDocument()
    expect(screen.getByText('hero_stat3_label')).toBeInTheDocument()
  })

  it('renders overview section', () => {
    renderPage()
    expect(screen.getByText('overview_title')).toBeInTheDocument()
    expect(screen.getByText('overview_desc')).toBeInTheDocument()
  })

  it('renders study tour overview bullets', () => {
    renderPage()
    expect(screen.getByText('tours_bullet1')).toBeInTheDocument()
    expect(screen.getByText('tours_bullet5')).toBeInTheDocument()
  })

  it('renders tour cards from data', () => {
    renderPage()
    expect(screen.getByText('Tour One')).toBeInTheDocument()
    expect(screen.getByText('Tour Two')).toBeInTheDocument()
  })

  it('renders tour card destinations and highlights', () => {
    renderPage()
    expect(screen.getByText('Ho Chi Minh City')).toBeInTheDocument()
    expect(screen.getByText('Highlight A')).toBeInTheDocument()
    expect(screen.getByText('Hanoi')).toBeInTheDocument()
    expect(screen.getByText('Highlight C')).toBeInTheDocument()
  })

  it('renders academic pathways section', () => {
    renderPage()
    expect(screen.getByText('academic_title')).toBeInTheDocument()
    expect(screen.getByText('pathway1_title')).toBeInTheDocument()
    expect(screen.getByText('pathway2_title')).toBeInTheDocument()
    expect(screen.getByText('pathway3_title')).toBeInTheDocument()
  })

  it('renders pathway items', () => {
    renderPage()
    expect(screen.getByText('pathway1_item1')).toBeInTheDocument()
    expect(screen.getByText('pathway3_item3')).toBeInTheDocument()
  })

  it('renders CTA section with contact link', () => {
    renderPage()
    expect(screen.getByText('cta_title')).toBeInTheDocument()
    const link = screen.getByText('cta_button').closest('a')
    expect(link).toHaveAttribute('href', '/contact')
  })
})
