"use client";

import React from "react";
import LandlordLayout from "@/components/LandlordLayout";
import DashboardCard from "@/components/DashboardCard";
import { 
  Building2, 
  Home, 
  Users, 
  DollarSign, 
  AlertCircle, 
  Plus, 
  ArrowUpRight, 
  TrendingUp, 
  Activity, 
  BarChart3, 
  ChevronRight,
  TrendingDown,
  Calendar
} from "lucide-react";
import { getLandlordStats, mockPayments, mockComplaints } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandlordDashboard() {
  const { userName } = useAuth();
  const stats = getLandlordStats();
  const recentPayments = mockPayments.slice(0, 5);
  const recentComplaints = mockComplaints.slice(0, 3);
  
  const greeting = new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 17 ? "Afternoon" : "Evening";
  const today = new Date().toLocaleDateString("en-KE", { weekday: "long", month: "long", day: "numeric" });

  return (
    <LandlordLayout>
      <div className="space-y-10">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl bg-foreground/5 p-5 md:p-8 border border-foreground/5 dark:bg-foreground/[0.02]">
          <div className="absolute top-0 right-0 -m-16 h-32 w-32 rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute bottom-0 left-0 -m-16 h-32 w-32 rounded-full bg-primary/5 blur-[80px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold uppercase  text-muted-foreground/60 leading-none">Command Center</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-none">
                  Good {greeting},
                </h2>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-none gradient-text">
                  {userName?.split(" ")[0]}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground/80">
                <Calendar className="h-4 w-4" />
                <span>{today}</span>
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                {[
                  { label: "Buildings", val: stats.totalBuildings },
                  { label: "Occupancy", val: `${Math.round((stats.occupiedUnits / stats.totalUnits) * 100)}%` },
                  { label: "Yield", val: "14.2%" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight">{item.val}</span>
                    <span className="text-[9px] font-bold uppercase  text-muted-foreground/50">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-3">
              <Button size="lg" className="rounded-2xl px-6 h-12 bg-primary font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 active:scale-95 transition-all">
                <Plus className="h-5 w-5 mr-2" />
                Add New Asset
              </Button>
              <div className="flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 border border-destructive/20 select-none">
                <div className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
                <span className="text-[9px] font-bold uppercase text-destructive ">{stats.tenantsInArrears} Arrears Detected</span>
              </div>
            </div>
          </div>
        </section>

        {/* KPI Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard title="Total Inventory" value={stats.totalUnits} icon={Home} color="primary" trend={{ value: 4, direction: "up" }} />
          <DashboardCard title="Live Occupancy" value={stats.occupiedUnits} icon={Users} color="accent" trend={{ value: 2, direction: "up" }} />
          <DashboardCard title="Monthly Revenue" value={`KSh ${(stats.monthlyIncome / 1000).toFixed(0)}K`} icon={DollarSign} color="primary" trend={{ value: 12, direction: "up" }} />
          <DashboardCard title="Arrears Pending" value={stats.tenantsInArrears} icon={AlertCircle} color="destructive" trend={{ value: 8, direction: "down" }} />
        </section>

        {/* Secondary Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Portfolio Health */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight">Portfolio Health</h3>
                <p className="text-sm text-muted-foreground">Live occupancy and collection frequency</p>
              </div>
              <Link href="/landlord/reports">
                <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5 h-9 rounded-lg">
                  Full Analytics <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="glass rounded-xl border border-foreground/5 p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Occupancy Rate</span>
                  <Badge variant="secondary" className="bg-primary/10 text-primary font-bold border-primary/20">{Math.round((stats.occupiedUnits / stats.totalUnits) * 100)}% Capacity</Badge>
                </div>
                <div className="h-3 w-full rounded-full bg-foreground/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.occupiedUnits / stats.totalUnits) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-brand-accent shadow-[0_0_15px_rgba(var(--color-primary),0.3)]" 
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-bold uppercase  text-muted-foreground/60">
                  <span>{stats.occupiedUnits} Units Leased</span>
                  <span>{stats.vacantUnits} Vacancies</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-bold uppercase  text-muted-foreground/60">Revenue Performance</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-12 pt-2">
                    {[35, 42, 65, 55, 80, 100].map((h, i) => (
                      <div key={i} className="flex-1">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.1, duration: 0.8 }}
                          className={`w-full rounded-t-md ${i === 5 ? "bg-primary" : "bg-primary/20"}`} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-foreground/[0.02] border border-foreground/5 space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                          <Activity className="h-4 w-4 text-destructive" />
                        </div>
                        <span className="text-sm font-bold uppercase  text-muted-foreground/60">Arrears Aging</span>
                      </div>
                      <Badge variant="outline" className="text-[9px] font-bold border-destructive/20 text-destructive">+12% vs LW</Badge>
                   </div>
                   <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium uppercase text-muted-foreground/80 ">30+ Days</span>
                        <span className="text-sm font-bold">KSh 12,400</span>
                      </div>
                      <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-destructive rounded-full" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Support / Tickets */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-bold tracking-tight">Support Tickets</h3>
               <Link href="/landlord/complaints" className="text-xs font-bold text-primary hover:underline underline-offset-4">See All</Link>
            </div>
            <div className="space-y-4">
              {recentComplaints.map((ticket, i) => (
                <div key={ticket.id} className="p-4 rounded-2xl bg-background border border-foreground/5 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-[8px] font-bold uppercase h-4 px-1 ${ticket.priority === 'high' ? 'border-destructive/30 text-destructive bg-destructive/5' : ''}`}>
                          {ticket.category}
                        </Badge>
                        <span className="text-xs font-bold text-muted-foreground/50 uppercase ">{ticket.createdDate}</span>
                      </div>
                      <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{ticket.title}</h4>
                      <p className="text-xs font-semibold text-muted-foreground/60 uppercase">{ticket.tenantName}</p>
                    </div>
                    <div className={`h-8 w-8 shrink-0 rounded-lg flex items-center justify-center ${ticket.status === 'in-progress' ? 'bg-brand-accent/10 border border-brand-accent/20 text-brand-accent' : 'bg-destructive/10 border border-destructive/20 text-destructive'}`}>
                       {ticket.status === 'in-progress' ? <Activity className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="glass p-6 rounded-xl border border-foreground/5 space-y-4">
               <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Quick Terminal</h4>
               <div className="grid grid-cols-2 gap-3">
                 <Link href="/landlord/tenants" className="contents">
                    <Button variant="outline" className="rounded-xl border-foreground/5 h-14 w-full flex flex-col items-center justify-center gap-1 hover:bg-primary/5 hover:border-primary/20 group">
                        <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        <span className="text-[8px] font-bold uppercase ">New Tenant</span>
                    </Button>
                 </Link>
                 <Link href="/landlord/payments" className="contents">
                    <Button variant="outline" className="rounded-xl border-foreground/5 h-14 w-full flex flex-col items-center justify-center gap-1 hover:bg-primary/5 hover:border-primary/20 group">
                        <DollarSign className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        <span className="text-[8px] font-bold uppercase ">Post Rent</span>
                    </Button>
                 </Link>
               </div>
            </div>
          </div>
        </section>

        {/* Ledger Section */}
        <section className="space-y-6">
           <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight">Recent Ledger</h3>
                <p className="text-sm text-muted-foreground">Latest financial transactions across all assets</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl h-10 border-foreground/10 font-bold px-5">Download CSV</Button>
           </div>
           
           <div className="glass rounded-2xl border border-foreground/5 overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="bg-foreground/[0.02] border-b border-foreground/5">
                     <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Reference</th>
                     <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Entity</th>
                     <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Asset ID</th>
                     <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-right">Magnitude</th>
                     <th className="px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-foreground/5">
                   {recentPayments.map((p, i) => (
                     <tr key={p.id} className="hover:bg-foreground/[0.01] transition-colors group">
                       <td className="px-8 py-4">
                         <div className="flex flex-col">
                           <span className="text-xs font-bold font-mono text-muted-foreground/60">{p.id}</span>
                           <span className="text-xs font-bold text-muted-foreground/40">{p.date}</span>
                         </div>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-foreground/5 flex items-center justify-center font-bold text-muted-foreground">
                              {p.tenantName[0]}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold">{p.tenantName}</span>
                              <span className="text-xs font-bold text-muted-foreground/60 uppercase">{p.month}</span>
                            </div>
                          </div>
                       </td>
                       <td className="px-6 py-4 text-xs font-bold text-muted-foreground/80 uppercase ">{p.unitId}</td>
                       <td className="px-6 py-4 text-right">
                         <span className="text-sm font-bold text-primary tracking-tight">KSh {p.amount.toLocaleString()}</span>
                       </td>
                       <td className="px-8 py-4">
                         <div className="flex justify-center">
                           <Badge className={`rounded-xl h-6 px-3 border uppercase text-[8px] font-bold  ${p.status === 'completed' ? 'bg-primary/10 border-primary/20 text-primary shadow-[0_0_10px_rgba(var(--color-primary),0.05)]' : 'bg-destructive/10 border-destructive/20 text-destructive'}`}>
                             {p.status}
                           </Badge>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
              <Link href="/landlord/payments" className="p-4 bg-foreground/[0.02] border-t border-foreground/5 flex justify-center hover:bg-primary/5 transition-colors group">
                 <Button variant="ghost" size="sm" className="text-xs font-bold uppercase  text-muted-foreground group-hover:text-primary">View Full Ledger <ArrowUpRight className="ml-1 h-3 w-3" /></Button>
              </Link>
           </div>
        </section>

      </div>
    </LandlordLayout>
  );
}
