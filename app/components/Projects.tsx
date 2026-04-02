"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, AudioWaveform, FileText, BrainCircuit, ArrowUpRight } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "MediGuide – AI Healthcare Assistant",
      description: "Conversational AI for health queries with context-aware responses.",
      icon: <Bot className="w-6 h-6 text-blue-400" />,
      color: "from-blue-500/20 to-cyan-500/0",
      link: "https://github.com/Shakthi-666/mediguide",
    },
    {
      title: "Audio → Guitar Converter",
      description: "Converts recorded audio directly into guitar-style output intelligently.",
      icon: <AudioWaveform className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-500/20 to-teal-500/0",
      link: "https://github.com/Shakthi-666/audio-guitar",
    },
    {
      title: "AI Complaint Management System",
      description: "Smart routing and tracking system for streamlined complaint handling.",
      icon: <FileText className="w-6 h-6 text-purple-400" />,
      color: "from-purple-500/20 to-fuchsia-500/0",
      link: "https://github.com/Shakthi-666/city-connect-main",
    },
    {
      title: "AI HR Memory & Conversation",
      description: "Extracts summaries, decisions, and action items from HR conversations.",
      icon: <BrainCircuit className="w-6 h-6 text-pink-400" />,
      color: "from-pink-500/20 to-rose-500/0",
      link: "https://github.com/Shakthi-666/hr-memory",
    },
  ];

  return (
    <section id="projects" className="relative z-20 bg-[#121212] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Selected Works
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gray-500 to-transparent"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.a
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] cursor-pointer block"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 p-3 bg-white/10 rounded-xl inline-flex self-start border border-white/5 group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="mt-8 flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors duration-300">
                  <span>View Project</span>
                  <ArrowUpRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
