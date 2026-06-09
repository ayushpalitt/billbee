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
  }
};
