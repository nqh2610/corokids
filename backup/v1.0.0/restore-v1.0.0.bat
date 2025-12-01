@echo off
REM ============================================================
REM SOROKIDS DATABASE FULL RESTORE FROM BACKUP v1.0.0
REM Date: 2025-12-01
REM Description: Restore database from SQL backup files
REM ============================================================

setlocal enabledelayedexpansion

REM Configuration - MODIFY THESE VALUES
set DB_HOST=localhost
set DB_PORT=3306
set DB_USER=root
set DB_PASS=your_password
set DB_NAME=sorokids

set BACKUP_DIR=%~dp0

echo ============================================================
echo   SOROKIDS DATABASE RESTORE v1.0.0
echo ============================================================
echo.
echo This will restore the database from backup files:
echo - schema.sql (Database structure)
echo - seed-data.sql (Initial data)
echo.
echo [WARNING] This will DROP and RECREATE the database!
echo.
set /p CONFIRM=Are you sure you want to continue? (yes/no): 

if /i not "%CONFIRM%"=="yes" (
    echo Restore cancelled.
    pause
    exit /b 0
)

echo.
echo [1/4] Dropping existing database...
mysql -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p%DB_PASS% -e "DROP DATABASE IF EXISTS %DB_NAME%;" 2>nul

echo [2/4] Creating database schema...
mysql -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p%DB_PASS% < "%BACKUP_DIR%schema.sql" 2>nul

if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to create schema. Check your credentials.
    pause
    exit /b 1
)

echo [3/4] Inserting seed data...
mysql -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p%DB_PASS% < "%BACKUP_DIR%seed-data.sql" 2>nul

if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to insert seed data.
    pause
    exit /b 1
)

echo [4/4] Regenerating Prisma client...
cd /d "%BACKUP_DIR%..\.."
call npx prisma generate

echo.
echo ============================================================
echo   RESTORE COMPLETE
echo ============================================================
echo Database %DB_NAME% has been restored to v1.0.0
echo.
echo Demo account:
echo   Email: demo@sorokids.com
echo   Password: 123456
echo.

pause
