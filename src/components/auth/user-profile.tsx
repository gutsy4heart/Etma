"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export function UserProfile() {
  const { user, signOut, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
        <span>Loading...</span>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4" />
        <span className="font-medium">{user.name || user.email}</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => signOut()}
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </div>
  )
}
