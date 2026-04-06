"use client";

import React, { useState, useRef } from "react";
import TenantLayout from "@/components/TenantLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FileText,
  Download,
  Eye,
  Search,
  ShieldCheck,
  Clock,
  Calendar,
  CheckCircle2,
  Lock,
  Upload,
  RefreshCw,
  X,
  Folder,
  Activity,
  ArrowUpRight,
  Bell,
  CreditCard,
  AlertCircle,
  FileCheck,
  HardDrive,
  Share2,
  Grid3x3,
  List,
  MoreVertical,
  Filter,
  Database,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const MOCK_DOCS = [
  {
    id: "1",
    name: "Lease Agreement",
    type: "PDF",
    size: "2.4 MB",
    date: "Oct 12, 2023",
    category: "Legal",
    status: "Verified",
    pages: 14,
    icon: FileCheck,
    color: "#1B5E45",
    bgColor: "#E8F5EE",
  },
  {
    id: "2",
    name: "Property Maintenance Guidelines",
    type: "PDF",
    size: "1.1 MB",
    date: "Jan 05, 2024",
    category: "Rules",
    status: "Active",
    pages: 8,
    icon: FileText,
    color: "#D97706",
    bgColor: "#FEF3C7",
  },
  {
    id: "3",
    name: "Security Deposit Receipt",
    type: "PDF",
    size: "0.8 MB",
    date: "Oct 12, 2023",
    category: "Finance",
    status: "Verified",
    pages: 2,
    icon: CreditCard,
    color: "#2563EB",
    bgColor: "#DBEAFE",
  },
  {
    id: "4",
    name: "Emergency Procedures",
    type: "PDF",
    size: "4.2 MB",
    date: "Aug 20, 2023",
    category: "Safety",
    status: "Active",
    pages: 24,
    icon: AlertCircle,
    color: "#EF4444",
    bgColor: "#FEE2E2",
  },
  {
    id: "5",
    name: "Rent Receipt - February 2024",
    type: "PDF",
    size: "0.5 MB",
    date: "Feb 02, 2024",
    category: "Finance",
    status: "Verified",
    pages: 1,
    icon: FileCheck,
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
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
    color: "#1B5E45",
    bgColor: "#E8F5EE",
  },
  {
    id: "7",
    name: "Rent Receipt - March 2024",
    type: "PDF",
    size: "0.5 MB",
    date: "Mar 01, 2024",
    category: "Finance",
    status: "Verified",
    pages: 1,
    icon: FileCheck,
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
  },
];

const CATEGORIES = ["All", "Legal", "Finance", "Rules", "Safety"];

const CATEGORY_COLORS: Record<string, string> = {
  Legal: "bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20",
  Finance: "bg-blue-50 text-blue-700 border-blue-200",
  Rules: "bg-amber-50 text-amber-700 border-amber-200",
  Safety: "bg-red-50 text-red-600 border-red-200",
};

// ─── REVEAL ANIMATION ────────────────────────────────────────────────────────
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
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── DOCUMENT PREVIEW MODAL ──────────────────────────────────────────────────
function DocumentPreviewModal({
  doc,
  onClose,
}: {
  doc: (typeof MOCK_DOCS)[0] | null;
  onClose: () => void;
}) {
  if (!doc) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8F5EE] bg-[#FAFAF8] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: doc.bgColor, color: doc.color }}
              >
                <doc.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1A1A1A]">{doc.name}</h3>
                <p className="text-xs text-[#6B7280]">{doc.type} • {doc.size}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-[#E8F5EE]"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
            {/* Preview Placeholder */}
            <div className="rounded-xl border-2 border-dashed border-[#E8F5EE] bg-[#FAFAF8] aspect-[3/4] flex items-center justify-center">
              <div className="text-center space-y-3">
                <doc.icon className="w-16 h-16 mx-auto" style={{ color: doc.color }} strokeWidth={1} />
                <p className="text-sm font-semibold text-[#4B5563]">{doc.name}</p>
                <p className="text-xs text-[#6B7280]">{doc.pages} {doc.pages === 1 ? "page" : "pages"}</p>
              </div>
            </div>

            {/* Document Details */}
            <Card className="border-[#E8F5EE] bg-white">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-[#1A1A1A]">
                  Document Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "File Name", value: doc.name },
                  { label: "Category", value: doc.category },
                  { label: "Uploaded", value: doc.date },
                  { label: "File Size", value: doc.size },
                  { label: "Pages", value: `${doc.pages}` },
                  { label: "Document ID", value: `DOC-${doc.id.padStart(4, "0")}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280] font-medium">{label}</span>
                    <span className="font-semibold text-[#1A1A1A] text-right max-w-[200px] truncate">
                      {value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Verification Badge */}
            {doc.status === "Verified" && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#E8F5EE] border border-[#1B5E45]/20">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#1B5E45]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1B5E45]">Verified Document</p>
                  <p className="text-xs text-[#1B5E45]/70">Authenticated and secure</p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-[#E8F5EE] bg-[#FAFAF8] flex gap-3">
            <Button className="flex-1 bg-[#1B5E45] hover:bg-[#246B4F] text-white font-semibold">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" className="flex-1 border-[#E8F5EE] hover:bg-[#E8F5EE] font-semibold">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function TenantDocumentsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [previewDoc, setPreviewDoc] = useState<(typeof MOCK_DOCS)[0] | null>(null);

  const filtered = MOCK_DOCS.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || d.category === activeCategory;
    return matchSearch && matchCat;
  }).sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "size") return parseFloat(a.size) - parseFloat(b.size);
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const verified = MOCK_DOCS.filter((d) => d.status === "Verified").length;
  const totalPages = MOCK_DOCS.reduce((acc, d) => acc + d.pages, 0);
  const categories = [...new Set(MOCK_DOCS.map((d) => d.category))];
  const storageUsed = 9.1;
  const storageTotal = 100;

  return (
    <TenantLayout>
      <div 
        className="min-h-screen p-4 sm:p-6 lg:p-8"
        style={{ backgroundColor: "#FAFAF8" }}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <Reveal className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <Badge className="bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20 hover:bg-[#E8F5EE]">
                <HardDrive className="w-3 h-3 mr-1" />
                Document Vault
              </Badge>
              <h1 className="text-3xl font-bold text-[#1A1A1A]">
                My Documents
              </h1>
              <p className="text-sm text-[#6B7280]">
                All your lease, financial, and legal documents in one secure place
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 h-11 px-4 rounded-xl bg-white border border-[#E8F5EE]">
                <Lock className="w-4 h-4 text-[#1B5E45]" />
                <span className="text-xs font-semibold text-[#1B5E45]">AES-256 Encrypted</span>
              </div>
              <Button className="bg-[#1B5E45] hover:bg-[#246B4F] text-white font-semibold">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </Reveal>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                label: "Total Documents",
                value: MOCK_DOCS.length,
                sublabel: `${categories.length} categories`,
                icon: Folder,
                color: "#1B5E45",
                bgColor: "#E8F5EE",
              },
              {
                label: "Verified",
                value: verified,
                sublabel: `${Math.round((verified / MOCK_DOCS.length) * 100)}% verified`,
                icon: ShieldCheck,
                color: "#3DBE7A",
                bgColor: "#E8F5EE",
              },
              {
                label: "Total Pages",
                value: totalPages,
                sublabel: "All documents",
                icon: FileText,
                color: "#1B5E45",
                bgColor: "#E8F5EE",
              },
              {
                label: "Storage",
                value: `${storageUsed}MB`,
                sublabel: `${Math.round((storageUsed / storageTotal) * 100)}% used`,
                icon: Database,
                color: "#3DBE7A",
                bgColor: "#E8F5EE",
              },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className="border-[#E8F5EE] bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div
                        className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: stat.bgColor, color: stat.color }}
                      >
                        <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                      <h3 className="text-lg sm:text-2xl font-bold text-[#1A1A1A] truncate">{stat.value}</h3>
                      <p className="text-[10px] sm:text-xs font-medium text-[#6B7280] truncate">{stat.label}</p>
                      <p className="text-[10px] sm:text-xs text-[#6B7280]/60 truncate">{stat.sublabel}</p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* Main Document Vault */}
          <Reveal delay={0.15}>
            <Card className="border-[#E8F5EE] bg-white">
              {/* Toolbar */}
              <div className="p-5 border-b border-[#E8F5EE] bg-[#FAFAF8]">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                    <Input
                      placeholder="Search documents..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 h-11 border-[#E8F5EE] bg-white focus:border-[#1B5E45]"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <X className="h-4 w-4 text-[#6B7280] hover:text-[#1A1A1A]" />
                      </button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "h-9 px-4 rounded-lg text-xs font-semibold transition-all border",
                          activeCategory === cat
                            ? "bg-[#1B5E45] text-white border-[#1B5E45]"
                            : "border-[#E8F5EE] bg-white text-[#6B7280] hover:border-[#1B5E45]/30"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* View Controls */}
                  <div className="flex items-center gap-2">
                    <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                      <SelectTrigger className="w-32 h-9 border-[#E8F5EE] bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="size">Size</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex border border-[#E8F5EE] rounded-lg overflow-hidden">
                      {(["list", "grid"] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setViewMode(mode)}
                          className={cn(
                            "h-9 w-9 flex items-center justify-center transition-colors",
                            viewMode === mode
                              ? "bg-[#1B5E45] text-white"
                              : "bg-white text-[#6B7280] hover:bg-[#F4F4F0]"
                          )}
                        >
                          {mode === "list" ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Info */}
              <div className="px-6 py-3 border-b border-[#E8F5EE]/50 flex items-center justify-between bg-[#FAFAF8]/50">
                <p className="text-xs font-medium text-[#6B7280]">
                  Showing <span className="font-bold text-[#1A1A1A]">{filtered.length}</span> of{" "}
                  <span className="font-bold text-[#1A1A1A]">{MOCK_DOCS.length}</span> documents
                </p>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] hover:text-[#1B5E45] transition-colors">
                  <RefreshCw className="h-3 w-3" />
                  Refresh
                </button>
              </div>

              {/* Document List/Grid */}
              <AnimatePresence mode="wait">
                {viewMode === "list" ? (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {filtered.length > 0 ? (
                      <div className="divide-y divide-[#E8F5EE]">
                        {filtered.map((doc, i) => (
                          <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAFAF8] transition-colors cursor-pointer group"
                            onClick={() => setPreviewDoc(doc)}
                          >
                            {/* Icon */}
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                              style={{ backgroundColor: doc.bgColor, color: doc.color }}
                            >
                              <doc.icon className="w-5 h-5" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[#1A1A1A] truncate group-hover:text-[#1B5E45] transition-colors">
                                {doc.name}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-[#6B7280]">
                                <span>{doc.type}</span>
                                <span>•</span>
                                <span>{doc.pages} pages</span>
                                <span>•</span>
                                <span>DOC-{doc.id.padStart(4, "0")}</span>
                              </div>
                            </div>

                            {/* Category */}
                            <Badge
                              variant="outline"
                              className={cn(
                                "hidden sm:block",
                                CATEGORY_COLORS[doc.category]
                              )}
                            >
                              {doc.category}
                            </Badge>

                            {/* Size */}
                            <span className="hidden md:block text-sm font-medium text-[#6B7280] w-20 text-right">
                              {doc.size}
                            </span>

                            {/* Date */}
                            <div className="hidden lg:flex items-center gap-2 text-sm text-[#6B7280] w-32">
                              <Calendar className="w-4 h-4" />
                              {doc.date}
                            </div>

                            {/* Status */}
                            {doc.status === "Verified" && (
                              <Badge className="hidden sm:flex bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 hover:bg-[#E8F5EE]"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewDoc(doc);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 hover:bg-[#E8F5EE]"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState />
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6"
                  >
                    {filtered.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filtered.map((doc, i) => (
                          <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.03 }}
                            className="p-5 rounded-xl border border-[#E8F5EE] bg-white hover:border-[#1B5E45]/30 hover:shadow-md transition-all cursor-pointer group"
                            onClick={() => setPreviewDoc(doc)}
                          >
                            <div
                              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                              style={{ backgroundColor: doc.bgColor, color: doc.color }}
                            >
                              <doc.icon className="w-6 h-6" />
                            </div>
                            <p className="font-semibold text-sm text-[#1A1A1A] mb-2 line-clamp-2 group-hover:text-[#1B5E45] transition-colors">
                              {doc.name}
                            </p>
                            <p className="text-xs text-[#6B7280] mb-3">{doc.date}</p>
                            <div className="flex items-center justify-between">
                              <Badge
                                variant="outline"
                                className={cn("text-xs", CATEGORY_COLORS[doc.category])}
                              >
                                {doc.category}
                              </Badge>
                              <span className="text-xs text-[#6B7280]">{doc.size}</span>
                            </div>
                            {doc.status === "Verified" && (
                              <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#1B5E45]">
                                <CheckCircle2 className="w-3 h-3" />
                                Verified
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
            </Card>
          </Reveal>

          {/* Bottom Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Reveal delay={0.1} className="lg:col-span-2">
              <Card className="border-[#E8F5EE] bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#E8F5EE] flex items-center justify-center">
                        <Clock className="w-4 h-4 text-[#1B5E45]" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-bold text-[#1A1A1A]">
                          Recent Activity
                        </CardTitle>
                        <CardDescription className="text-xs">Last 30 days</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-[#1B5E45] hover:bg-[#E8F5EE]">
                      View All
                      <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { action: "Downloaded", doc: "Rent Receipt - February 2024", time: "2 hours ago", icon: Download },
                    { action: "Viewed", doc: "Lease Agreement", time: "Yesterday", icon: Eye },
                    { action: "Verified", doc: "Security Deposit Receipt", time: "3 days ago", icon: ShieldCheck },
                    { action: "Uploaded", doc: "Move-In Inspection Report", time: "Oct 13, 2023", icon: Upload },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FAFAF8] transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-[#F4F4F0] flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-[#1B5E45]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#1A1A1A] truncate">
                          <span className="text-[#6B7280]">{item.action} • </span>
                          {item.doc}
                        </p>
                      </div>
                      <span className="text-xs text-[#6B7280]">{item.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Reveal>

            {/* Quick Actions & Storage */}
            <Reveal delay={0.2}>
              <div className="space-y-6">
                <Card className="border-[#E8F5EE] bg-white">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#E8F5EE] flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[#1B5E45]" />
                      </div>
                      <CardTitle className="text-sm font-bold text-[#1A1A1A]">
                        Quick Actions
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { label: "Request Document", icon: Bell },
                      { label: "Download All", icon: Download },
                      { label: "Share Document", icon: Share2 },
                      { label: "Report Issue", icon: AlertCircle },
                    ].map((action, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="w-full justify-start border-[#E8F5EE] hover:bg-[#E8F5EE] hover:border-[#1B5E45]/20"
                      >
                        <action.icon className="w-4 h-4 mr-3 text-[#1B5E45]" />
                        {action.label}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-[#E8F5EE] bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-[#1A1A1A]">Storage Used</p>
                      <p className="text-sm font-bold text-[#1B5E45]">
                        {storageUsed} / {storageTotal} MB
                      </p>
                    </div>
                    <Progress value={(storageUsed / storageTotal) * 100} className="h-2 bg-[#F4F4F0]" />
                    <p className="text-xs text-[#6B7280] mt-2">
                      {(storageTotal - storageUsed).toFixed(1)} MB available
                    </p>
                  </CardContent>
                </Card>
              </div>
            </Reveal>
          </div>

          {/* Security Section */}
          <Reveal delay={0.15}>
            <Card className="border-[#E8F5EE] bg-white overflow-hidden">
              <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E8F5EE]">
                <div className="p-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E8F5EE]">
                    <ShieldCheck className="w-4 h-4 text-[#1B5E45]" />
                    <span className="text-xs font-semibold text-[#1B5E45]">Security</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">
                    Your documents are <span className="text-[#1B5E45]">protected</span>
                  </h2>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    All files are encrypted with AES-256 encryption. Documents are verified with
                    cryptographic hashes to ensure authenticity and integrity.
                  </p>
                  <div className="flex gap-6 pt-4">
                    {[
                      { label: "Uptime", value: "99.9%" },
                      { label: "Speed", value: "< 14ms" },
                      { label: "Backups", value: "Daily" },
                    ].map((stat, i) => (
                      <div key={i}>
                        <p className="text-xl font-bold text-[#1A1A1A]">{stat.value}</p>
                        <p className="text-xs text-[#6B7280]">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-xs font-semibold text-[#6B7280] uppercase mb-4">
                    Compliance
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "GDPR Compliant", icon: Shield },
                      { label: "SOC 2 Type II", icon: Lock },
                      { label: "AES-256 Storage", icon: Database },
                      { label: "ISO 27001", icon: Star },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-3 rounded-lg border border-[#E8F5EE] bg-[#FAFAF8] hover:border-[#1B5E45]/20 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#E8F5EE] flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-[#1B5E45]" />
                        </div>
                        <p className="text-xs font-semibold text-[#1A1A1A]">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <DocumentPreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
      )}
    </TenantLayout>
  );
}

function EmptyState() {
  return (
    <div className="py-16 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#F4F4F0] flex items-center justify-center">
        <FileText className="w-8 h-8 text-[#6B7280]" />
      </div>
      <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">No documents found</h3>
      <p className="text-sm text-[#6B7280] mb-4">
        Try adjusting your search or filters
      </p>
      <Button variant="outline" className="border-[#E8F5EE] hover:bg-[#E8F5EE]">
        Clear Filters
      </Button>
    </div>
  );
}