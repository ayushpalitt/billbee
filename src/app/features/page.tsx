import { FloatingFeatureCards } from '@/components/marketing/FloatingFeatureCards';
import { LandingActions } from '@/components/marketing/LandingActions';

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden pt-32 pb-32">
      {/* Ambient Gradients */}
      <div className="absolute top-0 left-0 w-full h-[800px] opacity-40 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[20%] w-[60%] h-[60%] bg-bee-green/20 rounded-full blur-[150px]" />
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-honey-yellow/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center px-4 max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold font-jakarta text-slate-900 dark:text-white tracking-tight mb-8">
            Powering Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Finances</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Explore the advanced capabilities that make BillBee the ultimate tool for managing expenses, splitting bills, and understanding your money.
          </p>
        </div>

        {/* 3D Flip Cards Component */}
        <FloatingFeatureCards />

        {/* Call to action at the bottom */}
        <div className="mt-32 text-center flex flex-col items-center px-4">
          <h2 className="text-3xl font-bold font-jakarta text-slate-900 dark:text-white mb-8">
            Ready to experience it yourself?
          </h2>
          <LandingActions />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 py-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 relative z-10">
        <p className="font-medium">© {new Date().getFullYear()} BillBee Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
