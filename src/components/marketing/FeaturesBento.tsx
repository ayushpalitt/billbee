"use client";

import { motion } from "framer-motion";
import { ScanLine, PieChart, Network, Activity, Bell, Search } from "lucide-react";

const features = [
  {
    title: "AI Receipt Scanner",
    description: "Instantly convert crumpled paper receipts into structured expense data with 99% accuracy.",
    icon: ScanLine,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50",
  },
  {
    title: "Smart Splitting",
    description: "Split by percentage, exact amounts, or equal shares effortlessly.",
    icon: PieChart,
    className: "md:col-span-1 bg-white dark:bg-slate-900/80",
  },
  {
    title: "Debt Simplification",
    description: "Reduce complex group debts into one single payment path.",
    icon: Network,
    className: "md:col-span-1 bg-white dark:bg-slate-900/80",
  },
  {
    title: "Health Score",
    description: "Real-time AI analysis of your spending habits and financial stability.",
    icon: Activity,
    className: "md:col-span-1 bg-white dark:bg-slate-900/80",
  },
  {
    title: "Smart Reminders",
    description: "Automated, gentle nudges for pending settlements.",
    icon: Bell,
    className: "md:col-span-1 bg-white dark:bg-slate-900/80",
  },
  {
    title: "Natural Language Search",
    description: "\"Show food expenses from the July Paris trip\"",
    icon: Search,
    className: "md:col-span-2 bg-gradient-to-r from-bee-green/10 to-emerald-500/10 dark:from-bee-green/20 dark:to-emerald-500/20",
  }
];

export function FeaturesBento() {
  return (
    <section id="features" className="relative py-32 px-6 max-w-7xl mx-auto w-full z-10">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-extrabold font-jakarta text-deep-ocean dark:text-white mb-6 tracking-tight">Everything You Need</h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">From receipt scanning to AI-powered insights, BillBee handles every part of expense management automatically.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px]">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            className={`group relative overflow-hidden rounded-3xl border border-slate-200/50 dark:border-slate-800/50 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm ${feature.className}`}
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-700"
              >
                <feature.icon className="w-6 h-6 text-bee-green" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold font-jakarta text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{feature.description}</p>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-bee-green/10 blur-[60px] rounded-full group-hover:bg-bee-green/20 transition-colors duration-700 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
