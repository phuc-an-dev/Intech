'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Users, Award, CheckCircle2, XCircle, ArrowRight, Wrench } from 'lucide-react'
import { Link } from '@/i18n/routing'
import type { TourData } from '@/data/tours'
import ImagePlaceholder from '@/components/ImagePlaceholder'

interface Labels {
  whyTitle: string
  highlightsTitle: string
  whoTitle: string
  itineraryTitle: string
  feeTitle: string
  includesTitle: string
  excludesTitle: string
  customTitle: string
  cta: string
  back: string
  groupLabel: string
  certificateLabel: string
  galleryTitle: string
}

interface Props {
  tour: TourData
  labels: Labels
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function TourDetailClient({ tour, labels }: Props) {
  return (
    <div className="bg-[#F4F7F9]">
      {/* Hero */}
      <section className="bg-[#002D62] text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#001a3a] via-[#002D62] to-[#003d7a]" />
        <ImagePlaceholder
          name={`hero-tour-${tour.slug ?? 'detail'}.webp`}
          src={tour.coverImage || undefined}
          width={1920}
          height={600}
          fill
          className="opacity-15 mix-blend-overlay"
        />
        <div className="relative max-w-5xl mx-auto px-4">
          <Link
            href="/global-mobility"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {labels.back}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-[#00A3C1] text-white text-sm font-bold px-4 py-1.5 rounded-full">
                {tour.duration}
              </span>
              <span className="bg-white/10 text-white text-sm px-4 py-1.5 rounded-full flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {tour.destination}
              </span>
              <span className="bg-white/10 text-white text-sm px-4 py-1.5 rounded-full flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {tour.groupSize}
              </span>
              <span className="bg-white/10 text-white text-sm px-4 py-1.5 rounded-full flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#00A3C1]" />
                {labels.certificateLabel}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight mb-4">{tour.name}</h1>
            <p className="text-white/70 text-lg">{tour.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Floating card — Why Join */}
      <section className="relative pb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-4 mt-[-60px] relative z-20"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-heading font-bold text-[#002D62] mb-4">{labels.whyTitle}</h2>
            <p className="text-[#4A4A4A] leading-relaxed">{tour.whyJoin}</p>
          </div>
        </motion.div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#002D62] mb-10">{labels.highlightsTitle}</h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {tour.highlights.map((h) => (
              <motion.div
                key={h.title}
                variants={itemVariants}
                className="bg-[#F4F7F9] rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-2 h-2 rounded-full bg-[#00A3C1] mb-4" />
                <h3 className="font-heading font-bold text-[#002D62] text-lg mb-2">{h.title}</h3>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="py-16 bg-[#F4F7F9]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#002D62] mb-6">{labels.whoTitle}</h2>
          <div className="flex flex-wrap gap-3">
            {tour.audience.map((a) => (
              <span
                key={a}
                className="bg-white text-[#002D62] font-semibold text-sm px-5 py-2.5 rounded-full border border-[#002D62]/10 shadow-sm"
              >
                {a}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[#4A4A4A] text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-[#00A3C1]" />
            {labels.groupLabel} {tour.groupSize}
          </p>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#002D62] mb-8">{labels.itineraryTitle}</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#002D62] text-white">
                  <th className="text-left px-6 py-4 font-semibold w-36">Period</th>
                  <th className="text-left px-6 py-4 font-semibold w-48">Theme</th>
                  <th className="text-left px-6 py-4 font-semibold">Key Activities</th>
                </tr>
              </thead>
              <tbody>
                {tour.itinerary.map((row, i) => (
                  <tr key={row.period} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F4F7F9]'}>
                    <td className="px-6 py-4 font-semibold text-[#002D62] whitespace-nowrap">{row.period}</td>
                    <td className="px-6 py-4 text-[#002D62] font-medium">{row.theme}</td>
                    <td className="px-6 py-4 text-[#4A4A4A]">{row.activities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fee + Include/Exclude */}
      <section className="py-16 bg-[#002D62] text-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">{labels.feeTitle}</h2>
          <p className="text-[#00A3C1] text-2xl font-bold mb-10">{tour.price}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="font-heading font-bold text-lg mb-5 text-[#00A3C1]">{labels.includesTitle}</h3>
              <ul className="space-y-3">
                {tour.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/90 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#00A3C1] mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="font-heading font-bold text-lg mb-5 text-white/60">{labels.excludesTitle}</h3>
              <ul className="space-y-3">
                {tour.excludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/70 text-sm">
                    <XCircle className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customization */}
          <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/10 flex gap-4">
            <Wrench className="w-5 h-5 text-[#00A3C1] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-[#00A3C1] mb-1">{labels.customTitle}</h3>
              <p className="text-white/70 text-sm">{tour.customization}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#002D62] mb-6">{tour.name}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#001f44] transition-colors"
              >
                {labels.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/global-mobility"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#002D62] text-[#002D62] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#F4F7F9] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                {labels.back}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
