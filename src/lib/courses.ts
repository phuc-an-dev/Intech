import { fetchCoursesSheet, fetchTopicsSheet } from './sheets'

export type CourseLevel = 'foundation' | 'tools' | 'application' | 'advanced' | 'strategic'

export const COURSE_LEVELS: CourseLevel[] = ['foundation', 'tools', 'application', 'advanced', 'strategic']

export interface LocalizedCourse {
  slug: string
  topicSlug: string
  topicName: string
  level: CourseLevel
  duration: { hours: number; sessions: number }
  title: string
  description: string
  tags: string[]
  learningOutcome: string
  priceOriginal: number
  priceSale: number | null
  prerequisite: string | null
}

export interface LocalizedTopic {
  slug: string
  name: string
  description: string
}

function pick(row: Record<string, string>, locale: string, key: string): string {
  return locale === 'vi'
    ? (row[`${key}_vi`] ?? '')
    : (row[`${key}_en`] ?? row[`${key}_vi`] ?? '')
}

export async function getTopics(locale: string): Promise<LocalizedTopic[]> {
  const rows = await fetchTopicsSheet()
  return rows
    .filter(r => r.slug?.trim())
    .map(r => ({
      slug: r.slug,
      name: pick(r, locale, 'name'),
      description: pick(r, locale, 'description'),
    }))
}

export async function getCourses(locale: string): Promise<LocalizedCourse[]> {
  const [rows, topics] = await Promise.all([fetchCoursesSheet(), getTopics(locale)])
  const topicMap = new Map(topics.map(t => [t.slug, t.name]))

  return rows
    .filter(r => r.slug?.trim() && r.status === 'published')
    .map(r => ({
      slug: r.slug,
      topicSlug: r.topic_slug ?? '',
      topicName: topicMap.get(r.topic_slug) ?? r.topic_slug ?? '',
      level: (r.level as CourseLevel) || 'foundation',
      duration: {
        hours: parseInt(r.duration_hours) || 0,
        sessions: parseInt(r.duration_sessions) || 0,
      },
      title: pick(r, locale, 'title'),
      description: pick(r, locale, 'description'),
      tags: r.tags ? r.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      learningOutcome: pick(r, locale, 'learning_outcome'),
      priceOriginal: parseInt(r.price_original) || 0,
      priceSale: r.price_sale?.trim() ? parseInt(r.price_sale) || null : null,
      prerequisite: r.prerequisite?.trim() || null,
    }))
}

export async function getCourseBySlug(slug: string, locale: string): Promise<LocalizedCourse | null> {
  const courses = await getCourses(locale)
  return courses.find(c => c.slug === slug) ?? null
}

export async function getTopicBySlug(slug: string, locale: string): Promise<LocalizedTopic | null> {
  const topics = await getTopics(locale)
  return topics.find(t => t.slug === slug) ?? null
}

export async function getAllCourseSlugs(): Promise<{ slug: string }[]> {
  const rows = await fetchCoursesSheet()
  return rows
    .filter(r => r.slug?.trim() && r.status === 'published')
    .map(r => ({ slug: r.slug }))
}
