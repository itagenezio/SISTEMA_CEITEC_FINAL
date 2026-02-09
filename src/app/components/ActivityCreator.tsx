import { useState, useRef } from 'react';
import {
    Plus, Trash2, Brain, Sparkles, Save, Printer,
    CheckCircle2, AlertCircle, Layout, ListChecks,
    FileText, Clock, Target, ArrowLeft, ArrowRight,
    Monitor, Info
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { Activity, Question } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface ActivityCreatorProps {
    onNavigate: (screen: string, id?: string) => void;
    onSave: (activity: any) => Promise<boolean>;
    selectedClass?: { name: string; id: string };
    initialData?: any;
}

export function ActivityCreator({ onNavigate, onSave, selectedClass, initialData }: ActivityCreatorProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Setup, 2: Questions, 3: Review/Key
    const [isLoading, setIsLoading] = useState(false);

    // Activity Meta
    const [meta, setMeta] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        points: initialData?.points || 100,
        deadline: initialData?.deadline || '',
        discipline: initialData?.discipline || 'Tecnologia'
    });

    // Questions State
    const [questions, setQuestions] = useState<Question[]>(initialData?.questions || [
        { id: '1', prompt: '', options: ['', '', '', ''], answer: 'A' }
    ]);

    const addQuestion = () => {
        const newId = String(questions.length + 1);
        setQuestions([...questions, { id: newId, prompt: '', options: ['', '', '', ''], answer: 'A' }]);
    };

    const updateQuestion = (id: string, field: keyof Question, value: any) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const updateOption = (qId: string, optIdx: number, value: string) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                const newOpts = [...(q.options || ['', '', '', ''])];
                newOpts[optIdx] = value;
                return { ...q, options: newOpts };
            }
            return q;
        }));
    };

    const removeQuestion = (id: string) => {
        if (questions.length === 1) return;
        setQuestions(questions.filter(q => q.id !== id));
    };

    const handleGenerateAI = () => {
        setIsLoading(true);
        toast.info('IA Inovatec analisando currículo e gerando itens...', { icon: <Brain className="w-4 h-4 text-cyan-400" /> });

        // Simulação de geração por IA com base na disciplina
        setTimeout(() => {
            const aiQuestions: Question[] = [
                {
                    id: 'ai-1',
                    prompt: 'Qual é o componente principal de um sistema de automação residencial que processa os sinais dos sensores?',
                    options: ['Transmissor Bluetooth', 'Microcontrolador (Arduíno/ESP32)', 'Cabo Jumper', 'Bateria 9V'],
                    answer: 'B'
                },
                {
                    id: 'ai-2',
                    prompt: 'No contexto de Internet das Coisas (IoT), o que significa a sigla MQTT?',
                    options: ['Main Queue Table Transfer', 'Mobile Quick Task Tool', 'Message Queuing Telemetry Transport', 'Modern Quality Technology Tier'],
                    answer: 'C'
                },
                {
                    id: 'ai-3',
                    prompt: 'Qual sensor é mais indicado para detectar a presença de fumaça em um ambiente industrial?',
                    options: ['Sensor Ultrassônico', 'Sensor LDR', 'Célula de Carga', 'Sensor MQ-2'],
                    answer: 'D'
                }
            ];
            setQuestions([...questions.filter(q => q.prompt !== ''), ...aiQuestions]);
            setIsLoading(false);
            toast.success('3 itens gerados pela IA com sucesso!');
        }, 2000);
    };

    const handleSave = async () => {
        if (!meta.title) return toast.error('Dê um título para a missão');

        setIsLoading(true);
        const activityData = {
            ...meta,
            questions: questions.map(q => ({
                ...q,
                // Garantir que a resposta seja no formato esperado (ex: índice ou letra)
                answer: q.answer
            })),
            icon: '🎯',
            color: 'from-cyan-500 to-blue-600'
        };

        const success = await onSave(activityData);
        if (success) {
            setStep(3); // Go to key/review
        }
        setIsLoading(false);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 space-y-8 print:bg-white print:text-black">
            {/* Top Navbar HUD */}
            <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-white/5 backdrop-blur-xl mb-8 print:hidden">
                <div className="flex items-center gap-6">
                    <Button variant="ghost" onClick={() => onNavigate('class-management')} className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 h-12 px-6 font-bold text-white">
                        <ArrowLeft className="w-5 h-5 mr-3" /> VOLTAR_MENU
                    </Button>
                    <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block"></div>
                    <div className="hidden md:block">
                        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-500">Protocolo_Criadouro_v2.5</h2>
                        <h1 className="text-xl font-black tracking-tighter uppercase text-white">{step === 3 ? 'Gabarito Gerado' : 'Configurando Nova Missão'}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`w-4 h-4 rounded-full transition-all duration-500 ${step >= s ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]' : 'bg-slate-800'}`}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-4xl mx-auto space-y-6"
                    >
                        <Card className="p-10 bg-slate-950/40 border border-white/5 backdrop-blur-3xl space-y-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -z-10 group-hover:bg-blue-600/20 transition-all duration-700"></div>

                            <div className="flex items-center gap-6 border-b border-white/5 pb-10">
                                <div className="p-4 bg-blue-600/20 rounded-3xl border border-blue-500/30 shadow-lg shadow-blue-500/10">
                                    <Monitor className="w-10 h-10 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-4xl font-black uppercase tracking-tighter text-white italic">Configuração de Infraestrutura</h3>
                                    <p className="text-blue-300 text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div> Definir as bases da atividade para {selectedClass?.name || 'Aruduino Pro'}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-8 font-mono font-bold">
                                    <div className="space-y-3">
                                        <label className="text-xs text-blue-300 font-black uppercase tracking-[0.3em] ml-1">Identificador da LY</label>
                                        <Input
                                            placeholder="NOME_DA_ATIVIDADE"
                                            value={meta.title}
                                            onChange={e => setMeta({ ...meta, title: e.target.value })}
                                            className="bg-slate-900/60 border-white/10 h-14 uppercase rounded-2xl focus:border-blue-500/50 focus:ring-blue-500/20 transition-all text-white placeholder:text-slate-500 font-black tracking-widest"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs text-blue-300 font-black uppercase tracking-[0.3em] ml-1">Descrição Técnica (Protocolo)</label>
                                        <Input
                                            placeholder="O que os alunos devem realizar?"
                                            value={meta.description}
                                            onChange={e => setMeta({ ...meta, description: e.target.value })}
                                            className="bg-slate-900/60 border-white/10 h-14 rounded-2xl focus:border-blue-500/50 transition-all text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-8 font-mono font-bold">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-xs text-blue-300 font-black uppercase tracking-[0.3em] ml-1">Limite de Dados</label>
                                            <Input
                                                type="date"
                                                value={meta.deadline}
                                                onChange={e => setMeta({ ...meta, deadline: e.target.value })}
                                                className="bg-slate-900/60 border-white/10 h-14 rounded-2xl focus:border-blue-500/50 transition-all text-white"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs text-blue-300 font-black uppercase tracking-[0.3em] ml-1">XP Power</label>
                                            <Input
                                                type="number"
                                                value={meta.points}
                                                onChange={e => setMeta({ ...meta, points: Number(e.target.value) })}
                                                className="bg-slate-900/60 border-white/10 h-14 rounded-2xl focus:border-blue-500/50 transition-all text-white font-black"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs text-blue-300 font-black uppercase tracking-[0.3em] ml-1">Disciplina Associada</label>
                                        <Input
                                            placeholder="Ex: Robótica"
                                            value={meta.discipline}
                                            onChange={e => setMeta({ ...meta, discipline: e.target.value })}
                                            className="bg-slate-900/60 border-white/10 h-14 uppercase rounded-2xl focus:border-blue-500/50 transition-all text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-white/5 flex justify-end">
                                <Button
                                    onClick={() => setStep(2)}
                                    disabled={!meta.title}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black h-16 px-12 rounded-3xl text-sm tracking-[0.2em] shadow-[0_0_30px_rgba(37,99,235,0.3)] group border-none flex items-center gap-4 transition-all hover:scale-[1.02]"
                                >
                                    PRÓXIMA FASE: ITENS <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-4xl mx-auto space-y-6"
                    >
                        {/* AI Assistant Banner */}
                        <Card className="p-8 bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-cyan-500/30 backdrop-blur-3xl relative overflow-hidden group rounded-[2.5rem] shadow-2xl">
                            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:rotate-12 transition-transform duration-700">
                                <Brain className="w-32 h-32 text-cyan-400" />
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center animate-pulse border border-cyan-500/30">
                                        <Sparkles className="w-8 h-8 text-cyan-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-2xl font-black uppercase tracking-tighter text-white italic">Sincronizador Cerebral IA</h4>
                                        <p className="text-sm text-cyan-100/70 font-bold uppercase tracking-widest">Gerar questões automáticas para: <span className="text-cyan-400">{meta.discipline}</span></p>
                                    </div>
                                </div>
                                <Button
                                    onClick={handleGenerateAI}
                                    disabled={isLoading}
                                    className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black h-14 px-10 rounded-2xl text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(34,211,238,0.4)] border-none transition-all active:scale-95"
                                >
                                    {isLoading ? 'ANALISANDO REDE...' : 'INVOCAR_DADOS_IA'}
                                </Button>
                            </div>
                        </Card>

                        {/* Questions List */}
                        <div className="space-y-8">
                            {questions.map((q, idx) => (
                                <Card key={q.id} className="p-10 bg-slate-900/40 border border-white/10 backdrop-blur-3xl relative group rounded-[2.5rem] shadow-xl hover:border-cyan-500/30 transition-all">
                                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeQuestion(q.id)}
                                            className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex items-start gap-6">
                                            <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-lg font-black shrink-0 shadow-lg">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Enunciado da Pergunta</label>
                                                <Input
                                                    placeholder="Digite aqui a sua pergunta..."
                                                    value={q.prompt}
                                                    onChange={e => updateQuestion(q.id, 'prompt', e.target.value)}
                                                    className="bg-slate-950/30 border-white/10 rounded-2xl text-xl font-bold text-white placeholder:text-slate-400 focus:border-cyan-500/50 transition-all h-16 px-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                            {['A', 'B', 'C', 'D'].map((letter, optIdx) => (
                                                <div key={letter} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${q.answer === letter ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/5' : 'bg-slate-800/30 border-white/5 hover:border-white/10'}`}>
                                                    <button
                                                        onClick={() => updateQuestion(q.id, 'answer', letter)}
                                                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${q.answer === letter ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-700 text-slate-300 hover:text-white'}`}
                                                    >
                                                        {letter}
                                                    </button>
                                                    <Input
                                                        placeholder={`Alternativa ${letter}...`}
                                                        value={q.options?.[optIdx] || ''}
                                                        onChange={e => updateOption(q.id, optIdx, e.target.value)}
                                                        className="bg-transparent border-none h-12 text-sm font-bold text-white placeholder:text-slate-400 focus:ring-0 px-2"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-8 pb-20 border-t border-white/5">
                            <Button
                                variant="outline"
                                onClick={addQuestion}
                                className="w-full md:w-auto h-16 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 font-black text-xs tracking-widest uppercase text-white shadow-xl flex items-center gap-3"
                            >
                                <Plus className="w-6 h-6 mr-1" /> ADICIONAR ITEM MANUALMENTE
                            </Button>
                            <div className="flex gap-4 w-full md:w-auto">
                                <Button
                                    variant="ghost"
                                    onClick={() => setStep(1)}
                                    className="h-16 px-8 text-slate-400 hover:text-white font-black uppercase text-xs tracking-widest"
                                >
                                    VOLTAR CONFIG
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="flex-1 md:flex-initial h-16 px-12 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm tracking-[0.2em] shadow-2xl shadow-blue-500/30 border-none italic"
                                >
                                    {isLoading ? 'SINCRONIZANDO...' : 'SALVAR E GERAR GABARITO'}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        {/* Summary Success HUD */}
                        <Card className="p-10 bg-slate-900/60 border border-emerald-500/20 backdrop-blur-2xl text-center space-y-6 overflow-hidden relative print:hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 animate-[bounce_2s_infinite]">
                                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black uppercase tracking-tighter text-white italic">Missão Implantada</h3>
                                <p className="text-slate-400 font-black uppercase text-xs tracking-[0.3em] mt-3">DADOS TRANSF_COMPLETE // GABARITO_DISPONIVEL</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-5 pt-4">
                                <Badge variant="outline" className="border-white/10 px-8 py-3 bg-white/5 rounded-2xl font-mono text-xs uppercase tracking-widest">{questions.length} ITENS_SYNC</Badge>
                                <Badge variant="outline" className="border-white/10 px-8 py-3 bg-white/5 rounded-2xl font-mono text-xs uppercase tracking-widest">{meta.points} XP_CAP</Badge>
                            </div>

                            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button onClick={handlePrint} className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 h-14 px-10 rounded-2xl font-black text-xs uppercase tracking-widest border border-white/5 shadow-xl">
                                    <Printer className="w-4 h-4 mr-2" /> Imprimir Gabarito Pág.
                                </Button>
                                <Button onClick={() => onNavigate('class-management')} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 h-14 px-10 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20">
                                    <Monitor className="w-4 h-4 mr-2" /> Ver em Marcar Online
                                </Button>
                            </div>
                        </Card>

                        {/* Printable Area - The Gabarito */}
                        <Card className="p-10 bg-white text-black border-none shadow-none font-serif print:p-0 print:shadow-none">
                            <div className="flex justify-between items-start border-b-2 border-black pb-8 mb-10">
                                <div>
                                    <h1 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-2">
                                        <Target className="w-8 h-8" /> INOVATEC_OS // EDU
                                    </h1>
                                    <p className="text-[10px] font-bold mt-1">PROTOCOLO ANALÍTICO DE AVALIAÇÃO</p>
                                </div>
                                <div className="text-right font-mono text-xs font-bold uppercase">
                                    <p>TURMA: {selectedClass?.name || '________________'}</p>
                                    <p>DATA: {new Date().toLocaleDateString()}</p>
                                    <p>MISSÃO: {meta.title}</p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div className="flex items-center gap-2 mb-6">
                                    <ListChecks className="w-6 h-6" />
                                    <h2 className="text-xl font-bold uppercase">Gabarito Oficial</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {questions.map((q, i) => (
                                        <div key={q.id} className="border-l-4 border-black pl-6 space-y-2">
                                            <p className="font-black text-sm uppercase">Item {i + 1}</p>
                                            <div className="flex items-center gap-3">
                                                {['A', 'B', 'C', 'D'].map(l => (
                                                    <div
                                                        key={l}
                                                        className={`w-8 h-8 rounded-md border-2 border-black flex items-center justify-center font-black text-xs ${q.answer === l ? 'bg-black text-white' : 'bg-transparent text-black'}`}
                                                    >
                                                        {l}
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-[10px] font-bold italic mt-1 line-clamp-1">{q.prompt}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-10 mt-10 border-t border-slate-300 space-y-4">
                                    <h3 className="font-bold uppercase text-xs">Instruções para o Gabarito:</h3>
                                    <ul className="text-[10px] space-y-1 list-disc pl-5">
                                        <li>Marcar o campo correspondente à resposta correta de forma preenchida.</li>
                                        <li>Este documento serve como prova física de validação do core.</li>
                                        <li>Utilize para lançamentos manuais em caso de falha de conexão.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-20 flex justify-between pt-10 border-t-2 border-slate-100 font-mono text-[9px] font-bold uppercase grayscale">
                                <p>Hash_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                                <p>Powered by CEITEC EDU Systems // 2026</p>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Info Tips print:hidden */}
            {step < 3 && (
                <div className="fixed bottom-8 right-8 flex items-center gap-4 bg-slate-900/90 p-5 rounded-[2rem] border border-cyan-500/30 backdrop-blur-xl shadow-2xl print:hidden animate-pulse hover:animate-none group cursor-help max-w-sm transition-all">
                    <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/30">
                        <Info className="w-6 h-6 text-cyan-400" />
                    </div>
                    <p className="text-xs font-black text-slate-100 uppercase leading-relaxed tracking-wider">Dica de Especialista: Questões bem estruturadas aumentam a taxa de retenção em 40%. Use a IA para rascunhar e refine manualmente.</p>
                </div>
            )}
        </div>
    );
}
