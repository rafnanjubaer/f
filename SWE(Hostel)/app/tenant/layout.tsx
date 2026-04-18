"use client";

import { useState } from "react";
import { TenantSidebar } from "@/components/layout/tenant-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { currentUser } from "@/lib/mock-data";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <TenantSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <AppHeader user={currentUser} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
