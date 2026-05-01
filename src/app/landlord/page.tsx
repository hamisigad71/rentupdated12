"use client";

import React, { useRef } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import {
  Building2,
  Home,
  Users,
  AlertCircle,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Activity,
  BarChart3,
  ChevronRight,
  TrendingDown,
  Calendar,
  Download,
  Zap,
  MapPin,
  Bell,
  Settings,
  MoreHorizontal,
  ArrowRight,
  CheckCircle2,
  Clock,
  Wrench,
  Receipt,
  Eye,
  FileText,
  Wallet,
} from "lucide-react";
import { getLandlordStats, mockPayments, mockComplaints } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from "recharts";
import StatCard from "@/components/StatCard";

function CustomLandlordIcon({ className }: { className?: string }) {
  return (
    <div 
      className={cn("bg-current", className)}
      style={{
        WebkitMaskImage: 'url(/residential.png)', 
        WebkitMaskSize: 'contain', 
        WebkitMaskPosition: 'center', 
        WebkitMaskRepeat: 'no-repeat',
        maskImage: 'url(/residential.png)', 
        maskSize: 'contain', 
        maskPosition: 'center', 
        maskRepeat: 'no-repeat',
      }} 
    />
  );
}
 
function CustomAnalyticIcon({ className }: { className?: string }) {
  return (
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
}
 
function CustomFolderIcon({ className }: { className?: string }) {
  return (
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
}
 
function CustomAlertIcon({ className }: { className?: string }) {
  return (
    <div 
      className={cn("bg-current", className)}
      style={{
        WebkitMaskImage: 'url(/exclamation-mark.png)', 
        WebkitMaskSize: 'contain', 
        WebkitMaskPosition: 'center', 
        WebkitMaskRepeat: 'no-repeat',
        maskImage: 'url(/exclamation-mark.png)', 
        maskSize: 'contain', 
        maskPosition: 'center', 
        maskRepeat: 'no-repeat',
      }} 
    />
  );
}
 
function CustomTenantIcon({ className }: { className?: string }) {
  return (
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
}
 
const CustomMoneyIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
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

const CustomNotificationIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url("/ringing.png")', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url("/ringing.png")', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomHomeIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
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
// --- Reveal ----------------------------------------------------------------
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
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- Hero Mini Stat --------------------------------------------------------
function HeroMiniStat({
  icon: Icon,
  label,
  value,
  highlight = false,
  danger = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
          danger ? "bg-red-50" : "bg-[#F0F5F1]",
        )}
      >
        <Icon
          className={cn(
            "h-6 w-6",
            danger ? "text-red-500" : "text-[#1B5E45]",
          )}
        />
      </div>
      <div>
        <p className="text-[10px] font-normal uppercase tracking-widest text-muted-foreground leading-none mb-0.5">
          {label}
        </p>
        <p
          className={cn(
            "text-sm font-medium leading-none",
            danger ? "text-red-600" : "text-foreground",
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}


// --- Portfolio Card --------------------------------------------------------
function PortfolioCard({
  value,
  properties,
  trend,
}: {
  value: string;
  properties: number;
  trend: string;
}) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0c4a34] to-[#062b1e] p-8 shadow-xl shadow-emerald-900/40 text-white group min-h-[220px] flex flex-col justify-center">
        {/* Pulsing Glow Effect */}
        <motion.div 
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(61,190,122,0.15) 0%, transparent 70%)"
          }}
        />

        {/* Dynamic Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-50" />
        <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl group-hover:bg-emerald-500/25 transition-all duration-700" />
        
        {/* Animated Wavy Decorator */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-20 pointer-events-none">
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

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Main Info */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md shadow-inner">
                  <Wallet className="h-4 w-4 text-[#3DBE7A]" />
                </div>
                <p className="text-white/70 text-[11px] font-medium uppercase tracking-wider">Total Portfolio Value</p>
              </div>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-2xl font-medium text-white/80">KES</span>
                <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-white drop-shadow-md">
                  {value.replace('KES', '').trim()}
                </h2>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-emerald-500/20 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-lg"
              >
                <TrendingUp className="h-4 w-4 text-[#3DBE7A]" />
                <span className="text-xs font-medium text-[#3DBE7A]">{trend}</span>
              </motion.div>
              <div className="flex items-center gap-2">
                <motion.div 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-[#3DBE7A] shadow-[0_0_10px_#3DBE7A]" 
                />
                <p className="text-white/50 text-[11px] font-medium uppercase tracking-widest">Across {properties} properties</p>
              </div>
            </div>
          </div>

          {/* Desktop Insights Divider */}
          <div className="hidden lg:block h-32 w-px bg-white/10" />

          {/* New Portfolio Insights Panel */}
          <div className="lg:col-span-1 hidden lg:grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <p className="text-white/40 text-[9px] uppercase tracking-widest">Occupancy</p>
              <p className="text-xl font-medium text-white">89.2%</p>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#3DBE7A] w-[89%]" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-white/40 text-[9px] uppercase tracking-widest">Avg. Yield</p>
              <p className="text-xl font-medium text-white">12.4%</p>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[72%]" />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 hidden lg:grid grid-cols-1 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
              <p className="text-white/40 text-[9px] uppercase tracking-widest mb-1">Efficiency</p>
              <div className="flex items-center justify-between text-white">
                <span className="text-xl font-medium text-white">96%</span>
                <div className="h-8 w-8 rounded-full border-2 border-[#3DBE7A] border-t-transparent animate-spin-slow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// --- Main Dashboard --------------------------------------------------------
export default function LandlordDashboard() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { userName } = useAuth();
  const stats = getLandlordStats();
  const recentPayments = mockPayments.slice(0, 5);
  const recentComplaints = mockComplaints.slice(0, 3);

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    !mounted ? "" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = now.toLocaleDateString("en-KE", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const occupancyRate = Math.round(
    (stats.occupiedUnits / stats.totalUnits) * 100,
  );

  return (
    <LandlordLayout>
      <TooltipProvider>
        <div className="min-h-screen bg-[#FAFAF8]">

          {/* -- Sticky Nav ------------------------------------ */}
          <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
                <CustomLandlordIcon className="h-6 w-6 text-[#1B5E45]" />
                <ChevronRight className="h-3 w-3" />
                <span className="font-medium text-foreground truncate max-w-[80px] sm:max-w-none">Dashboard</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <Tooltip>
                  <TooltipTrigger render={<span />}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl relative text-muted-foreground hover:text-foreground hover:bg-[#E8F5EE]"
                    >
                      <CustomNotificationIcon className="h-4 w-4" />
                      <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-2.5 sm:px-4 rounded-xl border-border text-sm font-medium hover:bg-[#E8F5EE] hover:border-[#1B5E45]/30 hover:text-[#1B5E45]"
                >
                  <CustomFolderIcon className="h-5 w-5 sm:mr-2 text-[#1B5E45]" />
                  <span className="hidden sm:inline">Export</span>
                </Button>

                <Link
                  href="/landlord/properties/new"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "h-9 px-2.5 sm:px-4 rounded-xl bg-[#1B5E45] hover:bg-[#246B4F] text-white text-sm font-medium shadow-sm",
                  )}
                >
                  <Plus className="h-4 w-4 sm:mr-1.5" />
                  <span className="hidden sm:inline">Add Property</span>
                </Link>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">
            
            {/* -- Greeting + Notification -- */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs font-normal mb-1">Hello, {userName || "User"}</p>
                <h1 className="text-xl font-medium text-foreground">Landlord Dashboard</h1>
              </div>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-border/40 bg-white shadow-sm">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>

            {/* -- Portfolio Card -- */}
            <PortfolioCard 
              value={`KES ${(stats.monthlyIncome * 51).toLocaleString()}`} 
              properties={stats.totalBuildings} 
              trend="+12.5%" 
            />

            {/* -- Overview Grid -------------------------------------------------------- */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-foreground">Overview</h3>
                <span className="text-[11px] font-medium text-[#3DBE7A] bg-[#E8F5EE] px-2.5 py-1 rounded-full">
                  This Month
                </span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard 
                  label="Total Rent Collected" 
                  value={
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white/50 mb-1">KES</span>
                      <span>{(stats.monthlyIncome * 0.9).toLocaleString()}</span>
                    </div>
                  }
                  variant="dark"
                  icon={Receipt}
                  trend={{ value: "+8.2%", label: "This month", type: "pill" }}
                />
                <StatCard 
                  label="Pending Rent" 
                  value={
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-muted-foreground/30 mb-1">KES</span>
                      <span>{(stats.monthlyIncome * 0.1).toLocaleString()}</span>
                    </div>
                  }
                  trend={{ value: "-2.1%", label: "Awaiting clearance", isNegative: true }}
                  icon={Clock}
                />
                <StatCard 
                  label="Occupancy Rate" 
                  value={
                    <div className="flex items-baseline gap-1">
                      <span>{occupancyRate}</span>
                      <span className="text-lg text-muted-foreground/40">%</span>
                    </div>
                  }
                  trend={{ value: "+4.5%", label: "vs last month", isPositive: true }}
                  icon={Users}
                />
                <StatCard 
                  label="Properties" 
                  value={stats.totalBuildings} 
                  trend={{ value: "+2", label: "New acquisitions", isNeutral: true }}
                  icon={Building2}
                />
              </div>
            </section>

            {/* -- Rent Collection Trend -- */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-foreground">Rent Collection Trend</h3>
                <div className="flex items-center gap-1 text-[10px] font-medium text-[#3DBE7A] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-2.5 w-2.5" />
                  +8.2%
                </div>
              </div>
              <Card className="rounded-[32px] border-border/40 bg-white shadow-sm overflow-hidden p-6 sm:p-8">
                <div className="h-[250px] lg:h-[400px] w-full mt-4">
                  <TrendsAreaChart />
                </div>
              </Card>
            </section>

            {/* -- Split Layout for Radar & Maintenance -- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
              <section className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-foreground">Recent Transactions</h3>
                  <Link href="/landlord/payments" className="text-xs font-normal text-[#3DBE7A]">
                    View all
                  </Link>
                </div>
                <Card className="rounded-[32px] border-border/40 bg-white shadow-sm overflow-hidden flex flex-col">
                  {recentPayments.map((payment, i) => (
                    <TransactionItem key={i} payment={payment} />
                  ))}
                </Card>
              </section>

              <div className="space-y-8">
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-foreground">Needs Attention</h3>
                    <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Urgent</Badge>
                  </div>
                  <div className="space-y-3">
                    <MaintenanceItem type="Plumbing Issue" property="Sunset Villas 3B" status="urgent" />
                    <MaintenanceItem type="HVAC Repair" property="Greenwood Unit 12" status="normal" />
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-foreground">Lease Radar</h3>
                    <Link href="/landlord/tenants" className="text-xs font-normal text-[#3DBE7A]">
                      See all
                    </Link>
                  </div>
                  <Card className="rounded-[32px] border-border/40 bg-white shadow-sm overflow-hidden min-h-[160px]">
                    <LeaseRadarItem name="John Doe" unit="Greenwood 4A" days={14} />
                    <LeaseRadarItem name="Sarah Smith" unit="Greenwood 2B" days={28} />
                    <LeaseRadarItem name="Michael Johnson" unit="Oceanview 12C" days={45} />
                  </Card>
                </section>
              </div>
            </div>

            {/* -- Property Performance Table -- */}
            <section className="space-y-4 pb-12">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-foreground">Property Performance</h3>
              </div>
              <PropertyPerformance />
            </section>


          </main>
        </div>
      </TooltipProvider>
    </LandlordLayout>
  );
}
// --- Chart Component -----------------------------------------------------
const chartData = [
  { name: "Jan", value: 400000 },
  { name: "Feb", value: 800000 },
  { name: "Mar", value: 1200000 },
  { name: "Apr", value: 900000 },
  { name: "May", value: 1800000 },
];

function TrendsAreaChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3DBE7A" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3DBE7A" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 10, fill: "#94a3b8" }} 
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 10, fill: "#94a3b8" }} 
          tickFormatter={(value) => value === 0 ? "0" : `${value / 1000000}M`}
        />
        <RechartsTooltip 
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#3DBE7A" 
          strokeWidth={3}
          fillOpacity={1} 
          fill="url(#colorValue)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// --- Transaction Item -----------------------------------------------------
function TransactionItem({ payment }: { payment: any }) {
  return (
    <div className="group flex items-center justify-between p-4 sm:p-5 border-b border-black/[0.04] last:border-0 hover:bg-[#F8F9F7]/50 transition-all duration-300">
      <div className="flex items-center gap-3.5 sm:gap-4">
        {/* Icon Container */}
        <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-[12px] sm:rounded-[14px] bg-white sm:bg-[#F8F9F7] border border-black/[0.03] flex items-center justify-center shrink-0 group-hover:bg-[#E8F5EE] transition-colors duration-300">
          <Receipt className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#1B5E45]/80 group-hover:text-[#1B5E45] transition-colors" strokeWidth={1.5} />
        </div>
        
        {/* Left Text Detail */}
        <div className="flex flex-col gap-0.5">
          <h4 className="text-[13px] sm:text-[14px] font-medium text-foreground tracking-tight">
            {payment.type || "Rent Payment"}
          </h4>
          <p className="text-[10px] sm:text-[11px] font-normal text-muted-foreground/80 mt-0.5">
            <span className="font-medium text-muted-foreground">M-Pesa</span>
            <span className="mx-1.5 opacity-50">•</span>
            {new Date(payment.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>
      
      {/* Right Flex Group */}
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-baseline gap-1">
          <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground/60 uppercase">Kes</span>
          <span className="text-[13px] sm:text-[15px] font-medium text-foreground tracking-tight tabular-nums mt-0.5">
            {payment.amount.toLocaleString()}
          </span>
        </div>
        <span className="inline-flex items-center text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-[#E8F5EE] text-[#3DBE7A]">
          <div className="h-1.5 w-1.5 rounded-full mr-1.5 bg-[#3DBE7A]" />
          Paid
        </span>
      </div>
    </div>
  );
}

// --- Property Performance -------------------------------------------------
function PropertyPerformance() {
  const properties = [
    { name: "Greenwood Heights", occ: 92, revenue: 450000 },
    { name: "Sunset Villas", occ: 100, revenue: 600000 },
    { name: "Ocean", occ: 85, revenue: 320000 },
  ];
  return (
    <Card className="rounded-[32px] border-border/40 bg-white shadow-sm overflow-hidden p-2 sm:p-4">
      <Table>
        <TableHeader>
          <TableRow className="border-border/40 hover:bg-transparent">
            <TableHead className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground px-4 py-4">Property</TableHead>
            <TableHead className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground w-24 px-4 py-4">Occupancy</TableHead>
            <TableHead className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground text-right px-4 py-4">Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((p, i) => (
            <TableRow key={i} className="border-border/20 hover:bg-[#F0F5F1]/30 border-b last:border-0 transition-colors">
              <TableCell className="py-3">
                 <p className="text-[13px] font-medium text-foreground">{p.name}</p>
                 <p className="text-[10px] font-normal text-muted-foreground/60">{Math.floor(p.revenue / 25000)} Units</p>
              </TableCell>
              <TableCell className="py-3">
                 <div className="flex flex-col gap-1.5">
                   <span className={cn("text-[11px] font-medium font-mono", p.occ < 90 ? "text-amber-600" : "text-[#1B5E45]")}>{p.occ}%</span>
                   <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                     <div className={cn("h-full rounded-full", p.occ < 90 ? "bg-amber-400" : "bg-[#3DBE7A]")} style={{ width: `${p.occ}%` }} />
                   </div>
                 </div>
              </TableCell>
              <TableCell className="text-right py-3">
                 <p className="text-[13px] font-medium tabular-nums">KES {(p.revenue).toLocaleString()}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

// --- Maintenance Item -----------------------------------------------------
function MaintenanceItem({ type, property, status }: { type: string, property: string, status: string }) {
  const isUrgent = status === "urgent";
  return (
    <div className="group flex items-center justify-between p-3 sm:p-4 rounded-[20px] sm:rounded-2xl bg-white border border-black/[0.04] shadow-sm hover:shadow-md hover:border-amber-500/20 transition-all duration-300">
      <div className="flex items-center gap-3.5 sm:gap-4">
        <div className={cn(
          "h-10 w-10 sm:h-11 sm:w-11 rounded-[12px] sm:rounded-[14px] flex items-center justify-center shrink-0 transition-colors duration-300",
          isUrgent ? "bg-amber-50 border border-amber-100 text-amber-600" : "bg-blue-50 border border-blue-100 text-blue-600"
        )}>
           <Wrench className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col gap-0.5">
          <h4 className="text-[13px] sm:text-[14px] font-medium text-foreground tracking-tight">
            {type}
          </h4>
          <p className="text-[10px] sm:text-[11px] font-normal text-muted-foreground/80 mt-0.5">
            <span className="font-medium text-muted-foreground">{property}</span>
            <span className="mx-1.5 opacity-50">•</span>
            Just now
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="h-8 text-xs font-medium rounded-full bg-[#F8F9F7] border border-black/[0.04] hover:bg-gray-100 px-3">
        Review
      </Button>
    </div>
  );
}

// --- Lease Radar Item -----------------------------------------------------
function LeaseRadarItem({ name, unit, days }: { name: string, unit: string, days: number }) {
  const isUrgent = days <= 30;
  return (
    <div className="flex items-center justify-between p-3 border-b border-border/40 last:border-0 hover:bg-gray-50/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Users className="h-4 w-4 text-gray-500" />
        </div>
        <div>
          <p className="text-xs font-medium text-foreground">{name}</p>
          <p className="text-[10px] text-muted-foreground">{unit}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={cn(
          "text-[10px] font-medium px-2 py-0.5 rounded-full",
          isUrgent ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
        )}>
          {days} Days
        </span>
        <Button variant="outline" size="icon" className="h-6 w-6 rounded-full border-black/[0.05]">
          <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
