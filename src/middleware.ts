import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  // Список поддерживаемых локалей
  locales,
  
  // Локаль по умолчанию
  defaultLocale: 'ru',
  
  // Стратегия локализации
  localeDetection: true,
  
  // Префикс локали в URL (false = /en/about, true = /about)
  localePrefix: 'as-needed'
});

export const config = {
  // Применять middleware только к определенным путям
  matcher: [
    // Исключить API routes, _next, _vercel, статические файлы
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
