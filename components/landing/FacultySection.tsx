"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { facultyMembers } from "@/lib/data/faculty";
import type { Faculty } from "@/lib/data/faculty";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" } as const,
  transition: { duration: 0.8, ease },
};

/* ────────────────────────────────────────────────────────────
   FacultyCard — static card (portrait + text)
   ──────────────────────────────────────────────────────────── */
function FacultyCard({
  faculty,
  delay = 0,
}: {
  faculty: Faculty;
  delay?: number;
}) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.8, delay, ease }}
      className="flex flex-col w-full aspect-[4/5] border border-white/10 bg-white/[0.02]"
    >
      {/* Portrait */}
      <div className="relative w-full h-full overflow-hidden border-b border-white/10 bg-[#0c0c0e] group">
        {faculty.image ? (
          <Image
            src={faculty.image}
            alt={faculty.name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 contrast-125 transition-all duration-500"
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
          {faculty.department}
        </div>
        <div className="text-lg md:text-xl font-display uppercase tracking-[0.12em] text-white min-h-[2rem] flex items-center justify-center">
          {faculty.name}
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────
   Main Section
   ──────────────────────────────────────────────────────────── */
export default function FacultySection() {
  return (
    <section
      id="faculty"
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
              \\ 03
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-light tracking-[0.15em] leading-[1] uppercase text-white">
              Faculty
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/70 leading-relaxed font-sans max-w-md">
            The esteemed professors and advisers guiding our organization and supporting academic excellence.
          </p>
        </motion.div>

        {/* Faculty Grid */}
        <motion.div
          {...fadeUp}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {facultyMembers.map((faculty, i) => (
            <FacultyCard key={faculty.name} faculty={faculty} delay={i * 0.05} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
