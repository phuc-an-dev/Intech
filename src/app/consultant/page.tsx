'use client'

import { motion } from 'framer-motion'
import { Users, Star, MessageSquare, Award, Briefcase, GraduationCap, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const consultants = [
  {
    id: 1,
    name: 'TS. Nguyễn Văn A',
    role: 'Chuyên gia Giải pháp Phần mềm',
    experience: '15+ năm kinh nghiệm',
    specialty: 'Cloud Architecture & Microservices',
    education: 'Tiến sĩ CNTT - Đại học Stanford',
    bio: 'Cựu kỹ sư trưởng tại Google với nhiều năm kinh nghiệm xây dựng hệ thống quy mô lớn.',
    image: '/expert-1.jpg'
  },
  {
    id: 2,
    name: 'ThS. Trần Thị B',
    role: 'Chuyên gia Tư vấn Nghề nghiệp',
    experience: '10+ năm kinh nghiệm',
    specialty: 'Career Coaching & HR Strategy',
    education: 'Thạc sĩ Quản trị nhân sự - Đại học Melbourne',
    bio: 'Giúp hàng ngàn sinh viên kết nối thành công với các tập đoàn đa quốc gia.',
    image: '/expert-2.jpg'
  },
  {
    id: 3,
    name: 'Ông Lê Văn C',
    role: 'Chuyên gia Chuyển đổi số',
    experience: '12+ năm kinh nghiệm',
    specialty: 'Digital Transformation & AI Strategy',
    education: 'Cử nhân Kinh tế - Đại học Ngoại thương',
    bio: 'Đã tư vấn chiến lược cho hơn 50 doanh nghiệp trong và ngoài nước.',
    image: '/expert-3.jpg'
  }
]

export default function ConsultantPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <section className="bg-[#002D62] py-24 md:py-32 px-4 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#00A3C1]/10 skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
              Đồng hành cùng <br />
              <span className="text-[#00A3C1]">Chuyên gia đầu ngành.</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 leading-relaxed">
              Nhận sự tư vấn trực tiếp từ những chuyên gia đang làm việc tại các tập đoàn công nghệ và tổ chức giáo dục hàng đầu thế giới.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-[#00A3C1]" />
                <span className="font-bold">Chuyên gia quốc tế</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-[#00A3C1]" />
                <span className="font-bold">Tư vấn 1:1</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Consultants List */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {consultants.map((expert) => (
            <motion.div
              key={expert.id}
              variants={cardVariants}
              className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row p-8 lg:p-0"
            >
              {/* Expert Image Placeholder */}
              <div className="lg:w-1/3 bg-[#F4F7F9] aspect-square lg:aspect-auto flex items-center justify-center relative">
                <Users className="w-20 h-20 text-[#00A3C1]/20" />
                <div className="absolute bottom-6 left-6 right-6 bg-[#002D62] p-4 rounded-2xl text-white text-center shadow-lg">
                  <p className="font-bold">{expert.experience}</p>
                </div>
              </div>

              {/* Expert Info */}
              <div className="lg:w-2/3 p-8 lg:p-16 flex flex-col justify-center">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <div>
                    <h2 className="font-heading text-3xl font-bold text-[#002D62] mb-2">{expert.name}</h2>
                    <p className="text-[#00A3C1] font-bold text-lg">{expert.role}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F4F7F9] px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-bold text-[#002D62]">5.0</span>
                    <span className="text-sm text-[#4A4A4A]">(48 đánh giá)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-[#F4F7F9] rounded-full flex items-center justify-center text-[#002D62] shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#4A4A4A] uppercase font-bold tracking-wider">Chuyên môn</p>
                      <p className="font-bold text-[#002D62]">{expert.specialty}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-[#F4F7F9] rounded-full flex items-center justify-center text-[#002D62] shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#4A4A4A] uppercase font-bold tracking-wider">Học vấn</p>
                      <p className="font-bold text-[#002D62]">{expert.education}</p>
                    </div>
                  </div>
                </div>

                <p className="text-[#4A4A4A] text-lg mb-10 leading-relaxed italic">
                  "{expert.bio}"
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center justify-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-full font-bold hover:bg-[#001f44] transition-all">
                    <MessageSquare className="w-5 h-5" />
                    Đặt lịch tư vấn
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-transparent border-2 border-[#002D62] text-[#002D62] px-8 py-4 rounded-full font-bold hover:bg-[#002D62] hover:text-white transition-all">
                    Xem lộ trình chi tiết
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Consultant Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-[#002D62] mb-6">Giá trị từ sự dẫn dắt</h2>
          <p className="text-[#4A4A4A] text-lg max-w-2xl mx-auto font-medium">Sự khác biệt của Intech nằm ở mạng lưới chuyên gia thực thụ, không chỉ là giảng viên.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#F4F7F9] p-10 rounded-[32px] text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#00A3C1] mx-auto mb-6 shadow-sm">
              <Star className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-[#002D62] text-xl mb-4">Kinh nghiệm thực tế</h4>
            <p className="text-[#4A4A4A]">Học hỏi từ những dự án thật, lỗi thật và cách xử lý chuyên nghiệp từ thị trường.</p>
          </div>
          <div className="bg-[#F4F7F9] p-10 rounded-[32px] text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#00A3C1] mx-auto mb-6 shadow-sm">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-[#002D62] text-xl mb-4">Kết nối mạng lưới</h4>
            <p className="text-[#4A4A4A]">Mở rộng networking với những người có tầm ảnh hưởng lớn trong ngành.</p>
          </div>
          <div className="bg-[#F4F7F9] p-10 rounded-[32px] text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#00A3C1] mx-auto mb-6 shadow-sm">
              <Award className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-[#002D62] text-xl mb-4">Định hướng dài hạn</h4>
            <p className="text-[#4A4A4A]">Không chỉ là học kiến thức, bạn sẽ nhận được lộ trình sự nghiệp vững chắc.</p>
          </div>
        </div>
      </section>

      {/* FAQ Link Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#4A4A4A] font-medium text-lg">Bạn còn thắc mắc về quy trình tư vấn?</p>
          <Link href="/coming-soon" className="flex items-center gap-2 text-[#00A3C1] font-bold group">
            Xem quy trình làm việc
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  )
}
