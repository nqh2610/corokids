import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// POST /api/progress - Save lesson progress
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { levelId, lessonId, completed, starsEarned, timeSpent, accuracy } = body;

    // Validate input
    if (!levelId || !lessonId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Upsert progress
    const progress = await prisma.progress.upsert({
      where: {
        userId_levelId_lessonId: {
          userId: session.user.id,
          levelId: parseInt(levelId),
          lessonId: parseInt(lessonId)
        }
      },
      update: {
        completed: completed || false,
        starsEarned: starsEarned || 0,
        timeSpent: (timeSpent || 0),
        accuracy: accuracy || 0,
        completedAt: completed ? new Date() : null
      },
      create: {
        userId: session.user.id,
        levelId: parseInt(levelId),
        lessonId: parseInt(lessonId),
        completed: completed || false,
        starsEarned: starsEarned || 0,
        timeSpent: timeSpent || 0,
        accuracy: accuracy || 0,
        completedAt: completed ? new Date() : null
      }
    });

    // Update user total stars if completed
    if (completed && starsEarned > 0) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          totalStars: { increment: starsEarned }
        }
      });

      // Check for achievements
      await checkAchievements(session.user.id);
    }

    return NextResponse.json({ progress, success: true });
  } catch (error) {
    console.error('Error saving progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/progress
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const progress = await prisma.progress.findMany({
      where: { userId: session.user.id },
      orderBy: [{ levelId: 'asc' }, { lessonId: 'asc' }]
    });

    // Calculate statistics by level
    const statsByLevel = {};
    progress.forEach(p => {
      if (!statsByLevel[p.levelId]) {
        statsByLevel[p.levelId] = {
          total: 0,
          completed: 0,
          totalStars: 0,
          totalTime: 0,
          avgAccuracy: 0
        };
      }
      statsByLevel[p.levelId].total++;
      if (p.completed) statsByLevel[p.levelId].completed++;
      statsByLevel[p.levelId].totalStars += p.starsEarned;
      statsByLevel[p.levelId].totalTime += p.timeSpent;
      statsByLevel[p.levelId].avgAccuracy += p.accuracy;
    });

    // Calculate averages
    Object.keys(statsByLevel).forEach(levelId => {
      const stats = statsByLevel[levelId];
      stats.avgAccuracy = stats.total > 0 ? stats.avgAccuracy / stats.total : 0;
      stats.progress = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
    });

    return NextResponse.json({ progress, statsByLevel });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to check achievements
async function checkAchievements(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        progress: true,
        exercises: true,
        achievements: {
          include: { achievement: true }
        }
      }
    });

    if (!user) return;

    const allAchievements = await prisma.achievement.findMany();
    const unlockedIds = user.achievements.map(ua => ua.achievementId);

    for (const achievement of allAchievements) {
      // Skip if already unlocked
      if (unlockedIds.includes(achievement.id)) continue;

      const req = JSON.parse(achievement.requirement);
      let shouldUnlock = false;

      switch (req.type) {
        case 'complete_lessons':
          const completedLessons = user.progress.filter(p => p.completed).length;
          shouldUnlock = completedLessons >= req.count;
          break;
        case 'complete_all_lessons':
          const totalLessons = await prisma.lesson.count();
          shouldUnlock = user.progress.filter(p => p.completed).length >= totalLessons;
          break;
        case 'streak':
          shouldUnlock = user.streak >= req.count;
          break;
        case 'complete_exercises':
          shouldUnlock = user.exercises.length >= req.count;
          break;
        case 'perfect_accuracy':
          const recentExercises = user.exercises
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, req.count);
          shouldUnlock = recentExercises.length === req.count &&
                        recentExercises.every(e => e.isCorrect);
          break;
      }

      if (shouldUnlock) {
        // Unlock achievement
        await prisma.userAchievement.create({
          data: {
            userId: user.id,
            achievementId: achievement.id
          }
        });

        // Award stars and diamonds
        await prisma.user.update({
          where: { id: user.id },
          data: {
            totalStars: { increment: achievement.stars },
            diamonds: { increment: achievement.diamonds }
          }
        });

        // Create notification
        await prisma.notification.create({
          data: {
            userId: user.id,
            type: 'achievement',
            title: 'Thành tích mới!',
            message: `Bạn đã mở khóa thành tích "${achievement.name}"!`,
            data: JSON.stringify({ achievementId: achievement.id })
          }
        });
      }
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
  }
}
