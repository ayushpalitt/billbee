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
  
  if (!description || isNaN(amount)) {
    return { error: "Invalid data" };
  }

  // If a groupId is provided, we must split it among members. For now, we split equally among all members as a simple default.
  // In a real app, the user would select the exact splits in the UI.
  let splits: any[] | undefined = undefined;
  
  if (groupId) {
    const { GroupService } = await import("@/lib/services/group-service");
    const group = await GroupService.getGroupDetails(groupId);
    if (group && group.members.length > 0) {
      const splitAmount = amount / group.members.length;
      splits = group.members.map((m: any) => ({ userId: m.user_id, amountOwed: splitAmount }));
    }
  }

  await ExpenseService.addExpense({
    groupId: groupId || undefined,
    userId,
    amount,
    category: "General",
    description,
    splits
  });
  
  if (groupId) {
    revalidatePath(`/groups/${groupId}`);
  } else {
    revalidatePath(`/dashboard`);
  }
}

export async function transferExpenseAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const expenseId = formData.get("expenseId") as string;
  const groupId = formData.get("groupId") as string;
  const amount = parseFloat(formData.get("amount") as string);

  if (!expenseId || !groupId || isNaN(amount)) {
    return { error: "Invalid data" };
  }

  const { GroupService } = await import("@/lib/services/group-service");
  const group = await GroupService.getGroupDetails(groupId);
  if (!group || group.members.length === 0) return { error: "Group not found or empty" };

  const splitAmount = amount / group.members.length;
  const splits = group.members.map((m: any) => ({ userId: m.user_id, amountOwed: splitAmount }));

  await ExpenseService.transferExpenseToGroup(expenseId, groupId, splits);
  revalidatePath(`/dashboard`);
  revalidatePath(`/groups/${groupId}`);
}

export async function settleUpAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const payeeId = formData.get("payeeId") as string;
  const groupId = formData.get("groupId") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const paymentMethod = formData.get("paymentMethod") as string;

  if (!payeeId || isNaN(amount) || amount <= 0) {
    return { error: "Invalid settlement data" };
  }

  await ExpenseService.settleUp({
    payerId: userId,
    payeeId,
    amount,
    paymentMethod: paymentMethod || "CASH",
  });

  revalidatePath(`/dashboard`);
  if (groupId) {
    revalidatePath(`/groups/${groupId}`);
  }
  return { success: true };
}
