'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Khóa học', href: '/courses' },
    { name: 'Mobility', href: '/coming-soon' },
    { name: 'Chuyên gia', href: '/coming-soon' },
  ]

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-bold text-[#002D62] relative z-[120]">
          Intech
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="font-medium text-[#1A1A1A] hover:text-[#00A3C1] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="/contact" 
            className="hidden md:inline-flex bg-[#002D62] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#001f44] transition-colors"
          >
            Liên hệ ngay
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#002D62] relative z-[120]"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#002D62]/20 backdrop-blur-sm z-[100] md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[110] shadow-2xl md:hidden flex flex-col p-8 pt-24"
            >
              <nav className="flex flex-col gap-6 mb-12">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-heading font-bold text-[#002D62] hover:text-[#00A3C1] transition-colors flex items-center justify-between group"
                  >
                    {link.name}
                    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </nav>

              <div className="mt-auto">
                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#002D62] text-white w-full py-5 rounded-2xl font-bold text-lg hover:bg-[#001f44] transition-colors"
                >
                  Liên hệ ngay
                </Link>
                <p className="text-center text-[#4A4A4A] mt-8 text-sm">
                  Intech: Chạm tri thức, Kiến tạo tương lai.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
