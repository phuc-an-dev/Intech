import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Clock, Calendar, Pin } from "lucide-react";
import Image from "next/image";
import {
  getPublishedPosts,
  getPostTitle,
  getPostExcerpt,
  getPostCategory,
  formatPostDate,
} from "@/lib/posts";
import { getAbsoluteUrl } from "@/lib/site";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "insights" });
  const title = `${t("page_title")} | Intech ISC`
  const description = t("page_description")
  const canonicalUrl = getAbsoluteUrl(locale, '/blog')
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        vi: getAbsoluteUrl('vi', '/blog'),
        en: getAbsoluteUrl('en', '/blog'),
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      images: [{ url: '/og/og-default.webp', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/og-default.webp'],
    },
  };
}

export default async function BlogPage(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "insights" });

  const posts = await getPublishedPosts();

  if (posts.length === 0) {
    return (
      <div className="w-full bg-[#F4F7F9] min-h-screen pb-24 pt-28 text-center text-gray-500">
        {t("page_description")}
      </div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div className="w-full bg-[#F4F7F9] min-h-screen pb-24">
      {/* Page Header */}
      <section className="bg-linear-to-br from-[#002D62] to-[#00A3C1] pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-white text-center">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider border border-white/30">
            Intech ISC
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold mb-4">
            {t("page_title")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t("page_description")}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 mt-[-40px] relative z-10">
        {/* Featured Article */}
        <Link
          href={`/blog/${featured.slug}`}
          className="block group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-10 hover:shadow-2xl transition-shadow"
        >
          <div className={`w-full h-56 md:h-72 bg-linear-to-br ${featured.gradient} flex items-center justify-center relative overflow-hidden`}>
            {featured.coverImage && (
              <Image src={featured.coverImage} alt={getPostTitle(featured, locale)} fill className="object-cover opacity-60" sizes="(max-width: 768px) 100vw, 800px" />
            )}
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 text-center px-8">
              <span className="inline-flex items-center gap-1.5 bg-white text-[#002D62] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                {featured.pinned && <Pin className="w-3 h-3" />}
                {t("featured_label")}
              </span>
              <p className="text-white/80 text-sm font-medium">
                {getPostCategory(featured, locale)}
              </p>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold text-white bg-[#002D62] px-3 py-1 rounded-full">
                {getPostCategory(featured, locale)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                {featured.readTime} {t("min_read")}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                {formatPostDate(featured.date, locale)}
              </span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-[#002D62] mb-3 group-hover:text-[#00A3C1] transition-colors leading-tight">
              {getPostTitle(featured, locale)}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {getPostExcerpt(featured, locale)}
            </p>
            <span className="inline-flex items-center gap-2 text-[#00A3C1] font-semibold text-sm group-hover:gap-3 transition-all">
              {t("read_more")} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative w-full h-44 overflow-hidden">
                {post.coverImage ? (
                  <Image src={post.coverImage} alt={getPostTitle(post, locale)} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 400px" />
                ) : (
                  <div className={`w-full h-full bg-linear-to-br ${post.gradient}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-4 z-10 text-white text-xs font-bold uppercase tracking-wider drop-shadow-md">
                  {getPostCategory(post, locale)}
                </span>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-white bg-[#002D62] px-2.5 py-0.5 rounded-full">
                    {getPostCategory(post, locale)}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {post.readTime} {t("min_read")}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#002D62] mb-2 group-hover:text-[#00A3C1] transition-colors leading-snug line-clamp-2">
                  {getPostTitle(post, locale)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                  {getPostExcerpt(post, locale)}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[#00A3C1] font-semibold text-sm group-hover:gap-2.5 transition-all">
                  {t("read_more")} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
