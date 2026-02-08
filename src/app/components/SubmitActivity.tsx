import { ArrowLeft, Upload, FileText, Send, CheckCircle, Loader2, Download, Zap, ShieldCheck, Terminal, Rocket } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { Activity } from '../../types';

interface SubmitActivityProps {
  onNavigate: (screen: string, id?: string) => void;
  onSubmit: (sub: { activityId: string, comments: string, file: File | null }) => Promise<boolean>;
  activityId: string;
  activities: Activity[];
}

export function SubmitActivity({ onNavigate, onSubmit, activityId, activities }: SubmitActivityProps) {
  const [file, setFile] = useState<File | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const selectedActivity = activities.find(a => String(a.id) === String(activityId));
  const hasQuestions = selectedActivity?.questions && selectedActivity.questions.length > 0;

  const handleSubmit = async () => {
    if (!activityId) {
      toast.error("MISSING_ID: Selecione uma missão ativa.");
      onNavigate('activities');
      return;
    }

    setIsSending(true);
    const finalComments = hasQuestions ? JSON.stringify(answers) : comments;
    const success = await onSubmit({ activityId, comments: finalComments, file });
    setIsSending(false);

    if (success) {
      setSubmitted(true);
      toast.success('UPLOAD_SUCCESS: Relatório de missão enviado.');
      setTimeout(() => onNavigate('portfolio'), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-10">

      {/* Header Contextual */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocolo de Submissão Inovatec_OS</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tighter uppercase font-mono">ENVIAR <span className="text-cyan-400">PROJETO</span></h1>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 bg-slate-900/40 border border-emerald-500/20 backdrop-blur-xl rounded-3xl text-center space-y-6"
          >
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <Rocket className="w-12 h-12 text-emerald-400 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white uppercase tracking-widest font-mono">Missão Cumprida!</h2>
              <p className="text-slate-400 font-medium">Relatório de atividade sincronizado com o servidor central.</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-none px-6 py-2 font-black uppercase text-[10px]">REDIRECIONANDO_SISTEMA_PORTFOLIO...</Badge>
          </motion.div>
        ) : !selectedActivity ? (
          <Card className="p-20 bg-slate-900/40 border border-white/5 text-center space-y-6">
            <ShieldCheck className="w-16 h-16 text-slate-700 mx-auto" />
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">ERRO: MÓDULO_NÃO_ENCONTRADO</h2>
            <Button onClick={() => onNavigate('activities')} className="bg-cyan-600 hover:bg-cyan-500 text-white font-black px-8 rounded-xl h-12 uppercase">Retornar ao Painel de Atividades</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Lado Esquerdo: Info & Resposta */}
            <div className="lg:col-span-8 space-y-6">
              {/* Info da Missão */}
              <Card className="p-6 bg-slate-900/60 border border-white/10 backdrop-blur-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Terminal className="w-24 h-24 text-white" />
                </div>
                <div className="flex items-center gap-6 relative z-10">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedActivity.color || 'from-indigo-600 to-cyan-600'} flex items-center justify-center text-4xl shadow-xl border border-white/10`}>
                    {selectedActivity.icon || '🎯'}
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase font-mono">{selectedActivity.title}</h2>
                    <p className="text-slate-400 text-sm font-medium line-clamp-1">{selectedActivity.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className="bg-white/5 text-slate-500 border-none font-black text-[9px] h-5">DEADLINE: {selectedActivity.deadline}</Badge>
                      <Badge className="bg-cyan-500/10 text-cyan-400 border-none font-black text-[9px] h-5">{selectedActivity.points} XP POWER</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Área de Resposta */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" /> Corpo de Dados da Missão
                </h3>

                {hasQuestions ? (
                  <div className="space-y-4">
                    {(selectedActivity.questions || []).map((q: any, index: number) => (
                      <Card key={q.id} className="p-6 bg-slate-900/40 border-white/5 hover:border-cyan-500/30 transition-all border-l-4 border-l-cyan-600">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Badge className="bg-cyan-500/10 text-cyan-400 border-none font-black text-[9px] uppercase px-3">Sub-Módulo {index + 1}</Badge>
                          </div>
                          <p className="text-lg font-bold text-white tracking-tight leading-tight">{q.prompt}</p>

                          <div className="pt-2">
                            {q.options && q.options.length > 0 ? (
                              <div className="grid grid-cols-1 gap-2">
                                {q.options.map((opt: string, optIdx: number) => (
                                  <button
                                    key={optIdx}
                                    onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 group ${answers[q.id] === opt
                                      ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                      : 'bg-slate-950/40 border-white/5 text-slate-400 hover:bg-slate-800 hover:border-white/10'}`}
                                  >
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center font-black text-[10px] ${answers[q.id] === opt ? 'bg-cyan-500 border-cyan-500 text-white' : 'border-white/10 text-slate-700'}`}>
                                      {String.fromCharCode(65 + optIdx)}
                                    </div>
                                    <span className="font-bold flex-1">{opt}</span>
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <Input
                                placeholder="Digite o log de resposta..."
                                value={answers[q.id] || ''}
                                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                                className="bg-slate-950/40 border-white/5 h-12 text-white italic"
                              />
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-6 bg-slate-900/40 border-white/5">
                    <Textarea
                      placeholder="Descreva os resultados da sua missão tecnológica aqui..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="min-h-[200px] bg-slate-950/40 border-white/5 text-white p-4 focus:ring-cyan-500/20"
                    />
                  </Card>
                )}
              </div>
            </div>

            {/* Lado Direito: Upload & Submit */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="p-6 bg-slate-900/40 border border-white/5 backdrop-blur-xl space-y-6">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Upload className="w-4 h-4 text-cyan-400" /> Data Transfer Console
                </h3>

                <label className="block group">
                  <div className="border-2 border-dashed border-white/5 rounded-3xl p-8 text-center cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-xl">
                      <Upload className="w-8 h-8 text-cyan-400" />
                    </div>
                    {file ? (
                      <div className="space-y-1">
                        <p className="text-white font-bold text-xs truncate max-w-[200px] mx-auto uppercase font-mono">{file.name}</p>
                        <p className="text-[10px] text-slate-500 font-black uppercase">{(file.size / 1024).toFixed(1)} KB_READY</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-white font-black text-[10px] uppercase tracking-widest">Selecionar_Arquivo</p>
                        <p className="text-[9px] text-slate-500 font-bold uppercase">PNG, PDF, SB3 (MAX: 10MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => e.target.files && setFile(e.target.files[0])}
                    />
                  </div>
                </label>

                <Button
                  onClick={handleSubmit}
                  disabled={isSending}
                  className="w-full h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50 transition-all uppercase tracking-widest text-xs"
                >
                  {isSending ? (
                    <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> SINCROCINIZANDO...</>
                  ) : (
                    <><Send className="w-5 h-5 mr-3" /> CONFIRMAR_DEPLOY</>
                  )}
                </Button>
              </Card>

              <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-start gap-3">
                <Zap className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <p className="text-[9px] font-black text-amber-500/70 uppercase leading-relaxed tracking-widest">
                  Aviso: Certifique-se de que todos os sub-módulos foram preenchidos antes do deploy final.
                </p>
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
