"use client";

import React, { useState, useRef } from "react";
import TenantLayout from "@/components/TenantLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Modal from "@/components/Modal";
import { useAuth } from "@/context/AuthContext";
import {
  Mail,
  Phone,
  Home,
  Calendar,
  Save,
  Camera,
  ShieldCheck,
  Clock,
  CreditCard,
  Star,
  ChevronRight,
  User,
  Fingerprint,
  Zap,
  Award,
  Hash,
  Download,
  Activity,
  Edit3,
  X,
  CheckCircle,
  AlertCircle,
  MapPin,
  Building2,
  FileText,
  Bell,
  Lock,
  Upload,
  Ticket,
  Banknote,
} from "lucide-react";
import { mockTenants } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// ─── Reveal ────────────────────────────────────────────────────────────────
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
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Field Component ───────────────────────────────────────────────────────
function ProfileField({
  label,
  name,
  value,
  icon: Icon,
  type = "text",
  editing,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  icon: React.ElementType;
  type?: string;
  editing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs uppercase tracking-widest text-muted-foreground px-[4px]">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-muted-foreground/50 group-focus-within:text-[#1B5E45] transition-colors">
          <Icon className="h-4 w-4" />
        </div>
        {editing ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border bg-[#FAFAF8] text-sm outline-none focus:border-[#1B5E45] focus:ring-2 focus:ring-[#1B5E45]/10 transition-all"
          />
        ) : (
          <div className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-[#FAFAF8] text-sm text-foreground">
            {value || <span className="text-muted-foreground/50">Not set</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Stat Row ──────────────────────────────────────────────────────────────
function StatRow({
  label,
  value,
  danger = false,
  success = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
  success?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-sm",
          danger
            ? "text-red-600"
            : success
              ? "text-[#1B5E45]"
              : "text-foreground",
          value.includes('KSh') && "font-money"
        )}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function TenantProfilePage() {
  const currentTenant = mockTenants[0];
  const { displayImage, updateProfileImage, userName, updateUserName } =
    useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: userName || currentTenant.name,
    email: currentTenant.email,
    phone: currentTenant.phone,
    emergencyContact: "Sarah Connor",
    emergencyPhone: "+254 799 888 777",
  });

  const [notifications, setNotifications] = useState([
    {
      id: "rent",
      label: "Rent reminders",
      desc: "Get notified before rent is due",
      enabled: true,
    },
    {
      id: "maintenance",
      label: "Maintenance updates",
      desc: "Status changes on your requests",
      enabled: true,
    },
    {
      id: "building",
      label: "Building announcements",
      desc: "News and notices from management",
      enabled: false,
    },
    {
      id: "receipts",
      label: "Payment receipts",
      desc: "Email confirmation on every payment",
      enabled: true,
    },
  ]);

  const togglePreference = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n)),
    );
  };

  const handleSave = () => {
    updateUserName(formData.name);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDiscard = () => {
    setFormData({
      name: userName || currentTenant.name,
      email: currentTenant.email,
      phone: currentTenant.phone,
      emergencyContact: "Sarah Connor",
      emergencyPhone: "+254 799 888 777",
    });
    setIsEditing(false);
  };

  const allClear = currentTenant.arrears === 0;

  return (
    <TenantLayout>
      <TooltipProvider>
        <div className="min-h-screen bg-[#FAFAF8]">
          {/* ── Sticky Nav ──────────────────────────────────── */}
          <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-md">
            <div className="max-w-7xl mx-auto md:px-[4px]0 h-16 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Home className="h-4 w-4 text-[#1B5E45]" />
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-muted-foreground">Dashboard</span>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className=" text-foreground">My Profile</span>
              </div>

              <div className="flex items-center gap-2">
                <AnimatePresence>
                  {saved && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center gap-1.5 text-xs text-[#1B5E45] bg-[#E8F5EE] px-3 py-1.5 rounded-full"
                    >
                      <CheckCircle className="h-3.5 w-3.5" />
                      Profile updated
                    </motion.div>
                  )}
                </AnimatePresence>

                {isEditing ? (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDiscard}
                      className="h-9 px-4 rounded-xl border-border text-sm "
                    >
                      <X className="h-3.5 w-3.5 mr-1.5" />
                      Discard
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="h-9 px-4 rounded-xl bg-[#1B5E45] hover:bg-[#246B4F] text-white text-sm "
                    >
                      <Save className="h-3.5 w-3.5 mr-1.5" />
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-9 px-4 rounded-xl bg-[#1B5E45] hover:bg-[#246B4F] text-white text-sm "
                  >
                    <Edit3 className="h-3.5 w-3.5 mr-1.5" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto md:px-[4px]0 py-8 space-y-8">
            {/* ── Profile Hero Banner ──────────────────────── */}
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm dark:bg-card">
                <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-amber-500/5" />
                <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-40 rounded-full bg-emerald-500/5" />

                <div className="relative px-8 py-8 flex flex-col md:flex-row items-center md:items-end gap-6">
                  {/* Avatar */}
                  <div className="relative group shrink-0">
                    <div
                      className="h-24 w-24 rounded-2xl border-4 border-white overflow-hidden cursor-pointer shadow-xl transition-transform duration-300 group-hover:scale-105"
                      onClick={() => setShowAvatarModal(true)}
                    >
                      <img
                        src={displayImage}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    {/* Verified badge */}
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-lg">
                      <ShieldCheck
                        className="h-4 w-4 text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  {/* Identity */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10 text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full">
                        Verified Resident
                      </Badge>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className="h-3.5 w-3.5 text-amber-500 fill-amber-500"
                          />
                        ))}
                      </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl text-foreground tracking-tight">
                      {formData.name}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2">
                      <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                        <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                        {currentTenant?.roomNumber || currentTenant?.unitId}
                      </span>
                      <span className="w-1 h-1 bg-border rounded-full hidden md:block" />
                      <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                        <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                        Member since Oct 2023
                      </span>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-4 rounded-xl border-border text-foreground bg-secondary/50 hover:bg-secondary text-sm "
                    >
                      <Download className="h-4 w-4 mr-1.5" />
                      Export Profile
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Main Grid ────────────────────────────────── */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left — Forms */}
              <div className="lg:col-span-8 space-y-6">
                {/* Personal Info */}
                <Reveal delay={0.1}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                          <User className="h-4 w-4 text-[#1B5E45]" />
                          Personal Information
                        </CardTitle>
                        {!isEditing && (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="text-xs text-[#1B5E45] flex items-center gap-0.5"
                          >
                            <Edit3 className="h-3.5 w-3.5" /> Edit
                          </button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProfileField
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          icon={User}
                          editing={isEditing}
                          onChange={handleChange}
                          placeholder="Your full name"
                        />
                        <ProfileField
                          label="Email Address"
                          name="email"
                          value={formData.email}
                          icon={Mail}
                          type="email"
                          editing={isEditing}
                          onChange={handleChange}
                          placeholder="your@email.com"
                        />
                        <ProfileField
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          icon={Phone}
                          type="tel"
                          editing={isEditing}
                          onChange={handleChange}
                          placeholder="+254 7XX XXX XXX"
                        />
                        <div className="space-y-1.5">
                          <label className="block text-xs uppercase tracking-widest text-muted-foreground px-[4px]">
                            Unit
                          </label>
                          <div className="relative">
                            <h4 className="text-xs  text-foreground uppercase flex items-center gap-3">
                              <Building2 className="h-4 w-4" />
                            </h4>
                            <div className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-[#F4F4F0] text-sm text-muted-foreground select-none">
                              {currentTenant?.unitId || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isEditing && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex justify-end gap-3 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDiscard}
                                className="rounded-xl border-border h-9 px-4 text-sm"
                              >
                                Discard
                              </Button>
                              <Button
                                size="sm"
                                onClick={handleSave}
                                className="rounded-xl bg-[#1B5E45] hover:bg-[#246B4F] text-white h-9 px-5 text-sm "
                              >
                                <Save className="h-3.5 w-3.5 mr-1.5" />
                                Save Changes
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Emergency Contact */}
                <Reveal delay={0.15}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-4">
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        Emergency Contact
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        This person will be contacted in case of an emergency.
                      </p>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProfileField
                          label="Contact Name"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          icon={User}
                          editing={isEditing}
                          onChange={handleChange}
                          placeholder="Emergency contact name"
                        />
                        <ProfileField
                          label="Contact Phone"
                          name="emergencyPhone"
                          value={formData.emergencyPhone}
                          icon={Phone}
                          type="tel"
                          editing={isEditing}
                          onChange={handleChange}
                          placeholder="+254 7XX XXX XXX"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Lease Summary */}
                <Reveal delay={0.2}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-4">
                      <CardTitle className="text-base flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#1B5E45]" />
                        Lease Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          {
                            label: "Lease Start",
                            value: "1 Oct 2023",
                            icon: Calendar,
                          },
                          {
                            label: "Lease End",
                            value: "14 Mar 2027",
                            icon: Calendar,
                          },
                          {
                            label: "Unit Type",
                            value: "2-Bedroom",
                            icon: Building2,
                          },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-4 rounded-xl bg-[#FAFAF8] border border-border"
                          >
                            <div className="h-9 w-9 rounded-lg bg-[#E8F5EE] flex items-center justify-center shrink-0">
                              <item.icon className="h-4 w-4 text-[#1B5E45]" />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
                                {item.label}
                              </p>
                              <p className="text-sm text-foreground mt-0.5">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground ">
                            Lease progress
                          </span>
                          <span className="text-xs text-[#1B5E45]">
                            72% completed
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-[#E8F5EE] rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#3DBE7A] rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "72%" }}
                            transition={{
                              duration: 1.2,
                              ease: "easeOut",
                              delay: 0.5,
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Notification Preferences */}
                <Reveal delay={0.25}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-4">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Bell className="h-4 w-4 text-[#1B5E45]" />
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="space-y-3">
                        {notifications.map((pref) => (
                          <div
                            key={pref.id}
                            className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAFAF8] border border-border cursor-pointer hover:bg-emerald-500/2 transition-colors"
                            onClick={() => togglePreference(pref.id)}
                          >
                            <div>
                              <p className="text-sm text-foreground">
                                {pref.label}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {pref.desc}
                              </p>
                            </div>
                            <div
                              className={cn(
                                "w-10 h-5 rounded-full relative transition-colors shrink-0",
                                pref.enabled ? "bg-[#1B5E45]" : "bg-border",
                              )}
                            >
                              <div
                                className={cn(
                                  "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                                  pref.enabled
                                    ? "translate-x-5"
                                    : "translate-x-0.5",
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                {/* Avatar Card */}
                <Reveal delay={0.1}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardContent className="px-6 py-6">
                      <div className="flex flex-col items-center text-center">
                        <div
                          className="relative group cursor-pointer mb-4"
                          onClick={() => setShowAvatarModal(true)}
                        >
                          <div className="h-20 w-20 rounded-2xl border-4 border-[#E8F5EE] overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                            <img
                              src={displayImage}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 rounded-2xl bg-[#1B5E45]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="h-5 w-5 text-white" />
                          </div>
                          <div className="absolute -bottom-1.5 -right-1.5 h-6 w-6 rounded-full bg-[#3DBE7A] border-2 border-white flex items-center justify-center">
                            <ShieldCheck
                              className="h-3.5 w-3.5 text-white"
                              strokeWidth={2.5}
                            />
                          </div>
                        </div>
                        <p className="text-base text-foreground">
                          {formData.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formData.email}
                        </p>
                        <Badge className="mt-2 bg-[#E8F5EE] text-[#1B5E45] border-0 hover:bg-[#E8F5EE] text-[10px] uppercase tracking-wide px-2.5 rounded-full">
                          Verified Resident
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 w-full rounded-xl h-9 border-border text-xs hover:bg-[#E8F5EE] hover:border-[#1B5E45]/30 hover:text-[#1B5E45]"
                          onClick={() => setShowAvatarModal(true)}
                        >
                          <Upload className="h-3.5 w-3.5 mr-1.5" />
                          Change Photo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Account Summary */}
                <Reveal delay={0.15}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Activity className="h-4 w-4 text-[#1B5E45]" />
                        Account Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-5">
                      <div className="divide-y divide-border">
                        <StatRow
                          label="Monthly Rent"
                          value={`KSh ${currentTenant.rent.toLocaleString()}`}
                        />
                        <StatRow
                          label="Outstanding Balance"
                          value={
                            allClear
                              ? "KSh 0"
                              : `KSh ${currentTenant.arrears.toLocaleString()}`
                          }
                          danger={!allClear}
                          success={allClear}
                        />
                        <StatRow label="Security Deposit" value="KSh 1,500" />
                        <StatRow label="Open Tickets" value="2 Pending" />
                        <StatRow label="Compliance" value="Compliant" success />
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Security */}
                <Reveal delay={0.2}>
                  <Card className="rounded-2xl border-border shadow-sm bg-white">
                    <CardHeader className="px-6 pt-6 pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Lock className="h-4 w-4 text-[#1B5E45]" />
                        Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-5 space-y-3">
                      {[
                        {
                          icon: ShieldCheck,
                          label: "Identity Verified",
                          desc: "Biometric scan complete",
                          ok: true,
                        },
                        {
                          icon: Clock,
                          label: "Lease Synced",
                          desc: "Live & up to date",
                          ok: true,
                        },
                        {
                          icon: Fingerprint,
                          label: "Trust Rating",
                          desc: "Elite grade",
                          ok: true,
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFAF8] border border-border"
                        >
                          <div className="h-8 w-8 rounded-lg bg-[#E8F5EE] flex items-center justify-center shrink-0">
                            <item.icon className="h-4 w-4 text-[#1B5E45]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground leading-tight">
                              {item.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.desc}
                            </p>
                          </div>
                          <CheckCircle className="h-4 w-4 text-[#3DBE7A] shrink-0" />
                        </div>
                      ))}

                      <div className="flex items-center gap-2 mt-1 p-3 rounded-xl bg-[#E8F5EE] border border-[#1B5E45]/10">
                        <div className="h-2 w-2 rounded-full bg-[#3DBE7A] animate-pulse" />
                        <span className="text-xs text-[#1B5E45]">
                          All systems secure · AES-256 encrypted
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>

                {/* Danger zone */}
                <Reveal delay={0.25}>
                  <Card className="rounded-2xl border-border shadow-sm bg-[#FAFAF8]">
                    <CardContent className="px-6 py-5">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                        Account Actions
                      </p>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-xl h-9 border-border text-sm hover:bg-[#E8F5EE] hover:border-[#1B5E45]/30 hover:text-[#1B5E45]"
                        >
                          <Download className="h-3.5 w-3.5 mr-2" />
                          Export My Data
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-xl h-9 border-red-200 text-sm text-red-500 hover:bg-red-50 hover:border-red-300"
                        >
                          <X className="h-3.5 w-3.5 mr-2" />
                          Request Account Closure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              </div>
            </div>
          </main>
        </div>

        {/* ── Avatar Modal ─────────────────────────────────── */}
        <Modal
          isOpen={showAvatarModal}
          onClose={() => setShowAvatarModal(false)}
          size="md"
        >
          <div className="p-6 space-y-6">
            {/* Header */}
            <div>
              <h3 className="text-lg text-foreground tracking-tight">
                Update Profile Photo
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Upload a clear photo. Recommended size: 400×400px or larger.
              </p>
            </div>

            {/* Current photo */}
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-2xl border-4 border-[#E8F5EE] overflow-hidden shadow-md">
                <img
                  src={displayImage}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <Separator />

            {/* Upload */}
            <label className="block">
              <div className="group flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed border-border hover:border-[#1B5E45]/40 hover:bg-[#E8F5EE]/40 transition-all cursor-pointer">
                <div className="h-12 w-12 rounded-xl bg-[#E8F5EE] flex items-center justify-center group-hover:bg-[#1B5E45] transition-colors">
                  <Upload className="h-5 w-5 text-[#1B5E45] group-hover:text-white transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-foreground">
                    Click to upload photo
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    PNG, JPG or WEBP · Max 5MB
                  </p>
                </div>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updateProfileImage(reader.result as string);
                      setShowAvatarModal(false);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>

            <Button
              variant="ghost"
              size="sm"
              className="w-full rounded-xl h-9 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setShowAvatarModal(false)}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </TooltipProvider>
    </TenantLayout>
  );
}
