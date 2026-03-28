"use client";

import React from "react";
import LandlordLayout from "@/components/LandlordLayout";
import { 
  revenueHistory, 
  occupancyTrends, 
  getLandlordStats 
} from "@/data/mockData";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  ArrowUpRight, 
  Target, 
  Activity, 
  Zap, 
  ShieldCheck,
  Globe,
  PieChart as PieIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-2xl border border-white/10 shadow-2xl">
        <p className="text-xs font-bold uppercase  text-primary mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center gap-4">
             <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
             <p className="text-sm font-bold tracking-tight uppercase text-white/90">
                {entry.name}: <span className="text-white">KSh {entry.value.toLocaleString()}</span>
             </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ReportsPage() {
  const stats = getLandlordStats();

  return (
    <LandlordLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-1">
            <Badge variant="outline" className="rounded-xl border-primary/20 bg-primary/5 text-primary uppercase text-xs font-bold  px-3 py-1 mb-2">
              Strategic Analytics
            </Badge>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-none uppercase">
              Performance <span className="text-primary ">& Metrics</span>
            </h1>
            <p className="text-sm font-bold text-muted-foreground/30 uppercase tracking-tight">
              Enterprise-grade portfolio intelligence node
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex h-12 items-center gap-2 px-6 rounded-xl bg-foreground/[0.02] border border-foreground/5">
                <Calendar className="h-4 w-4 text-muted-foreground/40" />
                <span className="text-xs font-bold uppercase  text-muted-foreground/60">Audit Cycle:</span>
                <span className="text-xs font-bold text-primary">Q1 2024</span>
             </div>
             <Button variant="outline" className="h-12 rounded-xl border-foreground/10 font-bold uppercase text-[9px] tracking-[0.2em] group">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" /> Synchronize Reports
             </Button>
          </div>
        </div>

        {/* Global KPIs Card Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           {[
             { label: "Gross Revenue", val: `KSh ${(stats.monthlyIncome / 1000).toFixed(0)}K`, icon: TrendingUp, trend: "+12.4%" },
             { label: "Portfolio Yield", val: "14.2%", icon: Target, trend: "+0.8%" },
             { label: "Arrears Exposure", val: `${Math.round((stats.totalArrears / stats.monthlyIncome) * 100)}%`, icon: Activity, trend: "-2.1%", danger: true },
             { label: "Global Occupancy", val: `${Math.round((stats.occupiedUnits / stats.totalUnits) * 100)}%`, icon: Globe, trend: "+1.5%" },
           ].map((stat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="p-8 rounded-2xl bg-background border border-foreground/5 shadow-2xl hover:border-primary/20 transition-all group"
             >
               <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                     <stat.icon className="h-6 w-6" />
                  </div>
                  <Badge className={cn(
                    "rounded-lg h-6 px-2 text-[9px] font-bold uppercase ",
                    stat.danger ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-primary/10 text-primary border-primary/20"
                  )}>
                    {stat.trend}
                  </Badge>
               </div>
               <p className="text-3xl font-bold tracking-tight mb-1 uppercase leading-none">{stat.val}</p>
               <span className="text-xs font-bold uppercase  text-muted-foreground/40">{stat.label}</span>
             </motion.div>
           ))}
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Revenue Projection (Left) */}
           <div className="lg:col-span-8 glass p-5 rounded-3xl border border-foreground/5 shadow-2xl space-y-10">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <h3 className="text-2xl font-bold uppercase tracking-tight">Revenue Projection</h3>
                    <p className="text-xs font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">6-Month Financial Trajectory</p>
                 </div>
                 <div className="flex gap-2">
                    {["Area", "Bar"].map(v => (
                      <Button key={v} variant="outline" className={cn("h-10 px-6 rounded-xl text-[9px] font-bold uppercase  border-foreground/5", v === "Area" ? "bg-primary text-white border-primary" : "text-muted-foreground")}>{v}</Button>
                    ))}
                 </div>
              </div>

              <div className="h-[400px] w-full pt-6">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueHistory}>
                       <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#1B5E45" stopOpacity={0.4}/>
                             <stop offset="95%" stopColor="#1B5E45" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3DBE7A" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#3DBE7A" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(val) => `KSh ${val / 1000}k`} />
                       <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--foreground))" strokeOpacity={0.05} />
                       <Tooltip content={<CustomTooltip />} />
                       <Area type="monotone" dataKey="revenue" name="Actual Revenue" stroke="#1B5E45" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                       <Area type="monotone" dataKey="target" name="Target Matrix" stroke="#3DBE7A" strokeWidth={2} strokeDasharray="8 4" fillOpacity={1} fill="url(#colorTarget)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-foreground/5">
                 {[
                   { l: "Peak Performance", v: "MAR 24", s: "Revenue Cap" },
                   { l: "Growth Index", v: "18.4%", s: "Year-on-Year" },
                   { l: "Target Variance", v: "+12.2%", s: "Above Matrix" },
                   { l: "Net Liquid", v: "KSh 1.2M", s: "Dischargeable" },
                 ].map((stat, i) => (
                   <div key={i} className="flex flex-col">
                      <span className="text-[8px] font-bold uppercase  text-muted-foreground/30 mb-1">{stat.l}</span>
                      <span className="text-sm font-bold uppercase tracking-tight text-primary">{stat.v}</span>
                      <span className="text-[9px] font-bold text-muted-foreground/20 uppercase tracking-tight">{stat.s}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Asset Health (Right) */}
           <div className="lg:col-span-4 space-y-8">
              
              {/* Occupancy Chart */}
              <div className="glass p-5 rounded-2xl border border-foreground/5 shadow-2xl space-y-8">
                 <div className="flex items-center gap-5">
                    <div className="h-14 w-14 rounded-2xl bg-[#0F0F0F] flex items-center justify-center text-white shadow-2xl">
                       <BarChart3 className="h-7 w-7 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-0.5">
                       <h4 className="text-xl font-bold uppercase tracking-tight">Asset Load</h4>
                       <p className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">Live Occupancy Trends</p>
                    </div>
                 </div>

                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={occupancyTrends} layout="vertical" barSize={12} margin={{ left: -20 }}>
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: "hsl(var(--muted-foreground))" }} width={100} />
                          <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                          <Bar dataKey="occupied" radius={[0, 4, 4, 0]}>
                             {occupancyTrends.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={index === 2 ? "#1B5E45" : "#1B5E4540"} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
                 
                 <div className="flex items-center justify-between pt-6 border-t border-foreground/5">
                    <div className="flex items-center gap-3">
                       <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                       <span className="text-xs font-bold uppercase text-muted-foreground/40 ">Global Stability</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                 </div>
              </div>

              {/* Maintenance Metrics */}
              <div className="glass p-5 rounded-2xl border border-foreground/5 bg-[#0F0F0F] text-white shadow-2xl space-y-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 h-48 w-48 bg-primary/20 blur-[100px] -mr-24 -mt-24" />
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-5">
                       <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-inner">
                          <Zap className="h-7 w-7 text-primary" strokeWidth={1} />
                       </div>
                       <div className="space-y-0.5">
                          <h4 className="text-xl font-bold uppercase tracking-tight">Ops Index</h4>
                          <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">Maintenance Discharge Rate</p>
                       </div>
                    </div>

                    <div className="space-y-4">
                       {[
                         { l: "SLA Compliant", v: "92%", c: "bg-primary" },
                         { l: "Response Time", v: "4.2h", c: "bg-primary/40" },
                         { l: "Cost Control", v: "-8.5%", c: "bg-brand-accent/40" },
                       ].map((m, i) => (
                         <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold uppercase  opacity-60">
                               <span>{m.l}</span>
                               <span>{m.v}</span>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                               <motion.div initial={{ width: 0 }} animate={{ width: m.v }} transition={{ duration: 1, delay: 0.5 + i * 0.1 }} className={cn("h-full rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]", m.c)} />
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="pt-4 flex items-center gap-3 text-primary">
                       <ShieldCheck className="h-5 w-5" />
                       <span className="text-xs font-bold uppercase  leading-none">Enterprise Protocol Verified</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </LandlordLayout>
  );
}
