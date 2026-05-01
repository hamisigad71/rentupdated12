"use client";

import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import Logo from "./Logo";
import { Navbar } from "./Navbar";
import { Separator } from "@/components/ui/separator";
import BottomNav, { NavItem } from "./BottomNav";
import { Building2, Users, BarChart2, User, Camera, Home } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const landlordItems: NavItem[] = [
  { label: "Home", href: "/landlord", icon: <Home /> },
  { label: "Properties", href: "/landlord/buildings", icon: <Building2 /> },
  { label: "Tenants", href: "/landlord/tenants", icon: <Users /> },
  { label: "Analysis", href: "/landlord/reports", icon: <BarChart2 /> },
  { label: "Profile", href: "/landlord/profile", icon: <User /> },
];

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  const { profileImage, updateProfileImage } = useAuth();
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-[100dvh] w-full bg-background/50 overflow-hidden relative">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 w-full overflow-hidden">
          <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2">
               <SidebarTrigger className="-ml-1" />
               <Separator orientation="vertical" className="mr-2 h-4" />
               <div className="flex flex-col">
                 <div className="flex items-baseline gap-1">
                   <span className="text-sm font-black tracking-tighter text-foreground">NEXUS</span>
                   <span className="text-sm font-black tracking-tighter text-primary">LANDLORD</span>
                 </div>
                 <span className="text-[10px] uppercase text-muted-foreground/40 leading-none">Management Suite</span>
               </div>
             </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm text-foreground">Alex Johnson</span>
                <span className="text-xs uppercase text-primary/80 leading-none">Super Admin</span>
              </div>
              <label className="h-10 w-10 rounded-full border-2 border-primary/20 bg-muted/50 p-0.5 shadow-inner cursor-pointer relative group overflow-hidden block">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <div className="h-full w-full rounded-full bg-linear-to-br from-primary/10 to-primary/30 flex items-center justify-center text-primary overflow-hidden relative">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 group-hover:opacity-0 transition-opacity" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                </div>
              </label>
            </div>
          </header>
          <main id="main-scroll-container" className="flex-1 overflow-auto px-0 pt-0 pb-28 md:pb-8">
            {children}
          </main>
          <BottomNav items={landlordItems} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
