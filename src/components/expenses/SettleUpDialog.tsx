"use client";

import { useState } from "react";
import { settleUpAction } from "@/app/actions/expense";
import { trackEvent } from "@/lib/analytics/track-event";
import { CheckCircle2 } from "lucide-react";

export function SettleUpDialog({ groupId, members, currentUserId }: { groupId: string, members: any[], currentUserId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter out the current user from the list of people to pay
  const payees = members.filter(m => m.user_id !== currentUserId);

  if (payees.length === 0) return null;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
      >
        <CheckCircle2 className="w-4 h-4" /> Settle Up
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-full max-w-md p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold mb-4">Settle Up Debt</h2>
            <form action={async (formData) => {
              setIsLoading(true);
              setError(null);
              trackEvent("settlement_completed", { groupId, amount: formData.get("amount") as string });
              
              const res = await settleUpAction(formData);
              setIsLoading(false);
              
              if (res?.error) {
                setError(res.error);
              } else {
                setIsOpen(false);
              }
            }}>
              <input type="hidden" name="groupId" value={groupId} />
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Who are you paying?</label>
                  <select 
                    name="payeeId" 
                    required 
                    className="w-full mt-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-transparent"
                  >
                    <option value="">Select a member...</option>
                    {payees.map(p => (
                      <option key={p.user_id} value={p.user_id}>
                        {p.user.name || p.user.email}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Amount ($)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    name="amount" 
                    required 
                    className="w-full mt-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-transparent" 
                    placeholder="25.00" 
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Payment Method</label>
                  <select 
                    name="paymentMethod" 
                    className="w-full mt-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-transparent"
                  >
                    <option value="CASH">Cash</option>
                    <option value="VENMO">Venmo</option>
                    <option value="ZELLE">Zelle</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                  </select>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex justify-end space-x-2 pt-4">
                  <button 
                    type="button" 
                    onClick={() => { setIsOpen(false); setError(null); }} 
                    className="px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-emerald-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Recording..." : "Record Payment"}
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
