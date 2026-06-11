"use client";

import { useState } from "react";
import { addExpenseAction } from "@/app/actions/expense";
import { trackEvent } from "@/lib/analytics/track-event";

export function AddPersonalExpenseDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
      >
        + Add Personal Expense
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-full max-w-md p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold mb-4">Add Personal Expense</h2>
            <form action={(formData) => {
              trackEvent("add_personal_expense", { amount: formData.get("amount") as string });
              addExpenseAction(formData);
              setIsOpen(false);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <input 
                    name="description" 
                    required 
                    className="w-full mt-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" 
                    placeholder="e.g. Coffee" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Amount ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    name="amount" 
                    required 
                    className="w-full mt-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" 
                    placeholder="4.50" 
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)} 
                    className="px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Expense
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
