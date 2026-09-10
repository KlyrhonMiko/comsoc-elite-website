"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRightLeft } from "lucide-react";
import {
  comsocOfficers,
  ccsElites,
  facultyAdviser,
} from "@/lib/data/officers";
import type { Officer, Team } from "@/lib/data/officers";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" } as const,
  transition: { duration: 0.8, ease },
};

/* ────────────────────────────────────────────────────────────
   CardFace — one side of the flip card (portrait + text)
   ──────────────────────────────────────────────────────────── */
function CardFace({ officer }: { officer: Officer }) {
  return (
    <div className="flex flex-col w-full aspect-[4/5] border border-white/10 bg-white/[0.02]">
      {/* Portrait */}
      <div className="relative w-full h-full overflow-hidden border-b border-white/10 bg-[#0c0c0e]">
        {officer.image ? (
          <Image
            src={officer.image}
            alt={officer.name}
            fill
            className="object-cover contrast-125"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        ) : (
          <svg
            viewBox="0 0 200 250"
            className="absolute inset-0 w-full h-full text-white/[0.06]"
            aria-hidden="true"
          >
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <circle cx="100" cy="78" r="34" />
              <path d="M40 250c6-46 32-70 60-70s54 24 60 70" />
              <line x1="0" y1="250" x2="200" y2="250" strokeWidth="4" />
            </g>
          </svg>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/60 via-transparent to-transparent pointer-events-none" />
      </div>
      {/* Text */}
      <div className="flex flex-col gap-2 px-6 py-6 md:px-8 md:py-7 text-center">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-heading font-bold">
          {officer.role}
        </div>
        <div className="text-lg md:text-xl font-display uppercase tracking-[0.12em] text-white min-h-[2rem] flex items-center justify-center">
          {officer.name}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   FlippableCard — 3D flip card with front + back faces + tilt
   ──────────────────────────────────────────────────────────── */
function FlippableCard({
  front,
  back,
  flipped,
  delay = 0,
}: {
  front: Officer;
  back: Officer;
  flipped: boolean;
  delay?: number;
}) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * 12,
      rotateY: (x - 0.5) * 12,
      scale: 1.03,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.8, delay, ease }}
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
          transformStyle: "preserve-3d",
        }}
      >
        <div style={{ perspective: 1000 }}>
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, delay: delay * 0.5, ease }}
            className="relative w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front face (COMSOC) — normal flow, establishes height */}
            <motion.div
              animate={{ opacity: flipped ? 0 : 1 }}
              transition={{ duration: 0.3, delay: delay * 0.5 }}
            >
              <CardFace officer={front} />
            </motion.div>

            {/* Back face (CCS ELITES) — absolute overlay */}
            <motion.div
              animate={{ opacity: flipped ? 1 : 0 }}
              transition={{ duration: 0.3, delay: delay * 0.5 }}
              className="absolute inset-0 w-full h-full"
              style={{ transform: "rotateY(180deg)" }}
            >
              <CardFace officer={back} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────
   TierConnector — vertical line between tiers
   ──────────────────────────────────────────────────────────── */
function TierConnector() {
  return (
    <div className="flex flex-col items-center my-4 md:my-6">
      <div className="w-px h-6 md:h-10 bg-white/15" />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   OrgPyramid — renders the flippable pyramid for both orgs
   ──────────────────────────────────────────────────────────── */
function OrgPyramid({ flipped }: { flipped: boolean }) {
  const comsocTiers = comsocOfficers.tiers;
  const elitesTiers = ccsElites.tiers;

  return (
    <motion.div {...fadeUp} className="flex flex-col items-center w-full">
      {/* Org label */}
      <div className="w-full flex items-center gap-6 mb-10 md:mb-14">
        <div className="h-px flex-1 bg-white/10" />
        <AnimatePresence mode="wait">
          <motion.h3
            key={flipped ? "elites" : "comsoc"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="text-xs md:text-sm font-heading font-bold tracking-[0.3em] uppercase text-white/50 whitespace-nowrap"
          >
            {flipped ? ccsElites.name : comsocOfficers.name}
          </motion.h3>
        </AnimatePresence>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Pyramid tiers — fixed card width, centered */}
      <div className="flex flex-col items-center w-full">
        {comsocTiers.map((comsocTier, tierIndex) => {
          const elitesTier = elitesTiers[tierIndex];
          const globalOffset = comsocTiers
            .slice(0, tierIndex)
            .reduce((sum, t) => sum + t.length, 0);

          return (
            <div key={tierIndex}>
              {tierIndex > 0 && <TierConnector />}
              <div className="flex justify-center gap-4 md:gap-6">
                {comsocTier.map((comsocOfficer, i) => (
                  <div key={comsocOfficer.name} className="w-[140px] md:w-[200px] shrink-0">
                    <FlippableCard
                      front={comsocOfficer}
                      back={elitesTier[i]}
                      flipped={flipped}
                      delay={(globalOffset + i) * 0.05}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────
   Main Section
   ──────────────────────────────────────────────────────────── */
export default function OfficersSection() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section
      id="officers"
      className="bg-[#121212] w-full relative overflow-hidden font-sans text-white py-32 px-6 md:px-12 lg:px-16 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-20 md:gap-28 relative z-10">
        {/* Section Header */}
        <motion.div
          {...fadeUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <div>
            <div className="text-xl md:text-2xl font-light text-white/50 mb-4 font-heading tracking-wider">
              \\ 04
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-light tracking-[0.15em] leading-[1] uppercase text-white">
              Officers <br /> &amp; Teams
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/70 leading-relaxed font-sans max-w-md">
            The dedicated teams leading our organizations, driving innovation, and ensuring the success of our initiatives.
          </p>
        </motion.div>

        {/* ── Toggle Button ── */}
        <motion.div {...fadeUp} className="flex justify-center">
          <button
            onClick={() => setFlipped((f) => !f)}
            className="group flex items-center gap-3 border border-white/15 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.05] rounded-full px-6 py-3 transition-all duration-500"
          >
            <ArrowRightLeft className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors duration-500" />
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-heading font-bold text-white/60 group-hover:text-white/90 transition-colors duration-500">
              {flipped ? "View COMSOC" : "View ELITES"}
            </span>
          </button>
        </motion.div>

        {/* ── Pyramid (flippable) ── */}
        <OrgPyramid flipped={flipped} />

        {/* ── Faculty Adviser + Contact ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 pt-20 border-t border-white/10">

          {/* Faculty Adviser */}
          <div className="flex flex-col gap-10">
            <h3 className="text-sm font-heading font-bold tracking-[0.3em] uppercase text-white/50">
              Faculty Adviser
            </h3>
            <div className="flex flex-col sm:flex-row items-start gap-8 group cursor-default">
              <div className="relative w-32 h-40 overflow-hidden border border-white/10 shrink-0 group-hover:border-emerald-400/30 transition-colors duration-500">
                <svg
                  viewBox="0 0 200 250"
                  className="absolute inset-0 w-full h-full text-white/[0.06]"
                  aria-hidden="true"
                >
                  <g stroke="currentColor" strokeWidth="1" fill="none">
                    <circle cx="100" cy="78" r="34" />
                    <path d="M40 250c6-46 32-70 60-70s54 24 60 70" />
                    <line x1="0" y1="250" x2="200" y2="250" strokeWidth="4" />
                  </g>
                </svg>
              </div>
              <div className="flex flex-col pt-2 gap-4">
                <div className="text-3xl md:text-4xl font-display uppercase tracking-[0.1em] text-white">
                  {facultyAdviser.name}
                </div>
                <div className="text-base font-sans text-white/60">
                  {facultyAdviser.department}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-10">
            <h3 className="text-sm font-heading font-bold tracking-[0.3em] uppercase text-white/50">
              Contact & HQ
            </h3>
            <div className="flex flex-col w-full">
              {[
                { label: "Email", value: "ccs.elite@university.edu", icon: "✉" },
                { label: "Office", value: "CCS Building, Room 402", icon: "📍" },
                { label: "Social", value: "@ccs_elite_org", icon: "❖" },
              ].map((info, idx) => (
                <div key={idx} className="flex justify-between items-center py-6 border-b border-white/10 group cursor-default">
                  <div className="flex items-center gap-6">
                    <span className="text-white/30 text-xl group-hover:text-emerald-400 transition-colors duration-300">
                      {info.icon}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-heading">
                      {info.label}
                    </span>
                  </div>
                  <span className="text-base md:text-lg font-sans text-white/90">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
