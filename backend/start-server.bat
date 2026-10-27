@echo off
chcp 65001 >nul
title WordPress Backend - Local Server (Port 8080)
echo ====================================================
echo  Khoi dong WordPress Backend Headless tren Local
echo ====================================================

cd /d "%~dp0"

REM 1. Kiem tra MySQL port 10005
netstat -ano | findstr ":10005" >nul
if %errorlevel% equ 0 goto mysql_ok

echo [1/2] Dang khoi dong MySQL port 10005...
start "" /B "%APPDATA%\Local\lightning-services\mysql-8.4.0+2\bin\win64\bin\mysqld.exe" --defaults-file="%APPDATA%\Local\run\cf8ZHccii\conf\mysql\my.cnf"
ping 127.0.0.1 -n 3 >nul
goto check_php

:mysql_ok
echo [1/2] MySQL da san sang tren port 10005.

:check_php
REM 2. Tu dong giai phong port 8080 neu co tien trinh cu bi treo
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8080" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo [2/2] Dang chay PHP Server tai http://localhost:8080 ...
echo - GraphQL: http://localhost:8080/graphql
echo - Admin:   http://localhost:8080/wp-admin
echo - User:    admin_iphone18  /  Pass: admin123
echo ----------------------------------------------------
echo * Giu nguyen cua so nay mo de Backend tiep tuc chay.
echo * Nhan Ctrl+C neu muon dung server.
echo ====================================================

REM Tu dong mo trang wp-admin tren trinh duyet
start "" "http://localhost:8080/wp-admin"

"%APPDATA%\Local\lightning-services\php-8.2.29+0\bin\win64\php.exe" -c "%APPDATA%\Local\run\cf8ZHccii\conf\php\php.ini" -S 127.0.0.1:8080 router.php

echo.
echo ====================================================
echo Server da dung lai.
echo ====================================================
pause
