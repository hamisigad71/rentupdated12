"use client";

import React, { useState, useRef, useEffect } from "react";
import TenantLayout from "@/components/TenantLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
  Banknote,
  Wallet,
  FileText,
  Copy,
  MapPin,
  Activity,
  Info,
  X,
} from "lucide-react";
import { mockPayments, mockTenants } from "@/data/mockData";
import { useAction } from "@/context/ActionContext";
import { LOADER_DURATION } from "@/utils/constants";
import { cn } from "@/lib/utils";

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
  const inView = useInView(ref, { once: true, margin: "-50px" });
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

// ─── PAYMENT METHOD BUTTON ───────────────────────────────────────────────────
function PaymentMethodButton({
  id,
  label,
  subtitle,
  icon: Icon,
  active,
  onClick,
}: {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left group",
        active
          ? "border-[#1B5E45] bg-[#E8F5EE]"
          : "border-[#E8F5EE] bg-white hover:border-[#1B5E45]/30 hover:bg-[#FAFAF8]"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
          active
            ? "bg-[#1B5E45] text-white"
            : "bg-[#E8F5EE] text-[#1B5E45] group-hover:bg-[#1B5E45] group-hover:text-white"
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm ", active ? "text-[#1B5E45]" : "text-[#1A1A1A]")}>
          {label}
        </p>
        <p className="text-xs text-[#6B7280]">{subtitle}</p>
      </div>
      {active && (
        <div className="w-5 h-5 bg-[#1B5E45] rounded-full flex items-center justify-center shrink-0">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </button>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function TenantPaymentsPage() {
  const currentTenant = mockTenants[0];
  const tenantPayments = mockPayments.filter((p) => p.tenantId === currentTenant.id);

  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card" | "bank">("mpesa");
  const [amount, setAmount] = useState(
    currentTenant.arrears > 0 ? currentTenant.arrears : currentTenant.rent
  );
  const [referenceId, setReferenceId] = useState("");
  const [copied, setCopied] = useState(false);
  const { showAction, updateAction, hideAction } = useAction();

  useEffect(() => {
    setReferenceId(`REF-${currentTenant.id.split("-").pop()}-${new Date().getMonth() + 1}`);
  }, [currentTenant.id]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = () => {
    showAction({
      title: "Processing Payment",
      message: "Connecting to secure payment gateway...",
      color: "green",
      icon: "published_with_changes",
    });
    setTimeout(() => {
      updateAction({
        title: "Payment Successful",
        message: "Your payment has been processed successfully.",
        color: "green",
        icon: "check_circle",
      });
      setTimeout(() => hideAction(), 1600);
    }, LOADER_DURATION - 600);
  };

  const paymentProgress = Math.min(100, Math.round((currentTenant.paidAmount / currentTenant.rent) * 100));
  const isFullyPaid = currentTenant.arrears === 0;
  const totalPaidThisYear = tenantPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <TenantLayout>
      <TooltipProvider>
        <div className="min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
          
          {/* Breadcrumb Navigation */}
          <div className="sticky top-0 z-40 border-b border-[#E8F5EE] bg-white/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-[4px] sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Home className="w-4 h-4 text-[#1B5E45]" />
                <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]" />
                <span className="text-[#6B7280]">Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#6B7280]" />
                <span className=" text-[#1A1A1A]">Payments</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-[#E8F5EE] hover:bg-[#E8F5EE] "
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <main className="max-w-7xl mx-auto px-[4px] sm:px-6 lg:px-8 py-8 space-y-6">
            
            {/* Page Header */}
            <Reveal>
              <Card className="border-[#E8F5EE] bg-white overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-[#1B5E45] via-[#3DBE7A] to-[#E8F5EE]" />
                <CardContent className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    
                    {/* Left: Page Info */}
                    <div className="flex items-start gap-5">
                      <div className="w-16 h-16 rounded-xl bg-[#E8F5EE] border-2 border-[#1B5E45]/10 flex items-center justify-center">
                        <CreditCard className="w-7 h-7 text-[#1B5E45]" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20 hover:bg-[#E8F5EE]">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            Secure Payment Portal
                          </Badge>
                          <Badge variant="outline" className="border-[#E8F5EE] text-[#6B7280]">
                            <Lock className="w-3 h-3 mr-1" />
                            AES-256 Encrypted
                          </Badge>
                        </div>
                        
                        <h1 className="text-3xl text-[#1A1A1A] mb-3">
                          Payments & Billing
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B7280]">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#1B5E45]" />
                            <span>Unit {currentTenant.unitId}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#1B5E45]" />
                            <span>Next due: Apr 1, 2025</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Receipt className="w-4 h-4 text-[#1B5E45]" />
                            <span className="font-mono text-[#1A1A1A]">
                              {referenceId}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Balance Card */}
                    <div className="lg:w-64 shrink-0">
                      <div
                        className={cn(
                          "rounded-xl border p-5",
                          isFullyPaid
                            ? "border-[#1B5E45]/20 bg-[#E8F5EE]"
                            : "border-red-200 bg-red-50"
                        )}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-xs text-[#6B7280] uppercase">
                            Outstanding Balance
                          </p>
                          <Badge
                            className={cn(
                              isFullyPaid
                                ? "bg-[#1B5E45] text-white"
                                : "bg-red-600 text-white"
                            )}
                          >
                            {isFullyPaid ? "Settled" : "Overdue"}
                          </Badge>
                        </div>
                        <p
                          className={cn(
                            "text-3xl mb-3 font-money",
                            isFullyPaid ? "text-[#1A1A1A]" : "text-red-600"
                          )}
                        >
                          KSh {currentTenant.arrears.toLocaleString()}
                        </p>
                        <Button
                          onClick={handlePayment}
                          className={cn(
                            "w-full ",
                            isFullyPaid
                              ? "bg-[#1B5E45] hover:bg-[#246B4F] text-white"
                              : "bg-red-600 hover:bg-red-700 text-white"
                          )}
                        >
                          {isFullyPaid ? "Make Payment" : "Settle Now"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6 bg-[#E8F5EE]" />

                  {/* Payment Progress */}
                  <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        {
                          label: "Monthly Rent",
                          value: `KSh ${currentTenant.rent.toLocaleString()}`,
                          icon: Banknote,
                        },
                        {
                          label: "Arrears",
                          value: isFullyPaid ? "Clear" : `KSh ${currentTenant.arrears.toLocaleString()}`,
                          icon: Wallet,
                        },
                        {
                          label: "Paid This Year",
                          value: `KSh ${totalPaidThisYear.toLocaleString()}`,
                          icon: TrendingUp,
                        },
                        {
                          label: "Last Payment",
                          value: tenantPayments[0]?.date || "—",
                          icon: Activity,
                        },
                      ].map((stat, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <stat.icon className="w-4 h-4 text-[#1B5E45]" />
                            <p className="text-xs text-[#6B7280]">{stat.label}</p>
                          </div>
                          <p className={cn("text-lg text-[#1A1A1A]", typeof stat.value === 'string' && stat.value.includes('KSh') && "font-money")}>{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="lg:w-64 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className=" text-[#6B7280]">Payment Completion</span>
                        <span className=" text-[#1B5E45]">{paymentProgress}%</span>
                      </div>
                      <Progress value={paymentProgress} className="h-2 bg-[#F4F4F0]" />
                      <p className="text-xs text-[#6B7280]">
                        {paymentProgress}% of this month's rent settled
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* Left: Payment Form */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Amount Input */}
                <Reveal delay={0.1}>
                  <Card className="border-[#E8F5EE] bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-[#1B5E45]" />
                        Payment Amount
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#1B5E45] font-money">
                          KSh
                        </div>
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="pl-16 h-14 text-2xl border-[#E8F5EE] bg-[#FAFAF8] focus:border-[#1B5E45] font-money"
                        />
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-[#6B7280]">Quick select:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { label: "Full Rent", value: currentTenant.rent },
                            { label: "Half", value: Math.round(currentTenant.rent / 2) },
                            { label: "Arrears", value: currentTenant.arrears },
                            { label: "KSh 5,000", value: 5000 },
                          ].map((quick) => (
                            <Button
                              key={quick.label}
                              variant={amount === quick.value ? "default" : "outline"}
                              size="sm"
                              onClick={() => setAmount(quick.value)}
                              className={cn(
                                amount === quick.value
                                  ? "bg-[#1B5E45] hover:bg-[#246B4F] text-white"
                                  : "border-[#E8F5EE] hover:bg-[#E8F5EE]"
                              )}
                            >
                              {quick.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-[#E8F5EE] border border-[#1B5E45]/10">
                        <div>
                          <p className="text-xs text-[#6B7280]">Payment Reference</p>
                          <p className="text-sm text-[#1A1A1A] font-mono">
                            {referenceId}
                          </p>
                        </div>
                        <Tooltip>
                          <TooltipTrigger render={<span />}>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleCopy(referenceId)}
                              className="hover:bg-white"
                            >
                              {copied ? (
                                <Check className="w-4 h-4 text-[#1B5E45]" />
                              ) : (
                                <Copy className="w-4 h-4 text-[#6B7280]" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>{copied ? "Copied!" : "Copy"}</TooltipContent>
                        </Tooltip>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Payment Method */}
                <Reveal delay={0.15}>
                  <Card className="border-[#E8F5EE] bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[#1B5E45]" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid sm:grid-cols-3 gap-3">
                        <PaymentMethodButton
                          id="mpesa"
                          label="M-PESA"
                          subtitle="Instant mobile money"
                          icon={Smartphone}
                          active={paymentMethod === "mpesa"}
                          onClick={() => setPaymentMethod("mpesa")}
                        />
                        <PaymentMethodButton
                          id="card"
                          label="Card"
                          subtitle="Visa & Mastercard"
                          icon={CreditCard}
                          active={paymentMethod === "card"}
                          onClick={() => setPaymentMethod("card")}
                        />
                        <PaymentMethodButton
                          id="bank"
                          label="Bank Transfer"
                          subtitle="Direct bank wire"
                          icon={Building2}
                          active={paymentMethod === "bank"}
                          onClick={() => setPaymentMethod("bank")}
                        />
                      </div>

                      <Separator className="bg-[#E8F5EE]" />

                      <AnimatePresence mode="wait">
                        {paymentMethod === "mpesa" && (
                          <motion.div
                            key="mpesa"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                          >
                            <div>
                              <label className="block text-xs text-[#4B5563] uppercase mb-2">
                                M-PESA Phone Number
                              </label>
                              <div className="relative">
                                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B5E45]" />
                                <Input
                                  type="tel"
                                  placeholder="0712 345 678"
                                  className="pl-10 border-[#E8F5EE] bg-[#FAFAF8] focus:border-[#1B5E45]"
                                />
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-lg bg-[#E8F5EE]">
                              <Info className="w-4 h-4 text-[#1B5E45] shrink-0 mt-0.5" />
                              <p className="text-xs text-[#1B5E45]">
                                An STK push will be sent to your phone. Confirm the prompt to complete payment.
                              </p>
                            </div>
                            <Button
                              onClick={handlePayment}
                              className="w-full bg-[#1B5E45] hover:bg-[#246B4F] text-white "
                            >
                              Send STK Push · <span className="font-money">KSh {amount.toLocaleString()}</span>
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </motion.div>
                        )}

                        {paymentMethod === "card" && (
                          <motion.div
                            key="card"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                          >
                            <div>
                              <label className="block text-xs text-[#4B5563] uppercase mb-2">
                                Card Number
                              </label>
                              <Input
                                type="text"
                                placeholder="4242 4242 4242 4242"
                                className="border-[#E8F5EE] bg-[#FAFAF8] focus:border-[#1B5E45] font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-[#4B5563] uppercase mb-2">
                                Cardholder Name
                              </label>
                              <Input
                                type="text"
                                placeholder="John Doe"
                                className="border-[#E8F5EE] bg-[#FAFAF8] focus:border-[#1B5E45]"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs text-[#4B5563] uppercase mb-2">
                                  Expiry
                                </label>
                                <Input
                                  type="text"
                                  placeholder="MM/YY"
                                  className="border-[#E8F5EE] bg-[#FAFAF8] focus:border-[#1B5E45]"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-[#4B5563] uppercase mb-2">
                                  CVV
                                </label>
                                <Input
                                  type="password"
                                  placeholder="•••"
                                  className="border-[#E8F5EE] bg-[#FAFAF8] focus:border-[#1B5E45]"
                                />
                              </div>
                            </div>
                            <Button
                              onClick={handlePayment}
                              className="w-full bg-[#1B5E45] hover:bg-[#246B4F] text-white "
                            >
                              Pay Securely · <span className="font-money">KSh {amount.toLocaleString()}</span>
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </motion.div>
                        )}

                        {paymentMethod === "bank" && (
                          <motion.div
                            key="bank"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-4"
                          >
                            <div className="rounded-lg border border-[#E8F5EE] bg-[#FAFAF8] divide-y divide-[#E8F5EE]">
                              {[
                                { label: "Bank", value: "Equity Bank" },
                                { label: "Account Name", value: "Nova Realty Ltd" },
                                { label: "Account No.", value: "880977221100" },
                                { label: "Reference", value: referenceId },
                              ].map((row) => (
                                <div key={row.label} className="flex items-center justify-between p-3">
                                  <span className="text-xs text-[#6B7280] ">{row.label}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-[#1A1A1A] font-mono">
                                      {row.value}
                                    </span>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() => handleCopy(row.value)}
                                      className="h-6 w-6"
                                    >
                                      <Copy className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200">
                              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <p className="text-xs text-amber-700">
                                Use the reference code when transferring. Allow 1-2 business days for processing.
                              </p>
                            </div>
                            <Button
                              onClick={handlePayment}
                              variant="outline"
                              className="w-full border-[#1B5E45] text-[#1B5E45] hover:bg-[#E8F5EE] "
                            >
                              Confirm Transfer · <span className="font-money">KSh {amount.toLocaleString()}</span>
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Transaction History */}
                <Reveal delay={0.2}>
                  <Card className="border-[#E8F5EE] bg-white">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                          <History className="w-5 h-5 text-[#1B5E45]" />
                          Transaction History
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="text-[#1B5E45] hover:bg-[#E8F5EE]">
                          View All
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {tenantPayments.slice(0, 5).map((payment, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FAFAF8] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-[#E8F5EE] flex items-center justify-center">
                                <Receipt className="w-4 h-4 text-[#1B5E45]" />
                              </div>
                              <div>
                                <p className="text-sm text-[#1A1A1A]">{payment.month}</p>
                                <p className="text-xs text-[#6B7280]">{payment.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-[#1B5E45] font-money">
                                KSh {payment.amount.toLocaleString()}
                              </p>
                              <Badge className="bg-[#E8F5EE] text-[#1B5E45] text-xs">M-PESA</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                
                {/* Payment Summary */}
                <Reveal delay={0.1}>
                  <Card className="border-[#E8F5EE] bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#1B5E45]" />
                        Payment Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {[
                          { label: "Subtotal", value: `KSh ${amount.toLocaleString()}` },
                          { label: "Processing Fee", value: "KSh 0" },
                          { label: "VAT (0%)", value: "KSh 0" },
                        ].map((row) => (
                          <div key={row.label} className="flex items-center justify-between text-sm">
                            <span className="text-[#6B7280]">{row.label}</span>
                            <span className="text-[#1A1A1A] font-money">{row.value}</span>
                          </div>
                        ))}
                      </div>
                      <Separator className="bg-[#E8F5EE]" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#1A1A1A]">Total</span>
                        <span className="text-lg text-[#1B5E45] font-money">
                          KSh {amount.toLocaleString()}
                        </span>
                      </div>
                      <Button
                        onClick={handlePayment}
                        className="w-full bg-[#1B5E45] hover:bg-[#246B4F] text-white "
                      >
                        Confirm & Pay
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <p className="text-center text-xs text-[#6B7280] flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3" />
                        Secured by 256-bit SSL encryption
                      </p>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Security Features */}
                <Reveal delay={0.15}>
                  <Card className="border-[#E8F5EE] bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-[#1B5E45]" />
                        Security & Trust
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { icon: Lock, title: "End-to-End Encrypted", desc: "AES-256 GCM encryption" },
                        { icon: Zap, title: "Instant Verification", desc: "Real-time confirmation" },
                        { icon: ShieldCheck, title: "PCI-DSS Compliant", desc: "Level 1 Certified" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#E8F5EE] flex items-center justify-center shrink-0">
                            <item.icon className="w-4 h-4 text-[#1B5E45]" />
                          </div>
                          <div>
                            <p className="text-sm text-[#1A1A1A]">{item.title}</p>
                            <p className="text-xs text-[#6B7280]">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Billing Schedule */}
                <Reveal delay={0.2}>
                  <Card className="border-[#E8F5EE] bg-[#E8F5EE]">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#1A1A1A] flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#1B5E45]" />
                        Billing Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { label: "Rent Due Date", value: "1st of every month" },
                        { label: "Late Fee After", value: "5th of the month" },
                        { label: "Next Due", value: "Apr 1, 2025" },
                        { label: "Lease End", value: "Mar 14, 2027" },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between text-sm">
                          <span className="text-[#6B7280]">{row.label}</span>
                          <span className=" text-[#1A1A1A]">{row.value}</span>
                        </div>
                      ))}
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