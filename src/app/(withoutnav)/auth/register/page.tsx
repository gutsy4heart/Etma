"use client"

import { useSession } from "next-auth/react";
import { SignUpForm } from "@/components/auth/signup-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Register() {
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
          <p className="text-lg mb-6">You are successfully registered and logged in.</p>
          <Button asChild className="w-full">
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto h-screen flex items-center justify-center p-4">
      <SignUpForm />
    </div>
  );
}