import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, default_currency, monthly_budget } = body;

    // Update in Prisma
    const updatedUser = await prisma.user.update({
      where: { clerk_id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(default_currency !== undefined && { default_currency }),
        ...(monthly_budget !== undefined && { monthly_budget: monthly_budget === '' ? null : parseFloat(monthly_budget) }),
      },
    });

    // Optionally update in Clerk if name changed
    if (name) {
      try {
        const parts = name.trim().split(' ');
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ');
        
        const client = await clerkClient();
        await client.users.updateUser(userId, {
          firstName,
          lastName,
        });
      } catch (clerkError) {
        console.error('Failed to update name in Clerk:', clerkError);
      }
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Failed to update user profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
