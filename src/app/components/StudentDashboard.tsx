import { Trophy, Star, Award, TrendingUp, BookOpen, Code, Lightbulb, Bell, Zap, Rocket, ShieldCheck, Target, ChevronRight, Activity as ActivityIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

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
    <div className="space-y-12 pb-10 relative">
      {/* Background Glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute top-40 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>

      {/* Hero: Status do Agente - VIBRANTE */}
      <div className="relative">
        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center">
          {/* Avatar Holográfico com Efeito de Varredura */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-[2rem] blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-slate-950 rounded-[2rem] border border-white/10 flex items-center justify-center text-6xl md:text-7xl shadow-2xl overflow-hidden group-hover:border-cyan-500/50 transition-colors">
              <span className="relative z-10 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{currentUser?.avatar || '👤'}</span>

              {/* Scanline Animation */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(6,182,212,0.15)_50%,transparent_100%)] bg-[length:100%_8px] animate-[scan_3s_linear_infinite] pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent"></div>
            </div>
            <Badge className="absolute -bottom-3 -right-3 bg-cyan-600 text-white border-[4px] border-[#020617] px-4 py-1 font-black text-sm shadow-xl shadow-cyan-900/40">LVL {level}</Badge>
          </motion.div>

          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-1"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                    <span className="text-xs font-black text-cyan-400 tracking-[0.4em] uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">SISTEMA_OPERACIONAL: ONLINE</span>
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/40 via-blue-500/20 to-transparent"></div>
                </div>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none italic">
                BEM-VINDO, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 uppercase drop-shadow-sm">{studentName}</span>
              </h1>
            </div>

            <Card className="p-8 bg-slate-900/40 border border-white/5 backdrop-blur-3xl relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 rounded-[2rem] shadow-2xl">
              <div className="flex justify-between items-end mb-4">
                <div className="space-y-1">
                  <p className="text-xs font-black text-slate-300 uppercase tracking-[0.3em]">PROGRESSO GLOBAL_SYNC</p>
                  <p className="text-5xl font-black text-white tracking-tighter italic">
                    {xp.toLocaleString()} <span className="text-slate-400 text-2xl font-normal not-italic">/{maxXp.toLocaleString()} XP</span>
                  </p>
                </div>
                <div className="text-right hidden sm:block">
                  <Badge variant="outline" className="border-cyan-500/40 text-cyan-400 bg-cyan-500/10 font-mono text-xs uppercase tracking-widest px-4 py-1">Sync_Próximo_Nível</Badge>
                  <p className="text-xl font-black text-blue-300 tracking-tighter uppercase mt-2">MAKER_PRO_V1</p>
                </div>
              </div>

              <div className="relative h-4 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5 p-1 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 via-blue-500 to-indigo-600 shadow-[0_0_20px_rgba(6,182,212,0.6)] rounded-full"
                >
                  <div className="h-full w-full bg-[length:30px_30px] bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] animate-[move-stripe_2s_linear_infinite]"></div>
                </motion.div>
              </div>

              {/* Conquistas Rápidas */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex gap-2 p-2 bg-slate-950/50 rounded-xl border border-white/5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <motion.div
                      key={s}
                      animate={s <= level ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: s * 0.2 }}
                    >
                      <Star className={`w-5 h-5 ${s <= level ? 'text-cyan-500 fill-cyan-500 drop-shadow-[0_0_8px_#06b6d4]' : 'text-slate-800'}`} />
                    </motion.div>
                  ))}
                </div>
                <div className="h-4 w-px bg-white/10 mx-2"></div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 border-2 border-[#020617] flex items-center justify-center text-xs">🥇</div>
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border-2 border-[#020617] flex items-center justify-center text-xs">🥈</div>
                  <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-[10px] font-black text-slate-500">+3</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* Lado Esquerdo: Centro de Operações de Missão */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-3xl font-black text-white flex items-center gap-4 tracking-tighter italic uppercase">
              <Rocket className="w-8 h-8 text-indigo-500 animate-bounce" /> LOG DE MISSÕES <span className="text-indigo-500">ATIVAS</span>
            </h2>
            <Button
              variant="ghost"
              onClick={() => onNavigate('activities')}
              className="text-xs font-black text-cyan-400 hover:text-white uppercase tracking-[0.3em] flex items-center gap-3 group/btn px-4 py-2 bg-white/5 rounded-xl border border-white/5 hover:bg-cyan-500/10 transition-all"
            >
              Ver Todas <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid gap-6">
            {/* Missão Destaque Modernizada */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative"
              onClick={() => onNavigate('activities')}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <Card className="relative p-6 bg-slate-900/60 border border-white/5 backdrop-blur-xl group-hover:border-indigo-500/50 transition-all cursor-pointer rounded-[2rem] overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-[1.5rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.3)] group-hover:rotate-6 transition-all duration-700">
                    <Code className="w-12 h-12 text-white drop-shadow-md" />
                  </div>
                  <div className="flex-1 space-y-3 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                      <Badge className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 text-xs font-black px-4 py-1 uppercase tracking-widest">CRITICAL_OBJ</Badge>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black px-4 py-1 uppercase tracking-widest">+1.2k XP_REWARD</Badge>
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors uppercase italic font-mono">Projeto PictoBlox: <br className="sm:hidden" /> Machine Learning</h3>
                    <p className="text-base text-slate-300 font-medium italic">"Desenvolva algoritmos de visão computacional em tempo real."</p>
                    <div className="pt-2 flex items-center justify-center sm:justify-start gap-4">
                      <div className="flex -space-x-1">
                        {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[8px]">👤</div>)}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">12 OUTROS AGENTES EM CAMPO</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all">
                    <TrendingUp className="w-8 h-8 text-indigo-500" />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Missão 2 - Compacta e Elegante */}
            <motion.div
              whileHover={{ x: 5 }}
              className="group h-full"
              onClick={() => onNavigate('activities')}
            >
              <Card className="p-6 bg-slate-900/40 border border-white/5 backdrop-blur-md hover:border-amber-500/40 transition-all cursor-pointer rounded-3xl flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                  <Lightbulb className="w-10 h-10 text-amber-500 relative z-10" />
                  <div className="absolute inset-0 bg-amber-500/10 animate-pulse"></div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500/10 text-amber-500 border-none text-[8px] font-black h-4 px-2 uppercase tracking-tighter italic">Creative_Branch</Badge>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[8px] font-black h-4 px-2 uppercase tracking-tighter italic">+450 XP</Badge>
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight group-hover:text-amber-500 transition-colors uppercase italic font-mono leading-tight">Desafio Empreendedor: <br /> Pitch Deck V1</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-3 bg-slate-950 rounded-full border border-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "35%" }}
                        className="h-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.7)]"
                      />
                    </div>
                    <span className="text-xs text-amber-500 font-black uppercase tracking-tighter">PROTOCOLO: 35%</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Lado Direito: Radar & Transmissões Modernizado */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="text-2xl font-black text-white flex items-center gap-4 tracking-tighter uppercase italic">
              <Bell className="w-7 h-7 text-cyan-500 fill-cyan-500/20" /> RADAR_SYNC
            </h2>
            <Badge className="bg-cyan-500 text-black font-black text-[9px] px-2 rounded-lg animate-pulse shadow-[0_0_10px_#06b6d4]">LIVE</Badge>
          </div>

          <div className="space-y-4">
            {[
              { title: 'UPDATE_PRAZO', msg: 'A Missão PictoBlox teve seu clock estendido em 48h.', time: 'S-79', color: 'cyan', icon: '📢' },
              { title: 'DADOS_VALIDADOS', msg: 'Seu último projeto atingiu rank S no cluster regional.', time: 'S-124', color: 'purple', icon: '💎' }
            ].map((aviso, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                <Card className={`p-5 bg-slate-900/60 border border-${aviso.color}-500/20 hover:border-${aviso.color}-400 group/radar backdrop-blur-2xl transition-all cursor-pointer rounded-2xl relative overflow-hidden`}>
                  <div className="flex gap-5 relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center text-2xl group-hover/radar:scale-110 transition-transform`}>
                      {aviso.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-black text-white truncate uppercase tracking-[0.2em] italic">{aviso.title}</h4>
                        <span className="text-[9px] font-black text-slate-500 font-mono italic">{aviso.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-normal mt-1 font-medium">{aviso.msg}</p>
                    </div>
                  </div>
                  <div className={`absolute bottom-0 left-0 h-1 w-0 bg-${aviso.color}-500 group-hover/radar:w-full transition-all duration-700`}></div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Banner de Reconhecimento de Elite */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card className="p-8 bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 border-none shadow-[0_0_40px_rgba(6,182,212,0.3)] relative overflow-hidden rounded-[2.5rem]">
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl">
                  <Award className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-xl tracking-tighter italic leading-none">MESTRE DO <br /> CIRCUITO_V3</h4>
                  <p className="text-cyan-100 text-[10px] font-black uppercase tracking-widest mt-2 opacity-70">Desbloqueio: Ciclo_B5 // 05_02_26</p>
                </div>
                <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white font-black text-[9px] uppercase tracking-[0.3em] h-10 rounded-xl hover:bg-white/20 transition-all">Ver Detalhes do Rank</Button>
              </div>
              {/* Visual Glitch Decorator */}
              <div className="absolute top-[10%] right-[10%] w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-900/30 rounded-full blur-2xl"></div>
              <ActivityIcon className="absolute bottom-4 right-4 w-20 h-20 text-white/5 -rotate-12" />
            </Card>
          </motion.div>
        </div>

      </div>

    </div>
  );
}