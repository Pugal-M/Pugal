"use client";

import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Code, Globe, MessageCircle } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:pugalarasu04@gmail.com?subject=${encodeURIComponent(subject || "Portfolio Contact")}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Let's <span className="text-google-green">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to build something amazing? Drop me a message.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-5xl mx-auto">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8"
          >
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

              <ContactItem icon={<Mail className="text-google-red" />} label="Email" value="pugalarasu04@gmail.com" />
              <ContactItem icon={<MapPin className="text-google-yellow" />} label="Location" value="Vellore, Tamil Nadu, India" />

              <div className="pt-8 flex gap-4 border-t border-black/10 dark:border-white/10">
                <SocialButton icon={<Code />} href="https://github.com/Pugal-M" color="hover:bg-black/10 dark:hover:bg-white/20" />
                <SocialButton icon={<Globe />} href="https://www.linkedin.com/in/pugalarasu-m-3aa778350/" color="hover:bg-google-blue/20 hover:text-google-blue" />
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-[1.5]"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-google-blue/5 via-google-green/5 to-google-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FloatingInput label="Name" type="text" id="name" name="name" required />
                  <FloatingInput label="Email" type="email" id="email" name="email" required />
                </div>
                <FloatingInput label="Subject" type="text" id="subject" name="subject" required />
                <FloatingTextArea label="Message" id="message" name="message" required />

                <motion.button
                  type="submit"
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 bg-foreground text-background py-4 rounded-xl font-bold text-lg relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message
                    <motion.div
                      animate={{ x: isHovered ? 5 : 0, y: isHovered ? -5 : 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Send size={20} />
                    </motion.div>
                  </span>

                  {/* Button hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-google-blue via-google-red to-google-yellow opacity-0 hover:opacity-20 transition-opacity duration-300" />
                </motion.button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function SocialButton({ icon, href, color }: { icon: React.ReactNode, href: string, color: string }) {
  return (
    <a href={href} className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all ${color}`}>
      {icon}
    </a>
  );
}

function FloatingInput({ label, type, id, name, required }: { label: string, type: string, id: string, name: string, required?: boolean }) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        className="block px-4 pb-2.5 pt-6 w-full text-sm text-foreground bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-google-blue peer transition-colors"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-google-blue"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextArea({ label, id, name, required }: { label: string, id: string, name: string, required?: boolean }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        rows={5}
        required={required}
        className="block px-4 pb-2.5 pt-6 w-full text-sm text-foreground bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-google-blue peer transition-colors resize-none"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-google-blue"
      >
        {label}
      </label>
    </div>
  );
}
