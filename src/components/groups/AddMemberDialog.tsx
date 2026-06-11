"use client";

import { useState } from "react";
import { addGroupMemberAction } from "@/app/actions/group";
import { trackEvent } from "@/lib/analytics/track-event";
import { UserPlus } from "lucide-react";

export function AddMemberDialog({ groupId }: { groupId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm"
      >
        <UserPlus className="w-4 h-4" /> Add Member
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-full max-w-md p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold mb-4">Add Group Member</h2>
            <p className="text-sm text-slate-500 mb-4">Maximum 15 members allowed per group.</p>
            <form action={async (formData) => {
              setIsLoading(true);
              setError(null);
              trackEvent("add_group_member", { groupId });
              const result = await addGroupMemberAction(formData);
              setIsLoading(false);
              
              if (result?.error) {
                setError(result.error);
              } else {
                setIsOpen(false);
              }
            }}>
              <input type="hidden" name="groupId" value={groupId} />
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">User Email</label>
                  <input 
                    type="email"
                    name="email" 
                    required 
                    className="w-full mt-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent" 
                    placeholder="friend@example.com" 
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                )}
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
                    className="bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "Adding..." : "Add Member"}
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
