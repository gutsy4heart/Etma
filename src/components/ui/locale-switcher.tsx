"use client";

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const locales = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('navigation');

  const switchLocale = (newLocale: string) => {
    // Удаляем текущую локаль из пути
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    // Добавляем новую локаль
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  const currentLocale = locales.find(l => l.code === locale);

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <div className="flex gap-1">
        {locales.map((loc) => (
          <Button
            key={loc.code}
            variant={locale === loc.code ? "default" : "ghost"}
            size="sm"
            onClick={() => switchLocale(loc.code)}
            className="flex items-center gap-1 px-2 py-1 text-xs"
          >
            <span>{loc.flag}</span>
            <span className="hidden sm:inline">{loc.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
