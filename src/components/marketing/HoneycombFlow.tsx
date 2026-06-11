"use client";

import { motion } from "framer-motion";
import { Users, ScanLine, Calculator, TrendingUp, HandCoins } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Create a Hive",
    description: "Start by creating a group. Invite your roommates, travel buddies, or team members to join your hive via a simple link.",
    icon: <Users className="w-10 h-10 text-white" />,
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "Scan & Extract",
    description: "Snap a photo of your receipt. Our AI automatically extracts line items, merchant names, taxes, and categorizes the spend.",
    icon: <ScanLine className="w-10 h-10 text-white" />,
    gradient: "from-bee-green to-emerald-400"
  },
  {
    id: 3,
    title: "Smart Split",
    description: "BillBee mathematically splits the costs. Choose percentages, exact amounts, or equally. It handles the complex math instantly.",
    icon: <Calculator className="w-10 h-10 text-white" />,
    gradient: "from-purple-500 to-fuchsia-400"
  },
  {
    id: 4,
    title: "AI Analysis",
    description: "Get a real-time pulse on group spending. The AI command center evaluates habits and generates your Financial Health Score.",
    icon: <TrendingUp className="w-10 h-10 text-white" />,
    gradient: "from-honey-yellow to-orange-400"
  },
  {
    id: 5,
    title: "1-Click Settle",
    description: "Eliminate the IOU runaround. We optimize and consolidate debts so you only make one simple payment to settle up.",
    icon: <HandCoins className="w-10 h-10 text-white" />,
    gradient: "from-pink-500 to-rose-400"
  }
];

export function HoneycombFlow() {
  return (
    <div className="relative py-20 max-w-[1000px] mx-auto w-full px-4 overflow-hidden">
      
      {/* Background connecting line */}
      <div className="absolute left-1/2 top-[10%] bottom-[10%] w-1 bg-gradient-to-b from-blue-500/20 via-bee-green/20 to-purple-500/20 -translate-x-1/2 hidden md:block rounded-full" />
      <motion.div 
        className="absolute left-1/2 top-[10%] w-1 bg-gradient-to-b from-blue-500 via-bee-green to-purple-500 -translate-x-1/2 hidden md:block rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"
        initial={{ height: "0%" }}
        whileInView={{ height: "80%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      <div className="flex flex-col gap-12 md:gap-24 relative z-10">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: isEven ? -50 : 50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              
              {/* The Honeycomb */}
              <div className="relative w-64 h-[220px] md:w-[320px] md:h-[276px] shrink-0 group">
                {/* Honeycomb Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-full`} />
                
                {/* Actual Honeycomb Shape */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${step.gradient} p-[2px]`}
                  style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
                >
                  <div 
                    className="w-full h-full bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden"
                    style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
                  >
                    {/* Inner Hover Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                      <span className="text-4xl font-black font-jakarta text-white/10 absolute top-4 left-4">
                        0{step.id}
                      </span>
                      <h3 className="text-xl font-bold font-jakarta text-white mt-2">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Description */}
              <div className={`flex-1 text-center ${isEven ? 'md:text-left' : 'md:text-right'} bg-white/5 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-xl`}>
                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${step.gradient} text-white font-bold text-sm mb-4`}>
                  {step.id}
                </div>
                <h3 className="text-2xl font-extrabold font-jakarta text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
