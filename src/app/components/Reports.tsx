import { useState, useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
    TrendingUp, Users, BookOpen, AlertCircle, Search,
    Filter, Download, ArrowLeft, Brain, Sparkles,
    Target, Zap, ShieldCheck, Microscope
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Class, Activity, Submission, EnrolledStudent } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface ReportsProps {
    onNavigate: (screen: string, id?: string) => void;
    classes: Class[];
    activities: Activity[];
    submissions: Submission[];
    students: EnrolledStudent[];
    loading: boolean;
    onSeedData?: () => Promise<void>;
}

export function Reports({
    onNavigate,
    classes,
    activities,
    submissions,
    students,
    loading,
    onSeedData
}: ReportsProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'students'>('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSeeding, setIsSeeding] = useState(false);

    // Stats computation
    const stats = useMemo(() => {
        const totalStudents = students.length;
        const totalSubmissions = submissions.length;
        const avgGrade = submissions.filter(s => s.status === 'graded' && s.grade !== undefined)
            .reduce((acc, s) => acc + (s.grade || 0), 0) / (submissions.filter(s => s.status === 'graded').length || 1);
        const engagement = totalStudents > 0 ? (totalSubmissions / (totalStudents * (activities.length || 1))) * 100 : 0;

        return { totalStudents, totalSubmissions, avgGrade: avgGrade.toFixed(1), engagement: Math.min(engagement, 100).toFixed(0) };
    }, [students, submissions, activities]);

    // Chart data: Grades distribution
    const gradesData = useMemo(() => {
        const ranges = [
            { range: '0-2', count: 0 },
            { range: '2-4', count: 0 },
            { range: '4-6', count: 0 },
            { range: '6-8', count: 0 },
            { range: '8-10', count: 0 },
        ];
        submissions.forEach(s => {
            if (s.grade !== undefined) {
                if (s.grade < 2) ranges[0].count++;
                else if (s.grade < 4) ranges[1].count++;
                else if (s.grade < 6) ranges[2].count++;
                else if (s.grade < 8) ranges[3].count++;
                else ranges[4].count++;
            }
        });
        return ranges;
    }, [submissions]);

    // Chart data: Class Comparison
    const classComparisonData = useMemo(() => {
        return classes.map(c => {
            const classSubs = submissions.filter(s => {
                const student = students.find(st => st.id === (s.studentId || s.student_id));
                return student?.classId === c.id || (student as any)?.class_id === c.id;
            });
            const avg = classSubs.filter(s => s.grade !== undefined).reduce((acc, s) => acc + (s.grade || 0), 0) / (classSubs.filter(s => s.grade !== undefined).length || 1);
            return { name: c.name, media: Number(avg.toFixed(1)), taxa: (classSubs.length / (Math.max(c.studentsCount, 1) * (activities.length || 1))) * 100 };
        });
    }, [classes, submissions, students, activities]);

    const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

    const handleSeed = async () => {
        if (!onSeedData) return;
        setIsSeeding(true);
        await onSeedData();
        setIsSeeding(false);
    };

    return (
        <div className="space-y-8 pb-10">
            {/* HUD Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-slate-900/60 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-6 relative z-10">
                    <Button
                        variant="outline"
                        onClick={() => onNavigate('teacher-dashboard')}
                        className="bg-slate-800/50 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl w-14 h-14 p-0 shadow-lg"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Microscope className="w-4 h-4 text-cyan-400" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Módulo_Analítico_V2.5</span>
                        </div>
                        <h1 className="text-4xl font-black text-white tracking-tighter uppercase font-mono">INSIGHTS <span className="text-cyan-400">PEDAGÓGICOS</span></h1>
                    </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <Button
                        onClick={handleSeed}
                        disabled={isSeeding}
                        className="bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500 hover:text-white h-12 px-6 rounded-2xl font-black text-[10px] tracking-widest uppercase"
                    >
                        {isSeeding ? 'Sincronizando...' : 'Gerar Dados de Teste'}
                    </Button>
                    <Button className="bg-cyan-600 hover:bg-cyan-500 text-white h-12 px-6 rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        <Download className="w-4 h-4 mr-2" /> Exportar Relatório
                    </Button>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex bg-slate-900/60 p-2 rounded-2xl border border-white/10 w-fit font-black uppercase text-xs tracking-widest mx-auto lg:mx-0 shadow-2xl">
                {[
                    { id: 'overview', label: 'Dashboard Geral', icon: TrendingUp },
                    { id: 'classes', label: 'Monitoramento Turmas', icon: Users },
                    { id: 'students', label: 'Análise Individual', icon: Brain },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-slate-800 text-cyan-400 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] border border-white/5 font-black' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                    >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { label: 'Matrículas Totais', value: stats.totalStudents, icon: Users, color: 'cyan' },
                                { label: 'Média Global', value: stats.avgGrade, icon: Target, color: 'emerald' },
                                { label: 'Taxa Engajamento', value: `${stats.engagement}%`, icon: Zap, color: 'amber' },
                                { label: 'Entregas Registradas', value: stats.totalSubmissions, icon: BookOpen, color: 'indigo' },
                            ].map((stat, i) => (
                                <Card key={i} className="p-6 bg-slate-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group">
                                    <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-${stat.color}-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                    <div className="flex justify-between items-start relative z-10">
                                        <div>
                                            <h4 className="text-3xl font-black text-white tracking-tighter">{stat.value}</h4>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 leading-none">{stat.label}</p>
                                        </div>
                                        <div className={`p-4 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 shadow-inner`}>
                                            <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card className="p-8 bg-slate-900/40 border border-white/5 backdrop-blur-xl space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Microscope className="w-4 h-4 text-cyan-400" /> Distribuição de Notas (Global)
                                    </h3>
                                    <Badge className="bg-cyan-500/10 text-cyan-400 border-none px-3 font-bold text-[9px]">FREQUÊNCIA_SINC</Badge>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={gradesData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                            <XAxis dataKey="range" stroke="#94a3b8" fontSize={12} fontWeight="bold" />
                                            <YAxis stroke="#94a3b8" fontSize={12} fontWeight="bold" />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}
                                                itemStyle={{ color: '#22d3ee', fontWeight: 'black' }}
                                            />
                                            <Bar dataKey="count" fill="#06b6d4" radius={[6, 6, 0, 0]} barSize={45} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>

                            <Card className="p-8 bg-slate-900/40 border border-white/5 backdrop-blur-xl space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-indigo-400" /> Performance por Turma
                                    </h3>
                                    <Badge className="bg-indigo-500/10 text-indigo-400 border-none px-3 font-bold text-[9px]">MÉDIA_COMPARATIVA</Badge>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={classComparisonData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                            <XAxis dataKey="name" stroke="#64748b" fontSize={10} fontWeight="bold" />
                                            <YAxis stroke="#64748b" fontSize={10} fontWeight="bold" />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '10px' }}
                                            />
                                            <Line type="monotone" dataKey="media" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6, fill: '#8b5cf6' }} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </div>

                        {/* Educational Intervention Area */}
                        <Card className="p-8 bg-slate-900/60 border border-amber-500/20 backdrop-blur-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Brain className="w-32 h-32 text-amber-400" />
                            </div>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-500/10 rounded-lg">
                                        <AlertCircle className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Foco em Intervenção Pedagógica</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="p-6 bg-slate-950/60 rounded-[1.5rem] border border-white/5 space-y-3 shadow-inner">
                                        <p className="text-xs font-black text-amber-500 uppercase tracking-widest italic">Alerta de Baixo Engajamento</p>
                                        <p className="text-slate-200 text-sm font-bold leading-relaxed">34% dos alunos da Turma 9A não realizaram o upload do projeto final. Necessário revisão dos pré-requisitos técnicos.</p>
                                    </div>
                                    <div className="p-6 bg-slate-950/60 rounded-[1.5rem] border border-white/5 space-y-3 shadow-inner">
                                        <p className="text-xs font-black text-cyan-500 uppercase tracking-widest italic">Oportunidade de Aceleração</p>
                                        <p className="text-slate-200 text-sm font-bold leading-relaxed">Grupo "Alpha" atingiu 9.8 de média global. Sugestão: Introduzir módulo avançado de Arquitetura de Software.</p>
                                    </div>
                                    <div className="p-6 bg-slate-950/60 rounded-[1.5rem] border border-white/5 space-y-3 shadow-inner">
                                        <p className="text-xs font-black text-emerald-500 uppercase tracking-widest italic">Insight de Lógica</p>
                                        <p className="text-slate-200 text-sm font-bold leading-relaxed">Melhora de 15% na compreensão de loops após a atividade gamificada no PictoBlox.</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {activeTab === 'classes' && (
                    <motion.div
                        key="classes"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {classes.map(c => (
                            <Card key={c.id} className="p-6 bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-all group cursor-pointer overflow-hidden">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl font-black border border-white/5 group-hover:text-cyan-400 transition-colors">
                                        {c.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <Badge className="bg-cyan-500/10 text-cyan-400 border-none font-black text-[9px] uppercase">{c.studentsCount} Alunos</Badge>
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">{c.name}</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                                        <span>Progresso do Core</span>
                                        <span className="text-cyan-400">{c.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-500 transition-all duration-1000" style={{ width: `${c.progress}%` }}></div>
                                    </div>
                                    <div className="pt-4 border-t border-white/5 flex justify-between">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border border-slate-900 flex items-center justify-center text-[8px]">👤</div>
                                            ))}
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => onNavigate('class-management', c.id)} className="text-[9px] font-black tracking-widest uppercase hover:text-cyan-400">Ver_Analise_Data</Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'students' && (
                    <motion.div
                        key="students"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="space-y-6"
                    >
                        <div className="relative max-w-lg mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                            <Input
                                placeholder="PROCURAR_ESTUDANTE_BY_DNA..."
                                className="pl-12 h-14 bg-slate-900 border-white/10 rounded-2xl focus:border-cyan-500/50 uppercase font-mono text-xs tracking-widest"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-4">
                            {students
                                .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(s => {
                                    const subCount = submissions.filter(sub => (sub.studentId || sub.student_id) === s.id).length;
                                    const avg = submissions.filter(sub => (sub.studentId || sub.student_id) === s.id && sub.grade !== undefined)
                                        .reduce((acc, sub) => acc + (sub.grade || 0), 0) / (subCount || 1);

                                    return (
                                        <Card key={s.id} className="p-4 bg-slate-900/60 border border-white/5 hover:border-white/10 transition-all flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center text-3xl">
                                                {s.avatar || '👤'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-white uppercase font-mono tracking-tight">{s.name}</h4>
                                                <div className="flex gap-4 mt-1 font-mono text-[9px] text-slate-500 uppercase">
                                                    <span>EXP: {s.xp}</span>
                                                    <span>MISSÕES: {subCount}</span>
                                                </div>
                                            </div>
                                            <div className="text-right space-y-2 pr-4">
                                                <p className="text-[10px] font-black text-slate-500 uppercase">Performance</p>
                                                <h5 className={`text-xl font-black ${avg >= 8 ? 'text-emerald-400' : avg >= 6 ? 'text-cyan-400' : 'text-amber-400'}`}>
                                                    {subCount > 0 ? avg.toFixed(1) : 'N/A'}
                                                </h5>
                                            </div>
                                            <Button variant="outline" className="h-10 border-white/10 hover:border-cyan-500/30 text-[9px] font-black uppercase tracking-widest px-4">Relatório_DNA</Button>
                                        </Card>
                                    );
                                })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
