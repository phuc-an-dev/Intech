import { describe, expect, it } from 'vitest'
import {
  getPostTitle,
  getPostExcerpt,
  getPostCategory,
  getPostAuthorRole,
  getPostBody,
  getPostTags,
  formatPostDate,
} from './posts'

const sample = {
  title_vi: 'Tiêu đề', title_en: 'Title',
  excerpt_vi: 'Tóm tắt', excerpt_en: 'Excerpt',
  body_vi: 'Nội dung', body_en: 'Body',
  tags: ['a', 'b'],
  category: { name_vi: 'Loại', name_en: 'Category' },
  author: { role_vi: 'Vai trò', role_en: 'Role' },
} as never

describe('post presentation helpers', () => {
  it('picks vi fields for vi locale', () => {
    expect(getPostTitle(sample, 'vi')).toBe('Tiêu đề')
    expect(getPostExcerpt(sample, 'vi')).toBe('Tóm tắt')
    expect(getPostCategory(sample, 'vi')).toBe('Loại')
    expect(getPostAuthorRole(sample, 'vi')).toBe('Vai trò')
    expect(getPostBody(sample, 'vi')).toBe('Nội dung')
  })
  it('picks en fields for en locale', () => {
    expect(getPostTitle(sample, 'en')).toBe('Title')
    expect(getPostCategory(sample, 'en')).toBe('Category')
    expect(getPostAuthorRole(sample, 'en')).toBe('Role')
    expect(getPostBody(sample, 'en')).toBe('Body')
  })
  it('parses tags array', () => {
    expect(getPostTags(sample)).toEqual(['a', 'b'])
  })
  it('formats date by locale', () => {
    const d = new Date('2025-11-01T00:00:00Z')
    expect(formatPostDate(d, 'en')).toContain('2025')
    expect(formatPostDate(d, 'vi')).toContain('2025')
  })
})
