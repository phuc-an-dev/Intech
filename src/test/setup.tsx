import '@testing-library/jest-dom'
import type { ReactNode } from 'react'
import { vi } from 'vitest'

type Translator = ((key: string) => string) & {
  rich: (key: string, values?: unknown) => string
}

function createTranslator(): Translator {
  const t = ((key: string) => key) as Translator
  t.rich = (key: string, values?: unknown) => {
    void values
    return key
  }
  return t
}

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  useParams: () => ({}),
  usePathname: () => '',
  notFound: vi.fn(),
}))

// Mock next-intl
vi.mock('next-intl', () => {
  const t = createTranslator();
  return {
    useTranslations: () => t,
    useLocale: () => 'vi',
  };
})

vi.mock('next-intl/server', () => {
  const t = createTranslator();
  return {
    getTranslations: async () => t,
    getLocale: async () => 'vi',
    setRequestLocale: vi.fn(),
  };
})

// Mock routing
vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: { children: ReactNode; href: string }) => {
    // Basic mock that renders an anchor tag
    return <a href={href}>{children}</a>;
  },
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '',
  redirect: vi.fn(),
}))

// Polyfill IntersectionObserver
class IntersectionObserverMock {
  root = null;
  rootMargin = "";
  thresholds = [];
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
