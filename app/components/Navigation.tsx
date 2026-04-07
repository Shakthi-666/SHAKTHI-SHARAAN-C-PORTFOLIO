"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "home", label: "Hero" },
  { id: "about", label: "About" },
  { id: "projects", label: "Works" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.scrollY;
      let newActiveSection = "home";
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const top = element.offsetTop;
          if (pageYOffset >= top - 200) {
            newActiveSection = section.id;
          }
        }
      });
      setActiveSection(newActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop dot navigation (right side) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 max-md:hidden">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group relative flex items-center justify-end"
            aria-label={`Scroll to ${section.label}`}
          >
            <span
              className="mr-4 px-2 py-1 rounded bg-black/50 text-white text-xs font-medium backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-full whitespace-nowrap pointer-events-none"
            >
              {section.label}
            </span>
            <motion.div
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                activeSection === section.id
                  ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  : "bg-white/30 hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <span className="text-white font-semibold tracking-tight text-sm">SS</span>
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed top-[64px] left-0 right-0 z-40 bg-black/90 backdrop-blur-2xl border-b border-white/10"
          >
            <div className="flex flex-col py-4">
              {sections.map((section, i) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(section.id)}
                  className={`px-6 py-4 text-left text-lg font-medium transition-colors duration-200 ${
                    activeSection === section.id
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {activeSection === section.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white inline-block shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                    )}
                    {activeSection !== section.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 inline-block" />
                    )}
                    {section.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
