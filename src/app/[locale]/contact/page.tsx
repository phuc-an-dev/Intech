'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Building2 } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên (ít nhất 2 ký tự)'),
  phone: z.string().regex(/^0[3-9]\d{8}$/, 'Số điện thoại không hợp lệ (VD: 0912345678)'),
  email: z.string().email('Email không hợp lệ'),
  interest: z.string().optional(),
  message: z.string().min(10, 'Vui lòng nhập nội dung (ít nhất 10 ký tự)'),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const t = useTranslations('contact');
  const router = useRouter();
  const [apiError, setApiError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setApiError('');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push('/thank-you?type=contact' as never);
    } else {
      const json = await res.json().catch(() => ({}));
      setApiError(json.error ?? 'Gửi thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="w-full bg-[#F4F7F9] min-h-screen pb-24 relative overflow-hidden z-0">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#002D62 1.5px, transparent 1.5px)', backgroundSize: '32px 32px', opacity: 0.15 }}></div>
      <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-[#002D62]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-[-5%] w-[600px] h-[600px] bg-[#00A3C1]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <section className="bg-[#002D62] text-white py-20 md:py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-50%] right-[-10%] w-3/4 h-[200%] bg-[#00A3C1] opacity-20 blur-3xl transform rotate-45"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t('title')}</h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">{t('subtitle')}</p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-[-60px] md:mt-[-80px] relative z-20">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#00A3C1]/20 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-[#002D62]/15 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden flex flex-col md:flex-row relative z-10">

          {/* Left: Contact Info */}
          <div className="w-full md:w-2/5 bg-[#00A3C1] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-50 blur-2xl pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-bold mb-8">{t('info_title')}</h2>
              <div className="space-y-8">
                {[
                  { icon: <Mail className="w-6 h-6 text-white" />, label: t('email_label'), value: 'support@intechisc.com' },
                  { icon: <Phone className="w-6 h-6 text-white" />, label: t('phone_label'), value: '1900 xxxx' },
                  { icon: <MapPin className="w-6 h-6 text-white" />, label: t('office_label'), value: t('office_address') },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm shadow-sm">{item.icon}</div>
                    <div>
                      <p className="text-white/80 text-xs mb-1 uppercase tracking-wider font-bold">{item.label}</p>
                      <p className="text-lg font-bold leading-snug">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-white/20 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-5 h-5" />
                <span className="font-bold">{t('company_name')}</span>
              </div>
              <p className="text-white/80 text-sm font-medium">{t('tax_code')}</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full md:w-3/5 p-10 md:p-14 bg-white">
            <h2 className="font-heading text-3xl font-bold text-[#002D62] mb-2">{t('form_title')}</h2>
            <p className="text-gray-500 mb-8 font-medium">{t('form_subtitle')}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-bold text-gray-700">{t('name_label')} <span className="text-rose-500">*</span></label>
                  <input id="name" type="text" placeholder={t('name_placeholder')} {...register('name')}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                  {errors.name && <p className="text-rose-500 text-xs">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-sm font-bold text-gray-700">{t('phone_label')} <span className="text-rose-500">*</span></label>
                  <input id="phone" type="tel" placeholder={t('phone_placeholder')} {...register('phone')}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                  {errors.phone && <p className="text-rose-500 text-xs">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-bold text-gray-700">{t('email_label')} <span className="text-rose-500">*</span></label>
                <input id="email" type="email" placeholder={t('email_placeholder')} {...register('email')}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium" />
                {errors.email && <p className="text-rose-500 text-xs">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="interest" className="text-sm font-bold text-gray-700">{t('interest_label')}</label>
                <select id="interest" {...register('interest')}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all font-medium text-gray-700">
                  <option value="">{t('interest_placeholder')}</option>
                  <option value="course">{t('interest_course')}</option>
                  <option value="corporate">{t('interest_corporate')}</option>
                  <option value="mobility">{t('interest_mobility')}</option>
                  <option value="other">{t('interest_other')}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-bold text-gray-700">{t('message_label')} <span className="text-rose-500">*</span></label>
                <textarea id="message" rows={4} placeholder={t('message_placeholder')} {...register('message')}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#F4F7F9] border border-transparent focus:bg-white focus:border-[#00A3C1] focus:ring-2 focus:ring-[#00A3C1]/20 outline-none transition-all resize-none font-medium" />
                {errors.message && <p className="text-rose-500 text-xs">{errors.message.message}</p>}
              </div>

              {apiError && (
                <p className="text-rose-600 text-sm bg-rose-50 border border-rose-200 px-4 py-3 rounded-xl">{apiError}</p>
              )}

              <button type="submit" disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 bg-[#002D62] text-white rounded-xl font-bold text-lg hover:bg-[#00A3C1] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
                {isSubmitting ? t('submitting') : <>{t('submit_button')} <Send className="w-5 h-5" /></>}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
