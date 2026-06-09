"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { trackEvent } from "@/lib/analytics/track-event";
import { useEffect } from "react";

const data = [
  { name: 'Jan', total: 400 },
  { name: 'Feb', total: 300 },
  { name: 'Mar', total: 550 },
  { name: 'Apr', total: 450 },
  { name: 'May', total: 700 },
  { name: 'Jun', total: 600 },
];

interface DashboardProps {
  mock?: boolean;
  userId?: string | null;
  healthScore?: number;
  healthScoreCategory?: string;
  insight?: string;
}

export function DashboardView({ mock, userId, healthScore, healthScoreCategory, insight }: DashboardProps) {
  
  useEffect(() => {
    trackEvent("view_dashboard", { mock });
  }, [mock]);

  const scoreColor = (healthScore ?? 85) >= 90 ? "text-green-500" : (healthScore ?? 85) >= 75 ? "text-yellow-500" : "text-red-500";

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors"
            onClick={() => trackEvent("pdf_export", { source: "dashboard" })}>
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border bg-card text-card-foreground shadow-sm p-6"
        >
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Financial Health Score</h3>
          </div>
          <div className="text-2xl font-bold">
            <span className={scoreColor}>{healthScore || 85}</span> / 100
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Status: {healthScoreCategory || 'Good'}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 col-span-3"
        >
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">AI Insight</h3>
          </div>
          <div className="text-lg font-medium text-primary mt-2">
            "{insight || "Your spending is well-balanced across food and transport this month. Keep it up!"}"
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border bg-card text-card-foreground shadow-sm p-6"
      >
        <div className="flex flex-col space-y-1.5 pb-4">
          <h3 className="font-semibold leading-none tracking-tight">Expense Trends</h3>
          <p className="text-sm text-muted-foreground">Your spending over the last 6 months</p>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: any) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
                itemStyle={{ color: 'var(--color-foreground)' }}
              />
              <Area type="monotone" dataKey="total" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorTotal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
