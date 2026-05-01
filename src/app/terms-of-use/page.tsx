import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng | Intech Global Academy",
  description: "Điều khoản sử dụng website của Intech Global Academy",
};

export default function TermsOfUsePage() {
  return (
    <div className="w-full bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-[#002D62] mb-8 text-center">
          ĐIỀU KHOẢN SỬ DỤNG WEBSITE
        </h1>
        
        <div className="prose prose-blue max-w-none text-gray-700 space-y-8">
          <p className="text-lg">
            Bằng việc truy cập vào website của Intech Global Academy, bạn đồng ý tuân thủ các quy định dưới đây.
          </p>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-4">1. Quyền sở hữu trí tuệ trên website</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Toàn bộ nội dung hiển thị trên website bao gồm: Tagline, mô tả khóa học, danh mục đào tạo (AI Ứng dụng, Quản lý chất lượng, IoT...), hình ảnh và mã nguồn đều thuộc quyền sở hữu trí tuệ của Intech.
              </li>
              <li>
                Người dùng chỉ được phép xem và tham khảo nội dung. Mọi hành vi sao chép, trích dẫn nội dung trực tuyến cho mục đích thương mại mà không có sự đồng ý bằng văn bản từ Intech đều bị nghiêm cấm.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-4">2. Quy tắc ứng xử trực tuyến</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-gray-900">Hành vi bị cấm:</strong> Không được sử dụng bất kỳ công cụ tự động nào (bots, scrapers) để thu thập dữ liệu từ website; không thực hiện các hành vi gây cản trở hoặc làm quá tải hạ tầng kỹ thuật của trang web.
              </li>
              <li>
                <strong className="text-gray-900">Thông tin phản hồi:</strong> Người dùng cam kết không gửi các nội dung vi phạm pháp luật, xúc phạm hoặc chứa mã độc thông qua các biểu mẫu liên hệ trên website.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-4">3. Liên kết đến bên thứ ba</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Website có thể chứa các liên kết đến các trang web khác (ví dụ: các công cụ AI như ChatGPT, Gemini hoặc các nền tảng quản lý học tập). Intech không chịu trách nhiệm về nội dung hay chính sách bảo mật của các trang web bên thứ ba này.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-4">4. Giới hạn trách nhiệm về thông tin trực tuyến</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Thông tin về các khóa học và giải pháp trên website (như sơ đồ lộ trình &quot;Start Small. Scale Fast. Go Global&quot;) mang tính chất giới thiệu và tham khảo. Intech có quyền cập nhật hoặc thay đổi nội dung này bất kỳ lúc nào mà không cần thông báo trước.
              </li>
            </ul>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
            <p>Cập nhật lần cuối: 01/05/2026</p>
            <p>Mọi thắc mắc về điều khoản sử dụng, vui lòng liên hệ email: hello@intech.edu.vn</p>
          </div>
        </div>
      </div>
    </div>
  );
}
