import { PricingCards } from '@/components/marketing/PricingCards';
import { PricingFAQ } from '@/components/marketing/PricingFAQ';

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden pt-32 pb-32">
      {/* Ambient Gradients */}
      <div className="absolute top-0 left-0 w-full h-[800px] opacity-40 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-bee-green/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[20%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="text-center px-4 max-w-3xl mx-auto mb-8">
          <h1 className="text-5xl md:text-7xl font-extrabold font-jakarta text-slate-900 dark:text-white tracking-tight mb-8">
            Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Start organizing your group expenses for free, and upgrade to unlock the full power of our AI receipt scanning and health insights when you're ready.
          </p>
        </div>

        {/* The Pricing Cards */}
        <div className="mb-24 w-full">
          <PricingCards />
        </div>

        {/* The FAQ Section */}
        <div className="w-full">
          <PricingFAQ />
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-32 py-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 relative z-10">
        <p className="font-medium">© {new Date().getFullYear()} BillBee Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
