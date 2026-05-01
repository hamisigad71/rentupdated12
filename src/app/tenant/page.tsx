"use client";

import React, { useRef } from "react";
import TenantLayout from "@/components/TenantLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
Card,
CardContent,
} from "@/components/ui/card";
import {
Tooltip,
TooltipContent,
TooltipProvider,
TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Plus,
  ArrowRight,
  TrendingUp,
  Receipt,
  Wrench,
  Zap,
  Bell,
  ChevronRight,
  AlertCircle,
  Droplets,
  FileText,
  ShieldCheck,
  Phone,
  MessageSquare,
  X,
  Home,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

// --- Reveal Animation ------------------------------------------------------
function Reveal({
children,
delay = 0,
className = "",
}: {
children: React.ReactNode;
delay?: number;
className?: string;
}) {
const ref = useRef(null);
const inView = useInView(ref, { once: true, margin: "-50px" });
return (
<motion.div
ref={ref}
initial={{ opacity: 0, y: 18 }}
animate={inView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
className={className}
>
{children}
</motion.div>
);
}

// --- Overview Card --------------------------------------------------------
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
        "relative rounded-[24px] sm:rounded-3xl overflow-hidden h-full flex flex-col justify-between transition-all duration-300 hover:shadow-md group min-h-[130px] sm:min-h-[160px]",
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
               "inline-flex items-center text-[10px] font-bold",
               isDark 
                 ? cn("px-1.5 py-0.5 rounded-md", isNegative ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300")
                 : (isNegative ? "text-rose-600" : "text-emerald-600")
             )}>
               {/* Icon logic: arrow for percentages, dot for status */}
               {trend.includes('%') ? (
                 <svg className="w-2.5 h-2.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
               ) : (
                 <div className={cn("h-1.5 w-1.5 rounded-full mr-1.5", isNegative ? "bg-rose-500" : "bg-emerald-500")} />
               )}
               {trend}
             </span>
           )}
           {subtext && (
             <span className={cn(
               "text-[10px] font-medium",
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

// --- Balance Card (Tenant Hero) -------------------------------------------
function BalanceCard({
amount,
dueDate,
daysLeft,
}: {
amount: string;
dueDate: string;
daysLeft: number;
}) {
return (
<Reveal>
<div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-gradient-to-br from-[#0c4a34] to-[#062b1e] p-6 shadow-xl shadow-[#062b1e]/20 text-white group border-transparent">
<div className="absolute inset-0 bg-gradient-to-br from-emerald-mid/40 to-transparent opacity-40 pointer-events-none" />
<div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-emerald-bright/10 blur-3xl group-hover:bg-emerald-bright/20 transition-all duration-700 pointer-events-none" />

{/* PREMIUM WAVY DECOR */}
<div className="absolute bottom-10 left-0 right-0 h-12 pointer-events-none opacity-40">
  <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-emerald-400 fill-none" strokeWidth="0.5">
    <path d="M0 20 Q 20 18, 30 15 T 60 10 T 100 5" />
  </svg>
</div>

    <div className="relative space-y-6 z-10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/70 text-xs font-medium mb-1.5">Current Balance Due</p>
          <h2 className="text-3xl font-bold tracking-tight text-white">{amount}</h2>
        </div>
        <div className="bg-emerald-bright/20 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 flex items-center gap-1">
          <Calendar className="h-3 w-3 text-emerald-bright" />
          <span className="text-[11px] font-bold text-emerald-bright">{daysLeft} days left</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-white/60 text-xs font-medium">Next payment: {dueDate}</p>
        <Link
          href="/tenant/payments"
          className="bg-white text-emerald-deep px-4 py-1.5 rounded-full text-xs font-bold shadow-lg hover:bg-emerald-soft transition-colors"
        >
          Pay Now
        </Link>
      </div>
    </div>
  </div>
</Reveal>
);
}

// --- Main Dashboard --------------------------------------------------------
export default function TenantDashboard() {
const { userName } = useAuth();
const [mounted, setMounted] = React.useState(false);
const [showAnnouncement, setShowAnnouncement] = React.useState(true);

React.useEffect(() => {
setMounted(true);
}, []);

const now = new Date();
const hour = now.getHours();
const greeting = !mounted ? "" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

return (
<TenantLayout>
<TooltipProvider>
<div className="min-h-screen bg-[#FAFAF8]">
{/* --- Top Nav Bar ------------------------------------- */}
<header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
<div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
<div className="flex items-center gap-2 text-sm text-muted-foreground">
<Home className="h-4 w-4 text-emerald-deep" />
<ChevronRight className="h-3.5 w-3.5" />
<span className="text-foreground font-medium">Dashboard</span>
</div>
<div className="flex items-center gap-3">
<Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl relative text-muted-foreground hover:bg-emerald-soft hover:text-emerald-deep">
<Bell className="h-5 w-5" />
<span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
</Button>
<Link href="/tenant/payments" className="h-9 px-5 rounded-xl bg-emerald-deep hover:bg-emerald-mid text-white text-sm font-medium shadow-sm flex items-center gap-2" >
Pay Rent
<ArrowRight className="h-3.5 w-3.5" />
</Link>
</div>
</div>
</header>


      <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        
        {/* -- Greeting + Notification -- */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-xs font-medium mb-1">Hello, {userName || "User"}</p>
            <h1 className="text-xl font-bold text-foreground">Tenant Dashboard</h1>
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-border/40 bg-white shadow-sm">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>

        {/* -- Announcements / Notice Board -- */}
        <AnimatePresence>
          {showAnnouncement && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, scale: 0.95, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative flex items-start gap-3 p-4 rounded-[24px] bg-amber-50 border border-amber-100/50 shadow-sm mb-8">
                <div className="h-10 w-10 rounded-xl bg-amber-100/80 flex items-center justify-center shrink-0">
                   <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
                <div className="flex-1 pr-8">
                   <p className="text-sm font-bold text-amber-900 leading-tight">Water Maintenance Tomorrow</p>
                   <p className="text-[11px] text-amber-700/80 mt-1 leading-relaxed">Water supply will be interrupted between 10 AM and 2 PM for routine checks. Please ensure you have enough water stored.</p>
                </div>
                <button 
                  onClick={() => setShowAnnouncement(false)}
                  className="absolute top-4 right-4 h-6 w-6 rounded-full flex items-center justify-center text-amber-600/50 hover:text-amber-900 hover:bg-amber-100 transition-colors"
                  aria-label="Dismiss Announcement"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -- Balance Card -- */}
        <BalanceCard 
          amount="KES 2,450" 
          dueDate="April 1, 2025" 
          daysLeft={5} 
        />

        {/* -- Overview Grid -- */}
        <Reveal delay={0.1}>
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Overview</h3>
              <span className="text-[11px] font-bold text-emerald-bright bg-emerald-soft px-2.5 py-1 rounded-full">
                Current Status
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <OverviewCard 
                label="Monthly Rent" 
                value={
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base font-bold text-white/90">KES</span>
                    <span className="text-3xl sm:text-4xl">12,450</span>
                  </div>
                }
                variant="dark"
                icon={TrendingUp}
                trend="Paid"
                subtext="This month"
              />
              <OverviewCard 
                label="Outstanding Balance" 
                value={
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-muted-foreground mr-1">KES</span>
                    <span>0</span>
                  </div>
                }
                trend="Clear" 
                subtext="All caught up"
                icon={ShieldCheck}
              />
              <OverviewCard 
                label="Service Requests" 
                value={
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl text-foreground">2</span>
                    <span className="text-lg font-bold text-muted-foreground/60">/ 5</span>
                  </div>
                }
                trend="In Progress"
                subtext="Active tickets"
                isNegative={true}
                icon={Wrench}
              />
              <OverviewCard 
                label="Lease Ends" 
                value={
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-muted-foreground">Mar</span>
                    <span className="text-2xl sm:text-3xl text-foreground">2027</span>
                  </div>
                }
                icon={Calendar}
                trend="Valid"
                subtext="Active"
              />
            </div>
          </section>
        </Reveal>

        {/* -- Quick Actions -- */}
        <Reveal delay={0.15}>
          <section className="space-y-4">
             <h3 className="text-base font-bold text-foreground">Quick Actions</h3>
             <div className="grid grid-cols-4 gap-2 sm:gap-3">
                <Link href="/tenant/payments" className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-[20px] bg-white shadow-sm border border-[#E0E8E3] text-emerald-deep transition-all hover:shadow-md hover:border-emerald-deep/30 active:scale-95 group">
                  <Receipt className="h-6 w-6 mb-2 text-emerald-deep" strokeWidth={1.5} />
                  <span className="text-[10px] sm:text-[11px] font-medium leading-tight text-center">Pay<br/>Rent</span>
                </Link>
                <Link href="/tenant/requests/new" className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-[20px] bg-white shadow-sm border border-[#E0E8E3] text-emerald-deep transition-all hover:shadow-md hover:border-emerald-deep/30 active:scale-95 group">
                  <Wrench className="h-6 w-6 mb-2 text-emerald-deep" strokeWidth={1.5} />
                  <span className="text-[10px] sm:text-[11px] font-medium leading-tight text-center">Service<br/>Request</span>
                </Link>
                <Link href="/tenant/documents" className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-[20px] bg-white shadow-sm border border-[#E0E8E3] text-emerald-deep transition-all hover:shadow-md hover:border-emerald-deep/30 active:scale-95 group">
                  <FileText className="h-6 w-6 mb-2 text-emerald-deep" strokeWidth={1.5} />
                  <span className="text-[10px] sm:text-[11px] font-medium leading-tight text-center">My<br/>Vault</span>
                </Link>
                <Link href="/tenant/utilities" className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-[20px] bg-white shadow-sm border border-[#E0E8E3] text-emerald-deep transition-all hover:shadow-md hover:border-emerald-deep/30 active:scale-95 group">
                  <Zap className="h-6 w-6 mb-2 text-emerald-deep" strokeWidth={1.5} />
                  <span className="text-[10px] sm:text-[11px] font-medium leading-tight text-center">Utility<br/>Bills</span>
                </Link>
             </div>
          </section>
        </Reveal>

        {/* -- Utilities & Usage -- */}
        <Reveal delay={0.2}>
          <section className="space-y-4">
             <div className="flex items-center justify-between">
               <h3 className="text-base font-bold text-foreground">Utilities</h3>
               <Link href="/tenant/utilities" className="text-xs font-medium text-emerald-bright">Details</Link>
             </div>
             <div className="grid grid-cols-2 gap-3">
               <div className="p-4 rounded-[24px] bg-white border border-border/40 shadow-sm transition-all hover:border-emerald-bright/30">
                 <div className="flex items-center gap-2 mb-3">
                    <div className="h-6 w-6 rounded-md bg-blue-50 flex items-center justify-center">
                       <Droplets className="h-3.5 w-3.5 text-blue-500" />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Water</span>
                 </div>
                 <div className="flex items-end justify-between mb-2">
                    <p className="text-xl font-bold text-foreground tracking-tight">12 <span className="text-[11px] text-muted-foreground font-medium uppercase">Units</span></p>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">-2%</span>
                 </div>
                 <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }} />
                 </div>
               </div>
               
               <div className="p-4 rounded-[24px] bg-white border border-border/40 shadow-sm transition-all hover:border-emerald-bright/30">
                 <div className="flex items-center gap-2 mb-3">
                     <div className="h-6 w-6 rounded-md bg-amber-50 flex items-center justify-center">
                       <Zap className="h-3.5 w-3.5 text-amber-500" />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Electric</span>
                 </div>
                 <div className="flex items-end justify-between mb-2">
                    <p className="text-xl font-bold text-foreground tracking-tight">145 <span className="text-[11px] text-muted-foreground font-medium uppercase">kWh</span></p>
                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">+5%</span>
                 </div>
                 <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '85%' }} />
                 </div>
               </div>
             </div>
          </section>
        </Reveal>

        {/* -- Service Requests / Maintenance -- */}
        <Reveal delay={0.22}>
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">Service Requests</h3>
              <Link href="/tenant/requests" className="text-xs font-medium text-emerald-bright">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-[24px] bg-white border border-border/40 shadow-sm transition-all hover:border-emerald-bright/30">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-tight">Sink Repair</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Requested 2 days ago</p>
                  </div>
                </div>
                <Badge variant="outline" className="rounded-full bg-amber-50 text-amber-700 border-amber-100 px-3">Pending</Badge>
              </div>
            </div>
          </section>
        </Reveal>

        {/* -- Recent Transactions -- */}
        <Reveal delay={0.25}>
          <section className="space-y-4">
             <div className="flex items-center justify-between">
               <h3 className="text-base font-bold text-foreground">Recent Payments</h3>
               <Link href="/tenant/payments/history" className="text-xs font-medium text-emerald-bright">View all</Link>
             </div>
             <div className="space-y-3">
               <div className="flex items-center justify-between p-4 rounded-[24px] bg-white border border-border/40 shadow-sm transition-all hover:border-emerald-bright/30">
                 <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-xl bg-emerald-soft flex items-center justify-center shrink-0">
                     <Receipt className="h-5 w-5 text-emerald-deep" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-foreground leading-tight">March Rent</p>
                     <p className="text-[10px] text-muted-foreground mt-0.5">Mar 1, 2026</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-bold text-foreground tracking-tight">KES 12,450</p>
                   <Badge variant="outline" className="rounded-full bg-emerald-soft/50 text-emerald-bright border-emerald-bright/10 text-[9px] px-1.5 h-4 mt-0.5">Paid</Badge>
                 </div>
               </div>
             </div>
          </section>
        </Reveal>

        {/* -- Quick Documents -- */}
        <Reveal delay={0.3}>
          <section className="space-y-4">
             <div className="flex items-center justify-between">
               <h3 className="text-base font-bold text-foreground">My Documents</h3>
               <Link href="/tenant/documents" className="text-xs font-medium text-emerald-bright">Vault</Link>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <Link href="/tenant/documents" className="group flex flex-col p-4 rounded-[24px] bg-white border border-border/40 shadow-sm transition-all hover:border-emerald-bright/30 active:scale-[0.98]">
                  <div className="h-10 w-10 rounded-xl bg-emerald-soft flex items-center justify-center mb-3 group-hover:bg-emerald-deep transition-colors">
                    <FileText className="h-5 w-5 text-emerald-deep group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground leading-tight mb-1">Lease Agreement</h4>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground">Signed Oct 2025</p>
                </Link>
                <Link href="/tenant/documents" className="group flex flex-col p-4 rounded-[24px] bg-white border border-border/40 shadow-sm transition-all hover:border-emerald-bright/30 active:scale-[0.98]">
                  <div className="h-10 w-10 rounded-xl bg-emerald-soft flex items-center justify-center mb-3 group-hover:bg-emerald-deep transition-colors">
                    <ShieldCheck className="h-5 w-5 text-emerald-deep group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground leading-tight mb-1">Rules & Policies</h4>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground">Updated Jan 2026</p>
                </Link>
             </div>
          </section>
        </Reveal>

        {/* -- Property Manager -- */}
        <Reveal delay={0.35}>
          <section className="space-y-4 pb-12">
             <div className="p-5 rounded-[28px] bg-emerald-soft border border-emerald-bright/20 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left transition-all hover:shadow-md">
                <div className="h-14 w-14 rounded-full border-2 border-white shadow-sm overflow-hidden shrink-0 mx-auto sm:mx-0">
                  <img src="https://i.pravatar.cc/150?img=44" alt="Manager" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                   <h4 className="text-sm font-bold text-emerald-deep leading-tight">Sarah Wanjiku</h4>
                   <p className="text-xs text-emerald-deep/70 mt-0.5">Property Manager</p>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 sm:mt-0">
                   <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-emerald-deep/20 text-emerald-deep hover:bg-white shrink-0">
                     <MessageSquare className="h-4 w-4" />
                   </Button>
                   <Button className="h-10 px-5 rounded-full bg-emerald-deep text-white shadow-md shadow-emerald-deep/10 hover:bg-emerald-mid shrink-0">
                     <Phone className="h-4 w-4 mr-2" />
                     Call
                   </Button>
                </div>
             </div>
          </section>
        </Reveal>

      </main>
    </div>
  </TooltipProvider>
</TenantLayout>
);
}