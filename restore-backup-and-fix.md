# Task: Restaurar Backup e Corrigir Build Vercel

## 📋 Objetivo
Restaurar todos os arquivos do "Backup Antigo" para o projeto `SISTEMA_CEITEC_FINAL`, garantindo que a versão profissional da aplicação (React + Flutter OCR) esteja completa e funcional para deploy no Vercel.

## 🛠️ Ações Realizadas

### 1. Migração de Arquivos
- [x] Restaurar pasta `src` completa (Arquitetura Pro: Router, Contexts, Services).
- [x] Restaurar pasta `public` (incluindo o build do Flutter `scanner_ocr`).
- [x] Restaurar arquivos de configuração: `package.json`, `vite.config.ts`, `vercel.json`, `postcss.config.mjs`.
- [x] Restaurar variáveis de ambiente: `.env`, `.env.local`.

### 2. Correções Técnicas
- [x] **Tailwind CSS v4**: Garantir configuração correta via `@tailwindcss/vite`.
- [x] **Animações**: Substituir `tw-animate-css` pelo plugin correto `tailwindcss-animate` no `package.json` e `tailwind.css`.
- [x] **Estrutura de Pastas**: Corrigir aninhamento acidental de `/src/src`.

### 3. Verificação de Integração
- [x] Conferir se o `AppRouter` está apontando para as páginas corretas.
- [x] Validar se o `index.html` está chamando o `main.tsx` corretamente.
- [x] Garantir que o `vercel.json` tem as regras de rewrite para o `/scanner_ocr`.

## 🚀 Próximos Passos
1. **Teste Local**: Rodar `npm install` e `npm run dev`.
2. **Validação de Funcionalidades**: Testar login, navegação e abertura do scanner OCR.
3. **Git Push**: Após validação, subir as mudanças para o repositório GitHub.
4. **Deploy Vercel**: Acompanhar o build automático no Vercel para garantir sucesso.
