"use client"

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome, {session.user?.name}!</h1>
          <p className="text-lg mb-6">You are successfully logged in.</p>
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <Button 
              onClick={() => signOut()} 
              variant="outline"
              className="w-full"
            >
              Sign Out
            </Button>
            <Button asChild className="w-full">
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-col gap-6 w-full max-w-md text-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <Button 
            onClick={() => signIn("github")} 
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            <Github className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>
          
          <Button variant="outline" asChild className="w-full">
            <Link href="/auth/register">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}