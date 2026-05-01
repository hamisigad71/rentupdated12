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
  ChevronUp,
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
const CustomChatIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url("/chat.png")', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url("/chat.png")', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomPropertyIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current px-0", className)}
    style={{
      WebkitMaskImage: 'url(/property.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/property.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomTenantIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/tenant.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/tenant.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomAnalyticIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/analytic.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/analytic.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomSuitcaseIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/suitcase.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/suitcase.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomTrackIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/track.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/track.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomMoneyExchangeIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/money-exchange.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/money-exchange.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomSmartphoneIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/smartphone.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/smartphone.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomSupportIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/support.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/support.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomUserIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/user.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/user.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomResponseTimeIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/response-time.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/response-time.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);
const CustomAwardIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/award-symbol.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/award-symbol.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomCreditCardIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/credit-card.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/credit-card.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomDocumentIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/document.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/document.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomMoneyIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/money.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/money.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomHomeIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
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

const CustomCalendarIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/calendar.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/calendar.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomBillIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
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
);

const CustomFolderIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/folder.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/folder.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomRingingIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/ringing.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/ringing.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomWalletIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url("/money (3).png")', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url("/money (3).png")', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);
import { Navbar } from "@/components/Navbar";
import Logo from "@/components/Logo";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";

// --- REVEAL ----------------------------------------------------------------
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

// --- COUNTER ----------------------------------------------------------------
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

// --- HERO SLIDES ------------------------------------------------------------
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

// --- HERO CAROUSEL ----------------------------------------------------------
function HeroCarousel() {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const [progress, setProgress] = useState(0);
  const timer   = useRef<ReturnType<typeof setInterval> | null>(null);
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION = 7000;

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
    const intervalMs = 16;
    progRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        return p + 100 / (DURATION / intervalMs);
      });
    }, intervalMs);
    timer.current = setTimeout(next, DURATION);
    return () => {
      if (progRef.current) clearInterval(progRef.current);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, paused, next]);

  const slide = SLIDES[active];

  return (
    <section
      className="relative min-h-[55dvh] md:min-h-dvh flex items-end md:items-center overflow-hidden"

      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* -- Background images with crossfade --------------------------- */}
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

      {/* -- Slide number — top right ------------------------------------- */}
      <div className="absolute top-24 right-6 z-20 md:top-28 md:right-10 hidden sm:flex items-center gap-2">
        <span className="text-[8px] sm:text-[9px] md:text-[11px] font-normal text-white/30 tabular-nums tracking-[0.2em]">
          0{active + 1}
        </span>
        <div className="h-px w-6 bg-white/15" />
        <span className="text-[8px] sm:text-[9px] md:text-[11px] font-normal text-white/15 tabular-nums tracking-[0.2em]">
          0{SLIDES.length}
        </span>
      </div>

      {/* -- Main content ------------------------------------------------ */}
      <div className="container relative z-10 px-6 md:px-10 max-w-7xl mx-auto w-full pb-24 md:pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[calc(55dvh)] md:min-h-[calc(100dvh-4rem)]">


          {/* Left: Text content */}
          <div className="lg:col-span-7 space-y-4 md:space-y-8 pt-16 md:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${active}`}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-4 md:space-y-8"
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
                  className="grid grid-cols-2 gap-3 pt-0 md:flex md:flex-wrap"
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
                  className="flex items-center gap-4 pt-2 md:pt-10"
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

      {/* -- Bottom controls bar ----------------------------------------- */}
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

// --- DASHBOARD PREVIEW CARD -------------------------------------------------
function DashboardPreviewCard({ slide }: { slide: number }) {
  const cards = [
    // Slide 0 – Property overview
    <div key={0}>
      <div className="flex justify-between items-start mb-7">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-[#E8F5EE] border border-[#C4D4C9] flex items-center justify-center">
            <CustomUserIcon className="h-6 w-6 text-[#1B5E45]" />
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
          <div key={i} className="text-center p-3 rounded-2xl bg-[#FAFAF8] border border-[#E0E8E3]">
            <p className="text-[9px] uppercase tracking-widest text-[#6B7280] mb-1">{s.label}</p>
            <p className="text-lg md:text-xl font-medium text-[#1A1A1A] tracking-tight">{s.val}</p>
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
          { icon: CustomMoneyIcon,    label: "Revenue",  val: "KSh 4.2M", delta: "+18%", variant: "dark" },
          { icon: CustomHomeIcon,     label: "Units",    val: "1,247",    delta: "+34", variant: "light" },
          { icon: CustomWalletIcon,   label: "Vacancy",  val: "6.0%",     delta: "-2.1%", variant: "light" },
          { icon: CustomAnalyticIcon, label: "Requests", val: "384",      delta: "-12%", variant: "light" },
        ].map((s, i) => (
          <div key={i} className={cn(
             "rounded-2xl p-4 transition-all duration-300 shadow-sm relative overflow-hidden",
             s.variant === "dark" 
                ? "bg-gradient-to-br from-[#0c4a34] to-[#062b1e] border-transparent"
                : "border border-[#E0E8E3] bg-[#FAFAF8]"
          )}>
            {s.variant === "dark" && (
              <div className="absolute bottom-5 left-0 right-0 h-6 pointer-events-none opacity-40">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-emerald-400 fill-none" strokeWidth="0.5">
                  <path d="M0 20 Q 20 18, 30 15 T 60 10 T 100 5"></path>
                </svg>
              </div>
            )}
            <div className="flex items-center justify-between mb-2.5 relative z-10">
              <div className={cn("h-6 w-6 rounded-md flex items-center justify-center", s.variant === "dark" ? "bg-white/10" : "")}>
                <s.icon className={cn("h-4 w-4", s.variant === "dark" ? "text-white" : "text-[#1B5E45]")} />
              </div>
              <span className={cn(
                "text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1",
                s.variant === "dark" ? "bg-emerald-500/20 text-emerald-300" : "bg-[#E8F5EE] text-[#1B5E45]"
              )}>{s.delta}</span>
            </div>
            <p className={cn("text-base md:text-xl font-bold tracking-tight font-money relative z-10", s.variant === "dark" ? "text-white" : "text-[#1A1A1A]")}>{s.val}</p>
            <p className={cn("text-[8px] sm:text-[9px] md:text-[10px] mt-0.5 uppercase tracking-wider relative z-10", s.variant === "dark" ? "text-white/60" : "text-[#6B7280]")}>{s.label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-[#E0E8E3] bg-[#FAFAF8] p-4 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280] mb-3">Revenue Trend</p>
        <div className="flex items-end gap-1.5 h-14">
          {[40,55,45,68,72,65,88,76,92,85,95,100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.35 + i * 0.04, duration: 0.5 }}
              className={cn("flex-1 rounded-[4px]", i === 11 ? "bg-[#3DBE7A]" : "bg-[#3DBE7A]/20")}
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
      <div className="space-y-2.5 mb-5 text-left">
        {[
          { icon: CustomCreditCardIcon, label: "Next Payment", val: "KSh 45,000", sub: "Due Apr 1",      color: "text-[#1B5E45]" },
          { icon: CustomChatIcon,       label: "Open Request", val: "Plumbing",   sub: "In Progress",    color: "text-amber-600" },
          { icon: CustomDocumentIcon,   label: "Lease Expires", val: "Dec 31, 2026", sub: "14 months",   color: "text-[#1A1A1A]" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-black/[0.04] bg-[#FAFAF8] shadow-sm hover:bg-white hover:border-[#C4D4C9] transition-all">
            <div className="h-9 w-9 rounded-xl bg-[#E8F5EE] flex items-center justify-center flex-shrink-0">
              <item.icon className="h-4.5 w-4.5 text-[#1B5E45]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold tracking-wider uppercase text-[#6B7280]">{item.label}</p>
              <p className={cn("text-sm font-bold truncate", item.color, item.val.includes('KSh') && "font-money")}>{item.val}</p>
            </div>
            <p className="text-[9px] font-medium text-[#6B7280]">{item.sub}</p>
          </div>
        ))}
      </div>
      <button className="w-full h-11 rounded-xl bg-[#1B5E45] text-white text-sm font-normal flex items-center justify-center gap-2 hover:bg-[#246B4F] transition-colors shadow-md shadow-[#1B5E45]/20">
        <CustomCreditCardIcon className="h-6 w-6" />
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

// --- MAIN PAGE ---------------------------------------------------------------
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minDisplay = 1500; // minimum ms to show the loader
    const start = Date.now();

    const hide = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minDisplay - elapsed);
      setTimeout(() => setIsLoading(false), remaining);
    };

    if (document.readyState === "complete") {
      // Page already loaded (e.g. fast cache hit)
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
      // Safety fallback in case load never fires
      const fallback = setTimeout(hide, 8000);
      return () => {
        window.removeEventListener("load", hide);
        clearTimeout(fallback);
      };
    }
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

// --- TRUST LOGOS BAR --------------------------------------------------------
function TrustLogosBar() {
  const partners = [
    {
      name: "Mpesa",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLnyv6AXS3DPxlSvGmTSRhW6BV5yUFqVMOKw&s",
      cover: true,
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
      cover: true,
    },
    {
      name: "Family Bank",
      src: "https://i.pinimg.com/1200x/3f/6d/d9/3f6dd99e7095a4a06338d967caa63501.jpg",
      cover: true,
    },
  ];

  // Tripled for seamless infinite loop
  const items = [...partners, ...partners, ...partners];

  return (
    <div className="border-y border-[#E0E8E3] bg-[#FAFAF8] pt-14 pb-10 overflow-hidden select-none">
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
                  className={`w-28 h-10 mix-blend-multiply ${p.cover ? "object-cover" : "object-contain"}`} 
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

// --- METRIC BAR -------------------------------------------------------------
function MetricBar() {
  const stats = [
    { val: 1200, suffix: "+",    label: "Active Properties",  icon: CustomPropertyIcon, decimals: 0 },
    { val: 99.2, suffix: "%",    label: "Uptime SLA",         icon: CustomAnalyticIcon,  decimals: 1 },
    { val: 14,   suffix: " min", label: "Avg Response Time",  icon: CustomResponseTimeIcon,     decimals: 0 },
    { val: 4.9,  suffix: "/5",   label: "Trust Score",        icon: CustomAwardIcon,      decimals: 1 },
    { val: 2000, suffix: "+",    label: "Professionals",      icon: CustomUserIcon,     decimals: 0 },
    { val: 98,   suffix: "%",    label: "Collection Rate",    icon: CustomCreditCardIcon,decimals: 0 },
  ];
  return (
    <section className="bg-primary/5 py-14 text-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_50%,#3DBE7A,transparent_50%),radial-gradient(circle_at_80%_50%,#246B4F,transparent_50%)]" />
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
          {stats.map((s,i) => (
            <Reveal key={i} delay={i*0.08} className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <s.icon className="h-6 w-6 text-primary" />
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

// --- SOLUTIONS --------------------------------------------------------------
function SolutionsSection() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E0E8E3] shadow-sm mb-6">
            <div className="h-1.5 w-1.5 rounded-full bg-[#3DBE7A] animate-pulse" />
            <span className="text-[10px] text-[#1B5E45] font-medium uppercase tracking-[0.2em] pt-[1px]">Built for Both Sides</span>
          </div>
          <h2 className="text-xl min-[400px]:text-[22px] sm:text-4xl md:text-5xl tracking-tighter md:tracking-[-0.03em] font-medium text-[#1A1A1A] max-w-2xl mx-auto whitespace-nowrap sm:whitespace-normal">
            Dual Portals. <span className="bg-gradient-to-r from-[#1B5E45] via-[#246B4F] to-[#3DBE7A] bg-clip-text text-transparent">One Powerful Engine.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#6B7280] max-w-xl mx-auto font-light leading-relaxed">
            Purpose-built experiences that serve every stakeholder — flawlessly. Eliminate friction across your entire property portfolio.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title:"For Landlords",role:"Property Managers",
              desc:"Complete control over your Property with intelligent yield tools, automated workflows, and institutional-grade reporting.",
              icon:CustomSuitcaseIcon,accent:true,href:"/auth/login?role=landlord",
              features:[
                {icon:CustomAnalyticIcon,text:"Real-time Yield Analytics"},
                {icon:CustomCreditCardIcon,text:"Automated Collections"},
                {icon:CustomDocumentIcon,text:"Audit Trails & Compliance"},
                {icon:CustomRingingIcon,text:"Smart Alert System"},
                {icon:CustomPropertyIcon,text:"Property Intelligence"},
                {icon:CustomTenantIcon,text:"Tenant CRM"},
              ],
            },
            {
              title:"For Tenants",role:"Residents",
              desc:"Frictionless payments, transparent communication, and a modern living experience built for the digital era.",
              icon:CustomTenantIcon,accent:false,href:"/auth/login?role=tenant",
              features:[
                {icon:CustomCreditCardIcon,text:"Instant M-Pesa Payments"},
                {icon:CustomWrenchIcon,text:"Maintenance Requests"},
                {icon:CustomFolderIcon,text:"Secure Document Vault"},
                {icon:CustomBillIcon,text:"Payment History"},
                {icon:CustomCalendarIcon,text:"Lease Management"},
                {icon:CustomChatIcon,text:"Direct Messaging"},
              ],
            },
          ].map((card,i) => (
            <Reveal key={i} delay={i*0.15}>
              <div className={cn(
                "group h-full rounded-[2rem] p-6 md:p-10 border transition-all duration-500 hover:-translate-y-1",
                card.accent
                  ? "bg-gradient-to-br from-[#0c4a34] to-[#062b1e] border-transparent shadow-[#0c4a34]/20 text-white shadow-2xl"
                  : "bg-[#FAFAF8] border-[#E0E8E3] hover:border-[#C4D4C9] hover:shadow-xl hover:shadow-[#1B5E45]/5",
              )}>
                <div className="flex items-center justify-between mb-8">
                  <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",card.accent?"bg-white/10 text-white":"bg-[#E8F5EE] text-[#1B5E45]")}>
                    <card.icon className="h-8 w-8" />
                  </div>
                  <div className="text-right">
                    <span className={cn("text-[10px] uppercase tracking-[0.15em] block", card.accent ? "text-emerald-300" : "text-[#1B5E45]")}>{card.role}</span>
                    <h3 className={cn("text-2xl md:text-3xl tracking-tight mt-1 font-semibold", card.accent ? "text-white" : "text-[#1A1A1A]")}>{card.title}</h3>
                  </div>
                </div>
                <p className={cn("text-base leading-relaxed mb-8",card.accent?"text-white/70":"text-[#6B7280]")}>{card.desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {card.features.map((f,j) => (
                    <div key={j} className={cn("flex items-center gap-2.5 text-sm ",card.accent?"text-white/80":"text-[#4B5563]")}>
                      <div className={cn("h-8 w-8 sm:h-6 sm:w-6 rounded-lg flex items-center justify-center shrink-0", card.accent ? "bg-white/10" : "bg-[#E8F5EE]")}>
                        <f.icon className={cn("h-4 w-4 sm:h-3.5 sm:w-3.5", card.accent ? "text-emerald-300" : "text-[#1B5E45]")} />
                      </div>
                      {f.text}
                    </div>
                  ))}
                </div>
                <Link href={card.href}>
                  <button className={cn("h-13 px-8 rounded-2xl font-normal w-full group/btn flex items-center justify-center transition-all",
                    card.accent 
                      ? "bg-white text-[#1B5E45] hover:bg-[#E8F5EE]" 
                      : "bg-[#1B5E45] text-white hover:bg-[#246B4F]"
                  )}>
                    Access Portal
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- HOW IT WORKS -----------------------------------------------------------
function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<"landlord"|"tenant">("landlord");
  const steps = {
    landlord:[
      {icon:CustomPropertyIcon,step:"01",title:"Register Your Property",desc:"Add your properties in minutes. Our smart onboarding imports existing data and auto-generates unit profiles."},
      {icon:CustomTenantIcon,step:"02",title:"Onboard Tenants",desc:"Invite residents via SMS or email. Digital lease signing and KYC verification happen seamlessly in-app."},
      {icon:CustomAnalyticIcon,step:"03",title:"Automate & Collect",desc:"Set rent schedules, M-Pesa prompts, and late fees. Collections happen automatically with real-time reconciliation."},
      {icon:CustomTrackIcon,step:"04",title:"Track & Grow",desc:"Monitor occupancy, yields, and maintenance from one dashboard. Export compliance reports with one click."},
    ],
    tenant:[
      {icon:CustomHomeIcon,step:"01",title:"Receive Your Invite",desc:"Your landlord sends a digital invite. Verify your identity and sign your lease entirely online — no paper needed."},
      {icon:CustomCreditCardIcon,step:"02",title:"Set Up Payments",desc:"Link your M-Pesa or bank account. Enable auto-pay reminders to never miss a rent deadline again."},
      {icon:CustomWrenchIcon,step:"03",title:"Submit Requests",desc:"Log maintenance issues with photos directly from your phone. Track resolution status in real time."},
      {icon:CustomDocumentIcon,step:"04",title:"Manage Your Tenancy",desc:"Access all your documents, payment history, and communications in one secure, beautiful dashboard."},
    ],
  };
  return (
    <section className="py-12 md:py-16 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1B5E45_0.6px,transparent_1px)] bg-size-[28px_28px] opacity-[0.03]" />
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-normal uppercase tracking-widest mb-4">Simple Process</span>
          <h2 className="text-xl min-[400px]:text-[22px] sm:text-4xl md:text-5xl tracking-tighter md:tracking-[-0.03em] whitespace-nowrap sm:whitespace-normal">Up & running in under 10 minutes.</h2>
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

// --- FEATURE GRID -----------------------------------------------------------
function FeatureCard({ f, i }: { f: any, i: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Reveal key={i} delay={i*0.05} className={cn(f.large?"col-span-2 row-span-1":"col-span-1")}>
      <div className={cn("h-full rounded-3xl p-7 border transition-all duration-300 hover:-translate-y-0.5 group flex flex-col",
        f.bg === "dark" ? "bg-gradient-to-br from-[#0c4a34] to-[#062b1e] border-transparent shadow-[#0c4a34]/20 shadow-2xl" : 
        f.bg === "primary" ? "bg-[#1B5E45] border-transparent text-white shadow-[#1B5E45]/20 shadow-xl" :
        "bg-[#FAFAF8] border-[#E0E8E3] hover:border-[#C4D4C9] hover:shadow-xl hover:shadow-[#1B5E45]/5"
      )}>
        <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-105 shrink-0",
          f.bg === "dark" || f.bg === "primary" ? "bg-white/10" : "bg-[#E8F5EE]"
        )}>
          <f.icon className={cn("h-5 w-5", f.bg === "dark" || f.bg === "primary" ? "text-white" : "text-[#1B5E45]")} />
        </div>
        <h4 className={cn("text-sm md:text-base mb-2 font-medium shrink-0", f.bg === "dark" || f.bg === "primary" ? "text-white" : "text-[#1A1A1A]")}>{f.title}</h4>
        <div className="relative flex-grow">
          <p className={cn(
            "text-sm leading-relaxed transition-all duration-300",
            !isExpanded && "line-clamp-3 md:line-clamp-none",
            f.bg === "dark" || f.bg === "primary" ? "text-white/70" : "text-[#6B7280]"
          )}>
            {f.desc}
          </p>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn("md:hidden mt-3 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity",
              f.bg === "dark" || f.bg === "primary" ? "text-white" : "text-[#1B5E45]"
            )}
          >
            {isExpanded ? (
              <>Show Less <ChevronUp className="h-3 w-3" /></>
            ) : (
              <>Read More <ChevronDown className="h-3 w-3" /></>
            )}
          </button>
        </div>
      </div>
    </Reveal>
  );
}

function FeatureGridSection() {
  const features = [
    {icon:CustomUserIcon,   title:"Bank-Grade Security",    desc:"256-bit AES encryption, zero-trust architecture, and SOC 2 Type II compliance protect every transaction.", large:true, bg:"dark"},
    {icon:CustomSmartphoneIcon,title:"Mobile-First Design",   desc:"Full functionality from any device. Native app experience in the browser.",                                  large:false,bg:"default"},
    {icon:CustomResponseTimeIcon,      title:"< 14 Min Response",      desc:"Our automated workflows ensure maintenance and support requests are acknowledged fast.",                      large:false,bg:"default"},
    {icon:CustomMoneyExchangeIcon,    title:"Multi-Currency & M-Pesa", desc:"Accept payments in KSh, USD, or GBP. M-Pesa integration built-in with instant reconciliation.",             large:false,bg:"default"},
    {icon:CustomAnalyticIcon,title:"Real-Time Reporting",    desc:"Live dashboards, PDF exports, and scheduled email reports keep all stakeholders informed.",                   large:false,bg:"default"},
    {icon:CustomRingingIcon,     title:"Smart Notifications",    desc:"Automated rent reminders, maintenance updates, and lease renewal alerts — all customisable.",                 large:true, bg:"primary"},
    {icon:CustomAwardIcon,    title:"Compliance Ready",       desc:"Audit trails, digital signatures, and document retention built for regulatory requirements.",                  large:false,bg:"default"},
    {icon:CustomSupportIcon,title:"24/7 Priority Support",desc:"Dedicated account managers and round-the-clock technical support for enterprise clients.",               large:false,bg:"default"},
  ];
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <Reveal className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-normal uppercase tracking-widest mb-4">Full Feature Set</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em]">Everything you need.<br />Nothing you don't.</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          {features.map((f,i) => (
            <FeatureCard key={i} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- TESTIMONIALS ------------------------------------------------------------
const TESTIMONIALS = [
  {name:"James Kariuki",   role:"Property Manager · 340 Units", img:33, quote:"Nova cut our arrears from 18% to under 2% in three months. The automated M-Pesa collections alone saved us two full-time staff.",                                                rating:5},
  {name:"Grace Muthoni",  role:"Resident · Westlands Heights",  img:41, quote:"I pay rent in seconds via M-Pesa and can track my maintenance request from submission to completion. Finally a landlord app that respects residents.",                              rating:5},
  {name:"David Omondi",   role:"Real Estate Developer · 12 blocks",img:35,quote:"The Property analytics are institutional-grade. I can see yield performance, vacancy trends, and compliance status across all properties in one dashboard.",                   rating:5},
  {name:"Fatuma Hassan",  role:"Property Manager · Mombasa",    img:42, quote:"Onboarding was done in a day. The support team is phenomenal — they migrated 200 tenant records and had us live before the end of the week.",                                    rating:5},
  {name:"Peter Njoroge",  role:"Tenant · Karen Grove",          img:36, quote:"The document vault keeps my lease, receipts, and correspondence in one place. I've never had this level of transparency with a landlord before.",                                 rating:5},
];

function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-scroll at a much slower, readable pace
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(p => (p + 1) % TESTIMONIALS.length);
    }, 8000); // 8 seconds per slide
    return () => clearInterval(timer);
  }, []);

  const next = () => setActiveIdx(p => (p + 1) % TESTIMONIALS.length);
  const prev = () => setActiveIdx(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-12 md:py-16 bg-[#FAFAF8] overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-b from-[#3DBE7A]/10 to-transparent blur-3xl rounded-full opacity-50 pointer-events-none" />
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <Reveal className="text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#E0E8E3] text-[#1B5E45] text-[10px] font-normal uppercase tracking-[0.2em] mb-5 shadow-sm">Social Proof</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-medium text-[#1A1A1A]">
              Loved by managers<br className="max-md:hidden" /> and residents alike.
            </h2>
          </Reveal>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button onClick={prev} className="h-12 w-12 flex items-center justify-center rounded-2xl border border-[#E0E8E3] bg-white hover:border-[#C4D4C9] text-[#1B5E45] hover:shadow-md hover:-translate-y-0.5 transition-all">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={next} className="h-12 w-12 flex items-center justify-center rounded-2xl border border-[#E0E8E3] bg-white hover:border-[#C4D4C9] text-[#1B5E45] hover:shadow-md hover:-translate-y-0.5 transition-all">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden p-2 -mx-2">
            <motion.div 
              className="flex"
              animate={{ x: `-${activeIdx * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="min-w-full px-2">
                  <div className="bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 border border-[#E0E8E3] shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-[#1B5E45]/10 transition-all duration-500">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-6">
                          {[...Array(t.rating)].map((_,j) => <Star key={j} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
                        </div>
                        <blockquote className="text-xl sm:text-2xl md:text-3xl text-[#1A1A1A] leading-relaxed font-light tracking-tight mb-8">
                          "{t.quote}"
                        </blockquote>
                        <div className="flex items-center gap-4">
                          <img src={`https://i.pravatar.cc/128?img=${t.img}`} alt={t.name} className="h-14 w-14 rounded-full object-cover border-2 border-[#E8F5EE]" />
                          <div>
                            <h4 className="text-base font-semibold text-[#1A1A1A] tracking-tight">{t.name}</h4>
                            <p className="text-xs text-[#6B7280]">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveIdx(i)} 
                className={cn("h-2 rounded-full transition-all duration-300", i === activeIdx ? "w-8 bg-[#3DBE7A]" : "w-2 bg-[#E0E8E3] hover:bg-[#C4D4C9]")} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- PRICING ----------------------------------------------------------------
function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const plans = [
    {name:"Starter",     price:annual?2900:3500,   desc:"Perfect for individual landlords managing a small Property.",      units:"Up to 20 units",  features:["Basic analytics","M-Pesa collections","Maintenance requests","Email support","Tenant portal","2 admin users"],                                          cta:"Start Free Trial",highlight:false},
    {name:"Professional",price:annual?8900:10500,  desc:"For growing Propertys that demand professional-grade tools.",       units:"Up to 150 units", features:["Full analytics suite","Automated workflows","Digital lease signing","Priority support","Audit trails","Unlimited admins","API access","Custom reports"],cta:"Get Started",    highlight:true},
    {name:"Enterprise",  price:null,               desc:"Tailored solutions for institutional Propertys and developers.",    units:"Unlimited units", features:["Custom integrations","Dedicated account manager","White-label option","SLA guarantee","On-premise option","Custom compliance","Training & onboarding","24/7 phone support"],cta:"Contact Sales",  highlight:false},
  ];
  return (
    <section className="py-12 md:py-16 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(27,94,69,0.04),transparent)]" />
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
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
              <div className={cn("relative h-full rounded-[2rem] p-8 border transition-all duration-300 flex flex-col hover:-translate-y-1",
                plan.highlight 
                  ? "bg-gradient-to-br from-[#0c4a34] to-[#062b1e] border-transparent shadow-[#0c4a34]/30 shadow-2xl scale-[1.02] text-white" 
                  : "bg-[#FAFAF8] border-[#E0E8E3] hover:border-[#C4D4C9] hover:shadow-xl text-[#1A1A1A]"
              )}>
                {plan.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-[#3DBE7A] text-white text-[10px] sm:text-xs uppercase tracking-widest shadow-lg whitespace-nowrap">Most Popular</div>}
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl mb-1 font-semibold">{plan.name}</h3>
                  <p className={cn("text-sm leading-relaxed",plan.highlight?"text-white/70":"text-[#6B7280]")}>{plan.desc}</p>
                </div>
                <div className="mb-6">
                  {plan.price ? (
                    <div className="flex items-end gap-1">
                      <span className="text-3xl md:text-4xl tracking-tight font-money">KSh {plan.price.toLocaleString()}</span>
                      <span className={cn("text-sm mb-1.5",plan.highlight?"text-white/50":"text-[#9CA3AF]")}>/mo</span>
                    </div>
                  ) : <p className="text-3xl md:text-4xl">Custom</p>}
                  <p className={cn("text-xs md:text-sm mt-1.5", plan.highlight ? "text-emerald-300" : "text-[#1B5E45]")}>{plan.units}</p>
                </div>
                <ul className="space-y-3.5 mb-10 flex-1">
                  {plan.features.map((f,j) => (
                    <li key={j} className="flex items-center gap-3 text-sm md:text-base">
                      <div className={cn("h-5 w-5 rounded-full flex items-center justify-center shrink-0", plan.highlight ? "bg-white/10" : "bg-[#E8F5EE]")}>
                         <CheckCircle2 className={cn("h-3 w-3", plan.highlight ? "text-emerald-400" : "text-[#1B5E45]")} />
                      </div>
                      <span className={plan.highlight?"text-white/90":"text-[#4B5563]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.price?"/auth/register":"/contact"}>
                  <button className={cn("w-full h-13 rounded-2xl font-normal text-sm md:text-base flex items-center justify-center transition-all",
                    plan.highlight 
                      ? "bg-white text-[#1B5E45] hover:bg-[#E8F5EE]" 
                      : "bg-[#1B5E45] text-white hover:bg-[#246B4F]"
                  )}>
                    {plan.cta}<ArrowRight className="ml-2 h-4 w-4" />
                  </button>
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

// --- FINAL CTA ---------------------------------------------------------------
function FinalCTASection() {
  return (
    <section className="py-32 bg-gradient-to-br from-[#0c4a34] to-[#062b1e] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(61,190,122,0.15),transparent)]" />
      <div className="container px-4 sm:px-6 md:px-8 max-w-4xl mx-auto text-center relative z-10 space-y-10">
        <Reveal>
          <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 text-xs font-normal uppercase tracking-[0.2em] mb-6">Ready when you are</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em] text-white leading-tight font-medium">Start building<br />your legacy today.</h2>
          <p className="text-lg text-white/70 max-w-lg mx-auto font-light mt-5">Join 2,000+ property professionals who manage their properties with confidence on Nova.</p>
        </Reveal>
        <Reveal delay={0.2} className="flex flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link href="/auth/register" className="flex-1 sm:flex-none">
            <button className="h-16 flex items-center justify-center w-full sm:w-auto px-8 rounded-full text-xs sm:text-sm md:text-base shadow-2xl shadow-emerald-900/50 hover:scale-[1.03] transition-all bg-white text-[#0c4a34] font-medium group">
              Get Started — Free<ArrowRight className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <button className="flex-1 flex items-center justify-center sm:flex-none h-16 w-full sm:w-auto px-8 rounded-full border border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white/10 text-xs sm:text-sm md:text-base font-normal transition-all">
            Schedule a Demo<CustomCalendarIcon className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </button>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-white/50">
            {["14-day free trial","No credit card","Cancel anytime","Free data migration"].map(item => (
              <div key={item} className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-emerald-400/20 flex items-center justify-center">
                  <CheckCircle2 className="h-2.5 w-2.5 text-emerald-300" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// --- FOOTER ------------------------------------------------------------------
function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-20 pb-12">
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
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