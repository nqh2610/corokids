@echo off
echo ========================================
echo   SoroKids - Complete Setup
echo ========================================
echo.
echo Step 1: Create MySQL database
echo Run: CREATE DATABASE sorokids;
echo.
echo Step 2: Generate Prisma
call npx prisma generate
echo.
echo Step 3: Run migrations
call npx prisma migrate dev
echo.
echo Step 4: Seed database
call npm run prisma:seed
echo.
echo Step 5: Start server
echo Run: npm run dev
echo Then open: http://localhost:3000
echo.
pause
