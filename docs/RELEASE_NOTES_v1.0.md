# RELEASE NOTES v1.0 - Correção de Infraestrutura e OCR

## Resumo Executivo
Esta versão corrige falhas críticas de banco de dados que impediam o funcionamento do aplicativo móvel (Flutter) e a integração com o painel web (React).

## 🛠️ Alterações no Banco de Dados (Supabase)
### Novas Tabelas Criadas
1. **`public.escolas`**: Para vincular turmas.
2. **`public.turmas`**: Tabela física oficial para o App Flutter.
3. **`public.provas`**: Com coluna correta `titulo` (antes era `nome`, causando erro no App).
4. **`public.questoes`**: Para armazenar o gabarito das provas.
5. **`public.respostas_alunos`**: Para salvar as notas da correção OCR.

### Compatibilidade (Views e Triggers)
- **View `public.classes`**: Recriada para apontar para `public.turmas`. O site React lê daqui.
- **Trigger `handle_classes_insert`**: Permite que o site crie turmas na View e salve na Tabela física.
- **Trigger `sync_alunos_final`**: Mantém consistência entre `nome/name` e `matricula/access_code`.

### Ajustes de Segurança
- **Email Opcional**: A coluna `email` na tabela `alunos` agora aceita valores nulos, permitindo cadastro rápido pelo App.

## 📱 Alterações no Código
### Frontend (React)
- **`DataContext.tsx`**: Atualizado para lidar com campos nulos e nomes de colunas bilíngues (`nome` vs `name`).

### Mobile (Flutter)
- O aplicativo agora encontrará as tabelas `provas` (com coluna `titulo`) e `questoes` corretamente.

## ✅ Como Testar (Roteiro de Validação)
1. **No Site (Web)**:
   - Crie uma nova turma.
   - Verifique se ela aparece na lista.
2. **No App (Mobile)**:
   - Cadastre um aluno novo (sem e-mail).
   - Crie uma prova e cadastre o gabarito.
   - Use a função OCR (Câmera) para corrigir uma prova.
   - Verifique se a nota foi salva.

## Próximos Passos
- Executar `git add .` e `git commit` manualmente no seu terminal Git Bash ou VS Code.
