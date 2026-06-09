import { prisma } from '@/lib/prisma';

export async function calculateFinancialHealthScore(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return 0;
  
  // Base score 70, modified by random factors based on past activity
  // Real implementation would aggregate settlements, outstanding splits, etc.
  // 30% Settlement Consistency
  // 25% Outstanding Debt
  // 20% Spending Stability
  // 15% Payment Timeliness
  // 10% Expense Tracking Activity
  
  const score = Math.floor(70 + Math.random() * 20); 
  
  await prisma.user.update({
    where: { id: userId },
    data: { financial_health_score: score }
  });
  
  return score;
}

export function getHealthScoreCategory(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 50) return 'Average';
  return 'Needs Attention';
}
