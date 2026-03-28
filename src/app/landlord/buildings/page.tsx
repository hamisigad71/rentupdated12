"use client";

import React, { useState, useRef } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BuildingLedgerModal from "@/components/BuildingLedgerModal";
import { mockBuildings, mockUnits, mockTenants, Building } from "@/data/mockData";
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
  DollarSign, 
  Layers,
  Wifi, 
  Car, 
  Dumbbell, 
  Zap, 
  Shield, 
  X,
  Target,
  ArrowUpRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* == Animated Occupancy Bar =============================================== */
function OccBar({ pct }: { pct: number }) {
  return (
    <div className="h-1.5 rounded-full overflow-hidden bg-foreground/10">
      <motion.div 
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} 
      />
    </div>
  );
}

/* == Form Field ============================================================== */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase  text-muted-foreground/60 leading-none">
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
    name: "", address: "", propertyType: "Residential Complex",
    units: "", yearBuilt: new Date().getFullYear().toString(),
    floors: "", amenities: [] as string[], description: "",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const toggleAmenity = (a: string) =>
    setFormData(p => ({
      ...p,
      amenities: p.amenities.includes(a) ? p.amenities.filter(x => x !== a) : [...p.amenities, a],
    }));

  const handleAdd = () => {
    setIsAdding(true);
    // Simulate API call
    setTimeout(() => {
      setBuildings(p => [{
        id: `bld-${Date.now()}`,
        name: formData.name || "Unnamed Property",
        address: formData.address || "—",
        units: parseInt(formData.units) || 0,
        occupiedUnits: 0,
        image: formData.image,
        yearBuilt: parseInt(formData.yearBuilt),
        description: formData.description,
        amenities: formData.amenities,
      }, ...p]);
      setIsAdding(false);
      setShowAddModal(false);
      setFormData({ name:"",address:"",propertyType:"Residential Complex",units:"",yearBuilt:new Date().getFullYear().toString(),floors:"",amenities:[],description:"",image:"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80" });
    }, 1200);
  };

  /* Summary Stats */
  const totalUnits = buildings.reduce((s, b) => s + b.units, 0);
  const totalOccupied = buildings.reduce((s, b) => s + b.occupiedUnits, 0);
  const totalRevenue = mockTenants.reduce((s, t) => s + t.rent, 0);
  const portfolioOcc = totalUnits ? Math.round((totalOccupied / totalUnits) * 100) : 0;

  const filtered = buildings.filter(b =>
    `${b.name} ${b.address}`.toLowerCase().includes(search.toLowerCase())
  );

  const AMENITY_ICONS: Record<string, React.ReactNode> = {
    "High-Speed WiFi": <Wifi className="w-4 h-4" />,
    "Parking": <Car className="w-4 h-4" />,
    "Gym": <Dumbbell className="w-4 h-4" />,
    "24/7 Security": <Shield className="w-4 h-4" />,
    "Backup Power": <Zap className="w-4 h-4" />,
    "CCTV": <Camera className="w-4 h-4" />,
  };

  return (
    <LandlordLayout>
      <div className="flex flex-col gap-8 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <Badge variant="outline" className="rounded-xl border-primary/20 bg-primary/5 text-primary uppercase text-xs font-bold  px-3 py-1 mb-2">
              Portfolio Assets
            </Badge>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-none uppercase">
              Buildings & <span className="text-primary ">Properties</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative group/search">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within/search:text-primary transition-colors" />
               <Input 
                 placeholder="Locate Asset..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="pl-11 pr-4 py-2.5 h-12 rounded-xl text-xs font-bold border-foreground/5 bg-foreground/[0.02] w-32 group-focus-within/search:border-primary/20"
               />
             </div>
             <Button 
               onClick={() => setShowAddModal(true)}
               className="h-12 rounded-xl px-6 bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all font-bold uppercase text-xs "
             >
               <Plus className="h-4 w-4 mr-2" /> Add Building
             </Button>
          </div>
        </div>

        {/* Global KPI Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Assets", val: buildings.length, icon: Building2, sub: "Managed Buildings" },
            { label: "Portfolio Yield", val: `KSh ${(totalRevenue / 1000).toFixed(1)}K`, icon: TrendingUp, sub: "Net Monthly Rev" },
            { label: "Occupancy Rate", val: `${portfolioOcc}%`, icon: Target, sub: `${totalOccupied}/${totalUnits} Units` },
            { label: "Global Units", val: totalUnits, icon: Home, sub: "Total Inventory" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-3xl border border-foreground/5 bg-background shadow-xl hover:border-primary/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="p-1 rounded-lg bg-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold tracking-tight mb-1 uppercase leading-none">{stat.val}</p>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase  text-muted-foreground/60">{stat.label}</span>
                <span className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">{stat.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((building, i) => {
              const occ = building.units > 0 ? Math.round((building.occupiedUnits / building.units) * 100) : 0;
              return (
                <motion.div
                  key={building.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col rounded-2xl border border-foreground/5 bg-background shadow-2xl overflow-hidden hover:border-primary/20 transition-all"
                >
                  {/* Property Visual */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={building.image} 
                      alt={building.name}
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Occ Status */}
                    <div className="absolute bottom-6 left-6 right-6 space-y-3">
                      <div className="flex items-end justify-between text-white">
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold uppercase  opacity-50 leading-none">Yield Index</p>
                          <p className="text-2xl font-bold tracking-tight leading-none">{occ}%</p>
                        </div>
                        <Badge className="bg-primary/20 backdrop-blur-md border-primary/30 text-primary text-[8px] font-bold uppercase  rounded-full h-6 border">
                           Live Status
                        </Badge>
                      </div>
                      <OccBar pct={occ} />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col flex-1 gap-6">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-muted-foreground/40 uppercase  flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-primary" /> {building.address}
                      </p>
                      <h3 className="text-xl font-bold tracking-tight uppercase group-hover:text-primary transition-colors leading-none">
                        {building.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                       {[
                         { l: "Units", v: building.units },
                         { l: "Occ.", v: building.occupiedUnits },
                         { l: "Vac.", v: building.units - building.occupiedUnits },
                         { l: "Est.", v: building.yearBuilt },
                       ].map((s, idx) => (
                         <div key={idx} className="p-2.5 rounded-xl bg-foreground/[0.02] border border-foreground/5 text-center">
                            <p className="text-[8px] font-bold uppercase  text-muted-foreground/40 mb-1">{s.l}</p>
                            <p className="text-sm font-bold tracking-tight">{s.v}</p>
                         </div>
                       ))}
                    </div>

                    <div className="flex items-center gap-3 mt-auto">
                       <Button 
                         onClick={() => router.push(`/landlord/buildings/${building.id}`)}
                         className="flex-1 h-12 rounded-xl bg-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all font-bold uppercase text-xs "
                       >
                         Control Center <ChevronRight className="h-4 w-4 ml-1.5" />
                       </Button>
                       <Button 
                         variant="outline" 
                         size="icon" 
                         className="h-12 w-12 rounded-xl border-foreground/5 bg-foreground/[0.02] hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all"
                         onClick={() => { setSelectedBuilding(building); setShowLedger(true); }}
                       >
                         <Layers className="h-5 w-5" />
                       </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {/* Add Asset Trigger Card */}
          <motion.div
            onClick={() => setShowAddModal(true)}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-foreground/10 bg-foreground/[0.02] cursor-pointer hover:border-primary/40 hover:bg-primary/[0.02] transition-all gap-6 text-center group"
          >
            <div className="h-12 w-12 rounded-[1.8rem] bg-background border border-foreground/5 flex items-center justify-center text-muted-foreground/20 group-hover:text-primary group-hover:border-primary/20 transition-all shadow-xl">
               <Plus className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold uppercase leading-none tracking-tight">Expand Portfolio</p>
              <p className="text-xs font-bold text-muted-foreground/40 uppercase ">Register New Property Asset</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Building Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-[1000px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl bg-background h-[90vh]">
          <div className="flex flex-col h-full overflow-hidden">
            {/* Modal Header Overlay */}
            <div className="relative h-44 shrink-0 bg-[#0F0F0F] p-5 flex flex-col justify-center">
               <div className="absolute inset-0 bg-primary/10 blur-[80px] -m-20" />
               <div className="relative z-10 space-y-2">
                 <Badge className="bg-primary/20 border-primary/30 text-primary border rounded-lg text-[9px] font-bold uppercase ">Property Registration</Badge>
                 <h2 className="text-xl font-bold tracking-tight text-white uppercase">Asset <span className="text-primary ">Onboarding</span></h2>
               </div>
               <Button 
                 variant="ghost" 
                 size="icon" 
                 className="absolute top-5 right-10 h-10 w-10 rounded-full text-white/40 hover:bg-white/10 hover:text-white"
                 onClick={() => setShowAddModal(false)}
               >
                 <X className="h-5 w-5" />
               </Button>
            </div>

            {/* Modal Form Content */}
            <div className="flex-1 overflow-auto p-5 no-scrollbar space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 <div className="space-y-6">
                    <Field label="Building Nomenclature">
                      <Input name="name" value={formData.name} onChange={handleInput} placeholder="e.g. SKYLINE TOWERS" className="h-12 rounded-xl bg-foreground/[0.02]" />
                    </Field>
                    <Field label="Property Categorization">
                       <select 
                         name="propertyType" 
                         value={formData.propertyType} 
                         onChange={handleInput}
                         className="flex h-12 w-full rounded-xl border border-foreground/5 bg-foreground/[0.02] px-3 py-2 text-sm font-bold uppercase  outline-none focus:ring-1 focus:ring-primary/20"
                       >
                          <option>Residential Complex</option>
                          <option>Commercial Center</option>
                          <option>Mixed Use High-Rise</option>
                       </select>
                    </Field>
                    <Field label="Structural Parameters">
                       <div className="grid grid-cols-3 gap-4">
                          <Input name="units" type="number" placeholder="Units" value={formData.units} onChange={handleInput} className="h-12 rounded-xl bg-foreground/[0.02]" />
                          <Input name="floors" type="number" placeholder="Floors" value={formData.floors} onChange={handleInput} className="h-12 rounded-xl bg-foreground/[0.02]" />
                          <Input name="yearBuilt" type="number" placeholder="Year" value={formData.yearBuilt} onChange={handleInput} className="h-12 rounded-xl bg-foreground/[0.02]" />
                       </div>
                    </Field>
                    <Field label="Geographic Coordinates">
                       <Input name="address" value={formData.address} onChange={handleInput} placeholder="Street Address, District" className="h-12 rounded-xl bg-foreground/[0.02]" />
                    </Field>
                 </div>

                 <div className="space-y-6">
                    <Field label="Asset Description">
                       <textarea 
                         name="description" 
                         value={formData.description} 
                         onChange={handleInput}
                         placeholder="Detailed brief of property features and market positioning..."
                         className="w-full min-h-[120px] rounded-2xl border border-foreground/5 bg-foreground/[0.02] p-4 text-xs font-bold leading-relaxed outline-none focus:ring-1 focus:ring-primary/20"
                       />
                    </Field>
                    
                    <Field label="Integrated Amenities">
                       <div className="grid grid-cols-3 gap-2">
                          {Object.entries(AMENITY_ICONS).map(([name, icon]) => (
                            <button
                              key={name}
                              type="button"
                              onClick={() => toggleAmenity(name)}
                              className={cn(
                                "flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-1.5",
                                formData.amenities.includes(name) ? "bg-primary/5 border-primary/30 text-primary" : "bg-foreground/[0.02] border-foreground/5 text-muted-foreground/40 hover:border-foreground/20"
                              )}
                            >
                               {icon}
                               <span className="text-[7px] font-bold uppercase  truncate w-full text-center">{name}</span>
                            </button>
                          ))}
                       </div>
                    </Field>

                    <Field label="Visual Identity">
                       <div className="relative h-32 rounded-2xl border-2 border-dashed border-foreground/10 bg-foreground/[0.02] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/20 transition-all group/upload">
                          <Camera className="h-6 w-6 text-muted-foreground/20 group-hover:text-primary transition-colors" />
                          <p className="text-[9px] font-bold uppercase  text-muted-foreground/30 group-hover:text-primary transition-colors">Capture Asset Photo</p>
                          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                       </div>
                    </Field>
                 </div>
               </div>
            </div>

            {/* Modal Actions */}
            <div className="p-8 border-t border-foreground/5 bg-foreground/[0.02] flex gap-4 shrink-0">
               <Button 
                 variant="ghost" 
                 className="flex-1 h-12 rounded-xl text-xs font-bold uppercase "
                 onClick={() => setShowAddModal(false)}
               >
                 Cancel Protocol
               </Button>
               <Button 
                 onClick={handleAdd}
                 disabled={isAdding}
                 className="flex-1 h-12 rounded-xl bg-primary shadow-lg shadow-primary/20 hover:shadow-xl transition-all font-bold uppercase text-xs "
               >
                 {isAdding ? "Finalizing..." : "Authorize Onboarding"}
               </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BuildingLedgerModal 
        isOpen={showLedger}
        onClose={() => setShowLedger(false)}
        building={selectedBuilding}
      />
    </LandlordLayout>
  );
}
