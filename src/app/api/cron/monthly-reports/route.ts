import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EmailService } from '@/lib/services/email-service';
import { generateServerPdfReport } from '@/lib/pdf-server';

export async function GET(request: Request) {
  try {
    // 1. Fetch all users
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true }
    });

    const previousMonthName = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long', year: 'numeric' });

    for (const user of users) {
      // 2. Fetch all expenses involving the user from the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const expenses = await prisma.expense.findMany({
        where: {
          created_at: { gte: thirtyDaysAgo },
          OR: [
            { created_by: user.id },
            { group: { members: { some: { user_id: user.id } } } }
          ]
        },
        include: { group: true }
      });

      if (expenses.length === 0) continue; // Skip users with no activity

      // 3. Format for PDF
      const formattedTransactions = expenses.map(e => ({
        date: e.created_at.toISOString(),
        title: e.description,
        group: e.group ? e.group.name : "Personal",
        status: "COMPLETED",
        amount: e.amount
      }));

      // 4. Generate server-side PDF buffer
      const pdfBuffer = generateServerPdfReport(formattedTransactions, user.name || "BillBee User");

      // 5. Send email with attached PDF
      await EmailService.sendMonthlyReportEmail(
        user.email,
        user.name || "BillBee User",
        pdfBuffer,
        previousMonthName
      );
    }

    return NextResponse.json({ success: true, message: 'Monthly reports dispatched' });
  } catch (error) {
    console.error("Cron Error (Monthly Reports):", error);
    return NextResponse.json({ success: false, error: 'Failed to dispatch monthly reports' }, { status: 500 });
  }
}
