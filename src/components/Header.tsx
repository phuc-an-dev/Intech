'use client'

import { useState, useEffect } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { name: t('home'), href: '/' as const },
    { name: t('about'), href: '/about' as const },
    { name: t('courses'), href: '/courses' as const },
    { name: t('contact_us'), href: '/contact' as const },
  ]

  return (
    <>
      <header className={`w-full sticky top-0 transition-all duration-300 ${isOpen ? 'z-[1010]' : 'z-50'} ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm py-1' : 'bg-white border-b border-gray-100 py-0'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="relative z-[1011] flex items-center"
          >
            <Image
              src="/logo.svg"
              alt="Intech - Hệ sinh thái đào tạo công nghiệp"
              width={120}
              height={36}
              className="h-8 w-auto md:h-10"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition-colors ${isActive ? 'text-[#00A3C1] font-bold' : 'text-[#1A1A1A] hover:text-[#00A3C1]'}`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            
            <Link 
              href="/contact" 
              className="hidden md:inline-flex bg-[#002D62] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[#001f44] transition-colors"
            >
              {tCommon('register')}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#002D62] relative z-[1011]"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer - Moved outside header to avoid sticky/blur constraints */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#002D62]/40 backdrop-blur-md z-[1000] md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full bg-white z-[1001] shadow-2xl md:hidden flex flex-col p-6 pt-24"
            >
              <div className="mb-8 w-fit">
                <LanguageSwitcher />
              </div>

              <nav className="flex flex-col gap-6 mb-12">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-heading font-bold transition-colors flex items-center justify-between group ${isActive ? 'text-[#00A3C1]' : 'text-[#002D62] hover:text-[#00A3C1]'}`}
                    >
                      {link.name}
                      <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-auto">
                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[#002D62] text-white w-full py-5 rounded-2xl font-bold text-lg hover:bg-[#001f44] transition-colors"
                >
                  {tCommon('register')}
                </Link>
                <p className="text-center text-[#4A4A4A] mt-8 text-sm">
                  Intech: Hệ sinh thái đào tạo và tư vấn giải pháp công nghiệp hàng đầu.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
