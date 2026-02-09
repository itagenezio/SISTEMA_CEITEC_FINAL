import { ArrowLeft, User, Calendar, CheckCircle, Clock, Trash2, ShieldCheck, Terminal, Search } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Activity, EnrolledStudent } from '../../types';
import { toast } from 'sonner';

interface SubmissionsListProps {
    onNavigate: (screen: string, id?: string) => void;
    submissions: any[];
    activities: Activity[];
    students: EnrolledStudent[];
    onDeleteSubmission?: (id: string) => Promise<boolean>;
}

export function SubmissionsList({ onNavigate, submissions, activities, students, onDeleteSubmission }: SubmissionsListProps) {
    const getStudent = (id: string) => students.find(s => String(s.id) === String(id));
    const getActivity = (id: string) => activities.find(a => String(a.id) === String(id));

    const pendingSubmissions = submissions.filter(s => s.status === 'pending' || s.status === 'delivered');
    const gradedSubmissions = submissions.filter(s => s.status === 'graded');

    return (
        <div className="space-y-8 pb-10">
            {/* Header HUD */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                    <Button
                        variant="outline"
                        onClick={() => onNavigate('teacher-dashboard')}
                        className="bg-slate-800/50 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl w-14 h-14 p-0 shadow-lg shrink-0"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div className="flex items-center gap-3 mb-2">
                        <Terminal className="w-5 h-5 text-cyan-400" />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Protocolo de Monitoramento Acadêmico</span>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase font-mono italic">ENTREGAS <span className="text-cyan-400 italic">PENDENTES</span></h1>
                </div>

                <div className="flex gap-2">
                    <Badge className="bg-slate-900 border-white/5 text-slate-400 px-4 h-10 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                        {pendingSubmissions.length} AGUARDANDO_SINC
                    </Badge>
                </div>
            </div>

            <div className="grid gap-4">
                {pendingSubmissions.length === 0 ? (
                    <Card className="p-20 bg-slate-900/20 border-2 border-dashed border-white/5 text-center space-y-4">
                        <ShieldCheck className="w-16 h-16 text-slate-700 mx-auto" />
                        <h3 className="text-xl font-bold text-slate-400 uppercase tracking-tight">Status: Tudo em Dia</h3>
                        <p className="text-slate-600 text-sm">Nenhum relatório de missão aguarda processamento no momento.</p>
                    </Card>
                ) : (
                    pendingSubmissions.map((submission) => {
                        const student = getStudent(submission.student_id);
                        const activity = getActivity(submission.activity_id);

                        return (
                            <Card
                                key={submission.id}
                                className="p-6 bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group"
                                onClick={() => onNavigate('grading', submission.id)}
                            >
                                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-6 flex-1 min-w-0">
                                        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl border border-white/5 group-hover:border-cyan-500/20 shadow-xl transition-all">
                                            {student?.avatar || '👤'}
                                        </div>
                                        <div className="min-w-0 space-y-2">
                                            <h3 className="text-2xl font-black text-white tracking-tight uppercase font-mono truncate">{student?.name || 'ALUNO_DESCONHECIDO'}</h3>
                                            <div className="flex flex-wrap items-center gap-5 mt-1 font-mono text-xs">
                                                <p className="text-cyan-400 font-black flex items-center gap-2 uppercase tracking-widest">
                                                    <Terminal className="w-4 h-4" /> {activity?.title || 'MISSION_NULL'}
                                                </p>
                                                <p className="text-slate-300 flex items-center gap-2 uppercase font-black tracking-widest">
                                                    <Calendar className="w-4 h-4 text-slate-500" /> {submission.submitted_at || submission.submittedAt ? new Date(submission.submitted_at || submission.submittedAt).toLocaleDateString('pt-BR') : 'SYNC_DATE_ERROR'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right space-y-3">
                                            <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 font-black text-xs uppercase tracking-[0.2em] px-5 py-2 h-auto rounded-xl">
                                                <Clock className="w-4 h-4 mr-2" />
                                                AGUARDANDO_AVALIAÇÃO
                                            </Badge>
                                            <p className="text-cyan-400 text-xs font-black uppercase mt-2 group-hover:translate-x-2 transition-transform tracking-[0.3em] italic">Processar Agora →</p>
                                        </div>

                                        <div className="border-l border-white/5 pl-6">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={async (e) => {
                                                    e.stopPropagation();
                                                    if (window.confirm('Excluir entrega permanentemente do servidor?')) {
                                                        if (onDeleteSubmission) {
                                                            const success = await onDeleteSubmission(submission.id);
                                                            if (success) toast.success('Entrega excluída.');
                                                        }
                                                    }
                                                }}
                                                className="h-10 w-10 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}

                {gradedSubmissions.length > 0 && (
                    <div className="mt-12 space-y-6">
                        <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
                            <CheckCircle className="w-5 h-5 text-emerald-500" /> Corrigidos Recentemente
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {gradedSubmissions.slice(0, 6).map((submission) => {
                                const student = getStudent(submission.student_id);
                                const activity = getActivity(submission.activity_id);

                                return (
                                    <Card
                                        key={submission.id}
                                        className="p-4 bg-slate-900/40 border border-white/5 opacity-70 hover:opacity-100 transition-opacity"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4 min-w-0">
                                                <span className="text-3xl">{student?.avatar || '👤'}</span>
                                                <div className="min-w-0 space-y-1">
                                                    <p className="text-sm font-black text-white uppercase font-mono truncate">{student?.name}</p>
                                                    <p className="text-xs font-black text-slate-400 uppercase truncate tracking-widest">{activity?.title}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-black text-emerald-400 tracking-tighter leading-none italic">{submission.grade}</div>
                                                <p className="text-[10px] text-slate-500 font-black uppercase mt-2 tracking-[0.2em]">SCORE</p>
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
