import { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, BookOpen, Tag, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import CourseRegistrationButton from "@/components/CourseRegistrationButton";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCourseBySlug, getCourses, getAllCourseSlugs, type LocalizedCourse } from "@/lib/courses";

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllCourseSlugs()
  return slugs
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string; locale: string }> }
): Promise<Metadata> {
  const { slug, locale } = await props.params
  const course = await getCourseBySlug(slug, locale)
  if (!course) return { title: "Không tìm thấy khóa học" }

  const title = `${course.title} | Intech Global Academy`
  return {
    title,
    description: course.description,
    openGraph: {
      title,
      description: course.description,
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'website',
    },
  }
}

const getGradientByTopic = (slug: string) => {
  const gradients: Record<string, string> = {
    "ai-in-action": "from-[#002D62] to-blue-800",
    "quality-management": "from-blue-900 to-[#00A3C1]",
    "operations-optimization": "from-[#002D62] to-cyan-700",
    "data-analytics-digital-scm": "from-[#002D62] to-[#00A3C1]",
    "compliance-legal": "from-slate-800 to-[#002D62]",
    "iot-computer-vision": "from-sky-900 to-[#00A3C1]",
    "professional-skills": "from-indigo-950 to-blue-800",
  }
  return gradients[slug] || "from-[#002D62] to-[#00A3C1]"
}

function PriceDisplay({ course }: { course: LocalizedCourse }) {
  if (course.priceSale) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-400 line-through mb-1">
          {course.priceOriginal.toLocaleString("vi-VN")} VNĐ
        </p>
        <div className="font-heading text-4xl font-extrabold text-[#002D62]">
          {course.priceSale.toLocaleString("vi-VN")} <span className="text-xl">VNĐ</span>
        </div>
        <span className="inline-block mt-2 bg-rose-100 text-rose-600 text-xs font-bold px-2 py-1 rounded-full">
          -{Math.round((1 - course.priceSale / course.priceOriginal) * 100)}%
        </span>
      </div>
    )
  }
  return (
    <div className="font-heading text-4xl font-extrabold text-[#002D62]">
      {course.priceOriginal.toLocaleString("vi-VN")} <span className="text-xl">VNĐ</span>
    </div>
  )
}

export default async function CourseDetailPage(
  props: { params: Promise<{ slug: string; locale: string }> }
) {
  const { slug, locale } = await props.params
  setRequestLocale(locale)

  const [course, allCourses] = await Promise.all([
    getCourseBySlug(slug, locale),
    getCourses(locale),
  ])

  if (!course) notFound()

  const t = await getTranslations({ locale, namespace: 'courses' })
  const gradientClass = getGradientByTopic(course.topicSlug)
  const preReqCourse = course.prerequisite
    ? allCourses.find(c => c.slug === course.prerequisite) ?? null
    : null

  return (
    <div className="w-full bg-[#F4F7F9] min-h-screen pb-24">
      {/* Dynamic Header */}
      <section className={`pt-24 pb-32 px-4 relative overflow-hidden bg-gradient-to-br ${gradientClass}`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-white">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> {t('detail.back_to_list')}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-white text-[#002D62] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {course.topicName || t('detail.course_label')}
            </span>
            <span className="bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
              {t(`levels.${course.level}`)}
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            {course.title}
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed mb-8">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <Clock className="w-5 h-5 text-white/80" />
              <span>{t('detail.duration')}: {course.duration.hours} {t('detail.hours')}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <BookOpen className="w-5 h-5 text-white/80" />
              <span>{t('detail.sessions')}: {course.duration.sessions} {t('detail.sessions_label')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-5xl mx-auto px-4 mt-[-60px] relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Column */}
          <div className="flex-1 space-y-8">
            {/* Learning Outcomes */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
              <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-[#00A3C1]" />
                {t('detail.outcomes_title')}
              </h2>
              <div className="bg-[#F4F7F9] p-6 rounded-2xl border border-gray-200">
                <p className="text-gray-800 font-medium text-lg leading-relaxed">
                  {course.learningOutcome}
                </p>
              </div>
            </div>

            {/* Prerequisites */}
            {preReqCourse && (
              <div className="bg-amber-50 rounded-3xl p-8 shadow-sm border border-amber-200">
                <h2 className="font-heading text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                  {t('detail.prerequisites_title')}
                </h2>
                <p className="text-amber-800 mb-4">{t('detail.prerequisites_desc')}</p>
                <Link
                  href={`/courses/${preReqCourse.slug}`}
                  className="block bg-white p-5 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-amber-600 font-bold mb-1 uppercase tracking-wider">
                        {t(`levels.${preReqCourse.level}`)}
                      </div>
                      <h3 className="font-heading font-bold text-[#002D62] group-hover:text-[#00A3C1] transition-colors text-lg">
                        {preReqCourse.title}
                      </h3>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-[#00A3C1] group-hover:-translate-x-1 transition-all rotate-180" />
                  </div>
                </Link>
              </div>
            )}

            {/* Tags */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="font-heading text-xl font-bold text-[#002D62] mb-4">{t('detail.skills_title')}</h2>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200">
                    <Tag className="w-3.5 h-3.5" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Pricing & CTA */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-28">
              <div className="text-center pb-8 border-b border-gray-100 mb-8">
                <p className="text-sm text-gray-500 font-medium mb-2 uppercase tracking-wider">{t('detail.tuition_label')}</p>
                <PriceDisplay course={course} />
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-gray-600">
                  <CheckCircle2 className="w-5 h-5 text-[#00A3C1] shrink-0 mt-0.5" />
                  <span>{t('detail.benefit_1')}</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <BookOpen className="w-5 h-5 text-[#00A3C1] shrink-0 mt-0.5" />
                  <span>{t('detail.benefit_2')}</span>
                </li>
                <li className="flex items-start gap-3 text-gray-600">
                  <Calendar className="w-5 h-5 text-[#00A3C1] shrink-0 mt-0.5" />
                  <span>{t('detail.benefit_3')}</span>
                </li>
              </ul>

              <CourseRegistrationButton
                courseInfo={{
                  title: course.title,
                  topicName: course.topicName || t('detail.course_label'),
                  levelLabel: t(`levels.${course.level}`),
                  durationHours: course.duration.hours,
                  durationSessions: course.duration.sessions,
                  price: course.priceSale ?? course.priceOriginal,
                }}
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
