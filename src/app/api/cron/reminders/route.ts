import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EmailService } from '@/lib/services/email-service';

export async function GET(request: Request) {
  // In production, we'd verify the cron secret to prevent unauthorized execution
  // if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    // 1. Fetch all users
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true }
    });

    for (const user of users) {
      // 2. Fetch debts for the user (simplified for this MVP: look at expense splits vs settlements)
      // For demonstration, we'll mock the calculation of owed debts to avoid complex aggregation queries
      // In a full application, we would aggregate all ExpenseSplits owed by user.id, minus Settlements paid by user.id
      
      const owedSplits = await prisma.expenseSplit.findMany({
        where: { user_id: user.id },
        include: { expense: { include: { creator: true } } }
      });

      // Filter to debts where the user isn't the one who created the expense
      const debtsMap = new Map<string, number>();
      
      owedSplits.forEach(split => {
        if (split.expense.created_by !== user.id && split.expense.creator) {
          const payeeName = split.expense.creator.name || split.expense.creator.email;
          const currentAmount = debtsMap.get(payeeName) || 0;
          debtsMap.set(payeeName, currentAmount + split.amount_owed);
        }
      });

      const formattedDebts = Array.from(debtsMap.entries()).map(([payeeName, amount]) => ({
        payeeName,
        amount
      })).filter(d => d.amount > 0);

      // 3. Send email if there are debts
      if (formattedDebts.length > 0) {
        await EmailService.sendDebtReminderEmail(
          user.email,
          user.name || "BillBee User",
          formattedDebts
        );
      }
    }

    return NextResponse.json({ success: true, message: 'Debt reminders dispatched' });
  } catch (error) {
    console.error("Cron Error (Reminders):", error);
    return NextResponse.json({ success: false, error: 'Failed to dispatch reminders' }, { status: 500 });
  }
}
