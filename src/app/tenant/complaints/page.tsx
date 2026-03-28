"use client";

import React, { useState, useRef, useEffect } from "react";
import TenantLayout from "@/components/TenantLayout";
import Modal from "@/components/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { mockComplaints, mockTenants } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import {
  AlertCircle, Plus, Search, CheckCircle2, Clock,
  CircleDot, ChevronRight, X, Calendar, Tag,
  Wrench, Wifi, Droplets, Zap, Shield, MoreHorizontal,
  MessageSquare, ArrowRight, ShieldCheck, Timer,
  CheckCheck, Filter, Download, Info, Settings,
  Activity, ZapIcon, DropletsIcon, WifiIcon, WrenchIcon, ShieldIcon,
  TrendingUp, Bell, Star, RefreshCw, Eye, FileText,
  ChevronDown, Paperclip, Send, ThumbsUp, AlertTriangle,
  Home, Hash, BarChart2, Layers, CircleCheck, Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

/* === types ================================================================ */
type Priority = "low" | "medium" | "high";
type Status   = "all" | "pending" | "in-progress" | "resolved";

/* === helpers =============================================================== */
function priorityConf(p: string) {
  if (p === "high")   return { label: "Critical",   dot: "#ef4444", bg: "#fef2f2", text: "#dc2626", border: "#fecaca", icon: Flame };
  if (p === "medium") return { label: "Standard",   dot: "#f59e0b", bg: "#fffbeb", text: "#d97706", border: "#fde68a", icon: AlertTriangle };
  return                     { label: "Low",         dot: "#3DBE7A", bg: "#f0fdf4", text: "#16a34a", border: "#bbf7d0", icon: CircleCheck };
}

function statusConf(s: string) {
  if (s === "resolved")    return { label: "Resolved",     Icon: CheckCheck,  color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", step: 3 };
  if (s === "in-progress") return { label: "In Progress",  Icon: Timer,       color: "#d97706", bg: "#fffbeb", border: "#fde68a", step: 2 };
  return                          { label: "Pending",       Icon: CircleDot,   color: "#dc2626", bg: "#fef2f2", border: "#fecaca", step: 1 };
}

const CATEGORIES = [
  { label: "Plumbing",    icon: <DropletsIcon className="w-5 h-5" />, color: "#3b82f6" },
  { label: "Electrical",  icon: <ZapIcon className="w-5 h-5" />,      color: "#f59e0b" },
  { label: "Internet",    icon: <WifiIcon className="w-5 h-5" />,     color: "#8b5cf6" },
  { label: "Maintenance", icon: <WrenchIcon className="w-5 h-5" />,   color: "#f97316" },
  { label: "Security",    icon: <ShieldIcon className="w-5 h-5" />,   color: "#ef4444" },
  { label: "Other",       icon: <MoreHorizontal className="w-5 h-5" />, color: "#6b7280" },
];

const SORT_OPTIONS = [
  { label: "Newest First",  value: "newest" },
  { label: "Oldest First",  value: "oldest" },
  { label: "High Priority", value: "priority" },
  { label: "Status",        value: "status"   },
];

/* === Reveal =============================================================== */
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* === Progress Ring ======================================================= */
function Ring({ pct, size = 56, stroke = 5, color = "#3DBE7A", bg = "#e8f5ee" }: {
  pct: number; size?: number; stroke?: number; color?: string; bg?: string;
}) {
  const r    = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
    </svg>
  );
}

/* === Stat Card ============================================================ */
function StatCard({ label, value, sub, icon: Icon, accent, warn, danger, delay = 0 }: any) {
  return (
    <Reveal delay={delay}>
      <div className={cn(
        "relative rounded-2xl p-6 border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-default",
        accent  ? "bg-[#1B5E45] border-[#246B4F] text-white"
        : danger  ? "bg-[#fef2f2] border-[#fecaca]"
        : warn    ? "bg-[#fffbeb] border-[#fde68a]"
        :           "bg-white border-[#E0E8E3] shadow-sm"
      )}>
        {/* soft dot pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "18px 18px" }} />

        <div className="relative z-10 flex items-start justify-between">
          <div>
            <p className={cn("text-[10px] font-semibold uppercase tracking-widest mb-3",
              accent ? "text-[#7FD9A8]" : "text-[#6B7280]"
            )}>{label}</p>
            <p className={cn("text-3xl font-bold tracking-tight",
              accent ? "text-white" : danger ? "text-[#dc2626]" : warn ? "text-[#d97706]" : "text-[#1A1A1A]"
            )}>{value}</p>
            {sub && <p className={cn("text-xs mt-1", accent ? "text-[#7FD9A8]" : "text-[#6B7280]")}>{sub}</p>}
          </div>
          {Icon && (
            <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
              accent ? "bg-white/10" : danger ? "bg-[#fecaca]" : warn ? "bg-[#fde68a]" : "bg-[#E8F5EE]"
            )}>
              <Icon className={cn("h-5 w-5", accent ? "text-[#3DBE7A]" : danger ? "text-[#dc2626]" : warn ? "text-[#d97706]" : "text-[#1B5E45]")} />
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* === Timeline Step ======================================================== */
function TimelineStep({ step, currentStep }: { step: { label: string; desc: string }; idx: number; currentStep: number; index: number }) {
  // re-declared below in usage
  return null;
}

/* === Main Page ============================================================ */
export default function TenantComplaintsPage() {
  const { userName } = useAuth();
  const currentTenant = mockTenants[0];
  const myComplaints  = mockComplaints.filter(c => c.tenantId === currentTenant.id);

  const [filter, setFilter]     = useState<Status>("all");
  const [search, setSearch]     = useState("");
  const [sortBy, setSortBy]     = useState("newest");
  const [selected, setSelected] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "timeline" | "messages">("details");

  /* form state */
  const [form, setForm] = useState({
    title: "", category: "", priority: "medium" as Priority,
    description: "", attachment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [followUpMsg, setFollowUpMsg] = useState("");
  const [rating, setRating] = useState(0);

  /* stats */
  const total       = myComplaints.length;
  const pending     = myComplaints.filter(c => c.status === "pending").length;
  const inProgress  = myComplaints.filter(c => c.status === "in-progress").length;
  const resolved    = myComplaints.filter(c => c.status === "resolved").length;
  const resolvePct  = total ? Math.round((resolved / total) * 100) : 0;
  const avgResponse = "18h";

  /* filtering + sorting */
  const filtered = myComplaints
    .filter(c => {
      const matchStatus = filter === "all" || c.status === filter;
      const matchSearch = `${c.title} ${c.category} ${c.description}`.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        const order = { high: 0, medium: 1, low: 2 };
        return (order[a.priority as Priority] ?? 2) - (order[b.priority as Priority] ?? 2);
      }
      if (sortBy === "status") {
        const order = { pending: 0, "in-progress": 1, resolved: 2 };
        return (order[a.status as any] ?? 0) - (order[b.status as any] ?? 0);
      }
      return 0;
    });

  const handleSubmit = () => {
    if (!form.title || !form.category || !form.description) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setForm({ title: "", category: "", priority: "medium", description: "", attachment: "" });
    }, 2500);
  };

  const TABS = [
    { key: "details",   label: "Details",   icon: FileText },
    { key: "timeline",  label: "Timeline",  icon: Activity },
    { key: "messages",  label: "Messages",  icon: MessageSquare },
  ] as const;

  return (
    <TenantLayout>
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="p-6 md:p-8 space-y-10 max-w-[1400px] mx-auto">

          {/* ── HEADER ─────────────────────────────────────────────────── */}
          <Reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-1">
                <div className="h-9 w-9 rounded-xl bg-[#E8F5EE] border border-[#C4D4C9] flex items-center justify-center">
                  <AlertCircle className="h-4.5 w-4.5 text-[#1B5E45]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#6B7280]">
                  Service Requests
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight">
                Maintenance &amp; Support
              </h1>
              <p className="text-sm text-[#6B7280]">
                Track, manage and communicate all your property service requests.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="h-11 w-11 rounded-xl border border-[#E0E8E3] bg-white flex items-center justify-center hover:border-[#1B5E45] hover:bg-[#E8F5EE] transition-all shadow-sm relative">
                <Bell className="h-4 w-4 text-[#1B5E45]" />
                {pending > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#ef4444] text-white text-[9px] font-bold flex items-center justify-center">
                    {pending}
                  </span>
                )}
              </button>
              <Button
                onClick={() => setShowForm(true)}
                className="h-11 px-6 rounded-xl bg-[#1B5E45] text-white font-semibold text-sm hover:bg-[#246B4F] hover:shadow-lg hover:shadow-[#1B5E45]/20 hover:-translate-y-0.5 transition-all gap-2 shadow-md shadow-[#1B5E45]/15"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                New Request
              </Button>
            </div>
          </Reveal>

          {/* ── KPI STRIP ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Requests"        value={total}       sub="All time"           icon={Layers}        accent  delay={0.05} />
            <StatCard label="In Progress"           value={inProgress}  sub="Being worked on"    icon={Timer}         warn={inProgress > 0}   delay={0.1} />
            <StatCard label="Pending Review"        value={pending}     sub="Awaiting response"  icon={AlertCircle}   danger={pending > 0}    delay={0.15} />
            <StatCard label="Resolution Rate"       value={`${resolvePct}%`} sub={`${resolved} resolved`} icon={TrendingUp} delay={0.2} />
          </div>

          {/* ── RESOLUTION BANNER ─────────────────────────────────────── */}
          <Reveal delay={0.25}>
            <div className="rounded-2xl border border-[#E0E8E3] bg-white shadow-sm overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row items-center gap-6">

                {/* Ring */}
                <div className="relative flex-shrink-0">
                  <Ring pct={resolvePct} size={96} stroke={9} color="#3DBE7A" bg="#E8F5EE" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-[#1B5E45] leading-none">{resolvePct}%</span>
                    <span className="text-[8px] font-semibold uppercase text-[#6B7280] mt-0.5">Done</span>
                  </div>
                </div>

                {/* Bar */}
                <div className="flex-1 space-y-3 w-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#1A1A1A]">Overall Resolution Progress</h3>
                      <p className="text-xs text-[#6B7280] mt-0.5">{resolved} of {total} requests resolved</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5E45] bg-[#E8F5EE] px-3 py-1.5 rounded-full border border-[#C4D4C9]">
                      On Track
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#E8F5EE] overflow-hidden relative">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#246B4F] to-[#3DBE7A]"
                      initial={{ width: 0 }}
                      animate={{ width: `${resolvePct}%` }}
                      transition={{ duration: 1.3, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="flex gap-4 pt-1">
                    {[
                      { label: "Pending",     count: pending,    color: "#ef4444", bg: "#fef2f2" },
                      { label: "In Progress", count: inProgress, color: "#d97706", bg: "#fffbeb" },
                      { label: "Resolved",    count: resolved,   color: "#16a34a", bg: "#f0fdf4" },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                        <span className="text-[11px] text-[#6B7280]">{item.count} {item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SLA tiles */}
                <div className="grid grid-cols-2 gap-3 flex-shrink-0">
                  {[
                    { label: "Avg Response", value: avgResponse, icon: Clock },
                    { label: "Satisfaction", value: "4.8 / 5", icon: Star },
                  ].map((m, i) => (
                    <div key={i} className="p-4 rounded-xl border border-[#E0E8E3] bg-[#FAFAF8] text-center">
                      <m.icon className="h-4 w-4 text-[#3DBE7A] mx-auto mb-2" />
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-[#6B7280]">{m.label}</p>
                      <p className="text-sm font-bold text-[#1A1A1A] mt-0.5">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── QUICK CATEGORY CHIPS ─────────────────────────────────── */}
          <Reveal delay={0.28}>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setFilter("all")}
                className={cn(
                  "flex-shrink-0 h-9 px-4 rounded-full text-xs font-semibold border transition-all",
                  filter === "all"
                    ? "bg-[#1B5E45] text-white border-[#1B5E45] shadow-md shadow-[#1B5E45]/20"
                    : "bg-white border-[#E0E8E3] text-[#6B7280] hover:border-[#1B5E45] hover:text-[#1B5E45]"
                )}
              >
                All ({total})
              </button>
              {CATEGORIES.map(cat => {
                const count = myComplaints.filter(c => c.category === cat.label).length;
                if (count === 0) return null;
                return (
                  <button key={cat.label}
                    className="flex-shrink-0 h-9 px-4 rounded-full text-xs font-semibold border bg-white border-[#E0E8E3] text-[#6B7280] hover:border-[#1B5E45] hover:text-[#1B5E45] transition-all flex items-center gap-1.5"
                  >
                    <span style={{ color: cat.color }}>{cat.icon}</span>
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* ── TOOLBAR ───────────────────────────────────────────────── */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-sm group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280] group-focus-within:text-[#1B5E45] transition-colors" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E0E8E3] bg-white text-sm text-[#1A1A1A] placeholder:text-[#6B7280] outline-none focus:border-[#1B5E45] focus:shadow-[0_0_0_3px_rgba(27,94,69,0.1)] transition-all shadow-sm"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="h-3.5 w-3.5 text-[#6B7280] hover:text-[#1A1A1A]" />
                  </button>
                )}
              </div>

              {/* Status filter pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {(["all", "pending", "in-progress", "resolved"] as Status[]).map(f => {
                  const active = filter === f;
                  const count  = f === "all" ? total : myComplaints.filter(c => c.status === f).length;
                  const colors = {
                    all:         { a: "#1B5E45", ring: "#E8F5EE" },
                    pending:     { a: "#dc2626", ring: "#fef2f2" },
                    "in-progress": { a: "#d97706", ring: "#fffbeb" },
                    resolved:    { a: "#16a34a", ring: "#f0fdf4" },
                  }[f];
                  return (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={cn(
                        "flex-shrink-0 h-9 px-4 rounded-full text-xs font-semibold border transition-all",
                        active
                          ? "text-white border-transparent shadow-md"
                          : "bg-white border-[#E0E8E3] text-[#6B7280] hover:border-current"
                      )}
                      style={active ? { background: colors?.a, boxShadow: `0 4px 12px ${colors?.a}30` } : {}}
                    >
                      {f === "in-progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}{" "}
                      <span className={active ? "opacity-75" : "opacity-50"}>· {count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sort */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setShowSort(s => !s)}
                  className="h-9 px-4 rounded-xl border border-[#E0E8E3] bg-white text-xs font-semibold text-[#6B7280] hover:border-[#1B5E45] hover:text-[#1B5E45] transition-all flex items-center gap-2 shadow-sm"
                >
                  <Filter className="h-3.5 w-3.5" />
                  Sort
                  <ChevronDown className={cn("h-3 w-3 transition-transform", showSort && "rotate-180")} />
                </button>
                {showSort && (
                  <div className="absolute right-0 top-11 z-50 w-44 rounded-xl border border-[#E0E8E3] bg-white shadow-xl overflow-hidden">
                    {SORT_OPTIONS.map(opt => (
                      <button key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                        className={cn(
                          "w-full px-4 py-2.5 text-left text-xs font-medium hover:bg-[#E8F5EE] hover:text-[#1B5E45] transition-colors",
                          sortBy === opt.value ? "text-[#1B5E45] bg-[#E8F5EE] font-semibold" : "text-[#6B7280]"
                        )}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* ── CARDS GRID ────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((complaint, i) => {
                const p = priorityConf(complaint.priority);
                const s = statusConf(complaint.status);
                const cat = CATEGORIES.find(c => c.label === complaint.category);
                return (
                  <motion.div
                    key={complaint.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    onClick={() => setSelected(complaint)}
                    className="group relative bg-white rounded-2xl border border-[#E0E8E3] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Priority accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: p.dot }} />

                    <div className="p-5 space-y-4">
                      {/* Row 1: category + ID */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: `${cat?.color}15` }}>
                            <span style={{ color: cat?.color }}>{cat?.icon || <MoreHorizontal className="w-4 h-4" />}</span>
                          </div>
                          <span className="text-[11px] font-semibold text-[#6B7280]">{complaint.category}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#6B7280]/50">#{complaint.id.split('-').pop()}</span>
                      </div>

                      {/* Title + description */}
                      <div className="space-y-1.5">
                        <h3 className="text-[15px] font-bold text-[#1A1A1A] leading-snug group-hover:text-[#1B5E45] transition-colors line-clamp-1">
                          {complaint.title}
                        </h3>
                        <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                          {complaint.description}
                        </p>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-[10px] text-[#6B7280]/60">
                        <Calendar className="h-3 w-3" />
                        {complaint.createdDate}
                      </div>

                      {/* Footer: badges + arrow */}
                      <div className="pt-3 border-t border-[#E0E8E3] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* Status badge */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold"
                            style={{ background: s.bg, borderColor: s.border, color: s.color }}>
                            <s.Icon className="h-3 w-3" />
                            {s.label}
                          </div>
                          {/* Priority badge */}
                          <div className="px-2.5 py-1 rounded-full border text-[10px] font-semibold"
                            style={{ background: p.bg, borderColor: p.border, color: p.text }}>
                            {p.label}
                          </div>
                        </div>
                        <div className="h-8 w-8 rounded-lg bg-[#F4F9F6] flex items-center justify-center group-hover:bg-[#1B5E45] group-hover:text-white transition-all">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-5">
                <div className="h-20 w-20 rounded-2xl bg-[#E8F5EE] border border-[#C4D4C9] flex items-center justify-center">
                  <ShieldCheck className="h-10 w-10 text-[#3DBE7A]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1A1A1A]">All Clear!</h4>
                  <p className="text-sm text-[#6B7280] mt-1">No requests match your current filters.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { setFilter("all"); setSearch(""); }}
                    className="h-10 px-5 rounded-xl border border-[#E0E8E3] text-sm font-medium text-[#6B7280] hover:border-[#1B5E45] hover:text-[#1B5E45] transition-all bg-white">
                    Clear Filters
                  </button>
                  <Button onClick={() => setShowForm(true)}
                    className="h-10 px-5 rounded-xl bg-[#1B5E45] text-white text-sm font-medium hover:bg-[#246B4F]">
                    New Request
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          DETAIL MODAL
      ══════════════════════════════════════════════════════════════════ */}
      <Modal isOpen={!!selected} onClose={() => { setSelected(null); setActiveTab("details"); setRating(0); setFollowUpMsg(""); }} size="4xl">
        {selected && (() => {
          const p = priorityConf(selected.priority);
          const s = statusConf(selected.status);
          const progressPct = s.step === 3 ? 100 : s.step === 2 ? 55 : 10;

          const TIMELINE_STEPS = [
            { label: "Submitted",    desc: "Request received and logged",               date: selected.createdDate,    done: true },
            { label: "Under Review", desc: "Management reviewed the request",           date: selected.createdDate,    done: s.step >= 2 },
            { label: "In Progress",  desc: "Technician assigned and working",           date: "Today, 09:42 AM",       done: s.step >= 2 },
            { label: "Resolved",     desc: "Issue fixed and marked complete",           date: s.step === 3 ? "Today" : "—", done: s.step === 3 },
          ];

          return (
            <div className="flex flex-col h-full max-h-[90vh] bg-white rounded-2xl overflow-hidden">

              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-[#E0E8E3] bg-[#FAFAF8] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${p.dot}, transparent)` }} />
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${CATEGORIES.find(c => c.label === selected.category)?.color}15` }}>
                      <span style={{ color: CATEGORIES.find(c => c.label === selected.category)?.color }}>
                        {CATEGORIES.find(c => c.label === selected.category)?.icon}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">{selected.category}</span>
                        <div className="px-2 py-0.5 rounded-full border text-[9px] font-bold"
                          style={{ background: p.bg, borderColor: p.border, color: p.text }}>
                          {p.label}
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold"
                          style={{ background: s.bg, borderColor: s.border, color: s.color }}>
                          <s.Icon className="h-2.5 w-2.5" />
                          {s.label}
                        </div>
                      </div>
                      <h2 className="text-lg font-bold text-[#1A1A1A]">{selected.title}</h2>
                      <p className="text-xs text-[#6B7280] mt-0.5 flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" /> Reported {selected.createdDate}
                        <span className="mx-1 text-[#E0E8E3]">·</span>
                        <Hash className="h-3 w-3" /> {selected.id.split('-').pop()}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => { setSelected(null); setActiveTab("details"); }}
                    className="h-9 w-9 rounded-xl border border-[#E0E8E3] flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mt-5">
                  {TABS.map(tab => (
                    <button key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all",
                        activeTab === tab.key
                          ? "bg-[#1B5E45] text-white shadow-md shadow-[#1B5E45]/20"
                          : "text-[#6B7280] hover:bg-[#E8F5EE] hover:text-[#1B5E45]"
                      )}>
                      <tab.icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "details" && (
                    <motion.div key="details"
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6">

                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                        {/* Description */}
                        <div className="lg:col-span-3 space-y-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-2">Description</p>
                            <div className="p-5 rounded-xl bg-[#FAFAF8] border border-[#E0E8E3] text-sm text-[#1A1A1A] leading-relaxed">
                              {selected.description}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { label: "Request ID",  value: `#${selected.id.split('-').pop()}` },
                              { label: "Unit",        value: `Unit ${selected.unitId?.split('-').pop() ?? "—"}` },
                              { label: "Category",    value: selected.category },
                              { label: "Submitted",   value: selected.createdDate },
                            ].map((item, i) => (
                              <div key={i} className="p-4 rounded-xl border border-[#E0E8E3] bg-[#FAFAF8]">
                                <p className="text-[9px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">{item.label}</p>
                                <p className="text-sm font-semibold text-[#1A1A1A]">{item.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Progress panel */}
                        <div className="lg:col-span-2 rounded-2xl bg-[#1B5E45] text-white p-5 relative overflow-hidden flex flex-col justify-between">
                          <div className="absolute top-0 right-0 h-32 w-32 bg-[#3DBE7A]/20 blur-[50px] rounded-full -mr-8 -mt-8" />
                          <div className="relative z-10 space-y-5">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#7FD9A8]">Resolution Progress</p>
                            <div className="flex items-center gap-5">
                              <div className="relative flex-shrink-0">
                                <Ring pct={progressPct} size={72} stroke={7} color="#3DBE7A" bg="rgba(255,255,255,0.1)" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-sm font-bold">{progressPct}%</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-base font-bold capitalize">{selected.status.replace('-', ' ')}</p>
                                <p className="text-xs text-white/50 mt-0.5">
                                  {s.step === 3 ? "Completed successfully" : "Work in progress"}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              {["Submitted", "In Review", "In Progress", "Resolved"].map((step, i) => (
                                <div key={step} className="flex items-center gap-3">
                                  <div className={cn(
                                    "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-bold",
                                    i < s.step ? "bg-[#3DBE7A] text-white" : i === s.step - 1 ? "bg-[#3DBE7A] text-white ring-2 ring-[#3DBE7A]/30" : "bg-white/10 text-white/30"
                                  )}>
                                    {i < s.step ? "✓" : i + 1}
                                  </div>
                                  <span className={cn("text-xs", i < s.step ? "text-white" : "text-white/30")}>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="pt-4 border-t border-white/10 relative z-10 mt-4">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-white/40">SLA Target</span>
                              <span className="text-[#3DBE7A] font-semibold">24 hours</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Rate if resolved */}
                      {selected.status === "resolved" && (
                        <div className="p-5 rounded-xl border border-[#E0E8E3] bg-[#FAFAF8]">
                          <p className="text-sm font-semibold text-[#1A1A1A] mb-3">Rate this resolution</p>
                          <div className="flex gap-2">
                            {[1,2,3,4,5].map(star => (
                              <button key={star} onClick={() => setRating(star)}>
                                <Star className={cn("h-6 w-6 transition-all", rating >= star ? "fill-[#f59e0b] text-[#f59e0b]" : "text-[#E0E8E3] hover:text-[#f59e0b]")} />
                              </button>
                            ))}
                            {rating > 0 && <span className="text-xs text-[#6B7280] self-center ml-2">Thanks for your feedback!</span>}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "timeline" && (
                    <motion.div key="timeline"
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-4">Activity Timeline</p>
                      {[
                        { t: "Request Submitted",      desc: "You submitted this maintenance request.",      date: selected.createdDate, icon: FileText,  done: true },
                        { t: "Acknowledged",            desc: "Property management received and reviewed.",  date: selected.createdDate, icon: Eye,        done: s.step >= 2 },
                        { t: "Technician Dispatched",   desc: "A technician has been assigned to your unit.", date: "Today, 09:42 AM",   icon: Wrench,     done: s.step >= 2 },
                        { t: "Work In Progress",        desc: "Technician is actively working on the issue.", date: "Today, 10:15 AM",   icon: RefreshCw,  done: s.step >= 2 },
                        { t: "Issue Resolved",          desc: "The issue has been fixed and closed.",         date: s.step === 3 ? "Today, 2:00 PM" : "Pending", icon: CheckCircle2, done: s.step === 3 },
                      ].map((log, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className={cn(
                              "h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                              log.done ? "bg-[#E8F5EE] border border-[#C4D4C9]" : "bg-[#F4F4F0] border border-[#E0E8E3]"
                            )}>
                              <log.icon className={cn("h-4 w-4", log.done ? "text-[#1B5E45]" : "text-[#6B7280]/30")} />
                            </div>
                            {i < 4 && <div className={cn("w-0.5 h-6 mt-1", log.done ? "bg-[#C4D4C9]" : "bg-[#E0E8E3]")} />}
                          </div>
                          <div className={cn("flex-1 pb-4", !log.done && "opacity-40")}>
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-semibold text-[#1A1A1A]">{log.t}</p>
                              <span className="text-[10px] text-[#6B7280]">{log.date}</span>
                            </div>
                            <p className="text-xs text-[#6B7280] mt-0.5">{log.desc}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === "messages" && (
                    <motion.div key="messages"
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-4">Communication Thread</p>

                      {/* Sample messages */}
                      <div className="space-y-4">
                        <div className="flex gap-3 justify-end">
                          <div className="max-w-[70%]">
                            <div className="bg-[#1B5E45] text-white p-3.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed">
                              {selected.description}
                            </div>
                            <p className="text-[10px] text-[#6B7280] mt-1 text-right">{selected.createdDate} · You</p>
                          </div>
                        </div>
                        {s.step >= 2 && (
                          <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-[#E8F5EE] border border-[#C4D4C9] flex items-center justify-center flex-shrink-0">
                              <ShieldCheck className="h-4 w-4 text-[#1B5E45]" />
                            </div>
                            <div className="max-w-[70%]">
                              <div className="bg-[#F4F9F6] border border-[#E0E8E3] p-3.5 rounded-2xl rounded-tl-sm text-sm text-[#1A1A1A] leading-relaxed">
                                Thank you for reporting this. We've dispatched a technician and they'll be at your unit within the next 24 hours.
                              </div>
                              <p className="text-[10px] text-[#6B7280] mt-1">Today, 09:45 AM · Management</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Message input */}
                      <div className="sticky bottom-0 pt-4 bg-white">
                        <div className="flex gap-2 p-3 rounded-xl border border-[#E0E8E3] bg-[#FAFAF8]">
                          <input
                            type="text"
                            placeholder="Add a follow-up message..."
                            value={followUpMsg}
                            onChange={e => setFollowUpMsg(e.target.value)}
                            className="flex-1 bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#6B7280] outline-none"
                          />
                          <button className="h-8 w-8 rounded-lg bg-[#1B5E45] flex items-center justify-center text-white hover:bg-[#246B4F] transition-colors disabled:opacity-40"
                            disabled={!followUpMsg.trim()}>
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-[#E0E8E3] bg-[#FAFAF8] flex items-center gap-3">
                <Button className="flex-1 h-10 rounded-xl bg-[#1B5E45] text-white font-semibold text-sm hover:bg-[#246B4F] hover:shadow-md transition-all">
                  Submit Follow-up
                </Button>
                <Button variant="outline" className="h-10 px-5 rounded-xl border-[#E0E8E3] text-sm font-semibold text-[#6B7280] hover:border-[#1B5E45] hover:text-[#1B5E45]"
                  onClick={() => { setSelected(null); setActiveTab("details"); }}>
                  Close
                </Button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* ══════════════════════════════════════════════════════════════════
          NEW REQUEST MODAL
      ══════════════════════════════════════════════════════════════════ */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} size="2xl">
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E0E8E3] bg-[#FAFAF8]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-[#1B5E45] flex items-center justify-center shadow-lg shadow-[#1B5E45]/20">
                  <Plus className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1A1A1A]">New Service Request</h2>
                  <p className="text-xs text-[#6B7280]">Tell us what needs to be fixed</p>
                </div>
              </div>
              <button onClick={() => setShowForm(false)}
                className="h-9 w-9 rounded-xl border border-[#E0E8E3] flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-5">
                  <div className="h-20 w-20 rounded-2xl bg-[#E8F5EE] border border-[#C4D4C9] flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-[#3DBE7A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A]">Request Submitted!</h3>
                    <p className="text-sm text-[#6B7280] mt-1">We'll get back to you within 24 hours.</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAFAF8] border border-[#E0E8E3]">
                    <Clock className="h-4 w-4 text-[#3DBE7A]" />
                    <span className="text-xs text-[#6B7280]">Expected response: <strong className="text-[#1B5E45]">&lt; 24 hours</strong></span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form" className="space-y-6">

                  {/* Title + Priority side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Kitchen tap leaking"
                        value={form.title}
                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E0E8E3] bg-[#FAFAF8] text-sm text-[#1A1A1A] placeholder:text-[#6B7280] outline-none focus:border-[#1B5E45] focus:shadow-[0_0_0_3px_rgba(27,94,69,0.1)] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Priority *</label>
                      <div className="flex gap-2">
                        {(["low", "medium", "high"] as Priority[]).map(pLevel => {
                          const conf    = priorityConf(pLevel);
                          const isActive = form.priority === pLevel;
                          return (
                            <button key={pLevel}
                              onClick={() => setForm(f => ({ ...f, priority: pLevel }))}
                              className="flex-1 py-2.5 rounded-xl border text-xs font-semibold transition-all"
                              style={isActive ? {
                                background: conf.bg,
                                borderColor: conf.border,
                                color: conf.text,
                                boxShadow: `0 2px 8px ${conf.dot}25`
                              } : {
                                background: "#FAFAF8",
                                borderColor: "#E0E8E3",
                                color: "#6B7280"
                              }}>
                              {conf.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Category grid */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Category *</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {CATEGORIES.map(cat => {
                        const isActive = form.category === cat.label;
                        return (
                          <button key={cat.label}
                            onClick={() => setForm(f => ({ ...f, category: cat.label }))}
                            className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all"
                            style={isActive ? {
                              background: `${cat.color}10`,
                              borderColor: cat.color,
                            } : {
                              background: "#FAFAF8",
                              borderColor: "#E0E8E3",
                            }}>
                            <span style={{ color: isActive ? cat.color : "#6B7280" }}>{cat.icon}</span>
                            <span className="text-[9px] font-semibold" style={{ color: isActive ? cat.color : "#6B7280" }}>
                              {cat.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Description *</label>
                    <textarea
                      rows={4}
                      placeholder="Describe the issue in detail — when it started, what you've tried, etc."
                      value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E8E3] bg-[#FAFAF8] text-sm text-[#1A1A1A] placeholder:text-[#6B7280] outline-none focus:border-[#1B5E45] focus:shadow-[0_0_0_3px_rgba(27,94,69,0.1)] transition-all resize-none"
                    />
                    <p className="text-[10px] text-[#6B7280] text-right">{form.description.length} / 500</p>
                  </div>

                  {/* Attachment */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Attachment (optional)</label>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-[#C4D4C9] bg-[#F4F9F6] hover:border-[#1B5E45] hover:bg-[#E8F5EE] transition-all cursor-pointer">
                      <Paperclip className="h-4 w-4 text-[#1B5E45]" />
                      <span className="text-xs text-[#6B7280]">Attach a photo or document</span>
                    </div>
                  </div>

                  {/* Info bar */}
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-[#E8F5EE] border border-[#C4D4C9]">
                    <Info className="h-4 w-4 text-[#1B5E45] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-[#1B5E45] leading-relaxed">
                      Our team will review your request within <strong>2 hours</strong> and respond with an action plan. For emergencies, please call the front desk directly.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleSubmit}
                      disabled={!form.title || !form.category || !form.description}
                      className="flex-1 h-11 rounded-xl bg-[#1B5E45] text-white font-semibold text-sm hover:bg-[#246B4F] hover:shadow-lg hover:shadow-[#1B5E45]/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed gap-2">
                      <Send className="h-4 w-4" />
                      Submit Request
                    </Button>
                    <Button variant="outline"
                      className="h-11 px-5 rounded-xl border-[#E0E8E3] text-sm font-semibold text-[#6B7280] hover:border-[#1B5E45] hover:text-[#1B5E45]"
                      onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Modal>
    </TenantLayout>
  );
}