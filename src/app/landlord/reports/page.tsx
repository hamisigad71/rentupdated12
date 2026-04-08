"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import { 
  revenueHistory, 
  occupancyTrends, 
  getLandlordStats 
} from "@/data/mockData";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar, 
  ArrowUpRight, 
  Target, 
  Activity, 
  Zap, 
  ShieldCheck,
  DollarSign,
  Home,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  FileText,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl border border-[#E8F5EE] shadow-xl">
        <p className="text-xs text-[#1A1A1A] mb-2">{label}</p>
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs text-[#6B7280]">{entry.name}</span>
            </div>
            <span className="text-sm text-[#1A1A1A]">
              KSh {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ReportsPage() {
  const stats = getLandlordStats();
  const [chartView, setChartView] = useState<"area" | "line">("area");
  const [timeRange, setTimeRange] = useState("6m");

  const portfolioPerformance = Math.round((stats.occupiedUnits / stats.totalUnits) * 100);
  const revenueGrowth = 12.4;
  const arrearsRate = Math.round((stats.totalArrears / stats.monthlyIncome) * 100);

  return (
    <LandlordLayout>
      <div 
        className="min-h-screen p-4 sm:p-6 lg:p-8"
        style={{ backgroundColor: "#FAFAF8" }}
      >
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <Badge className="bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20 hover:bg-[#E8F5EE]">
                <BarChart3 className="w-3 h-3 mr-1" />
                Analytics & Reports
              </Badge>
              <h1 className="text-xl sm:text-2xl lg:text-3xl text-[#1A1A1A]">
                Performance Dashboard
              </h1>
              <p className="text-sm text-[#6B7280]">
                Comprehensive portfolio analytics and insights
              </p>
            </div>

            <div className="flex flex-row items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 px-4 h-11 rounded-xl bg-white border border-[#E8F5EE]">
                <Calendar className="w-4 h-4 text-[#6B7280]" />
                <span className="text-xs text-[#6B7280]">Period:</span>
                <span className="text-xs text-[#1B5E45]">Q1 2024</span>
              </div>
              <Button
                variant="outline"
                className="border-[#E8F5EE] hover:bg-[#E8F5EE] "
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Revenue",
                value: `KSh ${(stats.monthlyIncome / 1000).toFixed(1)}K`,
                change: "+12.4%",
                isPositive: true,
                icon: DollarSign,
                color: "#1B5E45",
                bgColor: "#E8F5EE",
              },
              {
                label: "Portfolio Yield",
                value: "14.2%",
                change: "+0.8%",
                isPositive: true,
                icon: Target,
                color: "#3DBE7A",
                bgColor: "#E8F5EE",
              },
              {
                label: "Occupancy Rate",
                value: `${portfolioPerformance}%`,
                change: "+1.5%",
                isPositive: true,
                icon: Home,
                color: "#1B5E45",
                bgColor: "#E8F5EE",
              },
              {
                label: "Arrears Rate",
                value: `${arrearsRate}%`,
                change: "-2.1%",
                isPositive: true,
                icon: AlertCircle,
                color: "#EF4444",
                bgColor: "#FEE2E2",
              },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-[#E8F5EE] bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: metric.bgColor, color: metric.color }}
                      >
                        <metric.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "px-1.5 py-0 text-[10px] sm:text-xs",
                          metric.isPositive
                            ? "border-[#3DBE7A] text-[#3DBE7A] bg-[#E8F5EE]"
                            : "border-red-300 text-red-600 bg-red-50"
                        )}
                      >
                        {metric.isPositive ? (
                          <TrendingUp className="w-3 h-3 mr-0.5" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-0.5" />
                        )}
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] sm:text-xs text-[#6B7280]">{metric.label}</p>
                      <h3 className="text-lg sm:text-2xl text-[#1A1A1A]">{metric.value}</h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Revenue Chart - Takes 2/3 width */}
            <Card className="lg:col-span-2 border-[#E8F5EE] bg-white">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-[#1A1A1A] text-xl ">
                      Revenue Analytics
                    </CardTitle>
                    <CardDescription className="text-[#6B7280] mt-1">
                      6-month performance overview
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={chartView === "area" ? "default" : "outline"}
                      onClick={() => setChartView("area")}
                      className={cn(
                        "h-9 px-4",
                        chartView === "area"
                          ? "bg-[#1B5E45] hover:bg-[#246B4F] text-white"
                          : "border-[#E8F5EE] hover:bg-[#E8F5EE]"
                      )}
                    >
                      Area
                    </Button>
                    <Button
                      size="sm"
                      variant={chartView === "line" ? "default" : "outline"}
                      onClick={() => setChartView("line")}
                      className={cn(
                        "h-9 px-4",
                        chartView === "line"
                          ? "bg-[#1B5E45] hover:bg-[#246B4F] text-white"
                          : "border-[#E8F5EE] hover:bg-[#E8F5EE]"
                      )}
                    >
                      Line
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartView === "area" ? (
                      <AreaChart data={revenueHistory}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1B5E45" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#1B5E45" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3DBE7A" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#3DBE7A" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E8F5EE" vertical={false} />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6B7280", fontWeight: 400 }}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6B7280", fontWeight: 400 }}
                          tickFormatter={(val) => `${val / 1000}K`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          wrapperStyle={{ paddingTop: "20px" }}
                          iconType="circle"
                          formatter={(value) => (
                            <span className="text-sm text-[#4B5563]">{value}</span>
                          )}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          name="Actual Revenue"
                          stroke="#1B5E45"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                        />
                        <Area
                          type="monotone"
                          dataKey="target"
                          name="Target"
                          stroke="#3DBE7A"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          fillOpacity={1}
                          fill="url(#colorTarget)"
                        />
                      </AreaChart>
                    ) : (
                      <LineChart data={revenueHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E8F5EE" vertical={false} />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6B7280", fontWeight: 400 }}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6B7280", fontWeight: 400 }}
                          tickFormatter={(val) => `${val / 1000}K`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          wrapperStyle={{ paddingTop: "20px" }}
                          iconType="circle"
                          formatter={(value) => (
                            <span className="text-sm text-[#4B5563]">{value}</span>
                          )}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          name="Actual Revenue"
                          stroke="#1B5E45"
                          strokeWidth={3}
                          dot={{ fill: "#1B5E45", r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target"
                          stroke="#3DBE7A"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: "#3DBE7A", r: 3 }}
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>

                <Separator className="my-6 bg-[#F4F4F0]" />

                {/* Revenue Insights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Peak Month", value: "MAR '24", sublabel: "Highest Revenue" },
                    { label: "Growth Rate", value: "18.4%", sublabel: "Year-on-Year" },
                    { label: "vs Target", value: "+12.2%", sublabel: "Above Target" },
                    { label: "Net Income", value: "KSh 1.2M", sublabel: "This Quarter" },
                  ].map((insight, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-xs text-[#6B7280]">{insight.label}</p>
                      <p className="text-lg text-[#1B5E45]">{insight.value}</p>
                      <p className="text-xs text-[#6B7280]">{insight.sublabel}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Occupancy & Performance */}
            <div className="space-y-6">
              
              {/* Occupancy Chart */}
              <Card className="border-[#E8F5EE] bg-white">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F5EE] flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-[#1B5E45]" />
                    </div>
                    <div>
                      <CardTitle className="text-[#1A1A1A] text-lg ">
                        Occupancy
                      </CardTitle>
                      <CardDescription className="text-[#6B7280] text-xs">
                        By building
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={occupancyTrends} layout="vertical" barSize={20}>
                        <XAxis type="number" hide />
                        <YAxis
                          dataKey="name"
                          type="category"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 400 }}
                          width={90}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="occupied" radius={[0, 8, 8, 0]}>
                          {occupancyTrends.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={index === 0 ? "#1B5E45" : "#E8F5EE"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <Separator className="my-4 bg-[#F4F4F0]" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#3DBE7A] animate-pulse" />
                      <span className="text-xs text-[#6B7280]">
                        Overall Performance
                      </span>
                    </div>
                    <Badge className="bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20">
                      {portfolioPerformance}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="border-[#E8F5EE] bg-white">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F5EE] flex items-center justify-center">
                      <Activity className="w-5 h-5 text-[#1B5E45]" />
                    </div>
                    <div>
                      <CardTitle className="text-[#1A1A1A] text-lg ">
                        Operations
                      </CardTitle>
                      <CardDescription className="text-[#6B7280] text-xs">
                        Key performance indicators
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Collection Rate", value: 92, max: 100, color: "#3DBE7A" },
                    { label: "Avg Response Time", value: 75, max: 100, color: "#1B5E45" },
                    { label: "Cost Efficiency", value: 88, max: 100, color: "#3DBE7A" },
                  ].map((metric, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className=" text-[#4B5563]">{metric.label}</span>
                        <span className=" text-[#1A1A1A]">{metric.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#F4F4F0] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: metric.color }}
                        />
                      </div>
                    </div>
                  ))}

                  <Separator className="my-4 bg-[#F4F4F0]" />

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-[#E8F5EE]">
                    <CheckCircle2 className="w-4 h-4 text-[#1B5E45]" />
                    <span className="text-xs text-[#1B5E45]">
                      All systems operational
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional Insights Section */}
          <Card className="border-[#E8F5EE] bg-white">
            <CardHeader>
              <CardTitle className="text-[#1A1A1A] text-xl ">
                Portfolio Insights
              </CardTitle>
              <CardDescription className="text-[#6B7280]">
                Key takeaways and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: TrendingUp,
                    title: "Strong Growth",
                    description: "Revenue increased 12.4% compared to last quarter",
                    color: "#3DBE7A",
                    bgColor: "#E8F5EE",
                  },
                  {
                    icon: Target,
                    title: "Target Achievement",
                    description: "Exceeded quarterly targets by 12.2%",
                    color: "#1B5E45",
                    bgColor: "#E8F5EE",
                  },
                  {
                    icon: AlertCircle,
                    title: "Action Required",
                    description: `${arrearsRate}% arrears rate - consider collection strategy`,
                    color: "#EF4444",
                    bgColor: "#FEE2E2",
                  },
                ].map((insight, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl border border-[#E8F5EE] bg-[#FAFAF8] space-y-3"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: insight.bgColor, color: insight.color }}
                    >
                      <insight.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm text-[#1A1A1A] mb-1">
                        {insight.title}
                      </h4>
                      <p className="text-xs text-[#6B7280]">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LandlordLayout>
  );
}