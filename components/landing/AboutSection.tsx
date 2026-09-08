"use client";

import { motion } from "framer-motion";

// About Section component for rendering organizational details.


const coreValues = [
  "Innovation",
  "Collaboration",
  "Excellence",
  "Integrity",
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#121212] w-full relative overflow-hidden font-sans text-white py-24 px-6 md:px-12 lg:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <div>
            <div className="text-xl md:text-2xl font-light text-white/80 mb-4 font-heading tracking-wider">
              \\ 02
            </div>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-light tracking-[0.15em] leading-[1] uppercase text-white">
              About<br />Us
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/70 leading-relaxed font-sans max-w-md">
            We are the driving force behind the college&apos;s technological advancement, uniting passionate minds to build a smarter future.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-2xl md:text-3xl font-heading font-light tracking-[0.2em] uppercase text-white/90">
              Mission
            </h3>
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans">
              To empower students with cutting-edge technical skills, foster a culture of continuous learning, and provide a platform for collaborative innovation that addresses real-world challenges.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-2xl md:text-3xl font-heading font-light tracking-[0.2em] uppercase text-white/90">
              Vision
            </h3>
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans">
              To be the premier recognized student organization that cultivates the next generation of tech leaders, renowned for excellence, creativity, and impactful technological solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
