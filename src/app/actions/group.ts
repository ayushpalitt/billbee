"use server";

import { GroupService } from "@/lib/services/group-service";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createGroupAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  if (!name) return { error: "Name is required" };

  const group = await GroupService.createGroup(name, userId);
  revalidatePath("/groups");
  redirect(`/groups/${group.id}`);
}

export async function addGroupMemberAction(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const groupId = formData.get("groupId") as string;
  const email = formData.get("email") as string;
  
  if (!groupId || !email) return { error: "Group ID and email are required" };

  try {
    await GroupService.addGroupMember(groupId, email);
    revalidatePath(`/groups/${groupId}`);
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to add member" };
  }
}
