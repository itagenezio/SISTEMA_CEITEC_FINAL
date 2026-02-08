import { Trophy, Star, ExternalLink, ShieldCheck, Target, BarChart3, Database, Award, ArrowLeft, Trash2, Pencil } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Activity } from '../../types';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface PortfolioProps {
  onNavigate: (screen: string) => void;
  submissions: any[];
  activities: Activity[];
  onDeleteSubmission?: (id: string) => Promise<boolean>;
}

export function Portfolio({ onNavigate, submissions, activities, onDeleteSubmission }: PortfolioProps) {
  const projects = submissions.map(sub => {
    const activity = activities.find(a => String(a.id) === String(sub.activityId || sub.activity_id));
    return {
      id: sub.id,
      title: activity?.title || 'Unidades de Teste',
      description: sub.comments || 'Sem log de comentários disponível.',
      date: sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR'),
      grade: sub.grade,
      status: sub.status === 'graded' ? 'approved' : 'pending',
      image: activity?.icon || '📝',
      color: activity?.color || 'from-blue-400 to-cyan-500',
      tags: activity?.discipline ? [activity.discipline.toUpperCase()] : ['GERAL']
    };
  });

  const avgGrade = submissions.length > 0
    ? (submissions.reduce((acc, sub) => acc + (sub.grade || 0), 0) / submissions.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-8 pb-10">

      {/* Header Contextual */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            onClick={() => onNavigate('student-dashboard')}
            className="bg-slate-800/50 border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 rounded-2xl w-14 h-14 p-0 shadow-lg shrink-0"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Base de Dados de Conquistas Acadêmicas</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tighter">MEU <span className="text-emerald-400">PORTFÓLIO</span></h1>
            <p className="text-slate-400 text-sm font-medium">Histórico completo de implementações, notas e feedbacks do sistema.</p>
          </div>
        </div>
      </div>

      {/* Monitor de Performance (Estatísticas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Projetos Sincronizados', value: projects.length, icon: ShieldCheck, color: 'blue' },
          { label: 'Média de Desempenho', value: avgGrade, icon: BarChart3, color: 'emerald' },
          { label: 'Certificações Core', value: projects.filter(p => p.grade && p.grade >= 9).length, icon: Award, color: 'amber' }
        ].map((stat, i) => (
          <Card key={i} className="p-6 bg-slate-900/40 border border-white/5 backdrop-blur-md relative overflow-hidden group">
            <div className="flex items-center gap-4 relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}>
                <stat.icon className={`w-7 h-7 text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-4xl font-black text-white tracking-tighter leading-none">{stat.value}</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Lista de Registros */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tighter">
          <Target className="w-5 h-5 text-indigo-400" /> Histórico de Deployments
        </h2>

        {projects.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-slate-900/20">
            <p className="text-slate-500 font-bold uppercase text-xs">Nenhum registro de atividade encontrado no seu histórico.</p>
            <Button
              onClick={() => onNavigate('activities')}
              className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 rounded-xl h-12 text-xs"
            >
              INICIAR PRIMEIRA MISSÃO
            </Button>
          </div>
        ) : (
          projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-5 bg-slate-900/60 border border-white/5 hover:border-emerald-500/30 transition-all group overflow-hidden relative">
                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-3xl shadow-lg shadow-black/40 border border-white/10 group-hover:scale-105 transition-transform`}>
                    {project.image}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} className="bg-white/5 text-slate-500 border-none font-black text-[8px] tracking-[0.2em] px-2 h-4">
                          {tag}
                        </Badge>
                      ))}
                      <Badge className={`border-none font-black text-[8px] tracking-[0.2em] px-2 h-4 ${project.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {project.status === 'approved' ? 'STATUS_SYNCED' : 'STATUS_PENDING'}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tighter uppercase font-mono">{project.title}</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">{project.description}</p>
                  </div>

                  {project.grade && (
                    <div className="px-6 border-l border-white/5 text-center">
                      <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Grade_Score</p>
                      <div className="text-3xl font-black text-emerald-400 tracking-tighter">{project.grade}</div>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row items-center gap-4 pr-2">
                    <p className="text-[10px] font-mono text-slate-600 self-end md:self-center">{project.date}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toast.info('Edição bloqueada pelo administrador.')}
                        className="h-9 w-9 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={async () => {
                          if (window.confirm('Excluir este registro permanentemente?')) {
                            if (onDeleteSubmission) {
                              const success = await onDeleteSubmission(project.id);
                              if (success) toast.success('Registro removido.');
                            }
                          }
                        }}
                        className="h-9 w-9 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-9 text-[10px] font-black tracking-widest text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300">
                        FOLDER <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

    </div>
  );
}
