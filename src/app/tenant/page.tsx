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
  value: string;
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
      {/* Subtle corner accent */}
      {accent && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8 pointer-events-none" />
      )}
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div
            className={cn(
              "h-11 w-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105",
              accent ? "bg-white/15" : "bg-[#E8F5EE]",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                accent ? "text-white" : "text-[#1B5E45]",
              )}
              strokeWidth={1.8}
            />
          </div>
          {badge && (
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full",
                badgeStyles[badge.color],
              )}
            >
              {badge.label}
            </span>
          )}
        </div>
        <p
          className={cn(
            "text-3xl font-bold tracking-tight mb-1",
            accent ? "text-white" : "text-foreground",
          )}
        >
          {value}
        </p>
        <p
          className={cn(
            "text-sm font-medium",
            accent ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {label}
        </p>
        {sub && (
          <p
            className={cn(
              "text-xs mt-2",
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
          <p className="text-sm font-medium text-foreground leading-tight">
            {description}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-[#1B5E45]">
          ${amount.toLocaleString()}
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#1B5E45] bg-[#E8F5EE] px-2 py-0.5 rounded-full mt-1">
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
        <p className="text-sm font-medium text-foreground leading-tight truncate">
          {title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" /> {date}
          </span>
          <span
            className={cn(
              "text-[10px] font-semibold px-2 py-0.5 rounded-full",
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
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────
export default function TenantDashboard() {
  const { userName } = useAuth();
  const currentTenant = mockTenants[0];
  const daysUntilRent = 5;
  const leaseProgress = 72; // % of lease completed

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
            <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Home className="h-4 w-4 text-[#1B5E45]" />
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="font-medium text-foreground">Dashboard</span>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger>
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
                  <TooltipTrigger>
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
                    "h-9 px-5 rounded-xl bg-[#1B5E45] hover:bg-[#246B4F] text-white text-sm font-semibold shadow-sm",
                  )}
                >
                  Pay Rent
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-6 md:px-10 py-8 space-y-8">
            {/* ── Hero Welcome ──────────────────────────────────── */}
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl bg-white border border-border px-8 py-8 md:py-10 shadow-sm">
                {/* Decorative background accent */}
                <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#E8F5EE]/50" />
                <div className="pointer-events-none absolute -bottom-10 right-32 h-40 w-40 rounded-full bg-[#E8F5EE]/30" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <p className="text-[#1B5E45] text-xs font-bold uppercase tracking-widest mb-2">
                      {greeting}
                    </p>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
                      {userName?.split(" ")[0] || "Alex"} 👋
                    </h1>
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <span className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                        <MapPin className="h-4 w-4 text-[#1B5E45]" />
                        {currentTenant?.roomNumber || currentTenant?.unitId}
                      </span>
                      <span className="w-1 h-1 bg-border rounded-full" />
                      <span className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium">
                        <Calendar className="h-4 w-4 text-[#1B5E45]" />
                        Lease ends Mar 14, 2027
                      </span>
                    </div>
                  </div>

                  {/* Rent Due Alert */}
                  <div className="shrink-0 bg-[#F0F5F1] border border-[#1B5E45]/10 rounded-xl p-5 min-w-60 shadow-sm">
                    <p className="text-[#1B5E45]/60 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                      Rent Due
                    </p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-[#1A1A1A] text-2xl font-black tracking-tight">
                        $2,450
                      </p>
                    </div>
                    <p className="text-[#1B5E45] text-xs font-semibold mt-1">
                      Due in {daysUntilRent} days · Apr 1
                    </p>
                    <Link
                      href="/tenant/payments"
                      className={cn(
                        buttonVariants({ variant: "default", size: "sm" }),
                        "mt-4 w-full rounded-lg bg-[#1B5E45] hover:bg-[#246B4F] text-white font-bold text-xs h-9 flex items-center justify-center shadow-sm",
                      )}
                    >
                      Pay Now
                    </Link>
                  </div>
                </div>

                {/* Lease Progress */}
                <div className="relative mt-8 pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                      Lease Progress
                    </p>
                    <p className="text-[#1B5E45] text-xs font-black">
                      {leaseProgress}% completed
                    </p>
                  </div>
                  <div className="h-2 w-full bg-[#E8F5EE] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#1B5E45] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${leaseProgress}%` }}
                      transition={{
                        duration: 1.2,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Stat Cards ───────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Reveal delay={0.05}>
                <StatCard
                  icon={DollarSign}
                  label="Monthly Rent"
                  value="$2,450"
                  sub="Due Apr 1, 2025"
                  badge={{ label: "Due Soon", color: "amber" }}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <StatCard
                  icon={CreditCard}
                  label="Account Balance"
                  value="$0.00"
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
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          <Zap className="h-4 w-4 text-[#1B5E45]" />
                          Quick Actions
                        </CardTitle>
                        <Link
                          href="/tenant/services"
                          className="text-xs font-medium text-[#1B5E45] hover:underline flex items-center gap-0.5"
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
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          <History className="h-4 w-4 text-[#1B5E45]" />
                          Payment History
                        </CardTitle>
                        <Link
                          href="/tenant/payments"
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "text-xs text-[#1B5E45] hover:bg-[#E8F5EE] h-8 px-3 rounded-lg font-medium flex items-center justify-center",
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
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
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
                            <p className="text-sm font-semibold text-foreground">
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
                    {/* Header strip */}
                    <div className="bg-[#F0F5F1] px-6 py-5 border-b border-border flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#1B5E45] flex items-center justify-center">
                        <Home className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">
                          Your Residence
                        </p>
                        <p className="text-sm font-bold text-foreground leading-tight">
                          {currentTenant?.roomNumber || currentTenant?.unitId}
                        </p>
                      </div>
                    </div>

                    <CardContent className="px-6 py-5 space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Unit</span>
                        <span className="font-semibold text-foreground">
                          {currentTenant?.unitId || "N/A"}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-semibold text-foreground">
                          {"2-Bedroom"}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Floor</span>
                        <span className="font-semibold text-foreground">
                          4th Floor
                        </span>
                      </div>
                      <Separator />

                      {/* Rating */}
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
                          <span className="text-xs font-medium text-muted-foreground ml-1">
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
                          "w-full rounded-xl h-10 text-sm border-border hover:bg-[#E8F5EE] hover:border-[#1B5E45]/30 hover:text-[#1B5E45] font-medium mt-2 flex items-center justify-center",
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
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-[#1B5E45]" />
                          Maintenance
                        </CardTitle>
                        <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-0 text-[10px] font-semibold px-2.5 rounded-full">
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
                            "rounded-xl h-9 text-xs border-border hover:bg-[#E8F5EE] hover:border-[#1B5E45]/30 hover:text-[#1B5E45] font-medium flex items-center justify-center",
                          )}
                        >
                          View All
                        </Link>
                        <Link
                          href="/tenant/maintenance/new"
                          className={cn(
                            buttonVariants({ variant: "default", size: "sm" }),
                            "rounded-xl h-9 text-xs bg-[#1B5E45] hover:bg-[#246B4F] text-white font-medium flex items-center justify-center",
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
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[#1B5E45]" />
                        Building Amenities
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          {
                            icon: Wifi,
                            label: "High-Speed WiFi",
                            available: true,
                          },
                          { icon: Car, label: "Parking", available: true },
                          {
                            icon: Dumbbell,
                            label: "Fitness Center",
                            available: true,
                          },
                          {
                            icon: Home,
                            label: "Rooftop Lounge",
                            available: true,
                          },
                          {
                            icon: Shield,
                            label: "24/7 Security",
                            available: true,
                          },
                          { icon: Phone, label: "Concierge", available: true },
                        ].map((a, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAFAF8] border border-border"
                          >
                            <div className="h-7 w-7 rounded-lg bg-[#E8F5EE] flex items-center justify-center shrink-0">
                              <a.icon className="h-3.5 w-3.5 text-[#1B5E45]" />
                            </div>
                            <span className="text-xs font-medium text-foreground leading-tight">
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
                      <p className="text-sm font-semibold text-foreground mb-1">
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
                            "w-full rounded-xl h-9 text-xs bg-white border-border hover:border-[#1B5E45]/30 hover:bg-[#E8F5EE] font-medium flex items-center justify-center",
                          )}
                        >
                          <MessageSquare className="h-3.5 w-3.5 mr-2 text-[#1B5E45]" />
                          Message Manager
                        </Link>
                        <Link
                          href="tel:+1234567890"
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                            "w-full rounded-xl h-9 text-xs bg-white border-border hover:border-[#1B5E45]/30 hover:bg-[#E8F5EE] font-medium flex items-center justify-center",
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
