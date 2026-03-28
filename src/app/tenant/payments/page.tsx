"use client";

import React, { useState, useRef, useEffect } from "react";
import TenantLayout from "@/components/TenantLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Smartphone,
  Building2,
  ShieldCheck,
  Clock,
  History,
  Info,
  CheckCircle2,
  Calendar,
  Lock,
  Zap,
  ArrowRight,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Download,
  Check,
  Home,
  Receipt,
  AlertCircle,
  ArrowUpRight,
  Banknote,
  Wallet,
  FileText,
  Copy,
} from "lucide-react";
import { mockPayments, mockTenants } from "@/data/mockData";
import { useAction } from "@/context/ActionContext";
import { LOADER_DURATION } from "@/utils/constants";
import { cn } from "@/lib/utils";

// ─── Reveal ────────────────────────────────────────────────────────────────
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

// ─── Animated Progress Bar ─────────────────────────────────────────────────
function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-1.5 bg-[#E8F5EE] rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-[#3DBE7A] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  accent = false,
  badge,
  sub,
  progress,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  accent?: boolean;
  badge?: { label: string; danger?: boolean };
  sub?: string;
  progress?: number;
}) {
  return (
    <Card
      className={cn(
        "rounded-2xl border shadow-sm overflow-hidden relative",
        accent ? "bg-[#1B5E45] border-[#1B5E45]" : "bg-white border-border",
      )}
    >
      {accent && (
        <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/5" />
      )}
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center",
              accent ? "bg-white/15" : "bg-[#E8F5EE]",
            )}
          >
            <Icon
              className={cn(
                "h-4.5 w-4.5",
                accent ? "text-white" : "text-[#1B5E45]",
              )}
              strokeWidth={1.8}
            />
          </div>
          {badge && (
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full",
                badge.danger
                  ? "bg-red-50 text-red-600"
                  : "bg-[#E8F5EE] text-[#1B5E45]",
              )}
            >
              {badge.label}
            </span>
          )}
        </div>
        <p
          className={cn(
            "text-2xl font-bold tracking-tight",
            accent ? "text-white" : "text-foreground",
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
        {sub && (
          <p
            className={cn(
              "text-xs mt-1.5",
              accent ? "text-white/40" : "text-muted-foreground/60",
            )}
          >
            {sub}
          </p>
        )}
        {typeof progress !== "undefined" && (
          <div className="mt-3">
            <ProgressBar pct={progress} />
            <p
              className={cn(
                "text-[10px] mt-1.5 font-medium",
                accent ? "text-white/50" : "text-muted-foreground/60",
              )}
            >
              {progress}% completed
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Method Button ─────────────────────────────────────────────────────────
function MethodButton({
  id,
  label,
  sub,
  icon: Icon,
  active,
  onClick,
}: {
  id: string;
  label: string;
  sub: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left group",
        active
          ? "border-[#1B5E45] bg-[#F0F5F1]"
          : "border-border bg-white hover:border-[#1B5E45]/30 hover:bg-[#FAFAF8]",
      )}
    >
      <div
        className={cn(
          "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
          active
            ? "bg-[#1B5E45] text-white"
            : "bg-[#E8F5EE] text-[#1B5E45] group-hover:bg-[#1B5E45] group-hover:text-white",
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-semibold",
            active ? "text-[#1B5E45]" : "text-foreground",
          )}
        >
          {label}
        </p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
      {active && (
        <div className="h-5 w-5 bg-[#1B5E45] rounded-full flex items-center justify-center shrink-0">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
    </button>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-border bg-[#FAFAF8] text-sm font-medium outline-none focus:border-[#1B5E45] focus:ring-2 focus:ring-[#1B5E45]/10 transition-all placeholder:text-muted-foreground/50";

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function TenantPaymentsPage() {
  const currentTenant = mockTenants[0];
  const tenantPayments = mockPayments.filter(
    (p) => p.tenantId === currentTenant.id,
  );

  const [method, setMethod] = useState<"mpesa" | "card" | "bank">("mpesa");
  const [amount, setAmount] = useState(
    currentTenant.arrears > 0 ? currentTenant.arrears : currentTenant.rent,
  );
  const [refId, setRefId] = useState("");
  const [copied, setCopied] = useState(false);
  const { showAction, updateAction, hideAction } = useAction();

  useEffect(() => {
    setRefId(
      `${currentTenant.id.split("-").pop()}-${new Date().getMonth() + 1}`,
    );
  }, [currentTenant.id]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = () => {
    showAction({
      title: "Processing Secure Transaction",
      message: "Connecting to payment gateway...",
      color: "green",
      icon: "published_with_changes",
    });
    setTimeout(() => {
      updateAction({
        title: "Payment Successful",
        message: "Your account has been successfully reconciled.",
        color: "green",
        icon: "check_circle",
      });
      setTimeout(() => hideAction(), 1600);
    }, LOADER_DURATION - 600);
  };

  const settlePct = Math.min(
    100,
    Math.round((currentTenant.paidAmount / currentTenant.rent) * 100),
  );
  const allClear = currentTenant.arrears === 0;
  const totalPaid = tenantPayments
    .filter((p) => p.status === "completed")
    .reduce((s, p) => s + p.amount, 0);

  return (
    <TenantLayout>
      <TooltipProvider>
        <div className="min-h-screen bg-[#FAFAF8]">
          {/* ── Top Nav ───────────────────────────────────────── */}
          <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Home className="h-4 w-4 text-[#1B5E45]" />
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-muted-foreground">Dashboard</span>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="font-medium text-foreground">Payments</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 rounded-xl border-border text-sm font-medium hover:bg-[#E8F5EE] hover:border-[#1B5E45]/30 hover:text-[#1B5E45]"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Ledger
              </Button>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-6 md:px-10 py-8 space-y-8">
            {/* ── Hero Banner ───────────────────────────────────── */}
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl bg-[#1B5E45] px-8 py-8">
                <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute bottom-0 right-40 h-32 w-32 rounded-full bg-[#3DBE7A]/15" />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-[#3DBE7A]/20 border border-[#3DBE7A]/30 rounded-full px-3 py-1 mb-3">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#3DBE7A]" />
                      <span className="text-[#3DBE7A] text-xs font-semibold tracking-wide">
                        Secure Payment Portal
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      Payments & Billing
                    </h1>
                    <p className="text-white/60 text-sm mt-2 max-w-sm leading-relaxed">
                      Manage your rent, view transaction history, and track your
                      payment status.
                    </p>
                  </div>

                  {/* Balance pill */}
                  <div
                    className={cn(
                      "shrink-0 rounded-xl px-6 py-4 border min-w-50",
                      allClear
                        ? "bg-[#3DBE7A]/15 border-[#3DBE7A]/30"
                        : "bg-red-500/10 border-red-400/30",
                    )}
                  >
                    <p className="text-white/50 text-xs font-medium uppercase tracking-wide mb-1">
                      Outstanding Balance
                    </p>
                    <p
                      className={cn(
                        "text-3xl font-bold tracking-tight",
                        allClear ? "text-[#3DBE7A]" : "text-red-300",
                      )}
                    >
                      KSh {currentTenant.arrears.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      {allClear ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#3DBE7A]" />
                          <span className="text-[#3DBE7A] text-xs font-medium">
                            Account Settled
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3.5 w-3.5 text-red-300" />
                          <span className="text-red-300 text-xs font-medium">
                            Settlement Required
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Stat Cards ───────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Reveal delay={0.05}>
                <StatCard
                  icon={Banknote}
                  label="Monthly Rent"
                  value={`KSh ${currentTenant.rent.toLocaleString()}`}
                  accent
                  sub="Current billing period"
                />
              </Reveal>
              <Reveal delay={0.1}>
                <StatCard
                  icon={Wallet}
                  label="Outstanding"
                  value={`KSh ${currentTenant.arrears.toLocaleString()}`}
                  badge={
                    allClear
                      ? { label: "Cleared" }
                      : { label: "Overdue", danger: true }
                  }
                  sub={allClear ? "No dues pending" : "Please settle soon"}
                />
              </Reveal>
              <Reveal delay={0.15}>
                <StatCard
                  icon={TrendingUp}
                  label="Paid This Year"
                  value={`KSh ${totalPaid.toLocaleString()}`}
                  badge={{ label: "YTD" }}
                  sub="All completed payments"
                />
              </Reveal>
              <Reveal delay={0.2}>
                <StatCard
                  icon={CheckCircle2}
                  label="Completion Rate"
                  value={`${settlePct}%`}
                  progress={settlePct}
                  sub="Payment fulfilment"
                />
              </Reveal>
            </div>

            {/* ── Main Grid ────────────────────────────────────── */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left — Payment Terminal */}
              <div className="lg:col-span-8 space-y-6">
                {/* Amount Input */}
                <Reveal delay={0.2}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-4">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-[#1B5E45]" />
                        Payment Amount
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 space-y-5">
                      {/* Amount Field */}
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#1B5E45] select-none">
                          KSh
                        </div>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="w-full pl-14 pr-4 py-4 text-2xl font-bold rounded-xl border-2 border-border bg-[#FAFAF8] focus:border-[#1B5E45] focus:ring-2 focus:ring-[#1B5E45]/10 outline-none transition-all"
                        />
                      </div>

                      {/* Quick Amounts */}
                      <div className="flex flex-wrap gap-2">
                        <p className="w-full text-xs font-medium text-muted-foreground mb-1">
                          Quick select:
                        </p>
                        {[
                          { label: "Full Rent", val: currentTenant.rent },
                          {
                            label: "50%",
                            val: Math.round(currentTenant.rent / 2),
                          },
                          { label: "Arrears", val: currentTenant.arrears },
                          { label: "KSh 5,000", val: 5000 },
                        ].map((q) => (
                          <button
                            key={q.label}
                            onClick={() => setAmount(q.val)}
                            className={cn(
                              "px-4 py-2 rounded-lg border text-xs font-semibold transition-all",
                              amount === q.val
                                ? "border-[#1B5E45] bg-[#E8F5EE] text-[#1B5E45]"
                                : "border-border bg-white text-muted-foreground hover:border-[#1B5E45]/30 hover:text-[#1B5E45]",
                            )}
                          >
                            {q.label}
                          </button>
                        ))}
                      </div>

                      {/* Reference */}
                      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#F0F5F1] border border-[#1B5E45]/10">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            Payment Reference
                          </p>
                          <p className="text-sm font-semibold text-foreground font-mono">
                            {refId}
                          </p>
                        </div>
                        <Tooltip>
                          <TooltipTrigger>
                            <button
                              onClick={() => handleCopy(refId)}
                              className="h-8 w-8 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-[#E8F5EE] transition-colors"
                            >
                              {copied ? (
                                <Check className="h-3.5 w-3.5 text-[#1B5E45]" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {copied ? "Copied!" : "Copy reference"}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Payment Method */}
                <Reveal delay={0.25}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-4">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-[#1B5E45]" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 space-y-6">
                      {/* Method Selector */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <MethodButton
                          id="mpesa"
                          label="M-PESA"
                          sub="Instant mobile money"
                          icon={Smartphone}
                          active={method === "mpesa"}
                          onClick={() => setMethod("mpesa")}
                        />
                        <MethodButton
                          id="card"
                          label="Card"
                          sub="Visa & Mastercard"
                          icon={CreditCard}
                          active={method === "card"}
                          onClick={() => setMethod("card")}
                        />
                        <MethodButton
                          id="bank"
                          label="Bank Transfer"
                          sub="Direct bank wire"
                          icon={Building2}
                          active={method === "bank"}
                          onClick={() => setMethod("bank")}
                        />
                      </div>

                      <Separator />

                      {/* Dynamic Form */}
                      <AnimatePresence mode="wait">
                        {method === "mpesa" && (
                          <motion.div
                            key="mpesa"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-4"
                          >
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-widest mb-2 text-muted-foreground">
                                M-PESA Phone Number
                              </label>
                              <div className="relative">
                                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B5E45]" />
                                <input
                                  type="tel"
                                  placeholder="0712 345 678"
                                  className={cn(inputCls, "pl-11")}
                                />
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-[#E8F5EE] border border-[#1B5E45]/10">
                              <Info className="h-4 w-4 text-[#1B5E45] shrink-0 mt-0.5" />
                              <p className="text-xs text-[#1B5E45] leading-relaxed">
                                An STK push will be sent to your phone. Confirm
                                the prompt on your device to complete payment.
                              </p>
                            </div>
                            <Button
                              onClick={handlePayment}
                              className="w-full h-12 rounded-xl bg-[#1B5E45] hover:bg-[#246B4F] text-white font-semibold text-sm shadow-sm"
                            >
                              Send STK Push · KSh {amount.toLocaleString()}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </motion.div>
                        )}

                        {method === "card" && (
                          <motion.div
                            key="card"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-4"
                          >
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-widest mb-2 text-muted-foreground">
                                Card Number
                              </label>
                              <div className="relative">
                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B5E45]" />
                                <input
                                  type="text"
                                  placeholder="4242 4242 4242 4242"
                                  className={cn(
                                    inputCls,
                                    "pl-11 font-mono tracking-widest",
                                  )}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold uppercase tracking-widest mb-2 text-muted-foreground">
                                Cardholder Name
                              </label>
                              <input
                                type="text"
                                placeholder="Full name on card"
                                className={inputCls}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest mb-2 text-muted-foreground">
                                  Expiry
                                </label>
                                <input
                                  type="text"
                                  placeholder="MM / YY"
                                  className={inputCls}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold uppercase tracking-widest mb-2 text-muted-foreground">
                                  CVV
                                </label>
                                <input
                                  type="password"
                                  placeholder="•••"
                                  className={inputCls}
                                />
                              </div>
                            </div>
                            <Button
                              onClick={handlePayment}
                              className="w-full h-12 rounded-xl bg-[#1B5E45] hover:bg-[#246B4F] text-white font-semibold text-sm shadow-sm"
                            >
                              Pay Securely · KSh {amount.toLocaleString()}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </motion.div>
                        )}

                        {method === "bank" && (
                          <motion.div
                            key="bank"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-4"
                          >
                            <div className="rounded-xl border border-border bg-[#FAFAF8] divide-y divide-border overflow-hidden">
                              {[
                                { label: "Bank", value: "Equity Bank" },
                                {
                                  label: "Account Name",
                                  value: "Nova Realty Ltd",
                                },
                                { label: "Account No.", value: "880977221100" },
                                { label: "Reference", value: refId },
                              ].map((row) => (
                                <div
                                  key={row.label}
                                  className="flex items-center justify-between px-4 py-3"
                                >
                                  <span className="text-xs text-muted-foreground font-medium">
                                    {row.label}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-foreground font-mono">
                                      {row.value}
                                    </span>
                                    <button
                                      onClick={() => handleCopy(row.value)}
                                      className="h-6 w-6 rounded flex items-center justify-center hover:bg-[#E8F5EE] transition-colors"
                                    >
                                      <Copy className="h-3 w-3 text-muted-foreground" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200/60">
                              <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                              <p className="text-xs text-amber-700 leading-relaxed">
                                Use the reference code above when making the
                                transfer. Allow 1–2 business days for
                                processing.
                              </p>
                            </div>
                            <Button
                              onClick={handlePayment}
                              variant="outline"
                              className="w-full h-12 rounded-xl border-[#1B5E45] text-[#1B5E45] hover:bg-[#E8F5EE] font-semibold text-sm"
                            >
                              Confirm Bank Transfer · KSh{" "}
                              {amount.toLocaleString()}
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Transaction History Table */}
                <Reveal delay={0.3}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          <History className="h-4 w-4 text-[#1B5E45]" />
                          Transaction History
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-[#1B5E45] hover:bg-[#E8F5EE] h-8 px-3 rounded-lg font-medium"
                        >
                          View all <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-4">
                      {/* Table header */}
                      <div className="grid grid-cols-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                        <span>Description</span>
                        <span className="text-center">Date</span>
                        <span className="text-center">Method</span>
                        <span className="text-right">Amount</span>
                      </div>
                      <Separator className="mb-1" />
                      <div className="divide-y divide-border">
                        {tenantPayments.slice(0, 5).map((payment, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-4 items-center py-3.5 group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-[#E8F5EE] flex items-center justify-center shrink-0">
                                <Receipt className="h-3.5 w-3.5 text-[#1B5E45]" />
                              </div>
                              <span className="text-sm font-medium text-foreground truncate">
                                {payment.month}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground text-center">
                              {payment.date}
                            </span>
                            <span className="text-center">
                              <span className="inline-flex items-center text-[10px] font-medium text-[#1B5E45] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
                                M-PESA
                              </span>
                            </span>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-[#1B5E45]">
                                KSh {payment.amount.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                {/* Security */}
                <Reveal delay={0.2}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-4">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-[#1B5E45]" />
                        Security & Trust
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 space-y-4">
                      {[
                        {
                          icon: Lock,
                          title: "End-to-End Encrypted",
                          desc: "AES-256 GCM encryption",
                        },
                        {
                          icon: Zap,
                          title: "Instant Verification",
                          desc: "Real-time confirmation",
                        },
                        {
                          icon: ShieldCheck,
                          title: "PCI-DSS Compliant",
                          desc: "Level 1 Certified",
                        },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="h-9 w-9 rounded-xl bg-[#E8F5EE] flex items-center justify-center shrink-0">
                            <item.icon className="h-4 w-4 text-[#1B5E45]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              {item.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Payment Summary */}
                <Reveal delay={0.25}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-4">
                      <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#1B5E45]" />
                        Payment Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 space-y-3">
                      {[
                        {
                          label: "Subtotal",
                          value: `KSh ${amount.toLocaleString()}`,
                        },
                        { label: "Processing Fee", value: "KSh 0" },
                        { label: "VAT (0%)", value: "KSh 0" },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-muted-foreground">
                            {row.label}
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {row.value}
                          </span>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-foreground">
                          Total
                        </span>
                        <span className="text-base font-bold text-[#1B5E45]">
                          KSh {amount.toLocaleString()}
                        </span>
                      </div>

                      <Button
                        onClick={handlePayment}
                        className="w-full h-11 mt-2 rounded-xl bg-[#1B5E45] hover:bg-[#246B4F] text-white font-semibold text-sm shadow-sm"
                      >
                        Confirm & Pay
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>

                      <p className="text-center text-[10px] text-muted-foreground flex items-center justify-center gap-1 pt-1">
                        <Lock className="h-3 w-3" />
                        Secured by 256-bit SSL encryption
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Billing Info */}
                <Reveal delay={0.3}>
                  <Card className="rounded-2xl border-border shadow-sm bg-[#F0F5F1]">
                    <CardContent className="px-6 py-6">
                      <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#1B5E45]" />
                        Billing Schedule
                      </p>
                      <div className="space-y-3">
                        {[
                          { label: "Rent Due Date", val: "1st of every month" },
                          { label: "Late Fee After", val: "5th of the month" },
                          { label: "Next Due", val: "1 Apr 2025" },
                          { label: "Lease End", val: "14 Mar 2027" },
                        ].map((row) => (
                          <div
                            key={row.label}
                            className="flex items-center justify-between"
                          >
                            <span className="text-xs text-muted-foreground">
                              {row.label}
                            </span>
                            <span className="text-xs font-semibold text-foreground">
                              {row.val}
                            </span>
                          </div>
                        ))}
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
