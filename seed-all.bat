@echo off
echo ====================================
echo SoroKids - Seed All Data
echo ====================================

echo.
echo Seeding users...
call node prisma/seed.js

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to seed users!
    pause
    exit /b 1
)

echo.
echo Seeding lessons, achievements, quests, shop...
call node prisma/seed-lessons.js

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to seed additional data!
    pause
    exit /b 1
)

echo.
echo ====================================
echo All data seeded successfully!
echo ====================================
echo.
echo Demo User Credentials:
echo Email: demo@sorokids.com
echo Password: 123456
echo.
pause
