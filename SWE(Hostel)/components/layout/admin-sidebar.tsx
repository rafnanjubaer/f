"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  BedDouble,
  Wallet,
  UtensilsCrossed,
  AlertCircle,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { mockComplaints } from "@/lib/mock-data";
import { ComplaintStatus } from "@/lib/types";

const pendingComplaintsCount = mockComplaints.filter(
  (c) => c.status === ComplaintStatus.PENDING
).length;

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Users & Roles",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Rooms",
    href: "/admin/rooms",
    icon: BedDouble,
  },
  {
    title: "Financials",
    href: "/admin/financials",
    icon: Wallet,
  },
  {
    title: "Meal Setup",
    href: "/admin/meals",
    icon: UtensilsCrossed,
  },
  {
    title: "Complaints",
    href: "/admin/complaints",
    icon: AlertCircle,
    badge: pendingComplaintsCount > 0 ? pendingComplaintsCount : undefined,
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 border-r bg-sidebar transition-transform md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Admin Portal</span>
          </Link>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="flex flex-col gap-1 p-4">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                  asChild
                  onClick={onClose}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    {item.title}
                    {item.badge && (
                      <Badge variant="destructive" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}
