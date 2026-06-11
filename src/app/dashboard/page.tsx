import { auth } from '@clerk/nextjs/server';
import { generateMonthlyInsights } from '@/lib/ai/insights';
import { calculateFinancialHealthScore, getHealthScoreCategory } from '@/lib/ai/health-score';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { GroupService } from '@/lib/services/group-service';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }

  // Generate or fetch insights and score
  const insight = await generateMonthlyInsights(userId).catch(() => null);
  const score = await calculateFinancialHealthScore(userId).catch(() => 85);
  const scoreCategory = getHealthScoreCategory(score);

  const [
    totalExpensesResult,
    owedToYouResult,
    activeGroupsResult,
    recentTransactionsResult
  ] = await Promise.all([
    prisma.expenseSplit.aggregate({
      _sum: { amount_owed: true },
      where: { user_id: userId }
    }),
    prisma.expenseSplit.aggregate({
      _sum: { amount_owed: true },
      where: {
        expense: { created_by: userId },
        user_id: { not: userId }
      }
    }),
    prisma.groupMember.count({
      where: { user_id: userId }
    }),
    prisma.expense.findMany({
      where: {
        OR: [
          { group: { members: { some: { user_id: userId } } } },
          { created_by: userId, group_id: null }
        ]
      },
      orderBy: { created_at: 'desc' },
      take: 10,
      include: { group: true }
    })
  ]);

  const totalExpenses = totalExpensesResult._sum.amount_owed || 0;
  const owedToYou = owedToYouResult._sum.amount_owed || 0;
  const activeGroups = activeGroupsResult;

  const recentTransactions = recentTransactionsResult.map(tx => ({
    id: tx.id,
    title: tx.description,
    group: tx.group?.name || 'Personal',
    date: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(tx.created_at),
    amount: new Intl.NumberFormat('en-US', { style: 'currency', currency: tx.currency }).format(tx.amount),
    status: tx.group_id ? 'Pending' : 'Personal',
    isPersonal: tx.group_id === null
  }));

  const userGroups = await GroupService.getGroupsForUser(userId);

  // Empty charts for now to ensure clean slate
  const monthlyData = [
    { name: 'Jan', expenses: 0, savings: 0 },
    { name: 'Feb', expenses: 0, savings: 0 },
    { name: 'Mar', expenses: 0, savings: 0 },
    { name: 'Apr', expenses: 0, savings: 0 },
    { name: 'May', expenses: 0, savings: 0 },
    { name: 'Jun', expenses: 0, savings: 0 },
  ];
  const categoryData = [{ name: 'No Data', value: 1 }];

  return (
    <DashboardView 
      mock={false}
      userId={userId} 
      healthScore={score} 
      healthScoreCategory={scoreCategory} 
      insight={insight?.content} 
      totalExpenses={totalExpenses}
      owedToYou={owedToYou}
      activeGroups={activeGroups}
      recentTransactions={recentTransactions}
      monthlyData={monthlyData}
      categoryData={categoryData}
      userGroups={userGroups}
    />
  );
}
