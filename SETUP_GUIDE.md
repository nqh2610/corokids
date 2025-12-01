# 🧮 SoroKids - Hướng dẫn Setup & Sử dụng

## ✅ Database đã được setup thành công!

### 📊 Dữ liệu hiện có:

- **Users:** 11 users (1 demo + 10 sample users cho leaderboard)
- **Lessons:** 12 bài học chi tiết (Level 1-2)
- **Achievements:** 11 thành tích
- **Quests:** 5 nhiệm vụ (daily & weekly)
- **Shop Items:** 8 vật phẩm

---

## 🔐 Demo Account

```
Email: demo@sorokids.com
Password: 123456
```

Bạn có thể đăng nhập ngay với tài khoản này để test!

---

## 🚀 Chạy ứng dụng

### 1. Start Development Server

```bash
npm run dev
```

Truy cập: http://localhost:3000

### 2. View Database (Prisma Studio)

```bash
npx prisma studio
```

Truy cập: http://localhost:5555

---

## 🔄 Reset/Seed lại Database

### Seed tất cả dữ liệu:

**Windows:**
```bash
seed-all.bat
```

**Mac/Linux hoặc thủ công:**
```bash
node prisma/seed.js
node prisma/seed-lessons.js
```

### Chỉ seed users:
```bash
npm run prisma:seed
# hoặc
node prisma/seed.js
```

### Chỉ seed lessons/achievements/quests/shop:
```bash
node prisma/seed-lessons.js
```

---

## 📱 Tính năng đã hoàn thành

### ✅ Core Features
- [x] Authentication (Login/Register)
- [x] Dashboard với stats thực tế
- [x] Practice Mode nâng cao (5 modes, 5 difficulties)
- [x] Soroban Board với tutorial & hints
- [x] Leaderboard với data thật

### ✅ Backend Complete
- [x] 8 API Routes hoàn chỉnh
- [x] Auto-check achievements
- [x] Auto-update quests
- [x] Exercise tracking
- [x] Progress tracking
- [x] Shop system
- [x] Notification system (backend ready)

### 🚧 Frontend cần hoàn thiện
- [ ] Learn Page với lessons thật
- [ ] Lesson Detail Page
- [ ] Achievements Page UI
- [ ] Quests Page UI
- [ ] Shop Page UI
- [ ] Notifications UI
- [ ] Dashboard charts & graphs
- [ ] Dark Mode
- [ ] Parent Dashboard

---

## 🎯 Test các tính năng

### 1. Practice Mode
- Vào `/practice`
- Chọn chế độ (Cộng, Trừ, Nhân, Chia, Hỗn hợp)
- Chọn độ khó (1-5 sao)
- Làm bài tập → tự động lưu vào database
- Kiếm sao và theo dõi stats

### 2. Soroban Board
- Vào `/learn`
- Click "Bắt đầu học" trên bất kỳ level nào
- Xem Soroban Board
- Click nút "?" để xem tutorial
- Click nút 💡 để xem hints

### 3. Leaderboard
- Vào `/leaderboard`
- Xem top 10 users (có data thật)
- Demo user đang ở vị trí thứ 6

### 4. API Testing

Test API với Postman hoặc curl:

```bash
# Get lessons
curl http://localhost:3000/api/lessons?levelId=1

# Get achievements
curl http://localhost:3000/api/achievements

# Get quests
curl http://localhost:3000/api/quests?type=daily

# Get shop items
curl http://localhost:3000/api/shop
```

---

## 📦 Database Schema

### Models chính:
- **User** - Người dùng (với role: student/parent/admin)
- **Lesson** - Bài học với nội dung JSON
- **Progress** - Tiến độ học tập
- **ExerciseResult** - Kết quả bài tập
- **Achievement** - Thành tích
- **UserAchievement** - Thành tích đã mở khóa
- **Quest** - Nhiệm vụ
- **UserQuest** - Tiến độ nhiệm vụ
- **ShopItem** - Vật phẩm cửa hàng
- **Purchase** - Lịch sử mua hàng
- **Friend** - Bạn bè
- **Challenge** - Thử thách
- **Notification** - Thông báo

---

## 🐛 Troubleshooting

### Lỗi EPERM khi chạy prisma generate

**Cách 1:**
1. Đóng tất cả terminal và VSCode
2. Mở Command Prompt với quyền Administrator
3. Chạy: `setup-db.bat`

**Cách 2:**
```bash
npx prisma migrate dev
# Migration sẽ tự động generate client
```

### Database connection error

Kiểm tra file `.env`:
```
DATABASE_URL="mysql://root:password@localhost:3306/sorokids"
```

Đảm bảo:
- MySQL đang chạy
- Database `sorokids` đã được tạo
- Username/password đúng

### Seed data lỗi

```bash
# Xóa tất cả data và seed lại
npx prisma migrate reset
# Chọn Yes để confirm

# Sau đó seed lại
seed-all.bat
```

---

## 📚 Tài liệu thêm

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)

---

## 🎉 Tổng kết

Database và Backend đã hoàn thiện 90%! Chỉ cần:
1. Tạo UI cho các trang còn lại
2. Kết nối UI với API đã có
3. Polish & testing

**Happy Coding! 🚀**
