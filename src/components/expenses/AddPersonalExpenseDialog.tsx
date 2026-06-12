"use client";

import { useState } from "react";
import { addExpenseAction } from "@/app/actions/expense";
import { trackEvent } from "@/lib/analytics/track-event";
import { UploadButton } from "@/lib/uploadthing";
import { scanReceiptAction } from "@/app/actions/receipt";
import { Loader2, Sparkles } from "lucide-react";

export function AddPersonalExpenseDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setIsOpen(false);
  };

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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Personal Expense</h2>
            </div>
            
            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400">Magic AI Scanner</h3>
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-300/80 mb-3 font-medium">Upload a receipt and let AI extract the details instantly.</p>
              
              {isScanning ? (
                <div className="flex items-center justify-center gap-2 py-4 bg-white/50 dark:bg-black/20 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">Scanning receipt...</span>
                </div>
              ) : (
                <UploadButton
                  endpoint="receiptUploader"
                  appearance={{
                    button: "bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm w-full",
                    allowedContent: "text-amber-600/70 dark:text-amber-400/50 text-xs"
                  }}
                  onClientUploadComplete={async (res) => {
                    if (res && res.length > 0) {
                      setIsScanning(true);
                      const result = await scanReceiptAction(res[0].url);
                      if (result.success && result.data) {
                        if (result.data.merchant) setDescription(result.data.merchant);
                        if (result.data.amount) setAmount(result.data.amount.toString());
                      } else {
                        alert(result.error || "Failed to scan receipt");
                      }
                      setIsScanning(false);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Upload ERROR! ${error.message}`);
                  }}
                />
              )}
            </div>

            <form action={(formData) => {
              trackEvent("add_personal_expense", { amount: formData.get("amount") as string });
              addExpenseAction(formData);
              resetForm();
            }}>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <input 
                    name="description" 
                    required 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-transparent transition-all" 
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
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-transparent transition-all" 
                    placeholder="4.50" 
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <button 
                    type="button" 
                    onClick={resetForm} 
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
