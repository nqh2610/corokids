const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const lessons = [
  // Level 1: Làm quen Soroban
  {
    levelId: 1, lessonId: 1, title: 'Giới thiệu bàn tính Soroban', order: 1,
    description: 'Tìm hiểu về lịch sử và cấu tạo của bàn tính Soroban',
    content: JSON.stringify({
      steps: [
        { type: 'text', content: 'Soroban là bàn tính Nhật Bản, được phát triển từ bàn tính Trung Quốc (Abacus).' },
        { type: 'image', content: '/images/soroban-history.jpg', alt: 'Lịch sử Soroban' },
        { type: 'text', content: 'Bàn tính Soroban gồm 2 phần: Hạt trên (Heaven bead) có giá trị 5 và hạt dưới (Earth beads) mỗi hạt có giá trị 1.' },
        { type: 'interactive', content: 'soroban-demo', data: { mode: 'explore' } },
        { type: 'quiz', question: 'Hạt trên có giá trị bao nhiêu?', options: ['1', '5', '10', '0'], answer: 1 }
      ]
    }),
    difficulty: 1, duration: 10, stars: 10
  },
  {
    levelId: 1, lessonId: 2, title: 'Biểu diễn số 0-4', order: 2,
    description: 'Học cách biểu diễn các số từ 0 đến 4 bằng hạt dưới',
    content: JSON.stringify({
      steps: [
        { type: 'text', content: 'Số 0: Tất cả hạt dưới ở vị trí xuống dưới, hạt trên ở vị trí trên.' },
        { type: 'interactive', content: 'soroban-demo', data: { target: 0, hint: true } },
        { type: 'text', content: 'Số 1-4: Đẩy từng hạt dưới lên một để tạo thành số tương ứng.' },
        { type: 'practice', exercises: [
          { instruction: 'Tạo số 2', target: 2 },
          { instruction: 'Tạo số 4', target: 4 },
          { instruction: 'Tạo số 3', target: 3 }
        ]}
      ]
    }),
    difficulty: 1, duration: 15, stars: 15
  },
  {
    levelId: 1, lessonId: 3, title: 'Biểu diễn số 5-9', order: 3,
    description: 'Học cách sử dụng hạt trên để biểu diễn số 5-9',
    content: JSON.stringify({
      steps: [
        { type: 'text', content: 'Số 5: Đẩy hạt trên xuống, tất cả hạt dưới ở vị trí xuống.' },
        { type: 'interactive', content: 'soroban-demo', data: { target: 5, hint: true } },
        { type: 'text', content: 'Số 6-9: Hạt trên xuống (5) + hạt dưới tương ứng (1-4).' },
        { type: 'practice', exercises: [
          { instruction: 'Tạo số 7', target: 7 },
          { instruction: 'Tạo số 9', target: 9 },
          { instruction: 'Tạo số 6', target: 6 }
        ]}
      ]
    }),
    difficulty: 1, duration: 15, stars: 15
  },
  {
    levelId: 1, lessonId: 4, title: 'Cộng đơn giản (0-4)', order: 4,
    description: 'Thực hiện phép cộng đơn giản không cần nhớ',
    content: JSON.stringify({
      steps: [
        { type: 'text', content: 'Phép cộng đơn giản: Chỉ cần đẩy thêm hạt dưới lên.' },
        { type: 'example', problem: '2 + 1', solution: 'Bắt đầu với 2 (2 hạt dưới), đẩy thêm 1 hạt nữa → kết quả 3' },
        { type: 'interactive', content: 'soroban-demo', data: { operation: 'add', num1: 2, num2: 1 } },
        { type: 'practice', exercises: [
          { instruction: 'Tính 1 + 2', answer: 3 },
          { instruction: 'Tính 2 + 2', answer: 4 },
          { instruction: 'Tính 1 + 3', answer: 4 }
        ]}
      ]
    }),
    difficulty: 1, duration: 20, stars: 20
  },
  {
    levelId: 1, lessonId: 5, title: 'Trừ đơn giản (0-4)', order: 5,
    description: 'Thực hiện phép trừ đơn giản',
    content: JSON.stringify({
      steps: [
        { type: 'text', content: 'Phép trừ đơn giản: Đẩy hạt dưới xuống để trừ.' },
        { type: 'example', problem: '4 - 1', solution: 'Bắt đầu với 4 (4 hạt dưới), đẩy 1 hạt xuống → kết quả 3' },
        { type: 'practice', exercises: [
          { instruction: 'Tính 3 - 1', answer: 2 },
          { instruction: 'Tính 4 - 2', answer: 2 },
          { instruction: 'Tính 3 - 2', answer: 1 }
        ]}
      ]
    }),
    difficulty: 1, duration: 20, stars: 20
  },
  {
    levelId: 1, lessonId: 6, title: 'Cộng với số 5', order: 6,
    description: 'Học kỹ thuật cộng sử dụng hạt trên',
    content: JSON.stringify({
      steps: [
        { type: 'text', content: 'Khi cộng với 5, ta sử dụng hạt trên.' },
        { type: 'example', problem: '2 + 5', solution: 'Bắt đầu với 2, đẩy hạt trên xuống (thêm 5), đẩy 2 hạt dưới xuống → kết quả 7' },
        { type: 'practice', exercises: [
          { instruction: 'Tính 1 + 5', answer: 6 },
          { instruction: 'Tính 3 + 5', answer: 8 },
          { instruction: 'Tính 4 + 5', answer: 9 }
        ]}
      ]
    }),
    difficulty: 2, duration: 25, stars: 25
  },
  {
    levelId: 1, lessonId: 7, title: 'Trừ với số 5', order: 7,
    description: 'Học kỹ thuật trừ sử dụng hạt trên',
    content: JSON.stringify({
      steps: [
        { type: 'text', content: 'Khi trừ với 5, ta sử dụng hạt trên.' },
        { type: 'example', problem: '7 - 5', solution: 'Bắt đầu với 7, đẩy hạt trên lên (trừ 5) → kết quả 2' },
        { type: 'practice', exercises: [
          { instruction: 'Tính 6 - 5', answer: 1 },
          { instruction: 'Tính 9 - 5', answer: 4 },
          { instruction: 'Tính 8 - 5', answer: 3 }
        ]}
      ]
    }),
    difficulty: 2, duration: 25, stars: 25
  },
  {
    levelId: 1, lessonId: 8, title: 'Ôn tập Level 1', order: 8,
    description: 'Tổng hợp kiến thức Level 1',
    content: JSON.stringify({
      steps: [
        { type: 'text', content: 'Hãy thực hiện các bài tập tổng hợp để củng cố kiến thức!' },
        { type: 'practice', exercises: [
          { instruction: 'Tạo số 8', target: 8 },
          { instruction: 'Tính 3 + 2', answer: 5 },
          { instruction: 'Tính 7 - 3', answer: 4 },
          { instruction: 'Tính 4 + 5', answer: 9 },
          { instruction: 'Tính 9 - 5', answer: 4 }
        ]},
        { type: 'quiz', question: 'Số 7 được tạo bằng cách nào?', options: ['7 hạt dưới', 'Hạt trên + 2 hạt dưới', '1 hạt trên + 7 hạt dưới', 'Không thể tạo'], answer: 1 }
      ]
    }),
    difficulty: 2, duration: 30, stars: 30
  },

  // Level 2: Cộng trừ nâng cao
  {
    levelId: 2, lessonId: 1, title: 'Số 2 chữ số', order: 1,
    description: 'Học cách biểu diễn và thao tác với số 2 chữ số',
    content: JSON.stringify({
      steps: [
        { type: 'text', content: 'Với số 2 chữ số, ta sử dụng 2 cột trên bàn tính. Cột trái là chục, cột phải là đơn vị.' },
        { type: 'example', problem: 'Số 25', solution: 'Cột chục: 2, Cột đơn vị: 5' },
        { type: 'interactive', content: 'soroban-demo', data: { target: 25, columns: 2 } },
        { type: 'practice', exercises: [
          { instruction: 'Tạo số 37', target: 37 },
          { instruction: 'Tạo số 68', target: 68 },
          { instruction: 'Tạo số 94', target: 94 }
        ]}
      ]
    }),
    difficulty: 2, duration: 20, stars: 20
  },
  {
    levelId: 2, lessonId: 2, title: 'Cộng không nhớ', order: 2,
    description: 'Cộng 2 chữ số không có nhớ',
    content: JSON.stringify({
      steps: [
        { type: 'text', content: 'Cộng từng cột riêng biệt, bắt đầu từ đơn vị.' },
        { type: 'example', problem: '23 + 15', solution: 'Đơn vị: 3 + 5 = 8, Chục: 2 + 1 = 3 → Kết quả: 38' },
        { type: 'practice', exercises: [
          { instruction: 'Tính 12 + 17', answer: 29 },
          { instruction: 'Tính 34 + 24', answer: 58 },
          { instruction: 'Tính 41 + 32', answer: 73 }
        ]}
      ]
    }),
    difficulty: 2, duration: 25, stars: 25
  },
  {
    levelId: 2, lessonId: 3, title: 'Cộng có nhớ cơ bản', order: 3,
    description: 'Học kỹ thuật cộng có nhớ',
    content: JSON.stringify({
      steps: [
        { type: 'text', content: 'Khi đơn vị > 9, ta phải nhớ sang hàng chục.' },
        { type: 'example', problem: '18 + 7', solution: '8 + 7 = 15 → Viết 5, nhớ 1 → 1 + 1 = 2 → Kết quả: 25' },
        { type: 'practice', exercises: [
          { instruction: 'Tính 16 + 8', answer: 24 },
          { instruction: 'Tính 27 + 9', answer: 36 },
          { instruction: 'Tính 35 + 8', answer: 43 }
        ]}
      ]
    }),
    difficulty: 3, duration: 30, stars: 30
  },
  {
    levelId: 2, lessonId: 4, title: 'Trừ không mượn', order: 4,
    description: 'Trừ 2 chữ số không cần mượn',
    content: JSON.stringify({
      steps: [
        { type: 'text', content: 'Trừ từng cột riêng biệt, bắt đầu từ đơn vị.' },
        { type: 'example', problem: '58 - 23', solution: 'Đơn vị: 8 - 3 = 5, Chục: 5 - 2 = 3 → Kết quả: 35' },
        { type: 'practice', exercises: [
          { instruction: 'Tính 67 - 34', answer: 33 },
          { instruction: 'Tính 89 - 42', answer: 47 },
          { instruction: 'Tính 75 - 51', answer: 24 }
        ]}
      ]
    }),
    difficulty: 2, duration: 25, stars: 25
  }
];

const achievements = [
  { name: 'Người mới bắt đầu', description: 'Hoàn thành bài học đầu tiên', icon: '🌱', category: 'learning', requirement: JSON.stringify({ type: 'complete_lessons', count: 1 }), stars: 50, diamonds: 5 },
  { name: 'Học sinh chăm chỉ', description: 'Hoàn thành 10 bài học', icon: '📚', category: 'learning', requirement: JSON.stringify({ type: 'complete_lessons', count: 10 }), stars: 100, diamonds: 10 },
  { name: 'Bậc thầy Soroban', description: 'Hoàn thành tất cả bài học', icon: '🏆', category: 'learning', requirement: JSON.stringify({ type: 'complete_all_lessons' }), stars: 500, diamonds: 50 },
  { name: 'Chuỗi ngày 3', description: 'Học 3 ngày liên tiếp', icon: '🔥', category: 'streak', requirement: JSON.stringify({ type: 'streak', count: 3 }), stars: 30, diamonds: 3 },
  { name: 'Chuỗi ngày 7', description: 'Học 7 ngày liên tiếp', icon: '⚡', category: 'streak', requirement: JSON.stringify({ type: 'streak', count: 7 }), stars: 70, diamonds: 7 },
  { name: 'Chuỗi ngày 30', description: 'Học 30 ngày liên tiếp', icon: '💎', category: 'streak', requirement: JSON.stringify({ type: 'streak', count: 30 }), stars: 300, diamonds: 30 },
  { name: 'Tay nhanh', description: 'Hoàn thành 50 bài tập', icon: '⚡', category: 'practice', requirement: JSON.stringify({ type: 'complete_exercises', count: 50 }), stars: 100, diamonds: 10 },
  { name: 'Siêu tốc', description: 'Hoàn thành 200 bài tập', icon: '🚀', category: 'practice', requirement: JSON.stringify({ type: 'complete_exercises', count: 200 }), stars: 300, diamonds: 25 },
  { name: 'Chính xác tuyệt đối', description: 'Đạt 100% độ chính xác trong 20 bài tập liên tiếp', icon: '🎯', category: 'accuracy', requirement: JSON.stringify({ type: 'perfect_accuracy', count: 20 }), stars: 200, diamonds: 20 },
  { name: 'Người bạn tốt', description: 'Kết bạn với 5 người', icon: '👥', category: 'social', requirement: JSON.stringify({ type: 'friends', count: 5 }), stars: 50, diamonds: 5 },
  { name: 'Nhà vô địch', description: 'Giành chiến thắng trong 10 thử thách', icon: '👑', category: 'challenge', requirement: JSON.stringify({ type: 'win_challenges', count: 10 }), stars: 500, diamonds: 50 }
];

const quests = [
  { title: 'Luyện tập hàng ngày', description: 'Hoàn thành 5 bài tập', type: 'daily', category: 'practice', requirement: JSON.stringify({ type: 'complete_exercises', count: 5 }), stars: 50, diamonds: 5 },
  { title: 'Học bài mới', description: 'Hoàn thành 1 bài học', type: 'daily', category: 'lesson', requirement: JSON.stringify({ type: 'complete_lessons', count: 1 }), stars: 100, diamonds: 10 },
  { title: 'Giữ streak', description: 'Đăng nhập hàng ngày', type: 'daily', category: 'streak', requirement: JSON.stringify({ type: 'login' }), stars: 20, diamonds: 2 },
  { title: 'Chiến binh cuối tuần', description: 'Hoàn thành 20 bài tập trong tuần', type: 'weekly', category: 'practice', requirement: JSON.stringify({ type: 'complete_exercises', count: 20 }), stars: 200, diamonds: 20 },
  { title: 'Học giỏi', description: 'Hoàn thành 3 bài học trong tuần', type: 'weekly', category: 'lesson', requirement: JSON.stringify({ type: 'complete_lessons', count: 3 }), stars: 300, diamonds: 30 }
];

const shopItems = [
  { name: 'Avatar Ninja', description: 'Avatar độc đáo hình ninja', icon: '🥷', category: 'avatar', price: 50, type: 'permanent', data: JSON.stringify({ avatarId: 'ninja' }) },
  { name: 'Avatar Robot', description: 'Avatar robot công nghệ cao', icon: '🤖', category: 'avatar', price: 50, type: 'permanent', data: JSON.stringify({ avatarId: 'robot' }) },
  { name: 'Avatar Công chúa', description: 'Avatar công chúa xinh đẹp', icon: '👸', category: 'avatar', price: 50, type: 'permanent', data: JSON.stringify({ avatarId: 'princess' }) },
  { name: 'Gợi ý thông minh', description: 'Nhận gợi ý khi làm bài', icon: '💡', category: 'power-up', price: 10, type: 'consumable', data: JSON.stringify({ powerUpType: 'hint', uses: 5 }) },
  { name: 'Thời gian thêm', description: 'Thêm 30 giây làm bài', icon: '⏱️', category: 'power-up', price: 15, type: 'consumable', data: JSON.stringify({ powerUpType: 'time', seconds: 30 }) },
  { name: 'Gấp đôi sao', description: 'Nhận gấp đôi sao trong 1 giờ', icon: '⭐', category: 'power-up', price: 30, type: 'consumable', data: JSON.stringify({ powerUpType: 'double_stars', duration: 3600 }) },
  { name: 'Theme Tối', description: 'Giao diện tối bảo vệ mắt', icon: '🌙', category: 'theme', price: 100, type: 'permanent', data: JSON.stringify({ themeId: 'dark' }) },
  { name: 'Theme Rừng nhiệt đới', description: 'Giao diện rừng xanh mát', icon: '🌴', category: 'theme', price: 150, type: 'permanent', data: JSON.stringify({ themeId: 'forest' }) }
];

async function seedLessonsAndMore() {
  console.log('🌱 Seeding lessons...');

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { levelId_lessonId: { levelId: lesson.levelId, lessonId: lesson.lessonId } },
      update: lesson,
      create: lesson
    });
  }
  console.log('✅ Lessons seeded!');

  console.log('🏆 Seeding achievements...');
  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { name: achievement.name },
      update: achievement,
      create: achievement
    });
  }
  console.log('✅ Achievements seeded!');

  console.log('🎯 Seeding quests...');
  for (const quest of quests) {
    const existing = await prisma.quest.findFirst({
      where: { title: quest.title, type: quest.type }
    });
    if (!existing) {
      await prisma.quest.create({ data: quest });
    }
  }
  console.log('✅ Quests seeded!');

  console.log('🛒 Seeding shop items...');
  for (const item of shopItems) {
    const existing = await prisma.shopItem.findFirst({
      where: { name: item.name }
    });
    if (!existing) {
      await prisma.shopItem.create({ data: item });
    }
  }
  console.log('✅ Shop items seeded!');
}

seedLessonsAndMore()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
