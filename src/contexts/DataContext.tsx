import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../app/lib/supabase';
import { Class, Activity, Submission, EnrolledStudent } from '../types';
import { toast } from 'sonner';
import { getFromStorage } from '../app/utils/storage';

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

            if (classesError) console.warn('Erro turmas:', classesError); // Não lançar erro para não bloquear tudo
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
        // Restaurando lógica de Autocorreção
        const activityId = newSub.activityId;
        const selectedAct = activities.find(a => String(a.id) === String(activityId));

        // Obter usuário atual do localStorage (já que context de Auth pode não estar acessível aqui facilmente sem circular dependency)
        // Mas o ideal é passar o studentId como argumento.
        // Como simplificação, pegamos do localStorage que AuthContext salva
        const currentUser = getFromStorage('current_user', null);

        if (!currentUser?.id) {
            toast.error('Erro de autenticação ao enviar');
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
                console.log('Submission comments is not JSON');
            }
        }

        const dbSub = {
            activity_id: activityId,
            student_id: currentUser.id,
            comments: newSub.comments,
            file_url: newSub.file ? `simulado://${newSub.file.name}` : null,
            status: status,
            grade: autoGrade,
            feedback: autoFeedback,
            submitted_at: new Date().toISOString(),
            graded_at: status === 'graded' ? new Date().toISOString() : null
        };

        const { error } = await supabase.from('submissions').insert([dbSub]);
        if (error) {
            toast.error('Erro ao enviar');
            return false;
        }

        if (status === 'graded') {
            toast.success(autoFeedback || 'Atividade corrigida automaticamente!');
        } else {
            toast.success('Atividade entregue com sucesso!');
        }

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
