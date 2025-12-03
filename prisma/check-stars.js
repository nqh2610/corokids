const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lessons = await prisma.lesson.findMany({
    select: { levelId: true, lessonId: true, title: true, stars: true },
    orderBy: [{ levelId: 'asc' }, { lessonId: 'asc' }]
  });
  
  console.log('\n📊 DANH SÁCH SỐ SAO CÁC BÀI HỌC:\n');
  
  let currentLevel = 0;
  let levelStars = 0;
  
  lessons.forEach(l => {
    if (l.levelId !== currentLevel) {
      if (currentLevel > 0) {
        console.log(`   → Tổng: ${levelStars} sao\n`);
      }
      currentLevel = l.levelId;
      levelStars = 0;
      console.log(`=== LEVEL ${l.levelId} ===`);
    }
    levelStars += l.stars;
    console.log(`  Bài ${l.lessonId}: ${l.stars} sao - ${l.title}`);
  });
  console.log(`   → Tổng: ${levelStars} sao\n`);
  
  await prisma.$disconnect();
}

main();
