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
  LogOut,
} from "lucide-react";
import Logo from "./Logo";

const CustomHomeIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url(/home.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/home.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomMoneyIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url("/money (3).png")', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url("/money (3).png")', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomChatIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url("/chat.png")', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url("/chat.png")', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomDocumentIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url(/document.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/document.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomUserIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url(/user.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/user.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

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
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


const CustomNotificationIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url("/bell.png")', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url("/bell.png")', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const mainItems = [
  { label: "Dashboard",   href: "/tenant",            icon: CustomHomeIcon },
  { label: "Payments",    href: "/tenant/payments",   icon: CustomMoneyIcon },
  { label: "Complaints",  href: "/tenant/complaints", icon: CustomChatIcon },
  { label: "Documents",   href: "/tenant/documents",  icon: CustomDocumentIcon },
  { label: "Alerts",      href: "/tenant/alerts",     icon: CustomNotificationIcon },
];

const footerItems = [
  { label: "Profile",    href: "/tenant/profile",    icon: CustomUserIcon },
  { label: "Settings",   href: "/tenant/settings",   icon: Settings },
  { label: "Help Center", href: "/help",               icon: HelpCircle },
];

export function TenantSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here (clear tokens, etc.)
    router.push("/auth/login");
  };

  return (
    <Sidebar collapsible="icon" className="glass border-r border-foreground/5 shadow-2xl bg-background/50 backdrop-blur-xl">
      <SidebarHeader className="flex flex-row items-center justify-between p-4">
        <Logo variant="full" size="sm" className="group-data-[collapsible=icon]:hidden" />
        <Logo variant="icon" size="sm" className="hidden group-data-[collapsible=icon]:flex" />
        <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs uppercase tracking-[0.2em] text-muted-foreground/40 group-data-[collapsible=icon]:hidden">Resident Hub</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={
                      <Link href={item.href}>
                        <item.icon className={pathname === item.href ? "text-[#1B5E45] h-5 w-5" : "text-[#1B5E45]/50 h-5 w-5"} />
                        <span className="font-normal group-data-[collapsible=icon]:hidden text-[13px]">{item.label}</span>
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
                    <item.icon className={pathname === item.href ? "text-[#1B5E45] h-5 w-5" : "text-[#1B5E45]/50 h-5 w-5"} />
                    <span className="text-[13px] font-normal group-data-[collapsible=icon]:hidden ">{item.label}</span>
                  </Link>
                }
                isActive={pathname === item.href}
                tooltip={item.label}
                className="h-10 px-4 rounded-xl transition-all duration-300 hover:bg-primary/5"
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="group-data-[collapsible=icon]:hidden space-y-2">
          <Button className="w-full gap-2 rounded-xl h-11 bg-[#1B5E45] text-white shadow-lg shadow-[#1B5E45]/20 hover:bg-[#246B4F] hover:shadow-xl active:scale-95 transition-all text-sm">
            <Zap className="h-4 w-4" />
            <span>Fast Pay Rent</span>
          </Button>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full gap-2 rounded-xl h-11 text-rose-600 hover:text-rose-700 hover:bg-rose-50 active:scale-95 transition-all justify-start px-4"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>

        {/* Icon-only Logout for collapsed state */}
        <div className="hidden group-data-[collapsible=icon]:flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-10 w-10 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-all"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
