const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('123456', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@sorokids.com' },
    update: {},
    create: {
      email: 'admin@sorokids.com',
      name: 'Admin SoroKids',
      password: hash,
      stars: 100,
      streak: 0
    }
  });
  
  console.log('✅ Đã tạo tài khoản:');
  console.log('   Email: admin@sorokids.com');
  console.log('   Mật khẩu: 123456');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
