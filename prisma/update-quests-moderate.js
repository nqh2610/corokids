const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * NHIỆM VỤ CÂN BẰNG - VỪA PHẢI
 * 
 * Nguyên tắc:
 * - Daily: Hoàn thành được trong 15-30 phút học
 * - Weekly: Cần học đều đặn 4-5 ngày/tuần
 * - Special: Mục tiêu dài hạn 2-4 tuần
 */

const balancedQuests = [
  // ========== DAILY QUESTS (80⭐/ngày nếu hoàn thành hết) ==========
  {
    title: '📖 Học bài mới',
    description: 'Hoàn thành 1 bài học hôm nay',
    type: 'daily',
    category: 'lesson',
    requirement: JSON.stringify({ 
      type: 'complete_lessons', 
      count: 1,
      metric: 'lessons_completed_today'
    }),
    stars: 20,
    diamonds: 2
  },
  {
    title: '🌅 Khởi động buổi sáng',
    description: 'Làm 5 bài tập luyện tập',
    type: 'daily',
    category: 'practice',
    requirement: JSON.stringify({ 
      type: 'complete_exercises', 
      count: 5,
      metric: 'exercises_completed_today'
    }),
    stars: 15,
    diamonds: 2
  },
  {
    title: '💪 Siêng năng luyện tập',
    description: 'Hoàn thành 15 bài tập trong ngày',
    type: 'daily',
    category: 'practice',
    requirement: JSON.stringify({ 
      type: 'complete_exercises', 
      count: 15,
      metric: 'exercises_completed_today'
    }),
    stars: 25,
    diamonds: 3
  },
  {
    title: '🎯 Chính xác cao',
    description: 'Làm đúng 5 bài liên tiếp',
    type: 'daily',
    category: 'accuracy',
    requirement: JSON.stringify({ 
      type: 'accuracy_streak', 
      count: 5,
      metric: 'accurate_exercises_streak'
    }),
    stars: 20,
    diamonds: 3
  },

  // ========== WEEKLY QUESTS (200⭐/tuần nếu hoàn thành hết) ==========
  {
    title: '📚 Tuần học tập',
    description: 'Hoàn thành 3 bài học trong tuần',
    type: 'weekly',
    category: 'lesson',
    requirement: JSON.stringify({ 
      type: 'complete_lessons', 
      count: 3,
      metric: 'lessons_completed_week'
    }),
    stars: 50,
    diamonds: 8
  },
  {
    title: '🏋️ Vận động viên',
    description: 'Hoàn thành 40 bài tập trong tuần',
    type: 'weekly',
    category: 'practice',
    requirement: JSON.stringify({ 
      type: 'complete_exercises', 
      count: 40,
      metric: 'exercises_completed_week'
    }),
    stars: 50,
    diamonds: 8
  },
  {
    title: '🔥 Ngọn lửa bền bỉ',
    description: 'Học 5 ngày liên tiếp',
    type: 'weekly',
    category: 'streak',
    requirement: JSON.stringify({ 
      type: 'login_streak', 
      count: 5,
      metric: 'current_streak'
    }),
    stars: 60,
    diamonds: 10
  },
  {
    title: '🏆 Nhà vô địch',
    description: 'Làm đúng 10 bài tập trong tuần',
    type: 'weekly',
    category: 'accuracy',
    requirement: JSON.stringify({ 
      type: 'perfect_exercises', 
      count: 10,
      metric: 'perfect_exercises_week'
    }),
    stars: 40,
    diamonds: 6
  },

  // ========== SPECIAL QUESTS (Thành tựu dài hạn) ==========
  {
    title: '🌟 Ngôi sao học tập',
    description: 'Hoàn thành 3 màn chơi (level)',
    type: 'special',
    category: 'mastery',
    requirement: JSON.stringify({ 
      type: 'complete_levels', 
      count: 3,
      metric: 'levels_completed'
    }),
    stars: 100,
    diamonds: 20
  },
  {
    title: '🧠 Bậc thầy tính nhẩm',
    description: 'Làm đúng 50 bài tập (tổng cộng)',
    type: 'special',
    category: 'accuracy',
    requirement: JSON.stringify({ 
      type: 'accurate_exercises', 
      count: 50,
      metric: 'total_accurate_exercises'
    }),
    stars: 100,
    diamonds: 20
  },
  {
    title: '🎖️ Chiến binh kiên cường',
    description: 'Học 14 ngày liên tiếp (2 tuần)',
    type: 'special',
    category: 'streak',
    requirement: JSON.stringify({ 
      type: 'login_streak', 
      count: 14,
      metric: 'max_streak'
    }),
    stars: 150,
    diamonds: 30
  },
  {
    title: '👑 Hoàn thành chương trình',
    description: 'Hoàn thành tất cả 18 màn chơi',
    type: 'special',
    category: 'mastery',
    requirement: JSON.stringify({ 
      type: 'complete_levels', 
      count: 18,
      metric: 'levels_completed'
    }),
    stars: 300,
    diamonds: 50
  }
];

async function updateQuests() {
  try {
    console.log('=== CẬP NHẬT NHIỆM VỤ VỪA PHẢI ===\n');

    await prisma.userQuest.deleteMany({});
    await prisma.quest.deleteMany({});

    for (const quest of balancedQuests) {
      await prisma.quest.create({ data: quest });
    }

    const daily = balancedQuests.filter(q => q.type === 'daily');
    const weekly = balancedQuests.filter(q => q.type === 'weekly');
    const special = balancedQuests.filter(q => q.type === 'special');

    console.log('📅 DAILY (Hàng ngày) - Tổng: ' + daily.reduce((s,q) => s + q.stars, 0) + '⭐');
    daily.forEach(q => {
      const req = JSON.parse(q.requirement);
      console.log(`   ${q.title}`);
      console.log(`      Yêu cầu: ${req.count} | Thưởng: ⭐${q.stars} 💎${q.diamonds}`);
    });

    console.log('\n📆 WEEKLY (Hàng tuần) - Tổng: ' + weekly.reduce((s,q) => s + q.stars, 0) + '⭐');
    weekly.forEach(q => {
      const req = JSON.parse(q.requirement);
      console.log(`   ${q.title}`);
      console.log(`      Yêu cầu: ${req.count} | Thưởng: ⭐${q.stars} 💎${q.diamonds}`);
    });

    console.log('\n🏆 SPECIAL (Dài hạn) - Tổng: ' + special.reduce((s,q) => s + q.stars, 0) + '⭐');
    special.forEach(q => {
      const req = JSON.parse(q.requirement);
      console.log(`   ${q.title}`);
      console.log(`      Yêu cầu: ${req.count} | Thưởng: ⭐${q.stars} 💎${q.diamonds}`);
    });

    console.log('\n✅ Đã cập nhật xong!');
    console.log('\n📊 Ước tính thời gian hoàn thành:');
    console.log('   Daily: 15-30 phút/ngày');
    console.log('   Weekly: Học 4-5 ngày/tuần');
    console.log('   Special: 2-4 tuần');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateQuests();
