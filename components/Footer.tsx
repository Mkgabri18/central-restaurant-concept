"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Award, Mail, Phone, MapPin } from "./Icons";

export const Footer: React.FC = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
      setTimeout(() => setEmailSubmitted(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer
      id="reservations"
      className="relative w-full bg-[#121621] text-white pt-24 pb-16 px-6 md:px-16 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Booking Card */}
        <div className="glass-panel p-8 md:p-16 rounded-3xl border border-[#508ef2]/20 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#508ef2]/10 blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#508ef2] mb-3 block">
                04 • RESERVATIONS &amp; VISITS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-white/95 leading-tight mb-6">
                Reserve Your Table at Central
              </h2>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                Reservations open on the first day of every trimester for the upcoming four months.
                Due to limited seating in the main sala, early booking is recommended.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://centralrestaurante.com.pe/en/default.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#508ef2] text-[#121621] hover:bg-[#78abf8] font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-[0_0_20px_rgba(80,142,242,0.4)]"
                >
                  <span>Book Via Official Platform</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Newsletter / Priority Notification */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="font-serif text-lg font-light text-white/90 mb-2">
                Table Release Notifications
              </h3>
              <p className="text-xs text-white/60 font-light mb-4">
                Receive early notification when reservation windows open for private dining and
                seasonal menu updates.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#508ef2] focus:outline-none text-xs text-white placeholder-white/30 font-mono transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl border border-[#508ef2]/40 bg-[#508ef2]/10 hover:bg-[#508ef2] hover:text-[#121621] text-xs font-mono uppercase tracking-widest text-[#508ef2] font-medium transition-all flex items-center justify-center gap-2"
                >
                  {emailSubmitted ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <span>Subscribe to Openings</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Practical Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-white/5 text-xs">
          <div>
            <div className="font-serif text-xl tracking-widest uppercase font-light text-white/95 mb-4">
              CENTRAL
            </div>
            <p className="text-white/60 font-light leading-relaxed mb-4">
              Member of Relais &amp; Châteaux. Awarded N° 1 Restaurant in the World by The
              World&apos;s 50 Best Restaurants.
            </p>
            <div className="flex items-center gap-2 text-[#508ef2] font-mono">
              <Award className="w-4 h-4" />
              <span>THE BEST OF THE BEST</span>
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/40 block mb-4">
              LOCATION
            </span>
            <p className="text-white/80 font-light leading-relaxed mb-2 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#508ef2] shrink-0 mt-0.5" />
              <span>
                Av. Pedro de Osma 301,
                <br />
                Barranco 15063, Lima, Perú
              </span>
            </p>
            <span className="font-mono text-[10px] text-white/40 block">
              12°08&apos;49.2&quot;S 77°01&apos;26.6&quot;W
            </span>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/40 block mb-4">
              SERVICE HOURS
            </span>
            <p className="text-white/80 font-light leading-relaxed mb-2">
              <strong className="text-white/95">Lunch:</strong> Monday – Saturday
              <br />
              12:45 to 13:45
            </p>
            <p className="text-white/80 font-light leading-relaxed">
              <strong className="text-white/95">Dinner:</strong> Monday – Saturday
              <br />
              19:00 to 20:30
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/40 block mb-4">
              COMMUNICATIONS
            </span>
            <p className="text-white/80 font-light leading-relaxed mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#508ef2]" />
              <span>reservas@centralrestaurante.com.pe</span>
            </p>
            <p className="text-white/80 font-light leading-relaxed flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#508ef2]" />
              <span>+51 1 242 8515</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
          <div>© {new Date().getFullYear()} CENTRAL RESTAURANTE. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-6">
            <span>MATER INICIATIVA</span>
            <span>KJOLLE</span>
            <span>MIL MORAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
