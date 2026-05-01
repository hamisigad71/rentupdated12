"use client";

import React, { useState, useRef, useEffect } from "react";
import TenantLayout from "@/components/TenantLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Receipt,
  Download,
  Copy,
  Check,
  ChevronRight,
  Lock,
  Smartphone,
  CreditCard,
  Building2,
  Bell,
  ArrowLeft,
  Search,
  Loader2,
  TrendingUp,
  Clock,
} from "lucide-react";
import { mockPayments, mockTenants } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN SYSTEM NOTES
// ─────────────────────────────────────────────────────────────────────────────
// • 8pt grid spacing throughout (p-4=16px, p-6=24px, p-8=32px, gap-4=16px)
// • Elevation layers: bg-[#F7F8F6] → bg-white → card → elevated card
// • Color hierarchy: emerald-deep (primary) > emerald-mid > emerald-bright (accent) > emerald-soft (surface)
// • Border approach: border-black/[0.06] for subtle separators, border-emerald-deep/20 for active states
// • Typography: font-bold headings, font-medium labels, font-normal body — NO font-semibold sprawl
// • Transitions: duration-200 default, duration-300 for larger elements
// ─────────────────────────────────────────────────────────────────────────────

// --- Stagger container variants for framer-motion ---
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- Reveal: viewport-triggered fade-up ─────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className,
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
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// --- Section label — consistent typographic component ───────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAYMENT METHOD TILE
// Stripe-style selectable tile: icon + label + active ring
// ─────────────────────────────────────────────────────────────────────────────
function PaymentMethodTile({
  id,
  label,
  sublabel,
  icon: Icon,
  active,
  onClick,
}: {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        // Base — clean white tile with soft border
        "relative flex flex-col items-start gap-3 p-4 rounded-2xl border transition-all duration-200 w-full text-left group",
        active
          ? // Active — emerald ring + tinted surface
            "border-emerald-deep/30 bg-emerald-soft/60 shadow-sm shadow-emerald-deep/5 ring-2 ring-emerald-deep/10"
          : // Idle — neutral, inviting hover
            "border-black/[0.06] bg-white hover:border-emerald-deep/20 hover:bg-emerald-soft/20 hover:shadow-sm"
      )}
    >
      {/* Icon container */}
      <div
        className={cn(
          "h-9 w-9 rounded-xl flex items-center justify-center transition-colors duration-200",
          active
            ? "bg-emerald-deep text-white"
            : "bg-emerald-soft text-emerald-deep group-hover:bg-emerald-deep/10"
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Labels */}
      <div>
        <p className={cn("text-sm font-bold leading-tight", active ? "text-emerald-deep" : "text-foreground")}>
          {label}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{sublabel}</p>
      </div>

      {/* Active check indicator — top-right */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-3 right-3 h-5 w-5 bg-emerald-deep rounded-full flex items-center justify-center shadow-sm"
          >
            <Check className="h-2.5 w-2.5 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRANSACTION ROW
// Clean list item with proper visual hierarchy
// ─────────────────────────────────────────────────────────────────────────────
function TransactionRow({
  payment,
  index,
}: {
  payment: { month: string; date: string; amount: number; status?: string };
  index: number;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "flex items-center justify-between px-5 py-4 transition-colors duration-200 group cursor-default",
        "hover:bg-emerald-soft/30",
        // Subtle separator except last item
        index !== 0 && "border-t border-black/[0.04]"
      )}
    >
      {/* Left: icon + info */}
      <div className="flex items-center gap-3.5">
        <div className="h-10 w-10 rounded-xl bg-emerald-soft flex items-center justify-center shrink-0 group-hover:bg-emerald-soft/80 transition-colors">
          <Receipt className="h-4.5 w-4.5 text-emerald-deep" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground leading-tight">{payment.month} Rent</p>
          <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
            <Clock className="h-3 w-3 inline" />
            {payment.date}
          </p>
        </div>
      </div>

      {/* Right: amount + badge */}
      <div className="text-right">
        <p className="text-sm font-bold text-foreground tabular-nums">
          KSh {payment.amount.toLocaleString()}
        </p>
        <div className="flex items-center justify-end mt-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-soft text-emerald-deep text-[9px] font-bold uppercase tracking-wide border border-emerald-bright/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-bright inline-block" />
            Paid
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function TenantPaymentsPage() {
  const { userName } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card" | "bank">("mpesa");
  const currentTenant = mockTenants[0];
  const [amount, setAmount] = useState(currentTenant.rent);
  const [phone, setPhone] = useState("");
  const [referenceId] = useState(
    `PAY-${Math.random().toString(36).substring(7).toUpperCase()}`
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Success logic here
    }, 2500);
  };

  const copyRef = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickAmounts = [currentTenant.rent, 5000, 10000];

  return (
    <TenantLayout>
      <TooltipProvider>
        {/* ── Page shell: off-white background for breathing room ── */}
        <div className="min-h-screen bg-[#F6F7F5] pb-28">

          {/* ────────────────────────────────────────────────────────────
              HEADER — glassmorphic, premium spacing, clean hierarchy
          ──────────────────────────────────────────────────────────── */}
          <header className="sticky top-0 z-40 bg-white/75 backdrop-blur-lg border-b border-black/[0.06] shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
            <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-sm">
                <Link
                  href="/tenant"
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors duration-150"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
                <span className="font-bold text-foreground text-[13px]">Payments</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger render={<span />}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    Download statement
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </header>

          {/* ────────────────────────────────────────────────────────────
              MAIN CONTENT
          ──────────────────────────────────────────────────────────── */}
          <main className="max-w-3xl mx-auto px-4 pt-7 pb-8 space-y-5">

            {/* ── BALANCE HERO CARD ──────────────────────────────────────
                Dark emerald hero with layered depth, NOT a heavy solid block.
                Uses gradient + noise layer for premium feel.
            ────────────────────────────────────────────────────────── */}
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-emerald-deep shadow-xl shadow-emerald-deep/20">
                {/* Layered depth overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-mid/40 via-transparent to-emerald-deep/60 pointer-events-none" />
                <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-emerald-bright/10 blur-3xl pointer-events-none" />
                <div className="absolute -left-6 -bottom-10 h-40 w-40 rounded-full bg-white/[0.03] blur-2xl pointer-events-none" />

                <div className="relative p-7 space-y-7">
                  {/* Top row: amount + secure badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2">
                        Amount Due
                      </p>
                      <h2 className="text-[2.25rem] font-bold tracking-tight text-white leading-none">
                        KSh {currentTenant.rent.toLocaleString()}
                      </h2>
                    </div>
                    {/* Secure badge — refined glass pill */}
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 shrink-0">
                      <Lock className="h-3 w-3 text-emerald-bright" />
                      <span className="text-[10px] font-bold text-white/80 uppercase tracking-tight">
                        Secured
                      </span>
                    </div>
                  </div>

                  {/* Hairline divider */}
                  <div className="h-px bg-white/10" />

                  {/* Bottom row: meta info */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider mb-1">Due Date</p>
                      <p className="text-sm font-bold text-white">Apr 1, 2025</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider mb-1">Room</p>
                      <p className="text-sm font-bold text-white">{currentTenant.roomNumber}</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-[9px] uppercase font-bold tracking-wider mb-1">Ref</p>
                      <button
                        onClick={copyRef}
                        className="flex items-center gap-1 group"
                      >
                        <p className="text-sm font-bold text-white/80 font-mono truncate max-w-[80px]">
                          {referenceId}
                        </p>
                        {copied ? (
                          <Check className="h-3 w-3 text-emerald-bright shrink-0" />
                        ) : (
                          <Copy className="h-3 w-3 text-white/30 group-hover:text-white/70 shrink-0 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── PAYMENT FORM CARD ─────────────────────────────────────
                Clean white card wrapping the full checkout flow.
                Three visual sections inside: amount → method → action.
                Matches the "one card checkout" pattern of Stripe/Linear.
            ──────────────────────────────────────────────────────────── */}
            <Reveal delay={0.08}>
              <Card className="rounded-3xl border border-black/[0.06] bg-white shadow-sm overflow-hidden">
                <CardContent className="p-0 divide-y divide-black/[0.04]">

                  {/* ── Section 1: Amount ──────────────────────────────── */}
                  <div className="p-6 space-y-4">
                    <SectionLabel>Payment Amount</SectionLabel>

                    {/* Big amount input — fintech style */}
                    <div className="relative flex items-center gap-0 rounded-2xl border border-black/[0.08] bg-[#F8F9F7] focus-within:border-emerald-deep/30 focus-within:ring-2 focus-within:ring-emerald-deep/10 transition-all duration-200">
                      <span className="pl-5 text-xl font-bold text-emerald-deep/60 select-none shrink-0">
                        KSh
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="flex-1 h-16 pl-2.5 pr-5 bg-transparent text-[1.75rem] font-bold text-foreground focus:outline-none tabular-nums"
                        placeholder="0"
                      />
                    </div>

                    {/* Quick-select chips */}
                    <div className="flex flex-wrap gap-2">
                      {quickAmounts.map((val) => (
                        <button
                          key={val}
                          onClick={() => setAmount(val)}
                          className={cn(
                            "h-8 px-4 rounded-full text-[11px] font-bold transition-all duration-200 border",
                            amount === val
                              ? "bg-emerald-deep text-white border-emerald-deep shadow-sm shadow-emerald-deep/20"
                              : "bg-white border-black/[0.08] text-muted-foreground hover:border-emerald-deep/20 hover:text-emerald-deep"
                          )}
                        >
                          KSh {val.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ── Section 2: Payment Method ──────────────────────── */}
                  <div className="p-6 space-y-4">
                    <SectionLabel>Payment Method</SectionLabel>

                    {/* 3-column tile grid — Stripe-style selectable tiles */}
                    <div className="grid grid-cols-3 gap-3">
                      <PaymentMethodTile
                        id="mpesa"
                        label="M-PESA"
                        sublabel="STK push"
                        icon={Smartphone}
                        active={paymentMethod === "mpesa"}
                        onClick={() => setPaymentMethod("mpesa")}
                      />
                      <PaymentMethodTile
                        id="card"
                        label="Card"
                        sublabel="Visa / MC"
                        icon={CreditCard}
                        active={paymentMethod === "card"}
                        onClick={() => setPaymentMethod("card")}
                      />
                      <PaymentMethodTile
                        id="bank"
                        label="Bank"
                        sublabel="Transfer"
                        icon={Building2}
                        active={paymentMethod === "bank"}
                        onClick={() => setPaymentMethod("bank")}
                      />
                    </div>
                  </div>

                  {/* ── Section 3: Method-specific input + CTA ────────── */}
                  <AnimatePresence mode="wait">
                    {paymentMethod === "mpesa" && (
                      <motion.div
                        key="mpesa"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="p-6 space-y-5"
                      >
                        {/* Phone input */}
                        <div className="space-y-2">
                          <SectionLabel>M-PESA Phone Number</SectionLabel>
                          <div className="relative flex items-center rounded-2xl border border-black/[0.08] bg-[#F8F9F7] focus-within:border-emerald-deep/30 focus-within:ring-2 focus-within:ring-emerald-deep/10 transition-all duration-200 overflow-hidden">
                            {/* Country code prefix */}
                            <div className="flex items-center gap-2 pl-4 pr-3 border-r border-black/[0.06] shrink-0">
                              <span className="text-base">🇰🇪</span>
                              <span className="text-sm font-bold text-muted-foreground">+254</span>
                            </div>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="712 345 678"
                              className="flex-1 h-14 px-4 bg-transparent text-sm font-bold text-foreground focus:outline-none placeholder:text-muted-foreground/40 placeholder:font-normal"
                            />
                          </div>
                          <p className="text-[11px] text-muted-foreground px-1">
                            You'll receive an STK push notification to authorise the payment.
                          </p>
                        </div>

                        {/* Primary CTA — rich gradient, strong visual weight */}
                        <button
                          onClick={handlePayment}
                          disabled={isProcessing}
                          className={cn(
                            "w-full h-14 rounded-2xl flex items-center justify-center gap-2.5 text-white font-bold text-[15px] transition-all duration-200 relative overflow-hidden",
                            "bg-emerald-deep shadow-lg shadow-emerald-deep/25",
                            // Subtle internal gradient for depth
                            "bg-gradient-to-b from-emerald-mid to-emerald-deep",
                            isProcessing
                              ? "opacity-80 cursor-not-allowed"
                              : "hover:shadow-xl hover:shadow-emerald-deep/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                          )}
                        >
                          {/* Subtle sheen overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-2xl" />

                          {isProcessing ? (
                            <>
                              <Loader2 className="h-4.5 w-4.5 animate-spin" />
                              <span>Connecting to M-PESA…</span>
                            </>
                          ) : (
                            <>
                              <span>Pay KSh {amount.toLocaleString()}</span>
                              <ArrowRight className="h-4.5 w-4.5" />
                            </>
                          )}
                        </button>
                      </motion.div>
                    )}

                    {paymentMethod === "card" && (
                      <motion.div
                        key="card"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="p-6"
                      >
                        <div className="flex flex-col items-center justify-center py-6 gap-3 text-center">
                          <div className="h-12 w-12 rounded-2xl bg-emerald-soft flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-emerald-deep" />
                          </div>
                          <p className="text-sm font-bold text-foreground">Card payments coming soon</p>
                          <p className="text-xs text-muted-foreground max-w-[240px]">
                            We're adding Visa and Mastercard support. Use M-PESA in the meantime.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === "bank" && (
                      <motion.div
                        key="bank"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="p-6"
                      >
                        <div className="flex flex-col items-center justify-center py-6 gap-3 text-center">
                          <div className="h-12 w-12 rounded-2xl bg-emerald-soft flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-emerald-deep" />
                          </div>
                          <p className="text-sm font-bold text-foreground">Bank transfers coming soon</p>
                          <p className="text-xs text-muted-foreground max-w-[240px]">
                            Direct bank transfer support is on the roadmap. Use M-PESA for now.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </Reveal>

            {/* ── RECENT TRANSACTIONS ───────────────────────────────────
                Contained card with header + list.
                Items use internal dividers — NO heavy borders between rows.
                Proper visual hierarchy: title > date, amount > badge.
            ──────────────────────────────────────────────────────────── */}
            <Reveal delay={0.16}>
              <Card className="rounded-3xl border border-black/[0.06] bg-white shadow-sm overflow-hidden">
                {/* Card header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-0.5">
                      Recent History
                    </p>
                    <h3 className="text-base font-bold text-foreground leading-tight">
                      Transactions
                    </h3>
                  </div>
                  <Link
                    href="/tenant/payments/history"
                    className="flex items-center gap-1 text-[12px] font-bold text-emerald-deep hover:text-emerald-mid transition-colors duration-150"
                  >
                    View all
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {/* Transaction list with stagger animation */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="pb-2"
                >
                  {mockPayments.slice(0, 3).map((p, i) => (
                    <TransactionRow key={i} payment={p} index={i} />
                  ))}
                </motion.div>
              </Card>
            </Reveal>

            {/* ── PAYMENT SECURITY FOOTNOTE ─────────────────────────────
                Light note for trust-building — common in fintech
            ──────────────────────────────────────────────────────────── */}
            <Reveal delay={0.22}>
              <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground/50 py-2">
                <Lock className="h-3 w-3" />
                <span>256-bit SSL encrypted · Powered by Safaricom M-PESA</span>
              </div>
            </Reveal>

          </main>
        </div>
      </TooltipProvider>
    </TenantLayout>
  );
}