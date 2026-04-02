"use client";

import { useRef } from "react";
import ScrollyCanvas from "./components/ScrollyCanvas";
import Overlay from "./components/Overlay";
import Projects from "./components/Projects";
import SmoothScroll from "./components/SmoothScroll";
import Contact from "./components/Contact";
import Navigation from "./components/Navigation";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  return (
    <main className="relative min-h-screen">
      <SmoothScroll />
      <Navigation />
      
      {/* Scrollytelling Section */}
      <div id="home" ref={heroRef} className="relative h-[800vh]">
        {/* Sticky container for Canvas & Overlay */}
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <ScrollyCanvas containerRef={heroRef} />
          <Overlay containerRef={heroRef} />
        </div>
      </div>

      {/* Content Below the Scroll */}
      <Projects />

      <Contact />

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-[#121212] py-8 text-center pt-16">
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} Shakthi Sharaan C. Built with Next.js & Framer Motion.
        </p>
      </footer>
    </main>
  );
}
