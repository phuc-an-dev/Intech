import { describe, expect, it } from 'vitest'
import { buildKey } from './s3'

describe('buildKey', () => {
  it('namespaces under uploads/ and keeps the extension', () => {
    const key = buildKey('My Photo.PNG', 'abc123')
    expect(key.startsWith('uploads/')).toBe(true)
    expect(key.endsWith('.png')).toBe(true)
    expect(key).toContain('abc123')
  })
  it('sanitizes spaces and unsafe chars', () => {
    const key = buildKey('a b/c?.jpg', 'id')
    const filename = key.replace('uploads/', '')
    expect(filename).not.toMatch(/[ ?]/)
  })
})
