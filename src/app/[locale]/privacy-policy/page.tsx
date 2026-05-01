import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: `${t("privacy_policy")} | Intech Global Academy`,
    description: "Chính sách bảo mật trực tuyến của Intech Global Academy",
  };
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("privacy");

  return (
    <div className="w-full bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-[#002D62] mb-8 text-center">
          {t("title")}
        </h1>
        
        <div className="prose prose-blue max-w-none text-gray-700 space-y-8">
          <p className="text-lg">
            {t("intro")}
          </p>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-4">{t("section1_title")}</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-gray-900">{t("section1_item1_title")}</strong> {t("section1_item1_desc")}
              </li>
              <li>
                <strong className="text-gray-900">{t("section1_item2_title")}</strong> {t("section1_item2_desc")}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-4">{t("section2_title")}</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-gray-900">{t("section2_item1_title")}</strong> {t("section2_item1_desc")}
              </li>
              <li>
                <strong className="text-gray-900">{t("section2_item2_title")}</strong> {t("section2_item2_desc")}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-4">{t("section3_title")}</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                {t("section3_desc1")}
              </li>
              <li>
                {t("section3_desc2")}
              </li>
            </ul>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
            <p>{t("footer_update")}</p>
            <p>{t("footer_contact")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
