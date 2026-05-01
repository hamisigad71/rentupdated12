"use client";

import React, { useState } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BuildingLedgerModal from "@/components/BuildingLedgerModal";
import {
  mockBuildings,
  mockTenants,
  Building,
} from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Building2,
  MapPin,
  Search,
  Camera,
  Users,
  TrendingUp,
  ChevronRight,
  Home,
  Target,
  ArrowUpRight,
  Wifi,
  Car,
  Dumbbell,
  Shield,
  Zap,
  X,
  FileText,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
 
const CustomLandlordIcon = ({ className }: { className?: string }) => (
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
)

const CustomHomeIcon = ({ className }: { className?: string }) => (
  <div 
    className={cn("bg-current", className)}
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

/* == Animated Occupancy Progress ========================================== */
function OccupancyProgress({ percentage }: { percentage: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className=" text-[#6B7280]">Occupancy</span>
        <span className=" text-[#1B5E45]">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2 bg-[#F4F4F0]" />
    </div>
  );
}

/* == Form Field Component ================================================= */
function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-[#4B5563] uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

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

export default function BuildingsPage() {
  const router = useRouter();
  const [buildings, setBuildings] = useState(mockBuildings);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLedger, setShowLedger] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    propertyType: "Residential Complex",
    units: "",
    yearBuilt: new Date().getFullYear().toString(),
    floors: "",
    amenities: [] as string[],
    description: "",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const toggleAmenity = (amenity: string) =>
    setFormData((p) => ({
      ...p,
      amenities: p.amenities.includes(amenity)
        ? p.amenities.filter((x) => x !== amenity)
        : [...p.amenities, amenity],
    }));

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      setBuildings((p) => [
        {
          id: `bld-${Date.now()}`,
          name: formData.name || "Unnamed Property",
          address: formData.address || "—",
          units: parseInt(formData.units) || 0,
          occupiedUnits: 0,
          image: formData.image,
          yearBuilt: parseInt(formData.yearBuilt),
          description: formData.description,
          amenities: formData.amenities,
        },
        ...p,
      ]);
      setIsAdding(false);
      setShowAddModal(false);
      setFormData({
        name: "",
        address: "",
        propertyType: "Residential Complex",
        units: "",
        yearBuilt: new Date().getFullYear().toString(),
        floors: "",
        amenities: [],
        description: "",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
      });
    }, 1200);
  };

  /* Property Statistics */
  const totalUnits = buildings.reduce((s, b) => s + b.units, 0);
  const totalOccupied = buildings.reduce((s, b) => s + b.occupiedUnits, 0);
  const totalRevenue = mockTenants.reduce((s, t) => s + t.rent, 0);
  const PropertyOccupancy = totalUnits ? Math.round((totalOccupied / totalUnits) * 100) : 0;

  const filteredBuildings = buildings.filter((b) =>
    `${b.name} ${b.address}`.toLowerCase().includes(search.toLowerCase())
  );

  const AMENITY_OPTIONS = [
    { name: "High-Speed WiFi", icon: Wifi },
    { name: "Parking", icon: Car },
    { name: "Gym", icon: Dumbbell },
    { name: "24/7 Security", icon: Shield },
    { name: "Backup Power", icon: Zap },
    { name: "CCTV", icon: Camera },
  ];

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
                <CustomLandlordIcon className="w-3 h-3 mr-1" />
                Property Management
              </Badge>
              <h1 className="text-xl sm:text-2xl lg:text-3xl text-[#1A1A1A]">
                Properties
              </h1>
              <p className="text-sm text-[#6B7280]">
                Manage your real estate Property
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                <Input
                  placeholder="Search properties..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-11 border-[#E8F5EE] bg-white focus:border-[#1B5E45] w-full sm:w-64"
                />
              </div>
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-[#1B5E45] hover:bg-[#246B4F] text-white h-11 shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>

          {/* Property KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <OverviewCard 
              label="Total Properties" 
              value={buildings.length}
              variant="dark"
              icon={Building2}
              trend="+2"
              subtext="Added recently"
            />
            <OverviewCard 
              label="Total Units" 
              value={totalUnits}
              trend="+15"
              subtext="Recently mapped"
              icon={Home}
            />
            <OverviewCard 
              label="Occupancy Rate" 
              value={
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl text-foreground">{PropertyOccupancy}</span>
                  <span className="text-lg font-bold text-muted-foreground/60">%</span>
                </div>
              }
              trend="+4.5%"
              subtext="vs last month"
              icon={Target}
            />
            <OverviewCard 
              label="Monthly Revenue" 
              value={
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-bold text-muted-foreground mr-1">KES</span>
                  <span className="text-2xl sm:text-3xl">{(totalRevenue / 1000).toFixed(0)}K</span>
                </div>
              }
              trend="+12%"
              subtext="Projected"
              icon={BarChart3}
            />
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredBuildings.map((building, i) => {
                const occupancyRate = building.units > 0
                  ? Math.round((building.occupiedUnits / building.units) * 100)
                  : 0;
                
                return (
                  <motion.div
                    key={building.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="rounded-[24px] sm:rounded-[32px] border-black/[0.04] bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                      {/* Property Image */}
                      <div className="relative h-56 overflow-hidden bg-[#F4F4F0]">
                        <img
                          src={building.image}
                          alt={building.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Occupancy Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/95 text-[#1B5E45] border-white/20 backdrop-blur-md shadow-sm font-bold tracking-tight px-3 py-1">
                            {occupancyRate}% Occupied
                          </Badge>
                        </div>

                        {/* Location */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white text-xl font-extrabold tracking-tight mb-1 group-hover:text-emerald-300 transition-colors">
                            {building.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-white/80 text-xs font-medium">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="truncate">{building.address}</span>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-5 sm:p-6 space-y-5">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: "Units", value: building.units },
                            { label: "Occupied", value: building.occupiedUnits },
                            { label: "Vacant", value: building.units - building.occupiedUnits },
                          ].map((stat, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-2xl bg-[#F8F9F7] border border-black/[0.03] text-center"
                            >
                              <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{stat.label}</p>
                              <p className="text-lg font-extrabold text-[#1A1A1A] tracking-tight">{stat.value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Occupancy Progress */}
                        <OccupancyProgress percentage={occupancyRate} />

                        <Separator className="bg-black/[0.02]" />

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button
                            onClick={() => router.push(`/landlord/buildings/${building.id}`)}
                            className="flex-1 bg-gradient-to-br from-[#0c4a34] to-[#062b1e] hover:from-[#1B5E45] hover:to-[#0c4a34] text-white rounded-xl shadow-md font-bold tracking-tight h-11"
                          >
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1.5 opacity-70" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="rounded-xl border-black/[0.06] hover:bg-[#E8F5EE] hover:text-[#1B5E45] shadow-sm h-11 w-11"
                            onClick={() => {
                              setSelectedBuilding(building);
                              setShowLedger(true);
                            }}
                          >
                            <FileText className="w-4 h-4 text-[#1B5E45]" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Add Property Card */}
            <motion.div
              onClick={() => setShowAddModal(true)}
              whileHover={{ y: -4 }}
              className="cursor-pointer"
            >
              <Card className="rounded-[24px] sm:rounded-[32px] border-2 border-dashed border-black/[0.08] bg-transparent hover:bg-black/[0.02] hover:border-[#1B5E45]/30 transition-all duration-300 h-full min-h-[400px]">
                <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-white shadow-sm border border-black/[0.04] flex items-center justify-center mb-6 hover:scale-110 transition-transform duration-300">
                    <Plus className="w-8 h-8 text-[#1B5E45]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A] tracking-tight mb-2">
                    Add New Property
                  </h3>
                  <p className="text-sm font-medium text-[#6B7280]">
                    Register a new building to your Property
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add Building Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-white">
          <div className="flex flex-col h-full">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#E8F5EE] bg-[#FAFAF8]">
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-xl text-[#1A1A1A] mb-1">
                    Add New Property
                  </DialogTitle>
                  <p className="text-sm text-[#6B7280]">
                    Register a new building to your Property
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddModal(false)}
                  className="hover:bg-[#E8F5EE]"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Column */}
                <div className="space-y-5">
                  <FormField label="Property Name">
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInput}
                      placeholder="e.g., Skyline Towers"
                      className="h-11 border-[#E8F5EE] bg-white"
                    />
                  </FormField>

                  <FormField label="Property Type">
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInput}
                      className="flex h-11 w-full rounded-lg border border-[#E8F5EE] bg-white px-3 py-2 text-sm outline-none focus:border-[#1B5E45] focus:ring-1 focus:ring-[#1B5E45]"
                    >
                      <option>Residential Complex</option>
                      <option>Commercial Center</option>
                      <option>Mixed Use High-Rise</option>
                    </select>
                  </FormField>

                  <FormField label="Address">
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInput}
                      placeholder="Street Address, City"
                      className="h-11 border-[#E8F5EE] bg-white"
                    />
                  </FormField>

                  <FormField label="Property Details">
                    <div className="grid grid-cols-3 gap-3">
                      <Input
                        name="units"
                        type="number"
                        placeholder="Units"
                        value={formData.units}
                        onChange={handleInput}
                        className="h-11 border-[#E8F5EE] bg-white"
                      />
                      <Input
                        name="floors"
                        type="number"
                        placeholder="Floors"
                        value={formData.floors}
                        onChange={handleInput}
                        className="h-11 border-[#E8F5EE] bg-white"
                      />
                      <Input
                        name="yearBuilt"
                        type="number"
                        placeholder="Year"
                        value={formData.yearBuilt}
                        onChange={handleInput}
                        className="h-11 border-[#E8F5EE] bg-white"
                      />
                    </div>
                  </FormField>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  <FormField label="Description">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInput}
                      placeholder="Brief description of the property..."
                      className="w-full min-h-[120px] rounded-lg border border-[#E8F5EE] bg-white p-3 text-sm outline-none focus:border-[#1B5E45] focus:ring-1 focus:ring-[#1B5E45] resize-none"
                    />
                  </FormField>

                  <FormField label="Amenities">
                    <div className="grid grid-cols-2 gap-2">
                      {AMENITY_OPTIONS.map(({ name, icon: Icon }) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => toggleAmenity(name)}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-lg border text-sm  transition-all",
                            formData.amenities.includes(name)
                              ? "bg-[#E8F5EE] border-[#1B5E45]/30 text-[#1B5E45]"
                              : "bg-white border-[#E8F5EE] text-[#6B7280] hover:border-[#1B5E45]/20"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-xs truncate">{name}</span>
                        </button>
                      ))}
                    </div>
                  </FormField>

                  <FormField label="Property Image">
                    <div className="relative h-32 rounded-lg border-2 border-dashed border-[#E8F5EE] bg-[#FAFAF8] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#1B5E45]/30 transition-all group">
                      <Camera className="h-8 w-8 text-[#6B7280] group-hover:text-[#1B5E45] transition-colors" />
                      <p className="text-xs text-[#6B7280] group-hover:text-[#1B5E45] transition-colors">
                        Click to upload image
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </FormField>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#E8F5EE] bg-[#FAFAF8] flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
                className="flex-1 h-11 border-[#E8F5EE] hover:bg-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAdd}
                disabled={isAdding}
                className="flex-1 h-11 bg-[#1B5E45] hover:bg-[#246B4F] text-white "
              >
                {isAdding ? "Adding Property..." : "Add Property"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Building Ledger Modal */}
      <BuildingLedgerModal
        isOpen={showLedger}
        onClose={() => setShowLedger(false)}
        building={selectedBuilding}
      />
    </LandlordLayout>
  );
}