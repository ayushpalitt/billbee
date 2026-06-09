import { auth } from '@clerk/nextjs/server';
import { generateMonthlyInsights } from '@/lib/ai/insights';
import { calculateFinancialHealthScore, getHealthScoreCategory } from '@/lib/ai/health-score';
import { DashboardView } from '@/components/dashboard/DashboardView';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    return <DashboardView mock={true} />;
  }

  // Generate or fetch insights and score
  const insight = await generateMonthlyInsights(userId).catch(() => null);
  const score = await calculateFinancialHealthScore(userId).catch(() => 85);
  const scoreCategory = getHealthScoreCategory(score);

  return (
    <DashboardView 
      mock={false}
      userId={userId} 
      healthScore={score} 
      healthScoreCategory={scoreCategory} 
      insight={insight?.content} 
    />
  );
}
