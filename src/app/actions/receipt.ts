"use server";

import { scanReceiptWithVision, ReceiptScanResult } from "@/lib/ai/receipt-scanner";
import { auth } from "@clerk/nextjs/server";

export async function scanReceiptAction(imageUrl: string): Promise<{ success: boolean; data?: ReceiptScanResult; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const result = await scanReceiptWithVision(imageUrl);
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error scanning receipt:", error);
    return { success: false, error: error.message || "Failed to scan receipt" };
  }
}
