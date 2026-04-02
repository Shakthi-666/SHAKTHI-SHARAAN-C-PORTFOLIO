"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Send, CheckCircle2, Loader2, RefreshCcw } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleNext = () => {
    if (step === 0 && formData.name.trim() === "") return;
    if (step === 1 && !formData.email.includes("@")) return;
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async () => {
    if (formData.message.trim() === "") return;
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Configuration for EmailJS
      // Users should define NEXT_PUBLIC_EMAILJS_SERVICE_ID, etc. in their .env
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "default_service";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "default_template";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "default_public_key";

      // If missing real config, just simulate network request for demo purposes
      if (serviceId === "default_service") {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSuccess(true);
      } else {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            reply_to: formData.email,
            message: formData.message,
          },
          publicKey
        );
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setErrorMsg("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step < 2) {
      e.preventDefault();
      handleNext();
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/Shakthi-666",
      color: "hover:text-white hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://linkedin.com/in/shakthi-sharaan",
      color: "hover:text-blue-400 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:shakthisharaan@gmail.com",
      color: "hover:text-red-400 hover:border-red-400 hover:shadow-[0_0_20px_rgba(248,113,113,0.3)]",
    },
  ];

  return (
    <section id="contact" className="relative z-20 bg-[#121212] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Let's Connect
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Reach out through any of the platforms below or leave a message.
          </p>
        </motion.div>

        {/* Social Links Row */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {socialLinks.map((link, idx) => (
            <motion.a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-gray-300 transition-all duration-300 min-h-[48px] ${link.color}`}
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </motion.a>
          ))}
        </div>

        {/* Conversational Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[450px] flex flex-col justify-start">
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col h-full"
                >
                  {/* Progress Indicator */}
                  <div className="flex gap-2 mb-8 items-center justify-center">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i <= step ? "w-8 bg-blue-500" : "w-4 bg-white/10"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="relative flex-grow flex flex-col gap-8 mb-8">
                    {/* Step 0: Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-4"
                    >
                      <label className="text-xl md:text-2xl font-medium text-white tracking-tight">
                        Hi, what's your name?
                      </label>
                      <input
                        type="text"
                        disabled={step > 0}
                        placeholder="Type your name..."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-b-2 border-white/20 text-white text-lg md:text-xl py-2 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600 disabled:opacity-50 disabled:border-transparent"
                      />
                    </motion.div>

                    {/* Step 1: Email */}
                    <AnimatePresence>
                      {step >= 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col gap-4"
                        >
                          <label className="text-xl md:text-2xl font-medium text-white tracking-tight">
                            Great to meet you, {formData.name || "friend"}! What's your email?
                          </label>
                          <input
                            type="email"
                            disabled={step > 1}
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-b-2 border-white/20 text-white text-lg md:text-xl py-2 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600 disabled:opacity-50 disabled:border-transparent"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step 2: Message */}
                    <AnimatePresence>
                      {step >= 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col gap-4"
                        >
                          <label className="text-xl md:text-2xl font-medium text-white tracking-tight">
                            What would you like to build?
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Tell me about your project or idea..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="bg-transparent border-b-2 border-white/20 text-white text-lg py-2 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600 resize-none mt-1"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {errorMsg && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 mt-4 text-sm text-center">
                      {errorMsg}
                    </motion.p>
                  )}

                  <div className="mt-auto flex justify-between items-center h-12">
                    {step > 0 ? (
                      <button
                        onClick={handlePrev}
                        disabled={isSubmitting}
                        className="text-gray-400 hover:text-white transition-colors disabled:opacity-50 min-h-[48px] px-2"
                      >
                        Edit Previous
                      </button>
                    ) : (
                      <div /> /* Spacer */
                    )}

                    {step < 2 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        disabled={
                          (step === 0 && formData.name.trim() === "") ||
                          (step === 1 && !formData.email.includes("@"))
                        }
                        className="bg-white text-black px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                      >
                        Next
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting || formData.message.trim() === ""}
                        className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-h-[48px]"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Send <Send className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full gap-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-green-400" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white tracking-tight">Message sent successfully 🚀</h3>
                  <p className="text-gray-400 text-lg">
                    Thanks for reaching out! I'll get back to you soon.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setStep(0);
                      setFormData({ name: "", email: "", message: "" });
                      setIsSuccess(false);
                    }}
                    className="mt-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <RefreshCcw className="w-4 h-4" /> Send another
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
