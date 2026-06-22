import { Tag } from 'antd'
import type { ReactNode } from 'react'

/** A field label with a colored VI/EN language badge. */
export function langLabel(text: string, lang: 'vi' | 'en'): ReactNode {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {text}
      <Tag
        color={lang === 'vi' ? 'green' : 'blue'}
        style={{ marginInlineEnd: 0, fontSize: 10, lineHeight: '16px', padding: '0 6px', fontWeight: 600 }}
      >
        {lang.toUpperCase()}
      </Tag>
    </span>
  )
}
