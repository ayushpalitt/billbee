"use client";

import { motion } from "framer-motion";
import { Scan, Users, Activity, Banknote } from "lucide-react";

const features = [
  {
    id: 1,
    title: "AI Receipt Scanner",
    icon: <Scan className="w-8 h-8 text-blue-500" />,
    description: "Instantly digitize paper receipts. Our advanced AI automatically extracts line items, merchant names, taxes, and categorizes the spend with 99% accuracy.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-blue-500/50"
  },
  {
    id: 2,
    title: "Smart Split Engine",
    icon: <Users className="w-8 h-8 text-bee-green" />,
    description: "Split by exact amounts, percentages, or shares. BillBee mathematically calculates the most efficient way to settle complex group trips and roommate expenses.",
    gradient: "from-bee-green/20 to-emerald-500/20",
    border: "group-hover:border-bee-green/50"
  },
  {
    id: 3,
    title: "Health Scores",
    icon: <Activity className="w-8 h-8 text-purple-500" />,
    description: "Get a real-time pulse on your financial health. Our AI command center identifies unusual spending spikes and offers actionable recommendations.",
    gradient: "from-purple-500/20 to-fuchsia-500/20",
    border: "group-hover:border-purple-500/50"
  },
  {
    id: 4,
    title: "1-Click Settlements",
    icon: <Banknote className="w-8 h-8 text-honey-yellow" />,
    description: "Eliminate the IOU runaround. We consolidate debts across multiple groups so you only have to make one simple payment to settle up completely.",
    gradient: "from-yellow-500/20 to-orange-500/20",
    border: "group-hover:border-honey-yellow/50"
  }
];

export function FloatingFeatureCards() {
  return (
    <div className="py-24 relative z-10 w-full max-w-[1200px] mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-[1000px]">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="group relative h-[350px] w-full [transform-style:preserve-3d]"
          >
            {/* The 3D flip container */}
            <div className="absolute inset-0 h-full w-full rounded-3xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl cursor-pointer">
              
              {/* FRONT OF CARD */}
              <div className="absolute inset-0 h-full w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                <div className={`p-4 rounded-full bg-gradient-to-br ${feature.gradient} mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold font-jakarta text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 font-medium mt-4">
                  Hover to reveal
                </p>
              </div>

              {/* BACK OF CARD */}
              <div className={`absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-blue-900 to-yellow-600 overflow-hidden border border-slate-200/20 p-8 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] transition-colors duration-500`}>
                
                {/* Flying Bee Animation */}
                <div className="absolute top-1/3 -right-16 text-4xl opacity-0 group-hover:opacity-100 group-hover:-translate-x-[500px] transition-all duration-[2000ms] ease-out pointer-events-none z-0">
                  🐝
                </div>

                <div className="absolute bottom-1/3 -right-16 text-3xl opacity-0 group-hover:opacity-60 group-hover:-translate-x-[500px] transition-all duration-[2500ms] ease-out pointer-events-none z-0 delay-150">
                  🐝
                </div>

                <h3 className="relative z-10 text-xl font-bold font-jakarta text-white mb-4 drop-shadow-md">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-white/90 font-medium leading-relaxed drop-shadow-sm">
                  {feature.description}
                </p>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
