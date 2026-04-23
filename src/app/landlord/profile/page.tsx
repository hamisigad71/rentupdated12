"use client";

import React, { useState, useEffect } from "react";
import LandlordLayout from "@/components/LandlordLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Mail, Phone, Building2, ShieldCheck, Bell, Settings, Camera, Edit3, Lock, CreditCard,
  LogOut, ChevronRight, Check, Zap, Activity, ArrowUpRight, MapPin, Calendar,
  Shield, Smartphone, Monitor, Globe, Download, Upload, Clock, AlertTriangle,
  CheckCircle, Eye, EyeOff, Trash2, Plus, BarChart3, TrendingUp, Users, Briefcase
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { profileImage, updateProfileImage } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showPassword, setShowPassword] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(85);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@nexusrent.com",
    phone: "+254 712 345 678",
    company: "Nexus Rent Corp",
    role: "Super Admin",
    joined: "January 2024",
    location: "Nairobi, Kenya",
    department: "Operations",
    employeeId: "NXR-0247",
    timezone: "EAT (UTC+3)"
  });

  const [securityData, setSecurityData] = useState({
    lastLogin: "2 hours ago",
    activeSessions: 3,
    twoFactorEnabled: true,
    passwordLastChanged: "14 days ago",
    securityScore: 92
  });

  const recentActivity = [
    { action: "Profile updated", time: "2 hours ago", type: "edit", ip: "192.168.1.100" },
    { action: "Password changed", time: "2 weeks ago", type: "security", ip: "192.168.1.100" },
    { action: "New device login", time: "3 weeks ago", type: "login", ip: "197.248.1.45" },
    { action: "Export data requested", time: "1 month ago", type: "export", ip: "192.168.1.100" },
  ];

  const connectedDevices = [
    { name: "MacBook Pro", type: "Desktop", location: "Nairobi", lastActive: "Now", current: true },
    { name: "iPhone 15 Pro", type: "Mobile", location: "Nairobi", lastActive: "1 hour ago", current: false },
    { name: "Chrome Browser", type: "Web", location: "Mombasa", lastActive: "2 days ago", current: false },
  ];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "edit": return <Edit3 className="h-3 w-3" />;
      case "security": return <Shield className="h-3 w-3" />;
      case "login": return <Monitor className="h-3 w-3" />;
      case "export": return <Download className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "Desktop": return <Monitor className="h-5 w-5" />;
      case "Mobile": return <Smartphone className="h-5 w-5" />;
      case "Web": return <Globe className="h-5 w-5" />;
      default: return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <LandlordLayout>
      <div className="max-w-7xl mx-auto space-y-8 px-[4px] sm:px-4 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Enhanced Profile Header */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FAFAF8] via-white to-[#E8F5EE]/30 p-8 border border-[#E8F5EE] shadow-2xl">
          <div className="absolute top-0 right-0 h-40 w-40 bg-[#1B5E45]/5 blur-[100px] -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 h-40 w-40 bg-[#1B5E45]/5 blur-[100px] -ml-20 -mb-20" />
          
          <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-center">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-center gap-6">
              <label className="relative group cursor-pointer block">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-[#E8F5EE] to-[#FAFAF8] border-2 border-[#1B5E45]/10 flex items-center justify-center text-[#1B5E45] shadow-xl shadow-[#E8F5EE]/50 overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-16 w-16" strokeWidth={1.5} />
                  )}
                </div>
                <div className="absolute -bottom-3 -right-3 h-10 w-10 rounded-xl bg-[#1B5E45] text-white flex items-center justify-center shadow-lg shadow-[#1B5E45]/30 border-3 border-white group-hover:scale-110 transition-all pointer-events-none">
                  <Camera className="h-4 w-4" />
                </div>
                <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-[#3DBE7A] border-2 border-white shadow-sm flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                </div>
              </label>
              
              <div className="text-center md:text-left space-y-3">
                <div className="space-y-2">
                  <Badge className="bg-[#E8F5EE] border-[#1B5E45]/20 text-[#1B5E45] hover:bg-[#E8F5EE]">
                    <ShieldCheck className="mr-1 h-3 w-3" />
                    Executive Access
                  </Badge>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#1A1A1A]">{formData.name}</h1>
                  <p className="text-sm text-[#6B7280] flex items-center justify-center md:justify-start gap-2">
                    <Building2 className="h-4 w-4 text-[#1B5E45]" /> 
                    {formData.role} • {formData.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-xl bg-white/80 border border-[#E8F5EE] shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-[#3DBE7A]" />
                  <span className="text-xs text-[#6B7280]">Security Score</span>
                </div>
                <p className="text-2xl text-[#1A1A1A]">{securityData.securityScore}%</p>
                <div className="h-1.5 w-full bg-[#E8F5EE] rounded-full mt-2 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${securityData.securityScore}%` }} className="h-full bg-[#1B5E45]" />
                </div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/80 border border-[#E8F5EE] shadow-sm">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Activity className="h-3 w-3 text-[#1B5E45]" />
                  <span className="text-xs text-[#6B7280]">Profile Complete</span>
                </div>
                <p className="text-2xl text-[#1A1A1A]">{profileCompletion}%</p>
                <div className="h-1.5 w-full bg-[#E8F5EE] rounded-full mt-2 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${profileCompletion}%` }} className="h-full bg-[#3DBE7A]" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                className={cn(
                  "h-12 px-6 rounded-xl  transition-all shadow-lg",
                  isEditing 
                    ? "bg-[#3DBE7A] hover:bg-[#32A86B] text-white shadow-[#3DBE7A]/20" 
                    : "bg-[#1B5E45] hover:bg-[#246B4F] text-white shadow-[#1B5E45]/20"
                )}
              >
                {isEditing ? (
                  <><Check className="h-4 w-4 mr-2" /> Save Changes</>
                ) : (
                  <><Edit3 className="h-4 w-4 mr-2" /> Edit Profile</>
                )}
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="border-[#E8F5EE] hover:bg-[#E8F5EE]">
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="border-[#E8F5EE] hover:bg-[#E8F5EE]">
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit bg-[#FAFAF8] border border-[#E8F5EE]">
            <TabsTrigger value="overview" className=" data-[state=active]:bg-[#1B5E45] data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="security" className=" data-[state=active]:bg-[#1B5E45] data-[state=active]:text-white">Security</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-[#1B5E45] data-[state=active]:text-white">Activity</TabsTrigger>
            <TabsTrigger value="billing" className=" data-[state=active]:bg-[#1B5E45] data-[state=active]:text-white">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Personal Information */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-2xl border border-[#E8F5EE] shadow-lg">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-xl bg-[#E8F5EE] border border-[#1B5E45]/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-[#1B5E45]" />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#1A1A1A]">Personal Information</h3>
                      <p className="text-sm text-[#6B7280]">Manage your account details and preferences</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Full Name", name: "name", icon: User, value: formData.name },
                      { label: "Email Address", name: "email", icon: Mail, value: formData.email },
                      { label: "Phone Number", name: "phone", icon: Phone, value: formData.phone },
                      { label: "Department", name: "department", icon: Building2, value: formData.department },
                      { label: "Employee ID", name: "employeeId", icon: User, value: formData.employeeId },
                      { label: "Location", name: "location", icon: MapPin, value: formData.location },
                    ].map((field) => (
                      <div key={field.name} className="space-y-3">
                        <label className="text-sm text-[#6B7280] flex items-center gap-2">
                          <field.icon className="h-4 w-4 text-[#6B7280]" />
                          {field.label}
                        </label>
                        <Input 
                          name={field.name} 
                          value={field.value} 
                          onChange={handleInput} 
                          disabled={!isEditing}
                          className="h-12 rounded-xl border-[#E8F5EE] bg-[#FAFAF8] focus:bg-white disabled:opacity-100 disabled:bg-[#FAFAF8]/50"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Details */}
                <div className="bg-white p-8 rounded-2xl border border-[#E8F5EE] shadow-lg">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-xl bg-[#E8F5EE] border border-[#1B5E45]/10 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-[#1B5E45]" />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#1A1A1A]">Professional Details</h3>
                      <p className="text-sm text-[#6B7280]">Work-related information and preferences</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm text-[#6B7280]">Job Title</label>
                      <Input 
                        value={formData.role} 
                        disabled={!isEditing}
                        className="h-12 rounded-xl border-[#E8F5EE] bg-[#FAFAF8] focus:bg-white disabled:opacity-100 disabled:bg-[#FAFAF8]/50"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm text-[#6B7280]">Time Zone</label>
                      <Input 
                        value={formData.timezone} 
                        disabled={!isEditing}
                        className="h-12 rounded-xl border-[#E8F5EE] bg-[#FAFAF8] focus:bg-white disabled:opacity-100 disabled:bg-[#FAFAF8]/50"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm text-[#6B7280]">Start Date</label>
                      <Input 
                        value={formData.joined} 
                        disabled
                        className="h-12 rounded-xl border-[#E8F5EE] bg-[#FAFAF8]/50 text-[#6B7280]"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm text-[#6B7280]">Company</label>
                      <Input 
                        value={formData.company} 
                        disabled={!isEditing}
                        className="h-12 rounded-xl border-[#E8F5EE] bg-[#FAFAF8] focus:bg-white disabled:opacity-100 disabled:bg-[#FAFAF8]/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Widgets */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8F5EE] shadow-lg">
                  <h4 className="text-lg text-[#1A1A1A] mb-6">Quick Actions</h4>
                  <div className="space-y-3">
                    {[
                      { label: "Download Profile Data", icon: Download, color: "text-[#1B5E45] hover:bg-[#E8F5EE]" },
                      { label: "Security Checkup", icon: Shield, color: "text-[#3DBE7A] hover:bg-[#E8F5EE]" },
                      { label: "Activity Report", icon: BarChart3, color: "text-amber-600 hover:bg-amber-50" },
                      { label: "Privacy Settings", icon: Eye, color: "text-purple-600 hover:bg-purple-50" },
                    ].map((action, i) => (
                      <Button
                        key={i}
                        variant="ghost"
                        className={cn("w-full justify-start h-12 rounded-xl border border-transparent hover:border-[#E8F5EE]", action.color)}
                      >
                        <action.icon className="h-4 w-4 mr-3" />
                        {action.label}
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Notification Preferences */}
                <div className="bg-white p-6 rounded-2xl border border-[#E8F5EE] shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell className="h-5 w-5 text-[#6B7280]" />
                    <h4 className="text-lg text-[#1A1A1A]">Notifications</h4>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Email Notifications", enabled: true },
                      { label: "SMS Alerts", enabled: true },
                      { label: "Push Notifications", enabled: false },
                      { label: "Marketing Updates", enabled: false },
                    ].map((pref, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FAFAF8] transition-colors">
                        <span className="text-sm text-[#6B7280]">{pref.label}</span>
                        <div className={cn(
                          "h-6 w-11 rounded-full transition-all cursor-pointer",
                          pref.enabled ? "bg-[#1B5E45]" : "bg-slate-300"
                        )}>
                          <div className={cn(
                            "h-5 w-5 rounded-full bg-white shadow-sm transition-all mt-0.5",
                            pref.enabled ? "ml-5" : "ml-0.5"
                          )} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Security Overview */}
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-[#E8F5EE] shadow-lg">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-xl bg-[#E8F5EE] border border-[#1B5E45]/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-[#1B5E45]" />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#1A1A1A]">Security Overview</h3>
                      <p className="text-sm text-[#6B7280]">Your account protection status</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-xl bg-[#E8F5EE] border border-[#1B5E45]/20">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle className="h-5 w-5 text-[#1B5E45]" />
                        <span className=" text-[#1B5E45]">Excellent Security</span>
                      </div>
                      <p className="text-sm text-[#1B5E45]/80">Your security score is {securityData.securityScore}% - your account is well protected.</p>
                    </div>

                    {[
                      { 
                        label: "Password Security", 
                        status: "Strong", 
                        icon: Lock, 
                        color: "emerald", 
                        desc: `Last updated ${securityData.passwordLastChanged}` 
                      },
                      { 
                        label: "Two-Factor Authentication", 
                        status: securityData.twoFactorEnabled ? "Enabled" : "Disabled", 
                        icon: Smartphone, 
                        color: securityData.twoFactorEnabled ? "emerald" : "amber",
                        desc: "SMS + Authenticator app"
                      },
                      { 
                        label: "Login Sessions", 
                        status: `${securityData.activeSessions} active`, 
                        icon: Monitor, 
                        color: "emerald",
                        desc: `Last login ${securityData.lastLogin}`
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[#E8F5EE] hover:bg-[#FAFAF8] transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "h-10 w-10 rounded-lg flex items-center justify-center",
                            item.color === "emerald" ? "bg-[#E8F5EE] text-[#1B5E45]" :
                            item.color === "amber" ? "bg-amber-50 text-amber-600" :
                            "bg-[#E8F5EE] text-[#1B5E45]"
                          )}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className=" text-[#1A1A1A]">{item.label}</p>
                            <p className="text-sm text-[#6B7280]">{item.desc}</p>
                          </div>
                        </div>
                        <Badge className={cn(
                          "",
                          item.color === "emerald" ? "bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/10" :
                          item.color === "amber" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/10"
                        )}>
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connected Devices */}
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-[#E8F5EE] shadow-lg">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-xl bg-[#E8F5EE] border border-[#1B5E45]/10 flex items-center justify-center">
                      <Monitor className="h-6 w-6 text-[#1B5E45]" />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#1A1A1A]">Connected Devices</h3>
                      <p className="text-sm text-[#6B7280]">Manage your active sessions</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {connectedDevices.map((device, i) => (
                      <div key={i} className="p-5 rounded-xl border border-[#E8F5EE] hover:bg-[#FAFAF8] transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-[#FAFAF8] border border-[#E8F5EE] flex items-center justify-center text-[#6B7280]">
                              {getDeviceIcon(device.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className=" text-[#1A1A1A]">{device.name}</p>
                                {device.current && (
                                  <Badge className="bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20 text-xs">
                                    Current
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-[#6B7280]">{device.location} • {device.lastActive}</p>
                            </div>
                          </div>
                          {!device.current && (
                            <Button variant="outline" size="sm" className="text-rose-600 border-rose-200 hover:bg-rose-50">
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6 bg-[#E8F5EE]" />
                  
                  <Button variant="outline" className="w-full h-12 border-[#E8F5EE] hover:bg-[#FAFAF8]">
                    <Shield className="h-4 w-4 mr-2" />
                    View Security Audit Log
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E8F5EE] shadow-lg">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-xl bg-[#E8F5EE] border border-[#1B5E45]/10 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-[#1B5E45]" />
                </div>
                <div>
                  <h3 className="text-xl text-[#1A1A1A]">Recent Activity</h3>
                  <p className="text-sm text-[#6B7280]">Track your account activity and changes</p>
                </div>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-xl border border-[#E8F5EE] hover:bg-[#FAFAF8] transition-colors">
                    <div className="h-10 w-10 rounded-full bg-[#E8F5EE] flex items-center justify-center text-[#1B5E45]">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className=" text-[#1A1A1A]">{activity.action}</p>
                      <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {activity.ip}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="hover:text-[#1B5E45]">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button variant="outline" className="border-[#E8F5EE] hover:bg-[#FAFAF8] text-[#1B5E45]">
                  Load More Activity
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Billing Information */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-2xl border border-[#E8F5EE] shadow-lg">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-xl bg-[#E8F5EE] border border-[#1B5E45]/10 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-[#1B5E45]" />
                    </div>
                    <div>
                      <h3 className="text-xl text-[#1A1A1A]">Subscription Details</h3>
                      <p className="text-sm text-[#6B7280]">Manage your billing and subscription</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-[#E8F5EE] to-[#FAFAF8] border border-[#1B5E45]/10">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-[#1B5E45] text-white ">ENTERPRISE</Badge>
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">ACTIVE</Badge>
                      </div>
                      <p className="text-3xl text-[#1A1A1A] mb-2">KSh 45,000</p>
                      <p className="text-sm text-[#6B7280]">per month</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-[#6B7280]">Next billing date</span>
                        <span className="text-sm text-[#1A1A1A]">April 01, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[#6B7280]">Payment method</span>
                        <span className="text-sm text-[#1A1A1A]">•••• 4532</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[#6B7280]">Billing email</span>
                        <span className="text-sm text-[#1A1A1A]">{formData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Actions */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-[#E8F5EE] shadow-lg">
                  <h4 className="text-lg text-[#1A1A1A] mb-6">Billing Actions</h4>
                  <div className="space-y-3">
                    <Button className="w-full justify-start h-12 bg-[#1B5E45] hover:bg-[#246B4F] text-white">
                      <CreditCard className="h-4 w-4 mr-3" />
                      Manage Payment Methods
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-12 border-[#E8F5EE] hover:bg-[#FAFAF8]">
                      <Download className="h-4 w-4 mr-3" />
                      Download Invoices
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-12 border-[#E8F5EE] hover:bg-[#FAFAF8]">
                      <Settings className="h-4 w-4 mr-3" />
                      Billing Preferences
                    </Button>
                  </div>
                </div>

                {/* Account Management */}
                <div className="bg-rose-50 p-6 rounded-2xl border border-rose-200 shadow-lg">
                  <div className="text-center space-y-4">
                    <div className="h-12 w-12 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center mx-auto">
                      <AlertTriangle className="h-6 w-6 text-rose-600" />
                    </div>
                    <div>
                      <h4 className=" text-rose-900 mb-2">Account Management</h4>
                      <p className="text-sm text-rose-700 mb-4">Need help with your account or want to make changes?</p>
                    </div>
                    <Button variant="outline" className="w-full border-rose-300 text-rose-700 hover:bg-rose-100">
                      <LogOut className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </LandlordLayout>
  );
}