import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/ui/locale-switcher';

interface HomePageProps {
  params: { locale: string };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ETMA</h1>
          <LocaleSwitcher />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to ETMA</h2>
          <p className="text-lg text-gray-600 mb-8">
            Your internationalized Next.js application
          </p>
          
          <div className="flex gap-4 justify-center">
            <a 
              href={`/${locale}/auth/login`}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </a>
            <a 
              href={`/${locale}/auth/register`}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Sign Up
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
