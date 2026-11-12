"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Magnetic } from "@/components/primitives/magnetic";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-black/10 dark:border-white/10 pt-20 pb-12 mt-20 overflow-hidden bg-background">
      
      {/* Giant "PUGAL." Typography Wordmark Reveal on Scroll */}
      <div className="w-full overflow-hidden flex justify-center py-6 select-none pointer-events-none">
        <motion.div
          initial={{ y: "40%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 0.08 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[20vw] font-black tracking-tighter leading-none text-foreground whitespace-nowrap"
        >
          PUGAL.
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-black/10 dark:border-white/10">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="text-xl font-black tracking-tight flex items-center">
              <span className="text-google-blue">P</span>
              <span className="text-google-red">U</span>
              <span className="text-google-yellow">G</span>
              <span className="text-google-blue">A</span>
              <span className="text-google-green">L</span>
              <span className="text-google-red">.</span>
            </div>
            <span className="text-muted-foreground text-xs font-medium">
              © {new Date().getFullYear()} Pugalarasu M. Built with passion &amp; precision.
            </span>
          </div>

          {/* Smooth Back to Top Button */}
          <Magnetic strength={0.3}>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.94 }}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full glass hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 transition-colors cursor-none outline-none select-none"
              aria-label="Back to top"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                Back to top
              </span>
              <div className="w-8 h-8 rounded-full bg-google-blue/15 text-google-blue flex items-center justify-center group-hover:bg-google-blue group-hover:text-white transition-all duration-300">
                <Rocket size={15} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </motion.button>
          </Magnetic>

        </div>
      </div>

      {/* Ambient bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-google-blue to-transparent opacity-60" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md h-20 bg-google-blue opacity-15 blur-[90px] pointer-events-none" />
    </footer>
  );
}
