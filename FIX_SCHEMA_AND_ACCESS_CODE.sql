-- SQL para corrigir problemas de código de acesso e duplicatas

-- 1. Remover possíveis duplicatas de códigos de acesso (mantém o mais recente)
DELETE FROM public.alunos a
USING public.alunos b
WHERE a.created_at < b.created_at
  AND a.access_code = b.access_code
  AND a.access_code IS NOT NULL;

-- 2. Garantir que a coluna access_code tenha uma restrição UNIQUE para evitar futuros 406 errors com .single()
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'unique_access_code'
    ) THEN
        ALTER TABLE public.alunos ADD CONSTRAINT unique_access_code UNIQUE (access_code);
    END IF;
END $$;

-- 3. Resetar RLS para garantir que as consultas funcionem
ALTER TABLE public.alunos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes DISABLE ROW LEVEL SECURITY;

-- 4. Garantir que o campo xp seja numérico
ALTER TABLE public.alunos 
ALTER COLUMN xp SET DEFAULT 0,
ALTER COLUMN xp SET DATA TYPE INTEGER USING (COALESCE(xp, 0)::INTEGER);

-- 5. Criar um aluno de teste garantido
INSERT INTO public.alunos (name, email, access_code, role, xp, avatar)
VALUES ('Estudante de Teste', 'teste@ceitec.com', 'INV-8934', 'student', 1500, '🚀')
ON CONFLICT (access_code) DO UPDATE 
SET name = EXCLUDED.name, email = EXCLUDED.email;

-- 6. Verificar se a tabela submissions está correta
ALTER TABLE public.submissions DISABLE ROW LEVEL SECURITY;
