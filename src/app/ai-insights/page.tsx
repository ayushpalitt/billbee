import { CommandCenterDemo } from '@/components/marketing/CommandCenterDemo';
import { LandingActions } from '@/components/marketing/LandingActions';

export default function AIInsightsPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden pt-32 pb-32">
      {/* Ambient Gradients */}
      <div className="absolute top-0 left-0 w-full h-[800px] opacity-40 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[20%] w-[60%] h-[60%] bg-purple-500/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-sm mb-6 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            BillBee Intelligence
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold font-jakarta text-slate-900 dark:text-white tracking-tight mb-8">
            Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Financial Data Analyst</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-3xl mx-auto">
            BillBee doesn't just track your expenses—it understands them. Our AI core analyzes your spending habits to find anomalies, suggest consolidations, and score your financial health in real time.
          </p>
        </div>

        {/* The Animated Terminal Demo */}
        <CommandCenterDemo />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Anomaly Detection</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Instantly identifies when a specific category of spending spikes unexpectedly compared to your group's average.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-bee-green/20 dark:bg-bee-green/10 text-bee-green flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Health Scoring</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">A dynamic 1-100 score that fluctuates based on how quickly you settle debts and how closely you stick to budget trends.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Actionable Advice</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Stop guessing. Get clear, plain-English recommendations on how to optimize your debt settlements.</p>
          </div>
        </div>

        {/* Call to action at the bottom */}
        <div className="mt-32 text-center flex flex-col items-center">
          <h2 className="text-3xl font-bold font-jakarta text-slate-900 dark:text-white mb-8">
            Unlock your financial insights today.
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
