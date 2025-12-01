@echo off
REM ============================================================
REM SOROKIDS DATABASE RESTORE SCRIPT
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

set BACKUP_DIR=%~dp0backups

echo ============================================================
echo   SOROKIDS DATABASE RESTORE
echo ============================================================
echo.

REM Check argument
if "%~1"=="" (
    echo Usage: restore-db.bat [backup_file]
    echo.
    echo Available backups:
    echo ------------------
    dir "%BACKUP_DIR%\sorokids_backup_*" /o-d /b 2>nul
    echo.
    echo Example: restore-db.bat backups\sorokids_backup_20251201_120000.sql
    pause
    exit /b 1
)

set BACKUP_FILE=%~1

REM Check if file exists
if not exist "%BACKUP_FILE%" (
    REM Try with backup directory prefix
    if exist "%BACKUP_DIR%\%BACKUP_FILE%" (
        set BACKUP_FILE=%BACKUP_DIR%\%BACKUP_FILE%
    ) else (
        echo [ERROR] Backup file not found: %BACKUP_FILE%
        pause
        exit /b 1
    )
)

echo Backup file: %BACKUP_FILE%
echo Database: %DB_NAME%
echo.
echo [WARNING] This will OVERWRITE the current database!
echo.
set /p CONFIRM=Are you sure you want to continue? (yes/no): 

if /i not "%CONFIRM%"=="yes" (
    echo Restore cancelled.
    pause
    exit /b 0
)

echo.
echo [1/2] Restoring database...

REM Check if file is compressed
echo %BACKUP_FILE% | findstr /i ".gz" >nul
if %ERRORLEVEL% equ 0 (
    echo Decompressing backup file...
    where 7z >nul 2>nul
    if %ERRORLEVEL% equ 0 (
        7z e "%BACKUP_FILE%" -o"%BACKUP_DIR%" -y >nul
        set BACKUP_FILE=%BACKUP_FILE:.gz=%
    ) else (
        echo [ERROR] 7z required to decompress .gz files
        pause
        exit /b 1
    )
)

REM Restore database
mysql -h %DB_HOST% -P %DB_PORT% -u %DB_USER% -p%DB_PASS% < "%BACKUP_FILE%" 2>nul

if %ERRORLEVEL% equ 0 (
    echo [OK] Database restored successfully!
) else (
    echo [ERROR] Failed to restore database. Check your credentials.
    pause
    exit /b 1
)

echo [2/2] Running Prisma generate...
call npx prisma generate

echo.
echo ============================================================
echo   RESTORE COMPLETE
echo ============================================================
echo Database %DB_NAME% has been restored from backup.
echo.

pause
