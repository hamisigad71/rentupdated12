"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import { 
  mockTenants, 
  mockUnits, 
  Tenant 
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
  User, 
  Phone, 
  Mail, 
  Calendar, 
  CreditCard, 
  ArrowUpRight, 
  MoreHorizontal,
  Filter,
  Download,
  Plus,
  Building2,
  Trash2,
  Edit
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

export default function TenantsPage() {
  const [search, setSearch] = useState("");
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const filteredTenants = mockTenants.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.unitId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <LandlordLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <Badge variant="outline" className="rounded-xl border-primary/20 bg-primary/5 text-primary uppercase text-xs font-bold  px-3 py-1 mb-2">
              Tenant Management
            </Badge>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-none uppercase">
              Tenant <span className="text-primary ">Registry</span>
            </h1>
            <p className="text-sm font-bold text-muted-foreground/30 uppercase tracking-tight">
              Enterprise-grade resident management center
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-12 rounded-xl border-foreground/10 font-bold uppercase text-[9px]  group">
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" /> Export DB
            </Button>
            <Button className="h-12 rounded-xl px-6 bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all font-bold uppercase text-xs ">
              <Plus className="h-4 w-4 mr-2" /> Register Tenant
            </Button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="glass p-6 rounded-xl border border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-32 group/search">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within/search:text-primary transition-colors" />
            <Input 
              placeholder="Locate Resident..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-4 py-2.5 h-12 rounded-xl text-xs font-bold border-foreground/5 bg-foreground/[0.02] w-full group-focus-within/search:border-primary/20"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl border-foreground/10 gap-2 font-bold uppercase text-[9px]  hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all">
              <Filter className="h-4 w-4" /> Filter Protocol
            </Button>
            <div className="h-12 w-[1px] bg-foreground/5 hidden md:block" />
            <div className="flex items-center gap-2 px-4 h-12 rounded-xl bg-foreground/[0.02] border border-foreground/5">
              <span className="text-xs font-bold uppercase  text-muted-foreground/40">Total Nodes:</span>
              <span className="text-sm font-bold text-primary">{mockTenants.length}</span>
            </div>
          </div>
        </div>

        {/* Tenants Table */}
        <div className="glass rounded-2xl border border-foreground/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-foreground/[0.02]">
                <TableRow className="border-b border-foreground/5">
                  <TableHead className="px-8 py-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Resident Identity</TableHead>
                  <TableHead className="px-6 py-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Asset Node</TableHead>
                  <TableHead className="px-6 py-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Communication</TableHead>
                  <TableHead className="px-6 py-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-right">Net Liability</TableHead>
                  <TableHead className="px-6 py-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Protocol Status</TableHead>
                  <TableHead className="px-8 py-6 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredTenants.map((tenant, i) => (
                    <motion.tr 
                      key={tenant.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group border-b border-foreground/5 last:border-0 hover:bg-foreground/[0.01] transition-colors"
                    >
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-foreground/5 border border-foreground/5 flex items-center justify-center font-bold text-muted-foreground/60 shadow-inner group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                            {tenant.name[0]}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold uppercase tracking-tight leading-none mb-1">{tenant.name}</span>
                            <span className="text-xs font-bold text-muted-foreground/40 uppercase  leading-none">ID: {tenant.idNumber}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-primary uppercase ">{tenant.unitId}</span>
                          <span className="text-xs font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">SINCE {tenant.moveInDate}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/60 uppercase">
                            <Phone className="h-3 w-3 text-primary/40" /> {tenant.phone}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/60 uppercase lowercase-none truncate max-w-[150px]">
                            <Mail className="h-3 w-3 text-primary/40" /> {tenant.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-6 text-right">
                        <div className="flex flex-col">
                          <span className={cn(
                            "text-base font-bold tracking-tight",
                            tenant.arrears > 0 ? "text-destructive" : "text-primary"
                          )}>
                            KSh {tenant.arrears.toLocaleString()}
                          </span>
                          <span className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">ARREARS INDEX</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-6">
                        <div className="flex justify-center">
                          <Badge className={cn(
                            "rounded-xl h-6 px-3 border uppercase text-[8px] font-bold tracking-[0.2em] transition-all",
                            tenant.status === 'active' 
                              ? "bg-primary/10 border-primary/20 text-primary shadow-[0_0_12px_rgba(var(--primary),0.1)]" 
                              : "bg-destructive/10 border-destructive/20 text-destructive"
                          )}>
                            {tenant.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-10 px-4 rounded-xl border border-foreground/5 text-[9px] font-bold uppercase  hover:bg-primary/5 hover:text-primary transition-all"
                          onClick={() => { setSelectedTenant(tenant); setShowProfile(true); }}
                        >
                          Access Profile <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 bg-foreground/[0.02] border-t border-foreground/5 flex justify-center">
            <Button variant="ghost" size="sm" className="text-xs font-bold uppercase  text-muted-foreground hover:text-primary">
              Synchronize Ledger <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>

      </div>

      {/* Tenant Profile Modal */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-[800px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl bg-background h-[80vh]">
           <div className="flex flex-col h-full overflow-hidden">
              {/* Modal Header */}
              <div className="relative h-48 shrink-0 bg-[#0F0F0F] p-6 flex flex-col justify-center overflow-hidden">
                 <div className="absolute top-0 right-0 h-32 w-32 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
                 <div className="relative z-10 flex items-center gap-8">
                    <div className="h-24 w-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-primary shadow-2xl">
                       {selectedTenant?.name[0]}
                    </div>
                    <div className="space-y-2">
                       <Badge className="bg-primary/20 border-primary/30 text-primary border rounded-lg text-[9px] font-bold uppercase ">Resident Bio-Link</Badge>
                       <h2 className="text-xl font-bold tracking-tight text-white uppercase leading-none">{selectedTenant?.name}</h2>
                       <div className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase ">
                          <span>SINCE {selectedTenant?.moveInDate}</span>
                          <span className="h-1 w-1 rounded-full bg-white/20" />
                          <span className="text-primary">{selectedTenant?.unitId}</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-auto p-6 no-scrollbar space-y-12">
                 {/* Core Stats */}
                 <div className="grid grid-cols-3 gap-6">
                    {[
                      { l: "Monthly Rental", v: `KSh ${selectedTenant?.rent.toLocaleString()}`, i: CreditCard, p: true },
                      { l: "Total Paid", v: `KSh ${selectedTenant?.paidAmount.toLocaleString()}`, i: ArrowUpRight },
                      { l: "Arrears Exposure", v: `KSh ${selectedTenant?.arrears.toLocaleString()}`, i: Trash2, d: (selectedTenant?.arrears ?? 0) > 0 },
                    ].map((stat, i) => (
                      <div key={i} className={cn(
                        "p-6 rounded-3xl border border-foreground/5 shadow-xl transition-all hover:-translate-y-1",
                        stat.p ? "bg-[#0F0F0F] text-white" : stat.d ? "bg-destructive/10 border-destructive/20" : "bg-background"
                      )}>
                         <p className={cn("text-[9px] font-bold uppercase  mb-4", stat.p ? "text-primary mt-1" : "text-muted-foreground/40")}>{stat.l}</p>
                         <p className={cn("text-xl font-bold tracking-tight", stat.d && "text-destructive")}>{stat.v}</p>
                      </div>
                    ))}
                 </div>

                 {/* Detailed Info */}
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-8">
                       <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">Contact Vectors</h4>
                          <div className="space-y-4">
                             {[
                               { l: "Mobile Stream", v: selectedTenant?.phone, i: Phone },
                               { l: "Signal Encryption", v: selectedTenant?.email, i: Mail },
                               { l: "Identity Signature", v: selectedTenant?.idNumber, i: User },
                             ].map((f, i) => (
                               <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/5">
                                  <f.i className="h-4 w-4 text-primary/40 shrink-0" />
                                  <div className="flex flex-col">
                                     <span className="text-[8px] font-bold text-muted-foreground/40 uppercase  leading-none mb-1">{f.l}</span>
                                     <span className="text-[11px] font-bold uppercase ">{f.v}</span>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="space-y-8">
                       <div className="space-y-4">
                          <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">System Compliance</h4>
                          <div className="space-y-4">
                             <div className="p-6 rounded-xl bg-foreground/[0.01] border border-foreground/5 space-y-4">
                                <div className="flex items-center justify-between">
                                   <span className="text-xs font-bold uppercase  text-muted-foreground/40">Reliability Score</span>
                                   <span className="text-sm font-bold text-primary">98.4%</span>
                                </div>
                                <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                                   <div className="h-full w-[98%] bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]" />
                                </div>
                             </div>
                             <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/20 text-primary">
                                <Building2 className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase ">Registered Asset Occupant</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Actions Footer */}
              <div className="p-8 border-t border-foreground/5 bg-foreground/[0.015] flex gap-4 shrink-0">
                 <Button variant="outline" className="flex-1 h-14 rounded-2xl font-bold uppercase text-xs  border-foreground/5 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/20 transition-all">
                    <Trash2 className="h-4 w-4 mr-2" /> Expel Node
                 </Button>
                 <Button variant="outline" className="flex-1 h-14 rounded-2xl font-bold uppercase text-xs  border-foreground/5 hover:bg-primary/5 hover:text-primary transition-all">
                    <Edit className="h-4 w-4 mr-2" /> Modify Data
                 </Button>
                 <Button className="flex-1 h-14 rounded-2xl bg-[#0F0F0F] text-white font-bold uppercase text-xs  shadow-2xl hover:bg-primary transition-all">
                    Issue Notice <ArrowUpRight className="h-4 w-4 ml-2" />
                 </Button>
              </div>
           </div>
        </DialogContent>
      </Dialog>
    </LandlordLayout>
  );
}
