import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET /api/lessons?levelId=1
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const levelId = searchParams.get('levelId');

    const where = levelId ? { levelId: parseInt(levelId) } : {};

    const lessons = await prisma.lesson.findMany({
      where,
      orderBy: [{ levelId: 'asc' }, { order: 'asc' }]
    });

    // Get user progress for these lessons
    const userProgress = await prisma.progress.findMany({
      where: {
        userId: session.user.id,
        levelId: levelId ? parseInt(levelId) : undefined
      }
    });

    // Map progress to lessons
    const lessonsWithProgress = lessons.map(lesson => {
      const progress = userProgress.find(
        p => p.levelId === lesson.levelId && p.lessonId === lesson.lessonId
      );
      return {
        ...lesson,
        content: JSON.parse(lesson.content),
        completed: progress?.completed || false,
        starsEarned: progress?.starsEarned || 0,
        accuracy: progress?.accuracy || 0
      };
    });

    return NextResponse.json({ lessons: lessonsWithProgress });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
