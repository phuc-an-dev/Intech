import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Link from "next/link";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Intech - Chạm tri thức, Kiến tạo tương lai",
  description: "Nền tảng giới thiệu khóa học, student mobility và Industry consultant hàng đầu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${montserrat.variable} ${inter.variable} antialiased flex flex-col min-h-screen`}>
        <NextTopLoader color="#00A3C1" showSpinner={false} height={3} />
        <Header />
        <BackToTop />

        {/* Main Content */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-[#002D62] text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="md:col-span-2">
              <h2 className="font-heading text-2xl font-bold mb-4 text-white">Intech</h2>
              <p className="text-[#F4F7F9]/80 max-w-sm mb-6">
                Chạm tri thức, Kiến tạo tương lai. Nền tảng kết nối học thuật và định hướng nghề nghiệp vững chắc dành cho thế hệ trẻ.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#00A3C1]">Khám phá</h3>
              <ul className="space-y-3 text-[#F4F7F9]/80">
                <li><Link href="/about" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">Khóa học</Link></li>
                <li><Link href="/coming-soon" className="hover:text-white transition-colors">Student Mobility</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#00A3C1]">Pháp lý & Liên hệ</h3>
              <ul className="space-y-3 text-[#F4F7F9]/80">
                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Chính sách bảo mật</Link></li>
                <li><Link href="/terms-of-use" className="hover:text-white transition-colors">Điều khoản sử dụng</Link></li>
                <li className="pt-2">Email: hello@intech.edu.vn</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-[#F4F7F9]/60">
            <p>&copy; {new Date().getFullYear()} Intech. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
