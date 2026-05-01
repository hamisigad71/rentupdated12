"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function Loader({ show, onVideoEnd }: { show: boolean; onVideoEnd?: () => void }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Custom Video Splash Screen */}
          <video
            src="/Homepage_loader_animation_NEXUS_…_202605011952.mp4"
            autoPlay
            onEnded={onVideoEnd}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          
          {/* Subtle overlay to ensure the emerald theme feels consistent */}
          <div className="absolute inset-0 bg-emerald-950/10 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
