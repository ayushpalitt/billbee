"use server";

import { ExpenseService } from "@/lib/services/expense-service";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addExpenseAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const groupId = formData.get("groupId") as string;
  const description = formData.get("description") as string;
  const amount = parseFloat(formData.get("amount") as string);
  
  if (!groupId || !description || isNaN(amount)) {
    return { error: "Invalid data" };
  }

  await ExpenseService.addExpense(groupId, userId, amount, description);
  revalidatePath(`/groups/${groupId}`);
}
