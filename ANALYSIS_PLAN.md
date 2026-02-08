# 📊 Análise Profissional e Plano de Transformação - CEITEC

## 🕵️ Diagnóstico Atual do Projeto

**Agentes Envolvidos:** `@orchestrator`, `@frontend-specialist`, `@backend-specialist`, `@security-auditor`

Analisei a estrutura atual do projeto "Wireframeparainovatecedu" e identifiquei que ele opera como um **protótipo funcional (MVP)**, mas carece de arquitetura para escalar como uma aplicação profissional de produção.

### 🚩 Pontos Críticos Identificados

1.  **Navegação Artesanal (State-based Routing):**
    *   **Problema:** O `App.tsx` controla a navegação via estado (`currentScreen`).
    *   **Impacto:** Não há URLs reais (o usuário não pode dar F5 na tela de "Atividades" e voltar para lá), não há histórico do navegador, e o código do `App.tsx` fica gigante (Monolito).
    *   **Solução:** Implementar `react-router-dom`.

2.  **Gestão de Estado Monolítica:**
    *   **Problema:** O `App.tsx` carrega TODO o estado da aplicação (turmas, alunos, notas, usuário).
    *   **Impacto:** Renderizações desnecessárias (performance ruim) e difícil manutenção.
    *   **Solução:** Migrar para **React Context** (ex: `AuthProvider`, `DataProvider`) ou **Zustand**.

3.  **Mistura de Responsabilidades:**
    *   **Problema:** `App.tsx` faz chamadas diretas ao Supabase, gerencia UI, valida dados e controla rotas.
    *   **Impacto:** Código frágil. Se mudar a lógica do banco, quebra a UI.
    *   **Solução:** Criar camada de **Services/Hooks** (`useAuth`, `useActivities`).

4.  **UI/UX (Interface):**
    *   **Status:** Usa componentes modernos (Radix/Shadcn), o que é ótimo.
    *   **Melhoria:** Padronizar o layout. O fundo azul `#1e3a8a` está "hardcoded". Precisamos de um sistema de temas e layout persistente (Sidebar/Header fixos).

5.  **Segurança e Dados:**
    *   **Problema:** Dados sensíveis e lógica de validação misturados no front.
    *   **Solução:** Reforçar validação de tipos (Zod) e garantir que o Supabase tenha RLS (Row Level Security) ativado.

---

## 🚀 O Plano de Ação: "CEITEC Pro"

Para transformar este projeto na referência do CEITEC, executaremos as seguintes fases:

### FASE 1: Fundação Sólida (Arquitetura)
- [ ] **Instalar `react-router-dom`**: Habilitar navegação profissional.
- [ ] **Modularizar `App.tsx`**: Quebrar o arquivo de 470 linhas em rotas e layouts.
- [ ] **Criar Estrutura de Pastas Profissional**:
    - `/src/pages` (Telas)
    - `/src/services` (Lógica de Banco)
    - `/src/hooks` (Lógica de Estado)
    - `/src/layouts` (Estrutura visual fixa)

### FASE 2: Experiência do Usuário (UX Premium)
- [ ] **Layout Persistente**: Criar um Sidebar profissional que não recarrega ao navegar.
- [ ] **Feedback Visual**: Loaders de esqueleto (Skeletons) em vez de spinners simples.
- [ ] **Tratamento de Erros**: Telas de "Não encontrado" e "Sem permissão" amigáveis.

### FASE 3: Código e Performance
- [ ] **Types Centralizados**: Mover interfaces soltas para `/types`.
- [ ] **Otimização**: Lazy loading das rotas (carregar código sob demanda).

---

**🤖 Iniciando execução da FASE 1 agora...**
