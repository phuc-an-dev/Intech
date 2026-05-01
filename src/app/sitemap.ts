import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const baseUrl = 'https://intech.edu.vn'; // Replace with actual domain

  // Define your static routes
  const staticRoutes = [
    '',
    '/about',
    '/courses',
    '/coming-soon',
    '/consultant',
    '/contact',
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
        // Optional: alternate languages
        // alternateRefs: locales.map(l => ({ href: ..., hrefLang: l }))
      });
    });
  });

  return sitemapEntries;
}
