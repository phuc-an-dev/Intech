"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight, Clock, BookOpen, Tag } from "lucide-react";
import Image from "next/image";
import { type LocalizedCourse } from "@/lib/courses";
import { useTranslations } from "next-intl";

const getGradientByTopic = (slug: string) => {
  const gradients: Record<string, string> = {
    "ai-in-action": "from-[#002D62] to-blue-800",
    "quality-management": "from-blue-900 to-[#00A3C1]",
    "operations-optimization": "from-[#002D62] to-cyan-700",
    "data-analytics-digital-scm": "from-[#002D62] to-[#00A3C1]",
    "compliance-legal": "from-slate-800 to-[#002D62]",
    "iot-computer-vision": "from-sky-900 to-[#00A3C1]",
    "professional-skills": "from-indigo-950 to-blue-800",
  };
  return gradients[slug] || "from-[#002D62] to-[#00A3C1]";
};

const getCoverImage = (slug: string): string | null => {
  const images: Record<string, string> = {
    "advanced-demand-planning": "/images/course-advanced-demand-planning.jpg",
    "ai-driven-data-analysis": "/images/course-ai-driven-data-analysis.jpg",
    "ai-strategic-leadership": "/images/course-ai-strategic-leadership.jpg",
    "aiot-strategic-roadmap": "/images/course-aiot-strategic-roadmap.jpg",
    "applied-spc": "/images/course-applied-spc.jpg",
    "basic-prompt-engineering": "/images/course-basic-prompt-engineering.jpg",
    "computer-vision-in-ops": "/images/course-computer-vision-in-ops.jpg",
    "customs-trade-practice": "/images/course-customs-trade-practice.jpg",
    "digital-transformation-roadmap": "/images/course-digital-transformation-roadmap.jpg",
    "digital-twin-foundation": "/images/course-digital-twin-foundation.jpg",
    "doe-process-optimization": "/images/course-doe-process-optimization.jpg",
    "fta-rules-of-origin-master": "/images/course-fta-rules-of-origin-master.jpg",
    "genai-in-scm-planning": "/images/course-genai-in-scm-planning.jpg",
    "industrial-iot-sensors": "/images/course-industrial-iot-sensors.jpg",
    "integrity-digital-compliance": "/images/course-integrity-digital-compliance.jpg",
    "inventory-masterclass": "/images/course-inventory-masterclass.jpg",
    "lean-thinking-4": "/images/course-lean-thinking-4.jpg",
    "legal-risk-in-logistics": "/images/course-legal-risk-in-logistics.jpg",
    "logistics-dashboarding": "/images/course-logistics-dashboarding.jpg",
    "low-code-ai-agent-design": "/images/course-low-code-ai-agent-design.jpg",
    "operational-leadership": "/images/course-operational-leadership.jpg",
    "operations-standards-iso": "/images/course-operations-standards-iso.jpg",
    "predictive-maintenance-aiot": "/images/course-predictive-maintenance-aiot.jpg",
    "project-execution-for-engineers": "/images/course-project-execution-for-engineers.jpg",
    "quality-4-strategy": "/images/course-quality-4-strategy.jpg",
    "realtime-monitoring-systems": "/images/course-realtime-monitoring-systems.jpg",
    "routing-fleet-ops": "/images/course-routing-fleet-ops.jpg",
    "simulation-decision-support": "/images/course-simulation-decision-support.jpg",
    "six-sigma-green-belt": "/images/course-six-sigma-green-belt.jpg",
    "sql-for-supply-chain": "/images/course-sql-for-supply-chain.jpg",
    "structural-problem-solving": "/images/course-structural-problem-solving.jpg",
    "supply-chain-executive-path": "/images/course-supply-chain-executive-path.jpg",
    "supply-chain-network-design": "/images/course-supply-chain-network-design.jpg",
    "technical-presentation-excellence": "/images/course-technical-presentation-excellence.jpg",
    "warehouse-flow-design": "/images/course-warehouse-flow-design.jpg",
  };
  return images[slug] ?? null;
};

export default function CourseCard({ course }: { course: LocalizedCourse }) {
  const tLevels = useTranslations('courses.levels');
  const gradientClass = getGradientByTopic(course.topicSlug);
  const coverImage = getCoverImage(course.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Link href={`/courses/${course.slug}`} className="block h-full outline-none">
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 45, 98, 0.1), 0 8px 10px -6px rgba(0, 45, 98, 0.1)" }}
          whileTap={{ scale: 0.97 }}
          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full relative"
        >
          {/* Badges */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/95 backdrop-blur-sm text-[#002D62] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              {tLevels(course.level)}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10">
            <span className="bg-[#002D62]/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md">
              {course.topicName}
            </span>
          </div>

          {/* Thumbnail */}
          <div className="h-48 w-full relative overflow-hidden group">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={course.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-white/40 font-heading text-6xl font-black tracking-tighter opacity-50 group-hover:scale-110 transition-transform duration-500">
                  {course.title.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-heading font-bold text-[#002D62] text-xl mb-3 line-clamp-2">
              {course.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md uppercase tracking-wider">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
              {course.tags.length > 3 && (
                <span className="text-[10px] font-medium text-gray-400 px-1 py-1">+{course.tags.length - 3}</span>
              )}
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#00A3C1]" />
                <span>{course.duration.hours} giờ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#00A3C1]" />
                <span>{course.duration.sessions} buổi</span>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
              {course.priceSale ? (
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs line-through">
                    {course.priceOriginal.toLocaleString("vi-VN")} VNĐ
                  </span>
                  <span className="font-bold text-[#002D62] text-lg">
                    {course.priceSale.toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="font-bold text-[#002D62] text-lg">
                    {course.priceOriginal.toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>
              )}

              <div className="w-10 h-10 rounded-full bg-[#00A3C1]/10 flex items-center justify-center text-[#00A3C1] group-hover:bg-[#00A3C1] group-hover:text-white transition-colors shrink-0">
                <ArrowRight className="w-5 h-5 group-hover:-rotate-45 transition-transform" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
