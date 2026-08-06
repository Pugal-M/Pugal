"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 py-12 mt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <div className="text-xl font-bold tracking-tighter flex">
              <span className="text-google-blue">P</span>
              <span className="text-google-red">U</span>
              <span className="text-google-yellow">G</span>
              <span className="text-google-blue">A</span>
              <span className="text-google-green">L</span>
              <span className="text-google-red">.</span>
            </div>
            <span className="text-muted-foreground text-sm">© {new Date().getFullYear()}</span>
          </motion.div>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          >
            <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-google-blue/20 transition-colors">
              <Rocket size={20} className="group-hover:-translate-y-1 group-hover:text-google-blue transition-transform" />
            </div>
            <span className="text-xs font-medium uppercase tracking-widest">Back to top</span>
          </motion.button>
          
        </div>
      </div>
      
      {/* Footer bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-google-blue to-transparent opacity-50" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-lg h-24 bg-google-blue opacity-20 blur-[100px]" />
    </footer>
  );
}
