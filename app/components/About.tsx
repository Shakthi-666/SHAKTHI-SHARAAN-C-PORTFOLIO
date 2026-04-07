"use client";

import { motion } from "framer-motion";

const techStack = [
  { label: "TypeScript", color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/30", text: "text-blue-300" },
  { label: "Python", color: "from-yellow-500/20 to-yellow-500/5", border: "border-yellow-500/30", text: "text-yellow-300" },
  { label: "Next.js", color: "from-white/15 to-white/5", border: "border-white/20", text: "text-white" },
  { label: "React", color: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/30", text: "text-cyan-300" },
  { label: "Node.js", color: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/30", text: "text-emerald-300" },
  { label: "TensorFlow", color: "from-orange-500/20 to-orange-500/5", border: "border-orange-500/30", text: "text-orange-300" },
  { label: "LangChain", color: "from-teal-500/20 to-teal-500/5", border: "border-teal-500/30", text: "text-teal-300" },
  { label: "Firebase", color: "from-amber-500/20 to-amber-500/5", border: "border-amber-500/30", text: "text-amber-300" },
  { label: "FastAPI", color: "from-green-500/20 to-green-500/5", border: "border-green-500/30", text: "text-green-300" },
  { label: "PostgreSQL", color: "from-sky-500/20 to-sky-500/5", border: "border-sky-500/30", text: "text-sky-300" },
  { label: "Docker", color: "from-blue-400/20 to-blue-400/5", border: "border-blue-400/30", text: "text-blue-200" },
  { label: "Git", color: "from-rose-500/20 to-rose-500/5", border: "border-rose-500/30", text: "text-rose-300" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const bioLines = [
  "I'm Shakthi Sharaan C — a Creative Developer and AI Engineer",
  "passionate about building intelligent, beautifully crafted digital products.",
  "I thrive at the intersection of AI research and modern web engineering.",
];

export default function About() {
  return (
    <section id="about" className="relative z-20 bg-[#121212] py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Avatar + Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            {/* Section label */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-gradient-to-r from-blue-400 to-transparent" />
              <span className="text-xs text-blue-400 tracking-[0.2em] uppercase font-medium">About Me</span>
            </div>

            {/* Glowing Initials Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-xl scale-110" />
                <div className="relative w-20 h-20 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl font-bold tracking-tighter text-white">SS</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Shakthi Sharaan C</h2>
                <p className="text-sm text-blue-400/80 font-medium mt-1">Creative Developer · AI Engineer</p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4">
              {bioLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="text-gray-300 text-lg leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Highlight stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10"
            >
              {[
                { value: "5+", label: "Projects Built" },
                { value: "3+", label: "AI Systems" },
                { value: "∞", label: "Curiosity" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1 tracking-wide">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            {/* Section label */}
            <div>
              <p className="text-xs text-white/40 tracking-[0.2em] uppercase font-medium mb-4">Technologies & Tools</p>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Tech Stack</span>
              </h3>
            </div>

            {/* Chips */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-wrap gap-3"
            >
              {techStack.map((tech) => (
                <motion.div
                  key={tech.label}
                  variants={chipVariants}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className={`px-4 py-2 rounded-xl border bg-gradient-to-br ${tech.color} ${tech.border} backdrop-blur-sm cursor-default transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]`}
                >
                  <span className={`text-sm font-medium ${tech.text}`}>{tech.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Currently block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 mt-2"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs text-emerald-400 tracking-widest uppercase font-medium">Currently</p>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Building AI-powered web applications, exploring RAG architectures, and crafting interfaces that feel alive. Open to exciting collaborations and opportunities.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
