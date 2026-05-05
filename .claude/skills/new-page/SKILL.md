---
name: new-page
description: Use when user asks to create a new page, add a route, or build a new section in the Intech Next.js project. Triggers on phrases like "tạo trang", "thêm page", "new route", "tạo thêm một trang".
---

# New Page — Intech Project

## Overview

Project-specific workflow for creating locale-aware pages in `src/app/[locale]/`. All pages use next-intl, framer-motion, Lucide icons, and the Intech design system.

## Phase 1 — GATHER (Ask Before Coding)

Ask user **10–20 questions** across these groups before writing any code. Propose a default for each.

**Content**
- What is the page about? Paste raw content.
- Target audience: B2B / B2C / both?
- Vietnamese copy ready? English needed (offer to translate)?

**Layout & Structure**
- Which sections? Pick from blueprints below.
- Section order (or use default flow)?
- Hero style: dark navy overlay / light / split?

**Navigation**
- Add to Header nav? (not all pages need it — e.g. thank-you, privacy-policy)
- If yes: nav label (VI + EN), position in navLinks array?
- Add to Footer Explore column?

**Design**
- Tabs / accordion / grid for multi-item sections?
- Image placeholders now, real images later?
- Any animated highlight (acronym layout, stacked cards, counters)?

**Technical**
- New i18n namespace name? (default: slug of route)
- SEO metadata title / description?

---

## Phase 2 — PLAN

Confirm with user before coding:
- Route: `src/app/[locale]/<slug>/page.tsx`
- Sections selected (from blueprints)
- Files to touch (see checklist)

---

## Phase 3 — BUILD

### File Checklist

| File | Action |
|------|--------|
| `src/app/[locale]/<slug>/page.tsx` | Create |
| `src/app/[locale]/<slug>/page.test.tsx` | Create |
| `messages/vi.json` | Add namespace |
| `messages/en.json` | Add namespace |
| `src/components/Header.tsx` | Edit (if in nav) |
| `src/app/[locale]/layout.tsx` | Edit (if in footer) |

### i18n Rules
- Always create **new namespace** (never reuse another page's keys).
- Add to **both** `vi.json` and `en.json` simultaneously.
- Nav key goes in `"nav"` object in both files.

### Header — TypeScript Gotcha
```ts
// href MUST use `as const` to satisfy the typed Link component
{ name: t('consulting'), href: '/consultant' as const }
```

### Test Pattern (next-intl mock returns key as value)
```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MyPage from './page'

describe('My Page', () => {
  it('renders hero', () => {
    render(<MyPage />)
    expect(screen.getByText('hero_title')).toBeInTheDocument()
  })
  // t('hero_title') → 'hero_title' in tests (mock in src/test/setup.tsx)
})
```

---

## Phase 4 — TEST

Run after writing all files:
```bash
npx vitest run "<slug>"
```
All tests must pass. **Do NOT run `npm run build`** — build fetches Google Sheets at build time and times out in dev.

---

## Phase 5 — WIRE (if nav/footer)

1. Add nav key to `messages/vi.json` + `messages/en.json` under `"nav"`.
2. Push link into `navLinks` array in `Header.tsx` (with `as const`).
3. Add `<li>` to Footer Explore column in `layout.tsx`.
4. Run `npx vitest run "Header"` to verify Header tests pass.

---

## Section Blueprints (à la carte)

| Section | Pattern | File reference |
|---------|---------|----------------|
| **Hero** | Navy bg + tagline + optional stat counters | `about/page.tsx` hero |
| **Floating card** | `mt-[-60px] z-20` overlaps hero | `consultant/page.tsx` overview |
| **Animated tagline** | Stacked offset cards (Start Small → Scale Fast → Go Global) | `consultant/page.tsx` tagline visual |
| **Tab services** | `useState` + `AnimatePresence mode="wait"` | `consultant/page.tsx` tabs |
| **Timeline** | Large step numbers, `group-hover:text-[#00A3C1]` | `consultant/page.tsx` approach |
| **Acronym layout** | Big letter left (20%), title+desc right (80%) | `about/page.tsx` FOCUS section |
| **Blur-locked cards** | `filter blur-sm` + absolute overlay + Lock icon | `consultant/page.tsx` case studies |
| **3-column grid** | `motion` stagger + `whileInView` | `about/page.tsx` mission |
| **CTA** | White section, Link to `/contact` | any page bottom |

---

## Design Tokens

```
Primary navy  : #002D62
Accent cyan   : #00A3C1
Background    : #F4F7F9
Text muted    : #4A4A4A
Border radius : rounded-3xl (cards), rounded-2xl (items), rounded-xl (buttons)
Font heading  : font-heading (Montserrat)
Font body     : font-inter (Inter)
Shadow card   : shadow-xl (hero float), shadow-sm (inner cards)
Animation     : framer-motion — whileInView + viewport once:true
```

### Standard framer-motion variants
```ts
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}
```
