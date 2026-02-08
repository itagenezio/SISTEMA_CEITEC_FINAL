import { Trophy, Star, Award, TrendingUp, BookOpen, Code, Lightbulb, Bell, Zap, Rocket, ShieldCheck, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

interface StudentDashboardProps {
  onNavigate: (screen: string) => void;
  currentUser: any;
}

export function StudentDashboard({ onNavigate, currentUser }: StudentDashboardProps) {
  const studentName = currentUser?.name || "Recruta";
  const xp = currentUser?.xp || 0;
  const maxXp = 2000;
  const level = Math.floor(xp / 500) + 1;
  const progressPercent = (xp / maxXp) * 100;

  return (
    <div className="space-y-10 pb-10">

      {/* Hero: Status do Agente */}
      <div className="relative">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Avatar Holográfico */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-24 h-24 md:w-32 md:h-32 bg-slate-900 rounded-2xl border border-white/10 flex items-center justify-center text-5xl md:text-6xl shadow-2xl overflow-hidden">
              <span className="relative z-10">{currentUser?.avatar || '👤'}</span>
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(6,182,212,0.1)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan"></div>
            </div>
            <Badge className="absolute -bottom-2 -right-2 bg-cyan-600 text-white border-2 border-[#020617] px-3 font-black">LVL {level}</Badge>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-black text-cyan-400 tracking-[0.2em] uppercase">Status do Agente: On-Line</span>
                <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                PRONTO PARA A MISSÃO, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase">{studentName}</span>!
              </h1>
            </div>

            <Card className="p-6 bg-slate-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group">
              <div className="flex justify-between items-end mb-3">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">XP de Evolução Atual</p>
                  <p className="text-2xl font-black text-white tracking-tighter">{xp.toLocaleString()} <span className="text-slate-600 text-lg">/ {maxXp.toLocaleString()}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Próximo Nível</p>
                  <p className="text-sm font-black text-blue-400">MAKER_PRO_V1</p>
                </div>
              </div>
              <div className="relative h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                />
              </div>
              {/* Estrelas de Conquista */}
              <div className="mt-4 flex gap-1.5">
                {[1, 2, 3, 4].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= level ? 'text-cyan-400 fill-cyan-400' : 'text-slate-800'}`} />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Lado Esquerdo: Quests e Atividades */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center gap-3 tracking-tight">
              <Rocket className="w-5 h-5 text-purple-500" /> LOG DE MISSÕES ATIVAS
            </h2>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Atualizado: Just Now</span>
          </div>

          <div className="grid gap-4">
            {/* Missão 1 - Destaque */}
            <Card
              className="p-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-transparent border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group"
              onClick={() => onNavigate('activities')}
            >
              <div className="bg-slate-950/80 p-5 rounded-lg flex items-center gap-5">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.3)] group-hover:scale-105 transition-transform duration-500">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-purple-500/10 text-purple-400 border-none text-[9px] font-black h-4 px-1.5 uppercase tracking-tighter">Mission_Critical</Badge>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[9px] font-black h-4 px-1.5 uppercase tracking-tighter">+500 XP</Badge>
                  </div>
                  <h3 className="text-lg font-black text-white tracking-tight group-hover:text-purple-400 transition-colors">Projeto PictoBlox: Inteligência Artificial</h3>
                  <p className="text-sm text-slate-400">Implemente os blocos de reconhecimento facial no seu robô.</p>
                </div>
                <TrendingUp className="w-6 h-6 text-emerald-500 hidden sm:block opacity-30" />
              </div>
            </Card>

            {/* Missão 2 */}
            <Card
              className="p-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-transparent border-white/5 hover:border-amber-500/30 transition-all cursor-pointer group"
              onClick={() => onNavigate('activities')}
            >
              <div className="bg-slate-950/80 p-5 rounded-lg flex items-center gap-5">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)] group-hover:scale-105 transition-transform duration-500">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-amber-500/10 text-amber-400 border-none text-[9px] font-black h-4 px-1.5 uppercase tracking-tighter">Creative_Sync</Badge>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[9px] font-black h-4 px-1.5 uppercase tracking-tighter">+250 XP</Badge>
                  </div>
                  <h3 className="text-lg font-black text-white tracking-tight group-hover:text-amber-400 transition-colors">Desafio Empreendedor: Pitch Deck</h3>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1.5 w-32 bg-slate-900 rounded-full border border-white/5 overflow-hidden">
                      <div className="h-full bg-amber-500 w-1/3 shadow-[0_0_8px_#f59e0b]"></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">35% Completo</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Lado Direito: Radar & Notificações */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-xl font-black text-white flex items-center gap-3 tracking-tight uppercase">
            <Bell className="w-5 h-5 text-cyan-400" /> Transmissões
          </h2>

          <div className="space-y-3">
            {[
              { title: 'Novo prazo para entrega', msg: 'O prazo do Projeto PictoBlox foi estendido.', time: '2h', color: 'cyan', icon: '📢' },
              { title: 'Excelente Trabalho!', msg: 'Seu projeto foi destaque no ranking semanal.', time: 'Ontem', color: 'purple', icon: '🎉' }
            ].map((aviso, i) => (
              <Card key={i} className={`p-4 bg-slate-900/40 border border-${aviso.color}-500/10 hover:border-${aviso.color}-500/30 backdrop-blur-md transition-all`}>
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-${aviso.color}-500/10 border border-${aviso.color}-500/20 flex items-center justify-center text-xl`}>
                    {aviso.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="text-sm font-bold text-white truncate uppercase tracking-tighter">{aviso.title}</h4>
                      <span className="text-[9px] font-black text-slate-500">{aviso.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-tight">{aviso.msg}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Cards de Conquista */}
          <Card className="p-6 bg-gradient-to-br from-cyan-600 to-blue-700 border-none shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex items-center gap-4">
              <Award className="w-10 h-10 text-white/50 group-hover:scale-110 transition-transform duration-500" />
              <div>
                <h4 className="text-white font-black uppercase text-sm leading-tight">Mestre do Circuito</h4>
                <p className="text-cyan-100 text-[10px] font-medium">Recompensa desbloqueada em 05/02</p>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
          </Card>
        </div>

      </div>

    </div>
  );
}