@echo off
title Instalar com PNPM - INOVATEC EDU
echo ==========================================
echo   Limpando e Instalando com PNPM
echo ==========================================
echo.
echo 1/2 Removendo arquivos antigos...
if exist node_modules rd /s /q node_modules
if exist .vite-temp rd /s /q .vite-temp
echo.
echo 2/2 Instalando pacotes com PNPM (mais rapido)...
pnpm install
echo.
echo ==========================================
echo   CONCLUIDO! Tente o iniciar.bat agora.
echo ==========================================
pause
