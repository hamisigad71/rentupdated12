"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Logo from "./Logo";

export default function Loader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(180deg, #0c4a34 0%, #062b1e 100%)" }}
        >
          {/* ARCHITECTURAL OVERLAY BACKGROUND */}
          <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80" 
              alt="" 
              className="w-full h-full object-cover scale-110"
            />
          </div>

          {/* WAVY DECORATORS */}
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full">
              <motion.path 
                d="M0,500 C200,400 400,600 600,500 C800,400 1000,600 1000,500" 
                stroke="#3DBE7A" 
                strokeWidth="0.5" 
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
              <motion.path 
                d="M0,550 C250,450 500,650 750,550 C900,450 1000,650 1000,550" 
                stroke="#3DBE7A" 
                strokeWidth="0.3" 
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 4, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            
            {/* LOGO ASSEMBLY - Using original Logo component */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="mb-8"
            >
              <Logo variant="icon" size="lg" className="scale-[1.8] drop-shadow-2xl" />
            </motion.div>

            {/* BRAND NAME */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3"
            >
              NexusRent
            </motion.h1>

            {/* TAGLINE */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/60 text-sm sm:text-base font-light tracking-wide mb-20"
            >
              Smarter Living. Seamless Renting.
            </motion.p>

            {/* LOADING SECTION */}
            <div className="flex flex-col items-center gap-6 w-64 max-w-full">
              {/* PROGRESS BAR */}
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                  className="h-full bg-gradient-to-r from-[#3DBE7A] to-emerald-400 shadow-[0_0_8px_rgba(61,190,122,0.6)]"
                />
              </div>

              {/* LOADING TEXT */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-medium"
              >
                Loading your experience...
              </motion.p>
            </div>
          </div>

          {/* BOTTOM BRANDING */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-12 text-white/20 text-[10px] uppercase tracking-[0.3em] font-medium"
          >
            NexusRent Institutional-Grade Platform
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
