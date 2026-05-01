"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  icon: React.ElementType | LucideIcon;
  variant?: "default" | "dark";
  trend?: {
    value: string;
    label: string;
    isPositive?: boolean;
    isNeutral?: boolean;
    isNegative?: boolean;
    type?: "pill" | "arrow" | "dot";
  };
  className?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  variant = "default",
  trend,
  className,
}: StatCardProps) {
  const isDark = variant === "dark";

  return (
    <Card 
      className={cn(
        "relative rounded-[32px] overflow-hidden h-full flex flex-col justify-between transition-all duration-500 group min-h-[180px] border-black/[0.04] shadow-sm hover:shadow-xl hover:border-primary/20",
        isDark 
          ? "bg-gradient-to-br from-[#0c4a34] to-[#062b1e] border-transparent shadow-xl shadow-emerald-900/20" 
          : "bg-white"
        ,className
      )}
    >
      {/* Animated Wavy Decorator for Dark Card */}
      {isDark && (
        <div className="absolute bottom-0 left-0 w-full h-24 opacity-20 pointer-events-none overflow-hidden">
          <motion.svg
            className="w-[200%] h-full text-[#3DBE7A]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <path
              fill="currentColor"
              d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,181.3C672,149,768,107,864,106.7C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
            <path
              fill="currentColor"
              d="M1440,160L1488,176C1536,192,1632,224,1728,229.3C1824,235,1920,213,2016,181.3C2112,149,2208,107,2304,106.7C2400,107,2496,149,2592,154.7C2688,160,2784,128,2832,112L2880,96L2880,320L2832,320C2784,320,2688,320,2592,320C2496,320,2400,320,2304,320C2208,320,2112,320,2016,320C1920,320,1824,320,1728,320C1632,320,1536,320,1488,320L1440,320Z"
            />
          </motion.svg>
        </div>
      )}

      {/* Subtle Glow for Dark Card */}
      {isDark && (
        <motion.div 
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 100% 0%, rgba(61,190,122,0.1) 0%, transparent 70%)"
          }}
        />
      )}

      <CardContent className="p-6 h-full flex flex-col relative z-10">
        {/* Top Section: Label & Icon */}
        <div className="flex items-start justify-between mb-6">
          <p className={cn(
            "text-[10px] font-medium uppercase tracking-[0.15em] leading-none",
            isDark ? "text-white/60" : "text-muted-foreground/50"
          )}>
            {label}
          </p>
          <div className={cn(
            "h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
            isDark 
              ? "bg-white/10 border-white/10 text-[#3DBE7A] shadow-inner" 
              : "bg-[#F8F9F7] border-black/[0.03] text-primary/80 group-hover:bg-primary/5 group-hover:text-primary"
          )}>
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {/* Middle Section: Value */}
        <div className="mt-auto mb-4">
          <div className={cn(
            "text-3xl font-medium tracking-tight leading-none",
            isDark ? "text-white drop-shadow-sm" : "text-foreground"
          )}>
            {value}
          </div>
        </div>

        {/* Bottom Section: Trend / Status */}
        {trend && (
          <div className="mt-auto flex items-center gap-2">
            {trend.type === "pill" ? (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "px-2.5 py-1 rounded-full text-[10px] font-medium flex items-center gap-1 shadow-sm",
                  isDark 
                    ? "bg-[#3DBE7A]/20 text-[#3DBE7A] border border-[#3DBE7A]/10" 
                    : "bg-primary/5 text-primary border border-primary/10"
                )}
              >
                {trend.value}
              </motion.div>
            ) : (
              <div className="flex items-center gap-1.5">
                {trend.isPositive && <TrendingUp className="h-3 w-3 text-[#3DBE7A]" />}
                {trend.isNegative && <TrendingDown className="h-3 w-3 text-destructive" />}
                {trend.isNeutral && <div className={cn("h-1.5 w-1.5 rounded-full", isDark ? "bg-[#3DBE7A]" : "bg-primary")} />}
                <span className={cn(
                  "text-[10px] font-medium",
                  trend.isPositive ? "text-[#3DBE7A]" : 
                  trend.isNegative ? "text-destructive" : 
                  (isDark ? "text-white/70" : "text-muted-foreground/60")
                )}>
                  {trend.value}
                </span>
              </div>
            )}
            {trend.label && (
              <span className={cn(
                "text-[10px] font-normal tracking-wide",
                isDark ? "text-white/40" : "text-muted-foreground/40"
              )}>
                {trend.label}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
