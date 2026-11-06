"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Award, Globe, Compass, Sparkles } from "./Icons";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 md:px-16 pt-32 pb-16 bg-[#121621] text-white overflow-hidden"
    >
      {/* Background Ambience & Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#508ef2]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      {/* Top Pre-Title & Accolades */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#508ef2]/30 bg-[#508ef2]/10 text-xs font-mono tracking-widest text-[#508ef2] uppercase">
          <Award className="w-3.5 h-3.5" />
          <span>VOTED N° 1 RESTAURANT IN THE WORLD</span>
        </div>
        <span className="hidden sm:inline text-white/30 text-xs">•</span>
        <span className="text-xs font-mono tracking-widest text-white/50 uppercase">
          THE WORLD&apos;S 50 BEST RESTAURANTS
        </span>
      </motion.div>

      {/* Central Headline */}
      <div className="flex flex-col items-center text-center max-w-4xl my-auto py-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm font-mono tracking-[0.35em] uppercase text-white/60 mb-6 flex items-center gap-3"
        >
          <span className="w-8 h-[1px] bg-white/20" />
          <span>LIMA, PERÚ • MATER INICIATIVA</span>
          <span className="w-8 h-[1px] bg-white/20" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif text-6xl sm:text-8xl md:text-9xl font-light tracking-tight text-white/95 mb-8"
        >
          CENTRAL
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-white/70 font-light max-w-2xl leading-relaxed mb-10"
        >
          An expedition across Peru&apos;s extreme altitudes and hidden ecosystems.
          Conceived by <span className="text-white/95">Virgilio Martínez</span> and{" "}
          <span className="text-white/95">Pía León</span>, Central transforms ancestral
          biodiversity into an unforgettable sensory narrative.
        </motion.p>

        {/* CTA Cluster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#journey"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#508ef2] text-[#121621] hover:bg-[#78abf8] font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(80,142,242,0.4)] hover:shadow-[0_0_35px_rgba(80,142,242,0.7)]"
          >
            <span>Begin Visual Journey</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>

          <a
            href="#philosophy"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/50 text-white/80 hover:text-white font-mono text-xs uppercase tracking-widest transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-[#508ef2]" />
            <span>Discover Alturas</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom Coordinates & Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/40 tracking-widest uppercase border-t border-white/5 pt-6"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-[#508ef2]" />
          <span>AV. PEDRO DE OSMA 301, BARRANCO — LIMA</span>
        </div>
        <div className="flex items-center gap-2 text-white/60 animate-pulse">
          <span>SCROLL DOWN TO ENTER RESTAURANT TOUR</span>
        </div>
        <div>
          <span>12°08&apos;49.2&quot;S 77°01&apos;26.6&quot;W</span>
        </div>
      </motion.div>
    </section>
  );
};
