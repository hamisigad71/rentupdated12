"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2, Zap, Shield, Building2, Users, FileText,
  ChevronRight, ArrowRight, Menu, X, Home, DollarSign,
  Info, HelpCircle, Layers
} from "lucide-react";
import Logo from "./Logo";

/* ── Solutions dropdown items ─────────────────────────────────────────── */
const solutions = [
  {
    title: "Analytics",
    href: "/analytics",
    description: "Deep insights into your property performance with real-time dashboards.",
    icon: BarChart2,
    color: "#1B5E45",
    bg: "#E8F5EE",
  },
  {
    title: "Automation",
    href: "/automation",
    description: "Streamline rent collection, maintenance and lease renewals automatically.",
    icon: Zap,
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    title: "Security",
    href: "/security",
    description: "Enterprise-grade protection for tenant data and financial records.",
    icon: Shield,
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    title: "Properties",
    href: "/properties",
    description: "Manage your entire portfolio from one unified command center.",
    icon: Building2,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    title: "Tenants",
    href: "/tenants",
    description: "Onboard, communicate and retain tenants with ease.",
    icon: Users,
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    title: "Reporting",
    href: "/reporting",
    description: "Generate financial and operational reports in seconds.",
    icon: FileText,
    color: "#be185d",
    bg: "#fdf2f8",
  },
];

/* ── Nav links ────────────────────────────────────────────────────────── */
const navLinks = [
  { label: "Pricing",   href: "/pricing",   icon: DollarSign },
  { label: "About",     href: "/about",     icon: Info       },
  { label: "Docs",      href: "/docs",      icon: Layers     },
];

/* ─────────────────────────────────────────────────────────────────────── */
export function Navbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled]         = React.useState(false);
  const [mobileOpen, setMobileOpen]     = React.useState(false);
  const [solutionsOpen, setSolutionsOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mobile menu on route change */
  React.useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#E0E8E3] shadow-sm shadow-[#1B5E45]/5"
            : "bg-white border-b border-[#E0E8E3]"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-8">

            {/* ── Wordmark ──────────────────────────────────────────── */}
            <Link href="/" className="flex-shrink-0">
              <Logo size="sm" />
            </Link>

            {/* ── Desktop nav ───────────────────────────────────────── */}
            <nav className="hidden md:flex items-center gap-1 flex-1">

              {/* Solutions mega-dropdown */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "h-9 px-4 rounded-lg text-[13px] font-semibold transition-all bg-transparent",
                        "text-[#374151] hover:text-[#1B5E45] hover:bg-[#F4F9F6]",
                        "data-[state=open]:text-[#1B5E45] data-[state=open]:bg-[#E8F5EE]"
                      )}
                    >
                      Solutions
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <div className="w-[680px] p-5 bg-white border border-[#E0E8E3] rounded-2xl shadow-xl shadow-[#1B5E45]/8">

                        {/* Top label */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E0E8E3]">
                          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#6B7280]">
                            Everything you need
                          </p>
                          <Link href="/solutions"
                            className="flex items-center gap-1 text-[11px] font-semibold text-[#1B5E45] hover:underline">
                            View all <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>

                        {/* 3-col grid */}
                        <ul className="grid grid-cols-3 gap-2">
                          {solutions.map((item) => (
                            <SolutionItem key={item.title} {...item} />
                          ))}
                        </ul>

                        {/* Footer CTA */}
                        <div className="mt-4 pt-4 border-t border-[#E0E8E3] flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-[#1A1A1A]">Not sure where to start?</p>
                            <p className="text-xs text-[#6B7280]">Talk to our team — we'll find the right fit.</p>
                          </div>
                          <Link href="/contact">
                            <button className="h-9 px-4 rounded-xl bg-[#1B5E45] text-white text-xs font-semibold hover:bg-[#246B4F] transition-colors shadow-md shadow-[#1B5E45]/20 flex items-center gap-2">
                              Book a Demo <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Flat nav links */}
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href}
                    className={cn(
                      "h-9 px-4 rounded-lg text-[13px] font-semibold transition-all flex items-center",
                      active
                        ? "text-[#1B5E45] bg-[#E8F5EE]"
                        : "text-[#374151] hover:text-[#1B5E45] hover:bg-[#F4F9F6]"
                    )}>
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop CTA ───────────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-2.5">
              <Link href="/auth/login">
                <button className="h-9 px-5 rounded-lg text-[13px] font-semibold text-[#374151] hover:text-[#1B5E45] hover:bg-[#F4F9F6] transition-all">
                  Sign In
                </button>
              </Link>
              <Link href="/auth/register">
                <button className="h-9 px-5 rounded-xl bg-[#1B5E45] text-white text-[13px] font-semibold hover:bg-[#246B4F] transition-all shadow-md shadow-[#1B5E45]/20 hover:shadow-lg hover:shadow-[#1B5E45]/25 hover:-translate-y-px active:translate-y-0 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Link>
            </div>

            {/* ── Mobile hamburger ──────────────────────────────────── */}
            <button
              className="md:hidden h-9 w-9 rounded-xl border border-[#E0E8E3] flex items-center justify-center text-[#374151] hover:border-[#1B5E45] hover:text-[#1B5E45] hover:bg-[#F4F9F6] transition-all"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* ── Subtle progress-line accent ────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#3DBE7A]/30 to-transparent pointer-events-none" />
      </header>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-white border-b border-[#E0E8E3] shadow-xl shadow-[#1B5E45]/8 overflow-y-auto max-h-[calc(100vh-4rem)]"
          >
            <div className="px-4 py-5 space-y-1">

              {/* Solutions section */}
              <button
                onClick={() => setSolutionsOpen(o => !o)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-semibold text-[#374151] hover:bg-[#F4F9F6] hover:text-[#1B5E45] transition-all"
              >
                Solutions
                <ChevronRight className={cn("h-4 w-4 transition-transform", solutionsOpen && "rotate-90")} />
              </button>

              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-2 py-2 space-y-1">
                      {solutions.map((item) => (
                        <Link key={item.title} href={item.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F4F9F6] transition-all group">
                          <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: item.bg }}>
                            <item.icon className="h-4 w-4" style={{ color: item.color }} />
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-[#1A1A1A] group-hover:text-[#1B5E45] transition-colors">{item.title}</p>
                            <p className="text-[11px] text-[#6B7280] line-clamp-1">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all",
                    pathname === link.href
                      ? "text-[#1B5E45] bg-[#E8F5EE]"
                      : "text-[#374151] hover:bg-[#F4F9F6] hover:text-[#1B5E45]"
                  )}>
                  <link.icon className="h-4 w-4 text-[#6B7280]" />
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTAs */}
              <div className="pt-4 pb-2 flex flex-col gap-3 border-t border-[#E0E8E3] mt-4">
                <Link href="/auth/login" className="w-full">
                  <button className="w-full h-11 rounded-xl border border-[#E0E8E3] text-[14px] font-semibold text-[#374151] hover:border-[#1B5E45] hover:text-[#1B5E45] hover:bg-[#F4F9F6] transition-all">
                    Sign In
                  </button>
                </Link>
                <Link href="/auth/register" className="w-full">
                  <button className="w-full h-11 rounded-xl bg-[#1B5E45] text-white text-[14px] font-semibold hover:bg-[#246B4F] transition-all shadow-md shadow-[#1B5E45]/20 flex items-center justify-center gap-2">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Solution dropdown item ─────────────────────────────────────────── */
function SolutionItem({
  title, href, description, icon: Icon, color, bg,
}: {
  title: string; href: string; description: string;
  icon: React.ElementType; color: string; bg: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={href}
          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[#F4F9F6] transition-all duration-150">
          <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
            style={{ background: bg }}>
            <Icon className="h-4.5 w-4.5" style={{ color }} />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#1A1A1A] group-hover:text-[#1B5E45] transition-colors leading-tight">
              {title}
            </p>
            <p className="text-[11px] text-[#6B7280] mt-0.5 leading-snug line-clamp-2">
              {description}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default Navbar;