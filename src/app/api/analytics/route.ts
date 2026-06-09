import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { event_name, session_id, source, page_path, metadata } = body;
    const { userId } = await auth();

    await prisma.analyticsEvent.create({
      data: {
        event_name,
        user_id: userId, // undefined if not logged in
        session_id,
        source,
        page_path,
        metadata: metadata || {},
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log analytics event to db:', error);
    return NextResponse.json({ error: 'Failed to log event' }, { status: 500 });
  }
}
