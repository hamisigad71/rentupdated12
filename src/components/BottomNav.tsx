"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="md:hidden fixed bottom-4 left-0 right-0 z-50 px-4 pointer-events-none"
        >
          <nav
            className="flex items-center justify-around p-2 pointer-events-auto rounded-[28px] border border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
          >
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 w-full group"
                >
                  <div
                    className={cn(
                      "p-2 rounded-xl transition-all duration-300",
                      isActive ? "bg-emerald-deep text-white shadow-lg shadow-emerald-deep/20" : "text-emerald-deep/60 group-hover:text-emerald-deep/80"
                    )}
                  >
                    {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
                  </div>
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-emerald-deep"
                    />
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
