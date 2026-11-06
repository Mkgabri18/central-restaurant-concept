"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mountain, Waves, Trees, Sparkles, Compass } from "./Icons";

const ECOSYSTEMS = [
  {
    altitude: "-15m",
    name: "Marine Current",
    region: "Pacific Ocean Shelf",
    description:
      "Deep cold waters driven by the Humboldt current. Rich in giant kelp, rock clams, sea urchins, and coastal salt crystals.",
    ingredients: ["Rock clam", "Sargassum", "Sea lettuce", "Crab essence"],
    icon: Waves,
  },
  {
    altitude: "+120m",
    name: "Coastal Oasis",
    region: "Barranco & Lomas de Lachay",
    description:
      "Arid desert foothills meeting Pacific sea fog. Wild desert carob (algarrobo), cactus fruit, and ancient herbs.",
    ingredients: ["Algarrobo", "Pitahaya", "Wild mustard", "Coastal lime"],
    icon: Compass,
  },
  {
    altitude: "+2,850m",
    name: "Amazonian Foothills",
    region: "High Jungle & Ceja de Selva",
    description:
      "Where mountain mists merge with dense rainforest canopies. Rare single-origin chuncho cacao, copoazú, and air potatoes.",
    ingredients: ["Chuncho cacao", "Copoazú", "Air potato", "Wild vanilla"],
    icon: Trees,
  },
  {
    altitude: "+4,200m",
    name: "Extreme Altitude",
    region: "Andean Cordillera & Altiplano",
    description:
      "Freezing winds and volcanic mineral soil. Thousands of heirloom native potatoes, high-altitude maca, tunta, and cushuro cyanobacteria.",
    ingredients: ["Cushuro algae", "Chuno potato", "Kiwicha", "Oxalis tuber"],
    icon: Mountain,
  },
];

export const Philosophy: React.FC = () => {
  return (
    <section
      id="philosophy"
      className="relative w-full py-32 px-6 md:px-16 bg-[#121621] text-white border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#508ef2] mb-3">
            02 • PHILOSOPHY &amp; MATER INICIATIVA
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-white/95 tracking-tight mb-6">
            Alturas Mater
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
            In Central, dishes are not arranged by courses or ingredients, but by vertical
            altitude. We travel from the subterranean abyss of the Pacific to the frozen
            heights of the Andes, creating an interconnected map of Peruvian biodiversity.
          </p>
        </div>

        {/* 4 Altitude Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ECOSYSTEMS.map((eco, idx) => {
            const Icon = eco.icon;
            return (
              <motion.div
                key={eco.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-[#508ef2]/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_10px_30px_rgba(80,142,242,0.15)]"
              >
                <div>
                  <div className="w-full flex items-center justify-between mb-6">
                    <span className="text-2xl font-serif text-[#508ef2] font-normal">
                      {eco.altitude}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 group-hover:text-[#508ef2] group-hover:border-[#508ef2]/50 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
                    {eco.region}
                  </span>
                  <h3 className="font-serif text-xl font-light text-white/95 mb-4 group-hover:text-white transition-colors">
                    {eco.name}
                  </h3>

                  <p className="text-xs text-white/60 leading-relaxed mb-6 font-light">
                    {eco.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-[#508ef2] block mb-2">
                    NATIVE HARVEST:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {eco.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/70"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Editorial Quote Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 p-8 md:p-14 rounded-3xl glass-panel border border-[#508ef2]/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#508ef2]/10 blur-[100px] pointer-events-none" />
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#508ef2] mb-4 block">
              VIRGILIO MARTÍNEZ &amp; PÍA LEÓN
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white/95 leading-snug mb-6">
              &ldquo;We don&apos;t cook to exhibit technique. We cook to celebrate the territory,
              the communities that preserve it, and the living memory of Peru.&rdquo;
            </blockquote>
            <p className="text-xs sm:text-sm font-mono text-white/50 tracking-wider">
              MATER INICIATIVA RESEARCH CENTER • MORAY, CUSCO &amp; BARRANCO, LIMA
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
