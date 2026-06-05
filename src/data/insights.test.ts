import { describe, expect, it } from 'vitest'
import { insights } from './insights'

describe('insights data', () => {
  it('provides author details and course CTA routing for every article', () => {
    insights.forEach((insight) => {
      expect(insight.author).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          role_vi: expect.any(String),
          role_en: expect.any(String),
          image: expect.stringMatching(/^\//),
        })
      )
      expect(insight.relatedCourseSlug).toEqual(expect.any(String))
    })
  })
})
