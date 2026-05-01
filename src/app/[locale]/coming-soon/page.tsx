import { Link } from "@/i18n/routing";
import { ArrowLeft, Hammer } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function ComingSoonPage() {
  const t = await getTranslations("coming_soon");

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F4F7F9] px-4 py-20">
      <div className="text-center max-w-2xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100">
        <div className="w-20 h-20 bg-[#00A3C1]/10 rounded-2xl flex items-center justify-center mx-auto mb-8 relative">
          {/* Simple animated dots/sparkles could go here if client component, but keeping it simple for server component */}
          <Hammer className="w-10 h-10 text-[#00A3C1]" />
        </div>
        
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#002D62] mb-6">
          {t("title")}
        </h1>
        
        <p className="text-gray-600 text-lg mb-10 leading-relaxed">
          {t("description")}
        </p>

        <div className="max-w-md mx-auto mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder={t("email_placeholder")}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A3C1]/50 transition-all"
            />
            <button className="bg-[#00A3C1] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#002D62] transition-colors whitespace-nowrap">
              {t("notify_button")}
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <Link 
            href="/"
            className="flex items-center gap-2 bg-[#002D62] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#00A3C1] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
          >
            <ArrowLeft className="w-5 h-5" />
            {t("back_to_home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
