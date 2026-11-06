"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Sparkles } from "./Icons";

export const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative w-full py-32 px-6 md:px-16 bg-[#121621] text-white border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Spatial Narrative */}
          <div>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#508ef2] mb-3 block">
              03 • CASA TÚPAC BARRANCO
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-white/95 tracking-tight leading-tight mb-8">
              The Architecture of Stillness &amp; Precision
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
              Housed within Casa Túpac in the bohemian enclave of Barranco, Central was
              engineered to dissolve the boundary between guest, dining room, and kitchen.
              Massive limestone blocks cut from Peruvian quarries regulate the room&apos;s
              temperature and acoustic presence.
            </p>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-8">
              A monumental sheet of acoustic glass divides the kitchen from the main sala.
              Diners observe the intense, silent choreography of fifty cooks, biologists, and
              artisans preparing dishes that span 4,000 meters of vertical altitude.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="font-serif text-3xl font-light text-[#508ef2] block mb-1">
                  14
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">
                  ALTITUDE COURSES
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl font-light text-[#508ef2] block mb-1">
                  4.5h
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">
                  DEGUSTATION TIME
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl font-light text-[#508ef2] block mb-1">
                  100%
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/50">
                  PERUVIAN ENDEMISM
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Degustation Menus Showcase */}
          <div className="flex flex-col gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-[#508ef2]/50 transition-all relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#508ef2]">
                  SIGNATURE MENU
                </span>
                <span className="text-xs font-mono text-white/40">14 ECOSYSTEMS</span>
              </div>
              <h3 className="font-serif text-2xl font-light text-white/95 mb-2">
                Experiencia Territorio en Desnivel
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed mb-4">
                A complete expedition traversing from -15m beneath the Pacific Ocean, up to the
                extreme Andean altitudes at 4,200m, and descending into the dense Amazon basin.
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-4 border-t border-white/5">
                <span>TIME: 4 HOURS</span>
                <span className="text-[#508ef2]">RESERVATIONS ESSENTIAL</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-[#508ef2]/50 transition-all relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#508ef2]">
                  RESEARCH MENU
                </span>
                <span className="text-xs font-mono text-white/40">12 ECOSYSTEMS</span>
              </div>
              <h3 className="font-serif text-2xl font-light text-white/95 mb-2">
                Creatividad del Mundo Mater
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed mb-4">
                A focused exploration into newly cataloged botanical species and ancestral
                fermentations developed in collaboration with indigenous communities.
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-4 border-t border-white/5">
                <span>TIME: 3.5 HOURS</span>
                <span className="text-[#508ef2]">CURATED PAIRINGS</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
