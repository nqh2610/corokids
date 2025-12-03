const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixProgress() {
  try {
    console.log('=== SỬA PROGRESS - CAP LẠI STARS ===\n');

    // Lấy tất cả progress
    const allProgress = await prisma.progress.findMany();

    let fixedCount = 0;

    for (const progress of allProgress) {
      // Tìm lesson tương ứng
      const lesson = await prisma.lesson.findFirst({
        where: {
          levelId: progress.levelId,
          lessonId: progress.lessonId
        }
      });

      if (lesson) {
        const maxStars = lesson.stars;
        
        // Nếu starsEarned > maxStars, cap lại
        if (progress.starsEarned > maxStars) {
          console.log(`Level ${progress.levelId}, Bài ${progress.lessonId}: ${progress.starsEarned} -> ${maxStars} sao`);
          
          await prisma.progress.update({
            where: { id: progress.id },
            data: { starsEarned: maxStars }
          });
          
          fixedCount++;
        }
      }
    }

    console.log(`\n✅ Đã sửa ${fixedCount} progress records!`);

    // Kiểm tra lại
    console.log('\n=== KẾT QUẢ SAU KHI SỬA ===\n');
    const updatedProgress = await prisma.progress.findMany({
      where: { levelId: 1 },
      orderBy: { lessonId: 'asc' }
    });

    for (const pr of updatedProgress) {
      const lesson = await prisma.lesson.findFirst({
        where: { levelId: pr.levelId, lessonId: pr.lessonId }
      });
      console.log(`Level ${pr.levelId}, Bài ${pr.lessonId}: ${pr.starsEarned}/${lesson?.stars || '?'} sao`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixProgress();
