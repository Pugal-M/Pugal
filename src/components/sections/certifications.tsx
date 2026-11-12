"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, Maximize2, X, Sparkles } from "lucide-react";
import Image from "next/image";
import { certificates } from "@/data/certifications";
import { TiltCard } from "@/components/primitives/tilt-card";
import { Reveal } from "@/components/primitives/reveal";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function CertificationsSection() {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const selectedData = certificates.find((c) => c.id === selectedCert);

  return (
    <section id="certifications" className="relative py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20">
          <Reveal direction="down">
            <span className="text-xs uppercase font-bold tracking-widest text-google-green px-3 py-1 rounded-full bg-google-green/10 border border-google-green/20 inline-flex items-center gap-1.5">
              <Sparkles size={14} />
              Validated Skills
            </span>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mt-4 mb-6">
              Licenses &amp; <span className="text-google-green">Certifications</span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional credentials in cloud infrastructure, mobile development,
              and full-stack engineering.
            </p>
          </Reveal>
        </div>

        {/* Certificates Grid with 3D Tilt and Shine Sweep */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <Reveal key={cert.id} direction="up" delay={index * 0.08}>
              <TiltCard
                maxAngle={7}
                perspective={1000}
                glareOpacity={0.25}
                className="h-full rounded-3xl p-1 relative group cursor-none shadow-xl border border-black/10 dark:border-white/10 hover:border-google-green/40 transition-colors"
              >
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-google-green/10 via-google-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

                <div className="relative h-full flex flex-col bg-card rounded-[22px] overflow-hidden">
                  
                  {/* Thumbnail & Preview Trigger */}
                  <div
                    className="relative w-full aspect-[16/10] bg-muted overflow-hidden cursor-pointer"
                    onClick={() => setSelectedCert(cert.id)}
                  >
                    <Image
                      src={cert.imageUrl}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* High-Gloss Shine Sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.2s_ease-in-out] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 backdrop-blur-[2px]">
                      <div className="p-3 rounded-full bg-white/20 text-white mb-2 shadow-lg">
                        <Maximize2 size={22} />
                      </div>
                      <span className="text-white font-semibold text-xs uppercase tracking-wider">
                        Expand Certificate
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center gap-2 mb-2.5 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                      <Award size={16} className="text-google-yellow" />
                      <span>{cert.issuer}</span>
                    </div>

                    <h3 className="text-lg font-bold mb-3 group-hover:text-google-blue transition-colors line-clamp-2">
                      {cert.title}
                    </h3>

                    <p className="text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                      Issued: <span className="font-medium text-foreground/80">{cert.dateIssued}</span>
                    </p>

                    {cert.credentialUrl && (
                      <div className="pt-4">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-google-blue hover:underline cursor-none"
                        >
                          <span>Verify Credential</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    )}
                  </div>

                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

      </div>

      {/* Lightbox Modal with Spring Zoom */}
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {selectedCert && selectedData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="fixed inset-0 z-[99999] flex items-center justify-center bg-background/85 backdrop-blur-md p-4 sm:p-8"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl aspect-[1.4/1] bg-black/90 rounded-3xl border border-white/15 shadow-2xl p-4 md:p-6 flex flex-col overflow-hidden"
                >
                  <button
                    onClick={() => setSelectedCert(null)}
                    aria-label="Close Certificate Preview"
                    className="absolute top-4 right-4 z-20 p-2.5 bg-white/15 hover:bg-white/25 text-white rounded-full backdrop-blur-md transition-colors"
                  >
                    <X size={20} />
                  </button>

                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={selectedData.modalImageUrl || selectedData.imageUrl || ""}
                      alt={selectedData.title}
                      fill
                      sizes="(max-width: 1200px) 100vw, 900px"
                      className="object-contain rounded-xl"
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
