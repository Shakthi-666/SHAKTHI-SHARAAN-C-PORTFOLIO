"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");

  const sections = [
    { id: "home", label: "Hero" },
    { id: "projects", label: "Works" },
    { id: "contact", label: "Contact" },
  ];

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
  }, [sections]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 max-md:hidden">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center justify-end"
          aria-label={`Scroll to ${section.label}`}
        >
          <span
            className={`mr-4 px-2 py-1 rounded bg-black/50 text-white text-xs font-medium backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-full whitespace-nowrap pointer-events-none`}
          >
            {section.label}
          </span>
          <motion.div
            layoutId={section.id}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              activeSection === section.id
                ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                : "bg-white/30 hover:bg-white/60"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
