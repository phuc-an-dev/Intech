'use client'

import { Card, Segmented } from 'antd'
import type { ReactNode } from 'react'

export const ADMIN_NAVY = '#002D62'
export const ADMIN_ACCENT = '#00A3C1'

export type EditLang = 'vi' | 'en'

/** Titled section card with an accent icon chip — shared across all admin forms. */
export function Section({
  icon,
  title,
  extra,
  children,
  style,
}: {
  icon: ReactNode
  title: string
  extra?: ReactNode
  children: ReactNode
  style?: React.CSSProperties
}) {
  return (
    <Card
      style={{ marginBottom: 18, borderColor: '#eef0f3', ...style }}
      styles={{
        header: { borderBottom: '1px solid #f5f6f8', padding: '18px 24px', minHeight: 0 },
        body: { padding: 24 },
      }}
      title={
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              display: 'inline-flex', width: 30, height: 30, borderRadius: 9,
              background: 'rgba(0,163,193,.12)', color: ADMIN_ACCENT,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            {icon}
          </span>
          <span style={{ color: ADMIN_NAVY, fontWeight: 600, fontSize: 15 }}>{title}</span>
        </span>
      }
      extra={extra}
    >
      {children}
    </Card>
  )
}

/** EN/VI language switch used beside form/modal titles. */
export function LangToggle({
  value,
  onChange,
  size,
}: {
  value: EditLang
  onChange: (v: EditLang) => void
  size?: 'small' | 'middle' | 'large'
}) {
  return (
    <Segmented
      size={size}
      value={value}
      onChange={(v) => onChange(v as EditLang)}
      options={[
        { label: '🇻🇳 Tiếng Việt', value: 'vi' },
        { label: '🇬🇧 English', value: 'en' },
      ]}
    />
  )
}
