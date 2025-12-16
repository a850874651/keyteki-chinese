@echo off
title 编译前端

echo 正在编译前端代码...
npm run build

if %errorlevel% neq 0 (
    echo.
    echo ----------------------------------
    echo 编译失败！请检查错误信息。
    echo ----------------------------------
    pause
    exit /b
)

echo.
echo ===============================
echo 编译成功！
echo ===============================
pause
