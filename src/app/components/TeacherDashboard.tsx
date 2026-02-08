import { Users, CheckSquare, TrendingUp, BookOpen, BarChart3, Calendar, Plus, Sparkles, LogOut, Wand2, ShieldCheck, Activity as ActivityIcon, Download, Search, LayoutDashboard } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Class, Activity } from '../../types';
import { toast } from 'sonner';
import { useState } from 'react';
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
    <div className="space-y-8 pb-10">
      {/* Header Superior - Estilo Command Center */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-slate-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-3 py-1 animate-pulse font-mono tracking-tighter text-[10px]">
              <ShieldCheck className="w-3 h-3 mr-1" /> PROTOCOLO EDU_CORE ATIVO
            </Badge>
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-3 py-1 font-mono tracking-tighter text-[10px]">
              <Sparkles className="w-3 h-3 mr-1" /> MÓDULO IA: READY
            </Badge>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white capitalize">
            Gestão de Trilhas <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono">INOVATEC</span>
          </h1>
          <p className="text-slate-400 font-medium">Controle centralizado de aprendizagem tecnológica e monitoramento em tempo real.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <Button
            onClick={() => setIsActivityModalOpen(true)}
            className="h-14 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:scale-[1.02] border-none group w-full sm:w-auto text-base"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
            LANÇAR NOVA TRILHA
          </Button>
        </div>
      </div>

      {/* Estatísticas Consolidadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Estudantes', value: totalStudents, sub: '+4 novos hoje', icon: Users, color: 'cyan' },
          { label: 'Pendentes Correção', value: '12', sub: 'Aguardando ação', icon: CheckSquare, color: 'emerald' },
          { label: 'Engajamento Global', value: '66.8%', sub: 'Alta performance', icon: TrendingUp, color: 'purple' },
          { label: 'Turmas Ativas', value: classes.length, sub: 'Operação normal', icon: BookOpen, color: 'amber' },
        ].map((stat, i) => (
          <Card key={i} className="p-5 bg-slate-900/40 border border-white/5 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div className={`p-2.5 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
              </div>
              <Badge variant="outline" className="border-white/5 text-[10px] text-slate-500">{stat.sub}</Badge>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-0.5 tracking-tighter">{stat.value}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lista de Turmas */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-tighter">
              <LayoutDashboard className="w-5 h-5 text-cyan-500" /> Operações de Turma
            </h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('class-management')} className="text-cyan-400 hover:text-cyan-300 text-xs font-bold">
              GERENCIAR TUDO <Search className="w-3 h-3 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map(c => (
              <Card
                key={c.id}
                onClick={() => onNavigate('class-management', c.id)}
                className="p-5 bg-slate-900/60 border border-white/5 hover:border-cyan-500/40 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl font-black text-slate-500 border border-white/5 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all">
                    {c.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors uppercase font-mono">{c.name}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase">{c.studentsCount} ALUNOS</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-cyan-400">{c.progress}%</span>
                  </div>
                </div>
                <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full" style={{ width: `${c.progress}%` }}></div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Menu de Funcionalidades */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 uppercase tracking-tighter">
            <Wand2 className="w-5 h-5 text-purple-500" /> Terminal de Acesso
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Gestão Turmas', icon: Users, screen: 'class-management', color: 'from-blue-600 to-cyan-600', id: classes[0]?.id },
              { label: 'Correções', icon: CheckSquare, screen: 'submissions-list', color: 'from-emerald-600 to-teal-600' },
              { label: 'Relatórios', icon: BarChart3, screen: 'reports', color: 'from-purple-600 to-indigo-600' },
              { label: 'Calendário', icon: Calendar, screen: 'calendar', color: 'from-amber-600 to-orange-600' },
            ].map((item, i) => (
              <Card
                key={i}
                onClick={() => onNavigate(item.screen, item.id)}
                className="p-5 bg-slate-900/40 border border-white/5 hover:border-white/20 transition-all group cursor-pointer text-center space-y-3 relative overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-black text-white uppercase tracking-widest">{item.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Nova Atividade (Estilo Integrado) */}
      <Dialog open={isActivityModalOpen} onOpenChange={setIsActivityModalOpen}>
        <DialogContent className="bg-slate-900 border border-white/10 text-white sm:max-w-[500px] shadow-2xl">
          <DialogHeader className="border-b border-white/5 pb-4">
            <DialogTitle className="text-xl font-black tracking-tight flex items-center gap-2 uppercase">
              <ActivityIcon className="w-5 h-5 text-cyan-400" /> Implantar Trilha Digital
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-xs uppercase font-bold">
              Preencha os parâmetros para a nova missão tecnológica.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-6 font-mono">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Identificação da Missão</label>
              <Input
                placeholder="Ex: INTRO_ARDUINO_01"
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                className="bg-slate-800 border-white/10 focus:border-cyan-500 h-11 uppercase"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Potencial XP</label>
                <Input
                  type="number"
                  value={newActivity.points}
                  onChange={(e) => setNewActivity({ ...newActivity, points: Number(e.target.value) })}
                  className="bg-slate-800 border-white/10 h-11"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Data Limite</label>
                <Input
                  type="date"
                  value={newActivity.deadline}
                  onChange={(e) => setNewActivity({ ...newActivity, deadline: e.target.value })}
                  className="bg-slate-800 border-white/10 h-11"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleGenerateAI}
              className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10 font-black text-[10px] h-11 uppercase"
            >
              <Wand2 className="w-4 h-4 mr-2" /> Gerar Conteúdo com IA
            </Button>
          </div>
          <DialogFooter className="bg-slate-950/50 -mx-6 -mb-6 p-6 border-t border-white/5">
            <Button variant="ghost" onClick={() => setIsActivityModalOpen(false)} className="text-slate-500 font-black text-xs">ABORTAR</Button>
            <Button onClick={handleCreateActivity} className="bg-cyan-600 hover:bg-cyan-500 text-white font-black h-11 px-8 rounded-xl text-xs uppercase">Confirmar_Deploy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
