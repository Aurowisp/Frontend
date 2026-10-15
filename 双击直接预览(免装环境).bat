@echo off
title 福帮帮前端免安装体验版
cd /d "%~dp0"

echo ========================================================
echo        福帮帮 (CampusLink) 前端体验版 (无需Node.js)
echo ========================================================
echo.
echo 正在启动本地预览服务器，请稍候...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\server.ps1"

pause
