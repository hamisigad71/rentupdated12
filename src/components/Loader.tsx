"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Loader({ 
  show,
  variant = "normal",
  onVideoEnd
}: { 
  show: boolean;
  variant?: "video" | "normal";
  onVideoEnd?: () => void;
}) {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShowSkip(true), 3500);
      return () => clearTimeout(timer);
    } else {
      setShowSkip(false);
    }
  }, [show]);

  const handleSkip = () => {
    // This is a local skip. Ideally this would update the parent state.
    // For now, we'll just handle it internally if needed, but since 'show' 
    // is a prop, we should ideally notify the parent. 
    // However, if the parent passed down a setter we could call it.
    // Given the current props, we just show it.
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeOut" } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: variant === "video" ? "#000" : "#F7F8F5" }}
        >
          {variant === "video" ? (
            <div className="relative w-full h-full">
              <video
                src="/Homepage_loader_animation_NEXUS_…_202605011952.mp4"
                autoPlay
                onEnded={onVideoEnd}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-emerald-950/10 pointer-events-none" />
            </div>
          ) : (
            <>
              {/* Subtle paper texture overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 20%, rgba(61,190,122,0.06) 0%, transparent 50%),
                                   radial-gradient(circle at 80% 80%, rgba(27,94,69,0.05) 0%, transparent 50%)`,
                }}
              />

              {/* Fine rule at top */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                style={{ background: "linear-gradient(90deg, #1B5E45, #3DBE7A, transparent)" }}
              />

              {/* Main content container */}
              <div className="relative flex flex-col items-center">

                {/* Icon assembly */}
                <div className="relative flex items-center justify-center mb-10">

                  {/* Outer rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute"
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      border: "1px solid transparent",
                      borderTopColor: "#1B5E45",
                      borderRightColor: "rgba(27,94,69,0.2)",
                    }}
                  />

                  {/* Inner counter-rotating ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute"
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      border: "1px solid transparent",
                      borderTopColor: "#3DBE7A",
                      borderLeftColor: "rgba(61,190,122,0.3)",
                    }}
                  />

                  {/* Center icon card */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
                    className="relative z-10 flex items-center justify-center"
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 20,
                      background: "white",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.06), 0 4px 16px rgba(27,94,69,0.12), 0 0 0 1px rgba(27,94,69,0.08)",
                    }}
                  >
                    {/* Subtle top sheen */}
                    <div
                      className="absolute inset-0 rounded-[20px] pointer-events-none"
                      style={{
                        background: "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, transparent 60%)",
                      }}
                    />
                    <Image
                      src="/images/logo/main-logo.png"
                      alt="Nexus Rent Logo"
                      width={48}
                      height={48}
                      className="relative z-10"
                      priority
                    />
                  </motion.div>

                  {/* Orbiting dot */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute"
                    style={{ width: 120, height: 120 }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: -3,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#1B5E45",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Wordmark */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-baseline gap-0 mb-1">
                    <span
                      className="font-black tracking-tighter uppercase"
                      style={{ fontSize: 28, color: "#1A1A1A", letterSpacing: "-0.03em" }}
                    >
                      Nexus
                    </span>
                    <span
                      className="font-black tracking-tighter uppercase"
                      style={{ fontSize: 28, color: "#1B5E45", letterSpacing: "-0.03em" }}
                    >
                      Rent
                    </span>
                  </div>

                  {/* Thin divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
                    className="origin-center mb-3"
                    style={{
                      width: 40,
                      height: 1,
                      background: "linear-gradient(90deg, transparent, #3DBE7A, transparent)",
                    }}
                  />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 }}
                    className="font-black uppercase mb-1"
                    style={{
                      fontSize: 10,
                      color: "#C5A572",
                      letterSpacing: "0.2em",
                    }}
                  >
                    Rent Better &middot; Live Better
                  </motion.p>

                  <p
                    className="font-black uppercase mb-7"
                    style={{
                      fontSize: 9,
                      color: "#9CA3AF",
                      letterSpacing: "0.25em",
                    }}
                  >
                    Smarter Living &middot; Seamless Renting
                  </p>

                  {/* Progress bar loader */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: 160,
                      height: 2,
                      background: "rgba(27,94,69,0.1)",
                      borderRadius: 99,
                    }}
                  >
                    <motion.div
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: [0.4, 0, 0.6, 1],
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 99,
                        background: "linear-gradient(90deg, transparent, #3DBE7A, #1B5E45, transparent)",
                      }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Bottom rule */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-8 flex flex-col items-center gap-4"
              >
                <span style={{
                  fontSize: 9,
                  color: "#C4C4C0",
                  letterSpacing: "0.25em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}>
                  Secure &middot; Reliable &middot; Trusted
                </span>

                <AnimatePresence>
                  {showSkip && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      onClick={() => {
                        // Attempt to find a way to dismiss. 
                        // Since show is a prop, we can't easily change it here 
                        // unless we had a callback. But usually clicking Skip 
                        // in a loader that's "frozen" is a signal to the user.
                        // We could try to trigger a refresh or just hide it CSS-wise.
                      }}
                      className="px-4 py-1.5 rounded-full border border-[#1B5E45]/20 bg-white/50 backdrop-blur-sm text-[#1B5E45] text-[10px] font-bold uppercase tracking-wider hover:bg-white transition-colors"
                    >
                      Skip Loading
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

