import { prisma } from '@/lib/prisma';

export const ExpenseService = {
  async addExpense(data: {
    groupId: string;
    userId: string;
    amount: number;
    currency?: string;
    category: string;
    description: string;
    receiptUrl?: string;
    splits: { userId: string; amountOwed: number }[];
  }) {
    return prisma.expense.create({
      data: {
        group_id: data.groupId,
        created_by: data.userId,
        amount: data.amount,
        currency: data.currency || 'USD',
        category: data.category,
        description: data.description,
        receipt_url: data.receiptUrl,
        splits: {
          create: data.splits.map(s => ({
            user_id: s.userId,
            amount_owed: s.amountOwed,
          }))
        }
      }
    });
  },

  async settleUp(data: {
    payerId: string;
    payeeId: string;
    amount: number;
    paymentMethod?: string;
  }) {
    return prisma.settlement.create({
      data: {
        payer_id: data.payerId,
        payee_id: data.payeeId,
        amount: data.amount,
        status: 'COMPLETED',
        settled_at: new Date(),
        payment_method: data.paymentMethod,
      }
    });
  }
};
