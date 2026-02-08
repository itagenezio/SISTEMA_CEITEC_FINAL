@echo off
title Iniciar Servidor - INOVATEC EDU
echo ==========================================
echo   Iniciando Servidor de Desenvolvimento
echo ==========================================
echo.
echo Tentando subir em: http://127.0.0.1:5173
echo.
pnpm exec vite --port 5173 --host 0.0.0.0 --clearScreen false --force
echo.
echo ------------------------------------------
echo O servidor parou. Verifique as mensagens acima.
echo ------------------------------------------
pause
