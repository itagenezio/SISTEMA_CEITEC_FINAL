import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../app/lib/supabase';
import { Class, Activity, Submission, EnrolledStudent } from '../types';
import { toast } from 'sonner';
import { getFromStorage } from '../app/utils/storage';

// Função para gerar UUID v4 válido a partir de uma string
function generateUUIDFromString(str: string): string {
    if (!str) return '00000000-0000-4000-a000-000000000000';

    // Regex relaxada para aceitar qualquer versão de UUID v1-v7
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(str)) {
        return str;
    }

    // Gera um hash simples da string para consistência
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = (hash & hash) >>> 0; // Force unsigned 32-bit
    }

    // Converte para UUID v4 válido
    const hex = hash.toString(16).padStart(8, '0');
    const r1 = Math.random().toString(16).substring(2, 6);
    const r2 = Math.random().toString(16).substring(2, 5);
    const variant = ['8', '9', 'a', 'b'][Math.floor(Math.random() * 4)];
    const r3 = Math.random().toString(16).substring(2, 5);
    const r4 = Math.random().toString(16).substring(2, 14).padEnd(12, '0');

    // Formato: 8-4-4(v4)-4(variant)-12
    return `${hex}-${r1}-4${r2}-${variant}${r3}-${r4}`;
}

interface DataContextType {
    classes: Class[];
    activities: Activity[];
    submissions: Submission[];
    enrolledStudents: EnrolledStudent[];
    loading: boolean;
    refreshData: () => Promise<void>;
    addClass: (newClass: Omit<Class, 'id' | 'studentsCount' | 'progress'>) => Promise<boolean>;
    addActivity: (newActivity: Omit<Activity, 'id'>) => Promise<boolean>;
    addSubmission: (newSub: { activityId: string, comments: string, file: File | null }) => Promise<boolean>;
    gradeSubmission: (id: string, grade: number, feedback: string) => Promise<boolean>;
    addStudent: (student: Omit<EnrolledStudent, 'id'>) => Promise<boolean>;
    deleteStudent: (id: string) => Promise<boolean>;
    deleteClass: (id: string) => Promise<boolean>;
    deleteSubmission: (id: string) => Promise<boolean>;
    deleteActivity: (id: string) => Promise<boolean>;
    seedTestData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [classes, setClasses] = useState<Class[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudent[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const [
                { data: classesData, error: classesError },
                { data: studentsData, error: studentsError },
                { data: activitiesData, error: activitiesError },
                { data: subsData, error: subsError }
            ] = await Promise.all([
                supabase.from('classes').select('*'),
                supabase.from('students').select('*'),
                supabase.from('activities').select('*'),
                supabase.from('submissions').select('*')
            ]);

            if (classesError) console.warn('Erro turmas:', classesError);
            if (studentsError) console.warn('Erro alunos:', studentsError);

            if (classesData) {
                setClasses(classesData.map((c: any) => ({
                    id: c.id,
                    name: c.name,
                    studentsCount: c.students_count || 0,
                    progress: c.progress || 0,
                    disciplines: c.disciplines || []
                })));
            }

            if (studentsData) {
                setEnrolledStudents(studentsData.map((s: any) => ({
                    ...s,
                    classId: s.class_id,
                    accessCode: s.access_code
                })));
            }

            if (activitiesData) setActivities(activitiesData);
            if (subsData) setSubmissions(subsData);

        } catch (error: any) {
            console.error('Erro ao carregar dados:', error);
            toast.error('Erro de conexão com CEITEC Server');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const seedTestData = async () => {
        toast.info('Iniciando carga de dados fictícios...');
        try {
            // 1. Criar Turma de Teste
            const { data: testClass, error: classError } = await supabase
                .from('classes')
                .insert([{
                    name: 'Turma de Elite Alpha',
                    students_count: 5,
                    progress: 45,
                    disciplines: ['Robótica Avançada', 'Lógica IA']
                }])
                .select().single();

            if (classError) throw classError;

            // 2. Criar 5 Alunos fictícios
            const studentsToCreate = [
                { name: 'Gabriel Tech', email: 'gabriel@tesla.com', xp: 2100, class_id: testClass.id, access_code: 'INV-0001', avatar: '🚀' },
                { name: 'Sofia Maker', email: 'sofia@maker.com', xp: 1850, class_id: testClass.id, access_code: 'INV-0002', avatar: '👩‍💻' },
                { name: 'Lucas Hardware', email: 'lucas@hw.com', xp: 900, class_id: testClass.id, access_code: 'INV-0003', avatar: '🤖' },
                { name: 'Beatriz Logic', email: 'bia@logic.com', xp: 2500, class_id: testClass.id, access_code: 'INV-0004', avatar: '🧠' },
                { name: 'Enzo Code', email: 'enzo@code.com', xp: 450, class_id: testClass.id, access_code: 'INV-0005', avatar: '🎮' },
            ];

            const { data: createdStudents, error: studentsError } = await supabase
                .from('students')
                .insert(studentsToCreate)
                .select();

            if (studentsError) throw studentsError;

            // 3. Obter atividades existentes para vincular (ou criar uma se não houver)
            let activityId = activities[0]?.id;
            if (!activityId) {
                const { data: newAct } = await supabase.from('activities').insert([{
                    title: 'Desafio Arduíno Global',
                    description: 'Projeto de automação residencial com sensores.',
                    points: 500,
                    deadline: '2026-12-31',
                    discipline: 'Robótica'
                }]).select().single();
                activityId = newAct.id;
            }

            // 4. Gerar resultados fictícios (Submissões)
            const submissionsToCreate = createdStudents.map((s, idx) => ({
                activity_id: activityId,
                student_id: s.id,
                comments: `Relatório de conclusão do projeto ${idx + 1}`,
                status: 'graded',
                grade: [9.5, 8.8, 4.5, 10, 3.2][idx], // Alguns altos, alguns baixos para análise
                feedback: idx % 2 === 0 ? 'Excelente performance técnica!' : 'Necessário revisar conceitos de circuitos.',
                submitted_at: new Date().toISOString()
            }));

            const { error: subsError } = await supabase.from('submissions').insert(submissionsToCreate);
            if (subsError) throw subsError;

            toast.success('Ambiente de teste gerado com sucesso!');
            await loadData();
        } catch (err: any) {
            console.error('Erro no Seed:', err);
            toast.error('Falha ao gerar dados de teste.');
        }
    };

    const addClass = async (newClass: any) => {
        const dbClass = {
            name: newClass.name,
            students_count: 0,
            progress: 0,
            disciplines: newClass.disciplines
        };
        const { error } = await supabase.from('classes').insert([dbClass]);
        if (error) { toast.error('Erro ao criar turma'); return false; }
        await loadData();
        return true;
    };

    const addActivity = async (act: any) => {
        const { error } = await supabase.from('activities').insert([act]);
        if (error) {
            console.error('Erro Supabase (activities):', error);
            toast.error(`Erro ao criar atividade: ${error.message}`);
            return false;
        }
        await loadData();
        return true;
    };

    const addSubmission = async (newSub: { activityId: string, comments: string, file: File | null }) => {
        const activityId = newSub.activityId;
        const selectedAct = activities.find(a => String(a.id) === String(activityId));

        // Obter usuário atual do localStorage
        const currentUser = getFromStorage('current_user', null);

        if (!currentUser || !currentUser.id || !currentUser.email) {
            toast.error('Erro de autenticação. Faça login novamente.');
            return false;
        }

        console.log('[DataContext] Iniciando processo de submissão resiliente...', {
            email: currentUser.email,
            activityId
        });

        let studentId = currentUser.id;

        // 1. Verificar se o estudante existe no banco pelo email
        // Isso resolve o problema de usuários "fantasmas" do login por email
        try {
            const { data: existingStudent, error: searchError } = await supabase
                .from('students')
                .select('id')
                .eq('email', currentUser.email)
                .maybeSingle();

            if (searchError) throw searchError;

            if (existingStudent) {
                studentId = existingStudent.id;
                console.log('[DataContext] Estudante encontrado no banco:', studentId);
            } else {
                // 2. Se não existir, criar o estudante automaticamente
                console.log('[DataContext] Estudante não encontrado. Criando registro...');
                const { data: newStudent, error: createError } = await supabase
                    .from('students')
                    .insert([{
                        name: currentUser.name || 'Estudante Autogerado',
                        email: currentUser.email,
                        xp: currentUser.xp || 1250,
                        avatar: currentUser.avatar || '👤',
                        role: 'student'
                    }])
                    .select()
                    .single();

                if (createError) {
                    console.error('[DataContext] Erro ao auto-registrar estudante:', createError);
                    toast.error('Erro ao preparar perfil de estudante no servidor.');
                    return false;
                }
                studentId = newStudent.id;
                console.log('[DataContext] Novo estudante registrado com ID:', studentId);
            }
        } catch (err: any) {
            console.error('[DataContext] Erro na verificação de estudante:', err);
            // Se falhar a busca, tentamos seguir com o UUID gerado, mas provavelmente dará o erro 23503
        }

        let autoGrade: number | null = null;
        let autoFeedback: string | null = null;
        let status: 'delivered' | 'graded' = 'delivered';

        if (selectedAct?.questions && selectedAct.questions.length > 0) {
            try {
                const studentAnswers = JSON.parse(newSub.comments);
                let correctCount = 0;
                const totalQs = selectedAct.questions.length;

                selectedAct.questions.forEach((q) => {
                    const studentAns = studentAnswers[q.id]?.trim().toLowerCase();
                    const correctAns = q.answer?.trim().toLowerCase();
                    if (studentAns === correctAns) correctCount++;
                });

                autoGrade = Number(((correctCount / totalQs) * 10).toFixed(1));
                status = 'graded';
                autoFeedback = `🎯 Autocorreção: Você acertou ${correctCount} de ${totalQs} questões.`;
            } catch (e) {
                console.log('Submission comments is not JSON - skipping autograde');
            }
        }

        // 3. Garantir que os IDs sejam UUIDs válidos para o Supabase
        const finalStudentId = generateUUIDFromString(String(studentId));
        const finalActivityId = generateUUIDFromString(String(activityId));

        const dbSub = {
            activity_id: finalActivityId,
            student_id: finalStudentId,
            comments: newSub.comments,
            file_url: newSub.file ? `simulado://${newSub.file.name}` : null,
            status: status,
            grade: autoGrade,
            feedback: autoFeedback,
            submitted_at: new Date().toISOString(),
            graded_at: status === 'graded' ? new Date().toISOString() : null
        };

        console.log('[DataContext] Enviando submissão final:', dbSub);

        const { data, error } = await supabase.from('submissions').insert([dbSub]).select();

        if (error) {
            console.error('[DataContext] ERRO SUPABASE NA SUBMISSÃO:', error);

            if (error.code === '23503') {
                toast.error('Erro: A atividade selecionada não existe no banco de dados central.');
            } else {
                toast.error(`Falha no envio: ${error.message}`);
            }
            return false;
        }

        console.log('[DataContext] Submissão concluída com sucesso!');
        toast.success(status === 'graded' ? autoFeedback : 'Atividade enviada com sucesso!');

        await loadData();
        return true;
    };

    const gradeSubmission = async (id: string, grade: number, feedback: string) => {
        const { error } = await supabase
            .from('submissions')
            .update({ grade, feedback, status: 'graded', graded_at: new Date().toISOString() })
            .eq('id', id);

        if (error) {
            toast.error('Erro ao avaliar');
            return false;
        }
        await loadData();
        return true;
    };

    const addStudent = async (student: any) => {
        const dbStudent = {
            name: student.name,
            email: student.email,
            class_id: student.classId,
            schedule: student.schedule,
            discipline: student.discipline,
            access_code: student.accessCode,
            xp: student.xp || 0,
            progress: student.progress || 0,
            avatar: student.avatar || '👤'
        };
        const { error } = await supabase.from('students').insert([dbStudent]);
        if (error) { toast.error('Erro ao adicionar aluno'); return false; }
        await loadData();
        return true;
    };

    const deleteStudent = async (id: string) => {
        const { error } = await supabase.from('students').delete().eq('id', id);
        if (error) { toast.error('Erro ao excluir aluno'); return false; }
        await loadData();
        return true;
    };

    const deleteClass = async (id: string) => {
        const { error } = await supabase.from('classes').delete().eq('id', id);
        if (error) { toast.error('Erro ao excluir turma'); return false; }
        await loadData();
        return true;
    };

    const deleteSubmission = async (id: string) => {
        const { error } = await supabase.from('submissions').delete().eq('id', id);
        if (error) { toast.error('Erro ao excluir submissão'); return false; }
        await loadData();
        return true;
    };

    const deleteActivity = async (id: string) => {
        const { error } = await supabase.from('activities').delete().eq('id', id);
        if (error) { toast.error('Erro ao excluir missão'); return false; }
        await loadData();
        return true;
    };

    return (
        <DataContext.Provider value={{
            classes,
            activities,
            submissions,
            enrolledStudents,
            loading,
            refreshData: loadData,
            addClass,
            addActivity,
            addSubmission,
            gradeSubmission,
            addStudent,
            deleteStudent,
            deleteClass,
            deleteSubmission,
            deleteActivity,
            seedTestData
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
}
