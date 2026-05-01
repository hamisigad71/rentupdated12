"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import { mockTenants, mockUnits, Tenant } from "@/data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  User,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  ArrowUpRight,
  MoreHorizontal,
  Filter,
  Download,
  Plus,
  Building2,
  Trash2,
  Edit,
  AlertCircle,
  CheckCircle2,
  Send,
  FileText,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
 
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
)

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
)

const CustomAlertIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current size-4", className)}
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
)

const CustomCheckIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
    style={{
      WebkitMaskImage: 'url(/check.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/check.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
)
// --- Overview Card --------------------------------------------------------
function OverviewCard({
  label,
  value,
  trend,
  subtext,
  isNegative = false,
  icon: Icon,
  variant = "default",
}: {
  label: string;
  value: React.ReactNode;
  trend?: string;
  subtext?: string;
  isNegative?: boolean;
  icon?: React.ElementType;
  variant?: "default" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <Card 
      className={cn(
        "relative rounded-[24px] sm:rounded-3xl overflow-hidden h-full flex flex-col justify-between transition-all duration-300 hover:shadow-md group min-h-[130px] sm:min-h-[160px]",
        isDark 
          ? "bg-gradient-to-br from-[#0c4a34] to-[#062b1e] border-transparent shadow-xl shadow-[#062b1e]/20" 
          : "bg-white border-black/[0.04] shadow-sm hover:border-black/[0.08]"
      )}
    >
      {/* Optional Sparkline Decor for Dark Card */}
      {isDark && (
        <div className="absolute bottom-10 left-0 right-0 h-10 sm:h-12 pointer-events-none opacity-40">
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-emerald-400 fill-none" strokeWidth="0.5">
            <path d="M0 20 Q 20 18, 30 15 T 60 10 T 100 5" />
          </svg>
        </div>
      )}
      
      <CardContent className="p-3.5 sm:p-5 flex flex-col justify-between h-full relative z-10 w-full">
        {/* Top Row: Label & Icon */}
        <div className="flex items-start justify-between mb-2 sm:mb-4">
          <p className={cn(
            "text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest mt-0.5 sm:mt-1 pr-2 leading-snug",
            isDark ? "text-white/60" : "text-muted-foreground/70"
          )}>
            {label}
          </p>
          {Icon && (
            <div className={cn(
               "h-7 w-7 sm:h-9 sm:w-9 rounded-xl sm:rounded-[14px] flex items-center justify-center shrink-0 transition-colors duration-300",
               isDark 
                 ? "bg-white/10 text-white group-hover:bg-white/20" 
                 : "bg-[#F8F9F7] text-[#1B5E45]/80 border border-black/[0.03] group-hover:bg-[#E8F5EE] group-hover:text-[#1B5E45]"
            )}>
              <Icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" strokeWidth={isDark ? 2 : 1.5} />
            </div>
          )}
        </div>

        {/* Middle Row: Value */}
        <div className="mt-auto mb-2 sm:mb-3">
          <div className={cn(
             "text-xl sm:text-[28px] font-extrabold tracking-tight tabular-nums leading-none",
             isDark ? "text-white" : "text-foreground"
          )}>
            {value}
          </div>
        </div>

        {/* Bottom Row: Trend / Subtext */}
        <div className="flex items-center gap-1.5 mt-auto pt-1">
           {trend && (
             <span className={cn(
               "inline-flex items-center text-[9px] font-bold",
               isDark 
                 ? cn("px-1.5 py-0.5 rounded-md", isNegative ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300")
                 : (isNegative ? "text-rose-600" : "text-[#1B5E45]")
             )}>
               {/* Icon logic: arrow for percentages, dot for status */}
               {trend.includes('%') ? (
                 <svg className="w-2.5 h-2.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
               ) : (
                 <div className={cn("h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full mr-1 sm:mr-1.5", isNegative ? "bg-rose-500" : "bg-[#3DBE7A]")} />
               )}
               {trend}
             </span>
           )}
           {subtext && (
             <span className={cn(
               "text-[9px] font-medium",
               isDark ? "text-white/50" : "text-muted-foreground/60"
             )}>
               {subtext}
             </span>
           )}
        </div>
      </CardContent>
    </Card>
  );
}
 
export default function TenantsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [arrearsFilter, setArrearsFilter] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showAddTenant, setShowAddTenant] = useState(false);

  // Filter tenants
  const filteredTenants = mockTenants.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.unitId.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || t.status === statusFilter;
    
    const matchesArrears =
      arrearsFilter === "all" ||
      (arrearsFilter === "current" && t.arrears === 0) ||
      (arrearsFilter === "arrears" && t.arrears > 0);

    return matchesSearch && matchesStatus && matchesArrears;
  });

  // Calculate statistics
  const totalTenants = mockTenants.length;
  const activeTenants = mockTenants.filter((t) => t.status === "active").length;
  const tenantsInArrears = mockTenants.filter((t) => t.arrears > 0).length;
  const totalArrears = mockTenants.reduce((sum, t) => sum + t.arrears, 0);
  const totalMonthlyRent = mockTenants.reduce((sum, t) => sum + t.rent, 0);
  const collectionRate = totalMonthlyRent > 0 
    ? Math.round(((totalMonthlyRent - totalArrears) / totalMonthlyRent) * 100)
    : 0;

  return (
    <LandlordLayout>
      <div 
        className="min-h-screen p-4 sm:p-6 lg:p-8"
        style={{ backgroundColor: "#FAFAF8" }}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <Badge className="bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20 hover:bg-[#E8F5EE]">
                <CustomTenantIcon className="w-3 h-3 mr-1" />
                Tenant Management
              </Badge>
              <h1 className="text-xl sm:text-2xl lg:text-3xl text-[#1A1A1A]">
                Tenants
              </h1>
              <p className="text-sm text-[#6B7280]">
                Manage your tenant relationships and leases
              </p>
            </div>

            <div className="flex flex-row items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                className="border-[#E8F5EE] hover:bg-[#E8F5EE] "
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                onClick={() => setShowAddTenant(true)}
                className="bg-[#1B5E45] hover:bg-[#246B4F] text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Tenant
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <OverviewCard 
              label="Total Tenants" 
              value={totalTenants}
              variant="dark"
              icon={Users}
              trend="+3"
              subtext="Added this month"
            />
            <OverviewCard 
              label="Active Leases" 
              value={activeTenants}
              trend="Stable"
              subtext="Compared to last month"
              icon={CheckCircle2}
            />
            <OverviewCard 
              label="Collection Rate" 
              value={
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl text-foreground">{collectionRate}</span>
                  <span className="text-lg font-bold text-muted-foreground/60">%</span>
                </div>
              }
              trend="+2.1%"
              subtext="Improvement"
              icon={TrendingUp}
            />
            <OverviewCard 
              label="Total Arrears" 
              value={
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-bold text-muted-foreground mr-1">KES</span>
                  <span className="text-2xl sm:text-3xl text-rose-600">{(totalArrears / 1000).toFixed(0)}K</span>
                </div>
              }
              trend="14 pending"
              isNegative={true}
              subtext="Needs action"
              icon={AlertCircle}
            />
          </div>

          {/* Filters Section */}
          <Card className="rounded-[24px] sm:rounded-[32px] border-black/[0.04] bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                  <Input
                    placeholder="Search tenants by name, unit, or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 h-11 border-[#E8F5EE] bg-white focus:border-[#1B5E45]"
                  />
                </div>

                <div className="flex gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px] h-11 border-[#E8F5EE] bg-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={arrearsFilter} onValueChange={setArrearsFilter}>
                    <SelectTrigger className="w-[140px] h-11 border-[#E8F5EE] bg-white">
                      <SelectValue placeholder="Payment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Payments</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="arrears">In Arrears</SelectItem>
                    </SelectContent>
                  </Select>

                  <Badge variant="outline" className="h-11 px-4 bg-[#FAFAF8] border-[#E8F5EE] text-[#4B5563] flex items-center gap-2">
                    <span className="text-xs ">Results:</span>
                    <span className="text-sm text-[#1B5E45]">
                      {filteredTenants.length}
                    </span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tenants Table */}
          <Card className="rounded-[24px] sm:rounded-[32px] border-black/[0.04] bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#FAFAF8] border-b border-[#E8F5EE] hover:bg-[#FAFAF8]">
                    <TableHead className="px-6 py-4 text-xs text-[#6B7280] uppercase">
                      Tenant
                    </TableHead>
                    <TableHead className="px-6 py-4 text-xs text-[#6B7280] uppercase">
                      Unit
                    </TableHead>
                    <TableHead className="px-6 py-4 text-xs text-[#6B7280] uppercase">
                      Contact
                    </TableHead>
                    <TableHead className="px-6 py-4 text-xs text-[#6B7280] uppercase text-right">
                      Rent
                    </TableHead>
                    <TableHead className="px-6 py-4 text-xs text-[#6B7280] uppercase text-right">
                      Arrears
                    </TableHead>
                    <TableHead className="px-6 py-4 text-xs text-[#6B7280] uppercase text-center">
                      Status
                    </TableHead>
                    <TableHead className="px-6 py-4"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredTenants.map((tenant, i) => (
                      <motion.tr
                        key={tenant.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-[#E8F5EE] hover:bg-[#FAFAF8] transition-colors"
                      >
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#E8F5EE] flex items-center justify-center text-[#1B5E45]">
                              {tenant.name[0]}
                            </div>
                            <div>
                              <p className="text-sm text-[#1A1A1A]">
                                {tenant.name}
                              </p>
                              <p className="text-xs text-[#6B7280]">
                                ID: {tenant.idNumber}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        
                        <TableCell className="px-6 py-4">
                          <div>
                            <p className="text-sm text-[#1B5E45]">
                              {tenant.unitId}
                            </p>
                            <p className="text-xs text-[#6B7280]">
                              Since {tenant.moveInDate}
                            </p>
                          </div>
                        </TableCell>

                        <TableCell className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                              <Phone className="w-3 h-3" />
                              {tenant.phone}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[#6B7280] max-w-[200px] truncate">
                              <Mail className="w-3 h-3" />
                              {tenant.email}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="px-6 py-4 text-right">
                          <p className="text-sm text-[#1A1A1A]">
                            KSh {tenant.rent.toLocaleString()}
                          </p>
                        </TableCell>

                        <TableCell className="px-6 py-4 text-right">
                          <p
                            className={cn(
                              "text-sm ",
                              tenant.arrears > 0 ? "text-red-600" : "text-[#3DBE7A]"
                            )}
                          >
                            {tenant.arrears > 0 
                              ? `KSh ${tenant.arrears.toLocaleString()}`
                              : "—"
                            }
                          </p>
                        </TableCell>

                        <TableCell className="px-6 py-4">
                          <div className="flex justify-center">
                            <Badge
                              className={cn(
                                tenant.status === "active"
                                  ? "bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20"
                                  : "bg-red-50 text-red-600 border-red-200",
                                "capitalize"
                              )}
                            >
                              {tenant.status}
                            </Badge>
                          </div>
                        </TableCell>

                        <TableCell className="px-6 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-[#E8F5EE]"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedTenant(tenant);
                                  setShowProfile(true);
                                }}
                              >
                                <User className="w-4 h-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Send className="w-4 h-4 mr-2" />
                                Send Notice
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="w-4 h-4 mr-2" />
                                View Lease
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Remove Tenant
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>

            {filteredTenants.length === 0 && (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 mx-auto text-[#6B7280] mb-4" />
                <h3 className="text-lg text-[#1A1A1A] mb-2">
                  No tenants found
                </h3>
                <p className="text-sm text-[#6B7280]">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Tenant Profile Modal */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden bg-white sm:rounded-[32px]">
          <div className="flex flex-col h-full">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#E8F5EE] bg-[#FAFAF8]">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#E8F5EE] flex items-center justify-center text-2xl text-[#1B5E45]">
                  {selectedTenant?.name[0]}
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-xl text-[#1A1A1A] mb-1">
                    {selectedTenant?.name}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-[#6B7280]">
                    Unit {selectedTenant?.unitId} • Tenant since {selectedTenant?.moveInDate}
                  </DialogDescription>
                </div>
                <Badge
                  className={cn(
                    selectedTenant?.status === "active"
                      ? "bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20"
                      : "bg-red-50 text-red-600 border-red-200",
                    "capitalize"
                  )}
                >
                  {selectedTenant?.status}
                </Badge>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Financial Overview */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    label: "Monthly Rent",
                    value: `KSh ${selectedTenant?.rent.toLocaleString()}`,
                    icon: DollarSign,
                    color: "#1B5E45",
                    bgColor: "#E8F5EE",
                  },
                  {
                    label: "Amount Paid",
                    value: `KSh ${selectedTenant?.paidAmount.toLocaleString()}`,
                    icon: CheckCircle2,
                    color: "#3DBE7A",
                    bgColor: "#E8F5EE",
                  },
                  {
                    label: "Arrears",
                    value: `KSh ${selectedTenant?.arrears.toLocaleString()}`,
                    icon: CustomAlertIcon,
                    color: (selectedTenant?.arrears ?? 0) > 0 ? "#EF4444" : "#3DBE7A",
                    bgColor: (selectedTenant?.arrears ?? 0) > 0 ? "#FEE2E2" : "#E8F5EE",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-[#E8F5EE] bg-[#FAFAF8]"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: stat.bgColor, color: stat.color }}
                    >
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-[#6B7280] mb-1">
                      {stat.label}
                    </p>
                    <p className="text-lg " style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="bg-[#F4F4F0]" />

              {/* Contact Information */}
              <div>
                <h3 className="text-sm text-[#1A1A1A] mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Phone Number", value: selectedTenant?.phone, icon: Phone },
                    { label: "Email Address", value: selectedTenant?.email, icon: Mail },
                    { label: "ID Number", value: selectedTenant?.idNumber, icon: User },
                    { label: "Move-in Date", value: selectedTenant?.moveInDate, icon: Calendar },
                  ].map((field, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 rounded-xl bg-[#FAFAF8] border border-[#E8F5EE]"
                    >
                      <field.icon className="w-4 h-4 text-[#6B7280]" />
                      <div>
                        <p className="text-xs text-[#6B7280]">{field.label}</p>
                        <p className="text-sm text-[#1A1A1A]">
                          {field.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-[#F4F4F0]" />

              {/* Payment Compliance */}
              <div>
                <h3 className="text-sm text-[#1A1A1A] mb-4">
                  Payment Performance
                </h3>
                <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E8F5EE] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#6B7280]">
                      Compliance Rate
                    </span>
                    <span className="text-sm text-[#1B5E45]">
                      {selectedTenant?.rent 
                        ? Math.round(((selectedTenant.paidAmount / selectedTenant.rent) * 100))
                        : 0}%
                    </span>
                  </div>
                  <Progress
                    value={selectedTenant?.rent 
                      ? (selectedTenant.paidAmount / selectedTenant.rent) * 100
                      : 0}
                    className="h-2 bg-[#F4F4F0]"
                  />
                  <p className="text-xs text-[#6B7280]">
                    {(selectedTenant?.arrears ?? 0) === 0
                      ? "This tenant is up to date with payments"
                      : `Outstanding balance of KSh ${selectedTenant?.arrears.toLocaleString()}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-4 border-t border-[#E8F5EE] bg-[#FAFAF8] flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-[#E8F5EE] hover:bg-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Details
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#E8F5EE] hover:bg-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Notice
              </Button>
              <Button
                className="flex-1 bg-[#1B5E45] hover:bg-[#246B4F] text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Lease
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Tenant Modal */}
      <Dialog open={showAddTenant} onOpenChange={setShowAddTenant}>
        <DialogContent className="max-w-2xl bg-white sm:rounded-[32px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-[#1A1A1A]">
              Add New Tenant
            </DialogTitle>
            <DialogDescription className="text-sm text-[#6B7280]">
              Register a new tenant to your property
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 text-center text-[#6B7280]">
            <Plus className="w-12 h-12 mx-auto mb-4 text-[#1B5E45]" />
            <p>Add tenant form will be implemented here</p>
          </div>
        </DialogContent>
      </Dialog>
    </LandlordLayout>
  );
}