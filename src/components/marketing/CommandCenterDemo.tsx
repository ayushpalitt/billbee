"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, Terminal, ShieldAlert, Sparkles } from "lucide-react";

const mockLogs = [
  "Initializing BillBee AI Core...",
  "Connecting to secure data stream...",
  "Analyzing 30 days of transaction history...",
  "Pattern recognized: Dining category spend is unusually high.",
  "Cross-referencing with local group averages...",
  "Generating actionable insights..."
];

export function CommandCenterDemo() {
  const [logIndex, setLogIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showInsights, setShowInsights] = useState(false);

  // Typing effect for the terminal logs
  useEffect(() => {
    if (showInsights || logIndex >= mockLogs.length) {
      if (logIndex >= mockLogs.length) {
        setTimeout(() => setShowInsights(true), 1000);
      }
      return;
    }

    const currentLog = mockLogs[logIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= currentLog.length) {
        setTypedText(currentLog.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setLogIndex(prev => prev + 1);
          setTypedText("");
        }, 800);
      }
    }, 40); // typing speed

    return () => clearInterval(typingInterval);
  }, [logIndex, showInsights]);

  return (
    <div className="relative w-full max-w-4xl mx-auto my-24 perspective-[1000px]">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ rotateX: 15, y: 50, opacity: 0 }}
        whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring" }}
        className="relative z-10 bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-slate-500 text-sm font-mono flex items-center gap-2 ml-4">
              <Terminal className="w-4 h-4" /> root@billbee-ai:~
            </span>
          </div>
          <span className="text-bee-green text-xs font-mono px-2 py-1 bg-bee-green/10 rounded flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bee-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bee-green"></span>
            </span>
            SYSTEM ONLINE
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-8 font-mono text-sm md:text-base min-h-[400px] flex flex-col">
          
          {/* History Logs */}
          <div className="space-y-2 mb-4 text-slate-400">
            {mockLogs.slice(0, logIndex).map((log, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-blue-500 opacity-50">{`[${10 + i}:04:1${i}]`}</span>
                <span>{log}</span>
              </div>
            ))}
            
            {/* Current typing log */}
            {!showInsights && logIndex < mockLogs.length && (
              <div className="flex gap-4 text-slate-300">
                <span className="text-blue-500 opacity-50">{`[${10 + logIndex}:04:1${logIndex}]`}</span>
                <span>{typedText}<span className="animate-pulse bg-white w-2 h-4 inline-block ml-1 align-middle" /></span>
              </div>
            )}
          </div>

          {/* The AI Insights Dashboard (Reveals after typing finishes) */}
          {showInsights && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-auto bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <h3 className="font-sans font-bold text-lg">AI Recommendations</h3>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex gap-3">
                    <ShieldAlert className="w-5 h-5 text-yellow-500 shrink-0" />
                    <div>
                      <h4 className="text-white font-sans font-semibold text-sm">Anomaly Detected</h4>
                      <p className="text-slate-400 font-sans text-xs mt-1">Your 'Dining' expenses in the "Paris Trip" group are 45% higher than projected. Consider skipping the next fancy dinner to maintain your health score.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 p-6 relative">
                <Activity className="w-8 h-8 text-bee-green absolute top-4 right-4 opacity-20" />
                <span className="text-slate-400 font-sans text-sm font-semibold mb-2">Financial Health Score</span>
                <div className="text-6xl font-black font-jakarta text-transparent bg-clip-text bg-gradient-to-r from-bee-green to-emerald-400">
                  84
                </div>
                <span className="text-bee-green font-sans text-xs font-bold uppercase tracking-widest mt-2 bg-bee-green/10 px-3 py-1 rounded-full">
                  Good Standing
                </span>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
