"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LandlordLayout from "@/components/LandlordLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { mockUnits, mockBuildings, mockTenants, Unit } from "@/data/mockData";
import { getAvatarUrl } from "@/utils/avatarUtils";
import {
  Search,
  Filter,
  Layers,
  LayoutGrid,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  MapPin,
  Building2,
  MoreHorizontal,
  Users,
  Mail,
  Phone,
  ShieldCheck,
  Zap,
  TrendingUp,
  X,
  Plus,
  Home,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function UnitsPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "occupied" | "vacant"
  >("all");
  const [search, setSearch] = useState("");

  const filteredUnits = mockUnits.filter((u) => {
    const matchesStatus = filterStatus === "all" || u.status === filterStatus;
    const matchesSearch = u.number.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getBuilding = (buildingId: string) =>
    mockBuildings.find((b) => b.id === buildingId);

  const getTenant = (unitId: string) =>
    mockTenants.find((t) => t.unitId === unitId);

  const stats = {
    total: mockUnits.length,
    occupied: mockUnits.filter((u) => u.status === "occupied").length,
    vacant: mockUnits.filter((u) => u.status === "vacant").length,
  };

  return (
    <LandlordLayout>
      <div className="flex flex-col gap-8 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-foreground/5 pb-8">
          <div className="space-y-1">
            <Badge
              variant="outline"
              className="rounded-xl border-primary/20 bg-primary/5 text-primary uppercase text-xs font-bold  px-3 py-1 mb-2 leading-none"
            >
              <Layers className="h-3 w-3 mr-1.5 inline" /> Dynamic Inventory
              Control
            </Badge>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-none uppercase text-foreground">
              Unit <span className="text-primary ">Ledger</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group/search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 group-focus-within/search:text-primary transition-colors" />
              <Input
                placeholder="Locate Unit No..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 pr-4 py-2.5 h-12 rounded-xl text-xs font-bold border-foreground/5 bg-foreground/[0.02] w-32 group-focus-within/search:border-primary/20"
              />
            </div>
            <Button className="h-12 rounded-xl px-6 bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all font-bold uppercase text-xs ">
              <Plus className="h-4 w-4 mr-2" /> Add Asset
            </Button>
          </div>
        </div>

        {/* Filters and Yield Overview */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex p-1.5 rounded-2xl bg-foreground/[0.02] border border-foreground/5">
            {[
              { id: "all", label: `Inventory (${stats.total})` },
              { id: "occupied", label: `Yielding (${stats.occupied})` },
              { id: "vacant", label: `Vacancies (${stats.vacant})` },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id as any)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-xs font-bold uppercase  transition-all",
                  filterStatus === f.id
                    ? "bg-background text-primary shadow-xl"
                    : "text-muted-foreground/60 hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 text-xs font-bold text-muted-foreground/40 uppercase ">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Strategic Asset</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-destructive" />
              <span>Action Required</span>
            </div>
          </div>
        </div>

        {/* Architectural Ledger Table */}
        <div className="rounded-2xl border border-foreground/5 bg-background shadow-2xl overflow-hidden">
          <Table>
            <TableHeader className="bg-foreground/[0.01] border-b border-foreground/5">
              <TableRow>
                <TableHead className="px-8 h-12 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                  Unit Code
                </TableHead>
                <TableHead className="px-8 h-12 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                  Asset Location
                </TableHead>
                <TableHead className="px-8 h-12 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                  Category
                </TableHead>
                <TableHead className="px-8 h-12 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-center">
                  Protocol
                </TableHead>
                <TableHead className="px-8 h-12 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                  Asset Value
                </TableHead>
                <TableHead className="px-8 h-12 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-right">
                  Horizon
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredUnits.length > 0 ? (
                  filteredUnits.map((unit, idx) => (
                    <TableRow
                      key={unit.id}
                      onClick={() => {
                        setSelectedUnit(unit);
                        setShowModal(true);
                      }}
                      className="group cursor-pointer hover:bg-foreground/[0.01] transition-colors border-b border-foreground/5 last:border-0"
                    >
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-1 rounded-full bg-foreground/10 group-hover:bg-primary transition-colors" />
                          <div className="flex flex-col">
                            <span className="text-base font-bold tracking-tight uppercase">
                              {unit.number}
                            </span>
                            <span className="text-xs font-bold text-muted-foreground/40 uppercase ">
                              REF: 0x{unit.id.split("-").pop()}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold uppercase tracking-tight leading-none text-foreground/80">
                            {getBuilding(unit.buildingId)?.name}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/40 uppercase ">
                            <MapPin className="h-2.5 w-2.5 text-primary" />
                            <span className="truncate max-w-[150px]">
                              {
                                getBuilding(unit.buildingId)?.address.split(
                                  ",",
                                )[0]
                              }
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground/60">
                          {unit.type}
                        </span>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex justify-center">
                          <Badge
                            className={cn(
                              "rounded-full px-4 py-1 text-[9px] font-bold uppercase  border",
                              unit.status === "occupied"
                                ? "bg-primary/5 text-primary border-primary/20"
                                : "bg-destructive/5 text-destructive border-destructive/20",
                            )}
                          >
                            {unit.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold tracking-tight uppercase">
                            KSh {unit.rent.toLocaleString()}
                          </span>
                          <span className="text-[9px] font-bold text-muted-foreground/30 uppercase  leading-none">
                            Net Monthly Yield
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 rounded-xl text-muted-foreground/20 group-hover:text-primary group-hover:bg-primary/5 transition-all"
                        >
                          <ArrowUpRight className="h-5 w-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-[400px] text-center">
                      <div className="flex flex-col items-center gap-4 opacity-40">
                        <LayoutGrid className="h-12 w-12 text-muted-foreground stroke-1" />
                        <p className="text-xs font-bold uppercase ">
                          No matching units in protocol
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Cinematic Unit Details Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-[95vw] sm:max-w-[calc(100vw-2rem)] md:max-w-[1100px] p-0 overflow-hidden rounded-2xl border-none shadow-2xl bg-background h-[90vh]">
          {selectedUnit && (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Hero Detail Section */}
              <div className="relative h-56 shrink-0 bg-[#0F0F0F] p-6 flex flex-col justify-end">
                <div className="absolute top-0 right-0 -m-20 h-32 w-32 bg-primary/10 blur-[100px] rounded-full" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary/20 border-primary/30 text-primary border rounded-lg text-[9px] font-bold uppercase  px-3 py-1">
                      {getBuilding(selectedUnit.buildingId)?.name}
                    </Badge>
                    <div className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="text-xs font-bold text-white/40 uppercase ">
                      Level {selectedUnit.floor} Internal Assets
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-white uppercase leading-none">
                    Strategic{" "}
                    <span className="text-primary ">
                      Unit {selectedUnit.number}
                    </span>
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-5 right-10 h-10 w-10 rounded-full text-white/40 hover:bg-white/10 hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Asset Configuration Content */}
              <div className="flex-1 overflow-auto p-6 no-scrollbar space-y-12">
                <div className="grid grid-cols-3 gap-6">
                  {[
                    {
                      l: "Structural Level",
                      v: `Floor ${selectedUnit.floor}`,
                      icon: Layers,
                    },
                    { l: "Asset Category", v: selectedUnit.type, icon: Home },
                    {
                      l: "Status Protocol",
                      v: selectedUnit.status.toUpperCase(),
                      icon: Zap,
                      accent: true,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-8 rounded-xl bg-foreground/[0.02] border border-foreground/5 space-y-3"
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5",
                          item.accent
                            ? "text-primary"
                            : "text-muted-foreground/30",
                        )}
                      />
                      <div className="space-y-1">
                        <p className="text-xs font-bold uppercase  text-muted-foreground/40">
                          {item.l}
                        </p>
                        <p
                          className={cn(
                            "text-xl font-bold uppercase tracking-tight leading-none",
                            item.accent && "text-primary",
                          )}
                        >
                          {item.v}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resident Profile Integration */}
                {selectedUnit.status === "occupied" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-foreground uppercase  flex items-center gap-3">
                        <Users className="h-4 w-4 text-primary" /> Resident
                        Identification
                      </h4>
                      <Badge className="bg-primary/5 text-primary border-primary/20 uppercase text-[8px] font-bold  h-6 px-3">
                        Protocol Verified
                      </Badge>
                    </div>

                    <div className="group relative p-5 rounded-2xl bg-foreground/[0.01] border border-foreground/5 overflow-hidden transition-all hover:border-primary/20">
                      <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />

                      <div className="relative z-10 flex flex-col lg:flex-row gap-5 items-center">
                        <div className="h-28 w-28 rounded-xl border-4 border-background bg-foreground shadow-2xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-700">
                          <img
                            src={getAvatarUrl(
                              getTenant(selectedUnit.id)?.name || "Resident",
                            )}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-muted-foreground/30 uppercase ">
                              Legal Identity
                            </p>
                            <h5 className="text-3xl font-bold tracking-tight uppercase">
                              {getTenant(selectedUnit.id)?.name}
                            </h5>
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                              <Phone className="h-3.5 w-3.5 text-primary" />{" "}
                              {getTenant(selectedUnit.id)?.phone}
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                              <Mail className="h-3.5 w-3.5 text-primary" />{" "}
                              {getTenant(selectedUnit.id)?.email}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-muted-foreground/30 uppercase ">
                              Contractual Entry
                            </p>
                            <p className="text-sm font-bold tracking-tight">
                              {getTenant(selectedUnit.id)?.moveInDate}
                            </p>
                          </div>
                          <div className="flex flex-col justify-center">
                            <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
                              <ShieldCheck className="h-3.5 w-3.5 text-primary" />{" "}
                              ID: {getTenant(selectedUnit.id)?.idNumber}
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="h-14 px-8 rounded-xl text-xs font-bold uppercase  border-foreground/10 hover:bg-primary/5 hover:text-primary transition-all shrink-0"
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Financial Analytics */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-foreground uppercase  flex items-center gap-3 underline underline-offset-8 decoration-primary/40">
                      Yield Performance
                    </h4>
                    <span className="text-[9px] font-bold text-muted-foreground/30 uppercase ">
                      Real-time Asset Audit
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-[#0F0F0F] text-white shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 h-44 w-44 bg-primary/20 blur-[50px] rounded-full group-hover:bg-primary/30 transition-all duration-1000" />
                      <div className="relative z-10 flex items-end justify-between">
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-primary uppercase ">
                            Scheduled Rent
                          </p>
                          <p className="text-2xl font-bold tracking-tight">
                            KSh {selectedUnit.rent.toLocaleString()}
                          </p>
                        </div>
                        <div className="h-14 w-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-all shadow-2xl">
                          <TrendingUp className="h-7 w-7 text-primary" />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-foreground/[0.02] border border-foreground/5 flex flex-col justify-center gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-muted-foreground/40 uppercase ">
                          Occupancy Alpha
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-2 bg-foreground/10 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-primary" />
                          </div>
                          <span className="text-xl font-bold tracking-tight">
                            100%
                          </span>
                        </div>
                      </div>
                      <p className="text-[9px] font-bold text-muted-foreground/30 uppercase  leading-relaxed">
                        This asset is currently performing at maximum
                        contractual yield. Non-delinquent status confirmed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Action Tier */}
              <div className="p-8 border-t border-foreground/5 bg-foreground/[0.02] flex gap-4 shrink-0">
                <Button className="flex-1 h-12 rounded-2xl bg-primary shadow-lg shadow-primary/20 hover:shadow-xl transition-all font-bold uppercase text-[11px] ">
                  Modify Digital Twin
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-2xl border-foreground/10 hover:bg-foreground/5 transition-all font-bold uppercase text-[11px] "
                >
                  Status Protocol
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </LandlordLayout>
  );
}
