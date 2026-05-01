import '@testing-library/jest-dom'
import { vi } from 'vitest'

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
}))

// Mock next-intl
vi.mock('next-intl', () => {
  const t = (key: string) => key;
  t.rich = (key: string, values: any) => key;
  return {
    useTranslations: () => t,
    useLocale: () => 'vi',
  };
})

vi.mock('next-intl/server', () => {
  const t = (key: string) => key;
  t.rich = (key: string, values: any) => key;
  return {
    getTranslations: async () => t,
    getLocale: async () => 'vi',
  };
})

// Mock routing
vi.mock('@/i18n/routing', () => ({
  Link: ({ children, href }: any) => {
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
