"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, Globe2, ArrowRight, ShieldCheck, FileText } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full bg-[#F4F7F9] min-h-screen pb-24">
      {/* Header Section */}
      <section className="bg-[#002D62] text-white py-20 md:py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-50%] right-[-10%] w-3/4 h-[200%] bg-[#00A3C1] opacity-10 blur-3xl transform rotate-45"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-7xl mx-auto px-4 mt-[-60px] relative z-20">
        <motion.div 
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-12 items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex-1 space-y-6">
            <h2 className="font-heading text-3xl font-bold text-[#002D62]">
              {t("intro_title")}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t("intro_desc")}
            </p>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-[4/3] rounded-2xl bg-slate-200 w-full flex items-center justify-center relative overflow-hidden border-4 border-gray-50">
              <span className="text-slate-400 font-medium">800x600 Placeholder Image</span>
              <div className="absolute inset-0 bg-[#00A3C1]/5"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-4">
            {t("mission_title")}
          </h2>
          <p className="text-gray-600">
            {t("mission_desc")}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-[#002D62]/10 rounded-2xl flex items-center justify-center mb-6">
              <Building2 className="w-7 h-7 text-[#002D62]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#002D62] mb-4">{t("mission_industry_title")}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t("mission_industry_desc")}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-[#00A3C1]/10 rounded-2xl flex items-center justify-center mb-6">
              <GraduationCap className="w-7 h-7 text-[#00A3C1]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#002D62] mb-4">{t("mission_education_title")}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t("mission_education_desc")}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-[#002D62]/10 rounded-2xl flex items-center justify-center mb-6">
              <Globe2 className="w-7 h-7 text-[#002D62]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#002D62] mb-4">{t("mission_mobility_title")}</h3>
            <p className="text-gray-600 leading-relaxed">
              {t("mission_mobility_desc")}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Core Values Section - Big Acronym Layout */}
      <section className="bg-[#002D62] py-24 md:py-32 px-4 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              {t("focus_title")}
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              {t("focus_subtitle")}
            </p>
          </motion.div>

          <div className="space-y-16 md:space-y-24">
            {[
              {
                letter: "F",
                title: t("focus_f_title"),
                desc: t("focus_f_desc")
              },
              {
                letter: "O",
                title: t("focus_o_title"),
                desc: t("focus_o_desc")
              },
              {
                letter: "C",
                title: t("focus_c_title"),
                desc: t("focus_c_desc")
              },
              {
                letter: "U",
                title: t("focus_u_title"),
                desc: t("focus_u_desc")
              },
              {
                letter: "S",
                title: t("focus_s_title"),
                desc: t("focus_s_desc")
              }
            ].map((value, idx) => (
              <motion.div 
                key={value.letter}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-row items-start md:items-center group"
              >
                {/* Left side: Big Acronym (20%) */}
                <div className="w-1/4 md:w-1/5 shrink-0 flex justify-center items-center">
                  <span className="text-[80px] md:text-[140px] font-heading font-black text-white/10 group-hover:text-[#00A3C1] transition-colors duration-500 select-none leading-none">
                    {value.letter}
                  </span>
                </div>
                
                {/* Right side: Title & Description (80%) */}
                <div className="w-3/4 md:w-4/5 pl-4 md:pl-8">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl text-white group-hover:text-[#00A3C1] transition-colors duration-300 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses CTA Section */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-[#00A3C1]/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <GraduationCap className="w-10 h-10 text-[#00A3C1]" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-6">
              {t("cta_title")}
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
              {t("cta_desc")}
            </p>
            <Link 
              href="/courses"
              className="inline-flex items-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#00A3C1] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {t("cta_button")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Legal & Policy Links Section */}
      <section className="py-16 px-4 bg-[#F4F7F9] border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl font-bold text-[#002D62]">{t("legal_title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/privacy-policy" className="group">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-[#00A3C1] transition-all duration-300 flex items-start gap-6 h-full"
              >
                <div className="p-4 bg-[#002D62]/5 rounded-2xl group-hover:bg-[#00A3C1]/10 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-[#002D62] group-hover:text-[#00A3C1] transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#002D62] mb-2 group-hover:text-[#00A3C1] transition-colors">{t("privacy_title")}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t("privacy_desc")}</p>
                </div>
              </motion.div>
            </Link>

            <Link href="/terms-of-use" className="group">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-[#00A3C1] transition-all duration-300 flex items-start gap-6 h-full"
              >
                <div className="p-4 bg-[#002D62]/5 rounded-2xl group-hover:bg-[#00A3C1]/10 transition-colors">
                  <FileText className="w-8 h-8 text-[#002D62] group-hover:text-[#00A3C1] transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#002D62] mb-2 group-hover:text-[#00A3C1] transition-colors">{t("terms_title")}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t("terms_desc")}</p>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
