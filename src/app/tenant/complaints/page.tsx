"use client";

import React, { useState, useRef } from "react";
import TenantLayout from "@/components/TenantLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { mockComplaints, mockTenants } from "@/data/mockData";
import {
  AlertCircle,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  X,
  Calendar,
  Wrench,
  Wifi,
  Droplets,
  Zap,
  Shield,
  MoreHorizontal,
  MessageSquare,
  FileText,
  Activity,
  TrendingUp,
  Bell,
  Star,
  Eye,
  Send,
  Home,
  Paperclip,
  Info,
  Flame,
  AlertTriangle,
  CheckCheck,
  Timer,
  CircleDot,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CustomWrenchIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url(/request.png)', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url(/request.png)', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomChatIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url("/chat.png")', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url("/chat.png")', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);

const CustomNotificationIcon = ({ className }: { className?: string }) => (
  <div 
    className={`bg-current ${className || ''}`}
    style={{
      WebkitMaskImage: 'url("/ringing.png")', 
      WebkitMaskSize: 'contain', 
      WebkitMaskPosition: 'center', 
      WebkitMaskRepeat: 'no-repeat',
      maskImage: 'url("/ringing.png")', 
      maskSize: 'contain', 
      maskPosition: 'center', 
      maskRepeat: 'no-repeat',
    }} 
  />
);
 
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

// --- TYPES -------------------------------------------------------------------
type Priority = "low" | "medium" | "high";
type Status = "all" | "pending" | "in-progress" | "resolved";

// --- HELPERS -----------------------------------------------------------------
function getPriorityConfig(priority: string) {
  const configs = {
    high: {
      label: "Critical",
      color: "#EF4444",
      bgColor: "#FEE2E2",
      borderColor: "#FECACA",
      icon: Flame,
    },
    medium: {
      label: "Standard",
      color: "#F59E0B",
      bgColor: "#FEF3C7",
      borderColor: "#FDE68A",
      icon: CustomAlertIcon,
    },
    low: {
      label: "Low",
      color: "#3DBE7A",
      bgColor: "#E8F5EE",
      borderColor: "#C4D4C9",
      icon: CheckCheck,
    },
  };
  return configs[priority as keyof typeof configs] || configs.low;
}

function getStatusConfig(status: string) {
  const configs = {
    resolved: {
      label: "Resolved",
      icon: CheckCheck,
      color: "#16A34A",
      bgColor: "#E8F5EE",
      borderColor: "#C4D4C9",
    },
    "in-progress": {
      label: "In Progress",
      icon: Timer,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
      borderColor: "#FDE68A",
    },
    pending: {
      label: "Pending",
      icon: CircleDot,
      color: "#EF4444",
      bgColor: "#FEE2E2",
      borderColor: "#FECACA",
    },
  };
  return configs[status as keyof typeof configs] || configs.pending;
}

const CATEGORIES = [
  { label: "Plumbing", icon: Droplets, color: "#3B82F6" },
  { label: "Electrical", icon: Zap, color: "#F59E0B" },
  { label: "Internet", icon: Wifi, color: "#8B5CF6" },
  { label: "Maintenance", icon: CustomWrenchIcon, color: "#F97316" },
  { label: "Security", icon: Shield, color: "#EF4444" },
  { label: "Other", icon: MoreHorizontal, color: "#6B7280" },
];

// --- REVEAL ANIMATION --------------------------------------------------------
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
  const inView = useInView(ref, { once: true, margin: "-30px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- MAIN PAGE ---------------------------------------------------------------
export default function TenantComplaintsPage() {
  const currentTenant = mockTenants[0];
  const myComplaints = mockComplaints.filter((c) => c.tenantId === currentTenant.id);

  const [statusFilter, setStatusFilter] = useState<Status>("all");
  const [search, setSearch] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "timeline" | "messages">("details");

  // Form state
  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: "medium" as Priority,
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Statistics
  const totalRequests = myComplaints.length;
  const pendingRequests = myComplaints.filter((c) => c.status === "pending").length;
  const inProgressRequests = myComplaints.filter((c) => c.status === "in-progress").length;
  const resolvedRequests = myComplaints.filter((c) => c.status === "resolved").length;
  const resolutionRate = totalRequests ? Math.round((resolvedRequests / totalRequests) * 100) : 0;

  // Filtering
  const filteredComplaints = myComplaints.filter((c) => {
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesSearch = `${c.title} ${c.category} ${c.description}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleSubmitRequest = () => {
    if (!form.title || !form.category || !form.description) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowNewRequestModal(false);
        setForm({
          title: "",
          category: "",
          priority: "medium",
          description: "",
        });
      }, 2000);
    }, 1500);
  };

  return (
    <TenantLayout>
      <div className="min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="max-w-7xl mx-auto px-[4px] sm:px-6 lg:px-8 py-8 space-y-6">
          
          {/* Page Header */}
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <Badge className="bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20 hover:bg-[#E8F5EE]">
                  <CustomAlertIcon className="w-3 h-3 mr-1" />
                  Service Requests
                </Badge>
                <h1 className="text-3xl text-[#1A1A1A]">
                  Maintenance & Support
                </h1>
                <p className="text-sm text-[#6B7280]">
                  Track and manage all your property service requests
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl relative text-muted-foreground hover:text-foreground hover:bg-[#E8F5EE] shrink-0"
                >
                  <CustomNotificationIcon className="h-4 w-4" />
                  {pendingRequests > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
                  )}
                </Button>
                <Button
                  onClick={() => setShowNewRequestModal(true)}
                  className="bg-[#1B5E45] hover:bg-[#246B4F] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Request
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                label: "Total Requests",
                value: totalRequests,
                subtitle: "All time",
                icon: FileText,
                color: "#1B5E45",
                bgColor: "#E8F5EE",
              },
              {
                label: "In Progress",
                value: inProgressRequests,
                subtitle: "Being worked on",
                icon: Timer,
                color: "#F59E0B",
                bgColor: "#FEF3C7",
              },
              {
                label: "Pending Review",
                value: pendingRequests,
                subtitle: "Awaiting response",
                icon: CustomAlertIcon,
                color: "#EF4444",
                bgColor: "#FEE2E2",
              },
              {
                label: "Resolution Rate",
                value: `${resolutionRate}%`,
                subtitle: `${resolvedRequests} resolved`,
                icon: TrendingUp,
                color: "#3DBE7A",
                bgColor: "#E8F5EE",
              },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className="border-[#E8F5EE] bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-3 sm:p-5">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div
                        className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: stat.bgColor, color: stat.color }}
                      >
                        <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-lg sm:text-2xl text-[#1A1A1A]">{stat.value}</h3>
                      <p className="text-[10px] sm:text-xs text-[#6B7280]">{stat.label}</p>
                      <p className="text-[10px] text-[#6B7280]/60 hidden sm:block">{stat.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* Resolution Progress */}
          <Reveal delay={0.2}>
            <Card className="border-[#E8F5EE] bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg text-[#1A1A1A]">
                          Overall Resolution Progress
                        </h3>
                        <p className="text-sm text-[#6B7280]">
                          {resolvedRequests} of {totalRequests} requests resolved
                        </p>
                      </div>
                      <Badge className="bg-[#E8F5EE] text-[#1B5E45] border-[#1B5E45]/20">
                        On Track
                      </Badge>
                    </div>
                    <Progress value={resolutionRate} className="h-3 bg-[#F4F4F0]" />
                    <div className="flex gap-4 text-xs">
                      {[
                        { label: "Pending", count: pendingRequests, color: "#EF4444" },
                        { label: "In Progress", count: inProgressRequests, color: "#F59E0B" },
                        { label: "Resolved", count: resolvedRequests, color: "#16A34A" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-[#6B7280]">
                            {item.count} {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Avg Response", value: "18h", icon: Clock },
                      { label: "Satisfaction", value: "4.8/5", icon: Star },
                    ].map((metric, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl border border-[#E8F5EE] bg-[#FAFAF8] text-center"
                      >
                        <metric.icon className="w-4 h-4 text-[#3DBE7A] mx-auto mb-2" />
                        <p className="text-xs text-[#6B7280] uppercase">
                          {metric.label}
                        </p>
                        <p className="text-sm text-[#1A1A1A] mt-1">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Filters */}
          <Reveal delay={0.25}>
            <Card className="border-[#E8F5EE] bg-white">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
                    <Input
                      placeholder="Search requests..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-9 h-11 border-[#E8F5EE] bg-[#FAFAF8] focus:border-[#1B5E45]"
                    />
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        <X className="h-4 w-4 text-[#6B7280]" />
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2 overflow-x-auto">
                    {(["all", "pending", "in-progress", "resolved"] as Status[]).map((status) => {
                      const count =
                        status === "all"
                          ? totalRequests
                          : myComplaints.filter((c) => c.status === status).length;
                      const isActive = statusFilter === status;
                      
                      return (
                        <Button
                          key={status}
                          variant={isActive ? "default" : "outline"}
                          size="sm"
                          onClick={() => setStatusFilter(status)}
                          className={cn(
                            "shrink-0",
                            isActive
                              ? "bg-[#1B5E45] hover:bg-[#246B4F] text-white"
                              : "border-[#E8F5EE] hover:bg-[#E8F5EE]"
                          )}
                        >
                          {status === "in-progress"
                            ? "In Progress"
                            : status.charAt(0).toUpperCase() + status.slice(1)}{" "}
                          ({count})
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Requests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredComplaints.map((complaint, i) => {
                const priority = getPriorityConfig(complaint.priority);
                const status = getStatusConfig(complaint.status);
                const category = CATEGORIES.find((c) => c.label === complaint.category);

                return (
                  <motion.div
                    key={complaint.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedComplaint(complaint)}
                  >
                    <Card className="border-[#E8F5EE] bg-white hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer overflow-hidden">
                      <div
                        className="h-1 w-full"
                        style={{ backgroundColor: priority.color }}
                      />
                      <CardContent className="p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${category?.color}15` }}
                            >
                              {category && (
                                <category.icon
                                  className="w-4 h-4"
                                  style={{ color: category.color }}
                                />
                              )}
                            </div>
                            <span className="text-xs text-[#6B7280]">
                              {complaint.category}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-[#6B7280]/50">
                            #{complaint.id.split("-").pop()}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm text-[#1A1A1A] line-clamp-1">
                            {complaint.title}
                          </h3>
                          <p className="text-xs text-[#6B7280] line-clamp-2">
                            {complaint.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                          <Calendar className="w-3 h-3" />
                          {complaint.createdDate}
                        </div>

                        <Separator className="bg-[#E8F5EE]" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{
                                backgroundColor: status.bgColor,
                                borderColor: status.borderColor,
                                color: status.color,
                              }}
                            >
                              <status.icon className="w-3 h-3 mr-1" />
                              {status.label}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{
                                backgroundColor: priority.bgColor,
                                borderColor: priority.borderColor,
                                color: priority.color,
                              }}
                            >
                              {priority.label}
                            </Badge>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredComplaints.length === 0 && (
              <div className="col-span-full py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#E8F5EE] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[#3DBE7A]" />
                </div>
                <h3 className="text-lg text-[#1A1A1A] mb-2">
                  All Clear!
                </h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  No requests match your current filters
                </p>
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStatusFilter("all");
                      setSearch("");
                    }}
                    className="border-[#E8F5EE] hover:bg-[#E8F5EE]"
                  >
                    Clear Filters
                  </Button>
                  <Button
                    onClick={() => setShowNewRequestModal(true)}
                    className="bg-[#1B5E45] hover:bg-[#246B4F] text-white"
                  >
                    New Request
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Request Details Modal */}
      {selectedComplaint && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedComplaint(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#E8F5EE] bg-[#FAFAF8]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${CATEGORIES.find((c) => c.label === selectedComplaint.category)?.color}15`,
                    }}
                  >
                    {CATEGORIES.find((c) => c.label === selectedComplaint.category)?.icon && (
                      <div
                        style={{
                          color: CATEGORIES.find((c) => c.label === selectedComplaint.category)
                            ?.color,
                        }}
                      >
                        {React.createElement(
                          CATEGORIES.find((c) => c.label === selectedComplaint.category)!.icon,
                          { className: "w-6 h-6" }
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[#6B7280]">
                        {selectedComplaint.category}
                      </span>
                      <Badge
                        variant="outline"
                        style={{
                          backgroundColor: getPriorityConfig(selectedComplaint.priority).bgColor,
                          borderColor: getPriorityConfig(selectedComplaint.priority).borderColor,
                          color: getPriorityConfig(selectedComplaint.priority).color,
                        }}
                      >
                        {getPriorityConfig(selectedComplaint.priority).label}
                      </Badge>
                      <Badge
                        variant="outline"
                        style={{
                          backgroundColor: getStatusConfig(selectedComplaint.status).bgColor,
                          borderColor: getStatusConfig(selectedComplaint.status).borderColor,
                          color: getStatusConfig(selectedComplaint.status).color,
                        }}
                      >
                        {getStatusConfig(selectedComplaint.status).label}
                      </Badge>
                    </div>
                    <h2 className="text-lg text-[#1A1A1A]">
                      {selectedComplaint.title}
                    </h2>
                    <p className="text-xs text-[#6B7280] flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3" />
                      Reported {selectedComplaint.createdDate}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedComplaint(null)}
                  className="hover:bg-red-50 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="mt-5">
                <TabsList className="bg-[#E8F5EE]">
                  <TabsTrigger value="details" className="data-[state=active]:bg-[#1B5E45] data-[state=active]:text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="data-[state=active]:bg-[#1B5E45] data-[state=active]:text-white">
                    <Activity className="w-4 h-4 mr-2" />
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="data-[state=active]:bg-[#1B5E45] data-[state=active]:text-white">
                    <CustomChatIcon className="w-4 h-4 mr-2" />
                    Messages
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <Tabs value={activeTab}>
                <TabsContent value="details" className="space-y-4 mt-0">
                  <div>
                    <h3 className="text-sm text-[#1A1A1A] mb-2">Description</h3>
                    <div className="p-4 rounded-lg bg-[#FAFAF8] border border-[#E8F5EE] text-sm text-[#4B5563]">
                      {selectedComplaint.description}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Request ID", value: `#${selectedComplaint.id.split("-").pop()}` },
                      { label: "Category", value: selectedComplaint.category },
                      { label: "Priority", value: getPriorityConfig(selectedComplaint.priority).label },
                      { label: "Status", value: getStatusConfig(selectedComplaint.status).label },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg border border-[#E8F5EE] bg-[#FAFAF8]">
                        <p className="text-xs text-[#6B7280] mb-1">{item.label}</p>
                        <p className="text-sm text-[#1A1A1A]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="space-y-3 mt-0">
                  {[
                    { label: "Request Submitted", date: selectedComplaint.createdDate, icon: FileText, done: true },
                    { label: "Acknowledged", date: selectedComplaint.createdDate, icon: Eye, done: selectedComplaint.status !== "pending" },
                    { label: "Technician Dispatched", date: "Today, 09:42 AM", icon: CustomWrenchIcon, done: selectedComplaint.status === "in-progress" || selectedComplaint.status === "resolved" },
                    { label: "Issue Resolved", date: selectedComplaint.status === "resolved" ? "Today" : "Pending", icon: CheckCircle2, done: selectedComplaint.status === "resolved" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                            step.done ? "bg-[#E8F5EE] border border-[#C4D4C9]" : "bg-[#F4F4F0] border border-[#E8F5EE]"
                          )}
                        >
                          <step.icon className={cn("w-4 h-4", step.done ? "text-[#1B5E45]" : "text-[#6B7280]/30")} />
                        </div>
                        {i < 3 && (
                          <div className={cn("w-0.5 h-6 mt-1", step.done ? "bg-[#C4D4C9]" : "bg-[#E8F5EE]")} />
                        )}
                      </div>
                      <div className={cn("flex-1", !step.done && "opacity-40")}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-[#1A1A1A]">{step.label}</p>
                          <span className="text-xs text-[#6B7280]">{step.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="messages" className="space-y-4 mt-0">
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="max-w-[70%] space-y-1">
                        <div className="p-3 rounded-xl rounded-tr-sm bg-[#1B5E45] text-white text-sm">
                          {selectedComplaint.description}
                        </div>
                        <p className="text-xs text-[#6B7280] text-right">
                          {selectedComplaint.createdDate} · You
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 p-3 rounded-xl border border-[#E8F5EE] bg-[#FAFAF8]">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 bg-transparent text-sm outline-none"
                    />
                    <Button size="icon" className="bg-[#1B5E45] hover:bg-[#246B4F]">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#E8F5EE] bg-[#FAFAF8] flex gap-3">
              <Button
                onClick={() => setSelectedComplaint(null)}
                variant="outline"
                className="flex-1 border-[#E8F5EE] hover:bg-white"
              >
                Close
              </Button>
              <Button className="flex-1 bg-[#1B5E45] hover:bg-[#246B4F] text-white">
                Submit Follow-up
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewRequestModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-[#E8F5EE] bg-[#FAFAF8]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1B5E45] flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg text-[#1A1A1A]">New Service Request</h2>
                    <p className="text-xs text-[#6B7280]">Tell us what needs to be fixed</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNewRequestModal(false)}
                  className="hover:bg-red-50 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {showSuccessMessage ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-[#E8F5EE] flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-[#3DBE7A]" />
                    </div>
                    <h3 className="text-xl text-[#1A1A1A]">Request Submitted!</h3>
                    <p className="text-sm text-[#6B7280]">
                      We'll get back to you within 24 hours
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-[#4B5563] uppercase">
                          Title *
                        </label>
                        <Input
                          placeholder="e.g., Kitchen tap leaking"
                          value={form.title}
                          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                          className="border-[#E8F5EE] bg-[#FAFAF8] focus:border-[#1B5E45]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-[#4B5563] uppercase">
                          Priority *
                        </label>
                        <div className="flex gap-2">
                          {(["low", "medium", "high"] as Priority[]).map((priority) => (
                            <Button
                              key={priority}
                              variant={form.priority === priority ? "default" : "outline"}
                              size="sm"
                              onClick={() => setForm((f) => ({ ...f, priority }))}
                              className={cn(
                                "flex-1",
                                form.priority === priority
                                  ? "bg-[#1B5E45] hover:bg-[#246B4F]"
                                  : "border-[#E8F5EE] hover:bg-[#E8F5EE]"
                              )}
                            >
                              {getPriorityConfig(priority).label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-[#4B5563] uppercase">
                        Category *
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.label}
                            onClick={() => setForm((f) => ({ ...f, category: cat.label }))}
                            className={cn(
                              "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                              form.category === cat.label
                                ? "border-[#1B5E45] bg-[#E8F5EE]"
                                : "border-[#E8F5EE] bg-[#FAFAF8] hover:border-[#1B5E45]/30"
                            )}
                          >
                            <cat.icon
                              className="w-5 h-5"
                              style={{
                                color: form.category === cat.label ? cat.color : "#6B7280",
                              }}
                            />
                            <span className="text-xs ">{cat.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-[#4B5563] uppercase">
                        Description *
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe the issue in detail..."
                        value={form.description}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, description: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl border border-[#E8F5EE] bg-[#FAFAF8] text-sm outline-none focus:border-[#1B5E45] focus:ring-2 focus:ring-[#1B5E45]/10 resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#E8F5EE]">
                      <Info className="w-4 h-4 text-[#1B5E45] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#1B5E45]">
                        Our team will review your request within 2 hours and respond with an action plan.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={handleSubmitRequest}
                        disabled={!form.title || !form.category || !form.description || isSubmitting}
                        className="flex-1 bg-[#1B5E45] hover:bg-[#246B4F] text-white "
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowNewRequestModal(false)}
                        className="border-[#E8F5EE] hover:bg-[#E8F5EE]"
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </TenantLayout>
  );
}