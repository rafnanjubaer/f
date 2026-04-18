"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { mockUsers } from "@/lib/mock-data";
import { UserRole } from "@/lib/types";

// Get admin user for demo
const adminUser = mockUsers.find((u) => u.role === UserRole.ADMIN)!;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <AppHeader user={adminUser} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
