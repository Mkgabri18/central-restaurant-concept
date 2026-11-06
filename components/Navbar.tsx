"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X, Compass, Sparkles } from "./Icons";

interface NavbarProps {
  currentAltitude?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentAltitude = 0 }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ambient sound synthesizer using Web Audio API (gentle organic harmonic tone)
  const toggleAmbientSound = () => {
    if (!soundActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioCtx || new AudioContextClass();
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        // Create warm ambient drone (Central Lima coastal & mountain resonance)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(108, ctx.currentTime); // Deep resonant A
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(162, ctx.currentTime); // Subtle harmonic 5th

        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        setAudioCtx(ctx);
        setSoundActive(true);
      } catch (e) {
        console.warn("Web Audio not allowed or failed:", e);
      }
    } else {
      if (audioCtx) {
        audioCtx.suspend();
      }
      setSoundActive(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#121621]/85 backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#508ef2] transition-colors">
            <span className="font-serif text-sm font-light text-white/90">C</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.2em] uppercase font-light text-white/95">
              CENTRAL
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#508ef2] uppercase">
              Lima, Perú • N° 1
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-[0.2em] text-white/70">
          <a
            href="#journey"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#508ef2] hover:after:w-full after:transition-all"
          >
            The Journey
          </a>
          <a
            href="#philosophy"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#508ef2] hover:after:w-full after:transition-all"
          >
            Alturas Mater
          </a>
          <a
            href="#experience"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#508ef2] hover:after:w-full after:transition-all"
          >
            The Sala &amp; Kitchen
          </a>
          <a
            href="#reservations"
            className="hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#508ef2] hover:after:w-full after:transition-all"
          >
            Reservations
          </a>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-4">
          {/* Sound Toggle */}
          <button
            onClick={toggleAmbientSound}
            aria-label="Toggle ambient atmosphere audio"
            className="relative p-2.5 rounded-full border border-white/10 hover:border-[#508ef2]/50 bg-white/5 hover:bg-[#508ef2]/10 text-white/80 transition-all flex items-center justify-center text-xs"
            title={soundActive ? "Mute atmosphere" : "Play subtle ambient soundscape"}
          >
            {soundActive ? (
              <Volume2 className="w-4 h-4 text-[#508ef2] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-white/50" />
            )}
          </button>

          {/* Reserve CTA */}
          <a
            href="#reservations"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#508ef2]/40 bg-[#508ef2]/10 hover:bg-[#508ef2] hover:text-[#121621] text-xs font-mono uppercase tracking-[0.2em] text-[#508ef2] font-medium transition-all duration-300 shadow-[0_0_15px_rgba(80,142,242,0.15)] hover:shadow-[0_0_25px_rgba(80,142,242,0.5)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book Table</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121621]/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 text-sm font-mono uppercase tracking-widest text-white/80 animate-in fade-in slide-in-from-top-4 duration-200">
          <a
            href="#journey"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#508ef2] transition-colors"
          >
            01. The Journey (Scroll Experience)
          </a>
          <a
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#508ef2] transition-colors"
          >
            02. Alturas Mater &amp; Philosophy
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#508ef2] transition-colors"
          >
            03. The Sala &amp; Kitchen
          </a>
          <a
            href="#reservations"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-[#508ef2] transition-colors text-[#508ef2]"
          >
            04. Reservations &amp; Inquiries
          </a>
        </div>
      )}
    </header>
  );
};
