import { prisma } from '@/lib/prisma';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateMonthlyInsights(userId: string) {
  // Check if insight already generated today
  const existing = await prisma.aiInsight.findFirst({
    where: {
      user_id: userId,
      insight_type: 'MONTHLY_SUMMARY',
      generated_at: { gte: new Date(new Date().setDate(new Date().getDate() - 1)) }
    }
  });

  if (existing) return existing;

  // Retrieve user expenses for the past month
  const expenses = await prisma.expense.findMany({
    where: {
      created_by: userId,
      date: { gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) }
    }
  });

  const prompt = `Analyze these expenses and provide a short financial insight: ${JSON.stringify(expenses.map((e: any) => ({ amount: e.amount, category: e.category })))}`;
  
  let insightContent = "Your spending looks stable this month.";
  let confidence = 0.8;

  if (process.env.OPENAI_API_KEY && expenses.length > 0) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "You are a financial advisor." }, { role: "user", content: prompt }]
    });
    insightContent = response.choices[0].message.content || insightContent;
    confidence = 0.95;
  }

  const insight = await prisma.aiInsight.create({
    data: {
      user_id: userId,
      insight_type: 'MONTHLY_SUMMARY',
      content: insightContent,
      confidence,
    }
  });

  return insight;
}
