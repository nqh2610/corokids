const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkProgress() {
  try {
    // Lấy tất cả progress của user
    const progress = await prisma.progress.findMany({
      orderBy: [
        { levelId: 'asc' },
        { lessonId: 'asc' }
      ]
    });

    console.log('=== USER PROGRESS (số sao đã đạt được) ===\n');
    
    if (progress.length === 0) {
      console.log('Chưa có progress nào!');
    } else {
      let currentLevel = 0;
      for (const pr of progress) {
        if (pr.levelId !== currentLevel) {
          currentLevel = pr.levelId;
          console.log(`\n--- Level ${currentLevel} ---`);
        }
        console.log(`  Bài ${pr.lessonId}: ${pr.starsEarned} sao (hoàn thành: ${pr.completed ? 'Có' : 'Chưa'})`);
      }
    }

    // So sánh với maxStars trong Lesson
    console.log('\n\n=== SO SÁNH VỚI MAX STARS ===\n');
    for (const pr of progress.slice(0, 10)) {
      const lesson = await prisma.lesson.findFirst({
        where: { levelId: pr.levelId, lessonId: pr.lessonId }
      });
      if (lesson) {
        console.log(`Level ${pr.levelId}, Bài ${pr.lessonId}: đạt ${pr.starsEarned}/${lesson.stars} sao`);
      }
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProgress();
