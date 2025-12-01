import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET /api/lessons/[id]
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const lesson = await prisma.lesson.findUnique({
      where: { id: params.id }
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Get user progress
    const progress = await prisma.progress.findUnique({
      where: {
        userId_levelId_lessonId: {
          userId: session.user.id,
          levelId: lesson.levelId,
          lessonId: lesson.lessonId
        }
      }
    });

    return NextResponse.json({
      lesson: {
        ...lesson,
        content: JSON.parse(lesson.content),
        completed: progress?.completed || false,
        starsEarned: progress?.starsEarned || 0,
        accuracy: progress?.accuracy || 0,
        timeSpent: progress?.timeSpent || 0
      }
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
