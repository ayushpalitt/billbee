"use client";

import { useState } from "react";
import { transferExpenseAction } from "@/app/actions/expense";
import { trackEvent } from "@/lib/analytics/track-event";

export function TransferExpenseDropdown({ expenseId, amount, groups }: { expenseId: string, amount: number, groups: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (groups.length === 0) {
    return <span className="text-xs text-slate-400">No groups</span>;
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 px-2 py-1 rounded transition-colors"
      >
        Move to Group
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
            <div className="p-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Group</span>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {groups.map(group => (
                <form key={group.id} action={async (formData) => {
                  setIsLoading(true);
                  trackEvent("transfer_expense", { groupId: group.id });
                  await transferExpenseAction(formData);
                  setIsLoading(false);
                  setIsOpen(false);
                }}>
                  <input type="hidden" name="expenseId" value={expenseId} />
                  <input type="hidden" name="groupId" value={group.id} />
                  <input type="hidden" name="amount" value={amount} />
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                  >
                    {group.name}
                  </button>
                </form>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
