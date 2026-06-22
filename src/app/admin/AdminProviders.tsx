'use client'

import type { ReactNode } from 'react'
import { ConfigProvider, App, theme as antdTheme } from 'antd'

// Brand tokens — shared across every admin screen so future phases
// (Courses, Topics, Tours) inherit the same look automatically.
const theme = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: '#002D62',
    colorLink: '#00A3C1',
    colorLinkHover: '#33b5cd',
    borderRadius: 6,
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    // Inputs slightly sharper than cards.
    Input: { borderRadius: 6 },
    InputNumber: { borderRadius: 6 },
    Select: { borderRadius: 6 },
    DatePicker: { borderRadius: 6 },
    Menu: {
      darkItemBg: 'transparent',
      darkSubMenuItemBg: 'transparent',
      darkItemColor: 'rgba(255,255,255,.72)',
      darkItemHoverColor: '#ffffff',
      darkItemHoverBg: 'rgba(255,255,255,.1)',
      darkItemSelectedBg: 'rgba(255,255,255,.16)',
      darkItemSelectedColor: '#ffffff',
      darkGroupTitleColor: 'rgba(255,255,255,.38)',
      itemBorderRadius: 8,
      itemMarginInline: 12,
      itemHeight: 42,
      iconSize: 17,
    },
  },
}

export default function AdminProviders({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <App>{children}</App>
    </ConfigProvider>
  )
}
