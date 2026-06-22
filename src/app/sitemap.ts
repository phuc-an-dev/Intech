import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getPublishedSlugs } from '@/lib/posts';
import { SITE_URL } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = routing.locales;
  const baseUrl = SITE_URL;

  const staticRoutes = [
    '',
    '/about',
    '/courses',
    '/blog',
    '/coming-soon',
    '/consultant',
    '/contact',
    '/global-mobility',
    '/global-partnerships',
    '/privacy-policy',
    '/terms-of-use',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  staticRoutes.forEach((route) => {
    locales.forEach((locale) => {
      const isDefaultLocale = locale === routing.defaultLocale;
      const url = `${baseUrl}${isDefaultLocale ? '' : `/${locale}`}${route}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  const slugs = await getPublishedSlugs();
  slugs.forEach(({ slug }) => {
    locales.forEach((locale) => {
      const isDefaultLocale = locale === routing.defaultLocale;
      const url = `${baseUrl}${isDefaultLocale ? '' : `/${locale}`}/blog/${slug}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    });
  });

  return sitemapEntries;
}
