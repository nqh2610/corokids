import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true, email: true, username: true, name: true, avatar: true, level: true, totalStars: true, diamonds: true, streak: true, createdAt: true } });
  return NextResponse.json({ user });
}
