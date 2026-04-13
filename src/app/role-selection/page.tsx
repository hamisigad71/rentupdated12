"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const RoleCard = ({
  title,
  role,
  description,
  icon: Icon,
  href,
  accent = false,
  delay = 0,
}: {
  title: string;
  role: string;
  description: string;
  icon: any;
  href: string;
  accent?: boolean;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className="group relative"
  >
    <Link href={href}>
      <div
        className={cn(
          "relative rounded-3xl p-6 overflow-hidden border transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)]",
          accent
            ? "bg-foreground text-background border-foreground h-full"
            : "bg-background border-foreground/5 h-full",
        )}
      >
        {/* Animated Background Gradient */}
        <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 blur-[100px] -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-50" />

        <div
          className={cn(
            "h-14 w-14 rounded-[1.8rem] flex items-center justify-center mb-12 shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500",
            accent
              ? "bg-primary text-background"
              : "bg-foreground text-background",
          )}
        >
          <Icon className="h-10 w-10" strokeWidth={1.5} />
        </div>

        <p className="text-xs uppercase text-primary mb-3">{role}</p>
        <h3 className="text-xl md:text-2xl tracking-tight mb-8 leading-none">
          {title}
        </h3>

        <p
          className={cn(
            "text-sm  leading-relaxed mb-12",
            accent ? "text-background/40" : "text-muted-foreground/40",
          )}
        >
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-8 border-t border-current/10 opacity-30 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 text-xs uppercase ">
            Continue to Dashboard
          </div>
          <ArrowRight className="h-6 w-6 transform group-hover:translate-x-2 transition-transform duration-500" />
        </div>
      </div>
    </Link>
  </motion.div>
);

export default function RoleSelection() {
  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20 overflow-hidden relative">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-primary/5 rounded-full blur-[160px] -mr-[25vw] -mt-[25vh] pointer-events-none hidden md:block" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-primary/5 rounded-full blur-[160px] -ml-[25vw] -mb-[25vh] pointer-events-none hidden md:block" />

      <header className="container relative z-10 px-4 sm:px-6 py-6 flex justify-between items-center">
        <Logo size="lg" />
        <Link href="/auth/login">
          <Button
            variant="ghost"
            className="text-xs uppercase hover:bg-foreground/5 transition-all"
          >
            Abort <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </Link>
      </header>

      <main className="flex-1 container relative z-10 px-[4px] sm:px-6 flex flex-col items-center justify-center py-10">
        <div className="text-center space-y-6 mb-24 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.5em] text-primary"
          >
            Authentication
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-2xl tracking-tight leading-[0.85]"
          >
            Select Your <br /> <span className="gradient-text ">Dimension</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground/40 "
          >
            Choose your role to continue to your professional dashboard.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 w-full max-w-6xl">
          <RoleCard
            title="Landlord"
            role="Property Manager"
            description="Access global property clusters, yield analytics, and automated financial auditing logs."
            icon={Building2}
            href="/landlord"
            accent={true}
            delay={0.3}
          />
          <RoleCard
            title="Tenant"
            role="Residential User"
            description="Manage rent settlements, incident manifests, and your digital residency profile."
            icon={Users}
            href="/tenant"
            accent={false}
            delay={0.4}
          />
        </div>

        {/* Global Stats Footer */}
        <div className="mt-24 pt-12 border-t border-foreground/5 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center opacity-40 hover:opacity-100 transition-opacity duration-1000">
          {[
            { l: "Uptime", v: "99.98%" },
            { l: "Properties", v: "1,240+" },
            { l: "Tenants", v: "5,000+" },
            { l: "Security", v: "EAL7+" },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="text-[8px] uppercase text-muted-foreground">
                {stat.l}
              </p>
              <p className="text-base tracking-tight">{stat.v}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-12 opacity-5 pointer-events-none"
      >
        <ShieldCheck className="w-32 h-32" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-12 opacity-5 pointer-events-none"
      >
        <Zap className="w-32 h-32" />
      </motion.div>
    </div>
  );
}
