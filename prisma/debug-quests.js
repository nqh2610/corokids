const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function debugQuests() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    console.log('=== DEBUG QUEST PROGRESS ===\n');
    console.log('Today:', today.toISOString());
    console.log('Week start:', weekStart.toISOString());

    // 1. Exercises
    const exercisesToday = await prisma.exerciseResult.count({
      where: { createdAt: { gte: today } }
    });
    const exercisesWeek = await prisma.exerciseResult.count({
      where: { createdAt: { gte: weekStart } }
    });
    const exercisesTotal = await prisma.exerciseResult.count();

    console.log('\n📊 EXERCISES:');
    console.log(`  Today: ${exercisesToday}`);
    console.log(`  This week: ${exercisesWeek}`);
    console.log(`  Total ever: ${exercisesTotal}`);

    // 2. Lessons completed
    const lessonsToday = await prisma.progress.count({
      where: { completed: true, completedAt: { gte: today } }
    });
    const lessonsWeek = await prisma.progress.count({
      where: { completed: true, completedAt: { gte: weekStart } }
    });
    const lessonsTotal = await prisma.progress.count({
      where: { completed: true }
    });

    console.log('\n📚 LESSONS COMPLETED:');
    console.log(`  Today: ${lessonsToday}`);
    console.log(`  This week: ${lessonsWeek}`);
    console.log(`  Total ever: ${lessonsTotal}`);

    // 3. User streak
    const user = await prisma.user.findFirst({
      where: { role: 'student' },
      select: { streak: true, name: true }
    });

    console.log('\n🔥 STREAK:');
    console.log(`  User ${user?.name}: ${user?.streak || 0} days`);

    // 4. Check correct exercises streak
    const recentEx = await prisma.exerciseResult.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    let correctStreak = 0;
    for (const ex of recentEx) {
      if (ex.isCorrect) correctStreak++;
      else break;
    }

    console.log('\n🎯 CORRECT STREAK:');
    console.log(`  Current: ${correctStreak}`);

    // 5. Problem: exerciseResult vs lesson exercises
    console.log('\n⚠️ VẤN ĐỀ:');
    console.log('  - exerciseResult là từ trang /practice (luyện tập riêng)');
    console.log('  - Bài tập trong lesson KHÔNG được lưu vào exerciseResult');
    console.log('  - Cần phân biệt: lesson exercises vs practice exercises');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugQuests();
