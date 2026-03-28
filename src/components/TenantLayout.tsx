"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TenantSidebar } from "./TenantSidebar";
import Navbar from "./Navbar";
import BottomNav, { NavItem } from "./BottomNav";
import { Home, CreditCard, MessageSquare, FileText, User } from "lucide-react";

const tenantItems: NavItem[] = [
  { label: "Home", href: "/tenant", icon: <Home size={20} /> },
  { label: "Payments", href: "/tenant/payments", icon: <CreditCard size={20} /> },
  { label: "Alerts", href: "/tenant/complaints", icon: <MessageSquare size={20} /> },
  { label: "Files", href: "/tenant/documents", icon: <FileText size={20} /> },
  { label: "Profile", href: "/tenant/profile", icon: <User size={20} /> },
];

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full bg-background overflow-hidden relative">
        <TenantSidebar />
        <SidebarInset className="flex flex-col flex-1 w-full overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-auto bg-background p-0 no-scrollbar relative mb-20 md:mb-0">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/2 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/2 blur-[100px] rounded-full -ml-48 -mb-48 pointer-events-none" />
             {children}
          </main>
          <BottomNav items={tenantItems} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
