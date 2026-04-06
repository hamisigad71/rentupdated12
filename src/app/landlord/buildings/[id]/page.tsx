"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import LandlordLayout from "@/components/LandlordLayout";
import { 
  mockBuildings, 
  mockUnits, 
  mockTenants, 
  mockPayments, 
  mockComplaints 
} from "@/data/mockData";
import { 
  Building2, 
  MapPin, 
  Users, 
  Home, 
  TrendingUp, 
  AlertCircle, 
  ChevronLeft,
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle2,
  Clock,
  DollarSign,
  Calendar,
  Phone,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function BuildingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const building = useMemo(() => 
    mockBuildings.find(b => b.id === id) || mockBuildings[0], 
    [id]
  );

  const buildingUnits = useMemo(() => 
    mockUnits.filter(u => u.buildingId === id),
    [id]
  );

  const buildingTenants = useMemo(() => 
    mockTenants.filter(t => buildingUnits.some(u => u.id === t.unitId)),
    [buildingUnits]
  );

  const buildingPayments = useMemo(() => 
    mockPayments.filter(p => buildingUnits.some(u => u.id === p.unitId)),
    [buildingUnits]
  );

  const buildingComplaints = useMemo(() => 
    mockComplaints.filter(c => buildingUnits.some(u => u.id === c.unitId)),
    [buildingUnits]
  );

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("units");

  const occupancyRate = building.units > 0 
    ? Math.round((building.occupiedUnits / building.units) * 100) 
    : 0;

  const totalMonthlyRent = buildingUnits.reduce((acc, u) => acc + u.rent, 0);
  const collectedThisMonth = buildingPayments
    .filter(p => p.status === "completed")
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <LandlordLayout>
      <div className="min-h-screen bg-[#FAFAF8] pb-12">
        {/* --- Sticky Header --- */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#E8F5EE] px-4 sm:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => router.back()}
                className="hover:bg-[#E8F5EE] text-[#1B5E45]"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-[#1A1A1A] leading-none">
                  {building.name}
                </h1>
                <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" /> {building.address}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden sm:flex bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20">
                Active Portfolio
              </Badge>
              <Button className="bg-[#1B5E45] hover:bg-[#246B4F] text-white size-sm sm:size-default">
                <Plus className="h-4 w-4 mr-1.5" /> <span className="hidden sm:inline">Add Unit</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
          
          {/* --- Hero Section --- */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Building Image Card */}
            <div className="lg:col-span-2 relative h-64 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-white">
              <img 
                src={building.image} 
                alt={building.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <Badge className="bg-[#3DBE7A] text-white border-none">
                    Built in {building.yearBuilt}
                  </Badge>
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    Premium Residency
                  </h2>
                </div>
                <div className="flex gap-2">
                  {building.amenities?.map((a, i) => (
                    <Badge key={i} variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white text-[10px]">
                      {a}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats Column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <StatCard 
                label="Occupancy Rate" 
                value={`${occupancyRate}%`} 
                icon={Users} 
                color="#1B5E45" 
                bgColor="#E8F5EE"
                subtext={`${building.occupiedUnits} of ${building.units} units occupied`}
              />
              <StatCard 
                label="Monthly Income" 
                value={`KSh ${totalMonthlyRent.toLocaleString()}`} 
                icon={TrendingUp} 
                color="#3DBE7A" 
                bgColor="#E8F5EE"
                subtext="Projected monthly gross"
              />
              <StatCard 
                label="Active Issues" 
                value={buildingComplaints.length} 
                icon={AlertCircle} 
                color="#E11D48" 
                bgColor="#FFF1F2"
                subtext="Pending maintenance tickets"
                isAlert={buildingComplaints.length > 0}
              />
            </div>
          </section>

          {/* --- Detail Tabs --- */}
          <section>
            <Tabs defaultValue="units" className="space-y-6" onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <TabsList className="bg-[#F4F4F0] p-1 rounded-xl w-full sm:w-auto">
                  <TabsTrigger value="units" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#1B5E45] px-6">Units</TabsTrigger>
                  <TabsTrigger value="tenants" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#1B5E45] px-6">Tenants</TabsTrigger>
                  <TabsTrigger value="finances" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#1B5E45] px-6">Finances</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                    <Input 
                      placeholder={`Search ${activeTab}...`} 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 h-10 border-[#E8F5EE] bg-white text-sm"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="h-10 w-10 border-[#E8F5EE] hover:bg-[#E8F5EE]">
                    <Filter className="h-4 w-4 text-[#1B5E45]" />
                  </Button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <TabsContent value="units" className="mt-0">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {buildingUnits.filter(u => u.number.toLowerCase().includes(search.toLowerCase())).map(unit => (
                      <Card key={unit.id} className="border-[#E8F5EE] bg-white group hover:shadow-lg transition-all">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center",
                                unit.status === "occupied" ? "bg-[#E8F5EE] text-[#1B5E45]" : "bg-[#F4F4F0] text-[#6B7280]"
                              )}>
                                <Home className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-bold text-[#1A1A1A]">Unit {unit.number}</h4>
                                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider">{unit.type}</p>
                              </div>
                            </div>
                            <Badge className={cn(
                              "border-none",
                              unit.status === "occupied" ? "bg-[#E8F5EE] text-[#1B5E45]" : "bg-[#FFF1F2] text-[#E11D48]"
                            )}>
                              {unit.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-[#F4F4F0]">
                            <div>
                              <p className="text-[10px] text-[#6B7280] uppercase">Monthly Rent</p>
                              <p className="font-bold text-[#1B5E45]">KSh {unit.rent.toLocaleString()}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-[#1B5E45] hover:bg-[#E8F5EE] text-xs font-semibold">
                              Manage Unit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="tenants" className="mt-0">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {buildingTenants.map(tenant => (
                      <Card key={tenant.id} className="border-[#E8F5EE] bg-white overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row md:items-center">
                            <div className="p-6 flex items-center gap-4 flex-1">
                              <img src={`https://i.pravatar.cc/100?u=${tenant.id}`} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-[#E8F5EE]" />
                              <div>
                                <h4 className="font-bold text-[#1A1A1A]">{tenant.name}</h4>
                                <p className="text-xs text-[#6B7280]">Resident since {new Date(tenant.moveInDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="px-6 py-4 md:py-0 border-t md:border-t-0 md:border-l border-[#F4F4F0] flex flex-wrap gap-4 items-center">
                              <div className="min-w-[120px]">
                                <p className="text-[10px] text-[#6B7280] uppercase mb-0.5">Contact</p>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3 text-[#1B5E45]" />
                                  <span className="text-xs font-medium">{tenant.phone}</span>
                                </div>
                              </div>
                              <div className="min-w-[140px]">
                                <p className="text-[10px] text-[#6B7280] uppercase mb-0.5">Email</p>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-3 w-3 text-[#1B5E45]" />
                                  <span className="text-xs font-medium truncate max-w-[120px]">{tenant.email}</span>
                                </div>
                              </div>
                              <div className="min-w-[100px]">
                                <p className="text-[10px] text-[#6B7280] uppercase mb-0.5">Arrears</p>
                                <span className={cn(
                                  "text-xs font-bold",
                                  tenant.arrears > 0 ? "text-[#E11D48]" : "text-[#1B5E45]"
                                )}>KSh {tenant.arrears.toLocaleString()}</span>
                              </div>
                              <Button variant="outline" size="sm" className="border-[#E8F5EE] text-[#1B5E45] hover:bg-[#E8F5EE]">
                                View Profile
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="finances" className="mt-0">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Card className="border-[#E8F5EE] bg-white overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead>
                            <tr className="bg-[#FAFAF8] border-b border-[#E8F5EE]">
                              <th className="px-6 py-4 text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Tenant</th>
                              <th className="px-6 py-4 text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Unit</th>
                              <th className="px-6 py-4 text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Month</th>
                              <th className="px-6 py-4 text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Amount</th>
                              <th className="px-6 py-4 text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Date</th>
                              <th className="px-6 py-4 text-[10px] font-bold text-[#6B7280] uppercase tracking-wider text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#F4F4F0]">
                            {buildingPayments.map(payment => (
                              <tr key={payment.id} className="hover:bg-[#FAFAF8] transition-colors">
                                <td className="px-6 py-4 text-sm font-semibold text-[#1A1A1A]">{payment.tenantName}</td>
                                <td className="px-6 py-4 text-sm text-[#6B7280]">{mockUnits.find(u => u.id === payment.unitId)?.number}</td>
                                <td className="px-6 py-4 text-sm text-[#6B7280]">{payment.month}</td>
                                <td className="px-6 py-4 text-sm font-bold text-[#1B5E45]">KSh {payment.amount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-sm text-[#6B7280]">{new Date(payment.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right">
                                  <Badge className={cn(
                                    "border-none",
                                    payment.status === "completed" ? "bg-[#E8F5EE] text-[#1B5E45]" : "bg-[#FFF7ED] text-[#EA580C]"
                                  )}>
                                    {payment.status}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </section>
        </div>
      </div>
    </LandlordLayout>
  );
}

function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  color, 
  bgColor, 
  subtext,
  isAlert = false 
}: { 
  label: string; 
  value: string | number; 
  icon: any; 
  color: string; 
  bgColor: string;
  subtext?: string;
  isAlert?: boolean;
}) {
  return (
    <Card className={cn(
      "border-[#E8F5EE] bg-white hover:shadow-md transition-shadow",
      isAlert && "border-rose-100"
    )}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: bgColor, color: color }}
          >
            <Icon className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-2xl font-bold text-[#1A1A1A] truncate">{value}</h4>
            <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">{label}</p>
          </div>
        </div>
        {subtext && (
          <p className="mt-3 text-xs text-[#9CA3AF] border-t border-[#F4F4F0] pt-2">
            {subtext}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
