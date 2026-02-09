import { useState } from 'react';
import { ArrowLeft, Users, UserPlus, Mail, TrendingUp, BookOpen, Plus, Trash2, Key, Download, Pencil, ShieldAlert, GraduationCap, Clock, BookMarked, Filter, LayoutDashboard, ChevronRight, Zap, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
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

import { Class, EnrolledStudent } from '../../types';

interface ClassManagementProps {
  onNavigate: (screen: string, id?: string) => void;
  onAddClass: (newClass: any) => void;
  onAddActivity: (activity: any) => void;
  selectedClass: Class;
  classes: Class[];
  students: EnrolledStudent[];
  onAddStudent: (student: any) => void;
  onDeleteClass: (id: string) => Promise<boolean>;
  onDeleteStudent: (id: string) => Promise<boolean>;
}

export function ClassManagement({
  onNavigate,
  onAddClass,
  onAddActivity,
  selectedClass,
  classes,
  students,
  onAddStudent,
  onDeleteClass,
  onDeleteStudent
}: ClassManagementProps) {
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isDeleteClassModalOpen, setIsDeleteClassModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const [newClassName, setNewClassName] = useState('');
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>(['Inovação']);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    schedule: '',
    discipline: selectedClass?.disciplines[0] || 'Inovação'
  });

  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    points: 100,
    deadline: '',
    discipline: selectedClass?.disciplines[0] || 'Tecnologia'
  });

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
      icon: '📝',
      color: 'from-blue-400 to-indigo-500'
    };

    onAddActivity(activityData);
    toast.success('Atividade lançada para a turma!');
    setIsActivityModalOpen(false);
    setNewActivity({ title: '', description: '', points: 100, deadline: '', discipline: selectedClass?.disciplines[0] || 'Tecnologia' });
  };

  const generateAccessCode = () => {
    return `INV-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const handleCreateClass = () => {
    if (!newClassName.trim()) return;
    const newClass = {
      name: newClassName,
      disciplines: selectedDisciplines.length > 0 ? selectedDisciplines : ['Geral']
    };
    onAddClass(newClass);
    toast.success(`Turma "${newClassName}" criada!`);
    setIsClassModalOpen(false);
    setNewClassName('');
    setSelectedDisciplines(['Inovação']);
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email.includes('@')) {
      toast.error('Dados inválidos', { description: 'Preencha o nome e um e-mail válido.' });
      return;
    }

    const studentWithCode = {
      name: newStudent.name,
      email: newStudent.email,
      classId: selectedClass.id,
      accessCode: generateAccessCode(),
      schedule: newStudent.schedule || 'A definir',
      discipline: newStudent.discipline,
      xp: 0,
      progress: 0,
      avatar: '👤'
    };

    onAddStudent(studentWithCode);
    setNewStudent({ ...newStudent, name: '', email: '' });
    setIsStudentModalOpen(false);

    toast.success('Aluno cadastrado!', {
      description: `Código: ${studentWithCode.accessCode} | Turma: ${selectedClass?.name}`
    });
  };

  const handleDeleteClass = async () => {
    if (!selectedClass) return;
    const success = await onDeleteClass(selectedClass.id);
    if (success) {
      setIsDeleteClassModalOpen(false);
      onNavigate('teacher-dashboard');
      toast.success('Turma excluída com sucesso.');
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (window.confirm('Confirmar remoção permanente deste registro?')) {
      const success = await onDeleteStudent(id);
      if (success) {
        toast.success('Registro removido do core.');
      }
    }
  };

  return (
    <div className="space-y-12 pb-20 relative px-2">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-10 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Header Estilo HUD - PREMIUM */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row items-center gap-8 bg-slate-900/60 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            onClick={() => onNavigate('teacher-dashboard')}
            className="bg-slate-800/40 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl w-16 h-16 p-0 shadow-xl group/back transition-all"
          >
            <ArrowLeft className="w-7 h-7 group-hover/back:-translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        <div className="flex-1 text-center lg:text-left space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase font-mono leading-none flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
              ID_NODE_{selectedClass?.name || 'SELECTOR'}
            </h1>
            <Badge variant="outline" className="border-cyan-500/40 text-cyan-400 bg-cyan-500/10 px-5 py-2 font-mono text-xs tracking-widest uppercase">
              UUID_{selectedClass?.id || 'NULL'}
            </Badge>
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center lg:justify-start gap-3">
            <ShieldAlert className="w-5 h-5 text-cyan-500" /> Terminal de Gerenciamento Acadêmico <span className="text-cyan-500">//</span> Protocolo Inovatec_OS
          </p>
        </div>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="ghost"
              onClick={() => toast.info('Acesso emcriptado. Use o painel central.')}
              className="w-14 h-14 bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:text-cyan-400 transition-all rounded-2xl p-0 shadow-lg"
            >
              <Pencil className="w-6 h-6" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              variant="ghost"
              onClick={() => setIsDeleteClassModalOpen(true)}
              className="w-14 h-14 bg-white/5 border border-white/10 hover:border-red-500/40 hover:text-red-500 transition-all rounded-2xl p-0 shadow-lg"
            >
              <Trash2 className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Dashboard de Monitoramento - GRID DINÂMICO */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {/* Card de Operações */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-slate-900/40 border border-white/5 backdrop-blur-3xl space-y-6 rounded-[2.5rem] shadow-xl hover:border-indigo-500/30 transition-all duration-500 group">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-3">
                <Zap className="w-5 h-5 text-indigo-400" /> Operações de Escopo
              </h3>
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <Button
                onClick={() => setIsClassModalOpen(true)}
                className="w-full bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/20 text-indigo-400 hover:text-white h-16 rounded-2xl text-xs font-black tracking-widest uppercase transition-all duration-300 group/btn italic"
              >
                <Plus className="w-5 h-5 mr-3 group-hover/btn:rotate-90 transition-transform" /> Criar Novas Turmas
              </Button>
              <Button
                onClick={() => onNavigate('activity-creator', selectedClass?.id)}
                className="w-full bg-cyan-600/10 hover:bg-cyan-600 border border-cyan-500/20 text-cyan-400 hover:text-white h-16 rounded-2xl text-xs font-black tracking-widest uppercase transition-all duration-300 group/btn italic"
              >
                <Plus className="w-5 h-5 mr-3 group-hover/btn:rotate-90 transition-transform" /> Lançar Atividade p/ Turma
              </Button>
              <Button
                onClick={() => setIsStudentModalOpen(true)}
                className="w-full bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-500/20 text-emerald-400 hover:text-white h-16 rounded-2xl text-xs font-black tracking-widest uppercase transition-all duration-300 group/btn italic"
              >
                <UserPlus className="w-5 h-5 mr-3 group-hover/btn:scale-110 transition-transform" /> Matricular Aluno_Core
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Card de Métricas */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-slate-900/40 border border-white/5 backdrop-blur-3xl space-y-8 rounded-[2.5rem] shadow-xl hover:border-cyan-500/30 transition-all duration-500 group h-full flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors"></div>
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-cyan-400" /> Sincronização de Dados
            </h3>
            <div className="grid grid-cols-2 gap-8 relative z-10">
              <div className="space-y-3">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Recrutas</p>
                <h4 className="text-6xl font-black text-white tracking-tighter italic">{students.length}</h4>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Eficácia_Cluster</p>
                <h4 className="text-6xl font-black text-white tracking-tighter italic">{selectedClass?.progress || 0}<span className="text-cyan-500 text-3xl">%</span></h4>
              </div>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${selectedClass?.progress || 0}%` }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              />
            </div>
          </Card>
        </motion.div>

        {/* Card de Disciplinas */}
        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-slate-900/40 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] shadow-xl hover:border-amber-500/30 transition-all duration-500 group h-full">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-3 mb-6">
              <BookMarked className="w-6 h-6 text-amber-400" /> Nodos de Conhecimento
            </h3>
            <div className="flex flex-wrap gap-3">
              {selectedClass?.disciplines.map((d, i) => (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Badge className="bg-slate-950/60 text-slate-400 border border-white/10 px-5 py-2.5 font-mono text-xs uppercase tracking-widest rounded-xl hover:text-amber-400 hover:border-amber-500/40 transition-all group-hover:bg-slate-900 shadow-lg">
                    {d}
                  </Badge>
                </motion.div>
              ))}
              <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-5 py-2.5 font-mono text-xs uppercase tracking-widest rounded-xl cursor-pointer hover:bg-amber-500/20 transition-all">
                <Plus className="w-4 h-4 mr-2" /> Inject_Node
              </Badge>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Tabela de Estudantes - LISTA MODERNA */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <h2 className="text-3xl font-black text-white flex items-center gap-5 tracking-tighter uppercase italic">
            <div className="p-3 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 leading-none">
              <Users className="w-8 h-8 text-indigo-400" />
            </div>
            REGISTROS_DE_MATRÍCULA
          </h2>
          <div className="flex gap-4">
            <Button variant="outline" className="bg-slate-900 border-white/10 text-xs font-black uppercase tracking-widest h-12 px-6 rounded-xl hover:bg-white/5">
              <Filter className="w-4 h-4 mr-2" /> Filtrar_Logs
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-widest h-12 px-6 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.2)] italic">
              <Download className="w-4 h-4 mr-2" /> exportar_data
            </Button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4"
        >
          {students.map((student: any, i) => (
            <motion.div key={student.id} variants={itemVariants}>
              <Card className="p-6 bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-all duration-500 group relative overflow-hidden rounded-[2.5rem] shadow-lg backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
                  <div className="w-20 h-20 rounded-[1.8rem] bg-slate-950 flex items-center justify-center text-4xl border border-white/10 group-hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden shadow-inner">
                    <span className="relative z-10">{student.avatar || '👤'}</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent"></div>
                  </div>

                  <div className="flex-1 text-center lg:text-left min-w-0 space-y-2">
                    <h3 className="font-black text-white text-2xl tracking-tighter uppercase font-mono italic flex items-center justify-center lg:justify-start gap-4">
                      {student.name}
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent hidden lg:block"></div>
                    </h3>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-6 font-mono font-bold">
                      <span className="text-slate-500 text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-700" /> {student.email}
                      </span>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 h-6 px-4 tracking-[0.2em] font-black text-[9px] rounded-lg shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                        KEY_{student.accessCode}
                      </Badge>
                      <span className="text-[10px] text-slate-600 flex items-center gap-2 uppercase tracking-widest">
                        <Target className="w-4 h-4 text-slate-700" /> RANKING: LEVEL_{Math.floor(student.xp / 500) + 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pl-8 lg:border-l border-white/5">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Button variant="ghost" size="icon" className="h-12 w-12 text-slate-600 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all">
                        <Pencil className="w-5 h-5" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteStudent(student.id)} className="h-12 w-12 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          {students.length === 0 && (
            <Card className="p-20 bg-slate-900/40 border border-dashed border-white/10 rounded-[3rem] text-center space-y-4">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto opacity-30">
                <Users className="w-10 h-10 text-white" />
              </div>
              <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Nenhum recrutado detectado no core.</p>
              <Button onClick={() => setIsStudentModalOpen(true)} variant="outline" className="border-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-white rounded-xl uppercase font-black text-[10px] tracking-widest px-8">Injetar Estagiário_V1</Button>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Modals - ESTILIZADOS */}
      <Dialog open={isClassModalOpen} onOpenChange={setIsClassModalOpen}>
        <DialogContent className="bg-slate-900/95 border border-white/10 text-white sm:max-w-[500px] backdrop-blur-3xl rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <DialogHeader className="border-b border-white/5 pb-6 space-y-2">
            <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-4 leading-none">
              <div className="p-2.5 rounded-2xl bg-indigo-500/20 border border-indigo-500/30"><LayoutDashboard className="w-7 h-7 text-indigo-400" /></div> INICIALIZAR_NODE
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-[9px] uppercase font-black tracking-[0.4em] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div> Cluster_Deployment_Interface
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-8">
            <div className="space-y-2 font-mono">
              <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] ml-1">Identidade da Turma</label>
              <Input
                placeholder="Ex: CLUSTER_9A_ROBOTICA"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="bg-slate-950/50 border-white/10 h-14 uppercase rounded-2xl font-black text-white shadow-inner tracking-widest"
              />
            </div>
          </div>
          <DialogFooter className="bg-slate-950/80 -mx-6 -mb-6 p-8 border-t border-white/5 flex gap-4">
            <Button variant="ghost" onClick={() => setIsClassModalOpen(false)} className="text-slate-600 font-black text-[10px] uppercase tracking-widest">Abortar</Button>
            <Button onClick={handleCreateClass} className="bg-indigo-600 hover:bg-indigo-500 text-white font-black h-14 px-10 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(79,70,229,0.3)] italic flex-1">Start_Protocolo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isStudentModalOpen} onOpenChange={setIsStudentModalOpen}>
        <DialogContent className="bg-slate-900/95 border border-white/10 text-white sm:max-w-[500px] backdrop-blur-3xl rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
          <DialogHeader className="border-b border-white/5 pb-6 space-y-2">
            <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-4 leading-none">
              <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30"><UserPlus className="w-7 h-7 text-emerald-400" /></div> INJETAR_USUÁRIO
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-[9px] uppercase font-black tracking-[0.4em] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Registro_Integrity_Module
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-8 font-mono">
            <div className="space-y-2 font-mono">
              <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] ml-1">Identificação_Codename</label>
              <Input placeholder="NOME_COMPLETO_DO_ALUNO" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} className="bg-slate-950/50 border-white/10 h-14 uppercase rounded-2xl font-black text-white shadow-inner tracking-widest" />
            </div>
            <div className="space-y-2 font-mono">
              <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] ml-1">Protocolo_Email</label>
              <Input placeholder="ALUNO@CEITEC.EDU" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} className="bg-slate-950/50 border-white/10 h-14 rounded-2xl font-black text-white shadow-inner tracking-widest" />
            </div>
          </div>
          <DialogFooter className="bg-slate-950/80 -mx-6 -mb-6 p-8 border-t border-white/5 flex gap-4">
            <Button variant="ghost" onClick={() => setIsStudentModalOpen(false)} className="text-slate-600 font-black text-[10px] uppercase tracking-widest">Abortar</Button>
            <Button onClick={handleAddStudent} className="bg-emerald-600 hover:bg-emerald-500 text-white font-black h-14 px-10 rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(16,185,129,0.3)] italic flex-1">Confirmar_Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Outros Modals (Simplificados p/ consistência) */}
      <Dialog open={isDeleteClassModalOpen} onOpenChange={setIsDeleteClassModalOpen}>
        <DialogContent className="bg-slate-900 border border-red-900/40 text-white rounded-[2.5rem] shadow-2xl">
          <DialogHeader className="p-4">
            <DialogTitle className="text-red-500 flex items-center gap-4 font-black uppercase text-2xl tracking-tighter italic">
              <div className="p-2 bg-red-500/10 rounded-xl"><ShieldAlert className="w-8 h-8 animate-pulse" /></div> PURGE_NODE?
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-black text-[10px] uppercase mt-4 leading-relaxed tracking-[0.2em]">
              A deleção do nodo <strong className="text-white italic">{selectedClass?.name}</strong> removerá todas as dependências do core. Operação irreversível. Toda a data_link será perdida.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-8 flex gap-3">
            <Button variant="ghost" onClick={() => setIsDeleteClassModalOpen(false)} className="text-slate-600 uppercase font-black text-[10px] tracking-widest">Abortar_Purge</Button>
            <Button variant="destructive" onClick={handleDeleteClass} className="bg-red-600 hover:bg-red-500 text-white font-black h-12 px-8 rounded-xl text-[10px] uppercase italic tracking-[0.2em] shadow-lg shadow-red-900/40 border-none">Execute_Purge</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
