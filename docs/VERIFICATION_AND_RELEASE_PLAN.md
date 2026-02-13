# Plano de Verificação e Lançamento (v1.0)

## Objetivos
1. Validar integridade do Schema do Banco de Dados (Tabelas e Views).
2. Verificar compatibilidade do Código Frontend (React).
3. Verificar compatibilidade do Código Mobile (Flutter).
4. Executar varredura de segurança básica.
5. Realizar Commit final no Git.

## Etapas de Execução

### 1. Auditoria de Banco de Dados (@backend-specialist)
- [ ] Verificar existência das tabelas: `turmas`, `escolas`, `provas`, `questoes`, `respostas_alunos`.
- [ ] Verificar existência das views: `classes`, `students`.
- [ ] Validar colunas críticas: `provas.titulo`, `alunos.nome`, `alunos.matricula`.

### 2. Auditoria de Frontend (@frontend-specialist)
- [ ] Verificar `DataContext.tsx` (Mapeamento de dados).
- [ ] Verificar `StudentDashboard.tsx` (Renderização segura).

### 3. Auditoria de Mobile (@mobile-developer)
- [ ] Verificar `ocr_correcao_page.dart` (Fluxo de OCR).
- [ ] Verificar `provas_page.dart` (Integração com tabela provas).

### 4. Segurança e Qualidade (@security-auditor)
- [ ] Executar scanner de vulnerabilidades (se disponível).

### 5. Finalização (@devops-engineer)
- [ ] Git Add All.
- [ ] Git Commit com mensagem semântica.
