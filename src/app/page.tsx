"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import Logo from "@/components/Logo";
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
    up: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 28 }, visible: { opacity: 1, x: 0 } },
    none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
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
function Counter({
  to,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
}) {
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
  return (
    <span ref={ref}>
      {decimals ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

// ─── HERO CAROUSEL ──────────────────────────────────────────────────────────
const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=85",
    tag: "Portfolio Management",
    headline: ["PROPERTIES", "PERFECTED"],
    sub: "Institutional-grade platform for elite property managers and discerning residents. Precision tools, uncompromising security.",
    cta: "Management Portal",
    ctaHref: "/auth/login?role=landlord",
    stat: { label: "Collection Rate", value: "99.2%" },
  },
  {
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85",
    tag: "Smart Analytics",
    headline: ["INSIGHTS", "AMPLIFIED"],
    sub: "Turn complex portfolios into clear, actionable intelligence. Real-time dashboards that drive confident decisions.",
    cta: "View Dashboard",
    ctaHref: "/auth/login?role=landlord",
    stat: { label: "Portfolio Growth", value: "+24%" },
  },
  {
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2400&q=85",
    tag: "Resident Experience",
    headline: ["LIVING", "ELEVATED"],
    sub: "Frictionless payments, transparent communication, and a modern living experience built for the digital era.",
    cta: "Browse Residences",
    ctaHref: "/auth/login?role=tenant",
    stat: { label: "Resident Satisfaction", value: "4.9/5" },
  },
];

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setActive((p) => (p + 1) % SLIDES.length), []);
  const prev = useCallback(
    () => setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(next, 6000);
    return () => {
      if (timer.current !== null) clearInterval(timer.current);
    };
  }, [paused, next]);

  const slide = SLIDES[active];

  return (
    <section
      className="relative min-h-[60dvh] md:min-h-dvh flex items-center overflow-hidden pt-12 md:pt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background transition */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={slide.img}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/20 to-transparent" />
        </motion.div>

      </AnimatePresence>

      <div className="container relative z-10 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center min-h-[calc(60dvh-4rem)] md:min-h-[calc(100dvh-4rem)]">
          {/* Left */}
          <div className="lg:col-span-7 space-y-8 py-14 md:py-24 lg:py-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-8"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-primary/15 bg-primary/5 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                    {slide.tag}
                  </span>
                  <span className="w-px h-3 bg-primary/20" />
                  <span className="text-xs font-semibold text-muted-foreground">
                    Nova v2.0
                  </span>
                </div>

                {/* Headline */}
                <div className="space-y-1">
                  <h1 className="text-[2.8rem] md:text-[5rem] lg:text-[5.8rem] font-black tracking-[-0.04em] leading-[0.9] text-white">
                    {slide.headline[0]}
                  </h1>
                  <h1 className="text-[2.8rem] md:text-[5rem] lg:text-[5.8rem] font-black tracking-[-0.04em] leading-[0.9] gradient-text">
                    {slide.headline[1]}
                  </h1>
                </div>

                {/* Sub */}
                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light max-w-xl">
                  {slide.sub}
                </p>

                {/* CTAs */}
                <div className="flex flex-nowrap items-center gap-2 sm:gap-4 pt-2">
                  <Link href={slide.ctaHref} className="flex-1 sm:flex-none">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto h-12 md:h-15 px-4 md:px-10 rounded-2xl md:rounded-3xl font-bold text-xs md:text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-[1.01] transition-all group whitespace-nowrap"
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 sm:flex-none h-12 md:h-15 px-4 md:px-10 rounded-2xl md:rounded-3xl border border-foreground/12 bg-background/65 backdrop-blur-xl font-semibold text-xs md:text-base hover:bg-foreground/5 hover:border-foreground/20 transition-all gap-2 md:gap-3 whitespace-nowrap"
                  >
                    <div className="h-6 w-6 md:h-7 md:w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Play className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary fill-primary ml-0.5" />
                    </div>
                    Watch Demo
                  </Button>
                </div>

                {/* Trust row */}
                <div className="flex items-center gap-8 pt-2">
                  <div className="flex -space-x-3.5">
                    {[33, 34, 35, 36].map((n) => (
                      <div
                        key={n}
                        className="w-10 h-10 rounded-xl border-[3px] border-background overflow-hidden ring-1 ring-foreground/8 shadow-sm"
                      >
                        <img
                          src={`https://i.pravatar.cc/128?img=${n}`}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium text-white/70">
                      Trusted by 2,000+ property professionals
                    </p>
                  </div>
                  <div className="hidden sm:block h-8 w-px bg-white/10" />
                  <div className="hidden sm:block">
                    <p className="text-xs text-white/50 font-medium uppercase tracking-widest">
                      {slide.stat.label}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {slide.stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Dashboard Card */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.97 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              >
                <DashboardPreviewCard slide={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-6 md:bottom-10 inset-x-0 z-20 flex items-center justify-between px-6 md:justify-center md:gap-10 pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto h-11 w-11 rounded-full border border-foreground/12 bg-background/70 backdrop-blur-md flex items-center justify-center hover:bg-background/90 transition-all shadow-sm md:h-10 md:w-10"
        >
          <ChevronLeft className="h-5 w-5 md:h-4 md:w-4" />
        </button>

        <div className="pointer-events-auto flex gap-2.5 items-center">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full transition-all duration-500",
                i === active
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40",
              )}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="pointer-events-auto h-11 w-11 rounded-full border border-foreground/12 bg-background/70 backdrop-blur-md flex items-center justify-center hover:bg-background/90 transition-all shadow-sm md:h-10 md:w-10"
        >
          <ChevronRight className="h-5 w-5 md:h-4 md:w-4" />
        </button>
      </div>

      {/* Slide number */}
      <div className="absolute top-26 right-6 z-20 md:top-auto md:bottom-10 md:right-8 text-[10px] md:text-xs font-bold text-white/40 tracking-[0.2em] tabular-nums">
        0{active + 1} / 0{SLIDES.length}
      </div>
    </section>
  );
}

// ─── DASHBOARD PREVIEW CARD ─────────────────────────────────────────────────
function DashboardPreviewCard({ slide }: { slide: number }) {
  const cards = [
    // Slide 0 – Portfolio overview
    <>
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="h-13 w-13 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Platform Status
            </p>
            <p className="font-bold text-base">Enterprise Secure</p>
          </div>
        </div>
        <div className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 flex items-center gap-1.5 text-[10px] font-bold text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          LIVE
        </div>
      </div>
      <div className="space-y-7 mb-8">
        {[
          { label: "Collection Rate", value: "99.2%", w: "99%" },
          { label: "Occupancy Rate", value: "94%", w: "94%" },
          { label: "Maintenance SLA", value: "97.8%", w: "97.8%" },
        ].map((s, i) => (
          <div key={i} className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-semibold">
                {s.label}
              </span>
              <span className="font-bold text-primary">{s.value}</span>
            </div>
            <div className="h-1.5 bg-foreground/6 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: s.w }}
                transition={{
                  delay: 0.5 + i * 0.15,
                  duration: 1.4,
                  ease: "easeOut",
                }}
                className="h-full bg-linear-to-r from-emerald-mid to-emerald-bright rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 pt-5 border-t border-foreground/8">
        {[
          { label: "Global Yield", val: "98%" },
          { label: "Assets", val: "1,200+" },
          { label: "Markets", val: "14" },
        ].map((s, i) => (
          <div key={i}>
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground/50 font-semibold mb-1">
              {s.label}
            </p>
            <p className="text-2xl font-bold tracking-tight">{s.val}</p>
          </div>
        ))}
      </div>
    </>,

    // Slide 1 – Analytics
    <>
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
            Analytics Dashboard
          </p>
          <p className="font-bold text-base">Q4 2025 Overview</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-soft text-primary text-[10px] font-bold">
          ↑ 24% YoY
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          {
            icon: DollarSign,
            label: "Revenue",
            val: "KES 4.2M",
            delta: "+18%",
          },
          { icon: HomeIcon, label: "Units", val: "1,247", delta: "+34" },
          { icon: Percent, label: "Vacancy", val: "6.0%", delta: "-2.1%" },
          { icon: Activity, label: "Requests", val: "384", delta: "-12%" },
        ].map((s, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-accent/40 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <s.icon className="h-4 w-4 text-primary" />
              <span className="text-[9px] font-bold text-primary bg-primary/8 px-2 py-0.5 rounded-full">
                {s.delta}
              </span>
            </div>
            <p className="text-xl font-bold tracking-tight">{s.val}</p>
            <p className="text-[10px] text-muted-foreground font-medium mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-accent/30 p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
          Revenue Trend
        </p>
        <div className="flex items-end gap-1.5 h-14">
          {[40, 55, 45, 68, 72, 65, 88, 76, 92, 85, 95, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
              className={cn(
                "flex-1 rounded-t-sm",
                i === 11 ? "bg-primary" : "bg-primary/20",
              )}
            />
          ))}
        </div>
      </div>
    </>,

    // Slide 2 – Resident portal
    <>
      <div className="flex items-center gap-4 mb-6 pb-5 border-b border-border">
        <div className="h-11 w-11 rounded-xl overflow-hidden">
          <img
            src="https://i.pravatar.cc/128?img=45"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <p className="font-bold text-sm">Sarah Wanjiku</p>
          <p className="text-[10px] text-muted-foreground">
            Unit 4B · Westlands Heights
          </p>
        </div>
        <div className="ml-auto px-3 py-1 rounded-full bg-primary/8 text-primary text-[10px] font-bold">
          Active
        </div>
      </div>
      <div className="space-y-3 mb-6">
        {[
          {
            icon: CreditCard,
            label: "Next Payment",
            val: "KES 45,000",
            sub: "Due Apr 1",
            color: "text-primary",
          },
          {
            icon: Wrench,
            label: "Open Request",
            val: "Plumbing",
            sub: "In Progress",
            color: "text-amber-500",
          },
          {
            icon: FileText,
            label: "Lease Expires",
            val: "Dec 31, 2026",
            sub: "14 months",
            color: "text-foreground",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3.5 rounded-2xl border border-border bg-accent/30 hover:bg-accent/60 transition-colors"
          >
            <div className="h-9 w-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-muted-foreground font-semibold">
                {item.label}
              </p>
              <p className={cn("text-sm font-bold truncate", item.color)}>
                {item.val}
              </p>
            </div>
            <p className="text-[9px] text-muted-foreground">{item.sub}</p>
          </div>
        ))}
      </div>
      <button className="w-full h-11 rounded-2xl bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
        <CreditCard className="h-4 w-4" />
        Pay Rent Now
      </button>
    </>,
  ];

  return (
    <div className="glass-panel rounded-3xl p-7 shadow-2xl border border-foreground/6 relative overflow-hidden">
      <div className="absolute -inset-px bg-linear-to-br from-primary/8 via-transparent to-transparent rounded-3xl pointer-events-none" />
      {cards[slide]}
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* HERO CAROUSEL */}
        <HeroCarousel />

        {/* TRUST LOGOS */}
        <TrustLogosBar />

        {/* METRIC BAR */}
        <MetricBar />

        {/* SOLUTIONS */}
        <SolutionsSection />

        {/* HOW IT WORKS */}
        <HowItWorksSection />

        {/* FEATURE GRID */}
        <FeatureGridSection />

        {/* TESTIMONIALS */}
        <TestimonialsSection />

        {/* PRICING */}
        <PricingSection />

        {/* CTA */}
        <FinalCTASection />
        <Footer />
      </main>
    </div>
  );
}

// ─── TRUST LOGOS BAR ────────────────────────────────────────────────────────
function TrustLogosBar() {
  const logos = [
    "Safaricom",
    "KCB Bank",
    "Equity Bank",
    "Nairobi County",
    "Britam",
    "ICEA Lion",
    "CIC Group",
  ];
  return (
    <div className="border-y border-border bg-muted/40 py-6 overflow-hidden">
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50 mb-5">
        Trusted by Kenya's leading institutions
      </p>
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map((name, i) => (
          <span
            key={i}
            className="text-sm font-bold text-muted-foreground/30 tracking-wide uppercase shrink-0"
          >
            {name}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}.animate-marquee{animation:marquee 22s linear infinite}`}</style>
    </div>
  );
}

// ─── METRIC BAR ─────────────────────────────────────────────────────────────
function MetricBar() {
  const stats = [
    { val: 1200, suffix: "+", label: "Active Properties", icon: Building2 },
    {
      val: 99.2,
      suffix: "%",
      label: "Uptime SLA",
      icon: Activity,
      decimals: 1,
    },
    { val: 14, suffix: " min", label: "Avg Response Time", icon: Clock },
    { val: 4.9, suffix: "/5", label: "Trust Score", icon: Star, decimals: 1 },
    { val: 2000, suffix: "+", label: "Professionals", icon: Users },
    { val: 98, suffix: "%", label: "Collection Rate", icon: CreditCard },
  ];
  return (
    <section className="bg-foreground py-14 text-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_50%,#3DBE7A,transparent_50%),radial-gradient(circle_at_80%_50%,#246B4F,transparent_50%)]" />
      <div className="container px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.08} className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-3xl md:text-4xl font-black tracking-tighter tabular-nums">
                <Counter
                  to={s.val}
                  suffix={s.suffix}
                  decimals={(s as any).decimals ?? 0}
                />
              </p>
              <div className="h-px w-8 bg-primary/30 mx-auto my-3" />
              <p className="text-[10px] uppercase tracking-widest text-background/35 font-bold">
                {s.label}
              </p>
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
      <div className="container px-6 md:px-8 max-w-7xl mx-auto">
        <Reveal className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Built for Both Sides
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em] mt-2">
            Dual Portals.
            <br />
            One Powerful Engine.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto font-light">
            Purpose-built experiences that serve every stakeholder — flawlessly.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "For Landlords",
              role: "Property Managers",
              desc: "Complete control over your portfolio with intelligent yield tools, automated workflows, and institutional-grade reporting.",
              icon: Briefcase,
              accent: true,
              href: "/auth/login?role=landlord",
              features: [
                { icon: BarChart3, text: "Real-time Yield Analytics" },
                { icon: CreditCard, text: "Automated Collections" },
                { icon: FileText, text: "Audit Trails & Compliance" },
                { icon: Bell, text: "Smart Alert System" },
                { icon: PieChart, text: "Portfolio Intelligence" },
                { icon: Users, text: "Tenant CRM" },
              ],
            },
            {
              title: "For Tenants",
              role: "Residents",
              desc: "Frictionless payments, transparent communication, and a modern living experience built for the digital era.",
              icon: Users,
              accent: false,
              href: "/auth/login?role=tenant",
              features: [
                { icon: CreditCard, text: "Instant M-Pesa Payments" },
                { icon: Wrench, text: "Maintenance Requests" },
                { icon: Lock, text: "Secure Document Vault" },
                { icon: Receipt, text: "Payment History" },
                { icon: Calendar, text: "Lease Management" },
                { icon: MessageSquare, text: "Direct Messaging" },
              ],
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div
                className={cn(
                  "group h-full rounded-3xl p-6 md:p-10 border transition-all duration-500 hover:-translate-y-1",
                  card.accent
                    ? "bg-foreground text-background border-foreground shadow-2xl shadow-foreground/10"
                    : "bg-card border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5",
                )}
              >
                <div
                  className={cn(
                    "h-16 w-16 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-105",
                    card.accent
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  <card.icon className="h-8 w-8" strokeWidth={1.6} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-primary">
                  {card.role}
                </span>
                <h3 className="text-3xl font-black tracking-tight mt-1 mb-5">
                  {card.title}
                </h3>
                <p
                  className={cn(
                    "text-base leading-relaxed mb-8",
                    card.accent
                      ? "text-background/65"
                      : "text-muted-foreground",
                  )}
                >
                  {card.desc}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {card.features.map((f, j) => (
                    <div
                      key={j}
                      className={cn(
                        "flex items-center gap-2.5 text-sm font-medium",
                        card.accent
                          ? "text-background/75"
                          : "text-foreground/80",
                      )}
                    >
                      <div className="h-6 w-6 rounded-lg bg-primary/12 flex items-center justify-center shrink-0">
                        <f.icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      {f.text}
                    </div>
                  ))}
                </div>
                <Link href={card.href}>
                  <Button
                    variant={card.accent ? "secondary" : "default"}
                    className="h-13 px-8 rounded-2xl font-bold w-full group/btn"
                  >
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
  const [activeTab, setActiveTab] = useState<"landlord" | "tenant">("landlord");

  const steps = {
    landlord: [
      {
        icon: Building2,
        step: "01",
        title: "Register Your Portfolio",
        desc: "Add your properties in minutes. Our smart onboarding imports existing data and auto-generates unit profiles.",
      },
      {
        icon: Users,
        step: "02",
        title: "Onboard Tenants",
        desc: "Invite residents via SMS or email. Digital lease signing and KYC verification happen seamlessly in-app.",
      },
      {
        icon: BarChart3,
        step: "03",
        title: "Automate & Collect",
        desc: "Set rent schedules, M-Pesa prompts, and late fees. Collections happen automatically with real-time reconciliation.",
      },
      {
        icon: PieChart,
        step: "04",
        title: "Track & Grow",
        desc: "Monitor occupancy, yields, and maintenance from one dashboard. Export compliance reports with one click.",
      },
    ],
    tenant: [
      {
        icon: HomeIcon,
        step: "01",
        title: "Receive Your Invite",
        desc: "Your landlord sends a digital invite. Verify your identity and sign your lease entirely online — no paper needed.",
      },
      {
        icon: CreditCard,
        step: "02",
        title: "Set Up Payments",
        desc: "Link your M-Pesa or bank account. Enable auto-pay reminders to never miss a rent deadline again.",
      },
      {
        icon: Wrench,
        step: "03",
        title: "Submit Requests",
        desc: "Log maintenance issues with photos directly from your phone. Track resolution status in real time.",
      },

      {
        icon: FileText,
        step: "04",
        title: "Manage Your Tenancy",
        desc: "Access all your documents, payment history, and communications in one secure, beautiful dashboard.",
      },
    ],
  };

  return (
    <section className="py-16 md:py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#1B5E45_0.6px,transparent_1px)] bg-size-[28px_28px] opacity-[0.03]" />
      <div className="container px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em]">
            Up & running
            <br />
            in under 10 minutes.
          </h2>
        </Reveal>

        {/* Tab Toggle */}
        <Reveal className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-foreground/6 border border-border">
            {(["landlord", "tenant"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-8 py-3 rounded-xl text-sm font-bold transition-all capitalize",
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab === "landlord" ? "Property Manager" : "Resident"}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps[activeTab].map((s, i) => (
              <div key={i} className="relative">
                {i < steps[activeTab].length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 left-full w-full h-px border-t-2 border-dashed border-primary/20 -translate-y-0.5 z-0"
                    style={{
                      width: "calc(100% - 2.5rem)",
                      left: "calc(50% + 1.25rem)",
                    }}
                  />
                )}
                <div className="relative z-10 bg-card border border-border rounded-3xl p-7 hover:border-primary/20 hover:shadow-lg transition-all group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-13 w-13 rounded-2xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-4xl font-black text-foreground/6 tabular-nums">
                      {s.step}
                    </span>
                  </div>
                  <h4 className="font-bold text-base mb-2">{s.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
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
    {
      icon: Shield,
      title: "Bank-Grade Security",
      desc: "256-bit AES encryption, zero-trust architecture, and SOC 2 Type II compliance protect every transaction.",
      large: true,
      bg: "bg-foreground text-background",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      desc: "Full functionality from any device. Native app experience in the browser.",
      large: false,
      bg: "bg-card",
    },
    {
      icon: Zap,
      title: "< 14 Min Response",
      desc: "Our automated workflows ensure maintenance and support requests are acknowledged fast.",
      large: false,
      bg: "bg-emerald-soft",
    },
    {
      icon: Globe,
      title: "Multi-Currency & M-Pesa",
      desc: "Accept payments in KES, USD, or GBP. M-Pesa integration built-in with instant reconciliation.",
      large: false,
      bg: "bg-card",
    },
    {
      icon: BarChart3,
      title: "Real-Time Reporting",
      desc: "Live dashboards, PDF exports, and scheduled email reports keep all stakeholders informed.",
      large: false,
      bg: "bg-card",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      desc: "Automated rent reminders, maintenance updates, and lease renewal alerts — all customisable.",
      large: true,
      bg: "bg-primary text-primary-foreground",
    },
    {
      icon: Award,
      title: "Compliance Ready",
      desc: "Audit trails, digital signatures, and document retention built for regulatory requirements.",
      large: false,
      bg: "bg-card",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Priority Support",
      desc: "Dedicated account managers and round-the-clock technical support for enterprise clients.",
      large: false,
      bg: "bg-card",
    },
  ];

  return (
    <section className="py-16 md:py-28 bg-background">
      <div className="container px-6 md:px-8 max-w-7xl mx-auto">
        <Reveal className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Full Feature Set
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em]">
            Everything you need.
            <br />
            Nothing you don't.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          {features.map((f, i) => (
            <Reveal
              key={i}
              delay={i * 0.05}
              className={cn(f.large ? "col-span-2 row-span-1" : "col-span-1")}
            >
              <div
                className={cn(
                  "h-full rounded-3xl p-7 border border-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl group",
                  f.bg,
                  f.bg === "bg-foreground text-background" &&
                    "border-foreground",
                  f.bg === "bg-primary text-primary-foreground" &&
                    "border-primary shadow-lg shadow-primary/20",
                )}
              >
                <div
                  className={cn(
                    "h-11 w-11 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-105",
                    f.bg === "bg-foreground text-background"
                      ? "bg-primary/15"
                      : f.bg === "bg-primary text-primary-foreground"
                        ? "bg-primary-foreground/15"
                        : f.bg === "bg-emerald-soft"
                          ? "bg-primary/15"
                          : "bg-primary/8",
                  )}
                >
                  <f.icon
                    className={cn(
                      "h-5 w-5",
                      f.bg === "bg-primary text-primary-foreground"
                        ? "text-primary-foreground"
                        : "text-primary",
                    )}
                  />
                </div>
                <h4 className="font-black text-base mb-2">{f.title}</h4>
                <p
                  className={cn(
                    "text-sm leading-relaxed",
                    f.bg === "bg-foreground text-background"
                      ? "text-background/60"
                      : f.bg === "bg-primary text-primary-foreground"
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground",
                  )}
                >
                  {f.desc}
                </p>
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
  {
    name: "James Kariuki",
    role: "Portfolio Manager · 340 Units",
    img: 33,
    quote:
      "Nova cut our arrears from 18% to under 2% in three months. The automated M-Pesa collections alone saved us two full-time staff.",
    rating: 5,
  },
  {
    name: "Grace Muthoni",
    role: "Resident · Westlands Heights",
    img: 41,
    quote:
      "I pay rent in seconds via M-Pesa and can track my maintenance request from submission to completion. Finally a landlord app that respects residents.",
    rating: 5,
  },
  {
    name: "David Omondi",
    role: "Real Estate Developer · 12 blocks",
    img: 35,
    quote:
      "The portfolio analytics are institutional-grade. I can see yield performance, vacancy trends, and compliance status across all properties in one dashboard.",
    rating: 5,
  },
  {
    name: "Fatuma Hassan",
    role: "Property Manager · Mombasa",
    img: 42,
    quote:
      "Onboarding was done in a day. The support team is phenomenal — they migrated 200 tenant records and had us live before the end of the week.",
    rating: 5,
  },
  {
    name: "Peter Njoroge",
    role: "Tenant · Karen Grove",
    img: 36,
    quote:
      "The document vault keeps my lease, receipts, and correspondence in one place. I've never had this level of transparency with a landlord before.",
    rating: 5,
  },
];

function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <section className="py-16 md:py-28 bg-muted/25 overflow-hidden">
      <div className="container px-6 md:px-8 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Social Proof
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em]">
            Loved by managers
            <br />
            and residents alike.
          </h2>
        </Reveal>

        <div className="relative">
          {/* Main testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center mb-12"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(TESTIMONIALS[activeIdx].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-foreground mb-8">
                "{TESTIMONIALS[activeIdx].quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <img
                  src={`https://i.pravatar.cc/128?img=${TESTIMONIALS[activeIdx].img}`}
                  alt=""
                  className="h-13 w-13 rounded-2xl object-cover border-2 border-primary/20"
                />
                <div className="text-left">
                  <p className="font-bold">{TESTIMONIALS[activeIdx].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {TESTIMONIALS[activeIdx].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Thumbnails */}
          <div className="flex justify-center gap-3">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "rounded-xl overflow-hidden border-2 transition-all",
                  i === activeIdx
                    ? "border-primary scale-110 shadow-lg shadow-primary/20"
                    : "border-transparent opacity-40 hover:opacity-70",
                )}
              >
                <img
                  src={`https://i.pravatar.cc/128?img=${t.img}`}
                  alt=""
                  className="h-10 w-10 object-cover"
                />
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
    {
      name: "Starter",
      price: annual ? 2900 : 3500,
      desc: "Perfect for individual landlords managing a small portfolio.",
      units: "Up to 20 units",
      features: [
        "Basic analytics",
        "M-Pesa collections",
        "Maintenance requests",
        "Email support",
        "Tenant portal",
        "2 admin users",
      ],
      cta: "Start Free Trial",
      highlight: false,
    },
    {
      name: "Professional",
      price: annual ? 8900 : 10500,
      desc: "For growing portfolios that demand professional-grade tools.",
      units: "Up to 150 units",
      features: [
        "Full analytics suite",
        "Automated workflows",
        "Digital lease signing",
        "Priority support",
        "Audit trails",
        "Unlimited admins",
        "API access",
        "Custom reports",
      ],
      cta: "Get Started",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: null,
      desc: "Tailored solutions for institutional portfolios and developers.",
      units: "Unlimited units",
      features: [
        "Custom integrations",
        "Dedicated account manager",
        "White-label option",
        "SLA guarantee",
        "On-premise option",
        "Custom compliance",
        "Training & onboarding",
        "24/7 phone support",
      ],
      cta: "Contact Sales",
      highlight: false,
    },
  ];

  return (
    <section className="py-16 md:py-28 bg-background relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(27,94,69,0.04),transparent)]" />
      <div className="container px-6 md:px-8 max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-[-0.03em]">
            Simple, honest pricing.
            <br />
            No surprises.
          </h2>
        </Reveal>

        <Reveal className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-foreground/5 border border-border">
            {["Monthly", "Annual"].map((label, i) => (
              <button
                key={i}
                onClick={() => setAnnual(i === 1)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                  (i === 1) === annual
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
                {i === 1 && (
                  <span className="ml-2 text-[10px] bg-primary-foreground/20 px-2 py-0.5 rounded-full">
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className={cn(
                  "relative h-full rounded-3xl p-8 border transition-all duration-300 flex flex-col",
                  plan.highlight
                    ? "bg-foreground text-background border-foreground shadow-2xl scale-[1.02]"
                    : "bg-card border-border hover:border-primary/20 hover:shadow-lg",
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-black text-xl mb-1">{plan.name}</h3>
                  <p
                    className={cn(
                      "text-sm",
                      plan.highlight
                        ? "text-background/60"
                        : "text-muted-foreground",
                    )}
                  >
                    {plan.desc}
                  </p>
                </div>
                <div className="mb-6">
                  {plan.price ? (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black tracking-tight">
                        KES {plan.price.toLocaleString()}
                      </span>
                      <span
                        className={cn(
                          "text-sm mb-1.5",
                          plan.highlight
                            ? "text-background/50"
                            : "text-muted-foreground",
                        )}
                      >
                        /mo
                      </span>
                    </div>
                  ) : (
                    <p className="text-3xl font-black">Custom</p>
                  )}
                  <p
                    className={cn(
                      "text-xs font-semibold mt-1.5",
                      plan.highlight ? "text-primary" : "text-primary",
                    )}
                  >
                    {plan.units}
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <CheckCheck className="h-4 w-4 text-primary shrink-0" />
                      <span
                        className={plan.highlight ? "text-background/80" : ""}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.price ? "/auth/register" : "/contact"}>
                  <Button
                    variant={plan.highlight ? "secondary" : "default"}
                    className="w-full h-13 rounded-2xl font-bold"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
            Cancel anytime.
          </p>
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
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(61,190,122,0.08),transparent)]" />

      <div className="container px-6 md:px-8 max-w-4xl mx-auto text-center relative z-10 space-y-10">
        <Reveal>
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Ready when you are
          </span>
          <h2 className="text-5xl md:text-6xl font-black tracking-[-0.04em] text-background leading-tight">
            Start building
            <br />
            your legacy today.
          </h2>
          <p className="text-lg text-background/50 max-w-lg mx-auto font-light mt-5">
            Join 2,000+ property professionals who manage their portfolios with
            confidence on Nova.
          </p>
        </Reveal>

        <Reveal
          delay={0.2}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/auth/register">
            <Button
              size="lg"
              className="h-16 px-14 rounded-3xl text-base font-black shadow-2xl shadow-primary/30 hover:scale-[1.03] transition-all"
            >
              Get Started — Free
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="h-16 px-10 rounded-3xl border border-background/10 text-background bg-transparent hover:bg-background/5 text-base font-bold"
          >
            Schedule a Demo
            <Calendar className="ml-3 h-5 w-5" />
          </Button>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-background/40 font-medium">
            {[
              "14-day free trial",
              "No credit card",
              "Cancel anytime",
              "Free data migration",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {item}
              </div>
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
      <div className="container px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4 space-y-6">
            <Logo />
            <p className="text-base text-muted-foreground max-w-xs leading-relaxed">
              Institutional property management, reimagined with elegance and
              precision for the modern era.
            </p>
            <div className="pt-2 flex items-center gap-2.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                All systems operational
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-10">
            {[
              {
                title: "Platform",
                links: [
                  "Features",
                  "Security",
                  "Pricing",
                  "Enterprise",
                  "API",
                  "Status",
                ],
              },
              {
                title: "Company",
                links: [
                  "About",
                  "Blog",
                  "Careers",
                  "Press",
                  "Contact",
                  "Partners",
                ],
              },
              {
                title: "Resources",
                links: [
                  "Documentation",
                  "Help Center",
                  "Video Tutorials",
                  "Webinars",
                  "Community",
                ],
              },
              {
                title: "Legal",
                links: [
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "GDPR",
                  "Data DPA",
                ],
              },
            ].map((col, i) => (
              <div key={i} className="space-y-4">
                <h5 className="font-black text-sm tracking-tight">
                  {col.title}
                </h5>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="hover:text-primary transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            © 2026 Nova Systems Ltd. All rights reserved. Registered in Kenya.
          </p>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full border border-border bg-muted/40">
              ISO 27001 Certified
            </span>
            <span className="px-3 py-1 rounded-full border border-border bg-muted/40">
              PCI DSS Compliant
            </span>
            <span className="px-3 py-1 rounded-full border border-border bg-muted/40">
              GDPR Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
