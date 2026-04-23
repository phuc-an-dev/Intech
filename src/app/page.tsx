'use client'

import Link from 'next/link'
import { BookOpen, Globe, Users, ArrowRight, ShieldCheck, Zap, BarChart3, Star, CheckCircle2 } from 'lucide-react'
import { motion, Variants } from 'framer-motion'

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      {/* Hero Section */}
      <section className="w-full bg-[#F4F7F9] py-24 md:py-40 flex flex-col items-center px-4 text-center overflow-hidden relative">
        {/* Subtle Background Pattern (Flat Design) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#002D62" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-heading text-4xl md:text-7xl font-extrabold text-[#002D62] mb-8 leading-[1.1]"
          >
            Intech: Chạm tri thức,<br />
            <span className="text-[#00A3C1]">Kiến tạo tương lai.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-[#1A1A1A] text-lg md:text-2xl max-w-3xl mx-auto mb-12 font-medium"
          >
            Nền tảng kết nối học thuật, mang đến cơ hội vươn ra thế giới qua các chương trình Mobility và sự đồng hành của chuyên gia đầu ngành.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center"
          >
            <Link 
              href="/courses" 
              className="flex items-center justify-center gap-3 bg-[#002D62] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#001f44] transition-all transform hover:scale-105"
            >
              Khám phá khóa học
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center justify-center gap-3 bg-transparent border-2 border-[#00A3C1] text-[#00A3C1] px-10 py-5 rounded-full font-bold text-lg hover:bg-[#00A3C1] hover:text-white transition-all transform hover:scale-105"
            >
              Nhận tư vấn ngay
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Strategic Partners Section */}
      <section className="w-full py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-[#4A4A4A] font-bold uppercase tracking-widest text-sm mb-10">
            Đối tác chiến lược
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text-based logos as per brand wordmark style */}
            <span className="font-heading text-2xl font-black text-[#002D62]">TECH-UNI</span>
            <span className="font-heading text-2xl font-black text-[#002D62]">GLOBAL-ED</span>
            <span className="font-heading text-2xl font-black text-[#002D62]">VINA-INNO</span>
            <span className="font-heading text-2xl font-black text-[#002D62]">FUTURE-LAB</span>
          </div>
        </div>
      </section>

      {/* Core Domains Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-24 md:py-32">
        <div className="text-center mb-20">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#002D62] mb-6">
            Lĩnh vực chuyên môn
          </h2>
          <div className="w-24 h-1.5 bg-[#00A3C1] mx-auto rounded-full mb-8"></div>
          <p className="text-[#4A4A4A] text-lg max-w-2xl mx-auto font-medium">
            Chúng tôi tập trung vào 3 trụ cột chính để kiến tạo bệ phóng vững chắc cho sự nghiệp của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center text-center transition-all"
          >
            <div className="w-20 h-20 bg-[#F4F7F9] rounded-full flex items-center justify-center mb-8 text-[#00A3C1]">
              <BookOpen className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#002D62] mb-5">
              Giới thiệu khóa học
            </h3>
            <p className="text-[#4A4A4A] leading-relaxed">
              Tiếp cận các khóa học chất lượng cao, bám sát nhu cầu thực tế của thị trường lao động. Hệ thống bài giảng được thiết kế bởi các chuyên gia.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-[#002D62] p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,45,98,0.15)] flex flex-col items-center text-center text-white transition-all"
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-8 text-[#00A3C1]">
              <Globe className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-2xl font-bold mb-5">
              Student Mobility
            </h3>
            <p className="text-white/80 leading-relaxed">
              Cơ hội trao đổi và học tập tại các quốc gia phát triển, mở rộng thế giới quan và mạng lưới quốc tế thông qua các chương trình liên kết.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white p-10 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center text-center transition-all"
          >
            <div className="w-20 h-20 bg-[#F4F7F9] rounded-full flex items-center justify-center mb-8 text-[#00A3C1]">
              <Users className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#002D62] mb-5">
              Industry Consultant
            </h3>
            <p className="text-[#4A4A4A] leading-relaxed">
              Nhận tư vấn trực tiếp từ các chuyên gia đang làm việc trong ngành, định hướng nghề nghiệp rõ ràng và thực tiễn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-[#F4F7F9] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#002D62] mb-8">
              Tại sao chọn Intech?
            </h2>
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#00A3C1] shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#002D62] text-xl mb-2">Uy tín & Tin cậy</h4>
                  <p className="text-[#4A4A4A]">Cam kết chất lượng đào tạo và hỗ trợ học viên tận tâm trong suốt lộ trình học tập.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#00A3C1] shadow-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#002D62] text-xl mb-2">Lộ trình tối ưu</h4>
                  <p className="text-[#4A4A4A]">Tiết kiệm thời gian với các chương trình học tập trung vào kỹ năng then chốt.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#00A3C1] shadow-sm">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[#002D62] text-xl mb-2">Kết quả thực tiễn</h4>
                  <p className="text-[#4A4A4A]">Học viên sau khi hoàn thành khóa học có đủ năng lực để tham gia vào thị trường lao động quốc tế.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-white">
            {/* Image Placeholder with consistent style */}
            <div className="absolute inset-0 bg-[#002D62]/5 flex items-center justify-center">
              <span className="text-[#002D62]/20 font-heading text-2xl font-bold">Featured Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#002D62] mb-6">
              Cảm nhận từ học viên
            </h2>
            <p className="text-[#4A4A4A] text-lg max-w-2xl mx-auto font-medium">
              Những câu chuyện thành công từ cộng đồng học viên Intech.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex text-[#00A3C1] mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-[#1A1A1A] italic mb-8 leading-relaxed">
                  "Intech đã giúp tôi thay đổi hoàn toàn tư duy về việc học. Chương trình Mobility mở ra cho tôi cơ hội thực tập tại Singapore mà tôi chưa từng nghĩ tới."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F4F7F9] rounded-full flex items-center justify-center text-[#002D62] font-bold">
                    A{i}
                  </div>
                  <div>
                    <h5 className="font-bold text-[#002D62]">Nguyễn Văn A{i}</h5>
                    <p className="text-sm text-[#4A4A4A]">Học viên Khóa React Pro</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full px-4 mb-24">
        <div className="max-w-6xl mx-auto bg-[#00A3C1] rounded-[40px] p-10 md:p-20 text-center text-white overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8">
              Sẵn sàng bắt đầu hành trình của bạn?
            </h2>
            <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto">
              Đừng bỏ lỡ cơ hội trở thành một phần của cộng đồng học thuật hiện đại và năng động.
            </p>
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center gap-3 bg-white text-[#00A3C1] px-12 py-5 rounded-full font-bold text-xl hover:bg-[#F4F7F9] transition-all transform hover:scale-105"
            >
              Đăng ký ngay
              <CheckCircle2 className="w-6 h-6" />
            </Link>
          </div>
          {/* Abstract decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        </div>
      </section>
    </main>
  )
}
