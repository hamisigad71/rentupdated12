import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon";
  size?: "sm" | "md" | "lg";
  light?: boolean;
}

export default function Logo({ className, variant = "full", size = "md", light = false }: LogoProps) {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
  };
  const dim = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-3 select-none group", className)}>
      <div className={cn(
        "relative flex items-center justify-center transition-all duration-500 group-hover:scale-110",
        size === "sm" ? "h-8 w-8" : size === "md" ? "h-10 w-10" : "h-14 w-14"
      )}>
        <Image
          src="/images/logo/main-logo.png"
          alt="Nexus Rent"
          width={dim}
          height={dim}
          className="object-contain"
          style={{ height: "auto" }}
          priority
        />
      </div>
      {variant === "full" && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1">
            <span className={cn(
              "font-black tracking-tighter",
              light ? "text-white/90" : "text-foreground",
              size === "lg" ? "text-2xl" : "text-xl"
            )}>
              NEXUS
            </span>
            <span className={cn(
              "font-black tracking-tighter transition-colors",
              light ? "text-white/90" : "text-[#1B5E45]",
              size === "lg" ? "text-2xl" : "text-xl"
            )}>
              RENT
            </span>
          </div>
          <span className={cn(
            "font-bold uppercase tracking-[0.2em] -mt-0.5 transition-colors",
            light ? "text-white/30" : "text-[#1B5E45]/40",
            size === "lg" ? "text-[10px]" : "text-[8px]"
          )}>
            Smart Property Ecosystem
          </span>
        </div>
      )}
    </div>
  );
}
