'use client'

import { motion } from 'framer-motion'
import { MapPin, GraduationCap, ArrowRight, CheckCircle2, BookOpen, Briefcase, Award } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import VideoBackground from '@/components/VideoBackground'
import type { TourCard } from '@/data/tours'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function GlobalMobilityClient({ tours }: { tours: TourCard[] }) {
  const t = useTranslations('globalMobility')

  const toursBullets = [
    t('tours_bullet1'),
    t('tours_bullet2'),
    t('tours_bullet3'),
    t('tours_bullet4'),
    t('tours_bullet5'),
  ]

  const pathways = [
    {
      Icon: GraduationCap,
      title: t('pathway1_title'),
      desc: t('pathway1_desc'),
      items: [t('pathway1_item1'), t('pathway1_item2'), t('pathway1_item3')],
    },
    {
      Icon: BookOpen,
      title: t('pathway2_title'),
      desc: t('pathway2_desc'),
      items: [t('pathway2_item1'), t('pathway2_item2'), t('pathway2_item3')],
    },
    {
      Icon: Briefcase,
      title: t('pathway3_title'),
      desc: t('pathway3_desc'),
      items: [t('pathway3_item1'), t('pathway3_item2'), t('pathway3_item3')],
    },
  ]

  return (
    <div className="bg-[#F4F7F9]">
      {/* Hero */}
      <section className="bg-[#002D62] text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003d7a]" />
        <VideoBackground
          src="/videos/hero-global-mobility.mp4"
          poster="/images/hero-global-mobility.webp"
          alt="Global Mobility"
          className="opacity-20 mix-blend-overlay"
        />
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
                <div className="text-4xl md:text-5xl font-heading font-bold text-[#00A3C1]">{stat.value}</div>
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

      {/* Study Tours */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#002D62] mb-4">
              {t('tours_title')}
            </h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">{t('tours_subtitle')}</p>
          </motion.div>

          {/* General description bullets */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#F4F7F9] rounded-3xl p-8 md:p-10 mb-16"
          >
            <ul className="space-y-4">
              {toursBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#00A3C1] mt-0.5 flex-shrink-0" />
                  <span className="text-[#4A4A4A]">{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tour cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {tours.map((tour) => (
              <motion.div
                key={tour.slug}
                variants={itemVariants}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative h-52 w-full overflow-hidden">
                  <ImagePlaceholder
                    name={`tour-${tour.slug}.webp`}
                    src={tour.coverImage || undefined}
                    width={800}
                    height={450}
                    fill
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
                  <span className="absolute top-3 left-3 bg-[#002D62] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {tour.duration}
                  </span>
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[#002D62] text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    <Award className="w-3.5 h-3.5 text-[#00A3C1]" />
                    {t('tour_certificate_label')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-heading font-bold text-[#002D62] text-lg leading-snug line-clamp-2 min-h-[3.5rem]">
                    {tour.name}
                  </h4>
                  <div className="flex items-start gap-1.5 mt-2 mb-4">
                    <MapPin className="w-4 h-4 text-[#00A3C1] flex-shrink-0 mt-0.5" />
                    <p className="text-[#00A3C1] text-sm font-medium">{tour.destination}</p>
                  </div>
                  <ul className="space-y-2.5 flex-1">
                    {tour.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
                        <CheckCircle2 className="w-4 h-4 text-[#00A3C1] mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <Link
                      href={`/global-mobility/tours/${tour.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#002D62] hover:bg-[#00A3C1] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors"
                    >
                      {t('tour_cta')}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Academic Pathways */}
      <section className="py-20 bg-[#002D62]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t('academic_title')}
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">{t('academic_subtitle')}</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {pathways.map((pw) => {
              const Icon = pw.Icon
              return (
                <motion.div
                  key={pw.title}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                >
                  <Icon className="w-8 h-8 text-[#00A3C1] mb-5" />
                  <h3 className="font-heading font-bold text-white text-xl mb-3">{pw.title}</h3>
                  <p className="text-white/70 text-sm mb-6 leading-relaxed">{pw.desc}</p>
                  <ul className="space-y-3">
                    {pw.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#00A3C1] mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
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
            <p className="text-[#4A4A4A] mb-8">{t('cta_desc')}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#001f44] transition-colors"
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
