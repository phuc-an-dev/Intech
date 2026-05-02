"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { COURSE_LEVELS, type LocalizedCourse, type LocalizedTopic, type CourseLevel } from "@/lib/courses";
import { useTranslations } from "next-intl";

interface Props {
  courses: LocalizedCourse[];
  topics: LocalizedTopic[];
}

export default function CoursesClient({ courses, topics }: Props) {
  const t = useTranslations('courses');
  const [activeTopic, setActiveTopic] = useState<string>("all");
  const [activeLevel, setActiveLevel] = useState<CourseLevel | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [shuffledCourses, setShuffledCourses] = useState(courses);
  const [isTyping, setIsTyping] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setIsTyping(false);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Shuffle only on client to avoid SSR hydration mismatch
  useEffect(() => {
    setShuffledCourses([...courses].sort(() => Math.random() - 0.5));
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return shuffledCourses.filter((course) => {
      const term = debouncedSearch.toLowerCase();
      const matchSearch =
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term);
      const matchTopic = activeTopic === "all" || course.topicSlug === activeTopic;
      const matchLevel = activeLevel === "all" || course.level === activeLevel;
      return matchSearch && matchTopic && matchLevel;
    });
  }, [shuffledCourses, debouncedSearch, activeTopic, activeLevel]);

  const currentTopic = activeTopic !== "all" ? topics.find(t => t.slug === activeTopic) : null;

  return (
    <div className="w-full bg-[#F4F7F9] min-h-screen pb-24">
      {/* Header Section */}
      <section className="bg-[#002D62] text-white py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              {t('page_title')}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {t('page_description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 mt-8 md:mt-12 flex flex-col lg:flex-row gap-8">

        {/* Sidebar / Filters */}
        <aside className="w-full lg:w-1/4 shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24 md:top-28 z-30">
            <div
              className="flex items-center justify-between lg:mb-6 cursor-pointer lg:cursor-default"
              onClick={() => window.innerWidth < 1024 && setIsFilterOpen(!isFilterOpen)}
            >
              <div className="flex items-center gap-2 text-[#002D62]">
                <Filter className="w-5 h-5" />
                <h2 className="font-heading font-bold text-xl">{t('filters.title')}</h2>
              </div>
              <div className="lg:hidden text-gray-500 bg-gray-50 p-1.5 rounded-lg">
                {isFilterOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>

            <div className={`mt-6 lg:mt-0 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
              <div className="mb-8">
                <h3 className="font-semibold text-gray-700 text-sm mb-3 uppercase tracking-wider">{t('filters.search')}</h3>
                <div className="relative">
                  {isTyping ? (
                    <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00A3C1] animate-spin" />
                  ) : (
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  )}
                  <input
                    type="text"
                    placeholder={t('filters.search_placeholder')}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsTyping(true);
                    }}
                    className="w-full pl-9 pr-4 py-2 bg-[#F4F7F9] border border-transparent rounded-lg focus:ring-2 focus:ring-[#00A3C1] focus:border-[#00A3C1] outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-700 text-sm mb-3 uppercase tracking-wider">{t('filters.topics')}</h3>
                <ul className="space-y-1.5">
                  <li>
                    <button
                      onClick={() => setActiveTopic("all")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTopic === "all"
                          ? "bg-[#002D62] text-white"
                          : "text-gray-600 hover:bg-[#F4F7F9]"
                      }`}
                    >
                      {t('filters.all_topics')}
                    </button>
                  </li>
                  {topics.map((topic) => (
                    <li key={topic.slug}>
                      <button
                        onClick={() => setActiveTopic(topic.slug)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTopic === topic.slug
                            ? "bg-[#002D62] text-white"
                            : "text-gray-600 hover:bg-[#F4F7F9]"
                        }`}
                      >
                        {topic.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 text-sm mb-3 uppercase tracking-wider">{t('filters.levels')}</h3>
                <ul className="space-y-1.5">
                  <li>
                    <button
                      onClick={() => setActiveLevel("all")}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeLevel === "all"
                          ? "bg-[#00A3C1] text-white"
                          : "text-gray-600 hover:bg-[#F4F7F9]"
                      }`}
                    >
                      {t('filters.all_levels')}
                    </button>
                  </li>
                  {COURSE_LEVELS.map((level) => (
                    <li key={level}>
                      <button
                        onClick={() => setActiveLevel(level)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeLevel === level
                            ? "bg-[#00A3C1] text-white"
                            : "text-gray-600 hover:bg-[#F4F7F9]"
                        }`}
                      >
                        {t(`levels.${level}`)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {(activeTopic !== "all" || activeLevel !== "all" || searchQuery !== "") && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setActiveTopic("all");
                      setActiveLevel("all");
                      setSearchQuery("");
                    }}
                    className="w-full py-2 text-sm text-rose-500 font-medium hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    {t('filters.clear')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Course Grid */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {currentTopic && (
              <motion.div
                key={currentTopic.slug}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-[#00A3C1]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#00A3C1]/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-[#00A3C1]" />
                  </div>
                  <h2 className="font-heading font-bold text-xl text-[#002D62]">
                    {currentTopic.name}
                  </h2>
                </div>
                <p className="text-gray-600 ml-12">{currentTopic.description}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-6 flex items-center justify-between">
            <div className="text-gray-500 font-medium">
              {t.rich('results_count', {
                count: filteredCourses.length,
                span: (chunks) => <span className="text-[#002D62] font-bold">{chunks}</span>
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <motion.div
                    key={course.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-24 text-center bg-white rounded-2xl border border-gray-100"
                >
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-[#002D62] font-bold text-lg mb-2">{t('no_results.title')}</p>
                  <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">{t('no_results.description')}</p>
                  <button
                    onClick={() => {
                      setActiveTopic("all");
                      setActiveLevel("all");
                      setSearchQuery("");
                    }}
                    className="px-6 py-2 bg-[#F4F7F9] text-[#002D62] rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    {t('filters.clear')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
