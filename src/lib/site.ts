export const SITE_URL = 'https://www.intechisc.com'

export function getLocalizedPath(locale: string, path: string) {
  return locale === 'vi' ? path : `/${locale}${path}`
}

export function getAbsoluteUrl(locale: string, path: string) {
  return `${SITE_URL}${getLocalizedPath(locale, path)}`
}
