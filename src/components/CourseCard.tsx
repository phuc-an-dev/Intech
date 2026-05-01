"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight, Clock, BookOpen, Tag } from "lucide-react";
import { type Course, getTopicBySlug } from "@/data/courses";
import { useTranslations } from "next-intl";

// Helper function to generate a consistent gradient based on topic slug
const getGradientByTopic = (slug: string) => {
  const gradients: Record<string, string> = {
    "ai-in-action": "from-[#002D62] to-blue-800",
    "quality-management": "from-blue-900 to-[#00A3C1]",
    "operations-optimization": "from-[#002D62] to-cyan-700",
    "data-analytics-digital-scm": "from-[#002D62] to-[#00A3C1]",
    "compliance-legal": "from-slate-800 to-[#002D62]",
    "iot-computer-vision": "from-sky-900 to-[#00A3C1]",
    "professional-skills": "from-indigo-950 to-blue-800"
  };
  return gradients[slug] || "from-[#002D62] to-[#00A3C1]";
};

export default function CourseCard({ course }: { course: Course }) {
  const t = useTranslations('data.courses');
  const tTopics = useTranslations('data.topics');
  const tLevels = useTranslations('courses.levels');
  const topic = getTopicBySlug(course.topicSlug);
  const gradientClass = getGradientByTopic(course.topicSlug);
  
  // Use course.id as key for translations
  const courseKey = course.id as any;
  const topicKey = course.topicSlug as any;

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
              {tTopics(`${topicKey}.name`)}
            </span>
          </div>

          {/* Dynamic Gradient Thumbnail */}
          <div className={`h-48 w-full bg-gradient-to-br ${gradientClass} flex items-center justify-center relative overflow-hidden group`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            {/* Placeholder Icon/Text based on title initials */}
            <span className="text-white/40 font-heading text-6xl font-black tracking-tighter opacity-50 group-hover:scale-110 transition-transform duration-500">
              {t(`${courseKey}.title`).substring(0, 2).toUpperCase()}
            </span>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-heading font-bold text-[#002D62] text-xl mb-3 line-clamp-2">
              {t(`${courseKey}.title`)}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {t(`${courseKey}.description`)}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Note: Tags translation is a bit tricky with lists, assuming they are available as t.raw or similar if needed, 
                  but for now we can use keys or index if they are in the JSON */}
              {course.tags.slice(0, 3).map((_, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md uppercase tracking-wider">
                  <Tag className="w-3 h-3" /> {t(`${courseKey}.tags.${idx}` as any)}
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
              <div className="flex flex-col">
                <span className="font-bold text-[#002D62] text-lg">
                  {course.price.toLocaleString("vi-VN")} VNĐ
                </span>
              </div>

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
