"use client";

import React, { useState, useRef } from "react";
import TenantLayout from "@/components/TenantLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FileText, Download, Eye, Search, Filter,
  ShieldCheck, Clock, Calendar, CheckCircle2,
  Lock, Zap, FileCode, MoreHorizontal,
  Shield, Database, Upload, RefreshCw,
  FileImage, FileBadge, Star, TrendingUp,
  ChevronDown, X, Check, Folder, Activity,
  ArrowUpRight, Info, Bell, CreditCard,
  AlertCircle, FileCheck, Stamp, HardDrive,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── DATA ────────────────────────────────────────────────────────────────────
const MOCK_DOCS = [
  {
    id: "1",
    name: "Fully Executed Lease Agreement",
    type: "PDF",
    size: "2.4 MB",
    date: "Oct 12, 2023",
    category: "Legal",
    status: "Verified",
    pages: 14,
    icon: FileCheck,
    color: "text-emerald-mid",
    bg: "bg-emerald-soft",
  },
  {
    id: "2",
    name: "Property Maintenance Guidelines v4",
    type: "PDF",
    size: "1.1 MB",
    date: "Jan 05, 2024",
    category: "Rules",
    status: "Active",
    pages: 8,
    icon: FileText,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    id: "3",
    name: "Initial Deposit Receipt",
    type: "PDF",
    size: "0.8 MB",
    date: "Oct 12, 2023",
    category: "Finance",
    status: "Verified",
    pages: 2,
    icon: CreditCard,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "4",
    name: "Emergency Protocol Handbook",
    type: "PDF",
    size: "4.2 MB",
    date: "Aug 20, 2023",
    category: "Safety",
    status: "Active",
    pages: 24,
    icon: AlertCircle,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    id: "5",
    name: "Feb 2024 Rental Settlement Receipt",
    type: "PDF",
    size: "0.5 MB",
    date: "Feb 02, 2024",
    category: "Finance",
    status: "Verified",
    pages: 1,
    icon: Stamp,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    id: "6",
    name: "Move-In Inspection Report",
    type: "PDF",
    size: "3.1 MB",
    date: "Oct 13, 2023",
    category: "Legal",
    status: "Verified",
    pages: 6,
    icon: FileCheck,
    color: "text-emerald-mid",
    bg: "bg-emerald-soft",
  },
  {
    id: "7",
    name: "Mar 2024 Rental Settlement Receipt",
    type: "PDF",
    size: "0.5 MB",
    date: "Mar 01, 2024",
    category: "Finance",
    status: "Verified",
    pages: 1,
    icon: Stamp,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const CATEGORIES = ["All", "Legal", "Finance", "Rules", "Safety"];

const CATEGORY_COLORS: Record<string, string> = {
  Legal:   "bg-emerald-soft text-emerald-deep border-emerald-deep/20",
  Finance: "bg-blue-50 text-blue-700 border-blue-200",
  Rules:   "bg-amber-50 text-amber-700 border-amber-200",
  Safety:  "bg-red-50 text-red-600 border-red-200",
};

// ─── REVEAL ──────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── DOCUMENT PREVIEW DRAWER ─────────────────────────────────────────────────
function DocumentPreviewDrawer({ doc, onClose }: { doc: typeof MOCK_DOCS[0] | null; onClose: () => void }) {
  if (!doc) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 260 }}
          className="h-full w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", doc.bg)}>
                <doc.icon className={cn("h-5 w-5", doc.color)} />
              </div>
              <div>
                <p className="font-bold text-sm leading-tight">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.type} · {doc.size}</p>
              </div>
            </div>
            <button onClick={onClose} className="h-9 w-9 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Preview area */}
          <div className="flex-1 p-6 space-y-5 overflow-y-auto">
            {/* Mock doc preview */}
            <div className="rounded-2xl border border-border bg-muted/30 aspect-[3/4] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.02)_100%)]" />
              <div className="text-center space-y-3 p-8">
                <doc.icon className={cn("h-16 w-16 mx-auto", doc.color)} strokeWidth={1} />
                <p className="font-bold text-sm text-foreground/60">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.pages} {doc.pages === 1 ? "page" : "pages"}</p>
              </div>
            </div>

            {/* Metadata */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Document Details</p>
              {[
                { label: "File Name", value: doc.name },
                { label: "Category", value: doc.category },
                { label: "Uploaded", value: doc.date },
                { label: "File Size", value: doc.size },
                { label: "Pages", value: `${doc.pages}` },
                { label: "Ref ID", value: `DOC-${doc.id.padStart(4, "0")}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-medium">{label}</span>
                  <span className="font-semibold text-right max-w-[200px] truncate">{value}</span>
                </div>
              ))}
            </div>

            {/* Verification badge */}
            <div className="rounded-2xl border border-primary/20 bg-emerald-soft p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary">Document Verified</p>
                <p className="text-[10px] text-primary/60 font-medium">Cryptographic hash confirmed · AES-256 encrypted</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-border flex gap-3">
            <Button className="flex-1 rounded-2xl font-bold h-12 gap-2">
              <Download className="h-4 w-4" /> Download
            </Button>
            <Button variant="outline" className="flex-1 rounded-2xl font-bold h-12 gap-2">
              <Eye className="h-4 w-4" /> Full View
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function TenantDocumentsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [previewDoc, setPreviewDoc] = useState<typeof MOCK_DOCS[0] | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const filtered = MOCK_DOCS
    .filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || d.category === activeCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "size") return parseFloat(a.size) - parseFloat(b.size);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const verified = MOCK_DOCS.filter((d) => d.status === "Verified").length;
  const totalPages = MOCK_DOCS.reduce((acc, d) => acc + d.pages, 0);
  const categories = [...new Set(MOCK_DOCS.map((d) => d.category))];

  return (
    <TenantLayout>
      <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <Reveal className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <HardDrive className="h-4.5 w-4.5 text-primary" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50">Secure Document Vault</span>
            </div>
            <h1 className="text-3xl font-black tracking-[-0.03em] text-foreground">
              My Documents
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              All your lease, financial, and legal documents in one secure place.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Encryption badge */}
            <div className="flex items-center gap-2.5 h-11 px-5 rounded-2xl border border-primary/15 bg-emerald-soft">
              <Lock className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">AES-256 Encrypted</span>
            </div>
            <Button className="h-11 px-5 rounded-2xl font-bold text-sm gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </Reveal>

        {/* ── KPI CARDS ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Documents",
              value: MOCK_DOCS.length,
              sub: `${categories.length} categories`,
              icon: Folder,
              accent: true,
            },
            {
              label: "Verified Assets",
              value: verified,
              sub: `${Math.round((verified / MOCK_DOCS.length) * 100)}% verified`,
              icon: ShieldCheck,
              accent: false,
            },
            {
              label: "Total Pages",
              value: totalPages,
              sub: "Across all documents",
              icon: FileText,
              accent: false,
            },
            {
              label: "Storage Status",
              value: "Secure",
              sub: "All systems nominal",
              icon: Activity,
              accent: false,
              pulse: true,
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className={cn(
                "rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group",
                card.accent
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                  : "bg-card border-border hover:border-primary/20"
              )}>
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center",
                    card.accent ? "bg-primary-foreground/15" : "bg-primary/8"
                  )}>
                    <card.icon className={cn("h-5 w-5", card.accent ? "text-primary-foreground" : "text-primary")} />
                  </div>
                  {card.pulse && (
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[9px] font-bold text-primary uppercase tracking-wider">Live</span>
                    </div>
                  )}
                </div>
                <p className="text-3xl font-black tracking-tight mb-1">{card.value}</p>
                <p className={cn("text-xs font-semibold", card.accent ? "text-primary-foreground/60" : "text-muted-foreground")}>{card.label}</p>
                <p className={cn("text-[10px] font-medium mt-0.5", card.accent ? "text-primary-foreground/40" : "text-muted-foreground/50")}>{card.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── MAIN VAULT PANEL ───────────────────────────────────────────── */}
        <Reveal delay={0.15}>
          <div className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">

            {/* Toolbar */}
            <div className="p-5 border-b border-border bg-muted/20 flex flex-col md:flex-row items-center gap-4">
              {/* Search */}
              <div className="relative w-full md:w-auto md:flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-sm font-medium outline-none transition-all focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(27,94,69,0.08)] placeholder:text-muted-foreground/40"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                    <X className="h-3.5 w-3.5 text-muted-foreground/50 hover:text-foreground transition-colors" />
                  </button>
                )}
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "h-9 px-4 rounded-xl text-xs font-bold transition-all border",
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort + View controls */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="relative">
                  <button
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                    className="h-9 px-4 rounded-xl border border-border bg-background text-xs font-bold flex items-center gap-2 hover:border-primary/30 transition-colors"
                  >
                    <Filter className="h-3.5 w-3.5" />
                    Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </button>
                  <AnimatePresence>
                    {showFilterMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-border bg-card shadow-xl z-20 p-1.5"
                      >
                        {(["date", "name", "size"] as const).map((opt) => (
                          <button
                            key={opt}
                            onClick={() => { setSortBy(opt); setShowFilterMenu(false); }}
                            className={cn(
                              "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                              sortBy === opt ? "bg-primary/8 text-primary" : "hover:bg-muted text-foreground/80"
                            )}
                          >
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                            {sortBy === opt && <Check className="h-3.5 w-3.5 text-primary" />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* View toggle */}
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  {(["list", "grid"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={cn(
                        "h-9 w-9 flex items-center justify-center text-xs transition-colors",
                        viewMode === mode ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {mode === "list"
                        ? <div className="flex flex-col gap-0.5"><div className="w-3.5 h-px bg-current rounded" /><div className="w-3.5 h-px bg-current rounded" /><div className="w-3.5 h-px bg-current rounded" /></div>
                        : <div className="grid grid-cols-2 gap-0.5"><div className="w-1.5 h-1.5 bg-current rounded-[2px]" /><div className="w-1.5 h-1.5 bg-current rounded-[2px]" /><div className="w-1.5 h-1.5 bg-current rounded-[2px]" /><div className="w-1.5 h-1.5 bg-current rounded-[2px]" /></div>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="px-6 py-3 border-b border-border/50 flex items-center justify-between bg-muted/10">
              <p className="text-xs font-semibold text-muted-foreground">
                Showing <span className="text-foreground font-bold">{filtered.length}</span> of <span className="text-foreground font-bold">{MOCK_DOCS.length}</span> documents
              </p>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
                <RefreshCw className="h-3 w-3" />
                Refresh
              </button>
            </div>

            {/* ── LIST VIEW ── */}
            <AnimatePresence mode="wait">
              {viewMode === "list" ? (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {filtered.length > 0 ? (
                    <div className="divide-y divide-border/60">
                      {filtered.map((doc, i) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                          className="group flex items-center gap-5 px-6 py-4 hover:bg-muted/30 transition-all cursor-pointer"
                          onClick={() => setPreviewDoc(doc)}
                        >
                          {/* Icon */}
                          <div className={cn(
                            "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all group-hover:scale-105",
                            doc.bg, "border-current/10"
                          )}>
                            <doc.icon className={cn("h-5.5 w-5.5", doc.color)} strokeWidth={1.5} />
                          </div>

                          {/* Name + meta */}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate leading-tight">
                              {doc.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-[10px] font-bold text-muted-foreground/50 uppercase">{doc.type}</span>
                              <span className="text-muted-foreground/25">·</span>
                              <span className="text-[10px] font-medium text-muted-foreground/50">{doc.pages} {doc.pages === 1 ? "page" : "pages"}</span>
                              <span className="text-muted-foreground/25">·</span>
                              <span className="text-[10px] font-medium text-muted-foreground/50">Ref: DOC-{doc.id.padStart(4, "0")}</span>
                            </div>
                          </div>

                          {/* Category */}
                          <div className="hidden md:block shrink-0">
                            <span className={cn("text-[10px] font-bold px-3 py-1.5 rounded-full border", CATEGORY_COLORS[doc.category] ?? "bg-muted text-muted-foreground border-border")}>
                              {doc.category}
                            </span>
                          </div>

                          {/* Size */}
                          <div className="hidden lg:block text-xs font-semibold text-muted-foreground w-16 text-center shrink-0">
                            {doc.size}
                          </div>

                          {/* Date */}
                          <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-muted-foreground shrink-0 w-28">
                            <Calendar className="h-3 w-3 shrink-0" />
                            {doc.date}
                          </div>

                          {/* Status */}
                          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                            {doc.status === "Verified" ? (
                              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-soft border border-primary/20">
                                <CheckCircle2 className="h-3 w-3 text-primary" />
                                <span className="text-[10px] font-bold text-primary">Verified</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                <span className="text-[10px] font-bold text-muted-foreground">Active</span>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <button
                              onClick={(e) => { e.stopPropagation(); setPreviewDoc(doc); }}
                              className="h-9 w-9 rounded-xl border border-border bg-background flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all"
                            >
                              <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="h-9 w-9 rounded-xl border border-border bg-background flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-all"
                            >
                              <Download className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState />
                  )}
                </motion.div>
              ) : (
                /* ── GRID VIEW ── */
                <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="p-6">
                  {filtered.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filtered.map((doc, i) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.04 }}
                          className="group rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer p-5 flex flex-col gap-4"
                          onClick={() => setPreviewDoc(doc)}
                        >
                          <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", doc.bg)}>
                            <doc.icon className={cn("h-6 w-6", doc.color)} strokeWidth={1.5} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">{doc.name}</p>
                            <p className="text-[10px] text-muted-foreground font-medium mt-1">{doc.date}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full border", CATEGORY_COLORS[doc.category] ?? "bg-muted text-muted-foreground border-border")}>
                              {doc.category}
                            </span>
                            <span className="text-[10px] text-muted-foreground/50 font-medium">{doc.size}</span>
                          </div>
                          {doc.status === "Verified" && (
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary">
                              <CheckCircle2 className="h-3 w-3" />Verified
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* ── RECENT ACTIVITY + QUICK ACTIONS ────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent activity */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="rounded-3xl border border-border bg-card p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/8 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Recent Activity</p>
                    <p className="text-[10px] text-muted-foreground/50 font-medium">Last 30 days</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs font-bold text-muted-foreground h-8 px-3 rounded-xl hover:text-primary">
                  View all <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-1">
                {[
                  { action: "Downloaded", doc: "Feb 2024 Rental Settlement Receipt", time: "2 hours ago", icon: Download, color: "text-blue-500" },
                  { action: "Viewed", doc: "Fully Executed Lease Agreement", time: "Yesterday", icon: Eye, color: "text-emerald-mid" },
                  { action: "Verified", doc: "Initial Deposit Receipt", time: "3 days ago", icon: ShieldCheck, color: "text-primary" },
                  { action: "Uploaded", doc: "Move-In Inspection Report", time: "Oct 13, 2023", icon: Upload, color: "text-violet-500" },
                  { action: "Signed", doc: "Fully Executed Lease Agreement", time: "Oct 12, 2023", icon: FileCheck, color: "text-amber-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-muted/40 transition-colors group cursor-pointer">
                    <div className={cn("h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0")}>
                      <item.icon className={cn("h-3.5 w-3.5", item.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        <span className="text-muted-foreground">{item.action} · </span>{item.doc}
                      </p>
                    </div>
                    <span className="text-[10px] text-muted-foreground/50 font-medium shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Quick Actions */}
          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-border bg-card p-6 flex flex-col gap-5 h-full">
              <div className="flex items-center gap-3 mb-1">
                <div className="h-9 w-9 rounded-xl bg-primary/8 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm">Quick Actions</p>
                  <p className="text-[10px] text-muted-foreground/50 font-medium">Common tasks</p>
                </div>
              </div>

              <div className="space-y-2.5 flex-1">
                {[
                  { label: "Request a Document", desc: "Ask your landlord for a file", icon: Bell, primary: true },
                  { label: "Download All", desc: "Export a ZIP of your vault", icon: Download, primary: false },
                  { label: "Share Document", desc: "Send securely via email", icon: ArrowUpRight, primary: false },
                  { label: "Report an Issue", desc: "Flag a missing document", icon: AlertCircle, primary: false },
                ].map((action, i) => (
                  <button
                    key={i}
                    className={cn(
                      "w-full flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all text-left hover:-translate-y-0.5 hover:shadow-sm",
                      action.primary
                        ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                        : "bg-muted/30 border-border hover:border-primary/20 hover:bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
                      action.primary ? "bg-primary/15" : "bg-background border border-border"
                    )}>
                      <action.icon className={cn("h-4 w-4", action.primary ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <div>
                      <p className={cn("text-xs font-bold", action.primary ? "text-primary" : "text-foreground")}>{action.label}</p>
                      <p className="text-[10px] text-muted-foreground/60 font-medium">{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Storage usage */}
              <div className="rounded-2xl bg-muted/30 border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-foreground">Storage Used</p>
                  <p className="text-xs font-bold text-primary">9.1 / 100 MB</p>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "9.1%" }}
                    transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-linear-to-r from-emerald-mid to-emerald-bright rounded-full"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground/50 font-medium mt-1.5">90.9 MB available</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── SECURITY BANNER ────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-border bg-card overflow-hidden relative">
            {/* Subtle emerald glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/4 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-border">
              {/* Left — copy */}
              <div className="p-8 space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-primary/8 border border-primary/15">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Vault Security</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-[-0.03em] mb-2">
                    Your documents are <span className="text-primary">always protected.</span>
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium max-w-sm">
                    Every file is encrypted at rest and in transit. Cryptographic hashes verify integrity on every access, so you always know your documents are authentic and untampered.
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  {[
                    { label: "Uptime", val: "99.9%" },
                    { label: "Retrieval", val: "< 14ms" },
                    { label: "Backups", val: "Daily" },
                  ].map((s, i) => (
                    <div key={i} className={cn("text-center", i > 0 && "pl-6 border-l border-border")}>
                      <p className="text-xl font-black text-foreground">{s.val}</p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-bold">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — compliance grid */}
              <div className="p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40 mb-5">Compliance Certifications</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "GDPR Compliant", icon: Shield, desc: "EU data regulation" },
                    { label: "SOC 2 Type II", icon: Lock, desc: "Security controls" },
                    { label: "AES-256 Storage", icon: Database, desc: "Military-grade encryption" },
                    { label: "ISO 27001", icon: Star, desc: "Info security certified" },
                    { label: "PCI DSS", icon: CreditCard, desc: "Payment card standard" },
                    { label: "Instant Access", icon: Zap, desc: "Always available" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl border border-border bg-background hover:border-primary/25 hover:bg-primary/3 transition-all group cursor-default">
                      <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                        <item.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold truncate">{item.label}</p>
                        <p className="text-[9px] text-muted-foreground/50 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

      </div>

      {/* ── PREVIEW DRAWER ─── */}
      {previewDoc && <DocumentPreviewDrawer doc={previewDoc} onClose={() => setPreviewDoc(null)} />}
    </TenantLayout>
  );
}

function EmptyState() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 px-6">
      <div className="h-20 w-20 rounded-3xl bg-muted/50 border border-border flex items-center justify-center">
        <FileCode className="h-10 w-10 text-muted-foreground/20" strokeWidth={1} />
      </div>
      <div className="space-y-1.5">
        <h4 className="text-lg font-black text-foreground">No documents found</h4>
        <p className="text-sm text-muted-foreground font-medium">Try adjusting your search or filter criteria</p>
      </div>
      <Button variant="outline" className="rounded-xl h-10 px-6 font-bold text-sm mt-2">
        Clear filters
      </Button>
    </div>
  );
}