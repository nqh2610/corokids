const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// 18 Level (Bài học) của SoroKids - giữ nguyên tên như cũ
const levels = [
  { id: 1, name: 'Làm quen', icon: '🌱', description: 'Làm quen với bàn tính Soroban, cách cầm và gạt hạt', order: 1 },
  { id: 2, name: 'Cộng dễ', icon: '➕', description: 'Học phép cộng đơn giản trên Soroban', order: 2 },
  { id: 3, name: 'Bạn nhỏ +', icon: '🖐️', description: 'Phép cộng với bạn nhỏ (số từ 1-4)', order: 3 },
  { id: 4, name: 'Bạn nhỏ -', icon: '✋', description: 'Phép trừ với bạn nhỏ (số từ 1-4)', order: 4 },
  { id: 5, name: 'Bạn lớn +', icon: '🔟', description: 'Phép cộng với bạn lớn (số 5)', order: 5 },
  { id: 6, name: 'Bạn lớn -', icon: '🎯', description: 'Phép trừ với bạn lớn (số 5)', order: 6 },
  { id: 7, name: 'Kết hợp', icon: '🎨', description: 'Kết hợp bạn nhỏ và bạn lớn', order: 7 },
  { id: 8, name: '2 chữ số', icon: '🔢', description: 'Tính toán với số có 2 chữ số', order: 8 },
  { id: 9, name: '3 chữ số', icon: '💯', description: 'Tính toán với số có 3 chữ số', order: 9 },
  { id: 10, name: '4 chữ số', icon: '🏅', description: 'Tính toán với số có 4 chữ số', order: 10 },
  { id: 11, name: 'Nhân cơ bản', icon: '✖️', description: 'Học phép nhân cơ bản trên Soroban', order: 11 },
  { id: 12, name: 'Nhân nâng cao', icon: '🔥', description: 'Phép nhân nâng cao với số lớn', order: 12 },
  { id: 13, name: 'Chia cơ bản', icon: '➗', description: 'Học phép chia cơ bản trên Soroban', order: 13 },
  { id: 14, name: 'Chia nâng cao', icon: '🌟', description: 'Phép chia nâng cao với số lớn', order: 14 },
  { id: 15, name: 'Tính nhẩm 1', icon: '🧠', description: 'Luyện tính nhẩm cơ bản (Anzan)', order: 15 },
  { id: 16, name: 'Tính nhẩm 2', icon: '🚀', description: 'Luyện tính nhẩm nâng cao', order: 16 },
  { id: 17, name: 'Tốc độ', icon: '⚡', description: 'Luyện tính nhanh, tăng tốc độ', order: 17 },
  { id: 18, name: 'Thi đấu', icon: '🏆', description: 'Chuẩn bị kỹ năng thi đấu Soroban', order: 18 },
];

async function seedLevels() {
  console.log('🎯 Bắt đầu seed 18 Level (Bài học)...\n');

  for (const level of levels) {
    await prisma.level.upsert({
      where: { id: level.id },
      update: {
        name: level.name,
        icon: level.icon,
        description: level.description,
        order: level.order,
      },
      create: level,
    });
    console.log(`   ✅ Level ${level.id}: ${level.icon} ${level.name}`);
  }

  console.log('\n🎉 Đã seed xong 18 Level!');
}

seedLevels()
  .catch((e) => {
    console.error('❌ Lỗi seed levels:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
