"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { trackEvent } from "@/lib/analytics/track-event";
import { useEffect, useState } from "react";
import { Activity, TrendingUp, AlertCircle, CheckCircle2, ArrowUpRight, ArrowDownRight, Wallet, Users, Receipt, Download, UsersRound } from "lucide-react";
import { CreateGroupDialog } from "@/components/groups/CreateGroupDialog";
import { AddPersonalExpenseDialog } from "@/components/expenses/AddPersonalExpenseDialog";
import { TransferExpenseDropdown } from "@/components/expenses/TransferExpenseDropdown";
import { generatePdfReport } from "@/lib/pdf-generator";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const COLORS = ['#22c55e', '#f59e0b', '#3b82f6', '#8b5cf6'];

interface DashboardProps {
  mock?: boolean;
  userId?: string | null;
  healthScore?: number;
  healthScoreCategory?: string;
  insight?: string;
  totalExpenses?: number;
  owedToYou?: number;
  activeGroups?: number;
  recentTransactions?: {
    id?: string;
    title: string;
    group: string;
    date: string;
    amount: string;
    status: string;
    isPersonal?: boolean;
    rawAmount?: number;
  }[];
  monthlyData?: any[];
  categoryData?: any[];
  userGroups?: any[];
}

// A premium count up component
function CountUp({ end, prefix = "", suffix = "" }: { end: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    if (end === 0) {
      setCount(0);
      return;
    }
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <span>{prefix}{Math.floor(count).toLocaleString()}{suffix}</span>;
}

export function DashboardView({ 
  mock, 
  userId, 
  healthScore, 
  healthScoreCategory, 
  insight,
  totalExpenses = 0,
  owedToYou = 0,
  activeGroups = 0,
  recentTransactions = [],
  monthlyData = [
    { name: 'Jan', expenses: 0, savings: 0 },
    { name: 'Feb', expenses: 0, savings: 0 },
    { name: 'Mar', expenses: 0, savings: 0 },
    { name: 'Apr', expenses: 0, savings: 0 },
    { name: 'May', expenses: 0, savings: 0 },
    { name: 'Jun', expenses: 0, savings: 0 },
  ],
  categoryData = [{ name: 'No Data', value: 1 }],
  userGroups = []
}: DashboardProps) {
  const { user } = useUser();
  const [timeframe, setTimeframe] = useState("This Month");
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);
  
  useEffect(() => {
    trackEvent("view_dashboard", { mock });
  }, [mock]);

  const isDataLoaded = activeGroups > 0 || totalExpenses > 0;
  const finalScore = isDataLoaded ? (healthScore || 92) : 0;
  const finalCategory = isDataLoaded ? (healthScoreCategory || "Excellent") : "No Data";

  const currentMonthlyData = monthlyData;
  const currentCategoryData = categoryData;
  
  const currentInsight = isDataLoaded 
    ? (insight || "I noticed your dining expenses have increased by 23% this month. Consider cooking at home to improve your health score.")
    : "No recent transactions found. Start using BillBee to get personalized AI insights and health scores.";

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 px-6 pt-32 pb-10 md:px-10 md:pt-32 font-sans min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-3xl font-extrabold font-jakarta text-slate-900 dark:text-white tracking-tight">
            {greeting}{user?.firstName ? `, ${user.firstName}` : ''} 👋
          </h1>
          <p className="text-slate-500 font-medium mt-1">Here is the latest overview of your group finances.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold rounded-lg px-4 py-2 outline-none hover:border-slate-300 transition-colors cursor-pointer shadow-sm text-slate-700 dark:text-slate-300"
          >
            <option>Last 30 Days</option>
            <option>This Month</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
          <Link
            href="/groups"
            className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm"
          >
            <UsersRound className="w-4 h-4" /> Manage Groups
          </Link>
          <div className="flex items-center gap-2">
            <AddPersonalExpenseDialog />
            <CreateGroupDialog />
          </div>
          <button 
            onClick={() => {
              trackEvent("pdf_export", { source: "dashboard" });
              generatePdfReport(recentTransactions, "User");
            }}
            className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
        
        {/* Main Content (Left 2 columns) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md hover:border-red-400/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400"><Wallet className="w-5 h-5"/></div>
                <span className="flex items-center text-xs font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded-full"><ArrowUpRight className="w-3 h-3 mr-1"/> 12%</span>
              </div>
              <p className="text-slate-500 text-sm font-medium mb-1">Total Expenses</p>
              <h3 className="text-3xl font-extrabold font-jakarta text-slate-900 dark:text-white"><CountUp prefix="$" end={totalExpenses} /></h3>
            </motion.div>

            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.1}} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md hover:border-blue-400/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400"><Receipt className="w-5 h-5"/></div>
                {isDataLoaded && <span className="flex items-center text-xs font-bold text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-full"><ArrowDownRight className="w-3 h-3 mr-1"/> 4%</span>}
              </div>
              <p className="text-slate-500 text-sm font-medium mb-1">Owed to You</p>
              <h3 className="text-3xl font-extrabold font-jakarta text-slate-900 dark:text-white"><CountUp prefix="$" end={owedToYou} /></h3>
            </motion.div>

            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.2}} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md hover:border-honey-yellow/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400"><Users className="w-5 h-5"/></div>
              </div>
              <p className="text-slate-500 text-sm font-medium mb-1">Active Groups</p>
              <h3 className="text-3xl font-extrabold font-jakarta text-slate-900 dark:text-white"><CountUp end={activeGroups} /></h3>
            </motion.div>

            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.3}} className="bg-gradient-to-br from-bee-green to-emerald-500 p-6 rounded-2xl border border-emerald-400 shadow-lg shadow-bee-green/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-2xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-2 bg-white/20 rounded-lg text-white"><Activity className="w-5 h-5"/></div>
              </div>
              <p className="text-white/80 text-sm font-medium mb-1 relative z-10">Health Score</p>
              <div className="flex items-baseline gap-2 relative z-10">
                <h3 className="text-3xl font-extrabold font-jakarta text-white"><CountUp end={finalScore} /></h3>
                <span className="text-sm font-bold text-white/90 uppercase tracking-wider">{finalCategory}</span>
              </div>
            </motion.div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Area Chart */}
            <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay: 0.4}} className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold font-jakarta text-slate-900 dark:text-white">Expense vs Savings</h3>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentMonthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSav" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
                    <Area type="monotone" dataKey="savings" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorSav)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Donut Chart */}
            <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay: 0.5}} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold font-jakarta text-slate-900 dark:text-white mb-2">Category Breakdown</h3>
              <div className="flex-1 min-h-[250px] relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={currentCategoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                      {currentCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={isDataLoaded ? COLORS[index % COLORS.length] : '#cbd5e1'} />
                      ))}
                    </Pie>
                    {isDataLoaded && <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />}
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                  <span className="text-sm font-medium text-slate-500">{isDataLoaded ? 'Top' : ''}</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">{isDataLoaded ? 'Food' : 'No Data'}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Transactions Table */}
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.6}} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-bold font-jakarta text-slate-900 dark:text-white">Recent Transactions</h3>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 text-sm">
                    <th className="p-4 font-semibold whitespace-nowrap">Transaction</th>
                    <th className="p-4 font-semibold whitespace-nowrap">Group</th>
                    <th className="p-4 font-semibold whitespace-nowrap">Date</th>
                    <th className="p-4 font-semibold whitespace-nowrap">Amount</th>
                    <th className="p-4 font-semibold whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentTransactions.length > 0 ? recentTransactions.map((tx, i) => {
                    const amountNumber = parseFloat(tx.amount.replace(/[^0-9.-]+/g,""));
                    return (
                    <tr key={tx.id || i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-medium text-slate-900 dark:text-white">{tx.title}</td>
                      <td className="p-4 text-slate-500">
                        {tx.isPersonal ? (
                          <span className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 px-2 py-1 rounded text-xs font-semibold">Personal</span>
                        ) : (
                          tx.group
                        )}
                      </td>
                      <td className="p-4 text-slate-500">{tx.date}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{tx.amount}</td>
                      <td className="p-4">
                        {tx.isPersonal ? (
                          <TransferExpenseDropdown expenseId={tx.id!} amount={amountNumber} groups={userGroups} />
                        ) : (
                          <span className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ${tx.status === 'Settled' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                            {tx.status}
                          </span>
                        )}
                      </td>
                    </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">No recent transactions found for this timeframe.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

        </div>

        {/* AI Insights Right Panel */}
        <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay: 0.7}} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-6 rounded-3xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden flex flex-col xl:h-[calc(100vh-160px)] xl:sticky top-32">
          <div className="absolute top-0 right-0 w-64 h-64 bg-bee-green/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-8">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bee-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-bee-green"></span>
              </span>
              <h2 className="text-lg font-bold font-jakarta">AI Command Center</h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8 font-medium">
              {currentInsight}
            </p>

            {isDataLoaded && (
              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Anomalies Detected</h3>
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-xl p-4 flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-red-900 dark:text-red-100">Unusual Travel Spend</h4>
                    <p className="text-xs text-red-700 dark:text-red-300/80 mt-1 font-medium">Uber expenses are 4x higher than your 6-month average.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4 flex-1">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">AI Recommendations</h3>
              {isDataLoaded ? (
                <>
                  <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl p-4 flex gap-3 items-start hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
                    <CheckCircle2 className="w-5 h-5 text-bee-green shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold">Combine Transactions</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">You have 3 pending settlements in "Paris Trip". Consolidate them to save time.</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl p-4 flex gap-3 items-start hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
                    <TrendingUp className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold">Settle Balances Earlier</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Paying within 48 hours boosts your health score by 5 points.</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl p-4 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Add more expenses to receive personalized recommendations.</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-400 text-center font-medium">Data analyzed by BillBee AI</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
