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
                <Building2 className="w-3 h-3 mr-1" />
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Properties",
                value: buildings.length,
                icon: Building2,
                color: "#1B5E45",
                bgColor: "#E8F5EE",
              },
              {
                label: "Total Units",
                value: totalUnits,
                icon: Home,
                color: "#3DBE7A",
                bgColor: "#E8F5EE",
              },
              {
                label: "Occupancy Rate",
                value: `${PropertyOccupancy}%`,
                icon: Target,
                color: "#1B5E45",
                bgColor: "#E8F5EE",
              },
              {
                label: "Monthly Revenue",
                value: `KSh ${(totalRevenue / 1000).toFixed(0)}K`,
                icon: TrendingUp,
                color: "#3DBE7A",
                bgColor: "#E8F5EE",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-[#E8F5EE] bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: stat.bgColor, color: stat.color }}
                      >
                        <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] sm:text-xs text-[#6B7280]">{stat.label}</p>
                      <h3 className="text-lg sm:text-2xl text-[#1A1A1A]">{stat.value}</h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
                    <Card className="border-[#E8F5EE] bg-white hover:shadow-lg transition-all overflow-hidden group">
                      {/* Property Image */}
                      <div className="relative h-48 overflow-hidden bg-[#F4F4F0]">
                        <img
                          src={building.image}
                          alt={building.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        
                        {/* Occupancy Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 text-[#1B5E45] border-white/20 backdrop-blur-sm hover:bg-white">
                            {occupancyRate}% Occupied
                          </Badge>
                        </div>

                        {/* Location */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-white text-sm">
                            <MapPin className="w-4 h-4" />
                            <span className=" truncate">{building.address}</span>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6 space-y-5">
                        {/* Property Name */}
                        <div>
                          <h3 className="text-lg text-[#1A1A1A] mb-1 group-hover:text-[#1B5E45] transition-colors">
                            {building.name}
                          </h3>
                          <p className="text-xs text-[#6B7280]">
                            Built {building.yearBuilt}
                          </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: "Units", value: building.units },
                            { label: "Occupied", value: building.occupiedUnits },
                            { label: "Vacant", value: building.units - building.occupiedUnits },
                          ].map((stat, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E8F5EE] text-center"
                            >
                              <p className="text-xs text-[#6B7280] mb-1">{stat.label}</p>
                              <p className="text-lg text-[#1A1A1A]">{stat.value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Occupancy Progress */}
                        <OccupancyProgress percentage={occupancyRate} />

                        <Separator className="bg-[#F4F4F0]" />

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button
                            onClick={() => router.push(`/landlord/buildings/${building.id}`)}
                            className="flex-1 bg-[#1B5E45] hover:bg-[#246B4F] text-white "
                          >
                            View Details
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-[#E8F5EE] hover:bg-[#E8F5EE] hover:border-[#1B5E45]/20"
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
              <Card className="border-2 border-dashed border-[#E8F5EE] bg-[#FAFAF8] hover:border-[#1B5E45]/30 hover:bg-[#E8F5EE] transition-all h-full min-h-[400px]">
                <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#E8F5EE] flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-[#1B5E45]" />
                  </div>
                  <h3 className="text-lg text-[#1A1A1A] mb-2">
                    Add New Property
                  </h3>
                  <p className="text-sm text-[#6B7280]">
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