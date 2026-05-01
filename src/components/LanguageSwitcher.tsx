'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full border border-gray-200 shadow-sm">
      <button
        onClick={() => onSelectChange('vi')}
        disabled={isPending || locale === 'vi'}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          locale === 'vi' 
            ? 'bg-white text-[#00A3C1] shadow-sm' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        VI
      </button>
      <button
        onClick={() => onSelectChange('en')}
        disabled={isPending || locale === 'en'}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          locale === 'en' 
            ? 'bg-white text-[#00A3C1] shadow-sm' 
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        EN
      </button>
    </div>
  );
}
