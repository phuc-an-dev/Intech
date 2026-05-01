'use client'

import { motion } from 'framer-motion'
import { Users, Star, MessageSquare, Award, Briefcase, GraduationCap, ChevronRight } from 'lucide-react'
import { Link } from "@/i18n/routing"
import { useTranslations } from 'next-intl'

const expertIds = ['1', '2', '3'] as const;

export default function ConsultantPage() {
  const t = useTranslations("consultant");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <section className="bg-[#002D62] py-24 md:py-32 px-4 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#00A3C1]/10 skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
              {t("title_line1")} <br />
              <span className="text-[#00A3C1]">{t("title_line2")}</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-[#00A3C1]" />
                <span className="font-bold">{t("expert_badge")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#00A3C1]" />
                <span className="font-bold">{t("consult_badge")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consultants List */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {expertIds.map((id) => (
            <motion.div
              key={id}
              variants={cardVariants}
              className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row p-8 lg:p-0"
            >
              {/* Expert Image Placeholder */}
              <div className="lg:w-1/3 bg-[#F4F7F9] aspect-square lg:aspect-auto flex items-center justify-center relative">
                <Users className="w-20 h-20 text-[#00A3C1]/20" />
                <div className="absolute bottom-6 left-6 right-6 bg-[#002D62] p-4 rounded-2xl text-white text-center shadow-lg">
                  <p className="font-bold">{t(`experts.${id}.experience`)}</p>
                </div>
              </div>

              {/* Expert Info */}
              <div className="lg:w-2/3 p-8 lg:p-16 flex flex-col justify-center">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <div>
                    <h2 className="font-heading text-3xl font-bold text-[#002D62] mb-2">{t(`experts.${id}.name`)}</h2>
                    <p className="text-[#00A3C1] font-bold text-lg">{t(`experts.${id}.role`)}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F4F7F9] px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-bold text-[#002D62]">5.0</span>
                    <span className="text-sm text-[#4A4A4A]">{t("rating_count", { count: 48 })}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-[#F4F7F9] rounded-full flex items-center justify-center text-[#002D62] shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#4A4A4A] uppercase font-bold tracking-wider">{t("specialty_label")}</p>
                      <p className="font-bold text-[#002D62]">{t(`experts.${id}.specialty`)}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-[#F4F7F9] rounded-full flex items-center justify-center text-[#002D62] shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#4A4A4A] uppercase font-bold tracking-wider">{t("education_label")}</p>
                      <p className="font-bold text-[#002D62]">{t(`experts.${id}.education`)}</p>
                    </div>
                  </div>
                </div>

                <p className="text-[#4A4A4A] text-lg mb-10 leading-relaxed italic">
                  &quot;{t(`experts.${id}.bio`)}&quot;
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center justify-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-full font-bold hover:bg-[#001f44] transition-all">
                    <MessageSquare className="w-5 h-5" />
                    {t("book_button")}
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-transparent border-2 border-[#002D62] text-[#002D62] px-8 py-4 rounded-full font-bold hover:bg-[#002D62] hover:text-white transition-all">
                    {t("roadmap_button")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Consultant Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#002D62] mb-6">{t("why_title")}</h2>
          <p className="text-[#4A4A4A] text-lg max-w-2xl mx-auto font-medium">{t("why_subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F4F7F9] p-10 rounded-[32px] text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#00A3C1] mx-auto mb-6 shadow-sm">
              <Star className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-[#002D62] text-xl mb-4">{t("why_item1_title")}</h4>
            <p className="text-[#4A4A4A]">{t("why_item1_desc")}</p>
          </div>
          <div className="bg-[#F4F7F9] p-10 rounded-[32px] text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#00A3C1] mx-auto mb-6 shadow-sm">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-[#002D62] text-xl mb-4">{t("why_item2_title")}</h4>
            <p className="text-[#4A4A4A]">{t("why_item2_desc")}</p>
          </div>
          <div className="bg-[#F4F7F9] p-10 rounded-[32px] text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#00A3C1] mx-auto mb-6 shadow-sm">
              <Award className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-[#002D62] text-xl mb-4">{t("why_item3_title")}</h4>
            <p className="text-[#4A4A4A]">{t("why_item3_desc")}</p>
          </div>
        </div>
      </section>

      {/* FAQ Link Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#4A4A4A] font-medium text-lg">{t("faq_text")}</p>
          <Link href="/coming-soon" className="flex items-center gap-2 text-[#00A3C1] font-bold group">
            {t("workflow_link")}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  )
}
