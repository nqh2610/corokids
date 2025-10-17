# 🧮 SoroKids - Huong Dan Su Dung

## 📋 Muc luc
- [Cac duong link quan trong](#cac-duong-link-quan-trong)
- [Tai khoan demo](#tai-khoan-demo)
- [Chuc nang chinh](#chuc-nang-chinh)
- [API Endpoints](#api-endpoints)
- [Cau truc Database](#cau-truc-database)
- [Troubleshooting](#troubleshooting)

---

## 🔗 Cac Duong Link Quan Trong

### Trang nguoi dung:
- **Trang chu**: `http://localhost:3000/`
- **Dang nhap**: `http://localhost:3000/login`
- **Dang ky**: `http://localhost:3000/register`
- **Dashboard**: `http://localhost:3000/dashboard`
- **Hoc tap**: `http://localhost:3000/learn`
- **Luyen tap**: `http://localhost:3000/practice`
- **Bang xep hang**: `http://localhost:3000/leaderboard`

### API Routes:
- **NextAuth**: `http://localhost:3000/api/auth/[...nextauth]`
- **Register**: `POST http://localhost:3000/api/users/register`
- **Profile**: `GET http://localhost:3000/api/users/profile`
- **Leaderboard**: `GET http://localhost:3000/api/leaderboard`

---

## 👤 Tai Khoan Demo

```
Email: demo@sorokids.com
Password: 123456
```

**Thong tin tai khoan:**
- Level: 5
- Tong sao: 450
- Kim cuong: 25
- Streak: 7 ngay

---

## 🎯 Chuc Nang Chinh

### 1. Trang chu (Landing Page)
- Gioi thieu ve phuong phap Soroban
- Cac tinh nang noi bat
- Nut dang ky / dang nhap
- Thong ke hoc vien

### 2. Dang nhap / Dang ky
- Xac thuc bang NextAuth.js
- Session management
- Password hashing (bcrypt)
- Validation form

### 3. Dashboard
- Hien thi thong tin ca nhan:
  - Sao (totalStars)
  - Level (level)
  - Streak (ngay lien tiep)
  - Kim cuong (diamonds)
- Quick links den cac chuc nang
- Nut dang xuat

### 4. Hoc tap (/learn)
- 4 cap do hoc:
  1. **Lam quen Soroban** 🌱 (8 bai)
  2. **Cong tru nang cao** 🌿 (12 bai)
  3. **Nhan chia co ban** 🌳 (15 bai)
  4. **Tinh nham Anzan** 🧠 (20 bai)
- Ban tinh Soroban tuong tac 3D
- Click de di chuyen hat
- Tinh toan real-time

### 5. Luyen tap (/practice)
- Bai tap tu dong sinh ngau nhien
- Phep cong / tru
- Kiem tra dap an ngay lap tuc
- Theo doi:
  - Sao (+10 moi bai dung)
  - So bai dung
  - Tong so bai

### 6. Bang xep hang (/leaderboard)
- Top 3 podium 3D
- Top 10 chi tiet
- Xep hang theo tong sao
- Hien thi level cua tung nguoi

---

## 🗄️ API Endpoints

### Authentication

#### POST /api/users/register
Dang ky tai khoan moi

**Request:**
```json
{
  "name": "Nguyen Van A",
  "username": "nguyenvana",
  "email": "nguyenvana@example.com",
  "password": "123456"
}
```

**Response (201):**
```json
{
  "message": "Dang ky thanh cong",
  "user": {
    "id": "uuid",
    "email": "nguyenvana@example.com",
    "username": "nguyenvana",
    "name": "Nguyen Van A",
    "avatar": "https://...",
    "level": 1,
    "totalStars": 0,
    "diamonds": 5
  }
}
```

#### POST /api/auth/signin
Dang nhap (NextAuth)

#### POST /api/auth/signout
Dang xuat

### User

#### GET /api/users/profile
Lay thong tin nguoi dung hien tai (can authentication)

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "demo@sorokids.com",
    "username": "demo_user",
    "name": "Demo User",
    "avatar": "https://...",
    "level": 5,
    "totalStars": 450,
    "diamonds": 25,
    "streak": 7,
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### Leaderboard

#### GET /api/leaderboard
Lay danh sach top 50 nguoi dung

**Query params:**
- `limit` (optional): So luong user (default: 50)

**Response:**
```json
{
  "leaderboard": [
    {
      "id": "uuid",
      "username": "demo_user",
      "name": "Demo User",
      "avatar": "https://...",
      "level": 5,
      "totalStars": 450,
      "streak": 7
    }
  ]
}
```

---

## 🗃️ Cau Truc Database

### Tables:

1. **users** - Nguoi dung
   - id, email, username, password
   - name, avatar
   - level, totalStars, diamonds, streak
   - lastLoginDate, createdAt, updatedAt

2. **progress** - Tien do hoc tap
   - id, userId, levelId, lessonId
   - completed, starsEarned, timeSpent, accuracy
   - completedAt, createdAt, updatedAt

3. **exercise_results** - Ket qua bai tap
   - id, userId, exerciseType, difficulty
   - problem, userAnswer, correctAnswer, isCorrect
   - timeTaken, createdAt

4. **achievements** - Thanh tuu
   - id, name, description, icon
   - category, requirement, stars, diamonds

5. **user_achievements** - Thanh tuu cua nguoi dung
   - id, userId, achievementId, unlockedAt

---

## 🔧 Troubleshooting

### Loi thuong gap:

**1. Khong ket noi duoc database**
```
Error: Can't reach database server
```
**Giai phap:**
- Kiem tra MySQL dang chay: `mysql -u root -p`
- Kiem tra DATABASE_URL trong `.env.local`
- Chay lai: `npx prisma generate`

**2. Session khong hoat dong**
```
Error: No session found
```
**Giai phap:**
- Xoa cookies trong browser
- Kiem tra NEXTAUTH_SECRET trong `.env.local`
- Restart server: `npm run dev`

**3. Import lucide-react loi**
```
Error: Module not found: Can't resolve 'lucide-react'
```
**Giai phap:**
- Chay: `npm install lucide-react`
- Restart server

**4. Prisma Client khong cap nhat**
```
Error: Unknown field
```
**Giai phap:**
- Chay: `npx prisma generate`
- Chay: `npx prisma migrate dev`

### Debug tips:

- Xem logs trong terminal khi chay `npm run dev`
- Kiem tra Network tab trong DevTools
- Xem Console trong browser DevTools
- Kiem tra database: `npx prisma studio`

---

## 📊 Quan Tri Database

### Prisma Studio (GUI Database):
```bash
npx prisma studio
```
Mo: `http://localhost:5555`

### Cac lenh Prisma huu ich:

```bash
# Tao migration moi
npx prisma migrate dev --name ten_migration

# Reset database
npx prisma migrate reset

# Seed lai data
npm run prisma:seed

# Generate Prisma Client
npx prisma generate

# Xem database schema
npx prisma db pull
```

---

## 🚀 Deployment

### Local Development:
```bash
npm run dev
```

### Production Build:
```bash
npm run build
npm start
```

### Environment Variables (Production):
```env
DATABASE_URL="mysql://user:password@host:3306/sorokids"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-production-secret-key"
NODE_ENV="production"
```

---

## 📞 Lien He Ho Tro

- Email: support@sorokids.com
- GitHub Issues: [Report Bug]

---

**Cap nhat lan cuoi**: 2025-01-20
**Phien ban**: 1.0.0
