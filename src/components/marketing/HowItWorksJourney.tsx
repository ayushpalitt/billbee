"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { title: "Create a Group", desc: "Start a trip or shared household." },
  { title: "Upload Receipt", desc: "Snap a photo of the bill." },
  { title: "AI Scan", desc: "BillBee extracts items and prices instantly." },
  { title: "Smart Split", desc: "Assign items to people smoothly." },
  { title: "Settle Up", desc: "Pay via simplified debt paths." }
];

export function HowItWorksJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const beeY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={containerRef} className="relative py-32 px-6 max-w-4xl mx-auto w-full z-10">
      <div className="text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-extrabold font-jakarta text-deep-ocean dark:text-white mb-6 tracking-tight">How It Works</h2>
      </div>

      <div className="relative flex flex-col items-center">
        {/* The SVG Path */}
        <div className="absolute top-0 bottom-0 w-2 left-1/2 -translate-x-1/2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="w-full bg-gradient-to-b from-bee-green to-honey-yellow origin-top"
            style={{ scaleY: pathLength }}
          />
        </div>

        {/* Floating Bee on path */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 z-20 text-4xl drop-shadow-lg"
          style={{ top: beeY, marginTop: "-20px" }}
        >
          🐝
        </motion.div>

        {steps.map((step, i) => (
          <div key={i} className={`relative z-10 w-full flex items-center mb-32 last:mb-0 ${i % 2 === 0 ? 'justify-start text-right pr-12 md:pr-[50%]' : 'justify-end text-left pl-12 md:pl-[50%]'}`}>
            <motion.div 
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`w-full max-w-sm p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-xl backdrop-blur-sm relative ${i % 2 === 0 ? 'mr-8' : 'ml-8'}`}
            >
              <div className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 bg-bee-green shadow-sm ${i % 2 === 0 ? '-right-[54px]' : '-left-[54px]'}`} />
              <div className="text-sm font-bold text-bee-green mb-2 tracking-widest uppercase">Step 0{i + 1}</div>
              <h3 className="text-2xl font-bold font-jakarta text-slate-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">{step.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
