"use client";

import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TenantSidebar } from "./TenantSidebar";
import { Separator } from "@/components/ui/separator";
import BottomNav, { NavItem } from "./BottomNav";
import { CreditCard, MessageSquare, FileText, User, Camera } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const CustomHomeIcon = () => (
  <div 
    className="bg-current"
    style={{
      width: 20,
      height: 20,
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


const CustomMoneyIcon = () => (
  <div 
    className="bg-current"
    style={{
      width: 20,
      height: 20,
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

const CustomChatIcon = () => (
  <div 
    className="bg-current"
    style={{
      width: 20,
      height: 20,
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

const CustomDocumentIcon = () => (
  <div 
    className="bg-current"
    style={{
      width: 20,
      height: 20,
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

const CustomUserIcon = () => (
  <div 
    className="bg-current"
    style={{
      width: 20,
      height: 20,
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

const tenantItems: NavItem[] = [
  { label: "Home", href: "/tenant", icon: <CustomHomeIcon /> },
  {
    label: "Payments",
    href: "/tenant/payments",
    icon: <CustomMoneyIcon />,
  },
  {
    label: "Alerts",
    href: "/tenant/complaints",
    icon: <CustomChatIcon />,
  },
  { label: "Files", href: "/tenant/documents", icon: <CustomDocumentIcon /> },
  { label: "Profile", href: "/tenant/profile", icon: <CustomUserIcon /> },
];

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div className="flex h-[100dvh] w-full bg-background overflow-hidden relative">
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
          <main id="main-scroll-container" className="flex-1 overflow-auto bg-background px-[4px] sm:px-4 no-scrollbar relative mb-20 md:mb-0">
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
