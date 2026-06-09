"use client";

import { useState } from "react";
import { createGroupAction } from "@/app/actions/group";
import { trackEvent } from "@/lib/analytics/track-event";

export function CreateGroupDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition-colors"
      >
        + Create Group
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card text-card-foreground w-full max-w-md p-6 rounded-xl shadow-lg border">
            <h2 className="text-xl font-bold mb-4">Create New Group</h2>
            <form action={(formData) => {
              trackEvent("create_group", { group_name: formData.get("name") as string });
              createGroupAction(formData);
              setIsOpen(false);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Group Name</label>
                  <input 
                    name="name" 
                    required 
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background"
                    placeholder="e.g. Paris Trip 2026"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium rounded-md hover:bg-primary/90"
                  >
                    Create
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
