"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  User, Mail, Lock, Phone, ArrowLeft, ArrowRight, CreditCard,
  Home, Building2, Camera, CheckCircle2, Eye, EyeOff, Upload,
  ShieldCheck, Zap, Building
} from "lucide-react";
import { mockBuildings, mockUnits } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";


/* ── hero content ────────────────────────────────────────────────────── */
const HERO = {
  landlord: {
    label: "Property Owner",
    headline: "Grow your rental income with smart tools.",
    body: "List properties, screen tenants, collect rent and generate reports — all from one dashboard built for Kenyan landlords.",
    features: ["Property analytics", "Automated rent collection", "Maintenance tracking", "Tenant management"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  tenant: {
    label: "Resident",
    headline: "Find your home, manage it effortlessly.",
    body: "Pay rent via M-Pesa, raise maintenance requests, and stay in sync with your landlord — all from your phone.",
    features: ["M-Pesa rent payments", "Maintenance requests", "Digital lease storage", "Direct messaging"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
  },
};

/* ── Field wrapper ───────────────────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[12px] font-semibold text-[#374151] ml-0.5">{label}</label>
      {children}
    </div>
  );
}

function InputBase({ icon: Icon, className = "", ...props }: { icon: React.ElementType } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#1B5E45] transition-colors z-10" />
      <input
        {...props}
        className={cn(
          "w-full pl-11 pr-4 py-3 rounded-xl border border-[#E0E8E3] bg-white text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] outline-none focus:border-[#1B5E45] focus:shadow-[0_0_0_3px_rgba(27,94,69,0.1)] transition-all shadow-sm",
          className
        )}
      />
    </div>
  );
}

/* ── Role selector screen ────────────────────────────────────────────── */
function RoleSelector({ onSelect }: { onSelect: (r: "landlord" | "tenant") => void }) {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center px-0 py-6 sm:p-6">
      <div className="max-w-lg w-full">

        {/* Wordmark */}
        <Link href="/" className="mb-12 block hover:opacity-80 transition-opacity">
          <Logo size="sm" />
        </Link>

        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Create your account</h1>
          <p className="text-sm text-[#6B7280] mt-1.5">First, tell us how you'll be using NexusRent.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {([
            { r: "landlord", t: "I'm a Landlord", d: "I own or manage rental properties", icon: Building2, features: ["List properties", "Collect rent", "Screen tenants"] },
            { r: "tenant",   t: "I'm a Tenant",   d: "I'm looking to rent or already renting", icon: Home, features: ["Find a home", "Pay rent", "Request maintenance"] },
          ] as const).map(box => (
            <button key={box.r} onClick={() => onSelect(box.r)}
              className="group text-left p-6 rounded-2xl border-2 border-[#E0E8E3] bg-white hover:border-[#1B5E45] hover:shadow-xl hover:shadow-[#1B5E45]/10 hover:-translate-y-1 transition-all duration-300">

              <div className="h-12 w-12 rounded-xl bg-[#E8F5EE] flex items-center justify-center mb-5 group-hover:bg-[#1B5E45] transition-colors">
                <box.icon className="h-6 w-6 text-[#1B5E45] group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-1">{box.t}</h3>
              <p className="text-[12px] text-[#6B7280] mb-5">{box.d}</p>

              <ul className="space-y-2">
                {box.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-[12px] text-[#6B7280]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#3DBE7A] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-1.5 text-[12px] font-semibold text-[#1B5E45]">
                Get started <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-[13px] text-[#6B7280] mt-8">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#1B5E45] font-semibold hover:underline">Sign in</Link>
        </p>

        <Link href="/" className="flex items-center justify-center gap-2 text-[12px] text-[#9CA3AF] hover:text-[#6B7280] transition-colors mt-4">
          <ArrowLeft className="h-3 w-3" /> Back to home
        </Link>
      </div>
    </div>
  );
}

/* ── Registration form ───────────────────────────────────────────────── */
function RegisterContent() {
  const [role, setRole]           = useState<"landlord" | "tenant" | null>(null);
  const [showPw, setShowPw]       = useState(false);
  const [showCPw, setShowCPw]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { login }                 = useAuth();

  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
    idNumber: "", buildingId: "", unitId: "", roomNumber: "", profileImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(f => ({ ...f, profileImage: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const availableUnits = useMemo(() =>
    form.buildingId ? mockUnits.filter(u => u.buildingId === form.buildingId && u.status === "vacant") : [],
    [form.buildingId]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setSubmitted(true);
    setTimeout(() => login({ role, name: form.name, profileImage: form.profileImage }), 1200);
  };

  /* Role selector screen */
  if (!role) return <RoleSelector onSelect={setRole} />;

  const hero = HERO[role];

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1.1fr] bg-[#FAFAF8]">

      {/* ── Left: Form ───────────────────────────────────────────────── */}
      <div className="overflow-y-auto flex flex-col px-0 py-12 sm:px-6 lg:px-14">
        <div className="max-w-md w-full mx-auto">

          {/* Wordmark */}
          <Link href="/" className="mb-10 block hover:opacity-80 transition-opacity">
            <Logo size="sm" />
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] border border-[#C4D4C9] mb-4">
              {role === "landlord" ? <Building2 className="h-3.5 w-3.5 text-[#1B5E45]" /> : <Home className="h-3.5 w-3.5 text-[#1B5E45]" />}
              <span className="text-[11px] font-semibold text-[#1B5E45]">{role === "landlord" ? "Landlord" : "Tenant"} Account</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Create your account</h1>
            <p className="text-sm text-[#6B7280] mt-1">Fill in your details to get started. It only takes a minute.</p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="py-16 flex flex-col items-center text-center space-y-5">
                <div className="h-20 w-20 rounded-2xl bg-[#E8F5EE] border border-[#C4D4C9] flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-[#3DBE7A]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1A1A1A]">Account created!</h2>
                  <p className="text-sm text-[#6B7280] mt-1">Signing you in...</p>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">

                {/* Avatar upload */}
                <div className="flex items-center gap-5 p-5 rounded-2xl border border-dashed border-[#C4D4C9] bg-[#F4F9F6] hover:border-[#1B5E45] transition-colors group">
                  <div className="relative shrink-0">
                    <div className="h-16 w-16 rounded-2xl bg-[#E8F5EE] border-2 border-[#C4D4C9] overflow-hidden flex items-center justify-center">
                      {form.profileImage
                        ? <img src={form.profileImage} alt="" className="h-full w-full object-cover" />
                        : <User className="h-7 w-7 text-[#1B5E45]/40" />
                      }
                    </div>
                    <input type="file" accept="image/*" onChange={handleImage}
                      className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#1A1A1A]">Profile photo</p>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">Optional — JPG, PNG up to 5MB</p>
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-[#1B5E45]">
                      <Upload className="h-3 w-3" /> Upload photo
                    </div>
                  </div>
                </div>

                {/* Full name */}
                <Field label="Full name">
                  <InputBase icon={User} name="name" type="text" required placeholder="Jane Wanjiku" value={form.name} onChange={handleChange} />
                </Field>

                {/* ID — tenant only */}
                {role === "tenant" && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                    <Field label="National ID / Passport number">
                      <InputBase icon={CreditCard} name="idNumber" type="text" required placeholder="e.g. 12345678" value={form.idNumber} onChange={handleChange} />
                    </Field>
                  </motion.div>
                )}

                {/* Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Email address">
                    <InputBase icon={Mail} name="email" type="email" required placeholder="jane@example.com" value={form.email} onChange={handleChange} />
                  </Field>
                  <Field label="Phone number">
                    <InputBase icon={Phone} name="phone" type="tel" required placeholder="+254 700 000 000" value={form.phone} onChange={handleChange} />
                  </Field>
                </div>

                {/* Building + Unit — tenant only */}
                {role === "tenant" && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Building">
                        <div className="relative group">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#1B5E45] transition-colors" />
                          <select name="buildingId" required value={form.buildingId} onChange={handleChange}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E0E8E3] bg-white text-sm text-[#1A1A1A] outline-none focus:border-[#1B5E45] focus:shadow-[0_0_0_3px_rgba(27,94,69,0.1)] transition-all shadow-sm appearance-none cursor-pointer">
                            <option value="">Select building</option>
                            {mockBuildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                          </select>
                        </div>
                      </Field>
                      <Field label="Unit">
                        <div className="relative group">
                          <Home className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#1B5E45] transition-colors" />
                          <select name="unitId" required disabled={!form.buildingId} value={form.unitId} onChange={handleChange}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E0E8E3] bg-white text-sm text-[#1A1A1A] outline-none focus:border-[#1B5E45] focus:shadow-[0_0_0_3px_rgba(27,94,69,0.1)] transition-all shadow-sm appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                            <option value="">{form.buildingId ? "Select unit" : "Choose building first"}</option>
                            {availableUnits.map(u => <option key={u.id} value={u.id}>{u.type} — KSh {u.rent.toLocaleString()}/mo</option>)}
                          </select>
                        </div>
                      </Field>
                    </div>
                    <Field label="Room / Unit number">
                      <InputBase icon={CheckCircle2} name="roomNumber" type="text" required placeholder="e.g. A4, Unit 102" value={form.roomNumber} onChange={handleChange} />
                    </Field>
                  </motion.div>
                )}

                {/* Password + Confirm */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Password">
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#1B5E45] transition-colors" />
                      <input type={showPw ? "text" : "password"} name="password" required placeholder="••••••••"
                        value={form.password} onChange={handleChange}
                        className="w-full pl-11 pr-11 py-3 rounded-xl border border-[#E0E8E3] bg-white text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] outline-none focus:border-[#1B5E45] focus:shadow-[0_0_0_3px_rgba(27,94,69,0.1)] transition-all shadow-sm" />
                      <button type="button" onClick={() => setShowPw(s => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors">
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </Field>
                  <Field label="Confirm password">
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF] group-focus-within:text-[#1B5E45] transition-colors" />
                      <input type={showCPw ? "text" : "password"} name="confirmPassword" required placeholder="••••••••"
                        value={form.confirmPassword} onChange={handleChange}
                        className={cn(
                          "w-full pl-11 pr-11 py-3 rounded-xl border bg-white text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] outline-none transition-all shadow-sm",
                          form.confirmPassword && form.password !== form.confirmPassword
                            ? "border-red-300 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
                            : "border-[#E0E8E3] focus:border-[#1B5E45] focus:shadow-[0_0_0_3px_rgba(27,94,69,0.1)]"
                        )} />
                      <button type="button" onClick={() => setShowCPw(s => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors">
                        {showCPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {form.confirmPassword && form.password !== form.confirmPassword && (
                      <p className="text-[11px] text-red-500 mt-1 ml-0.5">Passwords do not match</p>
                    )}
                  </Field>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input type="checkbox" id="terms" required
                    className="h-4 w-4 mt-0.5 rounded border-[#E0E8E3] accent-[#1B5E45] cursor-pointer shrink-0" />
                  <label htmlFor="terms" className="text-[12px] text-[#6B7280] leading-relaxed cursor-pointer">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#1B5E45] font-semibold hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-[#1B5E45] font-semibold hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                {/* Submit */}
                <button type="submit"
                  disabled={form.password !== form.confirmPassword && !!form.confirmPassword}
                  className="w-full h-11 rounded-xl bg-[#1B5E45] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#246B4F] hover:shadow-lg hover:shadow-[#1B5E45]/25 hover:-translate-y-px active:translate-y-0 transition-all shadow-md shadow-[#1B5E45]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2">
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Footer nav */}
                <div className="space-y-3 pt-2">
                  <p className="text-center text-[13px] text-[#6B7280]">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-[#1B5E45] font-semibold hover:underline">Sign in</Link>
                  </p>
                  <button type="button" onClick={() => setRole(null)}
                    className="w-full flex items-center justify-center gap-2 text-[12px] text-[#9CA3AF] hover:text-[#6B7280] transition-colors">
                    <ArrowLeft className="h-3 w-3" /> Change account type
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Right: Hero ───────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col relative overflow-hidden bg-[#0d1a11]">
        <AnimatePresence mode="wait">
          <motion.img key={role}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            src={hero.image} alt="" aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        {/* Layered dark overlay — keeps text readable */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-linear-to-r from-black/20 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          {/* Top */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size="sm" light />
          </Link>

          {/* Center */}
          <AnimatePresence mode="wait">
            <motion.div key={role}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3DBE7A]/20 border border-[#3DBE7A]/30">
                <div className="h-1.5 w-1.5 rounded-full bg-[#3DBE7A] animate-pulse" />
                <span className="text-[11px] font-semibold text-[#3DBE7A] uppercase tracking-wider">{hero.label}</span>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white leading-tight tracking-tight">{hero.headline}</h2>
                <p className="text-[#7FD9A8]/70 text-[15px] leading-relaxed mt-4 max-w-sm">{hero.body}</p>
              </div>

              <ul className="space-y-3">
                {hero.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-lg bg-[#3DBE7A]/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#3DBE7A]" />
                    </div>
                    <span className="text-[13px] text-white/70">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* Bottom: avatars */}
          <div className="space-y-3">
            <div className="flex -space-x-2.5">
              {[10, 11, 12, 13, 14].map(n => (
                <img key={n} src={`https://i.pravatar.cc/80?img=${n}`} alt=""
                  className="h-9 w-9 rounded-full border-2 border-[#1B5E45] object-cover" />
              ))}
            </div>
            <p className="text-[12px] text-white/50">Joined by <strong className="text-white/70">2,000+</strong> landlords and tenants across Kenya.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-[#E8F5EE] border border-[#C4D4C9] flex items-center justify-center animate-pulse">
            <div className="h-6 w-6 rounded-lg bg-[#1B5E45]" />
          </div>
          <p className="text-sm text-[#6B7280] font-medium">Loading...</p>
        </div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}