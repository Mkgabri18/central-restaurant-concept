"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { Preloader } from "./Preloader";
import { ChevronDown, Eye, Compass, Utensils, Users, Award, Sparkles, MapPin } from "./Icons";

const TOTAL_FRAMES = 300;
const CONCURRENT_DOWNLOAD_LIMIT = 10;

/**
 * DEBUG_MODE — imposta a `true` per mostrare tutti gli overlay informativi:
 *   • Frame counter e percentuale scroll nel top HUD
 *   • Pannello narrative (le card con testo che coprono il video)
 *   • Pannello debug a destra con dettaglio sezione corrente
 *   • JOURNEY % in basso
 */
const DEBUG_MODE = false;

interface NarrativeSection {
  range: [number, number]; // [startProgress, endProgress]
  badge: string;
  tagline: string;
  headline: string;
  subtext: string;
  description: string;
  altitude: string;
  highlight: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NARRATIVE_SECTIONS: NarrativeSection[] = [
  {
    range: [0.0, 0.18],
    badge: "STAGE 01 • INITIATION",
    tagline: "N° 1 CENTRAL LIMA",
    headline: "N1 Central Lima — Table with typical recipes",
    subtext: "Marine Inception & Extreme Humboldt Current",
    description:
      "The culinary journey begins at sea level. Ancestral Peruvian preparations and rock mollusks collected along the Pacific shelf reveal the biodiversity of the Humboldt Trench.",
    altitude: "-15m • Pacific Abyss",
    highlight: "Black clam • Sea squirt • Yuyo alga • Coastal salt",
    icon: Compass,
  },
  {
    range: [0.22, 0.44],
    badge: "STAGE 02 • ARCHITECTURE",
    tagline: "CASA TÚPAC BARRANCO",
    headline: "The journey begins with the restaurant's main sala",
    subtext: "Earthy Limestone & Filtered Barranco Sunlight",
    description:
      "Stepping beyond the raw stone monoliths, the dining room unfolds in serene harmony. Natural limestone blocks and native Amazonian timber establish the spatial sanctuary.",
    altitude: "+120m • Coastal Valley",
    highlight: "Quarried limestone • Amazon cedar • Acoustic serenity",
    icon: Eye,
  },
  {
    range: [0.48, 0.70],
    badge: "STAGE 03 • PERSPECTIVE",
    tagline: "SPATIAL TRANSMUTATION",
    headline: "Flow continuing with table perspective and room change",
    subtext: "Ecosystems in Fluid Motion",
    description:
      "As spatial angles rotate, table settings reveal intricate organic vessels crafted from Andean clay and tree bark, transitioning guests toward high-altitude ecosystems.",
    altitude: "+2,800m • Sacred Valley",
    highlight: "Andean clay vessels • Amazon bark • High-altitude tubers",
    icon: Utensils,
  },
  {
    range: [0.74, 1.0],
    badge: "STAGE 04 • CULMINATION",
    tagline: "THE CULINARY LABORATORY",
    headline: "Teamwork from kitchen to sala",
    subtext: "Multidisciplinary Gastronomic Harmony",
    description:
      "Behind acoustic glass, fifty cooks, botanists, and Mater Iniciativa researchers work in seamless unison, delivering Peru's living territory directly to the table.",
    altitude: "+4,050m • High Andean Plateau",
    highlight: "Mater Research team • Kitchen synergy • Ancestral fire",
    icon: Users,
  },
];

export const RestaurantScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Preallocated image buffer: store HTMLImageElements (100% immune to 'detached' canvas error)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );

  // Tracking animation frame & lerping
  const targetFrameIndex = useRef<number>(0);
  const lerpedFrame = useRef<number>(0);
  const lastDrawnIndex = useRef<number>(-1);
  const needsRedraw = useRef<boolean>(true);
  const animationFrameId = useRef<number | null>(null);

  // Detect mobile to adapt rendering strategy
  const isMobileRef = useRef<boolean>(false);

  // UI state
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState<number>(1);
  const [activeChapter, setActiveChapter] = useState<number>(0);

  // Framer motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Format frame filename
  const getFrameUrl = (index: number) => {
    const frameNum = String(index + 1).padStart(4, "0");
    return `/frames/central_frame_${frameNum}.webp`;
  };

  /**
   * Safe draw function.
   * - Desktop (landscape viewport): object-contain — mantiene l'intero frame visibile.
   * - Mobile (portrait viewport): object-cover centrato — riempie lo schermo evitando
   *   le enormi bande nere che si formerebbero con frame 16:9 su viewport 9:16.
   */
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cWidth = canvas.width;
    const cHeight = canvas.height;

    // Exact background match: #121621
    ctx.fillStyle = "#121621";
    ctx.fillRect(0, 0, cWidth, cHeight);

    // Find requested frame or nearest available neighbor
    let imgToDraw = imagesRef.current[frameIdx];
    if (!imgToDraw) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        if (frameIdx - offset >= 0 && imagesRef.current[frameIdx - offset]) {
          imgToDraw = imagesRef.current[frameIdx - offset];
          break;
        }
        if (frameIdx + offset < TOTAL_FRAMES && imagesRef.current[frameIdx + offset]) {
          imgToDraw = imagesRef.current[frameIdx + offset];
          break;
        }
      }
    }

    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      return;
    }

    const imgWidth = imgToDraw.naturalWidth;
    const imgHeight = imgToDraw.naturalHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (isMobileRef.current) {
      // object-cover: scala fino a riempire il canvas, centra e ritaglia leggermente
      // Evita le bande nere enormi su viewport portrait con frame 16:9
      const scale = Math.max(cWidth / imgWidth, cHeight / imgHeight);
      drawWidth = imgWidth * scale;
      drawHeight = imgHeight * scale;
      offsetX = (cWidth - drawWidth) / 2;
      offsetY = (cHeight - drawHeight) / 2;
    } else {
      // object-contain: mantiene tutto il frame visibile (desktop/landscape)
      const scale = Math.min(cWidth / imgWidth, cHeight / imgHeight);
      drawWidth = imgWidth * scale;
      drawHeight = imgHeight * scale;
      offsetX = (cWidth - drawWidth) / 2;
      offsetY = (cHeight - drawHeight) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    try {
      ctx.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight);
      lastDrawnIndex.current = frameIdx;
    } catch (e) {
      // Graceful error trap to avoid breaking rAF loop
      console.warn("drawImage trap:", e);
    }
  }, []);

  // Responsive Retina buffer scaler — aggiorna anche isMobileRef
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Aggiorna flag mobile: portrait oppure larghezza < 768px
    isMobileRef.current = window.innerWidth < 768 || window.innerHeight > window.innerWidth;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    const newWidth = Math.floor(rect.width * dpr);
    const newHeight = Math.floor(rect.height * dpr);

    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;
      needsRedraw.current = true;
      drawFrame(targetFrameIndex.current);
    }
  }, [drawFrame]);

  // Robust asset preloading pipeline
  useEffect(() => {
    let isCancelled = false;
    let completed = 0;

    // Load individual frame with asynchronous off-main-thread decode()
    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index);

        const onDone = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            completed++;
            setLoadedCount(completed);

            // Paint first frame immediately on arrival
            if (completed === 1) {
              handleResize();
              drawFrame(0);
            }

            // Flag redraw when current frame arrives
            if (Math.round(lerpedFrame.current) === index) {
              needsRedraw.current = true;
            }

            // Once 40 frames are loaded, reveal site and load remaining frames in background
            if (completed >= 40 && !isReady) {
              setIsReady(true);
            }
          }
          resolve();
        };

        if ("decode" in img) {
          img
            .decode()
            .then(onDone)
            .catch(() => {
              img.onload = onDone;
              img.onerror = () => resolve();
            });
        } else {
          img.onload = onDone;
          img.onerror = () => resolve();
        }
      });
    };

    // Parallel queue with priority order:
    // First load frames 0..30 (initial view), then sample checkpoints, then full sequence
    const loadAllFrames = async () => {
      const priorityQueue: number[] = [];
      // 1. Initial 30 frames for instantaneous start
      for (let i = 0; i < 30; i++) priorityQueue.push(i);
      // 2. Milestone checkpoints across whole video
      for (let i = 30; i < TOTAL_FRAMES; i += 10) priorityQueue.push(i);
      // 3. Fill in all remaining frames
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (!priorityQueue.includes(i)) priorityQueue.push(i);
      }

      let cursor = 0;
      const worker = async () => {
        while (cursor < priorityQueue.length && !isCancelled) {
          const idx = priorityQueue[cursor++];
          if (idx !== undefined && !imagesRef.current[idx]) {
            await loadFrame(idx);
          }
        }
      };

      const workers = Array.from({ length: CONCURRENT_DOWNLOAD_LIMIT }, () => worker());
      await Promise.all(workers);

      if (!isCancelled) {
        setIsReady(true);
      }
    };

    loadAllFrames();

    return () => {
      isCancelled = true;
      // Do NOT call bitmap.close() - HTMLImageElements safely garbage collect
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run ONLY once on mount!

  // High-performance 60fps render loop with lerping
  useEffect(() => {
    const loop = () => {
      const target = targetFrameIndex.current;
      const diff = target - lerpedFrame.current;

      // Lerp leggermente più veloce su mobile per compensare il momentum scroll di iOS
      const lerpFactor = isMobileRef.current ? 0.28 : 0.22;
      if (Math.abs(diff) > 0.05) {
        lerpedFrame.current += diff * lerpFactor;
      } else {
        lerpedFrame.current = target;
      }

      const frameToDraw = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(lerpedFrame.current))
      );

      if (frameToDraw !== lastDrawnIndex.current || needsRedraw.current) {
        drawFrame(frameToDraw);
        needsRedraw.current = false;
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [drawFrame]);

  // Window resize listener
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Dual Scroll Tracking: Native listener + Framer Motion for 100% rock-solid alignment
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Progress is exactly the fraction of container scrolled through the viewport
      const rawProgress = -rect.top / totalScrollable;
      const clampedProgress = Math.min(1, Math.max(0, rawProgress));

      const targetIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(clampedProgress * (TOTAL_FRAMES - 1)))
      );

      targetFrameIndex.current = targetIdx;
      setCurrentProgress(clampedProgress);
      setCurrentFrameDisplay(targetIdx + 1);

      const chapterIdx = NARRATIVE_SECTIONS.findIndex(
        (sec) => clampedProgress >= sec.range[0] && clampedProgress <= sec.range[1]
      );
      if (chapterIdx !== -1) {
        setActiveChapter(chapterIdx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial computation
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Framer Motion useScroll backup listener
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clampedProgress = Math.min(1, Math.max(0, latest));
    const targetIdx = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.floor(clampedProgress * (TOTAL_FRAMES - 1)))
    );

    targetFrameIndex.current = targetIdx;
    setCurrentProgress(clampedProgress);
    setCurrentFrameDisplay(targetIdx + 1);

    const chapterIdx = NARRATIVE_SECTIONS.findIndex(
      (sec) => clampedProgress >= sec.range[0] && clampedProgress <= sec.range[1]
    );
    if (chapterIdx !== -1 && chapterIdx !== activeChapter) {
      setActiveChapter(chapterIdx);
    }
  });

  // Calculate live dynamic altitude
  const getDynamicAltitude = (progress: number) => {
    if (progress < 0.2) return "-15m (Sea Level)";
    if (progress < 0.45) return "+120m (Barranco Sala)";
    if (progress < 0.72) return "+2,800m (Sacred Valley)";
    return "+4,050m (Andean Kitchen Lab)";
  };

  // Jump smoothly to chapter
  const scrollToChapter = (startProgress: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerTop + containerHeight * startProgress;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <>
      {/* Loading Screen */}
      <Preloader
        progress={Math.min(100, (loadedCount / TOTAL_FRAMES) * 100)}
        isLoaded={isReady}
        totalFrames={TOTAL_FRAMES}
        loadedFrames={loadedCount}
      />

      {/* 600vh Sticky Scrollytelling Container */}
      <div
        id="journey"
        ref={containerRef}
        className="relative w-full bg-[#121621] select-none"
        style={{ height: "600vh", position: "relative" }}
      >
        {/* Sticky Viewport Stage */}
        <div
          className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-10"
          style={{ position: "sticky", top: 0, height: "100vh", width: "100%" }}
        >
          {/* HTML5 Canvas with Retina DPI */}
          <canvas
            ref={canvasRef}
            className="w-full h-full pointer-events-none block"
            style={{ backgroundColor: "#121621" }}
          />

          {/* Vignette Gradients — desktop: laterali + verticali */}
          <div className="absolute inset-0 pointer-events-none hidden md:block bg-gradient-to-t from-[#121621] via-transparent to-[#121621]/90 opacity-70" />
          <div className="absolute inset-0 pointer-events-none hidden md:block bg-gradient-to-r from-[#121621]/80 via-transparent to-[#121621]/80" />

          {/* Vignette mobile: top + bottom più netti per leggibilità testi su cover */}
          <div className="absolute inset-0 pointer-events-none md:hidden bg-gradient-to-b from-[#121621]/70 via-transparent to-[#121621]/80" />

          {/* ─────────────────────────────────────────────
              HERO INIZIALE (0% – 8% scroll)
              • Mobile: top-20 (sotto navbar h-16/h-20),
                testo abbreviato, layout a tutta larghezza
              • Desktop: top-28, lato sinistro, full text
          ───────────────────────────────────────────── */}
          <motion.div
            animate={{
              opacity: currentProgress < 0.08 ? 1 : 0,
              y: currentProgress < 0.08 ? 0 : -30,
              pointerEvents: currentProgress < 0.08 ? "auto" : "none",
            }}
            transition={{ duration: 0.5 }}
            className="absolute top-20 sm:top-24 md:top-28 left-4 right-4 sm:left-12 md:left-20 md:right-auto max-w-xl z-20"
          >
            {/* Award badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full border border-[#508ef2]/40 bg-[#508ef2]/10 text-[9px] sm:text-[10px] font-mono tracking-widest text-[#508ef2] uppercase mb-3 sm:mb-4">
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
              <span>N° 1 RESTAURANT IN THE WORLD • THE 50 BEST</span>
            </div>

            {/* Headline — scala da 4xl su mobile a 7xl su desktop */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white/95 tracking-tight mb-3 sm:mb-4">
              CENTRAL
            </h1>

            {/* Descrizione — visibile solo da sm in su */}
            <p className="hidden sm:block text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-sm sm:max-w-md mb-4 sm:mb-6">
              An immersive scrollytelling expedition across the altitudes and culinary lifecycle of
              Virgilio Martínez &amp; Pía León in Lima, Peru.
            </p>

            {/* Scroll CTA */}
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[#508ef2] tracking-widest uppercase">
              <span className="hidden sm:inline">SCROLL DOWN TO TRAVERSE THE RESTAURANT TOUR</span>
              <span className="sm:hidden">SCROLL TO EXPLORE</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────
              TOP HUD
              • Mobile: spostato a top-[68px] per non
                sovrapporsi alla navbar, label brand nascosto
              • Desktop: top-6, label brand visibile
          ───────────────────────────────────────────── */}
          <div className="absolute top-[68px] sm:top-6 left-4 right-4 sm:left-12 sm:right-12 flex justify-between items-start text-xs font-mono tracking-widest uppercase z-30 pointer-events-none">

            {/* Brand label — nascosto su mobile (già presente nella Navbar) */}
            <div className="hidden sm:flex flex-col gap-1">
              <div className="flex items-center gap-2 text-white/90">
                <span className="w-2 h-2 rounded-full bg-[#508ef2] shadow-[0_0_8px_#508ef2]" />
                <span className="font-semibold text-[#508ef2]">CENTRAL EXPERIENCE</span>
              </div>
              <span className="text-white/40 text-[10px]">
                MATER INICIATIVA RESEARCH LAB
              </span>
            </div>

            {/* Altitude e frame counter — solo in DEBUG_MODE */}
            {DEBUG_MODE && (
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden sm:flex flex-col items-end text-right">
                  <span className="text-white/40 text-[10px]">CURRENT ALTITUDE</span>
                  <span className="text-[#508ef2] font-semibold text-xs tracking-wider">
                    {getDynamicAltitude(currentProgress)}
                  </span>
                </div>
                <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 bg-[#121621]/80 backdrop-blur-md text-[9px] sm:text-[10px] text-white/80">
                  F {String(currentFrameDisplay).padStart(3, "0")}/{TOTAL_FRAMES}
                </div>
              </div>
            )}
          </div>

          {/* Narrative Storyline Cards — solo in DEBUG_MODE */}
          {DEBUG_MODE && (
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center px-4 sm:px-12 md:px-20 z-20">
              <div className="w-full max-w-xs sm:max-w-xl pointer-events-auto">
                <AnimatePresence mode="wait">
                  {NARRATIVE_SECTIONS.map((sec, idx) => {
                    const isVisible =
                      currentProgress >= sec.range[0] && currentProgress <= sec.range[1];

                    if (!isVisible) return null;

                    const IconComponent = sec.icon;

                    return (
                      <motion.div
                        key={`narrative-${idx}`}
                        initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                        }}
                        exit={{
                          opacity: 0,
                          y: -30,
                          filter: "blur(8px)",
                          transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] },
                        }}
                        className="glass-panel p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#508ef2] to-transparent opacity-80" />

                        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                          <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#508ef2] uppercase">
                            <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            {sec.badge}
                          </span>
                          <span className="hidden sm:inline text-[10px] font-mono text-white/40 tracking-wider">
                            {sec.altitude}
                          </span>
                        </div>

                        <p className="text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase text-white/60 mb-1">
                          {sec.tagline}
                        </p>

                        <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-white/95 leading-tight mb-2 tracking-tight">
                          {sec.headline}
                        </h2>

                        <p className="text-[10px] sm:text-xs font-mono text-[#508ef2] mb-3 sm:mb-4 tracking-wider">
                          {sec.subtext}
                        </p>

                        <p className="hidden sm:block text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-4 sm:mb-5">
                          {sec.description}
                        </p>

                        <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-start sm:items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/50 gap-2">
                          <span className="text-[#508ef2] flex-shrink-0">ELEMENTS:</span>
                          <span className="italic text-white/75 text-right leading-tight">{sec.highlight}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Pannello debug a destra — solo in DEBUG_MODE */}
          {DEBUG_MODE && (
            <div className="absolute top-24 right-4 sm:right-12 w-44 sm:w-56 z-30 pointer-events-none">
              <div className="glass-panel rounded-xl border border-[#508ef2]/30 p-3 sm:p-4 text-[10px] font-mono space-y-2 relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#508ef2]/60 to-transparent rounded-t-xl" />

                <div className="text-[#508ef2] tracking-widest uppercase mb-1 font-semibold text-[9px]">
                  Debug Panel
                </div>

                <div className="flex justify-between text-white/60">
                  <span>Scroll</span>
                  <span className="text-white/90">{Math.round(currentProgress * 100)}%</span>
                </div>

                <div className="flex justify-between text-white/60">
                  <span>Frame</span>
                  <span className="text-white/90">
                    {String(currentFrameDisplay).padStart(3, "0")} / {TOTAL_FRAMES}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-2 mt-1">
                  <div className="text-white/40 uppercase tracking-widest text-[8px] mb-1">Sezione attiva</div>
                  {activeChapter !== -1 && NARRATIVE_SECTIONS[activeChapter] ? (
                    <>
                      <div className="text-[#508ef2] mb-0.5">{NARRATIVE_SECTIONS[activeChapter].badge}</div>
                      <div className="text-white/70 leading-relaxed">
                        {NARRATIVE_SECTIONS[activeChapter].tagline}
                      </div>
                      <div className="text-white/40 mt-1">
                        Range: {Math.round(NARRATIVE_SECTIONS[activeChapter].range[0] * 100)}%
                        {" – "}
                        {Math.round(NARRATIVE_SECTIONS[activeChapter].range[1] * 100)}%
                      </div>
                    </>
                  ) : (
                    <div className="text-white/30 italic">Nessuna sezione attiva</div>
                  )}
                </div>

                <div className="pt-1">
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#508ef2] rounded-full transition-all duration-100"
                      style={{ width: `${Math.round(currentProgress * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────
              BOTTOM HUD
              • Mobile: compatto, solo i dot, ChevronDown
                senza testo, safe-area bottom
              • Desktop: layout orizzontale con testo
          ───────────────────────────────────────────── */}
          <div className="absolute bottom-6 sm:bottom-8 left-4 right-4 sm:left-12 sm:right-12 flex flex-row sm:flex-row items-center justify-between gap-2 sm:gap-4 z-30 pointer-events-auto">

            {/* Chapter Jump Dots */}
            <div className="flex items-center gap-2 sm:gap-3 glass-panel px-3 sm:px-4 py-2 rounded-full border border-white/10">
              {NARRATIVE_SECTIONS.map((sec, idx) => {
                const isActive =
                  currentProgress >= sec.range[0] && currentProgress <= sec.range[1];
                return (
                  <button
                    key={`dot-${idx}`}
                    onClick={() => scrollToChapter(sec.range[0])}
                    className="group flex items-center gap-1.5 sm:gap-2 py-1 focus:outline-none"
                    title={sec.headline}
                  >
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-6 sm:w-8 bg-[#508ef2] shadow-[0_0_10px_#508ef2]"
                          : "w-2 bg-white/20 group-hover:bg-white/50"
                      }`}
                    />
                    <span
                      className={`hidden lg:inline text-[9px] font-mono tracking-widest uppercase transition-colors ${
                        isActive ? "text-white/90" : "text-white/30 group-hover:text-white/60"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scroll Indicator — solo l'icona su mobile, testo su sm+ */}
            <motion.div
              animate={{ opacity: currentProgress < 0.05 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-white/50 tracking-widest uppercase pointer-events-none"
            >
              <span className="hidden sm:inline">SCROLL TO ADVANCE SEQUENCE</span>
              <ChevronDown className="w-4 h-4 text-[#508ef2] animate-bounce" />
            </motion.div>

            {/* Progress Percentage — solo in DEBUG_MODE */}
            {DEBUG_MODE && (
              <div className="text-[10px] sm:text-xs font-mono text-white/40 tracking-wider">
                <span className="text-[#508ef2] font-semibold">
                  {Math.round(currentProgress * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
