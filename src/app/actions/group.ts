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
