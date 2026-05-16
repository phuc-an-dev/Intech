'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Factory, Truck, Database, Settings2,
  Cpu, Eye, Wrench,
  MapPin, Package, Box,
  CheckCircle2, Layers, GraduationCap,
  TrendingDown, BarChart2, Globe,
  ArrowRight, Lock, Sparkles,
  CalendarFold,
} from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import LogoMarquee from '@/components/LogoMarquee'
import { partnerLogos } from '@/data/partners'

export default function ConsultingPage() {
  const t = useTranslations('consulting')
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      name: t('tab1_name'), icon: Factory, title: t('tab1_title'), desc: t('tab1_desc'),
      items: [
        { icon: Cpu, title: t('tab1_item1_title'), desc: t('tab1_item1_desc') },
        { icon: Eye, title: t('tab1_item2_title'), desc: t('tab1_item2_desc') },
        { icon: Wrench, title: t('tab1_item3_title'), desc: t('tab1_item3_desc') },
      ],
    },
    {
      name: t('tab2_name'), icon: Truck, title: t('tab2_title'), desc: t('tab2_desc'),
      items: [
        { icon: MapPin, title: t('tab2_item1_title'), desc: t('tab2_item1_desc') },
        { icon: Package, title: t('tab2_item2_title'), desc: t('tab2_item2_desc') },
        { icon: Box, title: t('tab2_item3_title'), desc: t('tab2_item3_desc') },
      ],
    },
    {
      name: t('tab3_name'), icon: Database, title: t('tab3_title'), desc: t('tab3_desc'),
      items: [
        { icon: CheckCircle2, title: t('tab3_item1_title'), desc: t('tab3_item1_desc') },
        { icon: Layers, title: t('tab3_item2_title'), desc: t('tab3_item2_desc') },
        { icon: GraduationCap, title: t('tab3_item3_title'), desc: t('tab3_item3_desc') },
      ],
    },
    {
      name: t('tab4_name'), icon: Settings2, title: t('tab4_title'), desc: t('tab4_desc'),
      items: [
        { icon: TrendingDown, title: t('tab4_item1_title'), desc: t('tab4_item1_desc') },
        { icon: BarChart2, title: t('tab4_item2_title'), desc: t('tab4_item2_desc') },
        { icon: Globe, title: t('tab4_item3_title'), desc: t('tab4_item3_desc') },
      ],
    },
  ]

  const industries = [
    { icon: Factory, title: t('industry1_title'), desc: t('industry1_desc'), isExpanding: false },
    { icon: Truck, title: t('industry2_title'), desc: t('industry2_desc'), isExpanding: false },
    { icon: Package, title: t('industry3_title'), desc: t('industry3_desc'), isExpanding: false },
  ]

  const cases = [
    { industry: t('case1_industry'), title: t('case1_title'), desc: t('case1_desc') },
    { industry: t('case2_industry'), title: t('case2_title'), desc: t('case2_desc') },
    { industry: t('case3_industry'), title: t('case3_title'), desc: t('case3_desc') },
  ]

  const steps = [
    { n: 1, title: t('step1_title'), desc: t('step1_desc') },
    { n: 2, title: t('step2_title'), desc: t('step2_desc') },
    { n: 3, title: t('step3_title'), desc: t('step3_desc') },
    { n: 4, title: t('step4_title'), desc: t('step4_desc') },
    { n: 5, title: t('step5_title'), desc: t('step5_desc') },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="w-full bg-[#F4F7F9] min-h-screen pb-24">

      {/* ── Hero ── */}
      <section className="bg-[#002D62] text-white py-20 md:py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-50%] right-[-10%] w-3/4 h-[200%] bg-[#00A3C1] opacity-10 blur-3xl transform rotate-45" />
          <div className="absolute inset-0">
            <ImagePlaceholder
              name="hero-consultant.webp"
              width={1920}
              height={600}
              fill
              className="opacity-10 mix-blend-overlay"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#00A3C1] font-bold uppercase tracking-widest text-sm mb-4">
              {t('hero_tagline')}
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              {t('hero_title_line1')} <br />
              <span className="text-[#00A3C1]">{t('hero_title_line2')}</span>
            </h1>
            <div className="flex flex-wrap items-center gap-3 mb-10 font-bold text-lg">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white"
              >
                {t('tagline_start')}
              </motion.span>
              <ArrowRight className="w-4 h-4 text-white/40 shrink-0" />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-[#00A3C1]"
              >
                {t('tagline_scale')}
              </motion.span>
              <ArrowRight className="w-4 h-4 text-white/40 shrink-0" />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="text-white"
              >
                {t('tagline_global')}
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="text-center bg-white/5 rounded-2xl p-4 md:p-6">
              <p className="font-heading text-4xl md:text-5xl font-black text-[#00A3C1] mb-2">{t('hero_stat1_value')}</p>
              <p className="text-white/70 text-sm">{t('hero_stat1_label')}</p>
            </div>
            <div className="text-center bg-white/5 rounded-2xl p-4 md:p-6">
              <p className="font-heading text-4xl md:text-5xl font-black text-[#00A3C1] mb-2">{t('hero_stat2_value')}</p>
              <p className="text-white/70 text-sm">{t('hero_stat2_label')}</p>
            </div>
            <div className="text-center bg-white/5 rounded-2xl p-4 md:p-6">
              <p className="font-heading text-4xl md:text-5xl font-black text-[#00A3C1] mb-2">{t('hero_stat3_value')}</p>
              <p className="text-white/70 text-sm">{t('hero_stat3_label')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Overview + Tagline Visual ── */}
      <section className="max-w-7xl mx-auto px-4 mt-[-60px] relative z-20">
        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl font-bold text-[#002D62]">{t('overview_title')}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{t('overview_desc')}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[#F4F7F9] rounded-full text-[#002D62] font-bold text-sm border border-gray-200">{t('overview_pillar1')}</span>
                <span className="px-4 py-2 bg-[#F4F7F9] rounded-full text-[#002D62] font-bold text-sm border border-gray-200">{t('overview_pillar2')}</span>
                <span className="px-4 py-2 bg-[#F4F7F9] rounded-full text-[#002D62] font-bold text-sm border border-gray-200">{t('overview_pillar3')}</span>
              </div>
            </div>

            {/* Start Small → Scale Fast → Go Global visual */}
            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
                className="bg-[#002D62] text-white px-8 py-5 rounded-2xl flex items-center justify-between"
              >
                <span className="font-heading font-black text-2xl md:text-3xl">{t('tagline_start')}</span>
                <ArrowRight className="w-6 h-6 opacity-60 shrink-0" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-[#00A3C1] text-white px-8 py-5 rounded-2xl flex items-center justify-between"
                style={{ marginLeft: '20px' }}
              >
                <span className="font-heading font-black text-2xl md:text-3xl">{t('tagline_scale')}</span>
                <ArrowRight className="w-6 h-6 opacity-60 shrink-0" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#002D62]/70 text-white px-8 py-5 rounded-2xl flex items-center justify-between"
                style={{ marginLeft: '40px' }}
              >
                <span className="font-heading font-black text-2xl md:text-3xl">{t('tagline_global')}</span>
                <ArrowRight className="w-6 h-6 opacity-60 shrink-0" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Services Tabs ── */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-4">{t('services_title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('services_subtitle')}</p>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {tabs.map(({ name, icon: Icon }, i) => (
            <button
              key={name}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-3 py-2 lg:px-5 lg:py-3 text-sm ls:text-base rounded-xl font-bold transition-all duration-200 ${
                activeTab === i
                  ? 'bg-[#002D62] text-white shadow-lg scale-105'
                  : 'bg-white text-[#002D62] border border-gray-200 hover:border-[#00A3C1] hover:shadow-sm'
              }`}
            >
              <Icon className="w-4 h-4" />
              {name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
          >
            <div className="mb-8">
              <h3 className="font-heading text-2xl font-bold text-[#002D62] mb-3">{tabs[activeTab].title}</h3>
              <p className="text-gray-600">{tabs[activeTab].desc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tabs[activeTab].items.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-[#F4F7F9] rounded-2xl p-6 hover:shadow-md hover:bg-white transition-all duration-200 border border-transparent hover:border-gray-100"
                >
                  <div className="w-10 h-10 bg-[#002D62]/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#002D62]" />
                  </div>
                  <h4 className="font-bold text-[#002D62] mb-2">{title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Industries ── */}
      <section className="bg-[#002D62] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">{t('industries_title')}</h2>
            <p className="text-white/70 max-w-2xl mx-auto">{t('industries_subtitle')}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {industries.map(({ icon: Icon, title, desc, isExpanding, image }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className={`rounded-3xl overflow-hidden group ${
                  isExpanding ? 'border-2 border-dashed border-white/20' : 'border border-white/10'
                }`}
              >
                {/* Industry image thumbnail */}
                <div className="h-40 w-full relative overflow-hidden rounded-xl mb-4">
                  <ImagePlaceholder
                    name={image}
                    width={400}
                    height={300}
                    fill
                    className="opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002D62]/40 to-transparent" />
                </div>
                <div
                  className={`aspect-[4/3] relative flex items-center justify-center ${
                    isExpanding
                      ? 'bg-white/5'
                      : 'bg-[#00A3C1]/20 group-hover:bg-[#00A3C1]/30 transition-colors duration-300'
                  }`}
                >
                  <Icon
                    className={`w-14 h-14 ${
                      isExpanding
                        ? 'text-white/20'
                        : 'text-[#00A3C1] group-hover:scale-110 transition-transform duration-300'
                    }`}
                  />
                </div>
                <div className={`p-6 h-full ${isExpanding ? 'bg-white/5' : 'bg-white/10'}`}>
                  <h3 className="font-heading font-bold text-white text-lg mb-2">{title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Partner Logos ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#002D62] mb-10 text-center">
            {t('partners_title')}
          </h2>
          <LogoMarquee logos={partnerLogos} speed={25} />
        </div>
      </section>

      {/* ── Case Studies (blurred placeholder) ── */}
      <section className="hidden max-w-7xl mx-auto px-4 py-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-4">{t('cases_title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('cases_subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, idx) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <ImagePlaceholder
                  name={`case-bg-${idx + 1}.webp`}
                  width={800}
                  height={500}
                  fill
                  className="opacity-30"
                />
                <div className="absolute inset-0 bg-[#002D62]/70" />
              </div>
              {/* Existing content */}
              <div className="relative z-10">
                <div className="filter blur-sm select-none pointer-events-none p-8">
                  <div className="text-xs font-bold text-[#00A3C1] uppercase tracking-wider mb-3">{c.industry}</div>
                  <h3 className="font-heading font-bold text-xl text-[#002D62] mb-3">{c.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
                  <div className="mt-6 h-2 bg-gray-100 rounded-full" />
                  <div className="mt-3 h-2 bg-gray-100 rounded-full w-3/4" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-[2px]">
                  <CalendarFold className="w-7 h-7 text-[#002D62] mb-3 opacity-60" />
                  <span className="bg-[#002D62] text-white text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest">
                    {t('case_coming_soon')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Approach (Vertical Timeline) ── */}
      <section className="bg-[#002D62] py-24 md:py-32 px-4 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">{t('approach_title')}</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">{t('approach_subtitle')}</p>
          </motion.div>

          <div className="space-y-16 md:space-y-20">
            {steps.map(({ n, title, desc }, idx) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-row items-start md:items-center group"
              >
                <div className="w-1/4 md:w-1/5 shrink-0 flex justify-center items-center">
                  <span className="text-[80px] md:text-[120px] font-heading font-black text-white/10 group-hover:text-[#00A3C1] transition-colors duration-500 select-none leading-none">
                    {n}
                  </span>
                </div>
                <div className="w-3/4 md:w-4/5 pl-4 md:pl-8">
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-white group-hover:text-[#00A3C1] transition-colors duration-300 mb-3">
                    {title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 pt-40 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-6">{t('cta_title')}</h2>
            <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">{t('cta_desc')}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#00A3C1] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {t('cta_button')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
