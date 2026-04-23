'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Mail, Bell } from 'lucide-react'

export default function ComingSoon() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 inline-flex items-center justify-center w-24 h-24 bg-[#F4F7F9] rounded-full text-[#00A3C1]"
        >
          <Clock className="w-12 h-12" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-heading text-4xl md:text-6xl font-extrabold text-[#002D62] mb-6 leading-tight"
        >
          Tính năng đang được <br />
          <span className="text-[#00A3C1]">Kiến tạo.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-[#4A4A4A] text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Chúng tôi đang nỗ lực hoàn thiện nội dung này để mang đến cho bạn trải nghiệm tốt nhất. 
          Hãy quay lại sớm để khám phá những kiến thức mới từ Intech.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#002D62] text-white px-8 py-4 rounded-full font-bold hover:bg-[#001f44] transition-all transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại Trang chủ
          </Link>
          <button
            className="flex items-center justify-center gap-2 bg-transparent border-2 border-[#00A3C1] text-[#00A3C1] px-8 py-4 rounded-full font-bold hover:bg-[#00A3C1] hover:text-white transition-all transform hover:scale-105"
          >
            <Bell className="w-5 h-5" />
            Nhận thông báo
          </button>
        </motion.div>

        {/* Subscribe Section (Simple) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 p-8 bg-[#F4F7F9] rounded-[32px] border border-gray-100 max-w-lg mx-auto"
        >
          <h3 className="font-bold text-[#002D62] mb-4 flex items-center justify-center gap-2">
            <Mail className="w-5 h-5 text-[#00A3C1]" />
            Đăng ký nhận tin tức mới nhất
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Email của bạn" 
              className="flex-1 px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A3C1] bg-white"
            />
            <button className="bg-[#00A3C1] text-white px-6 py-3 rounded-full font-bold hover:bg-[#008ba5] transition-colors">
              Gửi
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
