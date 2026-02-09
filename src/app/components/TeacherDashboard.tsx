import { Users, CheckSquare, TrendingUp, BookOpen, BarChart3, Calendar, Plus, Sparkles, LogOut, Wand2, ShieldCheck, Activity as ActivityIcon, Download, Search, LayoutDashboard, Pencil, Trash2, ChevronRight, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Class, Activity } from '../../types';
import { toast } from 'sonner';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface TeacherDashboardProps {
  onNavigate: (screen: string, id?: string) => void;
  classes: Class[];
  activities: Activity[];
  onAddActivity: (activity: any) => void;
}

export function TeacherDashboard({ onNavigate, classes, activities, onAddActivity }: TeacherDashboardProps) {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    points: 100,
    deadline: '',
    discipline: 'Tecnologia',
    questions: [] as any[]
  });

  const totalStudents = classes.reduce((acc, c) => acc + c.studentsCount, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleCreateActivity = () => {
    if (!newActivity.title || !newActivity.deadline) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    const activityData = {
      ...newActivity,
      icon: newActivity.questions?.length > 0 ? '🤖' : '📝',
      color: newActivity.questions?.length > 0 ? 'from-cyan-400 to-blue-600' : 'from-blue-400 to-indigo-500'
    };

    onAddActivity(activityData);
    toast.success('Atividade lançada!', {
      description: `A atividade "${activityData.title}" foi enviada para o servidor.`
    });
    setIsActivityModalOpen(false);
    setNewActivity({ title: '', description: '', points: 100, deadline: '', discipline: 'Tecnologia', questions: [] });
  };

  const handleGenerateAI = () => {
    const topic = newActivity.title || "Tecnologia";
    toast.info(`IA Analisando tema: "${topic}"...`, { icon: '🤖' });

    setTimeout(() => {
      const question = {
        id: Date.now(),
        prompt: `Questão gerada por IA sobre ${topic}: Qual o principal conceito envolvido?`,
        options: ["Inovação", "Criatividade", "Lógica", "Design"],
        answer: "Lógica"
      };
      setNewActivity(prev => ({
        ...prev,
        questions: [...prev.questions, question]
      }));
      toast.success('Questão gerada com sucesso!');
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-20 relative px-2">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Header Superior - ESTILO COMMAND CENTER VIBRANTE */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-slate-900/60 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

        <div className="space-y-4 relative z-10 w-full lg:w-auto">
          <div className="flex flex-wrap items-center gap-4">
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-5 py-2 font-mono tracking-widest text-xs uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <ShieldCheck className="w-4 h-4 mr-2" /> OPERAÇÃO: EDU_CORE_ACTIVA
            </Badge>
            <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 px-5 py-2 font-mono tracking-widest text-xs uppercase">
              <Sparkles className="w-4 h-4 mr-2" /> IA_SYNC: READY_V4
            </Badge>
          </div>
          <div className="space-y-1">
            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase italic font-mono leading-none">
              CENTRO_DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 animate-gradient-x">COMANDO</span>
            </h1>
            <p className="text-slate-300 font-bold uppercase tracking-[0.2em] text-sm md:text-base leading-relaxed">
              Protocolo Inovatec OS <span className="text-cyan-500 mx-2">//</span> Monitoramento de Trilhas Tecnológicas
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto relative z-10">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Button
              onClick={() => onNavigate('activity-creator')}
              className="h-16 px-12 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-black rounded-2xl shadow-[0_10px_30px_rgba(6,182,212,0.3)] transition-all border-none group w-full sm:w-auto text-sm tracking-[0.2em] uppercase italic"
            >
              <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform" />
              Lançar Missão de Trilha
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Estatísticas Consolidadas - GRID VIBRANTE */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { label: 'Recrutas Ativos', value: totalStudents, sub: 'Protocolos de Registro', icon: Users, color: 'cyan' },
          { label: 'Dados p/ Validar', value: '12', sub: 'Pendências de Sinc', icon: CheckSquare, color: 'indigo' },
          { label: 'Eficácia Global', value: '66.8%', sub: 'Nível de Resiliência', icon: TrendingUp, color: 'emerald' },
          { label: 'Clusters de Turma', value: classes.length, sub: 'Nós Operacionais', icon: BookOpen, color: 'amber' },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="p-8 bg-slate-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 rounded-[2rem] shadow-xl">
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`p-4 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 group-hover:bg-${stat.color}-500/20 transition-all`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <div className="flex flex-col items-end">
                  <div className={`w-2 h-2 rounded-full bg-${stat.color}-500 animate-pulse shadow-[0_0_8px_${stat.color}]`}></div>
                  <span className="text-[8px] font-black text-slate-600 mt-2 uppercase tracking-widest">{stat.sub}</span>
                </div>
              </div>
              <div className="relative z-10 space-y-2">
                <h3 className="text-5xl font-black text-white tracking-tighter italic">{stat.value}</h3>
                <p className="text-xs text-slate-300 font-black uppercase tracking-[0.3em] leading-none">{stat.label}</p>
                <p className="text-[10px] font-black text-cyan-500/80 uppercase tracking-widest">{stat.sub}</p>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 w-0 bg-${stat.color}-500 group-hover:w-full transition-all duration-700`}></div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Conteúdo Principal - LAYOUT MODERNO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Operações de Turma */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-2xl font-black text-white flex items-center gap-4 tracking-tighter uppercase italic">
              <div className="p-2 rounded-lg bg-cyan-500/10"><LayoutDashboard className="w-6 h-6 text-cyan-500" /></div> NODOS DE OPERAÇÃO
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('class-management')}
              className="text-cyan-500 hover:text-white text-[10px] font-black tracking-widest group"
            >
              VISUALIZAÇÃO COMPLETA <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card
                  onClick={() => onNavigate('class-management', c.id)}
                  className="p-6 bg-slate-900/60 border border-white/5 hover:border-cyan-500/40 transition-all duration-500 group cursor-pointer relative overflow-hidden rounded-[2rem] shadow-lg backdrop-blur-xl"
                >
                  <div className="flex items-center gap-5 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center text-3xl font-black text-slate-700 border border-white/10 group-hover:border-cyan-500/40 group-hover:text-cyan-500 transition-all duration-500 italic">
                      {c.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase font-mono truncate tracking-tight">{c.name}</h3>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{c.studentsCount} RECRUTAS</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => { e.stopPropagation(); onNavigate('class-management', c.id); }}
                          className="h-9 w-9 text-slate-600 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-all"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => { e.stopPropagation(); onNavigate('class-management', c.id); }}
                          className="h-9 w-9 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <span className="text-sm font-black text-cyan-500 italic">{c.progress}%</span>
                    </div>
                  </div>
                  <div className="mt-6 h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.progress}%` }}
                      className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-4 mt-12">
            <h2 className="text-2xl font-black text-white flex items-center gap-4 tracking-tighter uppercase italic">
              <div className="p-2 rounded-lg bg-indigo-500/10"><ActivityIcon className="w-6 h-6 text-indigo-500" /></div> MISSÕES DE TRILHA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.length === 0 ? (
              <div className="col-span-full py-16 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-slate-900/40">
                <p className="text-slate-500 font-black uppercase text-xs tracking-[0.3em]">Nenhuma missão implantada na rede.</p>
              </div>
            ) : (
              activities.map((act, i) => (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    onClick={() => onNavigate('activity-edit', act.id)}
                    className="p-6 bg-slate-900/60 border border-white/5 hover:border-indigo-500/40 transition-all duration-500 group cursor-pointer relative overflow-hidden rounded-[2rem] shadow-lg backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-5 relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center text-3xl font-black border border-white/10 group-hover:border-indigo-500/40 transition-all duration-500">
                        {act.icon || '🎯'}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase font-mono truncate tracking-tight">{act.title}</h3>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">EXPIRA: {act.deadline}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10 font-mono text-[9px] uppercase">
                          {act.points} XP
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-slate-600 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-xl transition-all"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Console de Terminal Lateral */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-2xl font-black text-white flex items-center gap-4 tracking-tighter uppercase italic">
              <Wand2 className="w-7 h-7 text-indigo-500" /> ACESSO_CORE
            </h2>
            <Badge className="bg-indigo-500/20 text-indigo-400 border-none font-black text-[8px] px-2 italic uppercase">System_Nav</Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Nodos Turma', icon: Users, screen: 'class-management', color: 'cyan', id: classes[0]?.id },
              { label: 'Protocolos de Correção', icon: CheckSquare, screen: 'submissions-list', color: 'emerald' },
              { label: 'Analítica Global', icon: BarChart3, screen: 'reports', color: 'indigo' },
              { label: 'Cronômetro Sync', icon: Calendar, screen: 'calendar', color: 'orange' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card
                  onClick={() => onNavigate(item.screen, item.id)}
                  className="p-6 bg-slate-900/60 border border-white/5 hover:border-white/20 transition-all group cursor-pointer text-center space-y-4 relative overflow-hidden rounded-3xl h-full flex flex-col items-center justify-center shadow-xl"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/20 border border-${item.color}-500/30 flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className={`w-7 h-7 text-${item.color}-400`} />
                  </div>
                  <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-tight max-w-[80px]">{item.label}</p>
                  <div className={`absolute inset-0 bg-${item.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Info Card */}
          <Card className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-950 border border-indigo-500/20 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col gap-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                <Zap className="w-6 h-6 text-indigo-400 animate-pulse" />
              </div>
              <div>
                <h4 className="text-white font-black uppercase text-lg italic tracking-tight">Sincronização Ativa</h4>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Todos os subnós estão operando em 1.2ghz. Sem falhas detectadas.</p>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
          </Card>
        </div>
      </div>

      {/* Modal Nova Atividade (Estilo Integrado Moderno) */}
      <Dialog open={isActivityModalOpen} onOpenChange={setIsActivityModalOpen}>
        <DialogContent className="bg-slate-900/95 border border-white/10 text-white sm:max-w-[500px] shadow-[0_0_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl rounded-[3rem] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>

          <DialogHeader className="border-b border-white/5 pb-6 space-y-2">
            <DialogTitle className="text-3xl font-black italic tracking-tighter flex items-center gap-4 uppercase">
              <div className="p-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/30"><ActivityIcon className="w-7 h-7 text-cyan-400" /></div> IMPLANTAR_MISSÃO
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-[10px] uppercase font-black tracking-[0.3em] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div> Protocolo de Inserção de Dados
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-8 font-mono">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] ml-1">Identificador da Missão</label>
              <Input
                placeholder="Ex: PROTOCOLO_ALPHA_01"
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                className="bg-slate-950/50 border-white/10 focus:border-cyan-500/50 h-14 uppercase rounded-2xl font-black tracking-widest text-white shadow-inner"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] ml-1">Carga de XP</label>
                <div className="relative">
                  <Input
                    type="number"
                    value={newActivity.points}
                    onChange={(e) => setNewActivity({ ...newActivity, points: Number(e.target.value) })}
                    className="bg-slate-950/50 border-white/10 h-14 rounded-2xl font-black text-cyan-400 pl-10"
                  />
                  <Zap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-600" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] ml-1">Data de Expiração</label>
                <Input
                  type="date"
                  value={newActivity.deadline}
                  onChange={(e) => setNewActivity({ ...newActivity, deadline: e.target.value })}
                  className="bg-slate-950/50 border-white/10 h-14 rounded-2xl font-black text-slate-400"
                />
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.01 }}>
              <Button
                variant="outline"
                onClick={handleGenerateAI}
                className="w-full border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10 font-black text-[10px] h-14 uppercase tracking-[0.3em] rounded-2xl transition-all shadow-lg"
              >
                <Wand2 className="w-5 h-5 mr-3 animate-pulse" /> Invocação de Conteúdo IA
              </Button>
            </motion.div>
          </div>

          <DialogFooter className="bg-slate-950/80 -mx-6 -mb-6 p-8 border-t border-white/5 flex gap-4">
            <Button variant="ghost" onClick={() => setIsActivityModalOpen(false)} className="text-slate-600 hover:text-white font-black text-[10px] tracking-widest uppercase flex-1">Abortar_Missão</Button>
            <Button onClick={handleCreateActivity} className="bg-cyan-600 hover:bg-cyan-500 text-white font-black h-14 px-10 rounded-2xl text-[10px] uppercase tracking-[0.3em] flex-1 shadow-[0_0_20px_rgba(6,182,212,0.3)] italic">Executar_Deploy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
