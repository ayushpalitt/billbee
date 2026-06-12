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
            className="relative h-[350px] w-full cursor-pointer"
            style={{ perspective: 1000 }}
          >
            {/* The 3D flip container */}
            <motion.div 
              className="absolute inset-0 h-full w-full rounded-3xl shadow-xl"
              style={{ transformStyle: "preserve-3d" }}
              initial="rest"
              whileHover="hover"
              variants={{
                rest: { rotateY: 0 },
                hover: { rotateY: 180 }
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              
              {/* FRONT OF CARD */}
              <div 
                className="absolute inset-0 h-full w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
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
              <div 
                className={`absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-br from-blue-900 to-yellow-600 overflow-hidden border border-slate-200/20 p-8 flex flex-col items-center justify-center text-center transition-colors duration-500`}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                
                {/* Flying Bee Animation 1 */}
                <motion.div 
                  className="absolute top-1/3 -right-16 text-4xl pointer-events-none z-0"
                  variants={{
                    rest: { opacity: 0, x: 0 },
                    hover: { opacity: 1, x: -500 }
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  🐝
                </motion.div>

                {/* Flying Bee Animation 2 */}
                <motion.div 
                  className="absolute bottom-1/3 -right-16 text-3xl pointer-events-none z-0"
                  variants={{
                    rest: { opacity: 0, x: 0 },
                    hover: { opacity: 0.6, x: -500 }
                  }}
                  transition={{ duration: 2.5, ease: "easeOut", delay: 0.15 }}
                >
                  🐝
                </motion.div>

                <h3 className="relative z-10 text-xl font-bold font-jakarta text-white mb-4 drop-shadow-md">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-white/90 font-medium leading-relaxed drop-shadow-sm">
                  {feature.description}
                </p>
              </div>

            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
