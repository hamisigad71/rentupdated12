"use client";

import React, { useState, useRef } from "react";
import TenantLayout from "@/components/TenantLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  X,
  Calendar,
  Wifi,
  Droplets,
  Zap,
  Shield,
  MoreHorizontal,
  Activity,
  TrendingUp,
  FileText,
  ArrowLeft,
  Filter,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { mockComplaints, mockTenants } from "@/data/mockData";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- Icons -----------------------------------------------------------------


// --- Reveal Animation ------------------------------------------------------
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function OverviewCard({
  label,
  value,
  trend,
  subtext,
  isNegative = false,
  icon: Icon,
  variant = "default",
}: {
  label: string;
  value: React.ReactNode;
  trend?: string;
  subtext?: string;
  isNegative?: boolean;
  icon?: React.ElementType;
  variant?: "default" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <Card 
      className={cn(
        "relative rounded-[24px] overflow-hidden h-full flex flex-col justify-between transition-all duration-300 hover:shadow-md group min-h-[140px] sm:min-h-[160px]",
        isDark 
          ? "bg-gradient-to-br from-[#0c4a34] to-[#062b1e] border-transparent shadow-xl shadow-[#062b1e]/20" 
          : "bg-white border-black/[0.04] shadow-sm hover:border-black/[0.08]"
      )}
    >
      {/* Optional Sparkline Decor for Dark Card */}
      {isDark && (
        <div className="absolute bottom-10 left-0 right-0 h-10 sm:h-12 pointer-events-none opacity-40">
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-emerald-400 fill-none" strokeWidth="0.5">
            <path d="M0 20 Q 20 18, 30 15 T 60 10 T 100 5" />
          </svg>
        </div>
      )}
      
      <CardContent className="p-3.5 sm:p-5 flex flex-col justify-between h-full relative z-10 w-full">
        {/* Top Row: Label & Icon */}
        <div className="flex items-start justify-between mb-2 sm:mb-4">
          <p className={cn(
            "text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest mt-0.5 sm:mt-1 pr-2 leading-snug",
            isDark ? "text-white/60" : "text-muted-foreground/70"
          )}>
            {label}
          </p>
          {Icon && (
            <div className={cn(
               "h-7 w-7 sm:h-9 sm:w-9 rounded-xl sm:rounded-[14px] flex items-center justify-center shrink-0 transition-colors duration-300",
               isDark 
                 ? "bg-white/10 text-white group-hover:bg-white/20" 
                 : "bg-[#F8F9F7] text-emerald-deep/80 border border-black/[0.03] group-hover:bg-emerald-soft group-hover:text-emerald-deep"
            )}>
              <Icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" strokeWidth={isDark ? 2 : 1.5} />
            </div>
          )}
        </div>

        {/* Middle Row: Value */}
        <div className="mt-auto mb-2 sm:mb-3">
          <div className={cn(
             "text-xl sm:text-[28px] font-extrabold tracking-tight tabular-nums leading-none",
             isDark ? "text-white" : "text-foreground"
          )}>
            {value}
          </div>
        </div>

        {/* Bottom Row: Trend / Subtext */}
        <div className="flex items-center gap-1.5 mt-auto pt-1">
           {trend && (
             <span className={cn(
               "inline-flex items-center text-[9px] font-bold",
               isDark 
                 ? cn("px-1.5 py-0.5 rounded-md", isNegative ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300")
                 : (isNegative ? "text-rose-600" : "text-emerald-600")
             )}>
               {/* Icon logic: arrow for percentages, dot for status */}
               {trend.includes('%') ? (
                 <svg className="w-2.5 h-2.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
               ) : (
                 <div className={cn("h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full mr-1 sm:mr-1.5", isNegative ? "bg-rose-500" : "bg-emerald-500")} />
               )}
               {trend}
             </span>
           )}
           {subtext && (
             <span className={cn(
               "text-[9px] font-medium",
               isDark ? "text-white/50" : "text-muted-foreground/60"
             )}>
               {subtext}
             </span>
           )}
        </div>
      </CardContent>
    </Card>
  );
}

// --- Main Page -------------------------------------------------------------
export default function TenantComplaintsPage() {
  const currentTenant = mockTenants[0];
  const myComplaints = mockComplaints.filter((c) => c.tenantId === currentTenant.id);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

  const stats = [
    { label: "Total Requests", value: myComplaints.length, icon: FileText, variant: "dark" as "dark", subtext: "All time records" },
    { label: "Pending", value: myComplaints.filter(c => c.status === "pending").length, icon: Clock, isNegative: true, trend: "Active", subtext: "Needs action" },
    { label: "Ref. No", value: <span className="font-mono text-emerald-deep">#{currentTenant.id.split('-').pop()}</span>, icon: AlertCircle, subtext: "Active tenant" },
    { label: "Health", value: "94%", icon: TrendingUp, trend: " 94%", subtext: "Resolution rate" },
  ];

  return (
    <TenantLayout>
      <div className="min-h-screen bg-[#FAFAF8] pb-24">
        
        {/* --- Glassmorphic Header --- */}
        <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <Link href="/tenant" className="hover:text-emerald-deep transition-colors">
                 <ArrowLeft className="h-4 w-4" />
               </Link>
               <ChevronRight className="h-3.5 w-3.5" />
               <span className="text-foreground font-medium">Support</span>
            </div>
            <Button className="bg-emerald-deep text-white rounded-full px-4 h-9 shadow-lg shadow-emerald-deep/10 hover:bg-emerald-mid">
               <Plus className="h-4 w-4 mr-2" />
               New Request
            </Button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          
          {/* -- Page Header -- */}
          <Reveal>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Service Portal</h1>
              <p className="text-muted-foreground text-sm">Issue reporting and maintenance tracking</p>
            </div>
          </Reveal>

          {/* -- Stats Grid -- */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {stats.map((s, i) => (
                <OverviewCard key={i} {...s} />
              ))}
            </div>
          </Reveal>

          {/* -- Filter Tabs -- */}
          <Reveal delay={0.2}>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
               {["all", "pending", "in-progress", "resolved"].map(status => (
                 <button
                   key={status}
                   onClick={() => setStatusFilter(status)}
                   className={cn(
                     "px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                     statusFilter === status 
                      ? "bg-emerald-deep text-white shadow-md shadow-emerald-deep/10" 
                      : "bg-white border border-border/40 text-muted-foreground hover:border-emerald-bright/40"
                   )}
                 >
                   {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                 </button>
               ))}
               <div className="ml-auto">
                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-emerald-soft hover:text-emerald-deep">
                   <Filter className="h-4 w-4" />
                 </Button>
               </div>
            </div>
          </Reveal>

          {/* -- Requests List -- */}
          <Reveal delay={0.3}>
            <div className="space-y-4">
              {myComplaints.filter(c => statusFilter === "all" || c.status === statusFilter).map((c, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedComplaint(c)}
                  className="group relative overflow-hidden rounded-[28px] bg-white border border-border/40 p-5 shadow-sm transition-all hover:shadow-md hover:border-emerald-bright/30 cursor-pointer active:scale-[0.99]"
                >
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0",
                      c.status === "resolved" ? "bg-emerald-soft text-emerald-deep" : "bg-amber-50 text-amber-600"
                    )}>
                      {c.status === "resolved" ? <CheckCircle2 className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-[9px] uppercase font-bold text-emerald-bright border-emerald-bright/10 py-0">{c.category}</Badge>
                        <span className="text-[10px] text-muted-foreground">{c.createdDate}</span>
                      </div>
                      <h4 className="text-sm font-bold text-foreground leading-tight truncate">{c.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{c.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className={cn(
                        "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase",
                        c.priority === "high" ? "bg-red-50 text-red-500" : "bg-emerald-soft text-emerald-bright"
                      )}>
                        {c.priority}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-deep transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

        </main>
      </div>

      {/* --- Detailed View Modal --- */}
      <AnimatePresence>
        {selectedComplaint && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedComplaint(null)}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               exit={{ y: "100%" }}
               className="relative w-full max-w-xl bg-white rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="h-1.5 w-12 bg-border/40 rounded-full mx-auto mt-3 sm:hidden" />
              
              <div className="p-8 space-y-8">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-emerald-soft text-emerald-deep text-[10px] uppercase font-bold mb-3">{selectedComplaint.category}</Badge>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground leading-tight">{selectedComplaint.title}</h2>
                    <p className="text-xs text-muted-foreground mt-1">Generated ID: <span className="font-mono">#{selectedComplaint.id.split('-').pop()}</span></p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedComplaint(null)} className="rounded-full hover:bg-emerald-soft">
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="p-5 rounded-[24px] bg-emerald-soft/30 border border-emerald-bright/5 space-y-4">
                   <h5 className="text-xs font-bold text-emerald-deep uppercase tracking-wider">Issue Description</h5>
                   <p className="text-sm text-emerald-deep/80 leading-relaxed">
                     {selectedComplaint.description}
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-[20px] bg-white border border-border/40">
                     <p className="text-[10px] font-bold text-muted-foreground/60 uppercase mb-2">Priority Level</p>
                     <div className="flex items-center gap-2">
                        <div className={cn("h-2 w-2 rounded-full", selectedComplaint.priority === "high" ? "bg-red-500" : "bg-emerald-bright")} />
                        <span className="text-sm font-bold text-foreground capitalize">{selectedComplaint.priority}</span>
                     </div>
                   </div>
                   <div className="p-4 rounded-[20px] bg-white border border-border/40">
                     <p className="text-[10px] font-bold text-muted-foreground/60 uppercase mb-2">Current Status</p>
                     <Badge variant="outline" className="bg-emerald-soft text-emerald-deep border-emerald-bright/10">{selectedComplaint.status}</Badge>
                   </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button className="flex-1 h-14 rounded-2xl bg-emerald-deep text-white font-bold hover:bg-emerald-mid shadow-lg shadow-emerald-deep/10">
                    Send Message
                  </Button>
                  <Button variant="outline" className="h-14 w-14 rounded-2xl border-border/40 text-muted-foreground hover:bg-emerald-soft">
                    <MoreHorizontal className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </TenantLayout>
  );
}
