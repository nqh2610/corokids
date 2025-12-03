const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * THIẾT KẾ LẠI HỆ THỐNG NHIỆM VỤ
 * 
 * Nguyên tắc:
 * 1. Mỗi nhiệm vụ phải ĐO LƯỜNG ĐƯỢC (có số cụ thể)
 * 2. Mô tả RÕ RÀNG cho trẻ em hiểu
 * 3. Phần thưởng TƯƠNG XỨNG với công sức
 * 4. Phân loại theo thời gian: daily (1 ngày), weekly (7 ngày), special (dài hạn)
 * 
 * Quy ước phần thưởng:
 * - 1 bài học hoàn thành = ~6 sao
 * - Daily quest: 10-30 sao (dễ hoàn thành trong ngày)
 * - Weekly quest: 40-80 sao (cần cả tuần)
 * - Special quest: 100-200 sao (thành tựu dài hạn)
 * - Diamonds = 10-20% số sao
 */

const newQuests = [
  // ========== DAILY QUESTS (Nhiệm vụ hàng ngày) ==========
  {
    title: '📖 Học bài mới',
    description: 'Hoàn thành 1 bài học bất kỳ',
    type: 'daily',
    category: 'lesson',
    requirement: JSON.stringify({ 
      type: 'complete_lessons', 
      count: 1,
      metric: 'lessons_completed_today'
    }),
    stars: 15,
    diamonds: 2
  },
  {
    title: '🌅 Khởi động buổi sáng',
    description: 'Làm 3 bài tập để khởi động não',
    type: 'daily',
    category: 'practice',
    requirement: JSON.stringify({ 
      type: 'complete_exercises', 
      count: 3,
      metric: 'exercises_completed_today'
    }),
    stars: 10,
    diamonds: 1
  },
  {
    title: '💪 Luyện tập chăm chỉ',
    description: 'Hoàn thành 10 bài tập trong ngày',
    type: 'daily',
    category: 'practice',
    requirement: JSON.stringify({ 
      type: 'complete_exercises', 
      count: 10,
      metric: 'exercises_completed_today'
    }),
    stars: 25,
    diamonds: 3
  },
  {
    title: '🎯 Bắn trúng mục tiêu',
    description: 'Đạt 80% chính xác trong 5 bài tập liên tiếp',
    type: 'daily',
    category: 'accuracy',
    requirement: JSON.stringify({ 
      type: 'accuracy_streak', 
      count: 5,
      minAccuracy: 80,
      metric: 'accurate_exercises_streak'
    }),
    stars: 20,
    diamonds: 3
  },
  {
    title: '⚡ Tia chớp nhanh',
    description: 'Hoàn thành 5 bài tập trong 5 phút',
    type: 'daily',
    category: 'speed',
    requirement: JSON.stringify({ 
      type: 'speed_exercises', 
      count: 5,
      timeLimit: 300, // 5 phút = 300 giây
      metric: 'speed_exercises_count'
    }),
    stars: 20,
    diamonds: 3
  },

  // ========== WEEKLY QUESTS (Nhiệm vụ hàng tuần) ==========
  {
    title: '📚 Tuần học tập',
    description: 'Hoàn thành 5 bài học trong tuần',
    type: 'weekly',
    category: 'lesson',
    requirement: JSON.stringify({ 
      type: 'complete_lessons', 
      count: 5,
      metric: 'lessons_completed_week'
    }),
    stars: 50,
    diamonds: 8
  },
  {
    title: '🏋️ Vận động viên Soroban',
    description: 'Hoàn thành 30 bài tập trong tuần',
    type: 'weekly',
    category: 'practice',
    requirement: JSON.stringify({ 
      type: 'complete_exercises', 
      count: 30,
      metric: 'exercises_completed_week'
    }),
    stars: 50,
    diamonds: 8
  },
  {
    title: '🔥 Ngọn lửa bền bỉ',
    description: 'Học 5 ngày liên tiếp trong tuần',
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
    description: 'Hoàn thành 3 bài tập đạt 100% chính xác',
    type: 'weekly',
    category: 'accuracy',
    requirement: JSON.stringify({ 
      type: 'perfect_exercises', 
      count: 3,
      metric: 'perfect_exercises_week'
    }),
    stars: 40,
    diamonds: 6
  },

  // ========== SPECIAL QUESTS (Nhiệm vụ đặc biệt - dài hạn) ==========
  {
    title: '🌟 Ngôi sao học tập',
    description: 'Hoàn thành tất cả bài trong 3 màn chơi (level)',
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
    description: 'Hoàn thành 50 bài tập với độ chính xác trên 85%',
    type: 'special',
    category: 'accuracy',
    requirement: JSON.stringify({ 
      type: 'accurate_exercises', 
      count: 50,
      minAccuracy: 85,
      metric: 'total_accurate_exercises'
    }),
    stars: 120,
    diamonds: 25
  },
  {
    title: '🎖️ Chiến binh kiên cường',
    description: 'Học liên tục 14 ngày không nghỉ',
    type: 'special',
    category: 'streak',
    requirement: JSON.stringify({ 
      type: 'login_streak', 
      count: 14,
      metric: 'max_streak'
    }),
    stars: 150,
    diamonds: 30
  }
];

async function updateQuests() {
  try {
    console.log('=== CẬP NHẬT HỆ THỐNG NHIỆM VỤ ===\n');

    // 1. Xóa tất cả quests cũ
    const deletedUserQuests = await prisma.userQuest.deleteMany({});
    console.log(`🗑️ Đã xóa ${deletedUserQuests.count} user quest records`);

    const deletedQuests = await prisma.quest.deleteMany({});
    console.log(`🗑️ Đã xóa ${deletedQuests.count} quests cũ`);

    // 2. Tạo quests mới
    for (const quest of newQuests) {
      await prisma.quest.create({ data: quest });
    }
    console.log(`\n✅ Đã tạo ${newQuests.length} nhiệm vụ mới!\n`);

    // 3. Hiển thị tổng quan
    console.log('=== TỔNG QUAN NHIỆM VỤ MỚI ===\n');

    const dailyQuests = newQuests.filter(q => q.type === 'daily');
    const weeklyQuests = newQuests.filter(q => q.type === 'weekly');
    const specialQuests = newQuests.filter(q => q.type === 'special');

    console.log('📅 NHIỆM VỤ HÀNG NGÀY (Daily):');
    dailyQuests.forEach(q => {
      const req = JSON.parse(q.requirement);
      console.log(`   ${q.title}`);
      console.log(`      └─ ${q.description}`);
      console.log(`      └─ Yêu cầu: ${req.count} | Thưởng: ⭐${q.stars} 💎${q.diamonds}`);
    });

    console.log('\n📆 NHIỆM VỤ HÀNG TUẦN (Weekly):');
    weeklyQuests.forEach(q => {
      const req = JSON.parse(q.requirement);
      console.log(`   ${q.title}`);
      console.log(`      └─ ${q.description}`);
      console.log(`      └─ Yêu cầu: ${req.count} | Thưởng: ⭐${q.stars} 💎${q.diamonds}`);
    });

    console.log('\n🏆 NHIỆM VỤ ĐẶC BIỆT (Special):');
    specialQuests.forEach(q => {
      const req = JSON.parse(q.requirement);
      console.log(`   ${q.title}`);
      console.log(`      └─ ${q.description}`);
      console.log(`      └─ Yêu cầu: ${req.count} | Thưởng: ⭐${q.stars} 💎${q.diamonds}`);
    });

    // 4. Tổng kết
    console.log('\n=== TỔNG KẾT ===');
    console.log(`Daily: ${dailyQuests.length} nhiệm vụ (tổng ${dailyQuests.reduce((s, q) => s + q.stars, 0)}⭐ có thể nhận/ngày)`);
    console.log(`Weekly: ${weeklyQuests.length} nhiệm vụ (tổng ${weeklyQuests.reduce((s, q) => s + q.stars, 0)}⭐ có thể nhận/tuần)`);
    console.log(`Special: ${specialQuests.length} nhiệm vụ (tổng ${specialQuests.reduce((s, q) => s + q.stars, 0)}⭐)`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateQuests();
