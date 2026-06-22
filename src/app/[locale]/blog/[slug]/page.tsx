import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  getPublishedPosts,
  getPostBySlug,
  getPublishedSlugs,
  getPostTitle,
  getPostExcerpt,
  getPostCategory,
  getPostBody,
  getPostTags,
  formatPostDate,
} from "@/lib/posts";
import { getAbsoluteUrl } from "@/lib/site";
import InsightBody from "./InsightBody";

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string; locale: string }> }
): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  const title = `${getPostTitle(post, locale)} | Intech ISC`;
  const description = getPostExcerpt(post, locale);
  const ogImage = post.coverImage ?? '/og/og-default.webp';
  const blogPath = `/blog/${slug}`;
  const canonicalUrl = getAbsoluteUrl(locale, blogPath);
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        vi: getAbsoluteUrl('vi', blogPath),
        en: getAbsoluteUrl('en', blogPath),
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogDetailPage(
  props: { params: Promise<{ slug: string; locale: string }> }
) {
  const { slug, locale } = await props.params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "insights" });
  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);
  const tags = getPostTags(post);
  const relatedCourseLabel = locale === "vi" ? "Khóa học liên quan" : "Related course";
  const relatedCourseNote = locale === "vi"
    ? "Tiếp tục đào sâu chủ đề này bằng chương trình đào tạo phù hợp."
    : "Continue exploring this topic through a relevant training program.";

  return (
    <div className="w-full bg-[#F4F7F9] min-h-screen pb-24">
      {/* Hero */}
      <section className={`pt-24 pb-32 px-4 relative overflow-hidden bg-linear-to-br ${post.gradient}`}>
        {post.coverImage && (
          <Image src={post.coverImage} alt={getPostTitle(post, locale)} fill className="object-cover opacity-40" sizes="100vw" priority />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="max-w-3xl mx-auto relative z-10 text-white">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> {t("back_to_list")}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="bg-white text-[#002D62] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {getPostCategory(post, locale)}
            </span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              post.lang === "en"
                ? "border-blue-200 text-blue-100 bg-blue-900/30"
                : "border-green-200 text-green-100 bg-green-900/30"
            }`}>
              {post.lang === "en" ? t("lang_badge_en") : t("lang_badge_vi")}
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
            {getPostTitle(post, locale)}
          </h1>

          <p className="text-lg text-white/85 leading-relaxed mb-8">
            {getPostExcerpt(post, locale)}
          </p>

          <div className="flex flex-wrap items-center gap-5 text-sm font-medium">
            <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Image
                src={post.authorImage}
                alt={post.authorImageAlt}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full bg-white object-contain p-1"
              />
              <span>
                {post.authorName}
                <span className="sr-only">
                  , {locale === "vi" ? post.authorRole_vi : post.authorRole_en}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Clock className="w-4 h-4 text-white/80" />
              <span>{post.readTime} {t("min_read")}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-white/80" />
              <span>{t("published")}: {formatPostDate(post.date, locale)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 mt-[-40px] relative z-20">
        {/* Body Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-8">
          <InsightBody body={getPostBody(post, locale)} />
        </div>

        {/* Related Course CTA */}
        {post.relatedCourseSlug && (
          <div className="bg-gradient-to-br from-[#002D62] to-[#00A3C1] rounded-3xl p-8 md:p-10 text-white mb-8">
            <p className="text-white/75 text-xs font-bold uppercase tracking-widest mb-3">
              {relatedCourseLabel}
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{t("cta_title")}</h2>
            <p className="text-white/85 mb-6 max-w-xl">{relatedCourseNote}</p>
            <Link
              href={`/courses/${post.relatedCourseSlug}`}
              className="inline-flex items-center gap-2 bg-white text-[#002D62] font-bold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-md"
            >
              {t("cta_button")}
            </Link>
          </div>
        )}

        {/* Author + Tags */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
            <Image
              src={post.authorImage}
              alt={post.authorImageAlt}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-[#F4F7F9] object-contain p-2"
            />
            <div>
              <p className="font-heading font-bold text-[#002D62]">{post.authorName}</p>
              <p className="text-sm text-gray-500">
                {locale === "vi" ? post.authorRole_vi : post.authorRole_en}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200"
              >
                <Tag className="w-3.5 h-3.5" /> {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-5">
              {t("related_title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className={`h-24 bg-gradient-to-br ${related.gradient}`} />
                  <div className="p-5">
                    <span className="text-xs font-bold text-[#00A3C1] uppercase tracking-wide block mb-2">
                      {getPostCategory(related, locale)}
                    </span>
                    <h3 className="font-heading font-bold text-[#002D62] group-hover:text-[#00A3C1] transition-colors leading-snug line-clamp-2 text-sm">
                      {getPostTitle(related, locale)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
