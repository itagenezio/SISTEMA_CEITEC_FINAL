@echo off
title Iniciar Servidor - INOVATEC EDU
echo ==========================================
echo   Iniciando Servidor de Desenvolvimento
echo ==========================================
echo.
echo.
echo [!] IMPORTANTE: No PowerShell do VS Code, digite: .\iniciar.bat
echo -------------------------------------------------------------
echo.
pnpm exec vite --port 5173 --host 127.0.0.1 --clearScreen false --force
echo.
echo ------------------------------------------
echo O servidor parou. Verifique as mensagens acima.
echo ------------------------------------------
pause
