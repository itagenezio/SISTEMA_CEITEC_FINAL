@echo off
title Iniciar Servidor - INOVATEC EDU
echo ==========================================
echo   Iniciando Servidor de Desenvolvimento
echo ==========================================
echo.
echo Tentando subir em: http://localhost:5173
echo.
pnpm exec vite --port 5173 --host localhost --clearScreen false --force
echo.
echo ------------------------------------------
echo O servidor parou. Verifique as mensagens acima.
echo ------------------------------------------
pause
