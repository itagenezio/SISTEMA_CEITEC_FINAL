@echo off
title Iniciar Portal - SISTEMA CEITEC
echo ==========================================
echo   Iniciando Servidor na Porta 3000
echo ==========================================
echo.
cd /d "%~dp0"
echo [!] Local: %CD%
echo ------------------------------------------
echo.
call npx vite --port 3000 --host --open
echo.
echo ------------------------------------------
echo O servidor parou. Verifique as mensagens acima.
echo ------------------------------------------
pause
