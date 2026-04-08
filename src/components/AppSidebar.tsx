"use client";

import * as React from "react";
import {
  Home,
  Building2,
  Users,
  CreditCard,
  AlertCircle,
  BarChart3,
  User,
  Settings,
  HelpCircle,
  Plus,
  LogOut,
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
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const mainItems = [
  { label: "Dashboard",  href: "/landlord",            icon: Home },
  { label: "Buildings",  href: "/landlord/buildings",  icon: Building2 },
  { label: "Units",      href: "/landlord/units",      icon: Building2 },
  { label: "Tenants",    href: "/landlord/tenants",    icon: Users },
  { label: "Payments",   href: "/landlord/payments",   icon: CreditCard },
  { label: "Complaints", href: "/landlord/complaints", icon: AlertCircle },
  { label: "Reports",    href: "/landlord/reports",    icon: BarChart3 },
];

const footerItems = [
  { label: "Profile",    href: "/landlord/profile",    icon: User },
  { label: "Settings",   href: "/landlord/settings",   icon: Settings },
  { label: "Help",       href: "/help",               icon: HelpCircle },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here (clear tokens, etc.)
    router.push("/auth/login");
  };

  return (
    <Sidebar collapsible="icon" className="glass border-r border-foreground/5 shadow-2xl">
      <SidebarHeader className="flex flex-row items-center justify-between p-4">
        <Logo variant="full" size="sm" className="group-data-[collapsible=icon]:hidden" />
        <Logo variant="icon" size="sm" className="hidden group-data-[collapsible=icon]:flex" />
        <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs uppercase text-muted-foreground/60 group-data-[collapsible=icon]:hidden">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={
                      <Link href={item.href}>
                        <item.icon className={pathname === item.href ? "text-primary h-5 w-5" : "text-muted-foreground h-5 w-5"} />
                        <span className="font-normal group-data-[collapsible=icon]:hidden">{item.label}</span>
                      </Link>
                    }
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="h-11 px-4 rounded-xl transition-all duration-300 hover:bg-primary/5 active:scale-95"
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
                    <item.icon className="text-muted-foreground h-5 w-5" />
                    <span className="text-sm font-normal group-data-[collapsible=icon]:hidden">{item.label}</span>
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
          <Button className="w-full gap-2 rounded-xl h-11 bg-[#1B5E45] text-white shadow-lg shadow-[#1B5E45]/20 hover:bg-[#246B4F] hover:shadow-xl active:scale-95 transition-all">
            <Plus className="h-4 w-4" />
            <span>New Quick Action</span>
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
