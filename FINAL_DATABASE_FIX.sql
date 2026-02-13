-- =========================================================
-- SCRIPT DE RECUPERAÇÃO DEFINITIVO: CEITEC_OS
-- =========================================================

-- 1. LIMPEZA DE SEGURANÇA (DROP VIEWS E TABELAS CONFLITANTES)
-- Removemos views que podem estar usando os mesmos nomes das tabelas
DROP VIEW IF EXISTS public.alunos CASCADE;
DROP VIEW IF EXISTS public.students CASCADE;
DROP VIEW IF EXISTS public.turmas CASCADE;
DROP VIEW IF EXISTS public.classes CASCADE;
DROP VIEW IF EXISTS public.student_stats CASCADE;
DROP VIEW IF EXISTS public.class_summary CASCADE;

-- 2. GARANTIR ESTRUTURA DE TURMAS
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    students_count INTEGER DEFAULT 0,
    progress INTEGER DEFAULT 0,
    disciplines TEXT[] DEFAULT '{}'
);

-- 3. GARANTIR ESTRUTURA DE ALUNOS
CREATE TABLE IF NOT EXISTS public.alunos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    class_id UUID REFERENCES public.classes(id) ON DELETE SET NULL,
    schedule TEXT DEFAULT 'A definir',
    discipline TEXT DEFAULT 'Geral',
    access_code TEXT UNIQUE,
    xp INTEGER DEFAULT 0,
    progress INTEGER DEFAULT 0,
    avatar TEXT DEFAULT '👤',
    role TEXT DEFAULT 'student'
);

-- 4. VIEWS DE COMPATIBILIDADE (Caso o App Flutter/Legacy precise)
-- Se o app procurar por 'students', ele verá 'alunos'
CREATE OR REPLACE VIEW public.students AS SELECT * FROM public.alunos;
-- Se o app procurar por 'turmas', ele verá 'classes'
CREATE OR REPLACE VIEW public.turmas AS SELECT * FROM public.classes;

-- 5. DESABILITAR RLS (Evita erro de permissão no dev)
ALTER TABLE public.alunos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions DISABLE ROW LEVEL SECURITY;

-- 6. POPULAR DADOS DE TESTE (Resiliente)
INSERT INTO public.classes (id, name, disciplines)
VALUES ('00000000-0000-0000-0000-000000000001', 'Turma de Elite Alpha', ARRAY['Robótica', 'IA'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.alunos (name, email, access_code, class_id, xp, role, avatar)
VALUES 
('Estudante Master', 'aluno@ceitec.com', 'INV-1234', '00000000-0000-0000-0000-000000000001', 1250, 'student', '🚀'),
('Professor Genézio', 'teacher@ceitec.com', 'PRO-1000', NULL, 0, 'teacher', '🧠'),
('Recruta Teste', 'teste@ceitec.com', 'INV-8934', '00000000-0000-0000-0000-000000000001', 500, 'student', '🤖')
ON CONFLICT (email) DO UPDATE 
SET access_code = EXCLUDED.access_code, 
    class_id = EXCLUDED.class_id,
    name = EXCLUDED.name;

-- 7. GARANTIR QUE OUTRAS TABELAS ESSENCIAIS EXISTAM
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    points INTEGER DEFAULT 100,
    deadline TEXT,
    discipline TEXT DEFAULT 'Tecnologia'
);

CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.alunos(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending',
    grade NUMERIC,
    feedback TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE,
    graded_at TIMESTAMP WITH TIME ZONE,
    file_url TEXT,
    comments TEXT
);

-- FIM DO SCRIPT DEFINITIVO
