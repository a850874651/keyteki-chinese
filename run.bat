@echo off
title 启动所有服务

echo 启动游戏端...
start "Game Server" cmd /k "PORT=9500 SERVER=node1 node server/gamenode"

echo 启动客户端...
start "Client Server" cmd /k "NODE_ENV=production PORT=4000 node ."

echo.
echo ===============================
echo 所有服务已启动！
echo ===============================
pause
