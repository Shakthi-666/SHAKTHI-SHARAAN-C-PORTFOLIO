import ScrollyCanvas from "./components/ScrollyCanvas";
import Overlay from "./components/Overlay";
import Projects from "./components/Projects";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <SmoothScroll />
      
      {/* Scrollytelling Section */}
      <div className="relative h-[500vh]">
        {/* Sticky container for Canvas & Overlay */}
        <div className="sticky top-0 h-screen overflow-hidden bg-black">
          <ScrollyCanvas />
          <Overlay />
        </div>
      </div>

      {/* Content Below the Scroll */}
      <Projects />

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-[#121212] py-8 text-center">
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} Shakthi Sharaan C. Built with Next.js & Framer Motion.
        </p>
      </footer>
    </main>
  );
}
