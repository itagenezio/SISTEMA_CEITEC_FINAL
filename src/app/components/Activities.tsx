import { Circle, CheckCircle2, Clock, AlertCircle, Sparkles, Zap, ShieldCheck, Target, ExternalLink, ArrowLeft } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Activity } from '../../types';

interface ActivitiesProps {
  onNavigate: (screen: string, id?: string) => void;
  activities: Activity[];
  submissions: any[];
}

export function Activities({ onNavigate, activities, submissions }: ActivitiesProps) {
  const getRealStatus = (activityId: string) => {
    const sub = submissions.find(s => String(s.activityId || s.activity_id) === String(activityId));
    if (sub) return 'completed';
    return 'pending';
  };

  const getRealProgress = (activityId: string) => {
    const sub = submissions.find(s => String(s.activityId || s.activity_id) === String(activityId));
    if (sub) return 100;
    return 0;
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle2 className="w-4 h-4" />,
          label: 'Módulo Concluído',
          color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        };
      default:
        return {
          icon: <Circle className="w-4 h-4" />,
          label: 'Missão Disponível',
          color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
        };
    }
  };

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
              <Target className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocolo de Aprendizagem Ativo</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tighter">TRILHAS DE <span className="text-cyan-400">EVOLUÇÃO</span></h1>
            <p className="text-slate-400 text-sm">Acesse seus módulos de treinamento e complete os desafios para ganhar XP.</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge className="bg-slate-900 border-white/5 text-slate-400 px-4 h-10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
            {activities.length} MÓDULOS_SYNCED
          </Badge>
        </div>
      </div>

      {/* Grid de Missões */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-slate-900/20">
            <ShieldCheck className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-400">Nenhuma Transmissão Encontrada</h3>
            <p className="text-slate-600 text-sm">O servidor principal não possui missões ativas no momento.</p>
          </div>
        ) : (
          activities.map((activity, i) => {
            const status = getRealStatus(activity.id);
            const progress = getRealProgress(activity.id);
            const statusInfo = getStatusInfo(status);

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Card
                  onClick={() => status !== 'completed' && onNavigate('submit-activity', activity.id)}
                  className={`relative p-0 overflow-hidden bg-slate-900/40 border-white/5 backdrop-blur-md hover:border-cyan-500/40 transition-all duration-300 cursor-pointer h-full flex flex-col`}
                >
                  {/* Banner Card */}
                  <div className={`h-2 bg-gradient-to-r ${activity.color || 'from-cyan-600 to-blue-600'}`} />

                  <div className="p-6 flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                        {activity.icon || '🎯'}
                      </div>
                      <Badge className={`${statusInfo.color} border-none font-black text-[9px] uppercase tracking-tighter`}>
                        {statusInfo.label}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight leading-tight group-hover:text-cyan-400 transition-colors uppercase font-mono">
                        MISSION://{activity.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed font-medium">
                        {activity.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-cyan-400" />
                        {activity.points} XP
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {activity.deadline}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 border-t border-white/5 mt-auto">
                    {status === 'completed' ? (
                      <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase">
                        <CheckCircle2 className="w-4 h-4" /> Relatório de Missão Enviado
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        className="w-full text-[10px] font-black uppercase tracking-[0.2em] h-8 hover:bg-cyan-500/10 hover:text-cyan-400"
                      >
                        INICIAR PROTOCOLO <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Call to Action: Nova Resposta */}
      <Card
        className="p-6 bg-gradient-to-br from-indigo-900/30 to-slate-900 border border-indigo-500/20 hover:border-indigo-500/50 transition-all cursor-pointer group"
        onClick={() => {
          const firstPending = activities.find(a => getRealStatus(a.id) === 'pending');
          onNavigate('submit-activity', firstPending?.id || activities[0]?.id);
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Sparkles className="w-7 h-7 text-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-widest uppercase">Envio Global de Atividades</h3>
              <p className="text-sm text-slate-400 font-medium">Possui um arquivo externo para submissão? Inicie o upload manual aqui.</p>
            </div>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-black h-12 px-8 rounded-xl tracking-widest text-xs">UPLOAD_SYNCCORE</Button>
        </div>
      </Card>

    </div>
  );
}
