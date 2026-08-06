"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, Maximize2, X } from "lucide-react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { certificates } from "@/data/certifications";

export function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedData = certificates.find((c) => c.id === selectedCert);

  return (
    <section id="certifications" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Licenses & <span className="text-google-green">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glarePosition="all"
                className="h-full rounded-3xl p-1 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-google-blue/10 via-google-red/10 to-google-yellow/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative h-full flex flex-col bg-card border border-border/50 rounded-[22px] overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                  <div 
                    className="relative w-full aspect-[16/9] bg-muted overflow-hidden cursor-pointer"
                    onClick={() => setSelectedCert(cert.id)}
                  >
                    <Image
                      src={cert.imageUrl}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 backdrop-blur-[2px]">
                      <Maximize2 className="text-white w-8 h-8 mb-2" />
                      <span className="text-white font-medium text-sm">Preview</span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                      <Award size={16} className="text-google-yellow" />
                      <span className="text-sm font-medium">{cert.issuer}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-google-blue transition-colors">
                      {cert.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-auto pt-4">
                      Issued: {cert.dateIssued}
                    </p>

                    {cert.credentialUrl && (
                      <div className="pt-6">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium hover:text-google-blue transition-colors cursor-none"
                        >
                          View Credential <ExternalLink size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedCert && selectedData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 sm:p-8"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl aspect-[1.4/1] bg-black/80 rounded-2xl border border-white/10 shadow-2xl p-4 md:p-8 flex flex-col"
              >
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="relative w-full h-full flex items-center justify-center p-2">
                  <img
                    src={selectedData.modalImageUrl || selectedData.imageUrl || ""}
                    alt="Certificate Preview"
                    className="max-w-full max-h-full rounded-xl shadow-lg"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
