# 🗺️ SoroKids - Danh Sach Routes

## Frontend Routes

### Public Routes (Khong can dang nhap)

| Route | Description | Component |
|-------|-------------|-----------|
| `/` | Trang chu / Landing page | `app/page.jsx` |
| `/login` | Trang dang nhap | `app/(auth)/login/page.jsx` |
| `/register` | Trang dang ky | `app/(auth)/register/page.jsx` |

### Protected Routes (Can dang nhap)

| Route | Description | Component |
|-------|-------------|-----------|
| `/dashboard` | Dashboard ca nhan | `app/dashboard/page.jsx` |
| `/learn` | Trang hoc tap | `app/learn/page.jsx` |
| `/practice` | Trang luyen tap | `app/practice/page.jsx` |
| `/leaderboard` | Bang xep hang | `app/leaderboard/page.jsx` |

---

## API Routes

### Authentication

#### `POST /api/auth/signin`
Dang nhap bang credentials

#### `POST /api/auth/signout`
Dang xuat

#### `GET /api/auth/session`
Lay thong tin session hien tai

### User Management

#### `POST /api/users/register`
**File:** `app/api/users/register/route.js`

**Request Body:**
```json
{
  "name": "string",
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
- `201` - Dang ky thanh cong
- `400` - Du lieu khong hop le
- `409` - Email/username da ton tai
- `500` - Loi server

#### `GET /api/users/profile`
**File:** `app/api/users/profile/route.js`
**Authentication:** Required

**Response:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "username": "string",
    "name": "string",
    "avatar": "string",
    "level": "number",
    "totalStars": "number",
    "diamonds": "number",
    "streak": "number",
    "createdAt": "datetime"
  }
}
```

### Leaderboard

#### `GET /api/leaderboard`
**File:** `app/api/leaderboard/route.js`
**Authentication:** Not required

**Query Parameters:**
- `limit` (optional) - So luong user (default: 50)

**Response:**
```json
{
  "leaderboard": [
    {
      "id": "string",
      "username": "string",
      "name": "string",
      "avatar": "string",
      "level": "number",
      "totalStars": "number",
      "streak": "number"
    }
  ]
}
```

---

## Components

### Global Components

| Component | Path | Description |
|-----------|------|-------------|
| SessionProvider | `components/SessionProvider.jsx` | Wrap NextAuth session |
| SorobanBoard | `components/Soroban/SorobanBoard.jsx` | Ban tinh tuong tac |

---

## File Structure

```
sorokids/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.js
│   │   ├── users/
│   │   │   ├── register/route.js
│   │   │   └── profile/route.js
│   │   └── leaderboard/route.js
│   ├── (auth)/
│   │   ├── login/page.jsx
│   │   └── register/page.jsx
│   ├── dashboard/page.jsx
│   ├── learn/page.jsx
│   ├── practice/page.jsx
│   ├── leaderboard/page.jsx
│   ├── layout.jsx
│   ├── page.jsx
│   └── globals.css
├── components/
│   ├── SessionProvider.jsx
│   └── Soroban/
│       └── SorobanBoard.jsx
├── lib/
│   ├── prisma.js
│   └── auth.js
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── GUIDE.md
├── ROUTES.md
└── package.json
```

---

## Quick Navigation Links

### Development:
- Home: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard
- Learn: http://localhost:3000/learn
- Practice: http://localhost:3000/practice
- Leaderboard: http://localhost:3000/leaderboard

### Database:
- Prisma Studio: http://localhost:5555

---

**Last Updated**: 2025-01-20
