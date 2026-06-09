"use client";

import { motion } from "framer-motion";
import { Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function AIInsightsTeaser() {
  return (
    <section id="ai-insights" className="relative py-32 px-6 max-w-7xl mx-auto w-full z-10 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950 rounded-[3rem] overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-bee-green/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 p-12 lg:p-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-8 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bee-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-bee-green"></span>
            </span>
            BillBee AI Engine
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold font-jakarta text-white mb-6 tracking-tight leading-tight">Your Finances, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-bee-green to-emerald-400">Explained By AI</span></h2>
          <p className="text-xl text-slate-400 font-medium mb-10 leading-relaxed">BillBee analyzes every expense, settlement, and spending pattern to provide actionable recommendations and an instant Financial Health Score.</p>
          <button className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-colors">Explore AI Insights</button>
        </div>

        <div className="relative h-[400px]">
          {/* Mockup AI Cards floating */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-64 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-300 font-medium">Food Spending</span>
              <span className="text-red-400 flex items-center text-sm font-bold"><ArrowUpRight className="w-4 h-4 mr-1"/> 23%</span>
            </div>
            <div className="h-12 w-full flex items-end gap-1 opacity-50">
              {[4, 6, 5, 8, 12, 16, 22].map((h, i) => (
                <div key={i} className="bg-red-400/50 w-full rounded-t-sm" style={{ height: `${h}px` }} />
              ))}
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 left-10 w-64 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-300 font-medium">Travel Costs</span>
              <span className="text-bee-green flex items-center text-sm font-bold"><ArrowDownRight className="w-4 h-4 mr-1"/> 8%</span>
            </div>
            <div className="h-12 w-full flex items-end gap-1 opacity-50">
              {[20, 18, 15, 16, 12, 10, 8].map((h, i) => (
                <div key={i} className="bg-bee-green/50 w-full rounded-t-sm" style={{ height: `${h}px` }} />
              ))}
            </div>
          </motion.div>

          {/* Center Health Score */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.2)]"
          >
            <Activity className="w-8 h-8 text-bee-green mb-2" />
            <span className="text-5xl font-extrabold font-jakarta text-white">92</span>
            <span className="text-xs font-bold text-bee-green tracking-widest uppercase mt-1">Excellent</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
