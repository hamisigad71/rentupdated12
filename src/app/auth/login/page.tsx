"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowLeft, ArrowRight, Building2, Home, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";


/* ── trust badges ────────────────────────────────────────────────────── */
const TRUST = [
  "256-bit SSL Encryption",
  "M-Pesa Integrated",
  "2,000+ Active Users",
];

/* ── hero content ────────────────────────────────────────────────────── */
const HERO = {
  landlord: {
    label: "Property Owners",
    headline: "Manage your entire portfolio in one place.",
    body: "Track rent, monitor maintenance requests, verify tenants, and generate financial reports — all from a single unified dashboard.",
    stat: [{ v: "2,400+", l: "Properties managed" }, { v: "98%", l: "Collection rate" }, { v: "< 2h", l: "Avg. response time" }],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  tenant: {
    label: "Residents",
    headline: "Your home, fully managed from your phone.",
    body: "Pay rent instantly via M-Pesa, submit maintenance requests, track their progress, and communicate directly with your landlord.",
    stat: [{ v: "5,100+", l: "Happy tenants" }, { v: "< 24h", l: "Maintenance SLA" }, { v: "4.8★", l: "Satisfaction score" }],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
  },
};

/* ─────────────────────────────────────────────────────────────────────── */
function LoginForm({ onRoleChange }: { onRoleChange: (r: "landlord" | "tenant") => void }) {
  const searchParams = useSearchParams();
  const initialRole  = searchParams.get("role") === "tenant" ? "tenant" : "landlord";

  const [role, setRoleState]     = useState<"landlord" | "tenant">(initialRole);
  const [email, setEmail]        = useState("");
  const [password, setPassword]  = useState("");
  const [showPw, setShowPw]      = useState(false);
  const { login }                = useAuth();

  const setRole = (r: "landlord" | "tenant") => { setRoleState(r); onRoleChange(r); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ role });
  };

  return (
    <div className="w-full max-w-md">

      {/* Wordmark */}
      <Link href="/" className="mb-10 block hover:opacity-80 transition-opacity">
        <Logo size="sm" />
      </Link>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Welcome back</h1>
        <p className="text-sm text-[#6B7280] mt-1">Sign in to your account to continue.</p>
      </div>

      {/* Role toggle */}
      <div className="flex gap-1 p-1 bg-[#F4F4F0] rounded-xl mb-8">
        {(["landlord", "tenant"] as const).map(r => (
          <button key={r} type="button" onClick={() => setRole(r)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all",
              role === r
                ? "bg-white text-[#1B5E45] shadow-sm shadow-black/8"
                : "text-[#6B7280] hover:text-[#1A1A1A]"
            )}>
            {r === "landlord" ? <Building2 className="h-4 w-4" /> : <Home className="h-4 w-4" />}
            {r === "landlord" ? "Landlord" : "Tenant"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-[#374151] ml-0.5">Email address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#1B5E45] transition-colors" />
            <input type="email" required placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E0E8E3] bg-white text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] outline-none focus:border-[#1B5E45] focus:shadow-[0_0_0_3px_rgba(27,94,69,0.1)] transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between ml-0.5">
            <label className="text-[12px] font-semibold text-[#374151]">Password</label>
            <Link href="#" className="text-[12px] text-[#1B5E45] font-medium hover:underline">Forgot password?</Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#1B5E45] transition-colors" />
            <input type={showPw ? "text" : "password"} required placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#E0E8E3] bg-white text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] outline-none focus:border-[#1B5E45] focus:shadow-[0_0_0_3px_rgba(27,94,69,0.1)] transition-all shadow-sm"
            />
            <button type="button" onClick={() => setShowPw(s => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2 pt-1">
          <input type="checkbox" id="remember"
            className="h-4 w-4 rounded border-[#E0E8E3] accent-[#1B5E45] cursor-pointer" />
          <label htmlFor="remember" className="text-[13px] text-[#6B7280] cursor-pointer select-none">
            Keep me signed in for 30 days
          </label>
        </div>

        {/* Submit */}
        <button type="submit"
          className="w-full h-11 rounded-xl bg-[#1B5E45] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#246B4F] hover:shadow-lg hover:shadow-[#1B5E45]/25 hover:-translate-y-px active:translate-y-0 transition-all shadow-md shadow-[#1B5E45]/20 mt-2">
          Sign in
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E0E8E3]" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-[#FAFAF8] text-[11px] text-[#9CA3AF] font-medium">or continue with</span>
        </div>
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Google", svg: <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.01.67-2.28 1.05-3.71 1.05-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
          { label: "Facebook", svg: <svg className="h-4 w-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
        ].map(s => (
          <button key={s.label}
            className="h-11 rounded-xl border border-[#E0E8E3] bg-white text-[13px] font-semibold text-[#374151] hover:border-[#C4D4C9] hover:bg-[#F4F9F6] transition-all flex items-center justify-center gap-2.5 shadow-sm">
            {s.svg} {s.label}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 space-y-4">
        <p className="text-center text-[13px] text-[#6B7280]">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-[#1B5E45] font-semibold hover:underline">Create one free</Link>
        </p>
        <Link href="/" className="flex items-center justify-center gap-2 text-[12px] text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
          <ArrowLeft className="h-3 w-3" /> Back to home
        </Link>
      </div>
    </div>
  );
}

/* ── Hero Panel ──────────────────────────────────────────────────────── */
function HeroPanel({ role }: { role: "landlord" | "tenant" }) {
  const h = HERO[role];
  return (
    <div className="hidden lg:flex flex-col relative overflow-hidden bg-[#0d1f17]">
      {/* Full background image */}
      <AnimatePresence mode="wait">
        <motion.img key={role}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          src={h.image} alt="" aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Layered dark overlay — keeps text readable */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-12">
        {/* Top: wordmark */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo size="sm" light />
        </Link>

        {/* Center: headline card */}
        <AnimatePresence mode="wait">
          <motion.div key={role}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3DBE7A]/20 border border-[#3DBE7A]/30">
              <div className="h-1.5 w-1.5 rounded-full bg-[#3DBE7A] animate-pulse" />
              <span className="text-[11px] font-semibold text-[#3DBE7A] uppercase tracking-wider">{h.label}</span>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white leading-tight tracking-tight">{h.headline}</h2>
              <p className="text-[#7FD9A8]/70 text-[15px] leading-relaxed mt-4 max-w-sm">{h.body}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {h.stat.map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-2xl font-bold text-white">{s.v}</p>
                  <p className="text-[11px] text-white/40 mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom: trust badges */}
        <div className="space-y-3">
          <p className="text-[11px] font-semibold text-white/30 uppercase tracking-wider">Trusted & Secure</p>
          <div className="flex flex-col gap-2">
            {TRUST.map((t, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#3DBE7A] shrink-0" />
                <span className="text-[12px] text-white/60">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────── */
function LoginContent() {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<"landlord" | "tenant">(
    searchParams.get("role") === "tenant" ? "tenant" : "landlord"
  );

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr] bg-[#FAFAF8]">
      {/* Left: Form */}
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-12 lg:px-16">
        <LoginForm onRoleChange={setRole} />
      </div>
      {/* Right: Hero */}
      <HeroPanel role={role} />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-[#E8F5EE] border border-[#C4D4C9] flex items-center justify-center animate-pulse">
            <div className="h-6 w-6 rounded-lg bg-[#1B5E45]" />
          </div>
          <p className="text-sm text-[#6B7280] font-medium">Loading...</p>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}