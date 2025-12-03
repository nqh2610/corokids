const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function balanceStars() {
  try {
    console.log('=== CÂN BẰNG LẠI SỐ SAO ===\n');

    // Lấy tất cả lessons theo level
    const lessons = await prisma.lesson.findMany({
      orderBy: [{ levelId: 'asc' }, { order: 'asc' }]
    });

    // Nhóm theo level
    const byLevel = {};
    for (const lesson of lessons) {
      if (!byLevel[lesson.levelId]) byLevel[lesson.levelId] = [];
      byLevel[lesson.levelId].push(lesson);
    }

    // Quy tắc mới: mỗi bài có 5-8 sao, phân bổ đều
    // Bài 1: 5 sao, Bài 2: 6 sao, Bài 3: 7 sao, Bài 4+: 8 sao
    const getStars = (lessonIndex, totalLessons) => {
      if (totalLessons <= 3) {
        // 3 bài: 5, 6, 7 sao
        return 5 + lessonIndex;
      } else {
        // 4+ bài: 5, 5, 6, 6, 7, 7, 8 sao
        return Math.min(5 + Math.floor(lessonIndex / 2), 8);
      }
    };

    let totalUpdated = 0;

    for (const levelId in byLevel) {
      const levelLessons = byLevel[levelId];
      console.log(`\nLevel ${levelId} (${levelLessons.length} bài):`);
      
      let levelTotal = 0;
      
      for (let i = 0; i < levelLessons.length; i++) {
        const lesson = levelLessons[i];
        const newStars = getStars(i, levelLessons.length);
        
        if (lesson.stars !== newStars) {
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: { stars: newStars }
          });
          console.log(`  Bài ${lesson.lessonId}: ${lesson.stars} -> ${newStars} sao`);
          totalUpdated++;
        } else {
          console.log(`  Bài ${lesson.lessonId}: ${newStars} sao (giữ nguyên)`);
        }
        levelTotal += newStars;
      }
      
      console.log(`  → Tổng: ${levelTotal} sao`);
    }

    console.log(`\n✅ Đã cập nhật ${totalUpdated} bài học!`);

    // Cập nhật lại Progress nếu cần
    console.log('\n=== CẬP NHẬT PROGRESS ===');
    const allProgress = await prisma.progress.findMany();
    let progressFixed = 0;

    for (const progress of allProgress) {
      const lesson = await prisma.lesson.findFirst({
        where: { levelId: progress.levelId, lessonId: progress.lessonId }
      });
      
      if (lesson && progress.starsEarned > lesson.stars) {
        await prisma.progress.update({
          where: { id: progress.id },
          data: { starsEarned: lesson.stars }
        });
        console.log(`Progress Level ${progress.levelId} Bài ${progress.lessonId}: ${progress.starsEarned} -> ${lesson.stars}`);
        progressFixed++;
      }
    }

    console.log(`\n✅ Đã sửa ${progressFixed} progress records!`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

balanceStars();
