"use client";

import React from "react";
import LandlordLayout from "@/components/LandlordLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Shield, 
  Bell, 
  Paintbrush, 
  Database, 
  Globe, 
  Lock, 
  ChevronRight,
  Zap,
  Activity,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  return (
    <LandlordLayout>
      <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <Badge variant="outline" className="rounded-xl border-primary/20 bg-primary/5 text-primary uppercase text-xs px-3 py-1 mb-2">
              System Configuration
            </Badge>
            <h1 className="text-xl md:text-2xl tracking-tight leading-none uppercase">
              Global <span className="text-primary ">Settings</span>
            </h1>
            <p className="text-sm text-muted-foreground/30 uppercase tracking-tight">
              Enterprise resource & protocol management center
            </p>
          </div>
          
          <Button className="h-12 rounded-xl px-6 bg-[#0F0F0F] text-white shadow-xl hover:bg-primary transition-all uppercase text-xs group">
             <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-700" /> Reset to Defaults
          </Button>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
           {/* Security Node */}
           <div className="glass p-5 rounded-2xl border border-foreground/5 shadow-xl space-y-8">
              <div className="flex items-center gap-5">
                 <div className="h-14 w-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <Shield className="h-7 w-7" strokeWidth={1.5} />
                 </div>
                 <div className="space-y-0.5">
                    <h4 className="text-xl uppercase tracking-tight">Security Shield</h4>
                    <p className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.2em]">Access Control Protocols</p>
                 </div>
              </div>

              <div className="space-y-4">
                 {[
                   { l: "Two-Factor Auth", s: true },
                   { l: "Biometric Link", s: false },
                   { l: "API Shielding", s: true },
                 ].map((opt, i) => (
                   <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-foreground/5 hover:bg-foreground/1 transition-all group cursor-pointer">
                      <span className="text-xs uppercase text-muted-foreground/60">{opt.l}</span>
                      <div className={cn(
                        "h-6 w-12 rounded-full flex items-center px-1 transition-all",
                        opt.s ? "bg-primary/20 border border-primary/40" : "bg-foreground/5 border border-foreground/10"
                      )}>
                         <div className={cn("h-4 w-4 rounded-full transition-all", opt.s ? "bg-primary ml-auto" : "bg-muted-foreground/30")} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Pulse Center */}
           <div className="glass p-5 rounded-2xl border border-foreground/5 shadow-xl space-y-8">
              <div className="flex items-center gap-5">
                 <div className="h-14 w-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <Bell className="h-7 w-7" strokeWidth={1.5} />
                 </div>
                 <div className="space-y-0.5">
                    <h4 className="text-xl uppercase tracking-tight">Pulse Center</h4>
                    <p className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.2em]">Signal & Notification Flow</p>
                 </div>
              </div>

              <div className="space-y-4">
                 {[
                   { l: "Desktop Pushes", s: true },
                   { l: "Email Digests", s: true },
                   { l: "Mobile Pings", s: true },
                 ].map((opt, i) => (
                   <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-foreground/5 hover:bg-foreground/1 transition-all group cursor-pointer">
                      <span className="text-xs uppercase text-muted-foreground/60">{opt.l}</span>
                      <div className={cn(
                        "h-6 w-12 rounded-full flex items-center px-1 transition-all",
                        opt.s ? "bg-primary/20 border border-primary/40" : "bg-foreground/5 border border-foreground/10"
                      )}>
                         <div className={cn("h-4 w-4 rounded-full transition-all", opt.s ? "bg-primary ml-auto" : "bg-muted-foreground/30")} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Visual Identity */}
           <div className="glass p-5 rounded-2xl border border-foreground/5 shadow-xl space-y-8">
              <div className="flex items-center gap-5">
                 <div className="h-14 w-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <Paintbrush className="h-7 w-7" strokeWidth={1.5} />
                 </div>
                 <div className="space-y-0.5">
                    <h4 className="text-xl uppercase tracking-tight">Interface Style</h4>
                    <p className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.2em]">Visual Environment Config</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 {[
                   { l: "Deep Onyx", active: true, color: "bg-[#0F0F0F]" },
                   { l: "Arctic Frost", active: false, color: "bg-slate-50" },
                   { l: "Primary Moss", active: false, color: "bg-primary" },
                   { l: "System Default", active: false, color: "bg-muted" },
                 ].map((t, i) => (
                   <button key={i} className={cn(
                     "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all gap-4",
                     t.active ? "border-primary bg-primary/5" : "border-foreground/5 bg-foreground/2 hover:border-primary/20"
                   )}>
                      <div className={cn("h-10 w-10 rounded-full shadow-xl", t.color)} />
                      <span className="text-[9px] uppercase opacity-60">{t.l}</span>
                   </button>
                 ))}
              </div>
           </div>

           {/* Data Management */}
           <div className="glass p-5 rounded-2xl border border-foreground/5 shadow-xl space-y-8">
              <div className="flex items-center gap-5">
                 <div className="h-14 w-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <Database className="h-7 w-7" strokeWidth={1.5} />
                 </div>
                 <div className="space-y-0.5">
                    <h4 className="text-xl uppercase tracking-tight">Storage Node</h4>
                    <p className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.2em]">Ledger & Asset Archival</p>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="p-6 rounded-2xl bg-foreground/2 border border-foreground/5 space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-xs uppercase text-muted-foreground/40">In-Memory Cache</span>
                       <span className="text-xs text-primary">94.2 MB Cached</span>
                    </div>
                    <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                       <div className="h-full w-[40%] bg-primary rounded-full" />
                    </div>
                 </div>
                 
                 <Button variant="outline" className="w-full h-12 rounded-xl text-[9px] uppercase border-foreground/5 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20 transition-all">
                    Purge Transactional Cache
                 </Button>
              </div>
           </div>
        </div>

        {/* Global Action Footer */}
        <div className="p-5 rounded-3xl bg-[#0F0F0F] text-white border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
           <div className="absolute top-0 left-0 h-32 w-32 bg-primary/10 blur-[80px] -ml-16 -mt-16" />
           <div className="relative z-10 flex items-center gap-6">
              <div className="h-12 w-12 rounded-[1.8rem] bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-2xl">
                 <Zap className="h-8 w-8" />
              </div>
              <div>
                 <h4 className="text-xl uppercase tracking-tight">Synchronize Protocol</h4>
                 <p className="text-xs text-white/20 uppercase tracking-[0.4em]">Apply global configuration changes</p>
              </div>
           </div>
           
           <div className="flex items-center gap-4 relative z-10">
              <Button variant="ghost" className="h-14 px-8 rounded-2xl text-white/40 hover:text-white uppercase text-xs ">Discard Changes</Button>
              <Button className="h-14 px-10 rounded-2xl bg-primary text-white shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all uppercase text-xs ">Write To Hardware <ChevronRight className="ml-2 h-4 w-4" /></Button>
           </div>
        </div>

      </div>
    </LandlordLayout>
  );
}
