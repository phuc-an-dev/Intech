"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Building2 } from "lucide-react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <div className="w-full bg-[#F4F7F9] min-h-screen pb-24 relative overflow-hidden z-0">
      {/* Decorative Background Dots & Extra Blobs for the entire page */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#002D62 1.5px, transparent 1.5px)', backgroundSize: '32px 32px', opacity: 0.15 }}></div>
      <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-[#002D62]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-[-5%] w-[600px] h-[600px] bg-[#00A3C1]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Header Section */}
      <section className="bg-[#002D62] text-white py-20 md:py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-50%] right-[-10%] w-3/4 h-[200%] bg-[#00A3C1] opacity-20 blur-3xl transform rotate-45"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Liên Hệ Trực Tiếp
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Intech Global Academy luôn sẵn lòng lắng nghe và hỗ trợ định hướng sự nghiệp công nghiệp của bạn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 mt-[-60px] md:mt-[-80px] relative z-20">
        {/* Decorative Blobs behind the glass */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#00A3C1]/20 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-[#002D62]/15 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden flex flex-col md:flex-row relative z-10">
          
          {/* Left Column: Contact Info */}
          <div className="w-full md:w-2/5 bg-[#00A3C1] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-50 blur-2xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-bold mb-8 text-white">
                Thông tin liên lạc
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm shadow-sm">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-xs mb-1 uppercase tracking-wider font-bold">Email</p>
                    <p className="text-lg font-bold">hello@intech.edu.vn</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm shadow-sm">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-xs mb-1 uppercase tracking-wider font-bold">Hotline</p>
                    <p className="text-lg font-bold">1900 xxxx</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm shadow-sm">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/80 text-xs mb-1 uppercase tracking-wider font-bold">Văn phòng chính</p>
                    <p className="text-lg font-bold leading-snug">Toà nhà Intech<br/>Thành phố Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/20 relative z-10">
              <div className="flex items-center gap-3 mb-2 text-white">
                <Building2 className="w-5 h-5" />
                <span className="font-bold">Công ty TNHH Intech Global</span>
              </div>
              <p className="text-white/80 text-sm font-medium">Mã số thuế: 03xxxxxx</p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="w-full md:w-3/5 p-10 md:p-14 bg-white relative z-10">
            <h2 className="font-heading text-3xl font-bold text-[#002D62] mb-2">
              Gửi thông điệp cho chúng tôi
            </h2>
            <p className="text-gray-500 mb-8 font-medium">Điền thông tin bên dưới, chuyên viên tư vấn sẽ liên hệ với bạn trong vòng 24 giờ.</p>

            {formStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-emerald-800 mb-2">Đã gửi thành công!</h3>
                <p className="text-emerald-600 font-medium">
                  Cảm ơn bạn đã liên hệ. Chúng tôi đã ghi nhận thông tin và sẽ phản hồi sớm nhất.
                </p>
                <button 
                  onClick={() => setFormStatus("idle")}
                  className="mt-6 text-emerald-700 font-bold hover:text-emerald-900 underline"
                >
                  Gửi thêm câu hỏi khác
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold text-gray-700">Họ và tên <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      placeholder="VD: Nguyễn Văn A"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-bold text-gray-700">Số điện thoại <span className="text-rose-500">*</span></label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      placeholder="VD: 0912..."
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-700">Email <span className="text-rose-500">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    placeholder="VD: email@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="interest" className="text-sm font-bold text-gray-700">Chủ đề quan tâm</label>
                  <select 
                    id="interest"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium text-gray-700"
                  >
                    <option value="">-- Chọn chủ đề --</option>
                    <option value="course">Tư vấn khóa học đào tạo</option>
                    <option value="corporate">Đào tạo doanh nghiệp (In-house)</option>
                    <option value="mobility">Chương trình Mobility</option>
                    <option value="other">Hợp tác & Vấn đề khác</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-gray-700">Nội dung tin nhắn <span className="text-rose-500">*</span></label>
                  <textarea 
                    id="message" 
                    rows={4}
                    required
                    placeholder="Bạn cần chúng tôi hỗ trợ cụ thể về vấn đề gì?"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all resize-none font-medium"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === "submitting"}
                  className="w-full sm:w-auto px-10 py-4 bg-[#002D62] text-white rounded-xl font-bold text-lg hover:bg-[#00A3C1] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {formStatus === "submitting" ? (
                    <>Đang gửi...</>
                  ) : (
                    <>
                      Gửi yêu cầu
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
