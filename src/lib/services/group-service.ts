import { prisma } from '@/lib/prisma';

export const GroupService = {
  async createGroup(name: string, userId: string) {
    return prisma.group.create({
      data: {
        name,
        members: {
          create: { user_id: userId, role: 'ADMIN' },
        },
      },
    });
  },
  
  async getGroupsForUser(userId: string) {
    return prisma.groupMember.findMany({
      where: { user_id: userId },
      include: { group: true },
    }).then((members: any[]) => members.map((m: any) => m.group));
  },
  
  async getGroupDetails(groupId: string) {
    return prisma.group.findUnique({
      where: { id: groupId },
      include: {
        members: { include: { user: true } },
        expenses: { include: { creator: true, splits: true } },
      },
    });
  },

  async addGroupMember(groupId: string, email: string) {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: { members: true }
    });

    if (!group) throw new Error("Group not found");
    if (group.members.length >= 15) throw new Error("Maximum group limit of 15 members reached.");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found with this email");

    const existingMember = group.members.find(m => m.user_id === user.id);
    if (existingMember) throw new Error("User is already in this group");

    return prisma.groupMember.create({
      data: {
        group_id: groupId,
        user_id: user.id,
        role: 'MEMBER'
      }
    });
  }
};
