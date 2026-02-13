@echo off
echo ========================================================
echo      CEITEC AUTOMATION - GIT COMMIT & PUSH v1.0
echo ========================================================
echo.
echo [1/3] Adicionando arquivos...
git add .

echo [2/3] Criando commit...
git commit -m "feat: database full fix (schema + triggers + app compatible) v1.0"

echo [3/3] Enviando para o repositorio remoto...
git push

echo.
echo ========================================================
echo      SUCESSO! SISTEMA ATUALIZADO NO GIT.
echo ========================================================
pause
