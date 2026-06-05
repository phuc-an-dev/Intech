'use client'

import { motion } from 'framer-motion'
import { MapPin, GraduationCap, ArrowRight, CheckCircle2, BookOpen, Briefcase, Users, Award } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import VideoBackground from '@/components/VideoBackground'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function GlobalMobilityPage() {
  const t = useTranslations('globalMobility')

  const toursBullets = [
    t('tours_bullet1'),
    t('tours_bullet2'),
    t('tours_bullet3'),
    t('tours_bullet4'),
    t('tours_bullet5'),
  ]

  const tours = [
    {
      slug: 'vietnam-industry-culture-experience',
      duration: t('tour1_duration'),
      name: t('tour1_name'),
      destination: t('tour1_destination'),
      highlights: [t('tour1_highlight1'), t('tour1_highlight2'), t('tour1_highlight3')],
      price: 'USD 500–900',
    },
    {
      slug: 'vietnam-tech-immersion',
      duration: t('tour2_duration'),
      name: t('tour2_name'),
      destination: t('tour2_destination'),
      highlights: [t('tour2_highlight1'), t('tour2_highlight2'), t('tour2_highlight3')],
      price: 'USD 1,000–1,800',
    },
    {
      slug: 'global-industry-leadership',
      duration: t('tour3_duration'),
      name: t('tour3_name'),
      destination: t('tour3_destination'),
      highlights: [t('tour3_highlight1'), t('tour3_highlight2'), t('tour3_highlight3')],
      price: 'USD 2,000–4,000',
    },
    {
      slug: 'international-internship-robotics-iot-smart-information-systems',
      duration: t('tour4_duration'),
      name: t('tour4_name'),
      destination: t('tour4_destination'),
      highlights: [t('tour4_highlight1'), t('tour4_highlight2'), t('tour4_highlight3')],
      price: 'USD 1,800',
    },
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

  const tourImages = [
    'tour-vietnam-culture.webp',
    'tour-vietnam-tech.webp',
    'tour-global-leadership.webp',
    'tour-global-internship.webp',
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
            {tours.map((tour, i) => (
              <motion.div
                key={tour.name}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
              >
                {/* Tour thumbnail */}
                <div className="h-48 w-full relative overflow-hidden">
                  <ImagePlaceholder
                    name={tourImages[i]}
                    width={800}
                    height={450}
                    fill
                  />
                </div>

                {/* Card content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#002D62] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {tour.duration}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#00A3C1]" />
                      <span className="text-xs text-[#00A3C1] font-medium">{t('tour_certificate_label')}</span>
                    </div>
                  </div>
                  <h4 className="font-heading font-bold text-[#002D62] text-lg mb-1">{tour.name}</h4>
                  <div className="flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#00A3C1] flex-shrink-0" />
                    <p className="text-[#00A3C1] text-sm font-medium">{tour.destination}</p>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {tour.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
                        <CheckCircle2 className="w-4 h-4 text-[#00A3C1] mt-0.5 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#4A4A4A]/60 mb-0.5">{t('tour_for_label')} {t('tour_participants_label')}</p>
                      <p className="text-sm font-bold text-[#002D62]">{tour.price}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[#4A4A4A]/50 text-xs">
                      <Users className="w-3.5 h-3.5" />
                      15–40
                    </div>
                  </div>
                  <Link
                    href={`/global-mobility/tours/${tour.slug}`}
                    className="mt-4 flex items-center gap-2 text-[#002D62] font-semibold text-sm hover:text-[#00A3C1] transition-colors group"
                  >
                    {t('tour_cta')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
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
