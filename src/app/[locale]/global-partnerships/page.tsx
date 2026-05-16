'use client'

import { motion } from 'framer-motion'
import { Globe, BookOpen, Users, Lightbulb, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import AnimatedCounter from '@/components/AnimatedCounter'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function GlobalPartnershipsPage() {
  const t = useTranslations('globalPartnerships')

  const models = [
    { icon: Globe, title: t('model1_title'), desc: t('model1_desc') },
    { icon: Lightbulb, title: t('model2_title'), desc: t('model2_desc') },
    { icon: BookOpen, title: t('model3_title'), desc: t('model3_desc') },
    { icon: Users, title: t('model4_title'), desc: t('model4_desc') },
    { icon: ArrowRight, title: t('model5_title'), desc: t('model5_desc') },
  ]

  return (
    <div className="bg-[#F4F7F9]">
      {/* Hero */}
      <section className="bg-[#002D62] text-white py-24 md:py-32 relative overflow-hidden">
        <ImagePlaceholder name="hero-global-partnerships.jpg" width={1440} height={600} fill priority className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#001a3a]/90 via-[#002D62]/80 to-[#003d7a]/90" />
        <motion.div className="absolute top-16 left-16 w-72 h-72 rounded-full bg-[#00A3C1]/20 blur-3xl pointer-events-none" animate={{ y: [0, -22, 0], scale: [1, 1.07, 1] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-8 right-20 w-56 h-56 rounded-full bg-white/5 blur-3xl pointer-events-none" animate={{ y: [0, 18, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#00A3C1] font-semibold text-sm md:text-base uppercase tracking-widest mb-4"
          >
            {t('hero_tagline')}
          </motion.p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-12">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="block"
            >
              {t('hero_title_line1')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="block text-[#00A3C1]"
            >
              {t('hero_title_line2')}
            </motion.span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-12 md:gap-20"
          >
            {[
              { value: t('hero_stat1_value'), label: t('hero_stat1_label') },
              { value: t('hero_stat2_value'), label: t('hero_stat2_label') },
              { value: t('hero_stat3_value'), label: t('hero_stat3_label') },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter value={stat.value} className="text-4xl md:text-5xl font-heading font-bold text-[#00A3C1]" />
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Overview — Floating card */}
      <section className="relative pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-4 mt-[-60px] relative z-20"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#002D62] mb-4">
              {t('overview_title')}
            </h2>
            <p className="text-[#4A4A4A] leading-relaxed mb-8">{t('overview_desc')}</p>
            <div className="flex flex-wrap gap-3">
              {[t('overview_pillar1'), t('overview_pillar2'), t('overview_pillar3')].map((pillar) => (
                <span
                  key={pillar}
                  className="bg-[#F4F7F9] text-[#002D62] font-semibold text-sm px-4 py-2 rounded-full border border-[#002D62]/10"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Strategic Partners — temporarily hidden */}

      {/* Collaboration Models */}
      <section className="py-20 bg-[#002D62]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t('models_title')}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">{t('models_subtitle')}</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            {models.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex flex-col w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="w-10 h-10 bg-[#00A3C1]/20 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[#00A3C1]" />
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-3">{title}</h3>
                <p className="text-white/70 text-sm leading-relaxed flex-1">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#002D62] mb-4">
              {t('cta_title')}
            </h2>
            <p className="text-[#4A4A4A] mb-8 leading-relaxed">{t('cta_desc')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#001f44] transition-colors"
              >
                {t('cta_button')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/global-mobility"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#002D62] text-[#002D62] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#F4F7F9] transition-colors"
              >
                {t('cta_contact')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
