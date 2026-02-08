import { ArrowLeft, User, Calendar, CheckCircle, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Activity, EnrolledStudent } from '../data/mockData';

interface SubmissionsListProps {
    onNavigate: (screen: string, id?: string) => void;
    submissions: any[];
    activities: Activity[];
    students: EnrolledStudent[];
}

export function SubmissionsList({ onNavigate, submissions, activities, students }: SubmissionsListProps) {
    const getStudent = (id: string) => students.find(s => String(s.id) === String(id));
    const getActivity = (id: string) => activities.find(a => String(a.id) === String(id));

    const pendingSubmissions = submissions.filter(s => s.status === 'pending' || s.status === 'delivered');
    const gradedSubmissions = submissions.filter(s => s.status === 'graded');

    return (
        <div className="min-h-screen p-6"
            style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)' }}>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => onNavigate('teacher-dashboard')}
                    className="w-10 h-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-white">Entregas Pendentes</h1>
                    <p className="text-blue-200">Atividades aguardando correção</p>
                </div>
            </div>

            <div className="space-y-4">
                {pendingSubmissions.length === 0 ? (
                    <Card className="p-12 bg-white/5 border-2 border-dashed border-white/20 text-center">
                        <User className="w-12 h-12 text-blue-400 mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-white mb-2">Tudo em dia!</h3>
                        <p className="text-blue-200">Nenhum aluno enviou atividades pendentes no momento.</p>
                    </Card>
                ) : (
                    pendingSubmissions.map((submission) => {
                        const student = getStudent(submission.student_id);
                        const activity = getActivity(submission.activity_id);

                        return (
                            <Card
                                key={submission.id}
                                className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.01] transition-transform"
                                onClick={() => onNavigate('grading', submission.id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-2xl">{student?.avatar || '👤'}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{student?.name || 'Aluno Desconhecido'}</h3>
                                            <div className="flex flex-wrap items-center gap-4 mt-1">
                                                <p className="text-sm text-blue-200 flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    {activity?.title || 'Atividade Removida'}
                                                </p>
                                                <p className="text-xs text-blue-300 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    Enviado em {submission.submitted_at ? new Date(submission.submitted_at).toLocaleDateString('pt-BR') : 'Data desconhecida'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-400/30 mb-2">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {submission.status === 'delivered' ? 'Entregue' : 'Pendente'}
                                        </Badge>
                                        <p className="text-sm text-cyan-400 font-semibold">Corrigir Agora →</p>
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}

                {gradedSubmissions.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-xl font-bold text-white mb-4">Corrigidas Recentemente</h2>
                        <div className="space-y-3 opacity-80">
                            {gradedSubmissions.map((submission) => {
                                const student = getStudent(submission.student_id);
                                const activity = getActivity(submission.activity_id);

                                return (
                                    <Card
                                        key={submission.id}
                                        className="p-5 bg-white/5 backdrop-blur-sm border-white/10 shadow-lg"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">{student?.avatar || '👤'}</span>
                                                <div>
                                                    <p className="text-sm font-bold text-white">{student?.name}</p>
                                                    <p className="text-xs text-blue-200">{activity?.title}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-green-400">Nota: {submission.grade}</p>
                                                <p className="text-[10px] text-blue-300">Avaliado em {submission.graded_at ? new Date(submission.graded_at).toLocaleDateString('pt-BR') : 'N/A'}</p>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
