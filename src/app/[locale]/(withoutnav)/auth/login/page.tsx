"use client"

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";
import Link from "next/link";
import { useTranslations } from 'next-intl';

interface LoginPageProps {
  params: { locale: string };
}

export default function Login({ params: { locale } }: LoginPageProps) {
  const { data: session, status } = useSession();
  const t = useTranslations('auth.signIn');

  if (status === "loading") {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('welcome', { name: session.user?.name })}</h1>
          <p className="text-lg mb-6">{t('successfullyRegistered')}</p>
          <Button asChild className="w-full">
            <Link href={`/${locale}`}>{t('goToHome')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-col gap-6 w-full max-w-md text-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <Button 
            onClick={() => signIn("github")} 
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            <Github className="mr-2 h-5 w-5" />
            {t('githubButton')}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">{t('or')}</span>
            </div>
          </div>
          
          <Button variant="outline" asChild className="w-full">
            <Link href={`/${locale}/auth/register`}>{t('dontHaveAccount')} {t('signUp')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
