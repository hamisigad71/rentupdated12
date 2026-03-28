"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  ShieldCheck, 
  Bell, 
  Settings, 
  Camera, 
  Edit3, 
  Lock, 
  CreditCard,
  LogOut,
  ChevronRight,
  Check,
  Zap,
  Activity,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@nexusrent.com",
    phone: "+254 712 345 678",
    company: "Nexus Rent Corp",
    role: "Super Admin",
    joined: "January 2024"
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  return (
    <LandlordLayout>
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Profile Header */}
        <section className="relative overflow-hidden rounded-3xl bg-card p-6 md:p-8 border border-foreground/5 shadow-2xl">
          <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 blur-[150px] -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 h-32 w-32 bg-primary/5 blur-[150px] -ml-32 -mb-32" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="h-40 w-40 rounded-2xl bg-foreground/[0.03] border border-foreground/5 flex items-center justify-center text-2xl font-bold text-primary shadow-inner">
                AJ
              </div>
              <button className="absolute -bottom-2 -right-2 h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/30 border-4 border-card group-hover:scale-110 transition-all">
                <Camera className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="space-y-1">
                <Badge className="bg-primary/20 border-primary/30 text-primary border rounded-lg text-[9px] font-bold uppercase  px-3 h-6">System Executive</Badge>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-tight">{formData.name}</h1>
                <p className="text-sm font-bold text-muted-foreground/40 uppercase  flex items-center justify-center md:justify-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" /> {formData.role} • {formData.company}
                </p>
              </div>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                 <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground/[0.03] border border-foreground/5 text-xs font-bold uppercase  text-muted-foreground/60">
                    <Activity className="h-3 w-3 text-primary" /> System Node: ACTIVE
                 </div>
                 <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground/[0.03] border border-foreground/5 text-xs font-bold uppercase  text-muted-foreground/60">
                    <Zap className="h-3 w-3 text-brand-accent" /> Security Protocol: AES-256
                 </div>
              </div>
            </div>
            
            <Button 
               onClick={() => setIsEditing(!isEditing)}
               className={cn(
                 "h-14 px-8 rounded-2xl font-bold uppercase text-xs  transition-all shadow-xl",
                 isEditing ? "bg-white text-black hover:bg-white/90" : "bg-primary text-white shadow-primary/20 hover:shadow-primary/40"
               )}
            >
               {isEditing ? <><Check className="h-4 w-4 mr-2" /> Synchronize Data</> : <><Edit3 className="h-4 w-4 mr-2" /> Modify Profile</>}
            </Button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
           
           {/* Information Sections */}
           <div className="lg:col-span-8 space-y-10">
              
              {/* Personal Data */}
              <div className="glass p-6 rounded-3xl border border-foreground/5 shadow-xl space-y-10">
                 <div className="flex items-center gap-6">
                    <div className="h-14 w-1 flex rounded-full bg-primary" />
                    <div className="space-y-1">
                       <h3 className="text-2xl font-bold uppercase tracking-tight">Personal Matrix</h3>
                       <p className="text-xs font-bold text-muted-foreground/30 uppercase ">Core Information Synthesis</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2.5">
                       <label className="text-xs font-bold uppercase  text-muted-foreground/40 flex items-center gap-2">
                          <User className="h-3 w-3" /> Identity Label
                       </label>
                       <Input 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInput} 
                          disabled={!isEditing}
                          className="h-14 rounded-2xl bg-foreground/[0.02] border-foreground/5 text-sm font-bold disabled:opacity-80"
                       />
                    </div>
                    <div className="space-y-2.5">
                       <label className="text-xs font-bold uppercase  text-muted-foreground/40 flex items-center gap-2">
                          <Mail className="h-3 w-3" /> Digital Stream
                       </label>
                       <Input 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInput} 
                          disabled={!isEditing}
                          className="h-14 rounded-2xl bg-foreground/[0.02] border-foreground/5 text-sm font-bold disabled:opacity-80"
                       />
                    </div>
                    <div className="space-y-2.5">
                       <label className="text-xs font-bold uppercase  text-muted-foreground/40 flex items-center gap-2">
                          <Phone className="h-3 w-3" /> Mobile Vector
                       </label>
                       <Input 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInput} 
                          disabled={!isEditing}
                          className="h-14 rounded-2xl bg-foreground/[0.02] border-foreground/5 text-sm font-bold disabled:opacity-80"
                       />
                    </div>
                    <div className="space-y-2.5">
                       <label className="text-xs font-bold uppercase  text-muted-foreground/40 flex items-center gap-2">
                          <Building2 className="h-3 w-3" /> Enterprise Entity
                       </label>
                       <Input 
                          name="company" 
                          value={formData.company} 
                          onChange={handleInput} 
                          disabled={!isEditing}
                          className="h-14 rounded-2xl bg-foreground/[0.02] border-foreground/5 text-sm font-bold disabled:opacity-80"
                       />
                    </div>
                 </div>
              </div>

              {/* System Security */}
              <div className="glass p-6 rounded-3xl border border-foreground/5 shadow-xl space-y-10">
                 <div className="flex items-center gap-6">
                    <div className="h-14 w-1 flex rounded-full bg-brand-accent" />
                    <div className="space-y-1">
                       <h3 className="text-2xl font-bold uppercase tracking-tight">Security Shield</h3>
                       <p className="text-xs font-bold text-muted-foreground/30 uppercase ">Access & Authorization Protocol</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex items-center justify-between p-8 rounded-2xl bg-foreground/[0.015] border border-foreground/5 hover:border-primary/20 transition-all group cursor-pointer">
                       <div className="flex items-center gap-6">
                          <div className="h-14 w-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                             <Lock className="h-6 w-6" />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold uppercase leading-none mb-1">Passphrase Rotation</h4>
                             <p className="text-xs font-bold text-muted-foreground/40 uppercase  leading-none">Last sync: 14 days ago</p>
                          </div>
                       </div>
                       <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl border border-foreground/5 group-hover:bg-primary/5 group-hover:text-primary"><ChevronRight className="h-5 w-5" /></Button>
                    </div>

                    <div className="flex items-center justify-between p-8 rounded-2xl bg-foreground/[0.015] border border-foreground/5 hover:border-primary/20 transition-all group cursor-pointer">
                       <div className="flex items-center gap-6">
                          <div className="h-14 w-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                             <ShieldCheck className="h-6 w-6" />
                          </div>
                          <div>
                             <h4 className="text-sm font-bold uppercase leading-none mb-1">Multi-Node Authentication</h4>
                             <p className="text-xs font-bold text-muted-foreground/40 uppercase  leading-none">Status: REINFORCED</p>
                          </div>
                       </div>
                       <div className="h-6 w-12 rounded-full bg-primary/20 border border-primary/40 flex items-center px-1">
                          <div className="h-4 w-4 rounded-full bg-primary" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Sidebar Options (Right) */}
           <div className="lg:col-span-4 space-y-10">
              
              {/* Notification Center */}
              <div className="glass p-5 rounded-2xl border border-foreground/5 shadow-xl space-y-8">
                 <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-foreground/[0.03] border border-foreground/5 flex items-center justify-center text-muted-foreground/40">
                       <Bell className="h-7 w-7" strokeWidth={1} />
                    </div>
                    <div className="space-y-0.5">
                       <h4 className="text-xl font-bold uppercase tracking-tight">Signal Loop</h4>
                       <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">Notification Hierarchy</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    {[
                      { l: "Transactional Alerts", s: true },
                      { l: "Incident Sync", s: true },
                      { l: "Marketing Pulses", s: false },
                    ].map((opt, i) => (
                      <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-foreground/5 hover:bg-foreground/[0.01] transition-all">
                         <span className="text-xs font-bold uppercase  text-muted-foreground/60">{opt.l}</span>
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

              {/* Billing Info */}
              <div className="glass p-5 rounded-2xl border border-foreground/5 shadow-xl space-y-8">
                 <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-foreground/[0.03] border border-foreground/5 flex items-center justify-center text-muted-foreground/40">
                       <CreditCard className="h-7 w-7" strokeWidth={1} />
                    </div>
                    <div className="space-y-0.5">
                       <h4 className="text-xl font-bold uppercase tracking-tight">Subscription</h4>
                       <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">Service Level Agreement</p>
                    </div>
                 </div>

                 <div className="p-6 rounded-xl bg-foreground/[0.02] border border-foreground/5 space-y-3">
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-bold uppercase  text-primary">Plan: ENTERPRISE</span>
                       <Badge variant="outline" className="text-[8px] font-bold border-primary/20 text-primary uppercase">ACTIVE</Badge>
                    </div>
                    <p className="text-2xl font-bold tracking-tight leading-none">KSh 45,000 / mo</p>
                    <p className="text-[9px] font-bold text-muted-foreground/30 uppercase ">Next cycle: April 01</p>
                 </div>

                 <Button variant="ghost" className="w-full h-12 rounded-xl text-[9px] font-bold uppercase  text-muted-foreground hover:text-primary">
                    Access Billing Node <ArrowUpRight className="ml-2 h-4 w-4" />
                 </Button>
              </div>

              {/* Account Termination */}
              <div className="p-4 bg-destructive/5 rounded-2xl border border-destructive/10">
                 <Button variant="ghost" className="w-full h-14 rounded-2xl font-bold uppercase text-xs  text-destructive hover:bg-destructive hover:text-white transition-all">
                    <LogOut className="h-4 w-4 mr-2" /> Terminate Session
                 </Button>
              </div>
           </div>
        </div>

      </div>
    </LandlordLayout>
  );
}
