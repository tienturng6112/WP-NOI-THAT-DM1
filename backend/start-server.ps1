Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Khoi dong WordPress Backend Headless tren Local" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

$mysqlRunning = Get-NetTCPConnection -LocalPort 10005 -ErrorAction SilentlyContinue
if (-not $mysqlRunning) {
    Write-Host "[1/2] Dang khoi dong MySQL port 10005..." -ForegroundColor Yellow
    Start-Process -FilePath "$env:APPDATA\Local\lightning-services\mysql-8.4.0+2\bin\win64\bin\mysqld.exe" -ArgumentList '--defaults-file="' + "$env:APPDATA\Local\run\cf8ZHccii\conf\mysql\my.cnf" + '"' -WindowStyle Hidden
    Start-Sleep -Seconds 2
} else {
    Write-Host "[1/2] MySQL da san sang tren port 10005." -ForegroundColor Green
}

# Giai phong port 8080 neu co tien trinh cu
$oldPort = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue
if ($oldPort) {
    Stop-Process -Id $oldPort.OwningProcess -Force -ErrorAction SilentlyContinue
    Start-Sleep -Milliseconds 500
}

Write-Host "[2/2] Dang chay PHP Server tai http://localhost:8080 ..." -ForegroundColor Yellow
Write-Host "- GraphQL: http://localhost:8080/graphql" -ForegroundColor Cyan
Write-Host "- Admin:   http://localhost:8080/wp-admin (User: admin_iphone18 / Pass: admin123)" -ForegroundColor Cyan
Write-Host "- Giu nguyen cua so nay de duy tri ket noi Backend." -ForegroundColor White
Write-Host "- Nhan Ctrl+C neu muon dung server." -ForegroundColor Gray
Write-Host "====================================================" -ForegroundColor Cyan

Set-Location $PSScriptRoot
& "$env:APPDATA\Local\lightning-services\php-8.2.29+0\bin\win64\php.exe" -c "$env:APPDATA\Local\run\cf8ZHccii\conf\php\php.ini" -S 127.0.0.1:8080 router.php
