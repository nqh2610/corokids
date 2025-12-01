# SoroKids Database Backup v1.0.0

**Backup Date:** 2025-12-01  
**Version:** 1.0.0 (Before major system upgrade)

## Files Included

| File | Description |
|------|-------------|
| `schema.sql` | Full MySQL schema (all tables, indexes, foreign keys) |
| `seed-data.sql` | Initial seed data (users, lessons, achievements, etc.) |
| `schema.prisma.backup` | Original Prisma schema file |
| `seed.js.backup` | Original Node.js seed script |
| `restore-v1.0.0.bat` | Windows batch script to restore database |

## How to Restore

### Option 1: Using Batch Script (Windows)

1. Edit `restore-v1.0.0.bat` and update:
   ```
   set DB_USER=root
   set DB_PASS=your_password
   ```

2. Run the script:
   ```cmd
   restore-v1.0.0.bat
   ```

### Option 2: Manual Restore

```bash
# 1. Drop existing database
mysql -u root -p -e "DROP DATABASE IF EXISTS sorokids;"

# 2. Create schema
mysql -u root -p < schema.sql

# 3. Insert seed data
mysql -u root -p < seed-data.sql

# 4. Regenerate Prisma client
cd ../..
npx prisma generate
```

### Option 3: Using Prisma (Schema Only)

```bash
# Copy backup schema to prisma folder
copy schema.prisma.backup ..\schema.prisma

# Push schema to database
npx prisma db push

# Run seed scripts
npm run prisma:seed
node prisma/seed-lessons.js
```

## Database Structure v1.0.0

### Tables (14 total)

| Table | Records | Description |
|-------|---------|-------------|
| `users` | 11 | User accounts (demo + 10 sample) |
| `progress` | 0 | Learning progress |
| `exercise_results` | 0 | Exercise history |
| `achievements` | 11 | Achievement definitions |
| `user_achievements` | 0 | Unlocked achievements |
| `lessons` | 12 | Lesson content (Level 1-2) |
| `quests` | 5 | Quest definitions |
| `user_quests` | 0 | Quest progress |
| `shop_items` | 8 | Shop items |
| `purchases` | 0 | Purchase history |
| `friends` | 0 | Friend relationships |
| `challenges` | 0 | Challenge definitions |
| `challenge_participations` | 0 | Challenge participants |
| `notifications` | 0 | User notifications |

## Demo Account

```
Email: demo@sorokids.com
Password: 123456
```

## Notes

- All passwords are hashed with bcrypt (12 rounds)
- This backup represents the state BEFORE adding:
  - Classroom system
  - Competition system
  - Parent-Student linking
  - Teacher dashboard
  - Assignment system
