"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  progress: number;
  isLoaded: boolean;
  totalFrames: number;
  loadedFrames: number;
}

export const Preloader: React.FC<PreloaderProps> = ({
  progress,
  isLoaded,
  totalFrames,
  loadedFrames,
}) => {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#121621] px-6 py-12 md:px-16 md:py-16 text-[#f4f6fa] select-none"
        >
          {/* Top Brand Marker */}
          <div className="w-full flex justify-between items-center text-xs tracking-widest uppercase text-white/50 font-mono">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#508ef2] animate-pulse" />
              MATER INICIATIVA
            </span>
            <span className="hidden sm:inline">LIMA, PERÚ • 12°08&apos;49.2&quot;S 77°01&apos;26.6&quot;W</span>
            <span className="text-[#508ef2]">N° 1 WORLD RESTAURANT</span>
          </div>

          {/* Centerpiece: Editorial Title & Progress */}
          <div className="flex flex-col items-center text-center max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs uppercase tracking-[0.3em] text-[#508ef2] font-mono mb-3"
            >
              The Scrollytelling Experience
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white/95 mb-6"
            >
              C E N T R A L
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base text-white/60 font-light italic max-w-md mb-12"
            >
              &ldquo;In a world driven by time, we choose to navigate across altitudes.&rdquo;
            </motion.p>

            {/* Circular / Linear Progress Bar */}
            <div className="w-full max-w-md flex flex-col items-center gap-3">
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-[#508ef2] shadow-[0_0_12px_#508ef2]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.15 }}
                />
              </div>

              <div className="w-full flex justify-between items-center text-xs font-mono text-white/50">
                <span className="tracking-widest">
                  DECODING FRAMES [{loadedFrames}/{totalFrames}]
                </span>
                <span className="text-[#508ef2] font-semibold tracking-wider">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Footnote */}
          <div className="w-full flex justify-between items-center text-[10px] tracking-widest uppercase text-white/40 font-mono">
            <span>OFF-MAIN-THREAD BITMAP PIPELINE</span>
            <span>60 FPS SCROLL-LINKED ENGINE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

