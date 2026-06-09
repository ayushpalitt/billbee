"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    desc: "For small groups and casual trips.",
    features: ["Basic splitting", "Unlimited Groups", "Standard Settlements", "Basic Reports"],
    buttonText: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/month",
    desc: "For power users who want AI magic.",
    features: ["Everything in Starter", "AI Insights & Health Score", "OCR Receipt Scanning", "Advanced Analytics", "Priority Support"],
    buttonText: "Get Pro",
    popular: true,
  },
  {
    name: "Hive Business",
    price: "₹999",
    period: "/month",
    desc: "For teams and organizations.",
    features: ["Everything in Pro", "Team Analytics Dashboard", "Bulk Reporting Export", "Admin Access Controls", "Dedicated Support"],
    buttonText: "Contact Sales",
    popular: false,
  }
];

export function PricingCards() {
  return (
    <section id="pricing" className="relative py-32 px-6 max-w-7xl mx-auto w-full z-10">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-extrabold font-jakarta text-deep-ocean dark:text-white mb-6 tracking-tight">Choose Your Hive</h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">Whether you're splitting dinner bills or managing corporate retreats, BillBee has a plan for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ y: -10 }}
            className={`relative rounded-3xl p-8 bg-white dark:bg-slate-900 border ${plan.popular ? 'border-bee-green shadow-2xl shadow-bee-green/10 scale-105 z-10' : 'border-slate-200/50 dark:border-slate-800/50 shadow-xl'}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-bee-green to-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold font-jakarta text-slate-900 dark:text-white mb-2">{plan.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 h-10">{plan.desc}</p>
            <div className="mb-8">
              <span className="text-5xl font-extrabold font-jakarta text-slate-900 dark:text-white">{plan.price}</span>
              {plan.period && <span className="text-slate-500 font-medium">{plan.period}</span>}
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <span className="text-bee-green font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-gradient-to-r from-bee-green to-emerald-500 text-white hover:shadow-lg hover:shadow-bee-green/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
              {plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
