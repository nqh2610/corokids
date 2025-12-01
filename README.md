# 🧮 SoroKids - Học Toán Tư Duy với Bàn Tính Soroban

Ứng dụng học toán thông minh dành cho trẻ em, sử dụng phương pháp Soroban từ Nhật Bản.

![SoroKids](https://img.shields.io/badge/SoroKids-v1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black)
![Prisma](https://img.shields.io/badge/Prisma-5.22.0-green)

## 🌟 Tính năng nổi bật

### ✅ Đã hoàn thành
- 🎯 **Practice Mode nâng cao** - 5 chế độ luyện tập (Cộng, Trừ, Nhân, Chia, Hỗn hợp) với 5 độ khó
- 🧮 **Soroban Board tương tác** - Bàn tính ảo với tutorial, hints và practice mode
- 📚 **Hệ thống bài học** - 12 bài học chi tiết với nội dung JSON
- 🏆 **Achievement System** - 11 thành tích đa dạng với auto-unlock
- 🎯 **Quest System** - Nhiệm vụ hàng ngày và hàng tuần
- 🛒 **Shop System** - Cửa hàng vật phẩm (avatars, themes, power-ups)
- 📊 **Progress Tracking** - Theo dõi tiến độ học tập chi tiết
- 🎮 **Gamification** - Sao, kim cương, streak counter
- 👥 **Leaderboard** - Bảng xếp hạng với dữ liệu thật
- 🔔 **Notification System** - Hệ thống thông báo (backend ready)

### 🚧 Đang phát triển
- Dashboard với biểu đồ trực quan
- Lesson Detail Page
- Achievements/Quests/Shop UI
- Social features (Friends, Challenges)
- Parent Dashboard
- Dark Mode

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+
- MySQL 8+
- npm hoặc yarn

### 2. Installation

```bash
# Clone repository
git clone https://github.com/yourusername/sorokids.git
cd sorokids

# Install dependencies
npm install
```

### 3. Database Setup

```bash
# Tạo database
mysql -u root -p
CREATE DATABASE sorokids;
EXIT;

# Copy .env.example to .env và cập nhật DATABASE_URL
cp .env.example .env

# Run migrations
npx prisma migrate dev

# Seed database
npm run prisma:seed
node prisma/seed-lessons.js

# Hoặc dùng script (Windows)
seed-all.bat
```

### 4. Run Application

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

Truy cập: http://localhost:3000

## 🔐 Demo Account

```
Email: demo@sorokids.com
Password: 123456
```

## 📁 Project Structure

```
sorokids/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── api/                 # API Routes
│   │   ├── achievements/
│   │   ├── exercises/
│   │   ├── lessons/
│   │   ├── progress/
│   │   ├── quests/
│   │   └── shop/
│   ├── dashboard/           # Dashboard page
│   ├── learn/               # Learning page
│   ├── practice/            # Practice mode
│   ├── leaderboard/         # Leaderboard
│   └── page.jsx             # Landing page
├── components/              # React components
│   ├── Soroban/
│   │   └── SorobanBoard.jsx
│   └── SessionProvider.jsx
├── lib/                     # Utilities
│   ├── auth.js             # NextAuth config
│   └── prisma.js           # Prisma client
├── prisma/                  # Database
│   ├── schema.prisma       # Database schema
│   ├── seed.js             # User seed
│   └── seed-lessons.js     # Lessons seed
└── public/                  # Static assets
```

## 🗄️ Database Schema

### Core Models
- **User** - Users with roles (student/parent/admin)
- **Lesson** - Lessons with JSON content
- **Progress** - Learning progress
- **ExerciseResult** - Exercise results
- **Achievement** - Achievements
- **Quest** - Daily/Weekly quests
- **ShopItem** - Shop items
- **Friend** - Friend system
- **Challenge** - Challenge system
- **Notification** - Notifications

Xem chi tiết: [prisma/schema.prisma](prisma/schema.prisma)

## 🔌 API Endpoints

### Lessons
- `GET /api/lessons?levelId=1` - Get lessons by level
- `GET /api/lessons/[id]` - Get lesson detail

### Progress
- `POST /api/progress` - Save progress
- `GET /api/progress` - Get user progress

### Exercises
- `POST /api/exercises` - Submit exercise
- `GET /api/exercises` - Get exercise history

### Achievements
- `GET /api/achievements` - Get all achievements

### Quests
- `GET /api/quests?type=daily` - Get quests
- `POST /api/quests` - Claim quest reward

### Shop
- `GET /api/shop?category=avatar` - Get shop items
- `POST /api/shop` - Purchase item

## 🎨 Tech Stack

- **Frontend:** Next.js 14, React 18, TailwindCSS
- **Backend:** Next.js API Routes
- **Database:** MySQL + Prisma ORM
- **Authentication:** NextAuth.js
- **Icons:** Lucide React

## 📊 Features Detail

### Practice Mode
- 5 operation modes: Addition, Subtraction, Multiplication, Division, Mixed
- 5 difficulty levels with dynamic number ranges
- Real-time timer
- Streak counter with confetti effect
- Session statistics
- Auto-save to database

### Soroban Board
- Interactive bead manipulation
- 4-step tutorial system
- Smart hint system
- Practice mode with target numbers
- Visual feedback
- Accessibility support

### Gamification
- Stars and diamonds currency
- Streak tracking
- Auto-unlock achievements
- Daily/weekly quests
- Shop system with various items
- Leaderboard competition

## 🔧 Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run migrations
npm run prisma:seed     # Seed users
node prisma/seed-lessons.js  # Seed lessons/achievements/quests/shop

# Utilities
npx prisma studio       # Open Prisma Studio (Database GUI)
npx prisma migrate reset # Reset database
```

## 📚 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Chi tiết setup và sử dụng
- [Improvements Summary](IMPROVEMENTS_SUMMARY.md) - Tổng hợp các cải tiến

## 🐛 Known Issues

- Prisma generate có thể gặp lỗi EPERM trên Windows → Xem [SETUP_GUIDE.md](SETUP_GUIDE.md#troubleshooting)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

SoroKids Team

---

**Happy Learning! 🎓📚🧮**
