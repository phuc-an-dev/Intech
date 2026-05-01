"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, Globe, CheckCircle, Calendar, Users, MonitorPlay } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";

export default function Home() {
  // Lấy 3 khóa học tiêu biểu (ví dụ: lấy 3 khóa học đầu tiên của các mảng khác nhau hoặc 3 khóa học đầu tiên)
  const highlightedCourses = courses.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-[#F4F7F9]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#00A3C1]/5 skew-x-12 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#002D62]/5 -skew-x-12 -translate-x-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#00A3C1]/20 text-[#00A3C1] text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00A3C1] animate-pulse"></span>
                Kiến tạo nhân lực công nghiệp tương lai
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#002D62] leading-tight mb-6">
                Khởi đầu nhỏ.<br className="hidden md:block" /> 
                Tăng trưởng nhanh.<br className="hidden md:block" /> 
                <span className="text-[#00A3C1]">Vươn tầm quốc tế.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0">
                Hệ sinh thái đào tạo và tư vấn giải pháp công nghiệp hàng đầu, giúp cá nhân và doanh nghiệp làm chủ công nghệ 4.0, sẵn sàng hội nhập chuỗi cung ứng toàn cầu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                  href="/courses" 
                  className="inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-[#002D62] text-white rounded-full font-medium hover:bg-[#002D62]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Khám phá khóa học
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-white text-[#002D62] border border-[#002D62]/20 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow"
                >
                  Nhận tư vấn giải pháp
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 w-full max-w-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Hero Image Placeholder */}
              <div className="aspect-[4/3] rounded-3xl bg-slate-200 w-full flex items-center justify-center relative overflow-hidden shadow-2xl border-4 border-white">
                <span className="text-slate-400 font-medium">1024x768 Hero Image Placeholder</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#002D62]/10 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-4">
              Hệ sinh thái toàn diện
            </h2>
            <p className="text-gray-600">
              Intech Global Academy tích hợp ba trụ cột chiến lược nhằm mang lại giá trị bền vững cho cả cá nhân và doanh nghiệp.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Pillar 1 */}
            <motion.div variants={itemVariants} className="bg-[#F4F7F9] rounded-3xl p-8 hover:shadow-lg transition-shadow border border-white">
              <div className="w-14 h-14 bg-[#00A3C1]/10 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-[#00A3C1]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#002D62] mb-3">Education (Đào tạo thực chiến)</h3>
              <p className="text-gray-600 leading-relaxed">
                Chương trình đào tạo từ cơ bản đến nâng cao về AI, Lean, IoT và Chuỗi cung ứng, được thiết kế bởi các chuyên gia đầu ngành.
              </p>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div variants={itemVariants} className="bg-[#002D62] rounded-3xl p-8 hover:shadow-lg transition-shadow shadow-xl text-white transform md:-translate-y-4">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7 text-[#00A3C1]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-3">Industry Consultancy</h3>
              <p className="text-white/80 leading-relaxed">
                Tối ưu hóa vận hành, chuyển đổi số nhà máy và tư vấn quản trị tuân thủ giúp doanh nghiệp nâng cao năng lực cạnh tranh.
              </p>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div variants={itemVariants} className="bg-[#F4F7F9] rounded-3xl p-8 hover:shadow-lg transition-shadow border border-white">
              <div className="w-14 h-14 bg-[#00A3C1]/10 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-[#00A3C1]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#002D62] mb-3">Student Mobility</h3>
              <p className="text-gray-600 leading-relaxed">
                Lộ trình sự nghiệp toàn cầu, kết nối học viên với các thị trường lao động trình độ cao tại nước ngoài một cách bền vững.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Featured Courses */}
      <section className="py-24 bg-[#F4F7F9]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-4">
                Đào tạo trọng tâm
              </h2>
              <p className="text-gray-600">
                Các chương trình được thiết kế bám sát nhu cầu thực tế của ngành công nghiệp và logistics, cập nhật xu hướng công nghệ mới nhất.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/courses"
                className="inline-flex items-center gap-2 text-[#002D62] font-semibold hover:text-[#00A3C1] transition-colors"
              >
                Xem tất cả khóa học
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {highlightedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              className="flex-1 w-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square md:aspect-[4/3] lg:aspect-square rounded-[2rem] bg-slate-200 w-full flex items-center justify-center relative overflow-hidden">
                <span className="text-slate-400 font-medium">800x800 Placeholder (LMS/Learning)</span>
                <div className="absolute inset-0 border-8 border-white/50 rounded-[2rem]"></div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-10">
                Tại sao chọn Intech Global Academy?
              </h2>
              
              <div className="space-y-8">
                {[
                  {
                    icon: <MonitorPlay className="w-6 h-6 text-white" />,
                    title: "Học từ thực tế (Practice-based)",
                    desc: "Chương trình bám sát nhu cầu thực tế của ngành công nghiệp và logistics."
                  },
                  {
                    icon: <Globe className="w-6 h-6 text-white" />,
                    title: "Hệ sinh thái toàn diện",
                    desc: "Không chỉ học, học viên được tư vấn lộ trình nghề nghiệp và kết nối quốc tế."
                  },
                  {
                    icon: <Users className="w-6 h-6 text-white" />,
                    title: "Đội ngũ chuyên gia",
                    desc: "Giảng viên là những người trực tiếp vận hành tại các doanh nghiệp lớn."
                  },
                  {
                    icon: <MonitorPlay className="w-6 h-6 text-white" />,
                    title: "Nền tảng hiện đại",
                    desc: "Ứng dụng LMS giúp trải nghiệm học tập online/offline linh hoạt."
                  }
                ].map((item, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="flex gap-4">
                    <div className="w-12 h-12 bg-[#00A3C1] rounded-xl flex items-center justify-center shrink-0 shadow-md">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#002D62] mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Lead Magnet */}
      <section className="py-24 bg-[#002D62] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A3C1] rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block px-3 py-1 rounded-full bg-[#00A3C1]/20 text-[#00A3C1] font-semibold text-sm mb-6 uppercase tracking-wider">
                  Workshop Miễn Phí
                </div>
                <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  AI-Powered Workflow
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl">
                  Tối ưu hóa hiệu suất công việc với kỹ thuật Prompting đỉnh cao và quy trình tự động hóa bằng AI chỉ trong 03 buổi.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="w-5 h-5 text-[#00A3C1]" />
                    Làm chủ ChatGPT, Gemini & Claude cho công việc
                  </li>
                  <li className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="w-5 h-5 text-[#00A3C1]" />
                    Tự động hóa báo cáo và xử lý dữ liệu
                  </li>
                  <li className="flex items-center gap-3 text-white/90">
                    <Calendar className="w-5 h-5 text-[#00A3C1]" />
                    Khai giảng: 15/06/2026 - Hình thức: Online
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-heading font-bold text-2xl text-[#002D62] mb-6 text-center">
                  Đăng ký tham gia ngay
                </h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00A3C1] focus:border-transparent outline-none transition-all" placeholder="Nhập họ và tên" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00A3C1] focus:border-transparent outline-none transition-all" placeholder="Nhập email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00A3C1] focus:border-transparent outline-none transition-all" placeholder="Nhập số điện thoại" />
                  </div>
                  <button type="button" className="w-full py-4 mt-2 bg-[#00A3C1] text-white rounded-full font-bold text-lg hover:bg-[#008ba5] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Giữ chỗ của tôi
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4">
                    Thông tin của bạn được bảo mật tuyệt đối.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Vision 2030 */}
      <section className="py-24 bg-white text-center px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-[#00A3C1] font-bold tracking-widest uppercase mb-4">Tầm nhìn 2030</div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#002D62] leading-tight">
            "Trở thành một trong 5 đơn vị đào tạo và tư vấn giải pháp công nghiệp hàng đầu Việt Nam, hướng tới mở rộng toàn khu vực Đông Nam Á."
          </h2>
        </motion.div>
      </section>
    </div>
  );
}
