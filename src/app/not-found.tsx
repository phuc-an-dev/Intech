'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Search, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-white">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12"
        >
          <h1 className="text-[120px] md:text-[200px] font-black text-[#F4F7F9] leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut"
              }}
              className="w-24 h-24 md:w-32 md:h-32 bg-[#00A3C1] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#00A3C1]/20"
            >
              <Search className="w-12 h-12 md:w-16 md:h-16" strokeWidth={2.5} />
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-[#002D62] mb-6 leading-tight">
            Không tìm thấy trang.
          </h2>
          <p className="text-[#4A4A4A] text-lg md:text-xl mb-12 max-w-lg mx-auto">
            Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang một địa chỉ khác.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-[#002D62] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#001f44] transition-all transform hover:scale-105 shadow-lg shadow-[#002D62]/10"
            >
              <Home className="w-5 h-5" />
              Về Trang chủ
            </Link>
            <Link
              href="/coming-soon"
              className="flex items-center justify-center gap-2 bg-transparent border-2 border-[#00A3C1] text-[#00A3C1] px-10 py-5 rounded-full font-bold text-lg hover:bg-[#00A3C1] hover:text-white transition-all transform hover:scale-105"
            >
              Khám phá khóa học
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 pt-8 border-t border-gray-100"
        >
          <p className="text-[#4A4A4A] font-medium mb-4">Bạn đang tìm kiếm điều gì khác?</p>
          <div className="flex flex-wrap justify-center gap-6 text-[#00A3C1] font-bold">
            <Link href="/coming-soon" className="hover:underline">Mobility</Link>
            <Link href="/coming-soon" className="hover:underline">Chuyên gia</Link>
            <Link href="/contact" className="hover:underline">Liên hệ</Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
