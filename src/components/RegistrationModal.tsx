"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, BookOpen, Info } from "lucide-react";

export interface CourseInfo {
  title: string;
  topicName: string;
  levelLabel: string;
  durationHours: number;
  durationSessions: number;
  price: number;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseInfo: CourseInfo;
}

export default function RegistrationModal({ isOpen, onClose, courseInfo }: RegistrationModalProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setFormStatus("idle"); // reset status when opened
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[9998]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[95vh]"
            >
              {/* Header */}
              <div className="bg-[#002D62] p-5 md:p-6 text-white relative shrink-0">
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#00A3C1]" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl">Đăng ký khóa học</h2>
                </div>
                <p className="text-white/70 text-sm pl-[3.25rem]">
                  Vui lòng điền đầy đủ thông tin bên dưới để hoàn tất đăng ký.
                </p>
              </div>

              {/* Body */}
              <div className="p-5 md:p-8 overflow-y-auto">
                {formStatus === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-[#002D62] mb-3">Đăng ký thành công!</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed max-w-sm mx-auto">
                      Cảm ơn bạn đã đăng ký. Bộ phận tuyển sinh của Intech sẽ liên hệ với bạn qua số điện thoại để tư vấn chi tiết trong thời gian sớm nhất.
                    </p>
                    <button 
                      onClick={onClose}
                      className="w-full sm:w-auto px-10 py-4 bg-[#F4F7F9] text-[#002D62] font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Đóng cửa sổ
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-8">
                    
                    {/* Thông tin khóa học (Read-only) */}
                    <div className="bg-[#F4F7F9] rounded-2xl p-5 border border-[#002D62]/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Info className="w-32 h-32" />
                      </div>
                      <h3 className="text-xs font-bold text-[#002D62] uppercase tracking-wider mb-4 border-b border-gray-200 pb-2 relative z-10">
                        Thông tin khóa học
                      </h3>
                      <div className="space-y-3 relative z-10">
                        <div>
                          <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1">Tên khóa học</span>
                          <strong className="text-[#002D62] text-lg leading-tight">{courseInfo.title}</strong>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                          <div>
                            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-0.5">Chủ đề</span>
                            <span className="font-medium text-sm">{courseInfo.topicName}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-0.5">Cấp độ</span>
                            <span className="font-medium text-sm">{courseInfo.levelLabel}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-0.5">Thời lượng</span>
                            <span className="font-medium text-sm">{courseInfo.durationHours} giờ ({courseInfo.durationSessions} buổi)</span>
                          </div>
                          <div>
                            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-0.5">Học phí</span>
                            <span className="font-bold text-[#00A3C1] text-sm">{courseInfo.price.toLocaleString("vi-VN")} VNĐ</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Section 1: Thông tin cá nhân */}
                      <div>
                        <h3 className="text-lg font-bold text-[#002D62] mb-4 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#00A3C1]/10 text-[#00A3C1] flex items-center justify-center text-sm">1</span>
                          Thông tin cá nhân
                        </h3>
                        <div className="space-y-5">
                          <div className="space-y-1.5">
                            <label htmlFor="modal-name" className="text-sm font-bold text-gray-700">Họ và tên <span className="text-rose-500">*</span></label>
                            <input type="text" id="modal-name" required placeholder="VD: Nguyễn Văn A" className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                              <label htmlFor="modal-phone" className="text-sm font-bold text-gray-700">Số điện thoại <span className="text-rose-500">*</span></label>
                              <input type="tel" id="modal-phone" required placeholder="VD: 0912..." className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-1.5">
                              <label htmlFor="modal-email" className="text-sm font-bold text-gray-700">Email <span className="text-rose-500">*</span></label>
                              <input type="email" id="modal-email" required placeholder="email@example.com" className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1.5 md:col-span-2">
                              <label htmlFor="modal-school" className="text-sm font-bold text-gray-700">Trường đang học / Công tác <span className="text-rose-500">*</span></label>
                              <input type="text" id="modal-school" required placeholder="VD: ĐH Bách Khoa TP.HCM" className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-1.5">
                              <label htmlFor="modal-year" className="text-sm font-bold text-gray-700">Năm học</label>
                              <select id="modal-year" className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium text-gray-700">
                                <option value="">-- Chọn năm học --</option>
                                <option value="1">Năm 1</option>
                                <option value="2">Năm 2</option>
                                <option value="3">Năm 3</option>
                                <option value="4">Năm 4</option>
                                <option value="graduated">Mới tốt nghiệp</option>
                                <option value="working">Đã đi làm</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label htmlFor="modal-major" className="text-sm font-bold text-gray-700">Ngành học</label>
                              <input type="text" id="modal-major" placeholder="VD: Quản lý công nghiệp" className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Marketing & Insight */}
                      <div>
                        <h3 className="text-lg font-bold text-[#002D62] mb-4 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#00A3C1]/10 text-[#00A3C1] flex items-center justify-center text-sm">2</span>
                          Khảo sát ngắn
                        </h3>
                        <div className="space-y-5">
                          <div className="space-y-1.5">
                            <label htmlFor="modal-source" className="text-sm font-bold text-gray-700">Bạn biết đến IntechISC qua đâu?</label>
                            <select id="modal-source" className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium text-gray-700">
                              <option value="">-- Chọn kênh tiếp cận --</option>
                              <option value="facebook_ig">Facebook / Instagram</option>
                              <option value="friend">Bạn bè giới thiệu</option>
                              <option value="tiktok">TikTok</option>
                              <option value="google">Google Search</option>
                              <option value="club">Câu lạc bộ trường</option>
                              <option value="other">Khác</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="modal-goal" className="text-sm font-bold text-gray-700">Bạn muốn đạt được gì sau khóa học?</label>
                            <textarea id="modal-goal" rows={3} placeholder="Mục tiêu hoặc kỳ vọng của bạn là gì?" className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all resize-none font-medium"></textarea>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <button 
                          type="submit" 
                          disabled={formStatus === "submitting"}
                          className="w-full py-4 bg-[#002D62] text-white rounded-xl font-bold text-lg hover:bg-[#00A3C1] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {formStatus === "submitting" ? (
                            <>Đang gửi đăng ký...</>
                          ) : (
                            <>
                              Gửi thông tin đăng ký
                              <Send className="w-5 h-5" />
                            </>
                          )}
                        </button>
                        <p className="text-center text-xs text-gray-500 pt-3">
                          Bằng việc đăng ký, bạn đồng ý với chính sách bảo mật của Intech.
                        </p>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
