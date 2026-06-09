"use client";

import { SignUpButton } from "@clerk/nextjs";

export function LandingActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <SignUpButton mode="modal">
        <button className="group relative overflow-hidden bg-gradient-to-r from-bee-green to-emerald-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] shadow-lg">
          <span className="relative z-10">Get Started Free</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
        </button>
      </SignUpButton>
      
      <button className="group flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-deep-ocean dark:text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md">
        <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center pl-0.5 group-hover:bg-bee-green group-hover:text-white transition-colors text-xs">
          ▶
        </span>
        Watch Demo
      </button>
    </div>
  );
}
