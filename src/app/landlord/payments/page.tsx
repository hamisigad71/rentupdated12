"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import { 
  mockPayments, 
  mockTenants, 
  Payment,
  getLandlordStats
} from "@/data/mockData";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  CreditCard, 
  ArrowUpRight, 
  Download,
  Plus,
  Filter,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  FileText,
  CheckCircle2,
  Clock
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const stats = getLandlordStats();

  const filteredPayments = mockPayments.filter(p => 
    p.tenantName.toLowerCase().includes(search.toLowerCase()) || 
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.unitId.toLowerCase().includes(search.toLowerCase())
  );

  const totalCollected = mockPayments.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0);

  return (
    <LandlordLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <Badge variant="outline" className="rounded-xl border-primary/20 bg-primary/5 text-primary uppercase text-xs  px-3 py-1 mb-2">
              Financial Operations
            </Badge>
            <h1 className="text-xl md:text-2xl tracking-tight leading-none uppercase">
              Payments <span className="text-primary ">& Ledger</span>
            </h1>
            <p className="text-sm text-muted-foreground/30 uppercase tracking-tight">
              Enterprise-grade transaction & reconciliation center
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-12 rounded-xl border-foreground/10  uppercase text-[9px] group">
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" /> Export Ledger
            </Button>
            <Button className="h-12 rounded-xl px-6 bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all uppercase text-xs ">
              <Plus className="h-4 w-4 mr-2" /> Post Transaction
            </Button>
          </div>
        </div>

        {/* Financial KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: "Total Revenue", val: `KSh ${totalCollected.toLocaleString()}`, icon: TrendingUp, color: "primary", sub: "Net Collections (MTD)" },
             { label: "Pending Receipts", val: `KSh ${(stats.totalArrears / 2).toLocaleString()}`, icon: Clock, color: "accent", sub: "Expected Inflow" },
             { label: "Arrears Exposure", val: `KSh ${stats.totalArrears.toLocaleString()}`, icon: AlertCircle, color: "destructive", sub: "Overdue Obligations" },
           ].map((stat, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group relative p-8 rounded-2xl border border-foreground/5 bg-background shadow-2xl hover:border-primary/10 transition-all overflow-hidden"
             >
               <div className="absolute top-0 right-0 -m-8 h-32 w-32 rounded-full bg-primary/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="flex items-start justify-between mb-6">
                  <div className={cn(
                    "h-14 w-14 rounded-2xl flex items-center justify-center border transition-all",
                    stat.color === 'primary' ? "bg-primary/5 border-primary/10 text-primary" : 
                    stat.color === 'destructive' ? "bg-destructive/5 border-destructive/10 text-destructive" :
                    "bg-brand-accent/5 border-brand-accent/10 text-brand-accent"
                  )}>
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <Badge variant="ghost" className="text-[8px]  uppercase text-muted-foreground/30">Live Update</Badge>
               </div>
               <p className="text-xl tracking-tight mb-1 uppercase leading-none font-money">{stat.val}</p>
               <div className="flex flex-col">
                  <span className="text-[11px]  uppercase text-muted-foreground/60">{stat.label}</span>
                  <span className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.2em]">{stat.sub}</span>
               </div>
             </motion.div>
           ))}
        </div>

        {/* Global Filter Bar */}
        <div className="glass p-8 rounded-2xl border border-foreground/5 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
           <div className="relative w-full lg:w-[32rem] group/search">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 group-focus-within/search:text-primary transition-colors" />
              <Input 
                placeholder="Search Reference, Resident or Asset ID..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-16 pr-6 py-8 h-12 rounded-2xl text-sm border-foreground/5 bg-foreground/[0.02] w-full group-focus-within/search:border-primary/20 shadow-inner"
              />
           </div>
           
           <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="flex h-12 items-center gap-2 px-6 rounded-2xl bg-foreground/[0.02] border border-foreground/5">
                 <Calendar className="h-4 w-4 text-muted-foreground/40" />
                 <span className="text-xs  uppercase text-muted-foreground/60">Cycle:</span>
                 <span className="text-xs text-primary">March 2024</span>
              </div>
              <Button variant="outline" className="h-12 px-8 rounded-2xl border-foreground/10 gap-3 uppercase text-xs tracking-[0.2em] hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all shadow-lg">
                 <Filter className="h-4 w-4" /> Comprehensive Audit
              </Button>
           </div>
        </div>

        {/* Transaction Repository */}
        <div className="glass rounded-3xl border border-foreground/5 overflow-hidden shadow-2xl relative">
           <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-foreground/[0.03]">
                  <TableRow className="border-b border-foreground/5">
                    <TableHead className="px-[4px]0 py-8 text-[11px]  uppercase text-muted-foreground/40">System Hash</TableHead>
                    <TableHead className="px-8 py-8 text-[11px]  uppercase text-muted-foreground/40">Entity / Node</TableHead>
                    <TableHead className="px-8 py-8 text-[11px]  uppercase text-muted-foreground/40">Temporal Stamp</TableHead>
                    <TableHead className="px-8 py-8 text-[11px]  uppercase text-muted-foreground/40 text-right">Magnitude</TableHead>
                    <TableHead className="px-8 py-8 text-[11px]  uppercase text-muted-foreground/40 text-center">Protocol Integrity</TableHead>
                    <TableHead className="px-[4px]0 py-8 text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredPayments.map((pay, i) => (
                      <motion.tr 
                        key={pay.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="group border-b border-foreground/5 last:border-0 hover:bg-foreground/[0.01] transition-all"
                      >
                        <TableCell className="px-[4px]0 py-8">
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-foreground/5 border border-foreground/5 flex items-center justify-center text-muted-foreground/20 group-hover:text-primary/40 group-hover:border-primary/20 transition-all">
                                 <FileText className="h-5 w-5" />
                              </div>
                              <span className="text-xs font-mono text-primary lowercase ">{pay.id}</span>
                           </div>
                        </TableCell>
                        <TableCell className="px-8 py-8">
                           <div className="flex flex-col">
                              <span className="text-sm uppercase tracking-tight group-hover:text-primary transition-colors leading-none mb-1">{pay.tenantName}</span>
                              <span className="text-xs  text-muted-foreground/40 uppercase leading-none">{pay.unitId} • {pay.month}</span>
                           </div>
                        </TableCell>
                        <TableCell className="px-8 py-8">
                           <div className="flex items-center gap-2 text-[11px] text-muted-foreground/40 uppercase ">
                              <Calendar className="h-3.5 w-3.5" /> {pay.date}
                           </div>
                        </TableCell>
                        <TableCell className="px-8 py-8 text-right">
                           <span className="text-xl tracking-tight text-foreground group-hover:text-primary transition-colors font-money">
                              KSh {pay.amount.toLocaleString()}
                           </span>
                        </TableCell>
                        <TableCell className="px-8 py-8">
                           <div className="flex justify-center">
                              <Badge className={cn(
                                "rounded-2xl h-8 px-5 border uppercase text-[9px]  tracking-[0.2em] transition-all",
                                pay.status === 'completed' 
                                  ? "bg-primary/10 border-primary/20 text-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]" 
                                  : pay.status === 'pending'
                                  ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                                  : "bg-destructive/10 border-destructive/20 text-destructive"
                              )}>
                                 {pay.status === 'completed' && <CheckCircle2 className="h-3 w-3 mr-2" />}
                                 {pay.status}
                              </Badge>
                           </div>
                        </TableCell>
                        <TableCell className="px-[4px]0 py-8 text-right">
                           <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border border-foreground/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/5 hover:text-primary">
                              <ArrowUpRight className="h-5 w-5" />
                           </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
           </div>
           
           <div className="p-8 bg-foreground/[0.02] border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-xs  uppercase text-muted-foreground/40">
                 Showing {filteredPayments.length} of {mockPayments.length} Recorded Sequences
              </div>
              <div className="flex items-center gap-2">
                 {[1, 2, 3].map(p => (
                   <button key={p} className={cn(
                     "h-10 w-10 rounded-xl border  text-xs transition-all",
                     p === 1 ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "bg-background border-foreground/5 text-muted-foreground hover:border-primary/20"
                   )}>{p}</button>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </LandlordLayout>
  );
}
