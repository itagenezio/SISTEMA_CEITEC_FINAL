import { Trophy, Star, Award, TrendingUp, Zap, ShieldCheck, Target, Activity as ActivityIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Progress as ProgressBar } from './ui/progress';
import { Badge } from './ui/badge';
import { Activity } from '../../types';
import { motion } from 'motion/react';

interface ProgressProps {
  onNavigate: (screen: string) => void;
  submissions: any[];
  activities: Activity[];
  currentUser: any;
}

export function Progress({ onNavigate, submissions, activities, currentUser }: ProgressProps) {
  const xp = currentUser?.xp || 0;
  const level = Math.floor(xp / 500) + 1;
  const maxXpForCurrentLevel = level * 500;
  const progressPercent = (xp / maxXpForCurrentLevel) * 100;

  const completedCount = submissions.filter(s => s.status === 'graded' || s.status === 'delivered').length;
  const gradedCount = submissions.filter(s => s.status === 'graded').length;

  const avgGrade = gradedCount > 0
    ? (submissions.filter(s => s.status === 'graded').reduce((acc, s) => acc + (s.grade || 0), 0) / gradedCount).toFixed(1)
    : '0.0';

  const badges = [
    { id: 1, name: 'Criador Maker', desc: 'Completou primeiro projeto', icon: '🎨', color: 'blue', earned: submissions.length > 0 },
    { id: 2, name: 'Lógica em Ação', desc: 'Dominou conceitos core', icon: '🧩', color: 'emerald', earned: xp > 1000 },
    { id: 3, name: 'Maker Criativa', desc: 'Projeto destacado', icon: '💡', color: 'amber', earned: gradedCount > 0 },
    { id: 4, name: 'Startup Criativa', desc: 'Plano de negócio ativo', icon: '🚀', color: 'purple', earned: xp > 2000 },
    { id: 5, name: 'Mestre IoT', desc: 'Especialista em conectividade', icon: '🌐', color: 'indigo', earned: false },
    { id: 6, name: 'Empreendedor Pro', desc: 'Trilha completa', icon: '💼', color: 'rose', earned: false }
  ];

  return (
    <div className="space-y-10 pb-10">

      {/* Header Contextual */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Relatório de Evolução de Hardware & Software</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tighter">MEU <span className="text-cyan-400">PROGRESSO</span></h1>
          <p className="text-slate-400 text-sm font-medium">Monitoramento em tempo real do seu desenvolvimento técnico.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Lado Esquerdo: Energy Core (XP) */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-8 bg-slate-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-3xl bg-slate-800 border border-white/10 flex items-center justify-center text-5xl font-black text-white shadow-2xl relative overflow-hidden group">
                <span className="relative z-10">XP</span>
                <div className="absolute inset-x-0 bottom-0 bg-cyan-500/20 h-1/2 animate-pulse" />
              </div>
              <Badge className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center text-xl font-black border-4 border-[#020617] shadow-lg">
                {level}
              </Badge>
            </div>

            <div className="space-y-2 mb-8">
              <h2 className="text-5xl font-black text-white tracking-tight">{xp.toLocaleString()} <span className="text-slate-600 text-2xl">/ {maxXpForCurrentLevel.toLocaleString()}</span></h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Módulo Ativo: {level >= 3 ? 'Explorador Sênior' : 'Iniciante Maker'}</p>
            </div>

            <div className="w-full max-w-xl space-y-3">
              <ProgressBar value={progressPercent} className="h-4 bg-slate-800 border border-white/5" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Faltam {(maxXpForCurrentLevel - xp).toLocaleString()} Unidades de XP para o Próximo Nível
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Missões', value: completedCount, icon: Target, color: 'indigo' },
              { label: 'Grade_Score', value: avgGrade, icon: Star, color: 'amber' },
              { label: 'Inovações', value: badges.filter(b => b.earned).length, icon: Trophy, color: 'emerald' },
              { label: 'Sync_Rate', value: `${((completedCount / (activities.length || 1)) * 100).toFixed(0)}%`, icon: TrendingUp, color: 'cyan' }
            ].map((stat, i) => (
              <Card key={i} className="p-4 bg-slate-900/40 border border-white/5 text-center space-y-2">
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center mx-auto`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <div>
                  <p className="text-xl font-black text-white tracking-tighter">{stat.value}</p>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-tighterLeading-none">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Lado Direito: Achievement Grid */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tighter">
            <Award className="w-5 h-5 text-emerald-400" /> Medalhas de Reconhecimento
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => (
              <Card
                key={badge.id}
                className={`p-4 border-white/5 relative overflow-hidden transition-all duration-500 ${badge.earned ? 'bg-slate-900/60 border-emerald-500/20' : 'bg-slate-950/40 grayscale opacity-40'}`}
              >
                <div className="text-center space-y-3">
                  <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl ${badge.earned ? `bg-${badge.color}-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]` : 'bg-slate-800'}`}>
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-tighter line-clamp-1">{badge.name}</h4>
                    <p className="text-[8px] text-slate-500 font-bold uppercase leading-tight mt-1">{badge.desc}</p>
                  </div>
                </div>
                {badge.earned && <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></div>}
              </Card>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}