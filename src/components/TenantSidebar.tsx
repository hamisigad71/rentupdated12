"use client";

import * as React from "react";
import {
  Home,
  CreditCard,
  MessageSquare,
  FileText,
  User,
  Settings,
  HelpCircle,
  Zap,
  Bell,
} from "lucide-react";
import Logo from "./Logo";
import {
  Sidebar,

  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const mainItems = [
  { label: "Dashboard",   href: "/tenant",            icon: Home },
  { label: "Payments",    href: "/tenant/payments",   icon: CreditCard },
  { label: "Complaints",  href: "/tenant/complaints", icon: MessageSquare },
  { label: "Documents",   href: "/tenant/documents",  icon: FileText },
  { label: "Alerts",      href: "/tenant/alerts",     icon: Bell },
];

const footerItems = [
  { label: "Profile",    href: "/tenant/profile",    icon: User },
  { label: "Settings",   href: "/tenant/settings",   icon: Settings },
  { label: "Help Center", href: "/help",               icon: HelpCircle },
];

export function TenantSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="glass border-r border-foreground/5 shadow-2xl bg-background/50 backdrop-blur-xl">
      <SidebarHeader className="flex flex-row items-center justify-between p-4">
        <Logo variant="full" size="sm" className="group-data-[collapsible=icon]:hidden" />
        <Logo variant="icon" size="sm" className="hidden group-data-[collapsible=icon]:flex" />
        <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs uppercase font-bold tracking-[0.2em] text-muted-foreground/40 group-data-[collapsible=icon]:hidden">Resident Hub</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={
                      <Link href={item.href}>
                        <item.icon className={pathname === item.href ? "text-primary h-5 w-5" : "text-muted-foreground/40 h-5 w-5"} />
                        <span className="font-bold group-data-[collapsible=icon]:hidden uppercase text-xs ">{item.label}</span>
                      </Link>
                    }
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="h-12 px-4 rounded-xl transition-all duration-300 hover:bg-primary/5 active:scale-95"
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-4">
        <SidebarMenu className="px-2 space-y-1">
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                render={
                  <Link href={item.href}>
                    <item.icon className="text-muted-foreground/40 h-5 w-5" />
                    <span className="text-xs font-bold group-data-[collapsible=icon]:hidden uppercase ">{item.label}</span>
                  </Link>
                }
                isActive={pathname === item.href}
                tooltip={item.label}
                className="h-10 px-4 rounded-xl transition-all duration-300 hover:bg-primary/5"
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="group-data-[collapsible=icon]:hidden">
          <Button className="w-full gap-2 rounded-xl h-12 bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all font-bold uppercase text-xs ">
            <Zap className="h-4 w-4" />
            <span>Fast Pay Rent</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
