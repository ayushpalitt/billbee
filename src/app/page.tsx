import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { LandingActions } from '@/components/marketing/LandingActions';
import { HeroStarburst } from '@/components/marketing/HeroStarburst';
import { FeaturesBento } from '@/components/marketing/FeaturesBento';
import { HowItWorksJourney } from '@/components/marketing/HowItWorksJourney';
import { AIInsightsTeaser } from '@/components/marketing/AIInsightsTeaser';
import { PricingCards } from '@/components/marketing/PricingCards';

export default async function LandingPage() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden pt-24 pb-32">
      {/* Ambient Gradients */}
      <div className="absolute top-0 left-0 w-full h-[800px] opacity-40 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[20%] w-[60%] h-[60%] bg-bee-green/20 rounded-full blur-[150px]" />
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-honey-yellow/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <HeroStarburst />
        
        <div className="text-center px-4 -mt-16 z-20 flex flex-col items-center">
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-[700px] mb-10 leading-relaxed font-medium">
            BillBee automatically categorizes your receipts, balances group expenses, and generates AI-powered financial insights.
          </p>
          
          <LandingActions />

          <div className="mt-10 flex items-center justify-center space-x-6 text-sm font-semibold text-slate-500">
            <div className="flex items-center gap-2"><span className="text-bee-green text-lg leading-none">✓</span> No Credit Card</div>
            <div className="flex items-center gap-2"><span className="text-bee-green text-lg leading-none">✓</span> Secure & Private</div>
            <div className="flex items-center gap-2"><span className="text-bee-green text-lg leading-none">✓</span> Cancel Anytime</div>
          </div>

          <div className="mt-32 mb-16 w-full border-t border-slate-200 dark:border-slate-800 pt-10 flex flex-col items-center">
            <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-6">Trusted by 10,000+ users across teams and trips</p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-2xl font-bold font-jakarta text-slate-800 dark:text-white flex items-center gap-2">⬡ TeamHive</span>
              <span className="text-2xl font-bold font-jakarta text-slate-800 dark:text-white flex items-center gap-2">✦ NomadWorks</span>
              <span className="text-2xl font-bold font-jakarta text-slate-800 dark:text-white flex items-center gap-2">🎓 StudentHub</span>
              <span className="text-2xl font-bold font-jakarta text-slate-800 dark:text-white flex items-center gap-2">✈ TripSync</span>
              <span className="text-2xl font-bold font-jakarta text-slate-800 dark:text-white flex items-center gap-2">⊚ WorkNest</span>
            </div>
          </div>
        </div>
      </div>

      <FeaturesBento />
      <HowItWorksJourney />
      <AIInsightsTeaser />
      <PricingCards />

      {/* Footer */}
      <footer className="mt-32 py-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400">
        <p className="font-medium">© {new Date().getFullYear()} BillBee Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
