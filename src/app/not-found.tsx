import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F4F7F9] px-4 py-20">
      <div className="text-center max-w-lg mx-auto">
        {/* Decorative 404 */}
        <div className="relative mb-8 flex justify-center">
          <h1 className="font-heading font-black text-[150px] leading-none text-[#00A3C1]/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#002D62] mt-4">
              Không tìm thấy trang
            </h2>
          </div>
        </div>

        <p className="text-gray-600 text-lg mb-10">
          Xin lỗi, trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không truy cập được.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className="flex items-center gap-2 bg-[#002D62] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#00A3C1] transition-colors w-full sm:w-auto justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
          >
            <Home className="w-5 h-5" />
            Về Trang Chủ
          </Link>
          
          <Link 
            href="/courses"
            className="flex items-center gap-2 bg-white text-[#002D62] border border-gray-200 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
          >
            Khám phá khóa học
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
