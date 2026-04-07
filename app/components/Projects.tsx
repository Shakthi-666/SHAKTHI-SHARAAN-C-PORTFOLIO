"use client";

import { motion } from "framer-motion";
import { Bot, AudioWaveform, FileText, BrainCircuit, ShieldCheck, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "MediGuide – AI Healthcare Assistant",
    description: "Conversational AI for health queries with context-aware responses, multilingual support, and RAG-based Indian home remedy engine.",
    icon: <Bot className="w-6 h-6 text-blue-400" />,
    color: "from-blue-500/20 to-cyan-500/0",
    glowColor: "group-hover:shadow-[0_0_50px_rgba(96,165,250,0.12)]",
    link: "https://github.com/Shakthi-666/mediguide",
    tags: ["Python", "LangChain", "FastAPI", "React"],
    role: "Full-Stack AI · 2024",
  },
  {
    title: "Audio → Guitar Converter",
    description: "Real-time audio processing pipeline that converts raw recorded audio into guitar-style output using deep learning signal processing.",
    icon: <AudioWaveform className="w-6 h-6 text-emerald-400" />,
    color: "from-emerald-500/20 to-teal-500/0",
    glowColor: "group-hover:shadow-[0_0_50px_rgba(52,211,153,0.12)]",
    link: "https://github.com/Shakthi-666/audio-guitar",
    tags: ["Python", "TensorFlow", "DSP", "NumPy"],
    role: "ML Engineering · 2024",
  },
  {
    title: "AI Complaint Management System",
    description: "Smart department-routing complaint system with voice input, real-time status tracking, and an AI chatbot for civic issue resolution.",
    icon: <FileText className="w-6 h-6 text-purple-400" />,
    color: "from-purple-500/20 to-fuchsia-500/0",
    glowColor: "group-hover:shadow-[0_0_50px_rgba(192,132,252,0.12)]",
    link: "https://github.com/Shakthi-666/city-connect-main",
    tags: ["React", "Firebase", "Node.js", "AI"],
    role: "Full-Stack · 2024",
  },
  {
    title: "AI HR Memory & Conversation",
    description: "Intelligent HR assistant that extracts summaries, decisions, and action items from meeting recordings and HR conversations.",
    icon: <BrainCircuit className="w-6 h-6 text-pink-400" />,
    color: "from-pink-500/20 to-rose-500/0",
    glowColor: "group-hover:shadow-[0_0_50px_rgba(244,114,182,0.12)]",
    link: "https://github.com/Shakthi-666/hr-memory",
    tags: ["LangChain", "Gemini", "Flowise", "Firestore"],
    role: "AI & Backend · 2024",
  },
  {
    title: "CertiSure – AI Certificate Verifier",
    description: "Full-stack certificate authenticity verification using OCR text extraction, a rule-based fake-detection scoring engine, and QR code generation.",
    icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
    color: "from-amber-500/20 to-orange-500/0",
    glowColor: "group-hover:shadow-[0_0_50px_rgba(251,191,36,0.12)]",
    link: "https://github.com/Shakthi-666/certisure",
    tags: ["React", "Node.js", "Tesseract.js", "OCR"],
    role: "Full-Stack · 2025",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-20 bg-[#121212] py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-gradient-to-r from-purple-400 to-transparent" />
            <span className="text-xs text-purple-400 tracking-[0.2em] uppercase font-medium">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Selected Works
          </h2>
          <p className="text-gray-500 max-w-xl text-lg">
            A collection of AI systems, web applications, and experiments I&apos;ve built.
          </p>
        </motion.div>

        {/* First four in 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {projects.slice(0, 4).map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>

        {/* 5th card — CertiSure — full width */}
        <motion.a
          href={projects[4].link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 overflow-hidden transition-all duration-300 hover:border-white/20 ${projects[4].glowColor} cursor-pointer flex items-center gap-8`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${projects[4].color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className="relative z-10 flex items-center gap-8 w-full flex-wrap md:flex-nowrap">
            <div className="p-4 bg-white/10 rounded-xl border border-white/5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              {projects[4].icon}
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h3 className="text-2xl font-semibold text-white tracking-tight">{projects[4].title}</h3>
                <span className="text-xs text-white/30 font-medium">{projects[4].role}</span>
              </div>
              <p className="text-gray-400 leading-relaxed">{projects[4].description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {projects[4].tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-white/50 font-medium">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors duration-300">
              <span>View Project</span>
              <ArrowUpRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}

function ProjectCard({ project, idx }: { project: typeof projects[0]; idx: number }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 overflow-hidden transition-all duration-300 hover:border-white/20 ${project.glowColor} cursor-pointer block`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-white/10 rounded-xl border border-white/5 group-hover:scale-110 transition-transform duration-300">
            {project.icon}
          </div>
          <span className="text-xs text-white/25 font-medium mt-1">{project.role}</span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 leading-relaxed flex-grow text-sm">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-white/50 font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors duration-300">
          <span>View Project</span>
          <ArrowUpRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </div>
      </div>
    </motion.a>
  );
}
