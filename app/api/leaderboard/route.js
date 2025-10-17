import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const topUsers = await prisma.user.findMany({ select: { id: true, username: true, name: true, avatar: true, level: true, totalStars: true, streak: true }, orderBy: [{ totalStars: 'desc' }, { level: 'desc' }], take: 50 });
  return NextResponse.json({ leaderboard: topUsers });
}
