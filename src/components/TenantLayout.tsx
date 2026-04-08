"use client";

import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TenantSidebar } from "./TenantSidebar";
import { Separator } from "@/components/ui/separator";
import BottomNav, { NavItem } from "./BottomNav";
import { Home, CreditCard, MessageSquare, FileText, User } from "lucide-react";

const tenantItems: NavItem[] = [
  { label: "Home", href: "/tenant", icon: <Home size={20} /> },
  {
    label: "Payments",
    href: "/tenant/payments",
    icon: <CreditCard size={20} />,
  },
  {
    label: "Alerts",
    href: "/tenant/complaints",
    icon: <MessageSquare size={20} />,
  },
  { label: "Files", href: "/tenant/documents", icon: <FileText size={20} /> },
  { label: "Profile", href: "/tenant/profile", icon: <User size={20} /> },
];

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full bg-background overflow-hidden relative">
        <TenantSidebar />
        <SidebarInset className="flex flex-col flex-1 w-full overflow-hidden">
          <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black tracking-tighter text-foreground">
                    NEXUS
                  </span>
                  <span className="text-sm font-black tracking-tighter text-primary">
                    TENANT
                  </span>
                </div>
                <span className="text-[10px] uppercase text-muted-foreground/40 leading-none">
                  Resident Portal
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm text-foreground">
                  Sarah Mitchell
                </span>
                <span className="text-xs uppercase text-primary/80 leading-none">
                  Premium Tenant
                </span>
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-primary/20 bg-muted/50 p-0.5 shadow-inner">
                <div className="h-full w-full rounded-full bg-linear-to-br from-primary/10 to-primary/30 flex items-center justify-center text-primary">
                  SM
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-background px-0.5 sm:px-4 no-scrollbar relative mb-20 md:mb-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/2 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none hidden md:block" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/2 blur-[100px] rounded-full -ml-48 -mb-48 pointer-events-none hidden md:block" />
            {children}
          </main>
          <BottomNav items={tenantItems} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
