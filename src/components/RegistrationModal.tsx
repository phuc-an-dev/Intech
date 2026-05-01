'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, BookOpen, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

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

const registrationSchema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z.string().regex(/^0[3-9]\d{8}$/, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
  school: z.string().min(2, 'Vui lòng nhập trường/công ty'),
  academicYear: z.string().optional(),
  major: z.string().optional(),
  source: z.string().optional(),
  goal: z.string().optional(),
});
type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegistrationModal({ isOpen, onClose, courseInfo }: RegistrationModalProps) {
  const t = useTranslations('registration');
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [apiError, setApiError] = useState('');

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      reset();
      setApiError('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, reset]);

  const onSubmit = async (data: RegistrationFormData) => {
    setApiError('');
    const res = await fetch('/api/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        courseTitle: courseInfo.title,
        topicName: courseInfo.topicName,
        levelLabel: courseInfo.levelLabel,
        durationHours: courseInfo.durationHours,
        durationSessions: courseInfo.durationSessions,
        price: courseInfo.price,
      }),
    });
    if (res.ok) {
      onClose();
      router.push('/thank-you?type=registration' as never);
    } else {
      const json = await res.json().catch(() => ({}));
      setApiError(json.error ?? 'Gửi thất bại. Vui lòng thử lại.');
    }
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
                  <h2 className="font-heading font-bold text-2xl">{t("modal_title")}</h2>
                </div>
                <p className="text-white/70 text-sm pl-[3.25rem]">
                  {t("modal_subtitle")}
                </p>
              </div>

              {/* Body */}
              <div className="p-5 md:p-8 overflow-y-auto">
                <div className="space-y-8">
                  {/* Course info (read-only) */}
                  <div className="bg-[#F4F7F9] rounded-2xl p-5 border border-[#002D62]/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <Info className="w-32 h-32" />
                    </div>
                    <h3 className="text-xs font-bold text-[#002D62] uppercase tracking-wider mb-4 border-b border-gray-200 pb-2 relative z-10">
                      {t('course_info_title')}
                    </h3>
                    <div className="space-y-3 relative z-10">
                      <div>
                        <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-1">{t('course_name')}</span>
                        <strong className="text-[#002D62] text-lg leading-tight">{courseInfo.title}</strong>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        <div>
                          <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-0.5">{t('topic')}</span>
                          <span className="font-medium text-sm">{courseInfo.topicName}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-0.5">{t('level')}</span>
                          <span className="font-medium text-sm">{courseInfo.levelLabel}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-0.5">{t('duration')}</span>
                          <span className="font-medium text-sm">{t('duration_value', { hours: courseInfo.durationHours, sessions: courseInfo.durationSessions })}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide block mb-0.5">{t('fee')}</span>
                          <span className="font-bold text-[#00A3C1] text-sm">{courseInfo.price.toLocaleString('vi-VN')} VNĐ</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                    {/* Section 1: Personal info */}
                    <div>
                      <h3 className="text-lg font-bold text-[#002D62] mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#00A3C1]/10 text-[#00A3C1] flex items-center justify-center text-sm">1</span>
                        {t('personal_info_title')}
                      </h3>
                      <div className="space-y-5">
                        <div className="space-y-1.5">
                          <label htmlFor="modal-name" className="text-sm font-bold text-gray-700">{t('name_label')} <span className="text-rose-500">*</span></label>
                          <input id="modal-name" type="text" placeholder="VD: Nguyễn Văn A" {...register('name')}
                            className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                          {errors.name && <p className="text-rose-500 text-xs">{errors.name.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                            <label htmlFor="modal-phone" className="text-sm font-bold text-gray-700">{t('phone_label')} <span className="text-rose-500">*</span></label>
                            <input id="modal-phone" type="tel" placeholder="VD: 0912..." {...register('phone')}
                              className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                            {errors.phone && <p className="text-rose-500 text-xs">{errors.phone.message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="modal-email" className="text-sm font-bold text-gray-700">{t('email_label')} <span className="text-rose-500">*</span></label>
                            <input id="modal-email" type="email" placeholder="email@example.com" {...register('email')}
                              className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                            {errors.email && <p className="text-rose-500 text-xs">{errors.email.message}</p>}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-1.5 md:col-span-2">
                            <label htmlFor="modal-school" className="text-sm font-bold text-gray-700">{t('school_work_label')} <span className="text-rose-500">*</span></label>
                            <input id="modal-school" type="text" placeholder={t('school_work_placeholder')} {...register('school')}
                              className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                            {errors.school && <p className="text-rose-500 text-xs">{errors.school.message}</p>}
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="modal-year" className="text-sm font-bold text-gray-700">{t('academic_year_label')}</label>
                            <select id="modal-year" {...register('academicYear')}
                              className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium text-gray-700">
                              <option value="">{t('academic_year_placeholder')}</option>
                              <option value="1">{t('year_1')}</option>
                              <option value="2">{t('year_2')}</option>
                              <option value="3">{t('year_3')}</option>
                              <option value="4">{t('year_4')}</option>
                              <option value="graduated">{t('graduated')}</option>
                              <option value="working">{t('working')}</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="modal-major" className="text-sm font-bold text-gray-700">{t('major_label')}</label>
                            <input id="modal-major" type="text" placeholder={t('major_placeholder')} {...register('major')}
                              className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Survey */}
                    <div>
                      <h3 className="text-lg font-bold text-[#002D62] mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#00A3C1]/10 text-[#00A3C1] flex items-center justify-center text-sm">2</span>
                        {t('survey_title')}
                      </h3>
                      <div className="space-y-5">
                        <div className="space-y-1.5">
                          <label htmlFor="modal-source" className="text-sm font-bold text-gray-700">{t('source_label')}</label>
                          <select id="modal-source" {...register('source')}
                            className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium text-gray-700">
                            <option value="">{t('source_placeholder')}</option>
                            <option value="facebook_ig">{t('source_facebook_ig')}</option>
                            <option value="friend">{t('source_friend')}</option>
                            <option value="tiktok">{t('source_tiktok')}</option>
                            <option value="google">{t('source_google')}</option>
                            <option value="club">{t('source_club')}</option>
                            <option value="other">{t('source_other')}</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="modal-goal" className="text-sm font-bold text-gray-700">{t('goal_label')}</label>
                          <textarea id="modal-goal" rows={3} placeholder={t('goal_placeholder')} {...register('goal')}
                            className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all resize-none font-medium" />
                        </div>
                      </div>
                    </div>

                    {apiError && (
                      <p className="text-rose-600 text-sm bg-rose-50 border border-rose-200 px-4 py-3 rounded-xl">{apiError}</p>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                      <button type="submit" disabled={isSubmitting}
                        className="w-full py-4 bg-[#002D62] text-white rounded-xl font-bold text-lg hover:bg-[#00A3C1] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
                        {isSubmitting ? t('submitting') : <>{t('submit_button')} <Send className="w-5 h-5" /></>}
                      </button>
                      <p className="text-center text-xs text-gray-500 pt-3">{t('privacy_note')}</p>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
