import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  insights,
  getInsightBySlug,
  getInsightTitle,
  getInsightExcerpt,
  getInsightCategory,
  formatInsightDate,
} from "@/data/insights";
import InsightBody from "./InsightBody";

export async function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string; locale: string }> }
): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const insight = getInsightBySlug(slug);
  if (!insight) return { title: "Not Found" };

  const title = `${locale === "vi" ? insight.title_vi : insight.title_en} | Intech ISC`;
  const description = locale === "vi" ? insight.excerpt_vi : insight.excerpt_en;
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

export default async function InsightDetailPage(
  props: { params: Promise<{ slug: string; locale: string }> }
) {
  const { slug, locale } = await props.params;
  setRequestLocale(locale);

  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const t = await getTranslations({ locale, namespace: "insights" });
  const relatedInsights = insights.filter((i) => i.slug !== slug).slice(0, 2);

  return (
    <div className="w-full bg-[#F4F7F9] min-h-screen pb-24">
      {/* Hero */}
      <section className={`pt-24 pb-32 px-4 relative overflow-hidden bg-gradient-to-br ${insight.gradient}`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-3xl mx-auto relative z-10 text-white">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> {t("back_to_list")}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="bg-white text-[#002D62] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {getInsightCategory(insight, locale)}
            </span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
              insight.lang === "en"
                ? "border-blue-200 text-blue-100 bg-blue-900/30"
                : "border-green-200 text-green-100 bg-green-900/30"
            }`}>
              {insight.lang === "en" ? t("lang_badge_en") : t("lang_badge_vi")}
            </span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 leading-tight">
            {getInsightTitle(insight, locale)}
          </h1>

          <p className="text-lg text-white/85 leading-relaxed mb-8">
            {getInsightExcerpt(insight, locale)}
          </p>

          <div className="flex flex-wrap items-center gap-5 text-sm font-medium">
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Clock className="w-4 h-4 text-white/80" />
              <span>{insight.readTime} {t("min_read")}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-white/80" />
              <span>{t("published")}: {formatInsightDate(insight.date, locale)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 mt-[-40px] relative z-20">
        {/* Body Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 mb-8">
          <InsightBody body={insight.body} />
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {insight.tags.map((tag, idx) => (
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
        {relatedInsights.length > 0 && (
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-5">
              {t("related_title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedInsights.map((related) => (
                <Link
                  key={related.slug}
                  href={`/insights/${related.slug}`}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className={`h-24 bg-gradient-to-br ${related.gradient}`} />
                  <div className="p-5">
                    <span className="text-xs font-bold text-[#00A3C1] uppercase tracking-wide block mb-2">
                      {getInsightCategory(related, locale)}
                    </span>
                    <h3 className="font-heading font-bold text-[#002D62] group-hover:text-[#00A3C1] transition-colors leading-snug line-clamp-2 text-sm">
                      {getInsightTitle(related, locale)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#002D62] to-[#00A3C1] rounded-3xl p-8 md:p-10 text-white text-center">
          <h2 className="font-heading text-2xl font-bold mb-3">{t("cta_title")}</h2>
          <p className="text-white/85 mb-6 max-w-lg mx-auto">{t("cta_desc")}</p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-white text-[#002D62] font-bold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-md"
          >
            {t("cta_button")}
          </Link>
        </div>
      </div>
    </div>
  );
}
