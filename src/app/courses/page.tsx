'use client'

import { motion } from 'framer-motion'
import { Search, BookOpen, Clock, BarChart, ArrowRight, Filter } from 'lucide-react'
import Link from 'next/link'

const courses = [
  {
    id: 1,
    title: 'Lập trình Fullstack Next.js Pro',
    description: 'Làm chủ Next.js 15+, React 19 và hệ sinh thái Modern Web.',
    duration: '12 tuần',
    level: 'Nâng cao',
    category: 'Technology',
    image: '/course-1.jpg'
  },
  {
    id: 2,
    title: 'UI/UX Design Masterclass',
    description: 'Từ tư duy thiết kế đến sản phẩm thực tế với Figma và Adobe XD.',
    duration: '8 tuần',
    level: 'Cơ bản - Trung cấp',
    category: 'Design',
    image: '/course-2.jpg'
  },
  {
    id: 3,
    title: 'Data Analysis with Python',
    description: 'Phân tích và trực quan hóa dữ liệu thực tế cho doanh nghiệp.',
    duration: '10 tuần',
    level: 'Trung cấp',
    category: 'Data Science',
    image: '/course-3.jpg'
  },
  {
    id: 4,
    title: 'Digital Marketing Strategy',
    description: 'Xây dựng chiến lược tăng trưởng bền vững trên các nền tảng số.',
    duration: '6 tuần',
    level: 'Cơ bản',
    category: 'Business',
    image: '/course-4.jpg'
  },
  {
    id: 5,
    title: 'Cloud Computing (AWS/Azure)',
    description: 'Triển khai và quản lý hạ tầng đám mây quy mô lớn.',
    duration: '14 tuần',
    level: 'Nâng cao',
    category: 'Technology',
    image: '/course-5.jpg'
  },
  {
    id: 6,
    title: 'Product Management Fundamentals',
    description: 'Quy trình phát triển sản phẩm từ ý tưởng đến thị trường.',
    duration: '8 tuần',
    level: 'Trung cấp',
    category: 'Business',
    image: '/course-6.jpg'
  }
]

export default function CoursesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-[#F4F7F9] py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-extrabold text-[#002D62] mb-6 leading-tight"
          >
            Khám phá <span className="text-[#00A3C1]">Khóa học</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#4A4A4A] text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            Nâng tầm kỹ năng với các chương trình đào tạo thực tiễn, được thiết kế bởi các chuyên gia hàng đầu trong ngành.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-100 p-2">
              <div className="pl-6 pr-3 text-[#4A4A4A]">
                <Search className="w-6 h-6" />
              </div>
              <input 
                type="text" 
                placeholder="Tìm kiếm khóa học bạn quan tâm..." 
                className="flex-1 py-3 focus:outline-none text-[#1A1A1A] font-medium"
              />
              <button className="bg-[#002D62] text-white px-8 py-3 rounded-full font-bold hover:bg-[#001f44] transition-all hidden sm:block">
                Tìm kiếm
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter & Listing Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex flex-wrap gap-3">
            {['Tất cả', 'Technology', 'Design', 'Business', 'Data Science'].map((cat) => (
              <button 
                key={cat}
                className={`px-6 py-2.5 rounded-full font-bold transition-all ${
                  cat === 'Tất cả' 
                    ? 'bg-[#00A3C1] text-white' 
                    : 'bg-[#F4F7F9] text-[#4A4A4A] hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-[#002D62] font-bold border-2 border-[#F4F7F9] px-6 py-2.5 rounded-full hover:bg-[#F4F7F9] transition-all">
            <Filter className="w-5 h-5" />
            Lọc nâng cao
          </button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course) => (
            <motion.div 
              key={course.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col h-full"
            >
              {/* Course Image Placeholder */}
              <div className="aspect-video bg-[#002D62]/5 flex items-center justify-center relative">
                <BookOpen className="w-12 h-12 text-[#00A3C1]/20" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[#002D62] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {course.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-heading text-xl font-bold text-[#002D62] mb-3 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-[#4A4A4A] mb-6 line-clamp-2 flex-1">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-6 mb-8 text-sm text-[#4A4A4A] font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#00A3C1]" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="w-4 h-4 text-[#00A3C1]" />
                    {course.level}
                  </div>
                </div>

                <Link 
                  href={`/courses/${course.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#F4F7F9] text-[#002D62] py-4 rounded-2xl font-bold hover:bg-[#002D62] hover:text-white transition-all group"
                >
                  Xem chi tiết
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Placeholder */}
        <div className="mt-16 flex justify-center gap-3">
          {[1, 2, 3].map((p) => (
            <button 
              key={p}
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                p === 1 ? 'bg-[#002D62] text-white' : 'bg-[#F4F7F9] text-[#4A4A4A] hover:bg-gray-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-[#002D62] rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white text-center md:text-left">
          <div>
            <h2 className="font-heading text-3xl font-bold mb-4">Bạn chưa tìm thấy khóa học phù hợp?</h2>
            <p className="text-white/80 max-w-xl">Hãy để các chuyên gia của Intech tư vấn lộ trình học tập cá nhân hóa dành riêng cho bạn.</p>
          </div>
          <Link 
            href="/contact" 
            className="whitespace-nowrap bg-[#00A3C1] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#008ba5] transition-all transform hover:scale-105"
          >
            Nhận tư vấn miễn phí
          </Link>
        </div>
      </section>
    </main>
  )
}
