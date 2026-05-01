import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const t = await getTranslations('thank_you');

  const isContact = type === 'contact';
  const isRegistration = type === 'registration';

  const title = isContact
    ? t('contact_title')
    : isRegistration
      ? t('registration_title')
      : t('default_title');

  const desc = isContact
    ? t('contact_desc')
    : isRegistration
      ? t('registration_desc')
      : t('default_desc');

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F4F7F9] px-4 py-20">
      <div className="text-center max-w-lg mx-auto">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
        </div>

        <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#002D62] mb-4">
          {title}
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          {desc}
        </p>

        {isRegistration && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-10 text-left">
            <p className="font-bold text-[#002D62] text-sm mb-2">Bước tiếp theo:</p>
            <ol className="space-y-1.5 text-sm text-gray-600 list-decimal list-inside">
              <li>Tư vấn viên sẽ liên hệ để xác nhận thông tin</li>
              <li>Nhận hướng dẫn đóng học phí và chuẩn bị tài liệu</li>
              <li>Tham gia lớp học đúng lịch khai giảng</li>
            </ol>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#002D62] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#00A3C1] transition-colors w-full sm:w-auto justify-center shadow-lg"
          >
            <Home className="w-5 h-5" />
            {t('back_home')}
          </Link>
          <Link
            href="/courses"
            className="flex items-center gap-2 bg-white text-[#002D62] border border-gray-200 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
          >
            {t('explore_courses')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
