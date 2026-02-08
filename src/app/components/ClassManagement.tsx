import { useState } from 'react';
import { ArrowLeft, Users, UserPlus, Mail, TrendingUp, BookOpen, Plus, Trash2, Key, Download, Pencil, ShieldAlert, GraduationCap, Clock, BookMarked, Filter, LayoutDashboard } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
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

  const [newClassName, setNewClassName] = useState('');
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>(['Inovação']);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    schedule: '',
    discipline: selectedClass?.disciplines[0] || 'Inovação'
  });

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
    <div className="space-y-8 pb-10">
      {/* Header Estilo HUD */}
      <div className="flex flex-col lg:flex-row items-center gap-6 bg-slate-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
        <Button
          variant="outline"
          onClick={() => onNavigate('teacher-dashboard')}
          className="bg-slate-800/50 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl w-14 h-14 p-0 shadow-lg"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        <div className="flex-1 text-center lg:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <h1 className="text-3xl font-black text-white tracking-widest uppercase font-mono">CORE_{selectedClass?.name || 'SELECTOR'}</h1>
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/5 px-4 h-6 font-mono text-[10px]">
              ID_{selectedClass?.id || 'NULL'}
            </Badge>
          </div>
          <p className="text-slate-500 text-[10px] font-black mt-2 uppercase tracking-widest flex items-center justify-center lg:justify-start gap-2">
            <ShieldAlert className="w-3 h-3 text-cyan-500" /> Painel de Controle Acadêmico
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => toast.info('Interface de edição emcriptada.')}
            className="w-12 h-12 bg-white/5 border border-white/5 hover:border-cyan-500/40 hover:text-cyan-400 transition-all rounded-xl p-0"
          >
            <Pencil className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => setIsDeleteClassModalOpen(true)}
            className="w-12 h-12 bg-white/5 border border-white/5 hover:border-red-500/40 hover:text-red-400 transition-all rounded-xl p-0"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Dashboard de Monitoramento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-slate-900/40 border border-white/5 backdrop-blur-md space-y-5">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-emerald-400" /> Matrícula & Ingresso
          </h3>
          <div className="space-y-3">
            <Button
              onClick={() => setIsStudentModalOpen(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 h-12 rounded-xl text-[10px] font-black tracking-widest uppercase"
            >
              <Plus className="w-4 h-4 mr-2" /> Matricular Aluno
            </Button>
            <Button
              variant="ghost"
              onClick={() => toast.info('Selecione o arquivo CSV.')}
              className="w-full bg-white/5 border border-white/5 hover:bg-white/10 h-12 rounded-xl text-[10px] font-black tracking-widest uppercase text-slate-300"
            >
              <Download className="w-4 h-4 mr-2" /> Importar CSV
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-slate-900/40 border border-white/5 backdrop-blur-md space-y-6">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" /> Métricas Atuais
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Matriculados</p>
              <h4 className="text-3xl font-black text-white tracking-tighter">{students.length}</h4>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Progresso Médio</p>
              <h4 className="text-3xl font-black text-white tracking-tighter">{selectedClass?.progress || 0}%</h4>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-slate-900/40 border border-white/5 backdrop-blur-md">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
            <BookMarked className="w-4 h-4 text-amber-400" /> Disciplinas Ativas
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedClass?.disciplines.map(d => (
              <Badge key={d} className="bg-slate-800 text-slate-300 border border-white/5 px-3 py-1 font-mono text-[9px] uppercase">
                {d}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Tabela de Estudantes */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-3 uppercase tracking-tighter">
          <LayoutDashboard className="w-5 h-5 text-indigo-400" /> Registros de Matrícula
        </h2>
        <div className="grid gap-3">
          {students.map((student: any) => (
            <Card key={student.id} className="p-4 bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 transition-all group">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl border border-white/5">
                  {student.avatar || '👤'}
                </div>
                <div className="flex-1 text-center lg:text-left min-w-0">
                  <h3 className="font-bold text-white text-lg tracking-tight uppercase font-mono">{student.name}</h3>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-1 font-mono text-[10px]">
                    <span className="text-slate-500 flex items-center gap-1"><Mail className="w-3 h-3" /> {student.email}</span>
                    <Badge className="bg-cyan-500/10 text-cyan-400 border-none h-4 px-2 tracking-tighter">ACCESS_{student.accessCode}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-6 lg:border-l border-white/5">
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteStudent(student.id)} className="h-10 w-10 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      <Dialog open={isClassModalOpen} onOpenChange={setIsClassModalOpen}>
        <DialogContent className="bg-slate-900 border border-white/10 text-white sm:max-w-[500px]">
          <DialogHeader className="border-b border-white/5 pb-4">
            <DialogTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-indigo-400" /> Inicializar Turma
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-6">
            <div className="space-y-1.5 font-mono">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Identidade da Turma</label>
              <Input placeholder="Ex: 9A_ROBOTICA" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} className="bg-slate-800 border-white/5 h-12 uppercase" />
            </div>
          </div>
          <DialogFooter className="bg-slate-950/50 -mx-6 -mb-6 p-6 border-t border-white/5">
            <Button variant="ghost" onClick={() => setIsClassModalOpen(false)}>CANCEL</Button>
            <Button onClick={handleCreateClass} className="bg-indigo-600 hover:bg-indigo-500 h-11 px-8 rounded-xl font-bold">START_TURMA</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isStudentModalOpen} onOpenChange={setIsStudentModalOpen}>
        <DialogContent className="bg-slate-900 border border-white/10 text-white sm:max-w-[500px]">
          <DialogHeader className="border-b border-white/5 pb-4">
            <DialogTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-emerald-400" /> Injetar Novo Usuário
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-6 font-mono font-bold">
            <Input placeholder="NOME_COMPLETO" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} className="bg-slate-800 border-white/5 h-12" />
            <Input placeholder="EMAIL_PROTOCOL" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} className="bg-slate-800 border-white/5 h-12" />
          </div>
          <DialogFooter className="bg-slate-950/50 -mx-6 -mb-6 p-6 border-t border-white/5">
            <Button variant="ghost" onClick={() => setIsStudentModalOpen(false)}>CANCEL</Button>
            <Button onClick={handleAddStudent} className="bg-emerald-600 hover:bg-emerald-500 h-11 px-8 rounded-xl font-bold">CONFIRM_LINK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteClassModalOpen} onOpenChange={setIsDeleteClassModalOpen}>
        <DialogContent className="bg-slate-900 border border-red-900/40 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-500 flex items-center gap-2 font-black uppercase text-lg tracking-widest">
              <ShieldAlert className="w-6 h-6 animate-pulse" /> Purge Turma?
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-bold text-[10px] uppercase mt-2 leading-tight">
              A deleção de <strong>{selectedClass?.name}</strong> removerá todas as dependências do core. Operação irreversível.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button variant="ghost" onClick={() => setIsDeleteClassModalOpen(false)}>CANCEL</Button>
            <Button variant="destructive" onClick={handleDeleteClass} className="bg-red-900/80 hover:bg-red-800 border-red-600/30">EXECUTE_PURGE</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
