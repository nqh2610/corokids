const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * ============================================================
 * 🎯 HỆ THỐNG NHIỆM VỤ (QUESTS) - GAME HÓA CHO SOROKIDS
 * ============================================================
 * 
 * Phân loại:
 * - daily: Nhiệm vụ hàng ngày (reset mỗi ngày)
 * - weekly: Nhiệm vụ hàng tuần (reset mỗi tuần)
 * - special: Nhiệm vụ đặc biệt (không hết hạn)
 * 
 * Nguyên tắc phần thưởng:
 * - Độ khó 1 (Dễ): 30-50⭐
 * - Độ khó 2 (Trung bình): 60-100⭐
 * - Độ khó 3 (Khó): 120-200⭐
 * - Độ khó 4 (Rất khó): 250-500⭐
 */

const quests = [
  // ========== NHIỆM VỤ HÀNG NGÀY ==========
  {
    title: '🌅 Khởi động buổi sáng',
    description: 'Hoàn thành 3 bài tập để khởi động não bộ',
    type: 'daily',
    category: 'practice',
    requirement: JSON.stringify({ type: 'complete_exercises', count: 3 }),
    stars: 10,
    diamonds: 1
  },
  {
    title: '📖 Học sinh chăm chỉ',
    description: 'Hoàn thành 1 bài học mới',
    type: 'daily',
    category: 'lesson',
    requirement: JSON.stringify({ type: 'complete_lessons', count: 1 }),
    stars: 15,
    diamonds: 2
  },
  {
    title: '💪 Luyện tập siêng năng',
    description: 'Hoàn thành 10 bài tập trong ngày',
    type: 'daily',
    category: 'practice',
    requirement: JSON.stringify({ type: 'complete_exercises', count: 10 }),
    stars: 20,
    diamonds: 3
  },
  {
    title: '🎯 Xạ thủ chính xác',
    description: 'Đạt 100% chính xác trong 5 bài tập liên tiếp',
    type: 'daily',
    category: 'accuracy',
    requirement: JSON.stringify({ type: 'perfect_streak', count: 5 }),
    stars: 25,
    diamonds: 5
  },
  {
    title: '⚡ Tia chớp',
    description: 'Hoàn thành 5 bài tập trong vòng 3 phút',
    type: 'daily',
    category: 'speed',
    requirement: JSON.stringify({ type: 'speed_challenge', exercises: 5, timeLimit: 180 }),
    stars: 30,
    diamonds: 5
  },

  // ========== NHIỆM VỤ HÀNG TUẦN ==========
  {
    title: '📚 Tuần học tập hiệu quả',
    description: 'Hoàn thành 5 bài học trong tuần',
    type: 'weekly',
    category: 'lesson',
    requirement: JSON.stringify({ type: 'complete_lessons', count: 5 }),
    stars: 50,
    diamonds: 10
  },
  {
    title: '🏋️ Vận động viên Soroban',
    description: 'Hoàn thành 50 bài tập trong tuần',
    type: 'weekly',
    category: 'practice',
    requirement: JSON.stringify({ type: 'complete_exercises', count: 50 }),
    stars: 60,
    diamonds: 15
  },
  {
    title: '🔥 Ngọn lửa bền bỉ',
    description: 'Đăng nhập học 7 ngày liên tiếp',
    type: 'weekly',
    category: 'streak',
    requirement: JSON.stringify({ type: 'login_streak', count: 7 }),
    stars: 70,
    diamonds: 20
  },
  {
    title: '🏆 Chiến binh đấu trường',
    description: 'Tham gia 3 trận thi đấu trong tuần',
    type: 'weekly',
    category: 'compete',
    requirement: JSON.stringify({ type: 'compete_matches', count: 3 }),
    stars: 50,
    diamonds: 10
  },
  {
    title: '🥇 Vô địch tuần',
    description: 'Đạt Top 3 trong 1 trận thi đấu',
    type: 'weekly',
    category: 'compete',
    requirement: JSON.stringify({ type: 'compete_top3', count: 1 }),
    stars: 80,
    diamonds: 25
  },

  // ========== NHIỆM VỤ ĐẶC BIỆT ==========
  {
    title: '🌟 Siêu sao học tập',
    description: 'Đạt 3 sao trong 10 bài học',
    type: 'special',
    category: 'mastery',
    requirement: JSON.stringify({ type: 'three_star_lessons', count: 10 }),
    stars: 100,
    diamonds: 50
  },
  {
    title: '🧠 Thiên tài tính nhẩm',
    description: 'Hoàn thành 100 bài tập với độ chính xác > 90%',
    type: 'special',
    category: 'accuracy',
    requirement: JSON.stringify({ type: 'accurate_exercises', count: 100, minAccuracy: 90 }),
    stars: 150,
    diamonds: 100
  }
];

/**
 * ============================================================
 * 🏅 HỆ THỐNG THÀNH TÍCH (ACHIEVEMENTS) - GAME HÓA
 * ============================================================
 * 
 * Phân loại:
 * - beginner: Thành tích cho người mới
 * - learning: Thành tích học tập
 * - practice: Thành tích luyện tập
 * - streak: Thành tích chuỗi ngày
 * - compete: Thành tích thi đấu
 * - mastery: Thành tích bậc thầy
 * - special: Thành tích đặc biệt
 * 
 * Tên game hóa: Sử dụng thuật ngữ Soroban + hình ảnh võ thuật/game
 */

const achievements = [
  // ========== BEGINNER - Khởi đầu hành trình ==========
  {
    name: '🌱 Hạt giống Soroban',
    description: 'Hoàn thành bài học đầu tiên - Hành trình nghìn dặm bắt đầu từ một bước chân',
    icon: '🌱',
    category: 'beginner',
    requirement: JSON.stringify({ type: 'complete_lessons', count: 1 }),
    stars: 10,
    diamonds: 2
  },
  {
    name: '✋ Năm ngón đầu tiên',
    description: 'Hoàn thành 5 bài tập - Làm chủ 5 hạt dưới của Soroban',
    icon: '✋',
    category: 'beginner',
    requirement: JSON.stringify({ type: 'complete_exercises', count: 5 }),
    stars: 5,
    diamonds: 1
  },
  {
    name: '🎯 Phát súng đầu tiên',
    description: 'Đạt 100% chính xác trong 1 bài tập',
    icon: '🎯',
    category: 'beginner',
    requirement: JSON.stringify({ type: 'perfect_exercise', count: 1 }),
    stars: 8,
    diamonds: 2
  },

  // ========== LEARNING - Hành trình học tập ==========
  {
    name: '📖 Môn đồ Soroban',
    description: 'Hoàn thành 5 bài học - Bạn đã bước vào con đường học Soroban',
    icon: '📖',
    category: 'learning',
    requirement: JSON.stringify({ type: 'complete_lessons', count: 5 }),
    stars: 20,
    diamonds: 5
  },
  {
    name: '📚 Học giả nhỏ tuổi',
    description: 'Hoàn thành 10 bài học - Kiến thức của bạn đang lớn dần',
    icon: '📚',
    category: 'learning',
    requirement: JSON.stringify({ type: 'complete_lessons', count: 10 }),
    stars: 30,
    diamonds: 10
  },
  {
    name: '🎓 Cử nhân Soroban',
    description: 'Hoàn thành 20 bài học - Bạn đã tốt nghiệp khóa cơ bản',
    icon: '🎓',
    category: 'learning',
    requirement: JSON.stringify({ type: 'complete_lessons', count: 20 }),
    stars: 50,
    diamonds: 20
  },
  {
    name: '👨‍🏫 Thạc sĩ tính nhẩm',
    description: 'Hoàn thành 30 bài học - Bạn có thể dạy lại người khác',
    icon: '👨‍🏫',
    category: 'learning',
    requirement: JSON.stringify({ type: 'complete_lessons', count: 30 }),
    stars: 80,
    diamonds: 30
  },
  {
    name: '🏛️ Tiến sĩ Abacus',
    description: 'Hoàn thành tất cả bài học - Bạn là bậc thầy Soroban!',
    icon: '🏛️',
    category: 'learning',
    requirement: JSON.stringify({ type: 'complete_all_lessons' }),
    stars: 150,
    diamonds: 100
  },

  // ========== PRACTICE - Luyện tập không ngừng ==========
  {
    name: '💪 Chiến binh tập sự',
    description: 'Hoàn thành 20 bài tập',
    icon: '💪',
    category: 'practice',
    requirement: JSON.stringify({ type: 'complete_exercises', count: 20 }),
    stars: 15,
    diamonds: 3
  },
  {
    name: '⚔️ Kiếm sĩ Soroban',
    description: 'Hoàn thành 50 bài tập',
    icon: '⚔️',
    category: 'practice',
    requirement: JSON.stringify({ type: 'complete_exercises', count: 50 }),
    stars: 25,
    diamonds: 8
  },
  {
    name: '🥷 Ninja số học',
    description: 'Hoàn thành 100 bài tập',
    icon: '🥷',
    category: 'practice',
    requirement: JSON.stringify({ type: 'complete_exercises', count: 100 }),
    stars: 40,
    diamonds: 15
  },
  {
    name: '🐉 Rồng luyện công',
    description: 'Hoàn thành 200 bài tập',
    icon: '🐉',
    category: 'practice',
    requirement: JSON.stringify({ type: 'complete_exercises', count: 200 }),
    stars: 60,
    diamonds: 30
  },
  {
    name: '🌋 Thần thoại luyện tập',
    description: 'Hoàn thành 500 bài tập - Không ai bì được sự kiên trì của bạn!',
    icon: '🌋',
    category: 'practice',
    requirement: JSON.stringify({ type: 'complete_exercises', count: 500 }),
    stars: 100,
    diamonds: 80
  },

  // ========== ACCURACY - Chính xác tuyệt đối ==========
  {
    name: '🎯 Mắt đại bàng',
    description: 'Đạt 100% chính xác trong 10 bài tập',
    icon: '🎯',
    category: 'accuracy',
    requirement: JSON.stringify({ type: 'perfect_exercises', count: 10 }),
    stars: 15,
    diamonds: 5
  },
  {
    name: '🏹 Cung thủ bách phát',
    description: 'Đạt 100% chính xác trong 25 bài tập',
    icon: '🏹',
    category: 'accuracy',
    requirement: JSON.stringify({ type: 'perfect_exercises', count: 25 }),
    stars: 30,
    diamonds: 12
  },
  {
    name: '💎 Kim cương không tì vết',
    description: 'Đạt 100% chính xác trong 50 bài tập',
    icon: '💎',
    category: 'accuracy',
    requirement: JSON.stringify({ type: 'perfect_exercises', count: 50 }),
    stars: 50,
    diamonds: 25
  },
  {
    name: '👁️ Thần nhãn Soroban',
    description: 'Đạt 100% chính xác trong 100 bài tập - Không có gì thoát khỏi mắt bạn!',
    icon: '👁️',
    category: 'accuracy',
    requirement: JSON.stringify({ type: 'perfect_exercises', count: 100 }),
    stars: 80,
    diamonds: 50
  },

  // ========== SPEED - Tốc độ ánh sáng ==========
  {
    name: '⚡ Tia chớp nhỏ',
    description: 'Hoàn thành 1 bài tập trong dưới 3 giây',
    icon: '⚡',
    category: 'speed',
    requirement: JSON.stringify({ type: 'fast_exercise', timeLimit: 3, count: 1 }),
    stars: 10,
    diamonds: 3
  },
  {
    name: '🚀 Tên lửa số học',
    description: 'Hoàn thành 10 bài tập liên tiếp trong dưới 5 giây mỗi bài',
    icon: '🚀',
    category: 'speed',
    requirement: JSON.stringify({ type: 'fast_streak', timeLimit: 5, count: 10 }),
    stars: 30,
    diamonds: 12
  },
  {
    name: '🌪️ Cơn bão Soroban',
    description: 'Hoàn thành 20 bài tập trong 1 phút',
    icon: '🌪️',
    category: 'speed',
    requirement: JSON.stringify({ type: 'speed_rush', exercises: 20, timeLimit: 60 }),
    stars: 50,
    diamonds: 25
  },
  {
    name: '✨ Siêu thanh tốc',
    description: 'Hoàn thành 50 bài tập trong 5 phút với 95% chính xác',
    icon: '✨',
    category: 'speed',
    requirement: JSON.stringify({ type: 'speed_master', exercises: 50, timeLimit: 300, minAccuracy: 95 }),
    stars: 80,
    diamonds: 50
  },

  // ========== STREAK - Kiên trì là chìa khóa ==========
  {
    name: '🔥 Ngọn lửa nhỏ',
    description: 'Học 3 ngày liên tiếp',
    icon: '🔥',
    category: 'streak',
    requirement: JSON.stringify({ type: 'streak', count: 3 }),
    stars: 10,
    diamonds: 3
  },
  {
    name: '🔥🔥 Lửa cháy rực',
    description: 'Học 7 ngày liên tiếp - Một tuần không nghỉ!',
    icon: '🔥',
    category: 'streak',
    requirement: JSON.stringify({ type: 'streak', count: 7 }),
    stars: 20,
    diamonds: 10
  },
  {
    name: '☀️ Mặt trời bền bỉ',
    description: 'Học 14 ngày liên tiếp - Hai tuần kiên trì!',
    icon: '☀️',
    category: 'streak',
    requirement: JSON.stringify({ type: 'streak', count: 14 }),
    stars: 35,
    diamonds: 20
  },
  {
    name: '🌙 Nguyệt thực học tập',
    description: 'Học 30 ngày liên tiếp - Một tháng không ngừng nghỉ!',
    icon: '🌙',
    category: 'streak',
    requirement: JSON.stringify({ type: 'streak', count: 30 }),
    stars: 60,
    diamonds: 40
  },
  {
    name: '⭐ Huyền thoại kiên trì',
    description: 'Học 100 ngày liên tiếp - Bạn là huyền thoại!',
    icon: '⭐',
    category: 'streak',
    requirement: JSON.stringify({ type: 'streak', count: 100 }),
    stars: 150,
    diamonds: 150
  },

  // ========== COMPETE - Chiến binh đấu trường ==========
  {
    name: '🎮 Tân binh đấu trường',
    description: 'Tham gia trận thi đấu đầu tiên',
    icon: '🎮',
    category: 'compete',
    requirement: JSON.stringify({ type: 'compete_matches', count: 1 }),
    stars: 10,
    diamonds: 3
  },
  {
    name: '🏅 Chiến binh đồng',
    description: 'Tham gia 10 trận thi đấu',
    icon: '🏅',
    category: 'compete',
    requirement: JSON.stringify({ type: 'compete_matches', count: 10 }),
    stars: 20,
    diamonds: 10
  },
  {
    name: '🥈 Chiến binh bạc',
    description: 'Tham gia 25 trận thi đấu',
    icon: '🥈',
    category: 'compete',
    requirement: JSON.stringify({ type: 'compete_matches', count: 25 }),
    stars: 35,
    diamonds: 20
  },
  {
    name: '🥇 Chiến binh vàng',
    description: 'Tham gia 50 trận thi đấu',
    icon: '🥇',
    category: 'compete',
    requirement: JSON.stringify({ type: 'compete_matches', count: 50 }),
    stars: 60,
    diamonds: 35
  },
  {
    name: '🏆 Quán quân đấu trường',
    description: 'Đạt hạng 1 trong 5 trận thi đấu',
    icon: '🏆',
    category: 'compete',
    requirement: JSON.stringify({ type: 'compete_first_place', count: 5 }),
    stars: 50,
    diamonds: 30
  },
  {
    name: '👑 Vua đấu trường',
    description: 'Đạt hạng 1 trong 20 trận thi đấu',
    icon: '👑',
    category: 'compete',
    requirement: JSON.stringify({ type: 'compete_first_place', count: 20 }),
    stars: 100,
    diamonds: 80
  },

  // ========== MASTERY - Bậc thầy Soroban ==========
  {
    name: '⭐ Ba sao hoàn hảo',
    description: 'Đạt 3 sao trong 5 bài học',
    icon: '⭐',
    category: 'mastery',
    requirement: JSON.stringify({ type: 'three_star_lessons', count: 5 }),
    stars: 20,
    diamonds: 8
  },
  {
    name: '🌟 Ngôi sao đang lên',
    description: 'Đạt 3 sao trong 15 bài học',
    icon: '🌟',
    category: 'mastery',
    requirement: JSON.stringify({ type: 'three_star_lessons', count: 15 }),
    stars: 50,
    diamonds: 25
  },
  {
    name: '💫 Siêu sao Soroban',
    description: 'Đạt 3 sao trong tất cả bài học',
    icon: '💫',
    category: 'mastery',
    requirement: JSON.stringify({ type: 'three_star_all_lessons' }),
    stars: 100,
    diamonds: 100
  },

  // ========== SPECIAL - Thành tích đặc biệt ==========
  {
    name: '🎂 Sinh nhật vui vẻ',
    description: 'Đăng nhập vào ngày sinh nhật',
    icon: '🎂',
    category: 'special',
    requirement: JSON.stringify({ type: 'birthday_login' }),
    stars: 20,
    diamonds: 10
  },
  {
    name: '🎊 Người tiên phong',
    description: 'Là một trong 100 người dùng đầu tiên',
    icon: '🎊',
    category: 'special',
    requirement: JSON.stringify({ type: 'early_adopter', rank: 100 }),
    stars: 50,
    diamonds: 50
  },
  {
    name: '🌈 Bộ sưu tập hoàn hảo',
    description: 'Mở khóa 20 thành tích khác',
    icon: '🌈',
    category: 'special',
    requirement: JSON.stringify({ type: 'unlock_achievements', count: 20 }),
    stars: 50,
    diamonds: 50
  },
  {
    name: '🦄 Huyền thoại SoroKids',
    description: 'Mở khóa tất cả thành tích - Bạn là huyền thoại!',
    icon: '🦄',
    category: 'special',
    requirement: JSON.stringify({ type: 'unlock_all_achievements' }),
    stars: 200,
    diamonds: 500
  }
];

/**
 * ============================================================
 * 📊 BẢNG TỔNG HỢP
 * ============================================================
 * 
 * NHIỆM VỤ: 12 nhiệm vụ
 * - Daily (5): 30-120⭐
 * - Weekly (5): 200-350⭐
 * - Special (2): 500-800⭐
 * 
 * THÀNH TÍCH: 38 thành tích
 * - Beginner (3): 30-50⭐
 * - Learning (5): 50-1000⭐
 * - Practice (5): 80-1000⭐
 * - Accuracy (4): 100-800⭐
 * - Speed (4): 50-800⭐
 * - Streak (5): 50-2000⭐
 * - Compete (6): 50-1000⭐
 * - Mastery (3): 150-1500⭐
 * - Special (4): 100-5000⭐
 * 
 * Tổng sao thưởng từ thành tích: ~17,680⭐
 */

async function seedQuestsAndAchievements() {
  console.log('🎯 Đang seed Nhiệm vụ và Thành tích...\n');

  // Xóa dữ liệu cũ
  await prisma.userQuest.deleteMany({});
  await prisma.quest.deleteMany({});
  await prisma.userAchievement.deleteMany({});
  await prisma.achievement.deleteMany({});
  console.log('🗑️ Đã xóa dữ liệu cũ!\n');

  // Seed Quests
  console.log('📋 NHIỆM VỤ (Quests):');
  console.log('─'.repeat(60));
  
  for (const quest of quests) {
    await prisma.quest.create({ data: quest });
    console.log(`  ✅ ${quest.title}`);
    console.log(`     📝 ${quest.description}`);
    console.log(`     🏷️ ${quest.type} | ⭐ ${quest.stars}`);
    console.log('');
  }
  console.log(`\n📊 Tổng: ${quests.length} nhiệm vụ\n`);

  // Seed Achievements
  console.log('🏅 THÀNH TÍCH (Achievements):');
  console.log('─'.repeat(60));
  
  const categoryStats = {};
  let totalStars = 0;

  for (const achievement of achievements) {
    await prisma.achievement.create({ data: achievement });
    
    // Thống kê
    if (!categoryStats[achievement.category]) {
      categoryStats[achievement.category] = { count: 0, stars: 0 };
    }
    categoryStats[achievement.category].count++;
    categoryStats[achievement.category].stars += achievement.stars;
    totalStars += achievement.stars;

    console.log(`  ${achievement.icon} ${achievement.name}`);
    console.log(`     📝 ${achievement.description}`);
    console.log(`     🏷️ ${achievement.category} | ⭐ ${achievement.stars}`);
    console.log('');
  }

  console.log('\n📊 THỐNG KÊ THÀNH TÍCH:');
  console.log('─'.repeat(40));
  for (const [category, stats] of Object.entries(categoryStats)) {
    console.log(`  ${category}: ${stats.count} thành tích, ${stats.stars}⭐`);
  }
  console.log('─'.repeat(40));
  console.log(`  TỔNG: ${achievements.length} thành tích, ${totalStars.toLocaleString()}⭐`);

  console.log('\n✅ Hoàn tất seed Nhiệm vụ và Thành tích!');
}

seedQuestsAndAchievements()
  .catch((e) => {
    console.error('❌ Lỗi:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
