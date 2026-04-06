"use client";

import React from "react";
import LandlordLayout from "@/components/LandlordLayout";
import DashboardCard from "@/components/DashboardCard";
import { 
  Building2, 
  Home, 
  Users, 
  DollarSign, 
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
  Zap
} from "lucide-react";
import { getLandlordStats, mockPayments, mockComplaints } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandlordDashboard() {
  const { userName } = useAuth();
  const stats = getLandlordStats();
  const recentPayments = mockPayments.slice(0, 5);
  const recentComplaints = mockComplaints.slice(0, 3);
  
  const greeting = new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 17 ? "Afternoon" : "Evening";
  const today = new Date().toLocaleDateString("en-KE", { weekday: "long", month: "long", day: "numeric" });
  
  const occupancyRate = Math.round((stats.occupiedUnits / stats.totalUnits) * 100);

  return (
    <LandlordLayout>
      <div 
        className="min-h-screen px-4 lg:px-4 py-4 sm:py-6 lg:py-8"
        style={{ backgroundColor: "#FAFAF8" }}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Professional Welcome Header */}
          <Card className="border-[#E8F5EE] bg-white overflow-hidden">
            <CardContent className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E8F5EE] rounded-full">
                    <Calendar className="w-3.5 h-3.5 text-[#1B5E45]" />
                    <span className="text-xs font-semibold text-[#1B5E45]">{today}</span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-[#6B7280] mb-1">Good {greeting},</p>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A]">
                      {userName || "Property Manager"}
                    </h1>
                  </div>
                  
                  <div className="flex items-center gap-6 pt-2">
                    {[
                      { label: "Properties", val: stats.totalBuildings },
                      { label: "Occupancy", val: `${occupancyRate}%` },
                      { label: "Revenue", val: `KSh ${(stats.monthlyIncome / 1000).toFixed(0)}K` },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <p className="text-2xl font-bold text-[#1A1A1A]">{item.val}</p>
                        <p className="text-xs font-medium text-[#6B7280]">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-row items-center gap-3 w-full lg:w-auto">
                  <Button 
                    size="lg"
                    className="bg-[#1B5E45] hover:bg-[#246B4F] text-white font-semibold shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Property
                  </Button>
                  
                  {stats.tenantsInArrears > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-semibold text-red-700">
                        {stats.tenantsInArrears} Arrears Pending
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                label: "Total Units", 
                value: stats.totalUnits, 
                icon: Home, 
                color: "#1B5E45",
                bgColor: "#E8F5EE",
                trend: { value: 4, isPositive: true }
              },
              { 
                label: "Occupied Units", 
                value: stats.occupiedUnits, 
                icon: Users, 
                color: "#3DBE7A",
                bgColor: "#E8F5EE",
                trend: { value: 2, isPositive: true }
              },
              { 
                label: "Monthly Revenue", 
                value: `KSh ${(stats.monthlyIncome / 1000).toFixed(0)}K`, 
                icon: DollarSign, 
                color: "#1B5E45",
                bgColor: "#E8F5EE",
                trend: { value: 12, isPositive: true }
              },
              { 
                label: "Arrears", 
                value: stats.tenantsInArrears, 
                icon: AlertCircle, 
                color: "#EF4444",
                bgColor: "#FEE2E2",
                trend: { value: 8, isPositive: false }
              }
            ].map((stat, i) => (
              <Card key={i} className="border-[#E8F5EE] bg-white hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: stat.bgColor, color: stat.color }}
                    >
                      <stat.icon className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    {stat.trend && (
                      <Badge 
                        variant="outline" 
                        className={stat.trend.isPositive 
                          ? "border-[#3DBE7A] text-[#3DBE7A] bg-[#E8F5EE]" 
                          : "border-red-300 text-red-600 bg-red-50"
                        }
                      >
                        {stat.trend.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                        {stat.trend.value}%
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#6B7280]">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Portfolio Analytics */}
            <Card className="lg:col-span-2 border-[#E8F5EE] bg-white">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-[#1A1A1A] text-xl font-bold">Portfolio Overview</CardTitle>
                    <CardDescription className="text-[#6B7280] mt-1">
                      Performance metrics and occupancy analytics
                    </CardDescription>
                  </div>
                  <Link href="/landlord/reports">
                    <Button variant="ghost" size="sm" className="text-[#1B5E45] hover:bg-[#E8F5EE] font-semibold">
                      View Reports
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Occupancy Progress */}
                <div className="space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#6B7280] mb-1">Occupancy Rate</p>
                      <p className="text-3xl font-bold text-[#1A1A1A]">
                        {stats.occupiedUnits}
                        <span className="text-lg text-[#6B7280] font-normal ml-2">
                          of {stats.totalUnits} units
                        </span>
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20">
                      {occupancyRate}% Occupied
                    </Badge>
                  </div>
                  <div className="h-3 w-full rounded-full bg-[#E8F5EE] overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${occupancyRate}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full bg-[#1B5E45]" 
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium text-[#6B7280]">
                    <span>{stats.occupiedUnits} Leased Units</span>
                    <span>{stats.vacantUnits} Vacant</span>
                  </div>
                </div>

                <Separator className="bg-[#F4F4F0]" />

                {/* Performance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Revenue Chart */}
                  <div className="p-6 rounded-xl border border-[#E8F5EE] bg-[#FAFAF8] space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#E8F5EE] flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-[#1B5E45]" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#6B7280]">Revenue Trend</p>
                        <p className="text-sm font-bold text-[#1A1A1A]">6-Month View</p>
                      </div>
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[35, 42, 65, 55, 80, 100].map((height, i) => (
                        <div key={i} className="flex-1 flex items-end">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-80 ${
                              i === 5 
                                ? "bg-[#1B5E45]" 
                                : "bg-[#D1E7DD]"
                            }`} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrears Summary */}
                  <div className="p-6 rounded-xl border border-[#E8F5EE] bg-[#FAFAF8] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                          <Activity className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#6B7280]">Arrears Aging</p>
                          <p className="text-sm font-bold text-[#1A1A1A]">Outstanding</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs border-red-200 text-red-600 bg-red-50">
                        {stats.tenantsInArrears} Accounts
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#6B7280]">30+ Days</span>
                        <span className="text-sm font-bold text-[#1A1A1A]">KSh 124,000</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-red-50 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "65%" }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full rounded-full bg-red-500" 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-[#6B7280]">60+ Days</span>
                        <span className="text-sm font-bold text-red-600">KSh 45,000</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-red-50 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "35%" }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                          className="h-full rounded-full bg-red-500" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Support Tickets */}
              <Card className="border-[#E8F5EE] bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#1A1A1A] text-lg font-bold">Support Tickets</CardTitle>
                    <Link href="/landlord/complaints" className="text-xs font-semibold text-[#1B5E45] hover:underline">
                      View All
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentComplaints.map((ticket) => (
                    <Link 
                      key={ticket.id}
                      href={`/landlord/complaints/${ticket.id}`}
                      className="block p-4 rounded-xl bg-[#FAFAF8] border border-[#E8F5EE] hover:border-[#1B5E45]/20 hover:bg-[#E8F5EE] transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                ticket.priority === 'high' 
                                  ? 'border-red-200 text-red-600 bg-red-50' 
                                  : 'border-[#E8F5EE] text-[#6B7280] bg-white'
                              }`}
                            >
                              {ticket.category}
                            </Badge>
                            <span className="text-xs text-[#6B7280]">{ticket.createdDate}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-[#1A1A1A] truncate group-hover:text-[#1B5E45] transition-colors">
                            {ticket.title}
                          </h4>
                          <p className="text-xs font-medium text-[#6B7280]">{ticket.tenantName}</p>
                        </div>
                        <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${
                          ticket.status === 'in-progress' 
                            ? 'bg-[#E8F5EE] text-[#1B5E45]' 
                            : 'bg-red-50 text-red-600'
                        }`}>
                          {ticket.status === 'in-progress' 
                            ? <Activity className="w-4 h-4" /> 
                            : <AlertCircle className="w-4 h-4" />
                          }
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-[#E8F5EE] bg-white">
                <CardHeader>
                  <CardTitle className="text-[#1A1A1A] text-lg font-bold flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#1B5E45]" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/landlord/tenants">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12 border-[#E8F5EE] hover:bg-[#E8F5EE] hover:border-[#1B5E45]/20 font-semibold"
                    >
                      <Plus className="w-4 h-4 mr-3 text-[#1B5E45]" />
                      Add New Tenant
                    </Button>
                  </Link>
                  <Link href="/landlord/payments">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12 border-[#E8F5EE] hover:bg-[#E8F5EE] hover:border-[#1B5E45]/20 font-semibold"
                    >
                      <DollarSign className="w-4 h-4 mr-3 text-[#1B5E45]" />
                      Record Payment
                    </Button>
                  </Link>
                  <Link href="/landlord/reports">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start h-12 border-[#E8F5EE] hover:bg-[#E8F5EE] hover:border-[#1B5E45]/20 font-semibold"
                    >
                      <BarChart3 className="w-4 h-4 mr-3 text-[#1B5E45]" />
                      Generate Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Transactions Table */}
          <Card className="border-[#E8F5EE] bg-white">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-[#1A1A1A] text-xl font-bold">Recent Transactions</CardTitle>
                  <CardDescription className="text-[#6B7280] mt-1">
                    Latest payment activity across all properties
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-[#E8F5EE] hover:bg-[#E8F5EE] font-semibold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-[#E8F5EE] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#FAFAF8] border-b border-[#E8F5EE]">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase">
                          Transaction ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase">
                          Tenant
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase">
                          Unit
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-[#6B7280] uppercase">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-[#6B7280] uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8F5EE]">
                      {recentPayments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-[#FAFAF8] transition-colors">
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <p className="text-sm font-mono font-semibold text-[#1A1A1A]">
                                {payment.id}
                              </p>
                              <p className="text-xs text-[#6B7280]">{payment.date}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-[#E8F5EE] flex items-center justify-center font-semibold text-[#1B5E45]">
                                {payment.tenantName[0]}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-[#1A1A1A]">
                                  {payment.tenantName}
                                </p>
                                <p className="text-xs text-[#6B7280]">{payment.month}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-[#4B5563]">
                            {payment.unitId}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <p className="text-sm font-bold text-[#1B5E45]">
                              KSh {payment.amount.toLocaleString()}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              <Badge 
                                className={`${
                                  payment.status === 'completed' 
                                    ? 'bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20' 
                                    : 'bg-red-50 text-red-600 border-red-200'
                                } capitalize`}
                              >
                                {payment.status}
                              </Badge>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border-t border-[#E8F5EE] p-4 bg-[#FAFAF8] flex justify-center">
                  <Link href="/landlord/payments">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[#1B5E45] hover:bg-[#E8F5EE] font-semibold"
                    >
                      View All Transactions
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </LandlordLayout>
  );
}