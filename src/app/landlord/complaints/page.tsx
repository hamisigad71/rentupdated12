"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import { 
  mockComplaints, 
  Complaint,
  getLandlordStats
} from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Activity, 
  MessageSquare, 
  User, 
  Home, 
  Plus,
  Filter,
  MoreHorizontal,
  Wrench,
  ShieldAlert,
  Calendar,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CustomWrenchIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/request.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/request.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomChatIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url("/chat (1).png")', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url("/chat (1).png")', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomHomeIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
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
)

const CustomTenantIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/tenant.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/tenant.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
)

const CustomAlertIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current size-4", className)}
    style={{
      WebkitMaskImage: 'url(/exclamation-mark.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/exclamation-mark.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
)

export default function ComplaintsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "in-progress" | "resolved">("all");
  const [search, setSearch] = useState("");
  const stats = getLandlordStats();

  const filteredComplaints = mockComplaints.filter(c => {
    const matchesTab = activeTab === "all" || c.status === activeTab;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                         c.tenantName.toLowerCase().includes(search.toLowerCase()) ||
                         c.unitId.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'text-destructive border-destructive/20 bg-destructive/5';
      case 'medium': return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
      default: return 'text-primary border-primary/20 bg-primary/5';
    }
  };

  const getStatusIcon = (s: string) => {
    switch (s) {
      case 'resolved': return <CheckCircle2 className="h-4 w-4" />;
      case 'in-progress': return <Activity className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <LandlordLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <Badge variant="outline" className="rounded-xl border-primary/20 bg-primary/5 text-primary uppercase text-xs px-3 py-1 mb-2">
              Facility Integrity
            </Badge>
            <h1 className="text-xl md:text-2xl tracking-tight leading-none uppercase">
              Complaints <span className="text-primary ">& Support</span>
            </h1>
            <p className="text-sm text-muted-foreground/30 uppercase tracking-tight">
              Maintenance synchronization & resolution node
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-6 h-12 rounded-xl bg-destructive/5 border border-destructive/10">
                <CustomAlertIcon className="h-5 w-5 animate-pulse" />
                <span className="text-xs uppercase text-destructive ">{stats.activeComplaints} High Risk Tickets</span>
             </div>
             <Button className="h-12 rounded-xl px-6 bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all uppercase text-xs ">
                <Plus className="h-4 w-4 mr-2" /> Log Incident
             </Button>
          </div>
        </div>

        {/* Operational Flow Controls */}
        <div className="glass p-4 rounded-2xl border border-foreground/5 flex flex-col md:flex-row items-center gap-4">
           <div className="flex items-center p-1.5 rounded-[1.8rem] bg-foreground/[0.03] w-full md:w-auto overflow-x-auto no-scrollbar">
              {(["all", "pending", "in-progress", "resolved"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-8 py-3 rounded-[1.4rem] text-xs uppercase  transition-all whitespace-nowrap",
                    activeTab === tab 
                      ? "bg-background shadow-xl text-primary border border-foreground/5" 
                      : "text-muted-foreground/40 hover:text-muted-foreground"
                  )}
                >
                  {tab === 'all' ? "Global Stream" : tab.replace('-', ' ')}
                </button>
              ))}
           </div>
           
           <div className="relative flex-1 group/search">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within/search:text-primary" />
              <Input 
                placeholder="Search Incident, Tenant or Asset..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-14 pr-6 py-4 h-14 rounded-2xl text-xs border-foreground/5 bg-foreground/[0.02] w-full group-focus-within/search:border-primary/20"
              />
           </div>
           
           <Button variant="outline" className="h-14 w-14 rounded-2xl border-foreground/5 bg-foreground/[0.02] flex items-center justify-center text-muted-foreground/40 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all">
              <Filter className="h-4 w-4" />
           </Button>
        </div>

        {/* Complaints Inventory */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           <AnimatePresence mode="popLayout">
              {filteredComplaints.map((comp, i) => (
                <motion.div
                  key={comp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group flex flex-col rounded-2xl border border-foreground/5 bg-background shadow-2xl overflow-hidden hover:border-primary/20 transition-all hover:shadow-primary/[0.02]"
                >
                  <div className="p-8 space-y-6">
                    <div className="flex items-start justify-between">
                       <div className="h-14 w-1 flex rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                       <div className="flex-1 px-4">
                          <div className="flex items-center gap-2 mb-1">
                             <Badge variant="outline" className={cn("text-[8px] uppercase h-5 px-2 border rounded-lg", getPriorityColor(comp.priority))}>
                                {comp.priority} Risk
                             </Badge>
                             <span className="text-[9px] text-muted-foreground/30 uppercase ">{comp.createdDate}</span>
                          </div>
                          <h3 className="text-sm tracking-tight uppercase group-hover:text-primary transition-colors leading-tight truncate">
                             {comp.title}
                          </h3>
                       </div>
                       <Badge className={cn(
                          "rounded-xl h-10 w-10 p-0 border flex items-center justify-center transition-all",
                          comp.status === 'resolved' ? "bg-primary/5 border-primary/20 text-primary" : 
                          comp.status === 'in-progress' ? "bg-amber-500/5 border-amber-500/20 text-amber-500" :
                          "bg-foreground/5 border-foreground/5 text-muted-foreground/40"
                       )}>
                          {getStatusIcon(comp.status)}
                       </Badge>
                    </div>

                    <p className="text-[11px] text-muted-foreground/60 leading-relaxed uppercase tracking-tight line-clamp-2">
                       {comp.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 py-4 border-y border-foreground/5">
                       <div className="space-y-1">
                          <p className="text-[8px] uppercase text-muted-foreground/30">Resident Entity</p>
                          <div className="flex items-center gap-2 text-xs uppercase truncate">
                             <CustomTenantIcon className="h-3 w-3 text-primary/40" /> {comp.tenantName}
                          </div>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[8px] uppercase text-muted-foreground/30">Asset Node</p>
                          <div className="flex items-center gap-2 text-xs uppercase truncate">
                             <CustomHomeIcon className="h-3 w-3 text-primary/40" /> {comp.unitId}
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-3">
                       <div className="flex-1 h-12 px-6 rounded-xl bg-foreground/[0.02] border border-foreground/5 flex items-center gap-3">
                          <CustomWrenchIcon className="h-3.5 w-3.5 text-muted-foreground/30" />
                          <span className="text-[9px] uppercase text-muted-foreground/40">{comp.category}</span>
                       </div>
                       <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-foreground/5 hover:bg-primary/5 hover:text-primary hover:border-primary/20 shadow-xl transition-all">
                          <CustomChatIcon className="h-4 w-4" />
                       </Button>
                    </div>

                    <div className="flex gap-3 mt-2">
                       {comp.status !== 'resolved' ? (
                         <Button className="flex-1 h-14 rounded-2xl bg-[#0F0F0F] text-white shadow-2xl hover:bg-primary transition-all uppercase text-xs tracking-[0.2em] group">
                            Mark Resolved <CheckCircle2 className="ml-2 h-4 w-4 group-hover:scale-125 transition-transform" />
                         </Button>
                       ) : (
                         <Button variant="outline" className="flex-1 h-14 rounded-2xl border-foreground/5 uppercase text-xs tracking-[0.2em]">
                            Issue Closed <ChevronRight className="ml-2 h-4 w-4" />
                         </Button>
                       )}
                       <Button variant="ghost" className="h-14 w-14 rounded-2xl border border-foreground/5 hover:bg-foreground/[0.02]">
                          <MoreHorizontal className="h-5 w-5" />
                       </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
           </AnimatePresence>
           
           {/* Add Trigger Card */}
           <motion.div
             whileHover={{ y: -5 }}
             className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-foreground/10 bg-foreground/[0.02] cursor-pointer hover:border-primary/40 hover:bg-primary/[0.02] transition-all gap-6 text-center group"
           >
             <div className="h-14 w-14 rounded-[2.2rem] bg-background border border-foreground/5 flex items-center justify-center text-muted-foreground/20 group-hover:text-primary group-hover:border-primary/20 transition-all shadow-xl">
                <CustomAlertIcon className="h-10 w-10" />
             </div>
             <div className="space-y-2">
               <p className="text-xl uppercase leading-none tracking-tight">Post New Incident</p>
               <p className="text-xs text-muted-foreground/40 uppercase ">Initialization Protocol Required</p>
             </div>
           </motion.div>
        </div>

      </div>
    </LandlordLayout>
  );
}
