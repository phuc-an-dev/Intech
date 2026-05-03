import { Montserrat, Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import ScrollToTop from "@/components/ScrollToTop";
import "../globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  weight: ["700", "800"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  
  const base = 'https://www.intechisc.com'
  return {
    metadataBase: new URL(base),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'vi' ? base : `${base}/en`,
      languages: {
        'vi': base,
        'en': `${base}/en`,
      }
    }
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tFooter = await getTranslations({ locale, namespace: 'footer' });

  return (
    <html lang={locale}>
      <body className={`${montserrat.variable} ${inter.variable} antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Analytics />
          <SpeedInsights />
          <NextTopLoader color="#00A3C1" showSpinner={false} height={3} />
          <ScrollToTop />
          <Header />
          <BackToTop />

          {/* Main Content */}
          <main className="flex-1 w-full">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-[#002D62] text-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
              <div className="md:col-span-2">
                <h2 className="font-heading text-2xl font-bold mb-4 text-white">Intech</h2>
                <p className="text-[#F4F7F9]/80 max-w-sm mb-6">
                  {tFooter('tagline')}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4 text-[#00A3C1]">{tFooter('explore')}</h3>
                <ul className="space-y-3 text-[#F4F7F9]/80">
                  <li><Link href="/about" className="hover:text-white transition-colors">{tNav('about')}</Link></li>
                  <li><Link href="/courses" className="hover:text-white transition-colors">{tNav('courses')}</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4 text-[#00A3C1]">{tFooter('legal_contact')}</h3>
                <ul className="space-y-3 text-[#F4F7F9]/80">
                  <li><Link href="/privacy-policy" className="hover:text-white transition-colors">{tNav('privacy_policy')}</Link></li>
                  <li><Link href="/terms-of-use" className="hover:text-white transition-colors">{tNav('terms_of_use')}</Link></li>
                  <li className="pt-2">Email: support@intechisc.com</li>
                </ul>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-[#F4F7F9]/60">
              <p>&copy; {new Date().getFullYear()} {tFooter('rights')}</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
