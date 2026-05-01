import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách bảo mật | Intech Global Academy",
  description: "Chính sách bảo mật trực tuyến của Intech Global Academy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-[#002D62] mb-8 text-center">
          CHÍNH SÁCH BẢO MẬT TRỰC TUYẾN
        </h1>
        
        <div className="prose prose-blue max-w-none text-gray-700 space-y-8">
          <p className="text-lg">
            Chính sách này quy định cách Intech Global Academy thu thập và xử lý thông tin khi bạn truy cập và tương tác với các tính năng trên website.
          </p>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-4">1. Thu thập thông tin tự động</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-gray-900">Dữ liệu truy cập:</strong> Chúng tôi tự động thu thập thông tin qua Cookies và các công nghệ tương tự, bao gồm địa chỉ IP, loại trình duyệt, ngôn ngữ và thời gian truy cập để tối ưu hóa hiển thị website.
              </li>
              <li>
                <strong className="text-gray-900">Cookies:</strong> Website sử dụng cookies để ghi nhớ tùy chọn của người dùng và phân tích lưu lượng truy cập nhằm cải thiện trải nghiệm người dùng trên trang.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-4">2. Thu thập thông tin do người dùng cung cấp</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-gray-900">Biểu mẫu liên hệ/Đăng ký:</strong> Khi bạn sử dụng các form trên website (như đăng ký nhận tin, yêu cầu tư vấn khóa học, tham gia workshop), chúng tôi thu thập họ tên, email và số điện thoại của bạn.
              </li>
              <li>
                <strong className="text-gray-900">Mục đích:</strong> Thông tin này chỉ được sử dụng để phản hồi các yêu cầu từ phía bạn, cung cấp thông tin về khóa học (như Workshop AI-Powered Workflow) hoặc các chương trình đào tạo mà bạn quan tâm.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-[#002D62] mb-4">3. Bảo mật thông tin trực tuyến</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                Chúng tôi sử dụng giao thức HTTPS/SSL để mã hóa dữ liệu truyền tải giữa trình duyệt của bạn và máy chủ website nhằm ngăn chặn sự can thiệp trái phép.
              </li>
              <li>
                Dữ liệu cá nhân thu thập qua website được lưu trữ trong môi trường kiểm soát nghiêm ngặt và tuyệt đối không được chia sẻ cho bất kỳ bên thứ ba nào vì mục đích tiếp thị.
              </li>
            </ul>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
            <p>Cập nhật lần cuối: 01/05/2026</p>
            <p>Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ email: hello@intech.edu.vn</p>
          </div>
        </div>
      </div>
    </div>
  );
}
