import { prisma } from './db'
import type { Course, Topic } from '@prisma/client'

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
  targetAudience: string[]
  modules: string[]
  finalProject: string
  deliveryFormat: string
  imageUrl: string
}

export interface LocalizedTopic {
  slug: string
  name: string
  description: string
}

function strArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []
}

function localized<T extends string>(locale: string, vi: T, en: T): T {
  return locale === 'vi' ? vi : (en || vi)
}

function toLocalizedTopic(t: Topic, locale: string): LocalizedTopic {
  return {
    slug: t.slug,
    name: localized(locale, t.name_vi, t.name_en),
    description: localized(locale, t.description_vi, t.description_en),
  }
}

function toLocalizedCourse(c: Course & { topic: Topic }, locale: string): LocalizedCourse {
  return {
    slug: c.slug,
    topicSlug: c.topic.slug,
    topicName: localized(locale, c.topic.name_vi, c.topic.name_en),
    level: c.level as CourseLevel,
    duration: { hours: c.durationHours, sessions: c.durationSessions },
    title: localized(locale, c.title_vi, c.title_en),
    description: localized(locale, c.description_vi, c.description_en),
    tags: strArray(c.tags),
    learningOutcome: localized(locale, c.learningOutcome_vi, c.learningOutcome_en),
    priceOriginal: c.priceOriginal,
    priceSale: c.priceSale,
    prerequisite: c.prerequisite,
    targetAudience: locale === 'vi' ? strArray(c.targetAudience_vi) : strArray(c.targetAudience_en),
    modules: locale === 'vi' ? strArray(c.modules_vi) : strArray(c.modules_en),
    finalProject: localized(locale, c.finalProject_vi, c.finalProject_en),
    deliveryFormat: localized(locale, c.deliveryFormat_vi, c.deliveryFormat_en),
    imageUrl: c.imageUrl,
  }
}

export async function getTopics(locale: string): Promise<LocalizedTopic[]> {
  const topics = await prisma.topic.findMany({ orderBy: { createdAt: 'asc' } })
  return topics.map((t) => toLocalizedTopic(t, locale))
}

export async function getCourses(locale: string): Promise<LocalizedCourse[]> {
  const courses = await prisma.course.findMany({
    where: { status: 'PUBLISHED' },
    include: { topic: true },
    orderBy: { createdAt: 'asc' },
  })
  return courses.map((c) => toLocalizedCourse(c, locale))
}

export async function getCourseBySlug(slug: string, locale: string): Promise<LocalizedCourse | null> {
  const course = await prisma.course.findFirst({
    where: { slug, status: 'PUBLISHED' },
    include: { topic: true },
  })
  return course ? toLocalizedCourse(course, locale) : null
}

export async function getTopicBySlug(slug: string, locale: string): Promise<LocalizedTopic | null> {
  const topic = await prisma.topic.findUnique({ where: { slug } })
  return topic ? toLocalizedTopic(topic, locale) : null
}

export async function getAllCourseSlugs(): Promise<{ slug: string }[]> {
  const courses = await prisma.course.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
  })
  return courses
}
