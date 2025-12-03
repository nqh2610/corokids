const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function analyzeQuests() {
  try {
    console.log('=== PHÂN TÍCH NHIỆM VỤ (QUESTS) ===\n');

    const quests = await prisma.quest.findMany();
    
    console.log(`Tổng số nhiệm vụ: ${quests.length}\n`);
    
    for (const quest of quests) {
      const req = JSON.parse(quest.requirement);
      console.log(`📋 ${quest.title}`);
      console.log(`   Mô tả: ${quest.description}`);
      console.log(`   Loại: ${quest.type} | Danh mục: ${quest.category}`);
      console.log(`   Yêu cầu: ${JSON.stringify(req)}`);
      console.log(`   Phần thưởng: ⭐${quest.stars} | 💎${quest.diamonds}`);
      console.log('');
    }

    // So sánh với lesson stars
    console.log('\n=== SO SÁNH VỚI PHẦN THƯỞNG HỌC TẬP ===\n');
    
    const lessons = await prisma.lesson.findMany({ take: 10 });
    const avgLessonStars = lessons.reduce((sum, l) => sum + l.stars, 0) / lessons.length;
    
    console.log(`Trung bình sao/bài học: ${avgLessonStars.toFixed(1)} sao`);
    console.log(`Tổng sao 1 level (3 bài): ~18 sao`);
    console.log('');

    for (const quest of quests) {
      const req = JSON.parse(quest.requirement);
      console.log(`${quest.title}: ${quest.stars} sao = ${(quest.stars / avgLessonStars).toFixed(1)} bài học`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

analyzeQuests();
