"use client";

import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import Logo from "./Logo";
import { Navbar } from "./Navbar";
import { Separator } from "@/components/ui/separator";
import BottomNav, { NavItem } from "./BottomNav";
import { Home, Building2, Users, BarChart2, User } from "lucide-react";

const landlordItems: NavItem[] = [
  { label: "Home", href: "/landlord", icon: <Home size={20} /> },
  { label: "Properties", href: "/landlord/buildings", icon: <Building2 size={20} /> },
  { label: "Tenants", href: "/landlord/tenants", icon: <Users size={20} /> },
  { label: "Analysis", href: "/landlord/reports", icon: <BarChart2 size={20} /> },
  { label: "Profile", href: "/landlord/profile", icon: <User size={20} /> },
];

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full bg-background/50">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between gap-2 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2">
               <SidebarTrigger className="-ml-1" />
               <Separator orientation="vertical" className="mr-2 h-4" />
               <div className="flex flex-col">
                 <div className="flex items-baseline gap-1">
                   <span className="text-sm font-black tracking-tighter text-foreground">NEXUS</span>
                   <span className="text-sm font-black tracking-tighter text-primary">LANDLORD</span>
                 </div>
                 <span className="text-[10px] uppercase font-bold text-muted-foreground/40 leading-none">Management Suite</span>
               </div>
             </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-bold text-foreground">Alex Johnson</span>
                <span className="text-xs uppercase font-bold  text-primary/80 leading-none underline decoration-primary/30 underline-offset-4">Super Admin</span>
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-primary/20 bg-muted/50 p-0.5 shadow-inner">
                <div className="h-full w-full rounded-full bg-linear-to-br from-primary/10 to-primary/30 flex items-center justify-center font-bold text-primary">AJ</div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto px-0.5 py-6 sm:p-6 md:p-8 lg:p-5 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-28 md:pb-8">
            {children}
          </main>
          <BottomNav items={landlordItems} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
