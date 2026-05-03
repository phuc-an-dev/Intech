"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight, BookOpen, Briefcase, Globe, CheckCircle, Calendar, Users, MonitorPlay } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { type LocalizedCourse } from "@/lib/courses";
import { useTranslations } from "next-intl";

interface Props {
  featuredCourses: LocalizedCourse[];
}

export default function HomeClient({ featuredCourses }: Props) {
  const t = useTranslations("home");

  const [workshopForm, setWorkshopForm] = useState({ name: '', phone: '', email: '' })
  const [workshopState, setWorkshopState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [workshopError, setWorkshopError] = useState('')

  async function handleWorkshopSubmit(e: React.FormEvent) {
    e.preventDefault()
    setWorkshopState('loading')
    setWorkshopError('')
    try {
      const res = await fetch('/api/ai-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workshopForm),
      })
      const json = await res.json() as { error?: string }
      if (!res.ok) throw new Error(json.error ?? 'Đã có lỗi xảy ra')
      setWorkshopState('success')
    } catch (err) {
      setWorkshopError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra')
      setWorkshopState('error')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-[#F4F7F9]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#00A3C1]/5 skew-x-12 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#002D62]/5 -skew-x-12 -translate-x-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#00A3C1]/20 text-[#00A3C1] text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00A3C1] animate-pulse"></span>
                {t("hero.tagline")}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#002D62] leading-tight mb-6">
                {t("hero.title_line1")}<br className="hidden md:block" />
                {t("hero.title_line2")}<br className="hidden md:block" />
                <span className="text-[#00A3C1]">{t("hero.title_line3")}</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0">
                {t("hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/courses"
                  className="inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-[#002D62] text-white rounded-full font-medium hover:bg-[#002D62]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  {t("hero.cta_explore")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-white text-[#002D62] border border-[#002D62]/20 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow"
                >
                  {t("hero.cta_consult")}
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="flex-1 w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-[4/3] rounded-3xl bg-slate-200 w-full flex items-center justify-center relative overflow-hidden shadow-2xl border-4 border-white">
                <span className="text-slate-400 font-medium">1024x768 Hero Image Placeholder</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#002D62]/10 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-4">
              {t("pillars.title")}
            </h2>
            <p className="text-gray-600">{t("pillars.description")}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="bg-[#F4F7F9] rounded-3xl p-8 hover:shadow-lg transition-shadow border border-white">
              <div className="w-14 h-14 bg-[#00A3C1]/10 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-[#00A3C1]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#002D62] mb-3">{t("pillars.pillar1.title")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("pillars.pillar1.desc")}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#002D62] rounded-3xl p-8 hover:shadow-lg transition-shadow shadow-xl text-white transform md:-translate-y-4">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7 text-[#00A3C1]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3">{t("pillars.pillar2.title")}</h3>
              <p className="text-white/80 leading-relaxed">{t("pillars.pillar2.desc")}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#F4F7F9] rounded-3xl p-8 hover:shadow-lg transition-shadow border border-white">
              <div className="w-14 h-14 bg-[#00A3C1]/10 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-[#00A3C1]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#002D62] mb-3">{t("pillars.pillar3.title")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("pillars.pillar3.desc")}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Featured Courses */}
      {featuredCourses.length > 0 && (
        <section className="py-24 bg-[#F4F7F9]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <motion.div
                className="max-w-2xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-4">
                  {t("featured_courses.title")}
                </h2>
                <p className="text-gray-600">{t("featured_courses.description")}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 text-[#002D62] font-semibold hover:text-[#00A3C1] transition-colors"
                >
                  {t("featured_courses.view_all")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {featuredCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 4. Why Choose Us */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square md:aspect-[4/3] lg:aspect-square rounded-[2rem] bg-slate-200 w-full flex items-center justify-center relative overflow-hidden">
                <span className="text-slate-400 font-medium">800x800 Placeholder (LMS/Learning)</span>
                <div className="absolute inset-0 border-8 border-white/50 rounded-[2rem]"></div>
              </div>
            </motion.div>

            <motion.div
              className="flex-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-10">
                {t("why_choose_us.title")}
              </h2>

              <div className="space-y-8">
                {[
                  { icon: <MonitorPlay className="w-6 h-6 text-white" />, title: t("why_choose_us.item1_title"), desc: t("why_choose_us.item1_desc") },
                  { icon: <Globe className="w-6 h-6 text-white" />, title: t("why_choose_us.item2_title"), desc: t("why_choose_us.item2_desc") },
                  { icon: <Users className="w-6 h-6 text-white" />, title: t("why_choose_us.item3_title"), desc: t("why_choose_us.item3_desc") },
                  { icon: <MonitorPlay className="w-6 h-6 text-white" />, title: t("why_choose_us.item4_title"), desc: t("why_choose_us.item4_desc") },
                ].map((item, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="flex gap-4">
                    <div className="w-12 h-12 bg-[#00A3C1] rounded-xl flex items-center justify-center shrink-0 shadow-md">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#002D62] mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Lead Magnet */}
      <section className="py-24 bg-[#002D62] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A3C1] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="md:bg-white/5 md:border border-white/10 rounded-3xl md:p-16 md:backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block px-3 py-1 rounded-full bg-[#00A3C1]/20 text-[#00A3C1] font-semibold text-sm mb-6 uppercase tracking-wider">
                  {t("workshop.tag")}
                </div>
                <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {t("workshop.title")}
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl">{t("workshop.description")}</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="w-5 h-5 text-[#00A3C1]" />
                    {t("workshop.benefit1")}
                  </li>
                  <li className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="w-5 h-5 text-[#00A3C1]" />
                    {t("workshop.benefit2")}
                  </li>
                  <li className="flex items-center gap-3 text-white/90">
                    <Calendar className="w-5 h-5 text-[#00A3C1]" />
                    {t("workshop.date")}
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="w-full lg:max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                {workshopState === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-[#002D62] mb-2">Đăng ký thành công!</h3>
                    <p className="text-gray-600 text-sm">Chúng tôi sẽ gửi thông tin chi tiết qua email trước ngày khai giảng.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-heading font-bold text-2xl text-[#002D62] mb-6 text-center">
                      {t("workshop.form.title")}
                    </h3>
                    <form className="space-y-4" onSubmit={handleWorkshopSubmit}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t("workshop.form.name_label")}</label>
                        <input
                          type="text" required
                          value={workshopForm.name}
                          onChange={e => setWorkshopForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00A3C1] focus:border-transparent outline-none transition-all"
                          placeholder={t("workshop.form.name_placeholder")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t("workshop.form.email_label")}</label>
                        <input
                          type="email" required
                          value={workshopForm.email}
                          onChange={e => setWorkshopForm(f => ({ ...f, email: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00A3C1] focus:border-transparent outline-none transition-all"
                          placeholder={t("workshop.form.email_placeholder")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t("workshop.form.phone_label")}</label>
                        <input
                          type="tel" required
                          value={workshopForm.phone}
                          onChange={e => setWorkshopForm(f => ({ ...f, phone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00A3C1] focus:border-transparent outline-none transition-all"
                          placeholder={t("workshop.form.phone_placeholder")}
                        />
                      </div>
                      {workshopState === 'error' && (
                        <p className="text-red-500 text-sm text-center">{workshopError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={workshopState === 'loading'}
                        className="w-full py-4 mt-2 bg-[#00A3C1] text-white rounded-full font-bold text-lg hover:bg-[#008ba5] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {workshopState === 'loading' ? 'Đang gửi...' : t("workshop.form.submit")}
                      </button>
                      <p className="text-center text-xs text-gray-500 mt-4">
                        {t("workshop.form.privacy")}
                      </p>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Vision 2030 */}
      <section className="pt-24 pb-32 md:pb-40 bg-white text-center px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-[#00A3C1] font-bold tracking-widest uppercase mb-4">{t("vision.tag")}</div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#002D62] leading-tight">
            {t("vision.text")}
          </h2>
        </motion.div>
      </section>
    </div>
  );
}
