"use client";

import React, { useState, useRef } from "react";
import TenantLayout from "@/components/TenantLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FileText,
  Download,
  Eye,
  Search,
  CheckCircle2,
  Lock,
  Upload,
  X,
  Folder,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  HardDrive,
  Database,
  ShieldCheck,
  Filter,
  Grid3x3,
  List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// --- Mock Data -------------------------------------------------------------
const MOCK_DOCS = [
  { id: "1", name: "Lease Agreement 2024", type: "PDF", size: "2.4 MB", date: "Oct 12, 2023", category: "Legal", status: "Verified" },
  { id: "2", name: "Maintenance Guidelines", type: "PDF", size: "1.1 MB", date: "Jan 05, 2024", category: "Rules", status: "Active" },
  { id: "3", name: "Security Deposit Receipt", type: "PDF", size: "0.8 MB", date: "Oct 12, 2023", category: "Finance", status: "Verified" },
  { id: "4", name: "Emergency Procedures", type: "PDF", size: "4.2 MB", date: "Aug 20, 2023", category: "Safety", status: "Active" },
];

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

// --- Overview Card --------------------------------------------------------
function OverviewCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}) {
  return (
    <Card className="rounded-[24px] border-border/40 bg-white shadow-sm overflow-hidden h-full group hover:shadow-md transition-all active:scale-[0.98]">
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-3">
          <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", color)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-0.5">{label}</p>
          <p className="text-lg font-bold text-foreground tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Main Page -------------------------------------------------------------
export default function TenantDocumentsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const stats = [
    { label: "Vault", value: MOCK_DOCS.length, icon: Folder, color: "bg-emerald-soft text-emerald-deep" },
    { label: "Verified", value: "100%", icon: ShieldCheck, color: "bg-emerald-deep text-white" },
    { label: "Storage", value: "9.1MB", icon: Database, color: "bg-emerald-bright/20 text-emerald-deep" },
    { label: "Security", value: "AES-256", icon: Lock, color: "bg-emerald-soft text-emerald-deep" },
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
               <span className="text-foreground font-medium">Vault</span>
            </div>
            <Button className="bg-emerald-deep text-white rounded-full px-4 h-9 shadow-lg shadow-emerald-deep/10 hover:bg-emerald-mid">
               <Upload className="h-4 w-4 mr-2" />
               Upload
            </Button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          
          {/* -- Page Header -- */}
          <Reveal>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Document Vault</h1>
              <p className="text-muted-foreground text-sm">Secure storage for your property documents</p>
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

          {/* -- Toolbar -- */}
          <Reveal delay={0.2}>
            <div className="bg-white border border-border/40 rounded-[28px] p-2 flex items-center gap-2 shadow-sm">
               <div className="relative flex-1">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <input 
                   type="text" 
                   placeholder="Search files..."
                   className="w-full h-11 pl-11 pr-4 bg-transparent border-none outline-none text-sm font-medium"
                 />
               </div>
               <div className="hidden sm:flex border-l border-border h-6 mx-2" />
               <div className="flex items-center gap-1 pr-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setViewMode("list")}
                    className={cn("h-9 w-9 rounded-xl", viewMode === "list" ? "bg-emerald-soft text-emerald-deep" : "text-muted-foreground")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setViewMode("grid")}
                    className={cn("h-9 w-9 rounded-xl", viewMode === "grid" ? "bg-emerald-soft text-emerald-deep" : "text-muted-foreground")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
               </div>
            </div>
          </Reveal>

          {/* -- Files List/Grid -- */}
          <Reveal delay={0.3}>
            {viewMode === "list" ? (
              <div className="space-y-3">
                {MOCK_DOCS.map((doc, i) => (
                  <div 
                    key={i}
                    onClick={() => setSelectedDoc(doc)}
                    className="group bg-white border border-border/40 rounded-[24px] p-4 flex items-center gap-4 shadow-sm transition-all hover:border-emerald-bright/30 hover:shadow-md cursor-pointer active:scale-[0.99]"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-emerald-soft flex items-center justify-center shrink-0">
                      <FileText className="h-6 w-6 text-emerald-deep" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground leading-tight truncate">{doc.name}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5 uppercase font-bold tracking-wider">{doc.category} • {doc.size}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="hidden sm:flex rounded-full bg-emerald-soft/50 text-emerald-bright border-emerald-bright/10 text-[9px] px-1.5 h-4">
                        {doc.status}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground group-hover:text-emerald-deep transition-colors">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {MOCK_DOCS.map((doc, i) => (
                  <div 
                    key={i}
                    onClick={() => setSelectedDoc(doc)}
                    className="group bg-white border border-border/40 rounded-[28px] p-5 flex flex-col items-center text-center shadow-sm transition-all hover:border-emerald-bright/30 hover:shadow-md cursor-pointer active:scale-[0.98]"
                  >
                    <div className="h-16 w-16 rounded-[20px] bg-emerald-soft flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                      <FileText className="h-8 w-8 text-emerald-deep" />
                    </div>
                    <h4 className="text-xs font-bold text-foreground leading-tight line-clamp-2 h-8">{doc.name}</h4>
                    <p className="text-[9px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">{doc.size}</p>
                  </div>
                ))}
              </div>
            )}
          </Reveal>

          {/* -- Security Banner -- */}
          <Reveal delay={0.4}>
             <div className="relative overflow-hidden rounded-[32px] bg-emerald-deep p-8 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-mid/50 to-transparent" />
                <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-emerald-bright/10 blur-3xl" />
                
                <div className="relative flex flex-col md:flex-row items-center gap-6">
                  <div className="h-16 w-16 rounded-full bg-emerald-bright/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-lg shadow-black/10">
                    <ShieldCheck className="h-8 w-8 text-emerald-bright" />
                  </div>
                  <div className="text-center md:text-left space-y-2">
                    <h3 className="text-xl font-bold tracking-tight">Your data is fully encrypted</h3>
                    <p className="text-white/60 text-xs leading-relaxed max-w-md">We use AES-256 bank-level encryption to secure your documents. Only you and authorized property managers can access these files.</p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 h-10 px-6">
                      View Audit Log
                    </Button>
                  </div>
                </div>
             </div>
          </Reveal>

        </main>
      </div>

      {/* --- Detail Modal --- */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedDoc(null)}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               exit={{ y: "100%" }}
               className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="h-1.5 w-12 bg-border/40 rounded-full mx-auto mt-3 sm:hidden" />
              <div className="p-8 space-y-8">
                 <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-soft flex items-center justify-center">
                          <FileText className="h-6 w-6 text-emerald-deep" />
                        </div>
                        <div>
                          <Badge className="bg-emerald-soft text-emerald-deep text-[10px] uppercase font-bold mb-1">{selectedDoc.category}</Badge>
                          <h2 className="text-xl font-bold text-foreground leading-tight line-clamp-1">{selectedDoc.name}</h2>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedDoc(null)} className="rounded-full hover:bg-emerald-soft">
                      <X className="h-5 w-5" />
                    </Button>
                 </div>

                 <div className="divide-y divide-border/40">
                   {[
                     { label: "File Size", value: selectedDoc.size },
                     { label: "Uploaded", value: selectedDoc.date },
                     { label: "Security", value: "Verified & Locked" },
                   ].map((row, i) => (
                     <div key={i} className="flex items-center justify-between py-4">
                        <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">{row.label}</span>
                        <span className="text-sm font-bold text-foreground">{row.value}</span>
                     </div>
                   ))}
                 </div>

                 <div className="flex gap-3">
                   <Button className="flex-1 h-14 rounded-2xl bg-emerald-deep text-white font-bold hover:bg-emerald-mid shadow-lg shadow-emerald-deep/10">
                     <Download className="h-5 w-5 mr-3" />
                     Download PDF
                   </Button>
                   <Button variant="outline" className="flex-1 h-14 rounded-2xl border-border/40 text-foreground font-bold hover:bg-emerald-soft">
                     <Eye className="h-5 w-5 mr-3" />
                     Full Preview
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
