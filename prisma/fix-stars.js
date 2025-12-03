const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Quy tắc số sao mới - tăng dần theo level và độ khó
// Công thức: baseStar + levelBonus + lessonBonus
// - baseStar: 5 sao (cơ bản)
// - levelBonus: level * 0.5 (tối đa +9 sao cho level 18)
// - lessonBonus: bài cuối +2 sao (bài tổng hợp)

const starConfig = {
  // Level 1-5: Cơ bản (6-8 sao)
  1: [6, 6, 6, 8],      // 26 sao
  2: [6, 6, 8],         // 20 sao
  3: [6, 7, 8],         // 21 sao
  4: [6, 7, 8],         // 21 sao
  5: [7, 7, 8],         // 22 sao
  
  // Level 6-10: Trung bình (8-12 sao)
  6: [8, 8, 10],        // 26 sao
  7: [8, 9, 10],        // 27 sao
  8: [9, 9, 10],        // 28 sao
  9: [9, 10, 11],       // 30 sao
  10: [10, 10, 12],     // 32 sao
  
  // Level 11-14: Nâng cao (10-14 sao)
  11: [10, 11, 12],     // 33 sao
  12: [10, 11, 12],     // 33 sao
  13: [11, 11, 13],     // 35 sao
  14: [11, 12, 13],     // 36 sao
  
  // Level 15-18: Chuyên sâu (12-15 sao)
  15: [12, 12, 14],     // 38 sao
  16: [12, 13, 14],     // 39 sao
  17: [13, 13, 15],     // 41 sao
  18: [14, 14, 15],     // 43 sao
};

async function main() {
  console.log('🔄 Cập nhật số sao cho tất cả bài học...\n');
  
  for (const [levelId, stars] of Object.entries(starConfig)) {
    for (let lessonId = 1; lessonId <= stars.length; lessonId++) {
      const newStars = stars[lessonId - 1];
      
      const updated = await prisma.lesson.updateMany({
        where: { 
          levelId: parseInt(levelId), 
          lessonId: lessonId 
        },
        data: { stars: newStars }
      });
      
      if (updated.count > 0) {
        console.log(`   Level ${levelId} - Bài ${lessonId}: ${newStars} sao ✅`);
      }
    }
  }
  
  console.log('\n✨ Hoàn thành cập nhật số sao!');
  
  // Hiển thị tổng quan
  console.log('\n📊 TỔNG QUAN SAO THEO LEVEL:');
  for (const [levelId, stars] of Object.entries(starConfig)) {
    const total = stars.reduce((a, b) => a + b, 0);
    console.log(`   Level ${levelId}: ${stars.join(' + ')} = ${total} sao`);
  }
  
  await prisma.$disconnect();
}

main();
