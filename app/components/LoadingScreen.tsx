"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  progress: number; // 0–100
  isLoaded: boolean;
}

export default function LoadingScreen({ progress, isLoaded }: LoadingScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center"
        >
          {/* Glow orb background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-600/10 blur-[100px]" />
            <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-purple-600/8 blur-[80px]" />
          </div>

          {/* Logo / Initials */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-12"
          >
            <div className="glow-pulse w-20 h-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center">
              <span className="text-2xl font-bold tracking-tighter text-white">SS</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-white/50 text-sm tracking-[0.2em] uppercase mb-8"
          >
            Shakthi Sharaan C
          </motion.p>

          {/* Progress bar container */}
          <div className="w-64 md:w-80">
            <div className="flex justify-between text-xs text-white/30 mb-2 font-medium tracking-widest">
              <span>Loading</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-xs text-white/30 tracking-widest uppercase"
          >
            Creative Developer · AI Engineer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
