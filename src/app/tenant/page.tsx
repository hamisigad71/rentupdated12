"use client";

import React, { useRef, useState } from "react";
import TenantLayout from "@/components/TenantLayout";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  DollarSign,
  Calendar,
  AlertCircle,
  FileText,
  Plus,
  ArrowRight,
  TrendingUp,
  CreditCard,
  History,
  ShieldCheck,
  Zap,
  Home,
  Wrench,
  FileCheck,
  Bell,
  Phone,
  Download,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  Users,
  Wifi,
  Car,
  Dumbbell,
  ArrowUpRight,
  Activity,
  ChevronRight,
  MoreHorizontal,
  Sparkles,
  Star,
  MapPin,
  Info,
  Receipt,
  BookOpen,
  Shield,
} from "lucide-react";
import { mockTenants, mockPayments, mockComplaints } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

// ─── Reveal Animation ──────────────────────────────────────────────────────
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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = false,
  badge,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  sub?: string;
  accent?: boolean;
  badge?: { label: string; color: "green" | "amber" | "blue" | "red" };
}) {
  const badgeStyles = {
    green: "bg-[#E8F5EE] text-[#1B5E45]",
    amber: "bg-amber-50 text-amber-700",
    blue: "bg-sky-50 text-sky-700",
    red: "bg-red-50 text-red-600",
  };

  return (
    <Card
      className={cn(
        "rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden relative",
        accent ? "bg-[#1B5E45] text-white border-[#1B5E45]" : "bg-white",
      )}
    >
      {accent && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8 pointer-events-none" />
      )}
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-3 sm:mb-5">
          <div
            className={cn(
              "h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl flex items-center justify-center transition-transform group-hover:scale-105",
              accent ? "bg-white/15" : "bg-[#E8F5EE]",
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 sm:h-5 sm:w-5",
                accent ? "text-white" : "text-[#1B5E45]",
              )}
              strokeWidth={1.8}
            />
          </div>
          {badge && (
            <span
              className={cn(
                "text-[9px] sm:text-[10px]  uppercase tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full",
                badgeStyles[badge.color],
              )}
            >
              {badge.label}
            </span>
          )}
        </div>
        <p
          className={cn(
            "text-xl sm:text-3xl  tracking-tight mb-0.5 sm:mb-1 truncate",
            accent ? "text-white" : "text-foreground",
          )}
        >
          <span className={cn(typeof value === 'string' && value.includes('KSh') && "font-money")}>
            {value}
          </span>
        </p>
        <p
          className={cn(
            "text-[10px] sm:text-sm  truncate",
            accent ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {label}
        </p>
        {sub && (
          <p
            className={cn(
              "text-[10px] sm:text-xs mt-1 sm:mt-2 truncate",
              accent ? "text-white/50" : "text-muted-foreground/60",
            )}
          >
            {sub}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Payment Row ───────────────────────────────────────────────────────────
function PaymentRow({
  description,
  date,
  amount,
  status,
}: {
  description: string;
  date: string;
  amount: number;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 group">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-[#E8F5EE] flex items-center justify-center shrink-0">
          <Receipt className="h-4 w-4 text-[#1B5E45]" />
        </div>
        <div>
          <p className="text-sm text-foreground leading-tight">
            {description}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-[#1B5E45] font-money">
          KSh {amount.toLocaleString()}
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] text-[#1B5E45] bg-[#E8F5EE] px-2 py-0.5 rounded-full mt-1">
          <CheckCircle className="h-2.5 w-2.5" />
          {status}
        </span>
      </div>
    </div>
  );
}

// ─── Maintenance Row ───────────────────────────────────────────────────────
function MaintenanceRow({
  title,
  status,
  date,
  priority = "medium",
}: {
  title: string;
  status: string;
  date: string;
  priority?: "low" | "medium" | "high";
}) {
  const priorityConfig = {
    low: { color: "text-sky-600 bg-sky-50", dot: "bg-sky-500" },
    medium: { color: "text-amber-600 bg-amber-50", dot: "bg-amber-500" },
    high: { color: "text-red-600 bg-red-50", dot: "bg-red-500" },
  };
  const cfg = priorityConfig[priority];

  return (
    <div className="flex items-start gap-3 py-3.5">
      <div className="mt-0.5 h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
        <Wrench className="h-3.5 w-3.5 text-amber-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground leading-tight truncate">
          {title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> {date}
          </span>
          <span
            className={cn(
              "text-[10px]  px-2 py-0.5 rounded-full",
              cfg.color,
            )}
          >
            <span
              className={cn(
                "inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle",
                cfg.dot,
              )}
            />
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Quick Action ──────────────────────────────────────────────────────────
function QuickAction({
  label,
  icon: Icon,
  href,
  description,
}: {
  label: string;
  icon: React.ElementType;
  href: string;
  description: string;
}) {
  return (
    <Link href={href}>
      <div className="group flex flex-col gap-3 p-5 rounded-xl border border-border bg-white hover:border-[#1B5E45]/30 hover:bg-[#F0F5F1] transition-all duration-200 cursor-pointer h-full">
        <div className="h-10 w-10 rounded-xl bg-[#E8F5EE] text-[#1B5E45] flex items-center justify-center group-hover:bg-[#1B5E45] group-hover:text-white transition-all duration-200">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-sm text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

// ─── Hero Mini Stat ────────────────────────────────────────────────────────
function HeroMiniStat({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
          highlight ? "bg-[#1B5E45]" : "bg-[#F0F5F1]",
        )}
      >
        <Icon
          className={cn("h-4 w-4", highlight ? "text-white" : "text-[#1B5E45]")}
          strokeWidth={1.8}
        />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground leading-none mb-0.5">
          {label}
        </p>
        <p className={cn("text-sm text-foreground leading-none", typeof value === 'string' && value.includes('KSh') && "font-money")}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────
export default function TenantDashboard() {
  const { userName } = useAuth();
  const currentTenant = mockTenants[0];
  const daysUntilRent = 5;
  const leaseProgress = 72;

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <TenantLayout>
      <TooltipProvider>
        <div className="min-h-screen bg-[#FAFAF8]">
          {/* ── Top Nav Bar ───────────────────────────────────── */}
          <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-0.5 sm:px-6 md:px-10 h-16 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Home className="h-4 w-4 text-[#1B5E45]" />
                <ChevronRight className="h-3.5 w-3.5" />
                <span className=" text-foreground">Dashboard</span>
              </div>
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger render={<span />}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl relative text-muted-foreground hover:text-foreground hover:bg-[#E8F5EE]"
                    >
                      <Bell className="h-4.5 w-4.5" />
                      <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<span />}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-[#E8F5EE]"
                    >
                      <MessageSquare className="h-4.5 w-4.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Messages</TooltipContent>
                </Tooltip>
                <Link
                  href="/tenant/payments"
                  className={cn(
                    buttonVariants({ variant: "default", size: "default" }),
                    "h-9 px-5 rounded-xl bg-[#1B5E45] hover:bg-[#246B4F] text-white text-sm  shadow-sm",
                  )}
                >
                  Pay Rent
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-0.5 sm:px-6 lg:px-8 space-y-8">
            {/* ══ HERO SECTION ════════════════════════════════════════════ */}
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm">
                {/* ── Decorative background elements ── */}
                <div className="pointer-events-none absolute top-0 right-0 w-[360px] h-[360px] rounded-full bg-[#E8F5EE]/60 translate-x-1/2 -translate-y-1/2" />
                <div className="pointer-events-none absolute bottom-0 left-1/3 w-48 h-48 rounded-full bg-[#E8F5EE]/30 translate-y-1/2" />
                <div className="pointer-events-none absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-[#3DBE7A]/8 -translate-y-1/2" />

                {/* ── Top accent strip ── */}
                <div className="h-1 w-full bg-gradient-to-r from-[#1B5E45] via-[#3DBE7A] to-[#E8F5EE]" />

                <div className="relative p-7 md:p-8">
                  {/* ── Top row: greeting + pay CTA ── */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    {/* Left: Identity block */}
                    <div className="flex items-start gap-5">
                      {/* Avatar / initials */}
                      <div className="shrink-0 h-16 w-16 rounded-2xl bg-[#E8F5EE] border-2 border-[#1B5E45]/15 flex items-center justify-center shadow-sm">
                        <span className="text-2xl text-[#1B5E45] tracking-tight select-none">
                          {(userName || "Alex").charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* Name + location + status badges */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span className="text-[10px] uppercase tracking-[0.15em] text-[#1B5E45]">
                            {greeting}
                          </span>
                          <span className="w-1 h-1 bg-[#1B5E45]/30 rounded-full" />
                          <span className="inline-flex items-center gap-1 text-[10px] text-[#1B5E45] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3DBE7A] animate-pulse" />
                            Active Tenant
                          </span>
                        </div>

                        <h1 className="text-2xl md:text-3xl text-[#1A1A1A] tracking-tight leading-tight">
                          {userName?.split(" ")[0] || "Alex"}{" "}
                          {userName?.split(" ")[1] || "Johnson"}
                        </h1>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5">
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-[#1B5E45]" />
                            {currentTenant?.roomNumber || currentTenant?.unitId}
                          </span>
                          <span className="w-px h-3.5 bg-border hidden sm:block" />
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Home className="h-3.5 w-3.5 text-[#1B5E45]" />
                            2-Bedroom · 4th Floor
                          </span>
                          <span className="w-px h-3.5 bg-border hidden sm:block" />
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 text-[#1B5E45]" />
                            Lease ends Mar 14, 2027
                          </span>
                        </div>

                        {/* Star rating */}
                        <div className="flex items-center gap-1.5 mt-3">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={cn(
                                  "h-3.5 w-3.5",
                                  s <= 4
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-border fill-border",
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            4.8 resident score
                          </span>
                          <span className="w-px h-3.5 bg-border" />
                          <span className="text-xs text-muted-foreground">
                            Member since Oct 2023
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Rent due card */}
                    <div className="shrink-0 lg:max-w-[220px] w-full lg:w-auto">
                      <div className="rounded-xl border border-[#1B5E45]/12 bg-[#F0F5F1] p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[10px] uppercase tracking-[0.15em] text-[#1B5E45]/60">
                            Rent Due
                          </p>
                          <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                            {daysUntilRent} days left
                          </span>
                        </div>
                        <p className="text-3xl text-[#1A1A1A] tracking-tight leading-none">
                          <span className="font-money">KSh 2,450</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due April 1, 2025
                        </p>
                        <Link
                          href="/tenant/payments"
                          className={cn(
                            buttonVariants({ variant: "default", size: "sm" }),
                            "mt-3.5 w-full rounded-lg bg-[#1B5E45] hover:bg-[#246B4F] text-white  text-xs h-9 flex items-center justify-center shadow-sm gap-1.5",
                          )}
                        >
                          Pay Now
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* ── Divider ── */}
                  <div className="my-6 border-t border-dashed border-border" />

                  {/* ── Bottom row: 4 mini stats + lease progress ── */}
                  <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                    {/* Mini stat pills */}
                    <div className="hidden sm:grid sm:grid-cols-4 gap-4 flex-1">
                      <HeroMiniStat
                        icon={ShieldCheck}
                        label="Lease Status"
                        value="Active"
                        highlight
                      />
                      <HeroMiniStat
                        icon={CreditCard}
                        label="Balance"
                        value={<span className="font-money">KSh 0 Clear</span>}
                      />
                      <HeroMiniStat
                        icon={Wrench}
                        label="Open Requests"
                        value="2 Pending"
                      />
                      <HeroMiniStat
                        icon={Activity}
                        label="Last Payment"
                        value="Mar 1, 2025"
                      />
                    </div>

                    {/* Lease progress bar block */}
                    <div className="lg:w-56 shrink-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          Lease Progress
                        </span>
                        <span className="text-[10px] text-[#1B5E45]">
                          {leaseProgress}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-[#E8F5EE] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#1B5E45] to-[#3DBE7A] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${leaseProgress}%` }}
                          transition={{
                            duration: 1.3,
                            ease: "easeOut",
                            delay: 0.4,
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1.5">
                        Oct 2023 → Mar 2027 · {leaseProgress}% completed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            {/* ══ END HERO ════════════════════════════════════════════════ */}

            {/* ── Stat Cards ───────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Reveal delay={0.05}>
                <StatCard
                  icon={DollarSign}
                  label="Monthly Rent"
                  value={<span className="font-money">KSh 12,450</span>}
                  sub="Due Apr 1, 2025"
                  badge={{ label: "Due Soon", color: "amber" }}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <StatCard
                  icon={CreditCard}
                  label="Account Balance"
                  value={<span className="font-money">KSh 0</span>}
                  sub="No outstanding dues"
                  badge={{ label: "Clear", color: "green" }}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <StatCard
                  icon={Wrench}
                  label="Open Requests"
                  value="2"
                  sub="1 in progress"
                  badge={{ label: "Active", color: "amber" }}
                />
              </Reveal>
              <Reveal delay={0.2}>
                <StatCard
                  icon={ShieldCheck}
                  label="Lease Status"
                  value="Active"
                  sub="Valid until Mar 2027"
                  badge={{ label: "Verified", color: "green" }}
                />
              </Reveal>
            </div>

            {/* ── Main Grid ────────────────────────────────────── */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-8 space-y-6">
                {/* Quick Actions */}
                <Reveal delay={0.25}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="pb-4 px-6 pt-6">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Zap className="h-4 w-4 text-[#1B5E45]" />
                          Quick Actions
                        </CardTitle>
                        <Link
                          href="/tenant/services"
                          className="text-xs text-[#1B5E45] flex items-center gap-0.5"
                        >
                          All services <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <QuickAction
                          label="Pay Rent"
                          icon={DollarSign}
                          href="/tenant/payments"
                          description="Make a payment securely"
                        />
                        <QuickAction
                          label="Report Issue"
                          icon={Wrench}
                          href="/tenant/maintenance"
                          description="Submit a maintenance request"
                        />
                        <QuickAction
                          label="Documents"
                          icon={FileText}
                          href="/tenant/documents"
                          description="View & download your docs"
                        />
                        <QuickAction
                          label="Book Facility"
                          icon={Dumbbell}
                          href="/tenant/facilities"
                          description="Reserve building amenities"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Recent Payments */}
                <Reveal delay={0.3}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="pb-0 px-6 pt-6">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <History className="h-4 w-4 text-[#1B5E45]" />
                          Payment History
                        </CardTitle>
                        <Link
                          href="/tenant/payments"
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "text-xs text-[#1B5E45] hover:bg-[#E8F5EE] h-8 px-3 rounded-lg  flex items-center justify-center",
                          )}
                        >
                          View all <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-4">
                      <div className="divide-y divide-border">
                        {mockPayments.slice(0, 4).map((payment, i) => (
                          <PaymentRow
                            key={i}
                            description={payment.month}
                            date={payment.date}
                            amount={payment.amount}
                            status="Paid"
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Notices & Announcements */}
                <Reveal delay={0.35}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="pb-4 px-6 pt-6">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Bell className="h-4 w-4 text-[#1B5E45]" />
                        Notices & Announcements
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 space-y-3">
                      {[
                        {
                          icon: Info,
                          title: "Scheduled Water Maintenance",
                          desc: "Water supply will be off Apr 3, 9 AM – 12 PM",
                          color: "text-sky-600 bg-sky-50",
                        },
                        {
                          icon: Sparkles,
                          title: "New Gym Equipment Installed",
                          desc: "The fitness center has new equipment available now",
                          color: "text-[#1B5E45] bg-[#E8F5EE]",
                        },
                        {
                          icon: Shield,
                          title: "Fire Safety Inspection",
                          desc: "Scheduled for Apr 10 — no action needed from residents",
                          color: "text-amber-600 bg-amber-50",
                        },
                      ].map((notice, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-4 rounded-xl bg-[#FAFAF8] border border-border hover:border-[#1B5E45]/20 transition-colors"
                        >
                          <div
                            className={cn(
                              "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                              notice.color,
                            )}
                          >
                            <notice.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm text-foreground">
                              {notice.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {notice.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </Reveal>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                {/* Property Card */}
                <Reveal delay={0.25}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white overflow-hidden">
                    <div className="bg-[#F0F5F1] px-6 py-5 border-b border-border flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#1B5E45] flex items-center justify-center">
                        <Home className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground ">
                          Your Residence
                        </p>
                        <p className="text-sm text-foreground leading-tight">
                          {currentTenant?.roomNumber || currentTenant?.unitId}
                        </p>
                      </div>
                    </div>
                    <CardContent className="px-6 py-5 space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Unit</span>
                        <span className=" text-foreground">
                          {currentTenant?.unitId || "N/A"}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Type</span>
                        <span className=" text-foreground">
                          2-Bedroom
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Floor</span>
                        <span className=" text-foreground">
                          4th Floor
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Rating
                        </span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={cn(
                                "h-3.5 w-3.5",
                                s <= 4
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-border",
                              )}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            4.8
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/tenant/property"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "default",
                          }),
                          "w-full rounded-xl h-10 text-sm border-border hover:bg-[#E8F5EE] hover:border-[#1B5E45]/30 hover:text-[#1B5E45]  mt-2 flex items-center justify-center",
                        )}
                      >
                        View Property Details
                        <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Maintenance */}
                <Reveal delay={0.3}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="pb-3 px-6 pt-6">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-[#1B5E45]" />
                          Maintenance
                        </CardTitle>
                        <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-0 text-[10px] px-2.5 rounded-full">
                          2 Open
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-5">
                      <div className="divide-y divide-border">
                        {mockComplaints.slice(0, 2).map((c, i) => (
                          <MaintenanceRow
                            key={i}
                            title={c.title}
                            status={c.status}
                            date={c.createdDate}
                            priority={i === 0 ? "medium" : "low"}
                          />
                        ))}
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Link
                          href="/tenant/maintenance"
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                            "rounded-xl h-9 text-xs border-border hover:bg-[#E8F5EE] hover:border-[#1B5E45]/30 hover:text-[#1B5E45]  flex items-center justify-center",
                          )}
                        >
                          View All
                        </Link>
                        <Link
                          href="/tenant/maintenance/new"
                          className={cn(
                            buttonVariants({ variant: "default", size: "sm" }),
                            "rounded-xl h-9 text-xs bg-[#1B5E45] hover:bg-[#246B4F] text-white  flex items-center justify-center",
                          )}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          New Request
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Amenities */}
                <Reveal delay={0.35}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="pb-4 px-6 pt-6">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[#1B5E45]" />
                        Building Amenities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: Wifi, label: "High-Speed WiFi" },
                          { icon: Car, label: "Parking" },
                          { icon: Dumbbell, label: "Fitness Center" },
                          { icon: Home, label: "Rooftop Lounge" },
                          { icon: Shield, label: "24/7 Security" },
                          { icon: Phone, label: "Concierge" },
                        ].map((a, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAFAF8] border border-border"
                          >
                            <div className="h-7 w-7 rounded-lg bg-[#E8F5EE] flex items-center justify-center shrink-0">
                              <a.icon className="h-3.5 w-3.5 text-[#1B5E45]" />
                            </div>
                            <span className="text-xs text-foreground leading-tight">
                              {a.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Contact */}
                <Reveal delay={0.4}>
                  <Card className="rounded-2xl border-border shadow-sm bg-[#F0F5F1]">
                    <CardContent className="px-6 py-6">
                      <p className="text-sm text-foreground mb-1">
                        Need Help?
                      </p>
                      <p className="text-xs text-muted-foreground mb-4 leading-snug">
                        Reach your property manager or building support team.
                      </p>
                      <div className="space-y-2">
                        <Link
                          href="/tenant/contact"
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                            "w-full rounded-xl h-9 text-xs bg-white border-border hover:border-[#1B5E45]/30 hover:bg-[#E8F5EE]  flex items-center justify-center",
                          )}
                        >
                          <MessageSquare className="h-3.5 w-3.5 mr-2 text-[#1B5E45]" />
                          Message Manager
                        </Link>
                        <Link
                          href="tel:+1234567890"
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                            "w-full rounded-xl h-9 text-xs bg-white border-border hover:border-[#1B5E45]/30 hover:bg-[#E8F5EE]  flex items-center justify-center",
                          )}
                        >
                          <Phone className="h-3.5 w-3.5 mr-2 text-[#1B5E45]" />
                          Call Front Desk
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              </div>
            </div>
          </main>
        </div>
      </TooltipProvider>
    </TenantLayout>
  );
}
