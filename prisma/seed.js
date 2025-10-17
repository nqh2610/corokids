const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  const hashedPassword = await bcrypt.hash('123456', 12);
  await prisma.user.upsert({
    where: { email: 'demo@sorokids.com' },
    update: {},
    create: {
      email: 'demo@sorokids.com',
      username: 'demo_user',
      password: hashedPassword,
      name: 'Demo User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      level: 5,
      totalStars: 450,
      diamonds: 25,
      streak: 7,
    },
  });
  console.log('Seeding completed!');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
