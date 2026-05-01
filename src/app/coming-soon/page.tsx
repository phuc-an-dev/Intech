import Link from "next/link";
import { ArrowLeft, Hammer } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F4F7F9] px-4 py-20">
      <div className="text-center max-w-2xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100">
        <div className="w-20 h-20 bg-[#00A3C1]/10 rounded-2xl flex items-center justify-center mx-auto mb-8 relative">
          {/* Simple animated dots/sparkles could go here if client component, but keeping it simple for server component */}
          <Hammer className="w-10 h-10 text-[#00A3C1]" />
        </div>
        
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#002D62] mb-6">
          Tính năng đang được phát triển
        </h1>
        
        <p className="text-gray-600 text-lg mb-10 leading-relaxed">
          Chúng tôi đang nỗ lực hoàn thiện phân hệ này để mang lại trải nghiệm tốt nhất cho bạn trong thời gian tới. Vui lòng quay lại sau nhé!
        </p>

        <div className="flex justify-center">
          <Link 
            href="/"
            className="flex items-center gap-2 bg-[#002D62] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#00A3C1] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
