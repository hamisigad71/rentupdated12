"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface BottomNavProps {
  items: NavItem[];
}

export default function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const scrollContainer = document.getElementById("main-scroll-container") || window;

    const handleScroll = () => {
      const currentScrollY = scrollContainer === window ? window.scrollY : (scrollContainer as HTMLElement).scrollTop;
      const delta = currentScrollY - lastScrollY;
      
      // Only trigger if we've scrolled a reasonable amount (threshold)
      if (Math.abs(delta) < 5) return;

      if (currentScrollY <= 0) {
        setIsVisible(true);
      } else if (delta > 5 && currentScrollY > 50) {
        setIsVisible(false); // Scrolling down (lowered threshold so it fires faster)
      } else if (delta < -5) {
        setIsVisible(true); // Scrolling up
      }
      
      setLastScrollY(currentScrollY);
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.16, 1, 0.3, 1], // Custom quintic ease-out
            opacity: { duration: 0.3 }
          }}
          className="md:hidden fixed bottom-6 left-0 right-0 z-50 px-6 pb-2 pointer-events-none"
        >
          <nav
            className="flex items-center justify-around p-2 pointer-events-auto rounded-[24px]"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
            }}
          >
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 w-full"
                  style={{
                    color: isActive ? "#3DBE7A" : "rgba(30, 41, 59, 0.6)",
                    background: isActive ? "rgba(61, 190, 122, 0.15)" : "transparent",
                  }}
                >
                  <div
                    className={`transition-transform duration-300 ${isActive ? "scale-110" : "scale-100"}`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`text-[10px] mt-1 tracking-tight transition-all duration-300 ${isActive ? "opacity-100" : "opacity-50"}`}
                  >
                    {item.label}
                  </span>
                  {/* Active dot indicator */}
                  {isActive && (
                    <div className="w-1 h-1 rounded-full mt-0.5 bg-[#3DBE7A]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
