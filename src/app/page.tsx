"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Briefcase,
  Users,
  Zap,
  ShieldCheck,
  TrendingUp,
  Star,
  Smartphone,
  Layers,
  Shield,
  Globe,
  MessageSquare,
  Bell,
  FileText,
  CreditCard,
  BarChart3,
  Home as HomeIcon,
  ChevronLeft,
  ChevronRight,
  Play,
  Clock,
  MapPin,
  Wrench,
  Lock,
  PieChart,
  Receipt,
  Calendar,
  CheckCheck,
  Building2,
  Award,
  HeadphonesIcon,
  ArrowUpDown,
  Banknote,
  Eye,
  AlarmCheck,
  X,
  ChevronDown,
  Circle,
  DollarSign,
  Percent,
  Activity,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import Logo from "@/components/Logo";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";

// ─── REVEAL ────────────────────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const variants = {
    up:    { hidden: { opacity: 0, y: 28 },  visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 28 },  visible: { opacity: 1, x: 0 } },
    none:  { hidden: { opacity: 0 },          visible: { opacity: 1 } },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration: 0.72, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── COUNTER ────────────────────────────────────────────────────────────────
function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(parseFloat((ease * to).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, decimals]);
  return <span ref={ref}>{decimals ? count.toFixed(decimals) : Math.floor(count)}{suffix}</span>;
}

// ─── HERO SLIDES ────────────────────────────────────────────────────────────
const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=85",
    tag: "Property Management",
    eyebrow: "Trusted by 2,000+ Professionals",
    headline: "Properties",
    headlineAccent: "Perfected.",
    sub: "Institutional-grade property management for elite landlords and discerning residents. Precision tools, uncompromising security.",
    cta: "Management Portal",
    ctaHref: "/auth/login?role=landlord",
    ctaSecondary: "Watch Demo",
    kpis: [
      { label: "Collection Rate", value: "99.2%" },
      { label: "Properties Live", value: "1,200+" },
    ],
  },
  {
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85",
    tag: "Smart Analytics",
    eyebrow: "Real-time intelligence",
    headline: "Insights",
    headlineAccent: "Amplified.",
    sub: "Turn complex Propertys into clear, actionable intelligence. Real-time dashboards that drive confident, profitable decisions.",
    cta: "View Dashboard",
    ctaHref: "/auth/login?role=landlord",
    ctaSecondary: "See Analytics",
    kpis: [
      { label: "Property Growth", value: "+24%" },
      { label: "Avg Yield", value: "8.4%" },
    ],
  },
  {
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2400&q=85",
    tag: "Resident Experience",
    eyebrow: "Modern living, simplified",
    headline: "Living",
    headlineAccent: "Elevated.",
    sub: "Frictionless M-Pesa payments, transparent communication, and a beautiful digital home experience built for the modern era.",
    cta: "Browse Residences",
    ctaHref: "/auth/login?role=tenant",
    ctaSecondary: "Explore Features",
    kpis: [
      { label: "Satisfaction Score", value: "4.9/5" },
      { label: "Avg Response", value: "< 14m" },
    ],
  },
];

// ─── HERO CAROUSEL ──────────────────────────────────────────────────────────
function HeroCarousel() {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const [progress, setProgress] = useState(0);
  const timer   = useRef<ReturnType<typeof setInterval> | null>(null);
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION = 6000;

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    setProgress(0);
  }, []);
  const next = useCallback(() => goTo((active + 1) % SLIDES.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + SLIDES.length) % SLIDES.length), [active, goTo]);

  // Progress ticker
  useEffect(() => {
    if (paused) return;
    setProgress(0);
    progRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        return p + 100 / (DURATION / 50);
      });
    }, 50);
    timer.current = setTimeout(next, DURATION);
    return () => {
      if (progRef.current) clearInterval(progRef.current);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, paused, next]);

  const slide = SLIDES[active];

  return (
    <section
      className="relative min-h-[70dvh] md:min-h-dvh flex items-end md:items-center overflow-hidden"

      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background images with crossfade ─────────────────────────── */}
      <AnimatePresence>
        {SLIDES.map((s, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 z-0"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <img
              src={s.img}
              alt=""
              className="w-full h-full object-cover scale-[1.03] transition-transform duration-[8000ms] ease-out"
              style={{ transform: i === active ? "scale(1)" : "scale(1.04)" }}
            />
            {/* Multi-layer overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            {/* Subtle emerald tint at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1B5E45]/20 to-transparent" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Slide number — top right ───────────────────────────────────── */}
      <div className="absolute top-24 right-6 z-20 md:top-28 md:right-10 hidden sm:flex items-center gap-2">
        <span className="text-[8px] sm:text-[9px] md:text-[11px] font-normal text-white/30 tabular-nums tracking-[0.2em]">
          0{active + 1}
        </span>
        <div className="h-px w-6 bg-white/15" />
        <span className="text-[8px] sm:text-[9px] md:text-[11px] font-normal text-white/15 tabular-nums tracking-[0.2em]">
          0{SLIDES.length}
        </span>
      </div>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="container relative z-10 px-6 md:px-10 max-w-7xl mx-auto w-full pb-44 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[calc(70dvh)] md:min-h-[calc(100dvh-4rem)]">


          {/* Left: Text content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 pt-24 md:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${active}`}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-6 md:space-y-8"
              >
                {/* Eyebrow pill */}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.55 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-md"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3DBE7A] animate-pulse" />
                  <span className="text-[9px] sm:text-[10px] md:text-[11px] font-normal uppercase tracking-[0.18em] text-white/80">
                    {slide.tag}
                  </span>
                  <div className="h-3 w-px bg-white/20" />
                  <span className="text-[11px] text-white/40 ">{slide.eyebrow}</span>
                </motion.div>

                {/* Headline */}
                <div className="space-y-1 overflow-hidden">
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                    className="text-[2.5rem] sm:text-[3.5rem] md:text-[5.5rem] lg:text-[6.5rem] tracking-[-0.04em] leading-[0.88] text-white"
                  >
                    {slide.headline}
                  </motion.h1>
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                    className="text-[2.5rem] sm:text-[3.5rem] md:text-[5.5rem] lg:text-[6.5rem] tracking-[-0.04em] leading-[0.88] text-[#3DBE7A]"
                  >
                    {slide.headlineAccent}
                  </motion.h1>
                </div>

                {/* Sub */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-base md:text-lg text-white/70 leading-relaxed font-light max-w-lg"
                >
                  {slide.sub}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.6 }}
                  className="flex flex-row items-center gap-3"
                >
                  <Link href={slide.ctaHref} className="flex-1">
                    <button className="w-full group h-12 md:h-14 px-6 rounded-2xl bg-[#1B5E45] hover:bg-[#246B4F] text-white font-normal text-[11px] sm:text-[12px] md:text-sm flex items-center justify-center gap-2 md:gap-3 shadow-xl shadow-[#1B5E45]/30 hover:shadow-2xl hover:shadow-[#1B5E45]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                      <span className="truncate">{slide.cta}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <button className="flex-1 group h-12 md:h-14 px-6 rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md text-white text-[11px] sm:text-[12px] md:text-sm flex items-center justify-center gap-2 md:gap-3 hover:bg-white/15 hover:border-white/25 transition-all duration-200">
                    <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 hidden sm:flex">
                      <Play className="h-3 w-3 text-white fill-white ml-0.5" />
                    </div>
                    <span className="truncate">{slide.ctaSecondary}</span>
                  </button>
                </motion.div>


                {/* KPI pills */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.46, duration: 0.6 }}
                  className="grid grid-cols-2 gap-3 pt-2 md:flex md:flex-wrap"
                >
                  {slide.kpis.map((kpi, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 pl-4 pr-5 py-2.5 rounded-2xl bg-white/6 backdrop-blur-sm border border-white/10 w-full md:w-auto">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#3DBE7A] shrink-0" />
                        <span className="text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider truncate">{kpi.label}</span>
                      </div>
                      <span className="text-xs sm:text-[13px] md:text-sm font-normal text-white whitespace-nowrap">{kpi.value}</span>
                    </div>
                  ))}
                </motion.div>


                {/* Avatars trust row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.6 }}
                  className="flex items-center gap-4 pt-6 md:pt-10"
                >
                  <div className="flex -space-x-3">
                    {[33, 34, 35, 36].map(n => (
                      <div key={n} className="h-9 w-9 rounded-xl border-2 border-black/30 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/128?img=${n}`} alt="" className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-[#3DBE7A] text-[#3DBE7A]" />)}
                    </div>
                    <p className="text-[11px] text-white/50">2,000+ property professionals</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Dashboard card */}
          <div className="hidden lg:block lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${active}`}
                initial={{ opacity: 0, x: 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.96 }}
                transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
              >
                <DashboardPreviewCard slide={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Bottom controls bar ───────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Thin progress bar across full width */}
        <div className="h-[2px] bg-white/10">
          <motion.div
            className="h-full bg-[#3DBE7A]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex items-center justify-between py-5 gap-6">

            {/* Slide pills */}
            <div className="flex items-center gap-4">
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={cn(
                    "flex items-center gap-2.5 transition-all duration-300 group",
                    i === active ? "opacity-100" : "opacity-30 hover:opacity-60"
                  )}
                >
                  <div className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    i === active ? "w-10 bg-[#3DBE7A]" : "w-4 bg-white group-hover:w-6"
                  )} />
                  <span className="hidden sm:block text-[8px] sm:text-[9px] md:text-[10px] font-normal uppercase tracking-wider text-white">
                    {s.tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Prev / Pause / Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="h-9 w-9 rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white/25 transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPaused(p => !p)}
                className="h-9 w-9 rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                {paused
                  ? <Play className="h-3.5 w-3.5 fill-white" />
                  : <Pause className="h-3.5 w-3.5" />
                }
              </button>
              <button
                onClick={next}
                className="h-9 w-9 rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white/25 transition-all"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── DASHBOARD PREVIEW CARD ─────────────────────────────────────────────────
function DashboardPreviewCard({ slide }: { slide: number }) {
  const cards = [
    // Slide 0 – Property overview
    <div key={0}>
      <div className="flex justify-between items-start mb-7">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-[#E8F5EE] border border-[#C4D4C9] flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-[#1B5E45]" />
          </div>
          <div>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] font-normal uppercase tracking-widest text-[#6B7280]">Platform Status</p>
            <p className="font-normal text-[11px] sm:text-[12px] md:text-[15px] text-[#1A1A1A]">Enterprise Secure</p>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-full border border-[#C4D4C9] bg-[#E8F5EE] flex items-center gap-1.5 text-[10px] font-normal text-[#1B5E45]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DBE7A] animate-pulse" />
          LIVE
        </div>
      </div>
      <div className="space-y-5 mb-7">
        {[
          { label: "Collection Rate", value: "99.2%", w: "99%" },
          { label: "Occupancy Rate",  value: "94%",   w: "94%" },
          { label: "Maintenance SLA", value: "97.8%", w: "97.8%" },
        ].map((s, i) => (
          <div key={i} className="space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="text-[#6B7280]">{s.label}</span>
              <span className="font-normal text-[#1B5E45]">{s.value}</span>
            </div>
            <div className="h-1.5 bg-[#E8F5EE] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: s.w }}
                transition={{ delay: 0.4 + i * 0.15, duration: 1.2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#246B4F] to-[#3DBE7A] rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 pt-5 border-t border-[#E0E8E3]">
        {[
          { label: "Global Yield", val: "98%" },
          { label: "Assets",       val: "1,200+" },
          { label: "Markets",      val: "14" },
        ].map((s, i) => (
          <div key={i} className="text-center p-3 rounded-xl bg-[#FAFAF8] border border-[#E0E8E3]">
            <p className="text-[9px] uppercase tracking-widest text-[#6B7280] mb-1">{s.label}</p>
            <p className="text-lg md:text-xl font-normal text-[#1A1A1A] tracking-tight">{s.val}</p>
          </div>
        ))}
      </div>
    </div>,

    // Slide 1 – Analytics
    <div key={1}>
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-[10px] font-normal uppercase tracking-widest text-[#6B7280] mb-0.5">Analytics Dashboard</p>
          <p className="font-normal text-[11px] sm:text-[12px] md:text-[15px] text-[#1A1A1A]">Q4 2025 Overview</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#E8F5EE] text-[#1B5E45] text-[10px] font-normal border border-[#C4D4C9]">↑ 24% YoY</span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { icon: DollarSign, label: "Revenue",  val: "KSh 4.2M", delta: "+18%" },
          { icon: HomeIcon,   label: "Units",    val: "1,247",    delta: "+34" },
          { icon: Percent,    label: "Vacancy",  val: "6.0%",     delta: "-2.1%" },
          { icon: Activity,   label: "Requests", val: "384",      delta: "-12%" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl border border-[#E0E8E3] bg-[#FAFAF8] p-4">
            <div className="flex items-center justify-between mb-2.5">
              <s.icon className="h-4 w-4 text-[#1B5E45]" />
              <span className="text-[9px] font-normal text-[#1B5E45] bg-[#E8F5EE] px-2 py-0.5 rounded-full">{s.delta}</span>
            </div>
            <p className="text-base md:text-xl font-normal tracking-tight text-[#1A1A1A] font-money">{s.val}</p>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-[#6B7280] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-[#E0E8E3] bg-[#FAFAF8] p-4">
        <p className="text-[10px] font-normal uppercase tracking-widest text-[#6B7280] mb-3">Revenue Trend</p>
        <div className="flex items-end gap-1.5 h-14">
          {[40,55,45,68,72,65,88,76,92,85,95,100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.35 + i * 0.04, duration: 0.5 }}
              className={cn("flex-1 rounded-t-sm", i === 11 ? "bg-[#3DBE7A]" : "bg-[#3DBE7A]/20")}
            />
          ))}
        </div>
      </div>
    </div>,

    // Slide 2 – Resident portal
    <div key={2}>
      <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-[#E0E8E3]">
        <div className="h-11 w-11 rounded-xl overflow-hidden border border-[#E0E8E3]">
          <img src="https://i.pravatar.cc/128?img=45" alt="" className="object-cover w-full h-full" />
        </div>
        <div>
          <p className="font-normal text-xs md:text-sm text-[#1A1A1A]">Sarah Wanjiku</p>
          <p className="text-[10px] text-[#6B7280]">Unit 4B · Westlands Heights</p>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full bg-[#E8F5EE] text-[#1B5E45] text-[10px] font-normal border border-[#C4D4C9]">Active</div>
      </div>
      <div className="space-y-2.5 mb-5">
        {[
          { icon: CreditCard, label: "Next Payment", val: "KSh 45,000", sub: "Due Apr 1",      color: "text-[#1B5E45]" },
          { icon: Wrench,     label: "Open Request", val: "Plumbing",   sub: "In Progress",    color: "text-amber-600" },
          { icon: FileText,   label: "Lease Expires", val: "Dec 31, 2026", sub: "14 months",   color: "text-[#1A1A1A]" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-xl border border-[#E0E8E3] bg-[#FAFAF8] hover:bg-white hover:border-[#C4D4C9] transition-all">
            <div className="h-9 w-9 rounded-xl bg-[#E8F5EE] flex items-center justify-center flex-shrink-0">
              <item.icon className="h-4 w-4 text-[#1B5E45]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-[#6B7280]">{item.label}</p>
              <p className={cn("text-sm font-normal truncate", item.color, item.val.includes('KSh') && "font-money")}>{item.val}</p>
            </div>
            <p className="text-[9px] text-[#6B7280]">{item.sub}</p>
          </div>
        ))}
      </div>
      <button className="w-full h-11 rounded-xl bg-[#1B5E45] text-white text-sm font-normal flex items-center justify-center gap-2 hover:bg-[#246B4F] transition-colors shadow-md shadow-[#1B5E45]/20">
        <CreditCard className="h-4 w-4" />
        Pay Rent via M-Pesa
      </button>
    </div>,
  ];

  return (
    <div className="relative">
      {/* Glow behind card */}
      <div className="absolute -inset-4 bg-[#3DBE7A]/8 blur-2xl rounded-3xl" />
      <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-white/80">
        {/* Header bar */}
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#E0E8E3]">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#3DBE7A]" />
          </div>
          <div className="flex-1 h-5 rounded-md bg-[#F4F4F0] mx-2 flex items-center px-3">
            <div className="h-1.5 w-1.5 rounded-full bg-[#3DBE7A] mr-2" />
            <div className="h-1.5 w-24 rounded-full bg-[#E0E8E3]" />
          </div>
          <div className="h-5 w-5 rounded-md bg-[#E8F5EE] flex items-center justify-center">
            <div className="h-2 w-2 rounded-sm bg-[#1B5E45]/30" />
          </div>
        </div>

        {cards[slide]}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader show={isLoading} />
      <div className={cn("flex min-h-screen flex-col bg-background", isLoading ? "h-screen overflow-hidden" : "")}>
        <Navbar className="px-4 sm:px-6 lg:px-8" />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <HeroCarousel />
        <TrustLogosBar />
        <MetricBar />
        <SolutionsSection />
        <HowItWorksSection />
        <FeatureGridSection />
        <TestimonialsSection />
        <PricingSection />
        <FinalCTASection />
        <Footer />
      </main>
    </div>
    </>
  );
}

// ─── TRUST LOGOS BAR ────────────────────────────────────────────────────────
function TrustLogosBar() {
  const partners = [
    {
      name: "Safaricom",
      src: "https://i.pinimg.com/736x/ae/b7/b6/aeb7b68c1f3325404efaa619a7334cf4.jpg",
    },
    {
      name: "KCB Bank",
      src: "https://i.pinimg.com/736x/b3/38/bd/b338bd6293ef751c7b2851e19c33c7d6.jpg",
    },
    {
      name: "Equity Bank",
      src: "https://i.pinimg.com/1200x/9e/3f/95/9e3f954e637b8579c4e546fdded3ebe7.jpg",
    },
    {
      name: "Britam",
      src: "https://i.pinimg.com/1200x/ef/d6/2e/efd62e6195bb18b072b9d7f8e7c5c7d4.jpg",
    },
    {
      name: "Absa Group",
      src: "https://i.pinimg.com/1200x/cf/66/cf/cf66cfa76ed6f633c2a0c2392af04a8b.jpg",
    },
    {
      name: "stanbic bank",
      src: "https://i.pinimg.com/1200x/05/fb/f4/05fbf46988bcb2271efcb0ec147f5356.jpg",
    },
    {
      name: "Family Bank",
      src: "https://i.pinimg.com/1200x/3f/6d/d9/3f6dd99e7095a4a06338d967caa63501.jpg",
    },
  ];

  // Tripled for seamless infinite loop
  const items = [...partners, ...partners, ...partners];

  return (
    <div className="border-y border-[#E0E8E3] bg-[#FAFAF8] py-10 overflow-hidden select-none">
      {/* Header label */}
      <p className="text-center text-[8px] sm:text-[9px] md:text-[10px] font-normal uppercase tracking-[0.25em] text-[#6B7280]/60 mb-8">
        Trusted by Kenya&apos;s leading institutions
      </p>

      {/* Scrolling track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#FAFAF8] to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#FAFAF8] to-transparent pointer-events-none" />

        <div
          className="flex items-center gap-6 whitespace-nowrap"
          style={{
            animation: "trust-marquee 35s linear infinite",
            width: "max-content",
          }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              className="
                group flex-shrink-0 flex items-center justify-center
                px-6 py-3 rounded-xl min-w-[120px] min-h-[50px]
                border border-[#E0E8E3] bg-white
                text-[#9CA3AF] hover:text-[#1B5E45]
                hover:border-[#C4D4C9] hover:bg-[#F4F9F6]
                hover:shadow-md hover:shadow-[#1B5E45]/8
                transition-all duration-300 cursor-default
              "
            >
              {p.src ? (
                <img 
                  src={p.src} 
                  alt={`${p.name} logo`} 
                  className="h-8 w-auto object-contain mix-blend-multiply" 
                />
              ) : (
                <span className="text-[10px] md:text-sm font-normal tracking-wide uppercase">{p.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-10 flex items-center justify-center gap-10 flex-wrap px-6">
        {[
          { val: "7+",  label: "Institutional Partners" },
          { val: "ISO 27001", label: "Certified" },
          { val: "PCI DSS",   label: "Compliant" },
          { val: "GDPR",      label: "Ready" },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            {i > 0 && <div className="h-4 w-px bg-[#E0E8E3]" />}
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-sm font-normal text-[#1B5E45]">{s.val}</span>
              <span className="text-[9px] md:text-[11px] text-[#6B7280]">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes trust-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

// ─── METRIC BAR ─────────────────────────────────────────────────────────────
function MetricBar() {
  const stats = [
    { val: 1200, suffix: "+",    label: "Active Properties",  icon: Building2, decimals: 0 },
    { val: 99.2, suffix: "%",    label: "Uptime SLA",         icon: Activity,  decimals: 1 },
    { val: 14,   suffix: " min", label: "Avg Response Time",  icon: Clock,     decimals: 0 },
    { val: 4.9,  suffix: "/5",   label: "Trust Score",        icon: Star,      decimals: 1 },
    { val: 2000, suffix: "+",    label: "Professionals",      icon: Users,     decimals: 0 },
    { val: 98,   suffix: "%",    label: "Collection Rate",    icon: CreditCard,decimals: 0 },
  ];
  return (
    <section className="bg-primary/5 py-14 text-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_50%,#3DBE7A,transparent_50%),radial-gradient(circle_at_80%_50%,#246B4F,transparent_50%)]" />
      <div className="container px-[4px] sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
          {stats.map((s,i) => (
            <Reveal key={i} delay={i*0.08} className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl tracking-tighter tabular-nums">
                <Counter to={s.val} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <div className="h-px w-8 bg-primary/30 mx-auto my-3" />
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-normal">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOLUTIONS ──────────────────────────────────────────────────────────────
function SolutionsSection() {
  return (
    <section className="py-16 md:py-28 bg-background">
      <div className="container px-[4px] sm:px-6 md:px-8 max-w-7xl mx-auto">
        <Reveal className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-normal uppercase tracking-widest mb-4">Built for Both Sides</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] mt-2">Dual Portals. One Powerful Engine.</h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto font-light">Purpose-built experiences that serve every stakeholder — flawlessly.</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title:"For Landlords",role:"Property Managers",
              desc:"Complete control over your Property with intelligent yield tools, automated workflows, and institutional-grade reporting.",
              icon:Briefcase,accent:true,href:"/auth/login?role=landlord",
              features:[
                {icon:BarChart3,text:"Real-time Yield Analytics"},
                {icon:CreditCard,text:"Automated Collections"},
                {icon:FileText,text:"Audit Trails & Compliance"},
                {icon:Bell,text:"Smart Alert System"},
                {icon:PieChart,text:"Property Intelligence"},
                {icon:Users,text:"Tenant CRM"},
              ],
            },
            {
              title:"For Tenants",role:"Residents",
              desc:"Frictionless payments, transparent communication, and a modern living experience built for the digital era.",
              icon:Users,accent:false,href:"/auth/login?role=tenant",
              features:[
                {icon:CreditCard,text:"Instant M-Pesa Payments"},
                {icon:Wrench,text:"Maintenance Requests"},
                {icon:Lock,text:"Secure Document Vault"},
                {icon:Receipt,text:"Payment History"},
                {icon:Calendar,text:"Lease Management"},
                {icon:MessageSquare,text:"Direct Messaging"},
              ],
            },
          ].map((card,i) => (
            <Reveal key={i} delay={i*0.15}>
              <div className={cn(
                "group h-full rounded-3xl p-6 md:p-10 border transition-all duration-500 hover:-translate-y-1",
                card.accent
                  ? "bg-primary/5 text-foreground border-primary/20 shadow-2xl shadow-primary/5 hover:border-primary/30 hover:shadow-primary/10"
                  : "bg-card border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5",
              )}>
                <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-105",card.accent?"bg-primary text-primary-foreground":"bg-primary/10 text-primary")}>
                  <card.icon className="h-8 w-8" strokeWidth={1.6} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-primary">{card.role}</span>
                <h3 className="text-2xl md:text-3xl tracking-tight mt-1 mb-5">{card.title}</h3>
                <p className={cn("text-base leading-relaxed mb-8",card.accent?"text-muted-foreground":"text-muted-foreground")}>{card.desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {card.features.map((f,j) => (
                    <div key={j} className={cn("flex items-center gap-2.5 text-sm ",card.accent?"text-foreground/80":"text-foreground/80")}>
                      <div className="h-6 w-6 rounded-lg bg-primary/12 flex items-center justify-center shrink-0">
                        <f.icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      {f.text}
                    </div>
                  ))}
                </div>
                <Link href={card.href}>
                  <Button variant={card.accent?"default":"default"} className="h-13 px-8 rounded-2xl font-normal w-full group/btn">
                    Access Portal
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ───────────────────────────────────────────────────────────
function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<"landlord"|"tenant">("landlord");
  const steps = {
    landlord:[
      {icon:Building2,step:"01",title:"Register Your Property",desc:"Add your properties in minutes. Our smart onboarding imports existing data and auto-generates unit profiles."},
      {icon:Users,step:"02",title:"Onboard Tenants",desc:"Invite residents via SMS or email. Digital lease signing and KYC verification happen seamlessly in-app."},
      {icon:BarChart3,step:"03",title:"Automate & Collect",desc:"Set rent schedules, M-Pesa prompts, and late fees. Collections happen automatically with real-time reconciliation."},
      {icon:PieChart,step:"04",title:"Track & Grow",desc:"Monitor occupancy, yields, and maintenance from one dashboard. Export compliance reports with one click."},
    ],
    tenant:[
      {icon:HomeIcon,step:"01",title:"Receive Your Invite",desc:"Your landlord sends a digital invite. Verify your identity and sign your lease entirely online — no paper needed."},
      {icon:CreditCard,step:"02",title:"Set Up Payments",desc:"Link your M-Pesa or bank account. Enable auto-pay reminders to never miss a rent deadline again."},
      {icon:Wrench,step:"03",title:"Submit Requests",desc:"Log maintenance issues with photos directly from your phone. Track resolution status in real time."},
      {icon:FileText,step:"04",title:"Manage Your Tenancy",desc:"Access all your documents, payment history, and communications in one secure, beautiful dashboard."},
    ],
  };
  return (
    <section className="py-16 md:py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1B5E45_0.6px,transparent_1px)] bg-size-[28px_28px] opacity-[0.03]" />
      <div className="container px-[4px] sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-normal uppercase tracking-widest mb-4">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em]">Up & running<br />in under 10 minutes.</h2>
        </Reveal>
        <Reveal className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-foreground/6 border border-border">
            {(["landlord","tenant"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-8 py-3 rounded-xl text-xs md:text-sm font-normal transition-all capitalize",activeTab===tab?"bg-primary text-primary-foreground shadow-md":"text-muted-foreground hover:text-foreground")}>
                {tab==="landlord"?"Property Manager":"Resident"}
              </button>
            ))}
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.4}} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps[activeTab].map((s,i) => (
              <div key={i} className="relative">
                {i < steps[activeTab].length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px border-t-2 border-dashed border-primary/20 -translate-y-0.5 z-0" style={{width:"calc(100% - 2.5rem)",left:"calc(50% + 1.25rem)"}} />
                )}
                <div className="relative z-10 bg-card border border-border rounded-3xl p-7 hover:border-primary/20 hover:shadow-lg transition-all group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-13 w-13 rounded-2xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-3xl md:text-4xl text-foreground/6 tabular-nums">{s.step}</span>
                  </div>
                  <h4 className="font-normal text-sm md:text-base mb-2">{s.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── FEATURE GRID ───────────────────────────────────────────────────────────
function FeatureGridSection() {
  const features = [
    {icon:Shield,   title:"Bank-Grade Security",    desc:"256-bit AES encryption, zero-trust architecture, and SOC 2 Type II compliance protect every transaction.", large:true, bg:"bg-foreground text-background"},
    {icon:Smartphone,title:"Mobile-First Design",   desc:"Full functionality from any device. Native app experience in the browser.",                                  large:false,bg:"bg-card"},
    {icon:Zap,      title:"< 14 Min Response",      desc:"Our automated workflows ensure maintenance and support requests are acknowledged fast.",                      large:false,bg:"bg-emerald-soft"},
    {icon:Globe,    title:"Multi-Currency & M-Pesa", desc:"Accept payments in KSh, USD, or GBP. M-Pesa integration built-in with instant reconciliation.",             large:false,bg:"bg-card"},
    {icon:BarChart3,title:"Real-Time Reporting",    desc:"Live dashboards, PDF exports, and scheduled email reports keep all stakeholders informed.",                   large:false,bg:"bg-card"},
    {icon:Bell,     title:"Smart Notifications",    desc:"Automated rent reminders, maintenance updates, and lease renewal alerts — all customisable.",                 large:true, bg:"bg-primary text-primary-foreground"},
    {icon:Award,    title:"Compliance Ready",       desc:"Audit trails, digital signatures, and document retention built for regulatory requirements.",                  large:false,bg:"bg-card"},
    {icon:HeadphonesIcon,title:"24/7 Priority Support",desc:"Dedicated account managers and round-the-clock technical support for enterprise clients.",               large:false,bg:"bg-card"},
  ];
  return (
    <section className="py-16 md:py-28 bg-background">
      <div className="container px-[4px] sm:px-6 md:px-8 max-w-7xl mx-auto">
        <Reveal className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-normal uppercase tracking-widest mb-4">Full Feature Set</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em]">Everything you need.<br />Nothing you don't.</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          {features.map((f,i) => (
            <Reveal key={i} delay={i*0.05} className={cn(f.large?"col-span-2 row-span-1":"col-span-1")}>
              <div className={cn("h-full rounded-3xl p-7 border border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group",f.bg,f.bg==="bg-foreground text-background"&&"border-foreground",f.bg==="bg-primary text-primary-foreground"&&"border-primary shadow-lg shadow-primary/20")}>
                <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-105",f.bg==="bg-foreground text-background"?"bg-primary/15":f.bg==="bg-primary text-primary-foreground"?"bg-primary-foreground/15":f.bg==="bg-emerald-soft"?"bg-primary/15":"bg-primary/8")}>
                  <f.icon className={cn("h-5 w-5",f.bg==="bg-primary text-primary-foreground"?"text-primary-foreground":"text-primary")} />
                </div>
                <h4 className="text-sm md:text-base mb-2">{f.title}</h4>
                <p className={cn("text-sm leading-relaxed",f.bg==="bg-foreground text-background"?"text-background/60":f.bg==="bg-primary text-primary-foreground"?"text-primary-foreground/70":"text-muted-foreground")}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {name:"James Kariuki",   role:"Property Manager · 340 Units", img:33, quote:"Nova cut our arrears from 18% to under 2% in three months. The automated M-Pesa collections alone saved us two full-time staff.",                                                rating:5},
  {name:"Grace Muthoni",  role:"Resident · Westlands Heights",  img:41, quote:"I pay rent in seconds via M-Pesa and can track my maintenance request from submission to completion. Finally a landlord app that respects residents.",                              rating:5},
  {name:"David Omondi",   role:"Real Estate Developer · 12 blocks",img:35,quote:"The Property analytics are institutional-grade. I can see yield performance, vacancy trends, and compliance status across all properties in one dashboard.",                   rating:5},
  {name:"Fatuma Hassan",  role:"Property Manager · Mombasa",    img:42, quote:"Onboarding was done in a day. The support team is phenomenal — they migrated 200 tenant records and had us live before the end of the week.",                                    rating:5},
  {name:"Peter Njoroge",  role:"Tenant · Karen Grove",          img:36, quote:"The document vault keeps my lease, receipts, and correspondence in one place. I've never had this level of transparency with a landlord before.",                                 rating:5},
];

function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <section className="py-16 md:py-28 bg-muted/25 overflow-hidden">
      <div className="container px-[4px] sm:px-6 md:px-8 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-normal uppercase tracking-widest mb-4">Social Proof</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em]">Loved by managers<br />and residents alike.</h2>
        </Reveal>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.5}} className="max-w-3xl mx-auto text-center mb-12">
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(TESTIMONIALS[activeIdx].rating)].map((_,i) => <Star key={i} className="h-5 w-5 fill-primary text-primary" />)}
              </div>
              <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-foreground mb-8">"{TESTIMONIALS[activeIdx].quote}"</blockquote>
              <div className="flex items-center justify-center gap-4">
                <img src={`https://i.pravatar.cc/128?img=${TESTIMONIALS[activeIdx].img}`} alt="" className="h-13 w-13 rounded-2xl object-cover border-2 border-primary/20" />
                <div className="text-left">
                  <p className="font-normal text-sm md:text-base">{TESTIMONIALS[activeIdx].name}</p>
                  <p className="text-sm text-muted-foreground">{TESTIMONIALS[activeIdx].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-3">
            {TESTIMONIALS.map((t,i) => (
              <button key={i} onClick={() => setActiveIdx(i)} className={cn("rounded-xl overflow-hidden border-2 transition-all",i===activeIdx?"border-primary scale-110 shadow-lg shadow-primary/20":"border-transparent opacity-40 hover:opacity-70")}>
                <img src={`https://i.pravatar.cc/128?img=${t.img}`} alt="" className="h-10 w-10 object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ────────────────────────────────────────────────────────────────
function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const plans = [
    {name:"Starter",     price:annual?2900:3500,   desc:"Perfect for individual landlords managing a small Property.",      units:"Up to 20 units",  features:["Basic analytics","M-Pesa collections","Maintenance requests","Email support","Tenant portal","2 admin users"],                                          cta:"Start Free Trial",highlight:false},
    {name:"Professional",price:annual?8900:10500,  desc:"For growing Propertys that demand professional-grade tools.",       units:"Up to 150 units", features:["Full analytics suite","Automated workflows","Digital lease signing","Priority support","Audit trails","Unlimited admins","API access","Custom reports"],cta:"Get Started",    highlight:true},
    {name:"Enterprise",  price:null,               desc:"Tailored solutions for institutional Propertys and developers.",    units:"Unlimited units", features:["Custom integrations","Dedicated account manager","White-label option","SLA guarantee","On-premise option","Custom compliance","Training & onboarding","24/7 phone support"],cta:"Contact Sales",  highlight:false},
  ];
  return (
    <section className="py-16 md:py-28 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(27,94,69,0.04),transparent)]" />
      <div className="container px-[4px] sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-normal uppercase tracking-widest mb-4">Transparent Pricing</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em]">Simple, honest pricing.<br />No surprises.</h2>
        </Reveal>
        <Reveal className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-foreground/5 border border-border">
            {["Monthly","Annual"].map((label,i) => (
              <button key={i} onClick={() => setAnnual(i===1)} className={cn("px-6 py-2.5 rounded-xl text-xs md:text-sm font-normal transition-all",(i===1)===annual?"bg-primary text-primary-foreground shadow":"text-muted-foreground hover:text-foreground")}>
                {label}
                {i===1 && <span className="ml-2 text-[10px] bg-primary-foreground/20 px-2 py-0.5 rounded-full">Save 20%</span>}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan,i) => (
            <Reveal key={i} delay={i*0.1}>
              <div className={cn("relative h-full rounded-3xl p-8 border transition-all duration-300 flex flex-col",plan.highlight?"bg-foreground text-background border-foreground shadow-2xl scale-[1.02]":"bg-card border-border hover:border-primary/20 hover:shadow-lg")}>
                {plan.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-widest shadow-lg">Most Popular</div>}
                <div className="mb-6">
                  <h3 className="text-lg md:text-xl mb-1">{plan.name}</h3>
                  <p className={cn("text-sm",plan.highlight?"text-background/60":"text-muted-foreground")}>{plan.desc}</p>
                </div>
                <div className="mb-6">
                  {plan.price ? (
                    <div className="flex items-end gap-1">
                      <span className="text-3xl md:text-4xl tracking-tight font-money">KSh {plan.price.toLocaleString()}</span>
                      <span className={cn("text-sm mb-1.5",plan.highlight?"text-background/50":"text-muted-foreground")}>/mo</span>
                    </div>
                  ) : <p className="text-2xl md:text-3xl">Custom</p>}
                  <p className="text-xs mt-1.5 text-primary">{plan.units}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f,j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <CheckCheck className="h-4 w-4 text-primary shrink-0" />
                      <span className={plan.highlight?"text-background/80":""}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.price?"/auth/register":"/contact"}>
                  <Button variant={plan.highlight?"secondary":"default"} className="w-full h-13 rounded-2xl font-normal text-sm md:text-base">
                    {plan.cta}<ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3} className="text-center mt-10">
          <p className="text-sm text-muted-foreground">All plans include a 14-day free trial. No credit card required. Cancel anytime.</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FINAL CTA ───────────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section className="py-32 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(61,190,122,0.08),transparent)]" />
      <div className="container px-[4px] sm:px-6 md:px-8 max-w-4xl mx-auto text-center relative z-10 space-y-10">
        <Reveal>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-normal uppercase tracking-widest mb-4">Ready when you are</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em] text-background leading-tight">Start building<br />your legacy today.</h2>
          <p className="text-lg text-background/50 max-w-lg mx-auto font-light mt-5">Join 2,000+ property professionals who manage their Propertys with confidence on Nova.</p>
        </Reveal>
        <Reveal delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/auth/register">
            <Button size="lg" className="h-16 px-[4px]4 rounded-3xl text-sm md:text-base shadow-2xl shadow-primary/30 hover:scale-[1.03] transition-all">
              Get Started — Free<ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="h-16 px-[4px]0 rounded-3xl border border-background/10 text-background bg-transparent hover:bg-background/5 text-sm md:text-base font-normal">
            Schedule a Demo<Calendar className="ml-3 h-5 w-5" />
          </Button>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-background/40 ">
            {["14-day free trial","No credit card","Cancel anytime","Free data migration"].map(item => (
              <div key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" />{item}</div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-20 pb-12">
      <div className="container px-[4px] sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4 space-y-6">
            <Logo />
            <p className="text-base text-muted-foreground max-w-xs leading-relaxed">Institutional property management, reimagined with elegance and precision for the modern era.</p>
            <div className="pt-2 flex items-center gap-2.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                All systems operational
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-10">
            {[
              {title:"Platform",links:["Features","Security","Pricing","Enterprise","API","Status"]},
              {title:"Company",links:["About","Blog","Careers","Press","Contact","Partners"]},
              {title:"Resources",links:["Documentation","Help Center","Video Tutorials","Webinars","Community"]},
              {title:"Legal",links:["Privacy Policy","Terms of Service","Cookie Policy","GDPR","Data DPA"]},
            ].map((col,i) => (
              <div key={i} className="space-y-4">
                <h5 className="font-normal text-xs md:text-sm tracking-tight">{col.title}</h5>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {col.links.map(link => (
                    <li key={link}><Link href="#" className="hover:text-primary transition-colors">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 Nova Systems Ltd. All rights reserved. Registered in Kenya.</p>
          <div className="flex items-center gap-3">
            {["ISO 27001 Certified","PCI DSS Compliant","GDPR Ready"].map(badge => (
              <span key={badge} className="px-3 py-1 rounded-full border border-border bg-muted/40">{badge}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}