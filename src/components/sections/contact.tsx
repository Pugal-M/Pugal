"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Code, Globe, Check, Copy, CheckCircle2, Loader2 } from "lucide-react";
import { Reveal } from "@/components/primitives/reveal";
import { Magnetic } from "@/components/primitives/magnetic";

export function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [isShaking, setIsShaking] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("pugalarasu04@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Inline validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setIsShaking(true);
      setErrorMessage("Please fill in all required fields.");
      setTimeout(() => setIsShaking(false), 600);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setIsShaking(true);
      setErrorMessage("Please enter a valid email address.");
      setTimeout(() => setIsShaking(false), 600);
      return;
    }

    setErrorMessage(null);
    setFormState("loading");

    // Morphing transition simulation
    setTimeout(() => {
      setFormState("success");

      // Open mailto client after brief success feedback
      setTimeout(() => {
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        const mailtoLink = `mailto:pugalarasu04@gmail.com?subject=${encodeURIComponent(
          formData.subject || "Portfolio Contact"
        )}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        setTimeout(() => {
          setFormState("idle");
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
      }, 1000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20">
          <Reveal direction="down">
            <span className="text-xs uppercase font-bold tracking-widest text-google-green px-3 py-1 rounded-full bg-google-green/10 border border-google-green/20">
              Get In Touch
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mt-4 mb-6">
              Let&apos;s <span className="text-google-green">Connect</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to collaborate, innovate, or discuss opportunities?
              Drop a note directly to my inbox.
            </p>
          </Reveal>
        </div>

        {/* Form and Info Layout */}
        <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">

          {/* Contact Details Card */}
          <div className="flex-1 space-y-6">
            <Reveal direction="right">
              <div className="glass-card p-8 rounded-3xl border border-black/10 dark:border-white/10 space-y-6 shadow-xl relative overflow-hidden">
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>

                {/* Email Item with Direct Copy Action */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-google-red/15 text-google-red flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Direct Email</p>
                      <p className="text-sm font-semibold text-foreground">pugalarasu04@gmail.com</p>
                    </div>
                  </div>

                  <Magnetic strength={0.25}>
                    <button
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      className="p-2.5 rounded-xl glass hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground cursor-none"
                    >
                      {copiedEmail ? (
                        <Check size={18} className="text-google-green" />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </Magnetic>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                  <div className="w-11 h-11 rounded-xl bg-google-yellow/15 text-google-yellow flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Location</p>
                    <p className="text-sm font-semibold text-foreground">Vellore, Tamil Nadu, India</p>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center gap-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Follow
                  </span>
                  <div className="flex gap-3">
                    <Magnetic strength={0.3}>
                      <a
                        href="https://github.com/Pugal-M"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Profile"
                        className="w-11 h-11 rounded-xl glass hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center transition-all cursor-none"
                      >
                        <Code size={19} />
                      </a>
                    </Magnetic>

                    <Magnetic strength={0.3}>
                      <a
                        href="https://www.linkedin.com/in/pugalarasu-m-3aa778350/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn Profile"
                        className="w-11 h-11 rounded-xl glass hover:bg-google-blue/15 text-muted-foreground hover:text-google-blue border border-black/10 dark:border-white/10 flex items-center justify-center transition-all cursor-none"
                      >
                        <Globe size={19} />
                      </a>
                    </Magnetic>
                  </div>
                </div>

              </div>
            </Reveal>
          </div>

          {/* Interactive Form with Floating Labels & Error Shake */}
          <div className="flex-[1.4]">
            <Reveal direction="left" delay={0.15}>
              <motion.form
                onSubmit={handleSubmit}
                animate={isShaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 sm:p-10 rounded-3xl border border-black/10 dark:border-white/10 space-y-6 shadow-2xl relative"
              >
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-sm font-medium"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Floating Input: Name */}
                  <FloatingField
                    id="name"
                    name="name"
                    label="Your Name *"
                    value={formData.name}
                    onChange={(val) => setFormData({ ...formData, name: val })}
                    required
                  />

                  {/* Floating Input: Email */}
                  <FloatingField
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address *"
                    value={formData.email}
                    onChange={(val) => setFormData({ ...formData, email: val })}
                    required
                  />
                </div>

                {/* Floating Input: Subject */}
                <FloatingField
                  id="subject"
                  name="subject"
                  label="Subject"
                  value={formData.subject}
                  onChange={(val) => setFormData({ ...formData, subject: val })}
                />

                {/* Floating Textarea: Message */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder=" "
                    className="peer w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 pt-6 pb-2.5 text-sm text-foreground focus:border-google-blue focus:outline-none transition-colors resize-none cursor-none"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute left-4 top-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground duration-200 transform -translate-y-2.5 scale-90 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-2.5 peer-focus:text-google-blue"
                  >
                    Your Message *
                  </label>
                </div>

                {/* Morphing Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formState !== "idle"}
                  whileHover={formState === "idle" ? { scale: 1.02 } : {}}
                  whileTap={formState === "idle" ? { scale: 0.98 } : {}}
                  className={`w-full h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-300 relative overflow-hidden cursor-none ${
                    formState === "success"
                      ? "bg-google-green text-white shadow-[0_0_25px_#34A853]"
                      : "bg-foreground text-background hover:shadow-[0_0_24px_rgba(66,133,244,0.35)]"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {formState === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <span>Send Message</span>
                        <Send size={18} />
                      </motion.span>
                    )}

                    {formState === "loading" && (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 size={20} className="animate-spin" />
                        <span>Sending...</span>
                      </motion.span>
                    )}

                    {formState === "success" && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 size={20} />
                        <span>Message Prepared!</span>
                        <motion.div
                          animate={{ x: [0, 30], y: [0, -30], opacity: [1, 0] }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                          <Send size={18} />
                        </motion.div>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.form>
            </Reveal>
          </div>

        </div>

      </div>

      {/* Floating Toast Notification on Email Copy */}
      <AnimatePresence>
        {copiedEmail && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999999] px-5 py-3 rounded-2xl glass bg-background/95 border border-google-green/40 shadow-2xl flex items-center gap-2.5 text-sm font-semibold text-foreground pointer-events-none"
          >
            <div className="w-5 h-5 rounded-full bg-google-green text-white flex items-center justify-center">
              <Check size={12} />
            </div>
            <span>Email copied to clipboard! ✨</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function FloatingField({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder=" "
        className="peer w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 pt-6 pb-2.5 text-sm text-foreground focus:border-google-blue focus:outline-none transition-colors cursor-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground duration-200 transform -translate-y-2.5 scale-90 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-2.5 peer-focus:text-google-blue"
      >
        {label}
      </label>
    </div>
  );
}
