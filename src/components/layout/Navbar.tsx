"use client";

import Link from "next/link";
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Settings } from "lucide-react";

export function Navbar() {
  const { isSignedIn } = useUser();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl h-16 px-6 rounded-full transition-all duration-300 ${isScrolled ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-lg border border-white/20 dark:border-slate-800/50' : 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-transparent'}`}
      >
        <Link href="/" className="font-extrabold font-jakarta text-xl tracking-tight text-deep-ocean dark:text-white flex items-center gap-2">
          <span className="text-2xl drop-shadow-sm">🐝</span> BillBee
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-sm font-semibold font-jakarta text-slate-700 dark:text-slate-300 hover:text-slate-900 transition-colors">Features</Link>
          <Link href="/how-it-works" className="text-sm font-semibold font-jakarta text-slate-700 dark:text-slate-300 hover:text-slate-900 transition-colors">How It Works</Link>
          <Link href="/ai-insights" className="text-sm font-semibold font-jakarta text-slate-700 dark:text-slate-300 hover:text-slate-900 transition-colors">AI Insights</Link>
          <Link href="/pricing" className="text-sm font-semibold font-jakarta text-slate-700 dark:text-slate-300 hover:text-slate-900 transition-colors">Pricing</Link>
          {isSignedIn && (
            <Link href="/dashboard" className="text-sm font-bold font-jakarta text-green-600 hover:text-green-700 transition-colors">Dashboard</Link>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Profile & Settings"
                  labelIcon={<Settings className="w-4 h-4" />}
                  href="/profile"
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="text-sm font-bold font-jakarta text-slate-900 dark:text-white hover:text-slate-600 transition-colors px-3 py-2">
                  Log In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-slate-900 text-white hover:scale-105 px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </motion.nav>
    </div>
  );
}
