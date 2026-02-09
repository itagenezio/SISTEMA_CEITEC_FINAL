import { Circle, CheckCircle2, Clock, AlertCircle, Sparkles, Zap, ShieldCheck, Target, ExternalLink, ArrowLeft, Trophy, Flame } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
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
          color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
        };
      default:
        return {
          icon: <Circle className="w-4 h-4" />,
          label: 'Missão Disponível',
          color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-12 pb-20 relative px-2">
      {/* Elementos de Fundo Decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      {/* Header Contextual Futurista */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-8">
        <div className="flex flex-col md:flex-row items-center gap-8 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={() => onNavigate('student-dashboard')}
              className="bg-slate-900/60 border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 rounded-[2rem] w-16 h-16 p-0 shadow-2xl backdrop-blur-xl transition-all duration-300"
            >
              <ArrowLeft className="w-7 h-7" />
            </Button>
          </motion.div>

          <div className="space-y-2 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center md:justify-start gap-3"
            >
              <div className="h-0.5 w-6 bg-cyan-500"></div>
              <span className="text-xs font-black text-cyan-400 uppercase tracking-[0.4em] drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">Sincronização de Progresso Ativa</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none italic uppercase font-mono">
              HUB DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 animate-gradient-x">MISSÕES</span>
            </h1>
            <p className="text-slate-300 text-base font-bold max-w-md tracking-tight italic leading-relaxed">
              Evolua seu DNA Maker completando protocolos de treinamento em tempo real.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <Card className="px-6 h-14 bg-slate-900/80 border-white/10 backdrop-blur-2xl flex items-center justify-between gap-4 flex-1 md:flex-initial rounded-2xl group hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#06b6d4]"></div>
              <span className="text-xs font-black text-white tracking-widest uppercase">{activities.length} <span className="text-slate-500">CONEXÕES</span></span>
            </div>
            <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
            <Flame className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
          </Card>
        </div>
      </div>

      {/* Grade de Missões Vibrante */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {activities.length === 0 ? (
          <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-slate-900/40 backdrop-blur-xl">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <ShieldCheck className="w-20 h-20 text-slate-800 mx-auto mb-6" />
            </motion.div>
            <h3 className="text-2xl font-black text-slate-400 uppercase tracking-tighter">Frequência Silenciosa</h3>
            <p className="text-slate-600 text-sm mt-2 max-w-xs mx-auto uppercase font-bold tracking-widest">Aguardando transmissão de novas missões pelo servidor mestre.</p>
          </div>
        ) : (
          activities.map((activity, i) => {
            const status = getRealStatus(activity.id);
            const statusInfo = getStatusInfo(status);
            const isCompleted = status === 'completed';

            return (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group h-full"
              >
                <Card
                  onClick={() => !isCompleted && onNavigate('submit-activity', activity.id)}
                  className={`relative p-0 overflow-hidden bg-slate-900/40 border border-white/5 backdrop-blur-2xl hover:border-cyan-500/50 shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col group/card rounded-[2.5rem]`}
                >
                  {/* Neon Glow Effect na borda do topo */}
                  <div className={`h-[3px] w-full bg-gradient-to-r ${activity.color || 'from-cyan-400 to-blue-600'} opacity-30 group-hover/card:opacity-100 transition-opacity`} />

                  {/* Luz de Fundo Dinâmica */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[80px] transition-opacity duration-700 opacity-20 group-hover/card:opacity-40 bg-gradient-to-br ${activity.color || 'from-cyan-500 to-blue-600'}`}></div>

                  <div className="p-8 flex-1 space-y-6 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className={`w-16 h-16 rounded-[1.2rem] bg-slate-950/80 border border-white/10 flex items-center justify-center text-4xl shadow-inner group-hover/card:scale-110 group-hover/card:border-cyan-500/40 transition-all duration-500 relative`}>
                        <span className="relative z-10">{activity.icon || '🎯'}</span>
                        <div className="absolute inset-0 bg-white/5 rounded-[1.2rem] animate-pulse"></div>
                      </div>
                      <Badge className={`px-5 py-2 rounded-full ${statusInfo.color} border-2 font-black text-xs uppercase tracking-widest`}>
                        {statusInfo.label}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-1 bg-cyan-500 rounded-full"></div>
                        <h3 className="text-xl font-black text-white tracking-tight leading-none group-hover/card:text-cyan-400 transition-colors uppercase font-mono">
                          {activity.title}
                        </h3>
                      </div>
                      <p className="text-base text-slate-300 font-bold leading-relaxed line-clamp-2 italic">
                        "{activity.description}"
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-[0.2em] pt-2">
                      <div className="flex items-center gap-3 px-4 py-2 bg-slate-950/60 rounded-xl border border-white/10 text-cyan-400 shadow-inner">
                        <Zap className="w-4 h-4 fill-cyan-400/20" />
                        {activity.points} XP_PWR
                      </div>
                      <div className="flex items-center gap-3 px-4 py-2 bg-slate-950/60 rounded-xl border border-white/10 text-slate-200">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {activity.deadline}
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 mt-auto transition-all duration-500 ${isCompleted ? 'bg-emerald-500/10' : 'bg-white/5 group-hover/card:bg-cyan-500/10'}`}>
                    {isCompleted ? (
                      <div className="flex items-center justify-center gap-3 text-xs font-black text-emerald-400 uppercase tracking-widest">
                        <Trophy className="w-5 h-5 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Sincronismo Finalizado
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        className="w-full text-sm font-black uppercase tracking-[0.3em] h-14 hover:bg-transparent text-slate-300 group-hover/card:text-cyan-400 flex items-center justify-center gap-6"
                      >
                        INICIAR CONEXÃO <div className="p-3 rounded-xl bg-cyan-500/20"><ExternalLink className="w-5 h-5" /></div>
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })
        )}
      </motion.div>

      {/* Call to Action: Upload Global Upgradeado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <Card
          className="p-8 rounded-[3rem] bg-gradient-to-br from-indigo-900/60 via-slate-950 to-slate-900 border border-indigo-500/30 hover:border-indigo-500/60 transition-all cursor-pointer group/cta relative overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.1)]"
          onClick={() => {
            const firstPending = activities.find(a => getRealStatus(a.id) === 'pending');
            onNavigate('submit-activity', firstPending?.id || activities[0]?.id);
          }}
        >
          {/* Decoração Visual CTA */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] group-hover/cta:bg-indigo-500/20 transition-all"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-20 h-20 rounded-[2rem] bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center group-hover/cta:rotate-[15deg] transition-transform duration-500 shadow-2xl">
                <Sparkles className="w-10 h-10 text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.8)]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-white tracking-widest uppercase italic">ENVIO GLOBAL_DATA</h3>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Possui protocolos externos? Sincronize com o Core Central agora.</p>
              </div>
            </div>
            <Button className="w-full lg:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-black h-16 px-12 rounded-2xl tracking-[0.3em] text-sm shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all uppercase italic">
              UPLOAD://SYNC_CORE
            </Button>
          </div>
        </Card>
      </motion.div>

    </div>
  );
}
