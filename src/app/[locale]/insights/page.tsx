import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import {
  insights,
  getInsightTitle,
  getInsightExcerpt,
  getInsightCategory,
  formatInsightDate,
} from "@/data/insights";

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "insights" });
  return {
    title: `${t("page_title")} | Intech ISC`,
    description: t("page_description"),
  };
}

export default async function InsightsPage(
  props: { params: Promise<{ locale: string }> }
) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "insights" });

  const [featured, ...rest] = insights;

  return (
    <div className="w-full bg-[#F4F7F9] min-h-screen pb-24">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-[#002D62] to-[#00A3C1] pt-28 pb-16 px-4">
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
          href={`/insights/${featured.slug}`}
          className="block group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-10 hover:shadow-2xl transition-shadow"
        >
          <div className={`w-full h-56 md:h-72 bg-gradient-to-br ${featured.gradient} flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 text-center px-8">
              <span className="inline-block bg-white text-[#002D62] text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                {t("featured_label")}
              </span>
              <p className="text-white/80 text-sm font-medium">
                {getInsightCategory(featured, locale)}
              </p>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold text-white bg-[#002D62] px-3 py-1 rounded-full">
                {getInsightCategory(featured, locale)}
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                featured.lang === "en"
                  ? "border-blue-300 text-blue-600 bg-blue-50"
                  : "border-green-300 text-green-600 bg-green-50"
              }`}>
                {featured.lang === "en" ? t("lang_badge_en") : t("lang_badge_vi")}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                {featured.readTime} {t("min_read")}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                {formatInsightDate(featured.date, locale)}
              </span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-[#002D62] mb-3 group-hover:text-[#00A3C1] transition-colors leading-tight">
              {getInsightTitle(featured, locale)}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {getInsightExcerpt(featured, locale)}
            </p>
            <span className="inline-flex items-center gap-2 text-[#00A3C1] font-semibold text-sm group-hover:gap-3 transition-all">
              {t("read_more")} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((insight) => (
            <Link
              key={insight.slug}
              href={`/insights/${insight.slug}`}
              className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`w-full h-36 bg-gradient-to-br ${insight.gradient} flex items-center justify-center`}>
                <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
                  {getInsightCategory(insight, locale)}
                </span>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-white bg-[#002D62] px-2.5 py-0.5 rounded-full">
                    {getInsightCategory(insight, locale)}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                    insight.lang === "en"
                      ? "border-blue-300 text-blue-600 bg-blue-50"
                      : "border-green-300 text-green-600 bg-green-50"
                  }`}>
                    {insight.lang === "en" ? t("lang_badge_en") : t("lang_badge_vi")}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {insight.readTime} {t("min_read")}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#002D62] mb-2 group-hover:text-[#00A3C1] transition-colors leading-snug line-clamp-2">
                  {getInsightTitle(insight, locale)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                  {getInsightExcerpt(insight, locale)}
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
