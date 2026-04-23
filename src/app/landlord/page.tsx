"use client";

import React, { useRef } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import {
  Building2,
  Home,
  Users,
  AlertCircle,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Activity,
  BarChart3,
  ChevronRight,
  TrendingDown,
  Calendar,
  Download,
  Zap,
  MapPin,
  Bell,
  Settings,
  MoreHorizontal,
  ArrowRight,
  CheckCircle2,
  Clock,
  Wrench,
  Receipt,
  Eye,
  FileText,
} from "lucide-react";
import { getLandlordStats, mockPayments, mockComplaints } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const CustomMoneyIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url(/wallet.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/wallet.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomWrenchIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
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

const CustomNotificationIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url("/ringing.png")', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url("/ringing.png")', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomHomeIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
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
);

// --- Reveal ----------------------------------------------------------------
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
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- Hero Mini Stat --------------------------------------------------------
function HeroMiniStat({
  icon: Icon,
  label,
  value,
  highlight = false,
  danger = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
          highlight ? "bg-[#1B5E45]" : danger ? "bg-red-50" : "bg-[#F0F5F1]",
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4",
            highlight ? "text-white" : danger ? "text-red-500" : "text-[#1B5E45]",
          )}
          strokeWidth={1.8}
        />
      </div>
      <div>
        <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground leading-none mb-0.5">
          {label}
        </p>
        <p
          className={cn(
            "text-sm font-medium leading-none",
            danger ? "text-red-600" : "text-foreground",
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// --- KPI Card --------------------------------------------------------------
function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  accent = false,
  danger = false,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: { value: number; isPositive: boolean };
  accent?: boolean;
  danger?: boolean;
}) {
  return (
    <Card
      className={cn(
        "rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden relative",
        accent
          ? "bg-[#1B5E45] border-[#1B5E45]"
          : "bg-white border-border",
      )}
    >
      {accent && (
        <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/5" />
      )}
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105",
              accent ? "bg-white/15" : danger ? "bg-red-50" : "bg-[#E8F5EE]",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                accent ? "text-white" : danger ? "text-red-500" : "text-[#1B5E45]",
              )}
              strokeWidth={1.8}
            />
          </div>
          {trend && (
            <span
              className={cn(
                "inline-flex items-center text-[10px] font-medium px-2 py-1 rounded-full",
                trend.isPositive
                  ? "bg-[#E8F5EE] text-[#1B5E45]"
                  : "bg-red-50 text-red-600",
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-2.5 w-2.5 mr-1" />
              ) : (
                <TrendingDown className="h-2.5 w-2.5 mr-1" />
              )}
              {trend.value}%
            </span>
          )}
        </div>
        <p
          className={cn(
            "text-xl sm:text-2xl font-medium tracking-tight whitespace-nowrap truncate",
            accent ? "text-white" : danger ? "text-red-600" : "text-foreground",
          )}
        >
          {value}
        </p>
        <p
          className={cn(
            "text-xs font-medium mt-1",
            accent ? "text-white/60" : "text-muted-foreground",
          )}
        >
          {label}
        </p>
      </CardContent>
    </Card>
  );
}

// --- Main Dashboard --------------------------------------------------------
export default function LandlordDashboard() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { userName } = useAuth();
  const stats = getLandlordStats();
  const recentPayments = mockPayments.slice(0, 5);
  const recentComplaints = mockComplaints.slice(0, 3);

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    !mounted ? "" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = now.toLocaleDateString("en-KE", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const occupancyRate = Math.round(
    (stats.occupiedUnits / stats.totalUnits) * 100,
  );

  return (
    <LandlordLayout>
      <TooltipProvider>
        <div className="min-h-screen bg-[#FAFAF8]">

          {/* -- Sticky Nav ------------------------------------ */}
          <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 md:px-[4px]0 h-16 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
                <Building2 className="h-4 w-4 text-[#1B5E45]" />
                <ChevronRight className="h-3 w-3" />
                <span className="font-medium text-foreground truncate max-w-[80px] sm:max-w-none">Dashboard</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <Tooltip>
                  <TooltipTrigger render={<span />}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl relative text-muted-foreground hover:text-foreground hover:bg-[#E8F5EE]"
                    >
                      <CustomNotificationIcon className="h-4 w-4" />
                      <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-2.5 sm:px-4 rounded-xl border-border text-sm font-medium hover:bg-[#E8F5EE] hover:border-[#1B5E45]/30 hover:text-[#1B5E45]"
                >
                  <Download className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </Button>

                <Link
                  href="/landlord/properties/new"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "h-9 px-2.5 sm:px-4 rounded-xl bg-[#1B5E45] hover:bg-[#246B4F] text-white text-sm font-medium shadow-sm",
                  )}
                >
                  <Plus className="h-4 w-4 sm:mr-1.5" />
                  <span className="hidden sm:inline">Add Property</span>
                </Link>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-6 md:px-[4px]0 py-8 space-y-8">

            {/* == HERO ==================================================== */}
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm">
                {/* Decorative circles */}
                <div className="pointer-events-none absolute top-0 right-0 w-[360px] h-[360px] rounded-full bg-[#E8F5EE]/60 translate-x-1/2 -translate-y-1/2" />
                <div className="pointer-events-none absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-[#E8F5EE]/30 translate-y-1/2" />
                <div className="pointer-events-none absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-[#3DBE7A]/8 -translate-y-1/2" />

                {/* Accent strip */}
                <div className="h-1 w-full bg-gradient-to-r from-[#1B5E45] via-[#3DBE7A] to-[#E8F5EE]" />

                <div className="relative p-7 md:p-8">

                  {/* Top: identity + alert */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex items-start gap-5">
                      {/* Initials avatar */}
                      <div className="shrink-0 h-16 w-16 rounded-2xl bg-[#E8F5EE] border-2 border-[#1B5E45]/15 flex items-center justify-center shadow-sm">
                        <span className="text-2xl font-medium text-[#1B5E45] tracking-tight select-none">
                          {(userName || "P").charAt(0).toUpperCase()}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#1B5E45]">
                            {greeting}
                          </span>
                          <span className="w-1 h-1 bg-[#1B5E45]/30 rounded-full" />
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#1B5E45] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3DBE7A] animate-pulse" />
                            Property Active
                          </span>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-medium text-[#1A1A1A] tracking-tight">
                          {userName || "Property Manager"}
                        </h1>

                        <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 mt-5 sm:mt-4 sm:flex sm:flex-col sm:gap-2.5 -ml-[84px] sm:ml-0 w-[calc(100%+84px)] sm:w-auto">
                          <div className="contents sm:flex sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1.5">
                            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-muted-foreground max-w-full overflow-hidden">
                              <Building2 className="h-3.5 w-3.5 text-[#1B5E45] shrink-0" />
                              <span className="truncate">{stats.totalBuildings} Properties</span>
                            </span>
                            <span className="w-px h-3.5 bg-border hidden sm:block" />
                            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-muted-foreground max-w-full overflow-hidden">
                              <CustomHomeIcon className="h-3.5 w-3.5 text-[#1B5E45] shrink-0" />
                              <span className="truncate">{stats.totalUnits} Total Units</span>
                            </span>
                            <span className="w-px h-3.5 bg-border hidden sm:block" />
                            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-muted-foreground max-w-full overflow-hidden">
                              <Calendar className="h-3.5 w-3.5 text-[#1B5E45] shrink-0" />
                              <span className="truncate">{today}</span>
                            </span>
                          </div>

                          <div className="contents sm:flex sm:items-center sm:gap-2 sm:flex-wrap">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium bg-[#E8F5EE] text-[#1B5E45] px-2.5 py-1.5 sm:py-1 rounded-lg sm:rounded-full justify-start w-full sm:w-auto overflow-hidden">
                              <CheckCircle2 className="h-3 w-3 shrink-0" />
                              <span className="truncate">{occupancyRate}% Occupied</span>
                            </span>
                            {stats.tenantsInArrears > 0 && (
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-medium bg-red-50 text-red-600 px-2.5 py-1.5 sm:py-1 rounded-lg sm:rounded-full justify-start w-full sm:w-auto overflow-hidden">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                                <span className="truncate">{stats.tenantsInArrears} Arrears</span>
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium bg-amber-50 text-amber-700 px-2.5 py-1.5 sm:py-1 rounded-lg sm:rounded-full justify-start w-full sm:w-auto overflow-hidden">
                              <Clock className="h-3 w-3 shrink-0" />
                              <span className="truncate">{recentComplaints.length} Open Tickets</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Revenue card */}
                    <div className="shrink-0 lg:max-w-[220px] w-full lg:w-auto">
                      <div className="rounded-xl border border-[#1B5E45]/12 bg-[#F0F5F1] p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#1B5E45]/60">
                            Monthly Revenue
                          </p>
                          <span className="text-[10px] font-medium text-[#1B5E45] bg-[#E8F5EE] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <TrendingUp className="h-2.5 w-2.5" />
                            +12%
                          </span>
                        </div>
                        <p className="text-3xl font-medium text-[#1A1A1A] tracking-tight leading-none">
                          KSh {(stats.monthlyIncome / 1000).toFixed(0)}K
                        </p>
                        <p className="text-xs font-medium text-muted-foreground mt-1.5 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Current billing period
                        </p>
                        <Link
                          href="/landlord/payments"
                          className={cn(
                            buttonVariants({ size: "sm" }),
                            "mt-3.5 w-full rounded-lg bg-[#1B5E45] hover:bg-[#246B4F] text-white font-medium text-xs h-9 flex items-center justify-center gap-1.5 shadow-sm",
                          )}
                        >
                          View Payments
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-6 border-t border-dashed border-border" />

                  {/* Bottom: mini stats + occupancy bar */}
                  <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                      <HeroMiniStat
                        icon={Building2}
                        label="Properties"
                        value={`${stats.totalBuildings} Buildings`}
                        highlight
                      />
                      <HeroMiniStat
                        icon={Users}
                        label="Occupied Units"
                        value={`${stats.occupiedUnits} / ${stats.totalUnits}`}
                      />
                      <HeroMiniStat
                        icon={Home}
                        label="Vacant"
                        value={`${stats.vacantUnits} Units`}
                      />
                      <HeroMiniStat
                        icon={AlertCircle}
                        label="In Arrears"
                        value={`${stats.tenantsInArrears} Tenants`}
                        danger={stats.tenantsInArrears > 0}
                      />
                    </div>

                    {/* Occupancy progress */}
                    <div className="lg:w-56 shrink-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                          Occupancy Rate
                        </span>
                        <span className="text-[10px] font-medium text-[#1B5E45]">
                          {occupancyRate}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-[#E8F5EE] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${occupancyRate}%` }}
                          transition={{ duration: 1.3, ease: "easeOut", delay: 0.4 }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1.5">
                        {stats.occupiedUnits} leased · {stats.vacantUnits} vacant
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* -- KPI Cards -------------------------------------- */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Reveal delay={0.05}>
                <KpiCard
                  icon={Home}
                  label="Total Units"
                  value={stats.totalUnits}
                  trend={{ value: 4, isPositive: true }}
                  accent
                />
              </Reveal>
              <Reveal delay={0.1}>
                <KpiCard
                  icon={Users}
                  label="Occupied Units"
                  value={stats.occupiedUnits}
                  trend={{ value: 2, isPositive: true }}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <KpiCard
                  icon={CustomMoneyIcon}
                  label="Monthly Revenue"
                  value={`KSh ${(stats.monthlyIncome / 1000).toFixed(0)}K`}
                  trend={{ value: 12, isPositive: true }}
                />
              </Reveal>
              <Reveal delay={0.2}>
                <KpiCard
                  icon={AlertCircle}
                  label="Tenants in Arrears"
                  value={stats.tenantsInArrears}
                  trend={{ value: 8, isPositive: false }}
                  danger
                />
              </Reveal>
            </div>

            {/* -- Main Grid -------------------------------------- */}
            <div className="grid lg:grid-cols-3 gap-6">

              {/* Property Analytics — left 2/3 */}
              <Reveal delay={0.2} className="lg:col-span-2">
                <Card className="rounded-2xl border-border shadow-sm bg-white h-full">
                  <CardHeader className="px-6 pt-6 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-medium text-foreground">
                          Property Overview
                        </CardTitle>
                        <CardDescription className="text-xs mt-0.5">
                          Performance metrics and occupancy analytics
                        </CardDescription>
                      </div>
                      <Link
                        href="/landlord/reports"
                        className="text-xs font-medium text-[#1B5E45] hover:underline flex items-center gap-0.5"
                      >
                        View Reports <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 space-y-6">

                    {/* Occupancy bar */}
                    <div className="space-y-3">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Occupancy Rate</p>
                          <p className="text-3xl font-medium text-foreground tracking-tight">
                            {stats.occupiedUnits}
                            <span className="text-lg text-muted-foreground font-normal ml-2">
                              of {stats.totalUnits} units
                            </span>
                          </p>
                        </div>
                        <Badge className="bg-[#E8F5EE] text-[#1B5E45] border-0 hover:bg-[#E8F5EE] font-medium text-xs">
                          {occupancyRate}% Occupied
                        </Badge>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-[#E8F5EE] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${occupancyRate}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A]"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#1B5E45]" />
                          {stats.occupiedUnits} Leased
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#E8F5EE] border border-border" />
                          {stats.vacantUnits} Vacant
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Charts row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {/* Revenue trend bars */}
                      <div className="p-5 rounded-xl border border-border bg-[#FAFAF8] space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-[#E8F5EE] flex items-center justify-center">
                              <BarChart3 className="h-4 w-4 text-[#1B5E45]" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Revenue Trend</p>
                              <p className="text-sm font-medium text-foreground">6-Month View</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-medium text-[#1B5E45] bg-[#E8F5EE] px-2 py-0.5 rounded-full flex items-center gap-1">
                            <TrendingUp className="h-2.5 w-2.5" /> +12%
                          </span>
                        </div>
                        <div className="flex items-end gap-1.5 h-16 mt-2">
                          {[35, 42, 65, 55, 80, 100].map((h, i) => (
                            <div key={i} className="flex-1 h-full flex items-end">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className={cn(
                                  "w-full rounded-t-md transition-opacity hover:opacity-80",
                                  i === 5 ? "bg-[#1B5E45]" : "bg-[#C4D4C9]",
                                )}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          {["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"].map((m) => (
                            <span key={m}>{m}</span>
                          ))}
                        </div>
                      </div>

                      {/* Arrears aging */}
                      <div className="p-5 rounded-xl border border-border bg-[#FAFAF8] space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center">
                              <Activity className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Arrears Aging</p>
                              <p className="text-sm font-medium text-foreground">Outstanding</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                            {stats.tenantsInArrears} Accounts
                          </span>
                        </div>
                        <div className="space-y-3">
                          {[
                            { label: "30+ Days", amount: "KSh 124,000", pct: 65, color: "bg-amber-400" },
                            { label: "60+ Days", amount: "KSh 45,000", pct: 35, color: "bg-red-500" },
                          ].map((row) => (
                            <div key={row.label} className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">{row.label}</span>
                                <span className="text-xs font-medium text-foreground">{row.amount}</span>
                              </div>
                              <div className="h-1.5 w-full rounded-full bg-red-50 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${row.pct}%` }}
                                  transition={{ duration: 1.2, ease: "easeOut" }}
                                  className={cn("h-full rounded-full", row.color)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Right sidebar */}
              <div className="space-y-6">

                {/* Support Tickets */}
                <Reveal delay={0.25}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-medium flex items-center gap-2">
                          <CustomWrenchIcon className="h-4 w-4 text-[#1B5E45]" />
                          Support Tickets
                        </CardTitle>
                        <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-0 text-[10px] font-medium px-2.5 rounded-full">
                          {recentComplaints.length} Open
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-5 space-y-2">
                      {recentComplaints.map((ticket) => (
                        <Link
                          key={ticket.id}
                          href={`/landlord/complaints/${ticket.id}`}
                          className="block"
                        >
                          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAFAF8] border border-border hover:border-[#1B5E45]/20 hover:bg-[#F0F5F1] transition-all group">
                            <div
                              className={cn(
                                "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                                ticket.status === "in-progress"
                                  ? "bg-[#E8F5EE] text-[#1B5E45]"
                                  : "bg-amber-50 text-amber-600",
                              )}
                            >
                              {ticket.status === "in-progress" ? (
                                <Activity className="h-4 w-4" />
                              ) : (
                                <AlertCircle className="h-4 w-4" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground leading-tight truncate">
                                {ticket.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="text-xs text-muted-foreground">{ticket.tenantName}</span>
                                <span
                                  className={cn(
                                    "text-[10px] font-medium px-[4px].5 py-0.5 rounded-full",
                                    ticket.priority === "high"
                                      ? "bg-red-50 text-red-600"
                                      : "bg-[#E8F5EE] text-[#1B5E45]",
                                  )}
                                >
                                  {ticket.category}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-[#1B5E45] transition-colors shrink-0 mt-1" />
                          </div>
                        </Link>
                      ))}
                      <Link
                        href="/landlord/complaints"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "w-full mt-2 rounded-xl h-9 border-border text-xs font-medium hover:bg-[#E8F5EE] hover:border-[#1B5E45]/30 hover:text-[#1B5E45] flex items-center justify-center",
                        )}
                      >
                        View All Tickets <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Quick Actions */}
                <Reveal delay={0.3}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-3">
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4 text-[#1B5E45]" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-5 space-y-2">
                      {[
                        { label: "Add New Tenant", icon: Users, href: "/landlord/tenants" },
                        { label: "Record Payment", icon: CustomMoneyIcon, href: "/landlord/payments" },
                        { label: "Generate Report", icon: BarChart3, href: "/landlord/reports" },
                        { label: "View All Properties", icon: Building2, href: "/landlord/properties" },
                      ].map((action) => (
                        <Link key={action.label} href={action.href}>
                          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-[#FAFAF8] hover:border-[#1B5E45]/30 hover:bg-[#F0F5F1] transition-all group cursor-pointer">
                            <div className="h-8 w-8 rounded-lg bg-[#E8F5EE] text-[#1B5E45] flex items-center justify-center group-hover:bg-[#1B5E45] group-hover:text-white transition-all shrink-0">
                              <action.icon className="h-4 w-4" strokeWidth={1.8} />
                            </div>
                            <span className="text-sm font-medium text-foreground group-hover:text-[#1B5E45] transition-colors">
                              {action.label}
                            </span>
                            <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-[#1B5E45] ml-auto transition-colors" />
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                </Reveal>
              </div>
            </div>

            {/* -- Recent Transactions ---------------------------- */}
            <Reveal delay={0.3}>
              <Card className="rounded-2xl border-border shadow-sm bg-white">
                <CardHeader className="px-6 pt-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-medium flex items-center gap-2">
                        <div
                          className="h-4 w-4 bg-[#1B5E45]"
                          style={{
                            WebkitMaskImage: 'url(/bill.png)',
                            WebkitMaskSize: 'contain',
                            WebkitMaskPosition: 'center',
                            WebkitMaskRepeat: 'no-repeat',
                            maskImage: 'url(/bill.png)',
                            maskSize: 'contain',
                            maskPosition: 'center',
                            maskRepeat: 'no-repeat',
                          }}
                        />
                        Recent Transactions
                      </CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        Latest payment activity across all properties
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-4 rounded-xl border-border text-xs font-medium hover:bg-[#E8F5EE] hover:border-[#1B5E45]/30 hover:text-[#1B5E45]"
                    >
                      <Download className="h-3.5 w-3.5 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#FAFAF8] hover:bg-[#FAFAF8] border-border">
                        <TableHead className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70 h-10">
                          Transaction
                        </TableHead>
                        <TableHead className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70 h-10">
                          Tenant
                        </TableHead>
                        <TableHead className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70 h-10">
                          Unit
                        </TableHead>
                        <TableHead className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70 h-10 text-right">
                          Amount
                        </TableHead>
                        <TableHead className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70 h-10 text-center">
                          Status
                        </TableHead>
                        <TableHead className="w-10 h-10" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentPayments.map((payment) => (
                        <TableRow
                          key={payment.id}
                          className="hover:bg-[#FAFAF8] transition-colors border-border group"
                        >
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-xl bg-[#E8F5EE] flex items-center justify-center shrink-0">
                                <div
                                  className="h-[18px] w-[18px] bg-[#1B5E45]"
                                  style={{
                                    WebkitMaskImage: 'url(/bill.png)',
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskPosition: 'center',
                                    WebkitMaskRepeat: 'no-repeat',
                                    maskImage: 'url(/bill.png)',
                                    maskSize: 'contain',
                                    maskPosition: 'center',
                                    maskRepeat: 'no-repeat',
                                  }}
                                />
                              </div>
                              <div>
                                <p className="text-xs font-mono font-medium text-foreground leading-tight">
                                  {payment.id}
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">
                                  {payment.date}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-2.5">
                              <div className="h-8 w-8 rounded-xl bg-[#F0F5F1] flex items-center justify-center text-[#1B5E45] text-xs font-medium shrink-0">
                                {payment.tenantName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground leading-tight">
                                  {payment.tenantName}
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                  {payment.month}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="text-sm text-muted-foreground font-medium">
                              {payment.unitId}
                            </span>
                          </TableCell>
                          <TableCell className="py-4 text-right">
                            <p className="text-sm font-medium text-[#1B5E45]">
                              KSh {payment.amount.toLocaleString()}
                            </p>
                          </TableCell>
                          <TableCell className="py-4 text-center">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full capitalize",
                                payment.status === "completed"
                                  ? "bg-[#E8F5EE] text-[#1B5E45]"
                                  : "bg-red-50 text-red-600",
                              )}
                            >
                              {payment.status === "completed" ? (
                                <CheckCircle2 className="h-3 w-3" />
                              ) : (
                                <Clock className="h-3 w-3" />
                              )}
                              {payment.status}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <Tooltip>
                              <TooltipTrigger>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#E8F5EE] text-muted-foreground hover:text-[#1B5E45]"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>View details</TooltipContent>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="border-t border-border pt-4 flex justify-center">
                    <Link
                      href="/landlord/payments"
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "text-[#1B5E45] hover:bg-[#E8F5EE] rounded-xl h-9 px-5 text-sm font-medium",
                      )}
                    >
                      View All Transactions
                      <ArrowUpRight className="h-3.5 w-3.5 ml-1.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

          </main>
        </div>
      </TooltipProvider>
    </LandlordLayout>
  );
}