"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, Globe2, ArrowRight, ShieldCheck, FileText } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
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
    <div className="w-full bg-[#F4F7F9] min-h-screen pb-24">
      {/* Header Section */}
      <section className="bg-[#002D62] text-white py-20 md:py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-50%] right-[-10%] w-3/4 h-[200%] bg-[#00A3C1] opacity-10 blur-3xl transform rotate-45"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Về Chúng Tôi
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              Intech Global Academy là đơn vị tiên phong tại Việt Nam tích hợp mô hình hệ sinh thái đào tạo và tư vấn công nghiệp thực chiến.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-7xl mx-auto px-4 mt-[-60px] relative z-20">
        <motion.div 
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-12 items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex-1 space-y-6">
            <h2 className="font-heading text-3xl font-bold text-[#002D62]">
              Thu hẹp khoảng cách giữa học thuật và thực tiễn
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Chúng tôi được xây dựng trên nền tảng hiểu biết sâu sắc về thị trường công nghiệp nội địa. Bằng việc kết nối ba trụ cột chiến lược là <strong>Industry (Công nghiệp)</strong> – <strong>Education (Đào tạo)</strong> – <strong>Global Mobility (Phái cử quốc tế)</strong>, Intech Global Academy kiến tạo một lộ trình phát triển toàn diện cho thế hệ nhân lực công nghiệp tương lai tại Việt Nam và khu vực Đông Nam Á.
            </p>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-[4/3] rounded-2xl bg-slate-200 w-full flex items-center justify-center relative overflow-hidden border-4 border-gray-50">
              <span className="text-slate-400 font-medium">800x600 Placeholder Image</span>
              <div className="absolute inset-0 bg-[#00A3C1]/5"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-4">
            Sứ mệnh của chúng tôi
          </h2>
          <p className="text-gray-600">
            Đóng vai trò là cầu nối chiến lược giữa các hệ sinh thái quan trọng của nền kinh tế hiện đại.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-[#002D62]/10 rounded-2xl flex items-center justify-center mb-6">
              <Building2 className="w-7 h-7 text-[#002D62]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#002D62] mb-4">Đối với Doanh nghiệp (Industry)</h3>
            <p className="text-gray-600 leading-relaxed">
              Nâng cao năng lực vận hành, tối ưu hóa quy trình và thúc đẩy chuyển đổi số thực chất cho các đơn vị sản xuất và logistics.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-[#00A3C1]/10 rounded-2xl flex items-center justify-center mb-6">
              <GraduationCap className="w-7 h-7 text-[#00A3C1]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#002D62] mb-4">Đối với Người học (Education)</h3>
            <p className="text-gray-600 leading-relaxed">
              Chuẩn hóa kỹ năng và trang bị kiến thức thực chiến cho sinh viên và nhân sự đi làm, giúp họ sẵn sàng cho vị trí trình độ cao.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow border border-gray-100">
            <div className="w-14 h-14 bg-[#002D62]/10 rounded-2xl flex items-center justify-center mb-6">
              <Globe2 className="w-7 h-7 text-[#002D62]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#002D62] mb-4">Đối với Thị trường quốc tế (Mobility)</h3>
            <p className="text-gray-600 leading-relaxed">
              Mở ra cơ hội nghề nghiệp và học tập xuyên biên giới thông qua hệ sinh thái học tập và trải nghiệm quốc tế.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Core Values Section - Big Acronym Layout */}
      <section className="bg-[#002D62] py-24 md:py-32 px-4 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Hệ giá trị FOCUS
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Tại Intech Global Academy, mọi hoạt động đều được định hướng bởi 5 giá trị then chốt.
            </p>
          </motion.div>

          <div className="space-y-16 md:space-y-24">
            {[
              {
                letter: "F",
                title: "Future-oriented (Tiên phong)",
                desc: "Luôn đi đầu trong việc cập nhật công nghệ (AI, IoT) và đón đầu các xu hướng công nghiệp tương lai."
              },
              {
                letter: "O",
                title: "Optimization (Tối ưu)",
                desc: "Cam kết mang lại hiệu quả cao nhất trong việc cải tiến quy trình doanh nghiệp và lộ trình cá nhân."
              },
              {
                letter: "C",
                title: "Connectivity (Kết nối)",
                desc: "Xây dựng mạng lưới liên kết chặt chẽ giữa Nhà trường – Doanh nghiệp – Thị trường lao động toàn cầu."
              },
              {
                letter: "U",
                title: "Unleash (Khai phóng)",
                desc: "Khai phá tiềm năng vô hạn của con người và giải phóng sức mạnh công nghệ để tạo ra những đột phá mới."
              },
              {
                letter: "S",
                title: "Synergy (Cộng hưởng)",
                desc: "Tạo nên sức mạnh tổng thể từ sự gắn kết giữa 3 mảng hoạt động chính, cùng đối tác và học viên vươn tầm."
              }
            ].map((value, idx) => (
              <motion.div 
                key={value.letter}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-row items-start md:items-center group"
              >
                {/* Left side: Big Acronym (20%) */}
                <div className="w-1/4 md:w-1/5 shrink-0 flex justify-center items-center">
                  <span className="text-[80px] md:text-[140px] font-heading font-black text-white/10 group-hover:text-[#00A3C1] transition-colors duration-500 select-none leading-none">
                    {value.letter}
                  </span>
                </div>
                
                {/* Right side: Title & Description (80%) */}
                <div className="w-3/4 md:w-4/5 pl-4 md:pl-8">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl text-white group-hover:text-[#00A3C1] transition-colors duration-300 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses CTA Section */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-[#00A3C1]/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <GraduationCap className="w-10 h-10 text-[#00A3C1]" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#002D62] mb-6">
              Sẵn sàng bắt đầu hành trình?
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
              Khám phá các khóa học chuyên sâu được thiết kế riêng cho lĩnh vực công nghiệp, giúp bạn làm chủ công nghệ và tối ưu hóa vận hành.
            </p>
            <Link 
              href="/courses"
              className="inline-flex items-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#00A3C1] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Khám phá danh mục đào tạo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Legal & Policy Links Section */}
      <section className="py-16 px-4 bg-[#F4F7F9] border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl font-bold text-[#002D62]">Thông tin pháp lý</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/privacy-policy" className="group">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-[#00A3C1] transition-all duration-300 flex items-start gap-6 h-full"
              >
                <div className="p-4 bg-[#002D62]/5 rounded-2xl group-hover:bg-[#00A3C1]/10 transition-colors">
                  <ShieldCheck className="w-8 h-8 text-[#002D62] group-hover:text-[#00A3C1] transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#002D62] mb-2 group-hover:text-[#00A3C1] transition-colors">Chính sách bảo mật</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Đọc hiểu cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu, thông tin cá nhân của bạn trên hệ thống.</p>
                </div>
              </motion.div>
            </Link>

            <Link href="/terms-of-use" className="group">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-[#00A3C1] transition-all duration-300 flex items-start gap-6 h-full"
              >
                <div className="p-4 bg-[#002D62]/5 rounded-2xl group-hover:bg-[#00A3C1]/10 transition-colors">
                  <FileText className="w-8 h-8 text-[#002D62] group-hover:text-[#00A3C1] transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-[#002D62] mb-2 group-hover:text-[#00A3C1] transition-colors">Điều khoản sử dụng</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Tìm hiểu các quy định, quyền lợi và trách nhiệm pháp lý khi bạn sử dụng dịch vụ của Intech.</p>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
