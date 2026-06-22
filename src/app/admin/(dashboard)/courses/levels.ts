export type CourseLevelKey = 'foundation' | 'tools' | 'application' | 'advanced' | 'strategic'

/** Vietnamese display label + tag color for each fixed course level. */
export const LEVEL_META: Record<CourseLevelKey, { label: string; color: string }> = {
  foundation: { label: 'Nền tảng', color: 'blue' },
  tools: { label: 'Công cụ', color: 'cyan' },
  application: { label: 'Ứng dụng', color: 'green' },
  advanced: { label: 'Nâng cao', color: 'orange' },
  strategic: { label: 'Chiến lược', color: 'magenta' },
}

export const LEVEL_OPTIONS = (Object.keys(LEVEL_META) as CourseLevelKey[]).map((value) => ({
  value,
  label: LEVEL_META[value].label,
}))
