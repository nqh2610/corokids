const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * CẬP NHẬT NHIỆM VỤ - PHIÊN BẢN CÂN BẰNG HƠN
 * 
 * Vấn đề trước: Quá dễ hoàn thành vì yêu cầu thấp
 * 
 * Điều chỉnh:
 * 1. Tăng số lượng yêu cầu cho daily quests
 * 2. Phân biệt rõ exercises từ lesson vs practice
 * 3. Thêm điều kiện khó hơn cho weekly/special
 */

const balancedQuests = [
  // ========== DAILY QUESTS ==========
  {
    title: '📖 Học bài mới',
    description: 'Hoàn thành 1 bài học bất kỳ hôm nay',
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
    description: 'Làm 5 bài tập luyện tập hôm nay',
    type: 'daily',
    category: 'practice',
    requirement: JSON.stringify({ 
      type: 'complete_exercises', 
      count: 5,
      metric: 'exercises_completed_today'
    }),
    stars: 10,
    diamonds: 1
  },
  {
    title: '💪 Luyện tập chăm chỉ',
    description: 'Hoàn thành 20 bài tập luyện tập trong ngày',
    type: 'daily',
    category: 'practice',
    requirement: JSON.stringify({ 
      type: 'complete_exercises', 
      count: 20, // Tăng từ 10 lên 20
      metric: 'exercises_completed_today'
    }),
    stars: 30,
    diamonds: 4
  },
  {
    title: '🎯 Tập trung cao độ',
    description: 'Đạt 10 bài tập đúng liên tiếp (không sai bài nào)',
    type: 'daily',
    category: 'accuracy',
    requirement: JSON.stringify({ 
      type: 'accuracy_streak', 
      count: 10, // Tăng từ 5 lên 10
      minAccuracy: 100,
      metric: 'accurate_exercises_streak'
    }),
    stars: 25,
    diamonds: 4
  },

  // ========== WEEKLY QUESTS ==========
  {
    title: '📚 Tuần học tập hiệu quả',
    description: 'Hoàn thành 3 bài học trong tuần này',
    type: 'weekly',
    category: 'lesson',
    requirement: JSON.stringify({ 
      type: 'complete_lessons', 
      count: 3,
      metric: 'lessons_completed_week'
    }),
    stars: 40,
    diamonds: 6
  },
  {
    title: '🏋️ Vận động viên Soroban',
    description: 'Hoàn thành 50 bài tập luyện tập trong tuần',
    type: 'weekly',
    category: 'practice',
    requirement: JSON.stringify({ 
      type: 'complete_exercises', 
      count: 50, // Tăng từ 30 lên 50
      metric: 'exercises_completed_week'
    }),
    stars: 60,
    diamonds: 10
  },
  {
    title: '🔥 Ngọn lửa bền bỉ',
    description: 'Học 7 ngày liên tiếp không nghỉ',
    type: 'weekly',
    category: 'streak',
    requirement: JSON.stringify({ 
      type: 'login_streak', 
      count: 7, // Tăng từ 5 lên 7
      metric: 'current_streak'
    }),
    stars: 70,
    diamonds: 12
  },
  {
    title: '🏆 Nhà vô địch chính xác',
    description: 'Đạt 15 bài tập đúng 100% trong tuần',
    type: 'weekly',
    category: 'accuracy',
    requirement: JSON.stringify({ 
      type: 'perfect_exercises', 
      count: 15, // Tăng từ 3 lên 15
      metric: 'perfect_exercises_week'
    }),
    stars: 50,
    diamonds: 8
  },

  // ========== SPECIAL QUESTS (Dài hạn) ==========
  {
    title: '🌟 Ngôi sao học tập',
    description: 'Hoàn thành tất cả bài trong 5 màn chơi (level)',
    type: 'special',
    category: 'mastery',
    requirement: JSON.stringify({ 
      type: 'complete_levels', 
      count: 5, // Tăng từ 3 lên 5
      metric: 'levels_completed'
    }),
    stars: 150,
    diamonds: 30
  },
  {
    title: '🧠 Bậc thầy tính nhẩm',
    description: 'Hoàn thành 100 bài tập đúng (tổng cộng)',
    type: 'special',
    category: 'accuracy',
    requirement: JSON.stringify({ 
      type: 'accurate_exercises', 
      count: 100, // Tăng từ 50 lên 100
      minAccuracy: 100,
      metric: 'total_accurate_exercises'
    }),
    stars: 200,
    diamonds: 40
  },
  {
    title: '🎖️ Chiến binh kiên cường',
    description: 'Học liên tục 21 ngày không nghỉ (3 tuần)',
    type: 'special',
    category: 'streak',
    requirement: JSON.stringify({ 
      type: 'login_streak', 
      count: 21, // Tăng từ 14 lên 21
      metric: 'max_streak'
    }),
    stars: 250,
    diamonds: 50
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
    stars: 500,
    diamonds: 100
  }
];

async function updateQuests() {
  try {
    console.log('=== CẬP NHẬT NHIỆM VỤ CÂN BẰNG ===\n');

    // Xóa cũ
    await prisma.userQuest.deleteMany({});
    await prisma.quest.deleteMany({});
    console.log('🗑️ Đã xóa quests cũ');

    // Tạo mới
    for (const quest of balancedQuests) {
      await prisma.quest.create({ data: quest });
    }
    console.log(`✅ Đã tạo ${balancedQuests.length} nhiệm vụ mới!\n`);

    // Hiển thị
    const daily = balancedQuests.filter(q => q.type === 'daily');
    const weekly = balancedQuests.filter(q => q.type === 'weekly');
    const special = balancedQuests.filter(q => q.type === 'special');

    console.log('📅 DAILY (Hàng ngày):');
    daily.forEach(q => {
      const req = JSON.parse(q.requirement);
      console.log(`   ${q.title} - Yêu cầu: ${req.count} | Thưởng: ⭐${q.stars}`);
    });

    console.log('\n📆 WEEKLY (Hàng tuần):');
    weekly.forEach(q => {
      const req = JSON.parse(q.requirement);
      console.log(`   ${q.title} - Yêu cầu: ${req.count} | Thưởng: ⭐${q.stars}`);
    });

    console.log('\n🏆 SPECIAL (Dài hạn):');
    special.forEach(q => {
      const req = JSON.parse(q.requirement);
      console.log(`   ${q.title} - Yêu cầu: ${req.count} | Thưởng: ⭐${q.stars}`);
    });

    console.log('\n=== SO SÁNH VỚI DỮ LIỆU HIỆN TẠI ===');
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    const exToday = await prisma.exerciseResult.count({ where: { createdAt: { gte: today } } });
    const exWeek = await prisma.exerciseResult.count({ where: { createdAt: { gte: weekStart } } });
    const lessonsToday = await prisma.progress.count({ where: { completed: true, completedAt: { gte: today } } });
    const user = await prisma.user.findFirst({ where: { role: 'student' }, select: { streak: true } });

    console.log(`\nDữ liệu user hiện tại:`);
    console.log(`  Exercises hôm nay: ${exToday} (cần 5/20 cho daily)`);
    console.log(`  Exercises tuần này: ${exWeek} (cần 50 cho weekly)`);
    console.log(`  Lessons hôm nay: ${lessonsToday} (cần 1 cho daily)`);
    console.log(`  Streak: ${user?.streak || 0} ngày (cần 7 cho weekly, 21 cho special)`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateQuests();
