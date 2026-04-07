"use client";

import { useRef, useState } from "react";
import ScrollyCanvas from "./components/ScrollyCanvas";
import Overlay from "./components/Overlay";
import Projects from "./components/Projects";
import SmoothScroll from "./components/SmoothScroll";
import Contact from "./components/Contact";
import Navigation from "./components/Navigation";
import About from "./components/About";
import LoadingScreen from "./components/LoadingScreen";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Works", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <Github className="w-4 h-4" />, href: "https://github.com/Shakthi-666", label: "GitHub" },
    { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com/in/shakthi-sharaan", label: "LinkedIn" },
    { icon: <Mail className="w-4 h-4" />, href: "mailto:shakthisharaan@gmail.com", label: "Email" },
  ];

  return (
    <main className="relative min-h-screen">
      {/* Loading screen — shown until canvas frames are ready */}
      <LoadingScreen progress={loadProgress} isLoaded={isLoaded} />

      <SmoothScroll />
      <Navigation />
      
      {/* Scrollytelling Section */}
      <div id="home" ref={heroRef} className="relative h-[800vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <ScrollyCanvas
            containerRef={heroRef}
            onProgress={(p) => setLoadProgress(p)}
            onLoaded={() => setIsLoaded(true)}
          />
          <Overlay containerRef={heroRef} />
        </div>
      </div>

      {/* About Section */}
      <About />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-[#0d0d0d]">
        {/* Gradient fade from above */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

            {/* Brand column */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">SS</span>
                </div>
                <span className="font-semibold text-white tracking-tight">Shakthi Sharaan C</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Creative Developer & AI Engineer crafting intelligent, beautifully designed digital products.
              </p>
              <p className="text-xs text-white/20 mt-2">
                Built with Next.js, Framer Motion & Tailwind CSS
              </p>
            </div>

            {/* Nav links column */}
            <div className="flex flex-col gap-3">
              <p className="text-xs text-white/40 tracking-[0.15em] uppercase font-medium mb-2">Navigation</p>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-500 hover:text-white transition-colors duration-200 text-sm w-fit"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(link.href);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Social column */}
            <div className="flex flex-col gap-3">
              <p className="text-xs text-white/40 tracking-[0.15em] uppercase font-medium mb-2">Connect</p>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-200 text-sm group w-fit"
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs">
              © {new Date().getFullYear()} Shakthi Sharaan C. All rights reserved.
            </p>
            <p className="text-white/15 text-xs">
              Designed & Developed with ♥ in India
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
