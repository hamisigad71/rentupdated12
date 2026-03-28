"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  CreditCard,
  Activity,
  Download,
  Calendar,
  Search,
  AlertTriangle,
  CheckCircle2,
  X,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { mockTenants, mockPayments, mockUnits, Building } from "@/data/mockData";
import { getAvatarUrl } from "@/utils/avatarUtils";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface BuildingLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  building: Building | null;
}

export default function BuildingLedgerModal({
  isOpen,
  onClose,
  building,
}: BuildingLedgerModalProps) {
  const [activeTab, setActiveTab] = useState("tenants");
  const [searchTerm, setSearchTerm] = useState("");

  if (!building) return null;

  // Filter units belonging to this building
  const buildingUnits = mockUnits.filter(u => u.buildingId === building.id);
  const buildingUnitIds = buildingUnits.map(u => u.id);

  // Filter tenants and payments based on building unit IDs
  const buildingTenants = mockTenants.filter((t) => buildingUnitIds.includes(t.unitId));
  const buildingPayments = mockPayments.filter((p) => buildingUnitIds.includes(p.unitId));

  const totalArrears = buildingTenants.reduce((sum, t) => sum + t.arrears, 0);
  const totalCollected = buildingPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredTenants = buildingTenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.unitId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = buildingPayments.filter(
    (p) =>
      p.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.unitId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] w-[1100px] h-[90vh] p-0 overflow-hidden border-none shadow-2xl rounded-2xl bg-background">
        <div className="flex flex-col h-full bg-background overflow-hidden">
          
          {/* Header Section */}
          <div className="relative p-5 overflow-hidden shrink-0 bg-[#0F0F0F] border-b border-foreground/5 dark:bg-[#0A0A0A]">
             <div className="absolute top-0 right-0 -m-32 h-32 w-32 rounded-full bg-primary/10 blur-[100px]" />
             <div className="absolute bottom-0 left-0 -m-32 h-32 w-32 rounded-full bg-primary/5 blur-[80px]" />
             
             <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-8">
               <div className="space-y-4">
                 <div className="flex items-center gap-2">
                   <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                   <span className="text-xs font-bold uppercase  text-muted-foreground/60 leading-none">Asset Digital Ledger</span>
                 </div>
                 
                 <div className="space-y-1">
                   <h2 className="text-2xl font-bold tracking-tight leading-none text-white uppercase">
                     {building.name}
                   </h2>
                   <div className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase ">
                     <div className="flex items-center gap-1.5">
                       <Users className="h-3 w-3" />
                       {buildingTenants.length} Occupants
                     </div>
                     <span className="text-white/10">•</span>
                     <div className="flex items-center gap-1.5">
                       <Activity className="h-3 w-3" />
                       {buildingPayments.length} Transactions
                     </div>
                   </div>
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <div className="px-6 py-4 rounded-2xl bg-primary/10 border border-primary/20 text-center min-w-[160px]">
                   <p className="text-[9px] font-bold uppercase  text-primary mb-1">Building Yield</p>
                   <p className="text-2xl font-bold text-white tracking-tight leading-tight">
                     KSh {(totalCollected / 1000).toFixed(1)}K
                   </p>
                 </div>
                 <div className="px-6 py-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-center min-w-[160px]">
                   <p className="text-[9px] font-bold uppercase  text-destructive mb-1">Exposure</p>
                   <p className="text-2xl font-bold text-white tracking-tight leading-tight">
                     KSh {(totalArrears / 1000).toFixed(1)}K
                   </p>
                 </div>
               </div>
             </div>
          </div>

          {/* Controller Bar */}
          <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-foreground/5 bg-foreground/[0.02]">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="bg-foreground/5 h-12 p-1 rounded-xl">
                <TabsTrigger value="tenants" className="rounded-lg px-8 py-2 text-xs font-bold uppercase  data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  Occupants
                </TabsTrigger>
                <TabsTrigger value="payments" className="rounded-lg px-8 py-2 text-xs font-bold uppercase  data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                  Ledger
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <Input 
                  placeholder="Universal Filter..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 pr-6 py-3 h-12 rounded-xl text-xs font-bold border-foreground/10 bg-background w-full md:w-72"
                />
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-foreground/10 hover:bg-primary/5 hover:text-primary transition-all">
                <Download className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-auto p-5 no-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-foreground/5 bg-background shadow-xl overflow-hidden"
              >
                {activeTab === "tenants" ? (
                  <Table>
                    <TableHeader className="bg-foreground/[0.02] border-b border-foreground/5">
                      <TableRow>
                        <TableHead className="px-8 h-14 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Occupant</TableHead>
                        <TableHead className="px-8 h-14 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Protocol</TableHead>
                        <TableHead className="px-8 h-14 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Status</TableHead>
                        <TableHead className="px-8 h-14 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-right">Horizon</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTenants.length > 0 ? (
                        filteredTenants.map((tenant) => (
                          <TableRow key={tenant.id} className="group hover:bg-foreground/[0.01] transition-colors border-b border-foreground/5 last:border-0">
                            <TableCell className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className="h-11 w-11 rounded-2xl bg-foreground/5 border border-foreground/5 flex items-center justify-center font-bold text-muted-foreground transition-transform group-hover:scale-105">
                                  {tenant.name[0]}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold tracking-tight">{tenant.name}</span>
                                  <span className="text-xs font-bold text-muted-foreground/40 uppercase ">ID: {tenant.id.split("-").pop()}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="px-8 py-6">
                               <div className="flex justify-center">
                                 <Badge variant="outline" className="rounded-xl h-6 px-3 border uppercase text-[8px] font-bold  border-primary/20 text-primary bg-primary/5">
                                    UNIT {tenant.unitId.split("-").pop()}
                                 </Badge>
                               </div>
                            </TableCell>
                            <TableCell className="px-8 py-6">
                               <div className="flex flex-col gap-1">
                                  <span className="text-sm font-bold tracking-tight">KSh {tenant.rent.toLocaleString()}</span>
                                  <div className="flex items-center gap-2 text-xs font-bold uppercase ">
                                     <span className={tenant.arrears > 0 ? "text-destructive" : "text-primary"}>
                                       Balance: KSh {tenant.arrears.toLocaleString()}
                                     </span>
                                     {tenant.arrears > 0 ? (
                                       <AlertTriangle className="h-3 w-3 text-destructive animate-pulse" />
                                     ) : (
                                       <CheckCircle2 className="h-3 w-3 text-primary" />
                                     )}
                                  </div>
                               </div>
                            </TableCell>
                            <TableCell className="px-8 py-6 text-right">
                               <span className="text-xs font-bold uppercase  text-muted-foreground/40 leading-none">In: {tenant.moveInDate}</span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-[400px] text-center">
                             <div className="flex flex-col items-center gap-4">
                               <div className="h-12 w-12 rounded-[1.8rem] bg-foreground/5 flex items-center justify-center text-muted-foreground/20">
                                 <Users className="h-8 w-8" />
                               </div>
                               <div className="space-y-1">
                                 <p className="text-sm font-bold tracking-tight text-muted-foreground">No occupants located</p>
                                 <p className="text-xs font-bold uppercase  text-muted-foreground/40">Try adjusting your search criteria</p>
                               </div>
                             </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                ) : (
                  <Table>
                    <TableHeader className="bg-foreground/[0.02] border-b border-foreground/5">
                      <TableRow>
                        <TableHead className="px-8 h-14 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Stakeholder</TableHead>
                        <TableHead className="px-8 h-14 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Cycle</TableHead>
                        <TableHead className="px-8 h-14 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Capital</TableHead>
                        <TableHead className="px-8 h-14 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">Status</TableHead>
                        <TableHead className="px-8 h-14 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-right">Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment) => (
                          <TableRow key={payment.id} className="group hover:bg-foreground/[0.01] transition-colors border-b border-foreground/5 last:border-0">
                            <TableCell className="px-8 py-6">
                              <div className="flex flex-col">
                                <span className="text-sm font-bold tracking-tight">{payment.tenantName}</span>
                                <span className="text-xs font-bold text-muted-foreground/40 uppercase ">Unit {payment.unitId.split("-").pop()}</span>
                              </div>
                            </TableCell>
                            <TableCell className="px-8 py-6">
                               <Badge variant="outline" className="rounded-xl h-6 px-3 border uppercase text-[8px] font-bold  border-foreground/10 bg-foreground/5 text-muted-foreground">
                                 {payment.month}
                               </Badge>
                            </TableCell>
                            <TableCell className="px-8 py-6 text-sm font-bold tracking-tight text-primary uppercase">
                               KSh {payment.amount.toLocaleString()}
                            </TableCell>
                            <TableCell className="px-8 py-6">
                               <div className={cn(
                                 "inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-[8px] uppercase  border",
                                 payment.status === "completed" ? "bg-primary/5 border-primary/20 text-primary" : 
                                 payment.status === "pending" ? "bg-brand-accent/5 border-brand-accent/20 text-brand-accent" :
                                 "bg-destructive/5 border-destructive/20 text-destructive"
                               )}>
                                 <div className={cn("h-1 w-1 rounded-full bg-current", payment.status === 'pending' && "animate-pulse")} />
                                 {payment.status}
                               </div>
                            </TableCell>
                            <TableCell className="px-8 py-6 text-right">
                               <span className="text-xs font-bold text-muted-foreground/40 uppercase ">{payment.date}</span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-[400px] text-center">
                             <div className="flex flex-col items-center gap-4">
                               <div className="h-12 w-12 rounded-[1.8rem] bg-foreground/5 flex items-center justify-center text-muted-foreground/20">
                                 <CreditCard className="h-8 w-8" />
                               </div>
                               <div className="space-y-1">
                                 <p className="text-sm font-bold tracking-tight text-muted-foreground">No transactions recorded</p>
                                 <p className="text-xs font-bold uppercase  text-muted-foreground/40">Financial activity will appear here</p>
                               </div>
                             </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Bar */}
          <div className="p-5 flex items-center justify-between shrink-0 bg-foreground/[0.02] border-t border-foreground/5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground/60 uppercase ">
                <ShieldCheck className="h-3 w-3 text-primary" />
                System Synchronized 
                <span className="text-primary ml-1">Real-time</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" className="h-12 px-8 rounded-xl text-xs font-bold uppercase " onClick={onClose}>
                Close View
              </Button>
              <Button className="h-12 px-8 rounded-xl text-xs font-bold uppercase  bg-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Synchronize Ledger
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
