const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanupAndRecalculate() {
  try {
    console.log('=== DỌN DẸP VÀ TÍNH LẠI PROGRESS ===\n');

    // 1. Xóa các progress entries cho bài không tồn tại
    console.log('1. Kiểm tra và xóa progress không hợp lệ...\n');
    
    const allProgress = await prisma.progress.findMany();
    let deletedCount = 0;

    for (const progress of allProgress) {
      const lesson = await prisma.lesson.findFirst({
        where: { 
          levelId: progress.levelId, 
          lessonId: progress.lessonId 
        }
      });
      
      if (!lesson) {
        console.log(`  ❌ Xóa: Level ${progress.levelId}, Bài ${progress.lessonId} (không tồn tại)`);
        await prisma.progress.delete({ where: { id: progress.id } });
        deletedCount++;
      }
    }

    console.log(`\n✅ Đã xóa ${deletedCount} progress không hợp lệ!`);

    // 2. Kiểm tra lại số sao sau khi dọn
    console.log('\n2. Kiểm tra tiến độ theo Level...\n');

    const levels = await prisma.lesson.findMany({
      select: { levelId: true },
      distinct: ['levelId'],
      orderBy: { levelId: 'asc' }
    });

    for (const { levelId } of levels) {
      // Lấy lessons của level
      const lessons = await prisma.lesson.findMany({
        where: { levelId },
        orderBy: { lessonId: 'asc' }
      });

      // Lấy progress của level
      const progress = await prisma.progress.findMany({
        where: { levelId },
        orderBy: { lessonId: 'asc' }
      });

      const totalLessons = lessons.length;
      const completedLessons = progress.filter(p => p.completed).length;
      const totalStars = progress.reduce((sum, p) => sum + p.starsEarned, 0);
      const maxStars = lessons.reduce((sum, l) => sum + l.stars, 0);

      console.log(`Level ${levelId}: ${completedLessons}/${totalLessons} bài • ${totalStars}/${maxStars} sao`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupAndRecalculate();
