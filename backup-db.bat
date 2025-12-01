@echo off
REM ============================================================
REM SOROKIDS DATABASE BACKUP SCRIPT
REM Version: 1.0.0
REM Date: 2025-12-01
REM ============================================================

setlocal enabledelayedexpansion

REM Configuration - MODIFY THESE VALUES
set DB_HOST=localhost
set DB_PORT=3306
set DB_USER=root
set DB_PASS=your_password
set DB_NAME=sorokids

REM Backup directory
set BACKUP_DIR=%~dp0backups
set TIMESTAMP=%date:~-4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set BACKUP_FILE=%BACKUP_DIR%\sorokids_backup_%TIMESTAMP%.sql

REM Create backup directory if not exists
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo ============================================================
echo   SOROKIDS DATABASE BACKUP
echo ============================================================
echo.
echo Database: %DB_NAME%
echo Host: %DB_HOST%:%DB_PORT%
echo Backup file: %BACKUP_FILE%
echo.

REM Check if mysqldump exists
where mysqldump >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] mysqldump not found in PATH!
    echo Please add MySQL bin directory to your PATH
    echo Example: C:\Program Files\MySQL\MySQL Server 8.0\bin
    pause
    exit /b 1
)

REM Create backup
echo [1/3] Creating database backup...
mysqldump -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p%DB_PASS% --single-transaction --routines --triggers --databases %DB_NAME% > "%BACKUP_FILE%" 2>nul

if %ERRORLEVEL% equ 0 (
    echo [OK] Database backup created successfully!
) else (
    echo [ERROR] Failed to create backup. Check your credentials.
    pause
    exit /b 1
)

REM Compress backup (optional - requires 7z)
echo [2/3] Compressing backup...
where 7z >nul 2>nul
if %ERRORLEVEL% equ 0 (
    7z a -tgzip "%BACKUP_FILE%.gz" "%BACKUP_FILE%" >nul
    if %ERRORLEVEL% equ 0 (
        del "%BACKUP_FILE%"
        echo [OK] Backup compressed: %BACKUP_FILE%.gz
    )
) else (
    echo [SKIP] 7z not found, keeping uncompressed backup
)

REM Show backup info
echo [3/3] Backup complete!
echo.
echo ============================================================
echo   BACKUP SUMMARY
echo ============================================================
dir "%BACKUP_DIR%\sorokids_backup_*" /o-d 2>nul | findstr "sorokids"
echo.
echo To restore, run: restore-db.bat [backup_file]
echo ============================================================

pause
