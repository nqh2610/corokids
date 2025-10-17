# 🎉 SoroKids - Hướng Dẫn Chạy

## ✅ Tất cả files đã được tạo!

## 🚀 Các bước chạy:

### 1. Đảm bảo MySQL đang chạy
```bash
# XAMPP: Mở XAMPP Control Panel > Start MySQL
# Hoặc: net start MySQL80
```

### 2. Kiểm tra .env.local
```bash
# Mở file .env.local
# Đảm bảo DATABASE_URL đúng:
DATABASE_URL="mysql://root@localhost:3306/sorokids"
# Hoặc với password:
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/sorokids"
```

### 3. Tạo database
```bash
mysql -u root -p
CREATE DATABASE sorokids;
exit
```

### 4. Chạy migrations
```bash
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
```

### 5. Khởi động server
```bash
npm run dev
```

### 6. Truy cập
```
http://localhost:3000
```

### 7. Đăng nhập
```
Email: demo@sorokids.com
Password: 123456
```

## 🐛 Nếu gặp lỗi:

### Lỗi: Module not found
```bash
# Xóa cache và restart
rd /s /q .next
rd /s /q node_modules\.cache
npm run dev
```

### Lỗi: Database connection
```bash
# Kiểm tra MySQL đang chạy
mysql -u root -p

# Kiểm tra .env.local
type .env.local
```

### Lỗi: SessionProvider
```bash
# Đã fix! File đã tồn tại tại:
# components\SessionProvider.jsx
```

## 📁 Cấu trúc files quan trọng:

```
sorokids/
├── components/
│   ├── SessionProvider.jsx      ✅ ĐÃ TẠO
│   └── Soroban/
│       └── SorobanBoard.jsx     ✅ ĐÃ TẠO
├── lib/
│   ├── prisma.js                ✅ ĐÃ TẠO
│   └── auth.js                  ✅ ĐÃ TẠO
├── app/
│   ├── layout.jsx               ✅ CẬP NHẬT
│   ├── page.jsx
│   ├── dashboard/page.jsx
│   ├── learn/page.jsx
│   ├── practice/page.jsx
│   └── leaderboard/page.jsx
├── jsconfig.json                ✅ ĐÃ TẠO
└── .env.local
```

## ✨ Chúc bạn thành công!
