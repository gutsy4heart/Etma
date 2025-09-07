"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { ActiveDashboardWidget } from "@/features/pages/active/components/active-dashboard-widget";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <Button onClick={() => signOut()} className="bg-black text-white px-4 py-2 rounded-md">
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Items Widget */}
        <ActiveDashboardWidget />
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/dashboard/active">
              <Button variant="outline" className="w-full justify-start">
                Manage Active Items
              </Button>
            </Link>
            <Link href="/dashboard/reviews">
              <Button variant="outline" className="w-full justify-start">
                Manage Reviews
              </Button>
            </Link>
            <Link href="/dashboard/active">
              <Button className="w-full justify-start">
                Create New Active Item
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}