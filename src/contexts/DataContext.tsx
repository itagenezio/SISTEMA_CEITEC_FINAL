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
        if (error) { toast.error('Erro ao criar atividade'); return false; }
        await loadData();
        return true;
    };

    const addSubmission = async (newSub: { activityId: string, comments: string, file: File | null }) => {
        const activityId = newSub.activityId;
        const selectedAct = activities.find(a => String(a.id) === String(activityId));

        // Obter usuário atual do localStorage
        const currentUser = getFromStorage('current_user', null);

        console.log('[DataContext] Preparando envio de submissão:', {
            activityId,
            userId: currentUser?.id
        });

        if (!currentUser || !currentUser.id) {
            toast.error('Erro de autenticação. Faça login novamente.');
            return false;
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

        // Converter IDs para UUIDs válidos se necessário
        const studentUUID = generateUUIDFromString(String(currentUser.id));
        const activityUUID = generateUUIDFromString(String(activityId));

        const dbSub = {
            activity_id: activityUUID,
            student_id: studentUUID,
            comments: newSub.comments,
            file_url: newSub.file ? `simulado://${newSub.file.name}` : null,
            status: status,
            grade: autoGrade,
            feedback: autoFeedback,
            submitted_at: new Date().toISOString(),
            graded_at: status === 'graded' ? new Date().toISOString() : null
        };

        console.log('[DataContext] Enviando para Supabase:', dbSub);

        const { data, error } = await supabase.from('submissions').insert([dbSub]).select();

        if (error) {
            console.error('[DataContext] ERRO CRÍTICO SUPABASE:', {
                code: error.code,
                message: error.message,
                details: error.details,
                hint: error.hint
            });

            // Tratamento amigável para erro de formato UUID (400 / 22P02)
            if (error.code === '22P02') {
                toast.error('Erro de formato de dados. Contate o suporte.');
            } else if (error.code === '23503') {
                toast.error('Erro de vínculo: Estudante ou Atividade não encontrados no banco.');
            } else {
                toast.error(`Falha no envio: ${error.message}`);
            }
            return false;
        }

        console.log('[DataContext] Sucesso:', data);
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
            deleteSubmission
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
