"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function Overlay() {
  const { scrollYProgress } = useScroll();
  
  // Parallax Text Animations based on scroll
  const centerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const centerTranslate = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  
  const leftOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const leftTranslate = useTransform(scrollYProgress, [0.25, 0.35], [50, 0]);

  const rightOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const rightTranslate = useTransform(scrollYProgress, [0.55, 0.65], [50, 0]);

  // Mouse Parallax for subtle 3D hover/depth
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
      const x = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
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
        <motion.div
          className="absolute text-center"
          style={{ opacity: centerOpacity, y: centerTranslate }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Shakthi Sharaan C
          </h1>
          <p className="mt-4 text-xl md:text-3xl text-gray-300 font-light tracking-wide">
            Creative Developer
          </p>
        </motion.div>

        <motion.div
          className="absolute left-[10%] md:left-[20%] text-left"
          style={{ opacity: leftOpacity, y: leftTranslate }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-2xl leading-tight">
            I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">intelligent</span> <br />digital experiences.
          </h2>
        </motion.div>

        <motion.div
          className="absolute right-[10%] md:right-[20%] text-right"
          style={{ opacity: rightOpacity, y: rightTranslate }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-2xl leading-tight ml-auto">
            Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI</span>, <br />design & engineering.
          </h2>
        </motion.div>
      </motion.div>
    </div>
  );
}
