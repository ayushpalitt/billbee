import { auth } from '@clerk/nextjs/server';
import { GroupService } from '@/lib/services/group-service';
import { redirect } from 'next/navigation';
import { AddExpenseDialog } from '@/components/expenses/AddExpenseDialog';
import { AddMemberDialog } from '@/components/groups/AddMemberDialog';

export default async function GroupDetailsPage({ params }: any) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) redirect('/');

  const group = await GroupService.getGroupDetails(id);
  if (!group) redirect('/groups');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6 md:px-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-3xl font-extrabold font-jakarta text-slate-900 dark:text-white">{group.name}</h1>
            <p className="text-muted-foreground">{group.members.length} members</p>
          </div>
          <div className="flex items-center gap-3">
            <AddMemberDialog groupId={group.id} />
            <AddExpenseDialog groupId={group.id} />
          </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <h2 className="text-xl font-semibold">Expenses</h2>
        {group.expenses.length === 0 ? (
          <p className="text-muted-foreground">No expenses yet. Add one!</p>
        ) : (
          <div className="space-y-4">
            {group.expenses.map((expense: any) => (
              <div key={expense.id} className="p-4 border rounded-xl bg-card flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{expense.description}</h3>
                  <p className="text-sm text-muted-foreground">Paid by {expense.payer.name}</p>
                </div>
                <div className="text-xl font-bold">${expense.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
