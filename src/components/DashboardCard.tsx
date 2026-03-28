import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "primary" | "secondary" | "accent" | "destructive" | "muted";
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  className?: string;
}

const colorMap = {
  primary: "text-primary bg-primary/10 border-primary/20",
  secondary: "text-secondary-foreground bg-secondary border-secondary-foreground/10",
  accent: "text-brand-accent bg-brand-accent/10 border-brand-accent/20",
  destructive: "text-destructive bg-destructive/10 border-destructive/20",
  muted: "text-muted-foreground bg-muted border-muted-foreground/10",
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color = "primary",
  trend,
  className,
}: DashboardCardProps) {
  return (
    <Card className={cn("glass group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl", className)}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_100%_0%,var(--color-brand-primary)/0.05_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 group-hover:rotate-12 group-hover:scale-110", colorMap[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold tracking-tight md:text-2xl">
            {value}
          </span>
          {trend && (
            <div className="flex items-center gap-2 mt-2">
              <div className={cn(
                "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold",
                trend.direction === "up" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
              )}>
                {trend.direction === "up" ? "↑" : "↓"} {trend.value}%
              </div>
              <span className="text-xs text-muted-foreground uppercase font-semibold">vs last month</span>
            </div>
          )}
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
    </Card>
  );
}
