'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from '@/i18n/routing'

export default function ScrollToTop() {
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (prevPathname.current === pathname) return

    window.scrollTo({ top: 0, behavior: 'instant' })

    prevPathname.current = pathname
  }, [pathname])

  return null
}
