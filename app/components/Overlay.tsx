"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Overlay({ containerRef }: { containerRef?: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Phase 1: Name/Title — scroll 0 → 0.2
  const centerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const centerTranslate = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  
  // Phase 2: "I build intelligent digital experiences" — scroll 0.25 → 0.5
  const leftOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const leftTranslate = useTransform(scrollYProgress, [0.25, 0.35], [50, 0]);

  // Phase 3: "Bridging AI, design & engineering" — scroll 0.55 → 0.8
  const rightOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const rightTranslate = useTransform(scrollYProgress, [0.55, 0.65], [50, 0]);

  // Phase 4: CTA arrow — scroll 0.85 → 1
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.9, 0.97, 1], [0, 1, 1, 0]);
  const ctaTranslate = useTransform(scrollYProgress, [0.85, 0.92], [30, 0]);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const textX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
  const textY = useTransform(smoothMouseY, [-1, 1], [-20, 20]);
  const rotateX = useTransform(smoothMouseY, [-1, 1], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-10 w-full h-full">
      <motion.div 
        className="w-full h-full flex flex-col items-center justify-center"
        style={{ x: textX, y: textY, rotateX, rotateY, perspective: 1000 }}
      >
        {/* Phase 1: Hero name */}
        <motion.div
          className="absolute text-center px-6"
          style={{ opacity: centerOpacity, y: centerTranslate }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Shakthi Sharaan C
          </h1>
          <p className="mt-4 text-xl md:text-3xl text-gray-300 font-light tracking-wide">
            Creative Developer
          </p>
          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-xs tracking-[0.25em] uppercase">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Phase 2: "I build intelligent digital experiences" */}
        <motion.div
          className="absolute left-[10%] md:left-[20%] text-left"
          style={{ opacity: leftOpacity, y: leftTranslate }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-2xl leading-tight">
            I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">intelligent</span> <br />digital experiences.
          </h2>
        </motion.div>

        {/* Phase 3: "Bridging AI, design & engineering" */}
        <motion.div
          className="absolute right-[10%] md:right-[20%] text-right"
          style={{ opacity: rightOpacity, y: rightTranslate }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-2xl leading-tight ml-auto">
            Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI</span>, <br />design & engineering.
          </h2>
        </motion.div>

        {/* Phase 4: CTA */}
        <motion.div
          className="absolute bottom-16 text-center"
          style={{ opacity: ctaOpacity, y: ctaTranslate }}
        >
          <p className="text-white/50 text-lg font-light tracking-wide mb-3">Ready to see what I&apos;ve built?</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-white/30"
          >
            <ChevronDown className="w-6 h-6" />
            <ChevronDown className="w-6 h-6 -mt-3" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
