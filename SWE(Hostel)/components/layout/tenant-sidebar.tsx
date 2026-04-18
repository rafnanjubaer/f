"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BedDouble,
  CreditCard,
  UtensilsCrossed,
  MessageSquare,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const tenantNavItems = [
  {
    title: "Dashboard",
    href: "/tenant",
    icon: Home,
  },
  {
    title: "Room & Rent",
    href: "/tenant/room",
    icon: BedDouble,
  },
  {
    title: "Payments",
    href: "/tenant/payments",
    icon: CreditCard,
  },
  {
    title: "Meals",
    href: "/tenant/meals",
    icon: UtensilsCrossed,
  },
  {
    title: "Community",
    href: "/tenant/community",
    icon: MessageSquare,
  },
];

interface TenantSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function TenantSidebar({ isOpen, onClose }: TenantSidebarProps) {
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
          <Link href="/tenant" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Smart Hostel</span>
          </Link>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="flex flex-col gap-1 p-4">
            {tenantNavItems.map((item) => {
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
