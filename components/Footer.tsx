"use client";

import { motion } from "framer-motion";
import { IconBrandFacebook } from "@tabler/icons-react";

const ease = [0.16, 1, 0.3, 1] as const;

const barcodeWidths = [3, 1, 4, 2, 1, 5, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4, 1, 2, 5, 1, 3, 2, 4, 2, 1, 3];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] w-full relative font-sans text-white border-t border-white/10">
      {/* Top row */}
      <div className="px-6 md:px-12 lg:px-16 pt-16 pb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease }}
            className="flex flex-col gap-6"
          >
            <div className="text-lg font-heading font-light tracking-[0.2em] uppercase text-white/80">
              Computer Society
            </div>
            <a
              href="https://www.facebook.com/PLPCOMSOC"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-sm font-heading tracking-[0.15em] text-white/50 hover:text-white transition-colors duration-300"
            >
              <IconBrandFacebook className="w-5 h-5" strokeWidth={1.5} />
              @college_of_computer_studies
            </a>
          </motion.div>

          {/* Barcode */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="flex flex-col items-end gap-2"
          >
            <div className="flex h-12 items-end gap-[2px] md:gap-[3px] opacity-80">
              {barcodeWidths.map((w, i) => (
                <div key={i} className="bg-white h-full" style={{ width: `${w}px` }} />
              ))}
            </div>
            <div className="flex justify-between w-full max-w-[9rem] text-[10px] tracking-[0.4em] font-heading uppercase font-bold">
              <span>COM</span>
              <span>SOC</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="px-6 md:px-12 lg:px-16 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-heading">
            CCS Computer Society
          </div>
          <div className="text-[10px] text-white/20 font-sans">
            &copy; {new Date().getFullYear()} College of Computer Studies
          </div>
        </div>
      </div>
    </footer>
  );
}