@echo off
echo ====================================
echo SoroKids Database Setup
echo ====================================

echo.
echo Step 1: Cleaning old Prisma files...
if exist "node_modules\.prisma" (
    timeout /t 2 /nobreak >nul
    rmdir /s /q "node_modules\.prisma" 2>nul
)

echo.
echo Step 2: Generating Prisma Client...
call npx prisma generate

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Prisma generate failed!
    echo Please close all Node.js processes and try again.
    pause
    exit /b 1
)

echo.
echo Step 3: Running migrations...
call npx prisma migrate dev --name add_new_features

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Migration failed!
    pause
    exit /b 1
)

echo.
echo Step 4: Seeding database...
call node prisma/seed-lessons.js

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo WARNING: Seeding failed but database is ready!
)

echo.
echo ====================================
echo Database setup completed!
echo ====================================
pause
