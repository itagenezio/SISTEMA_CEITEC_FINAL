import { Trophy, Star, Award, TrendingUp, BookOpen, Code, Lightbulb, Bell } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface StudentDashboardProps {
  onNavigate: (screen: string) => void;
}

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const studentName = "Pedro";
  const xp = 1450;
  const maxXp = 2000;
  const level = 3;
  const badges = ['Criador Maker', 'Lógica em Ação', 'Maker Criativa', 'Startup Criativa'];

  return (
    <div className="min-h-screen p-6" 
         style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)' }}>
      
      {/* Header com saudação */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Olá, {studentName}! ⭐
            </h1>
            <p className="text-blue-200">Seu Progresso:</p>
          </div>
          <button 
            onClick={() => onNavigate('progress')}
            className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <span className="text-2xl">👤</span>
          </button>
        </div>

        {/* Card de XP e Nível */}
        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">XP</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{xp.toLocaleString()} / {maxXp.toLocaleString()}</p>
                  <p className="text-sm text-blue-200">Nível {level} • Criador Maker</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
          <Progress value={(xp / maxXp) * 100} className="h-3 bg-blue-900/50" />
        </Card>
      </div>

      {/* Próxima Atividade */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Próxima Atividade:</h2>
        <Card 
          className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform"
          onClick={() => onNavigate('activities')}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">Projeto PictoBlox</h3>
              <p className="text-sm text-blue-100">Envie seu projeto</p>
            </div>
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
        </Card>
      </div>

      {/* Desafio Empreendedor */}
      <Card 
        className="p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg border-white/20 shadow-xl mb-8 cursor-pointer hover:scale-[1.02] transition-transform"
        onClick={() => onNavigate('activities')}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">Desafio Empreendedor</h3>
            <p className="text-sm text-blue-100">Continue trabalhando</p>
            <Progress value={35} className="h-2 mt-2 bg-orange-900/50" />
          </div>
        </div>
      </Card>

      {/* Avisos do Professor */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Bell className="w-6 h-6" />
          Avisos do Professor
        </h2>
        
        <div className="space-y-3">
          <Card className="p-5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border-cyan-400/30 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-xl">📢</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">Novo prazo para entrega</p>
                <p className="text-xs text-blue-200">O prazo do Projeto PictoBlox foi estendido até 10/02/2026</p>
                <p className="text-xs text-blue-300 mt-1">Há 2 horas</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-purple-400/30 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-xl">🎉</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">Parabéns pelo desempenho!</p>
                <p className="text-xs text-blue-200">Seu projeto de robótica foi destaque da turma. Continue assim!</p>
                <p className="text-xs text-blue-300 mt-1">Ontem</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Menu de navegação rápida */}
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.05] transition-transform"
          onClick={() => onNavigate('learning-paths')}
        >
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-white text-sm">Trilhas de Aprendizagem</h3>
          </div>
        </Card>

        <Card 
          className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.05] transition-transform"
          onClick={() => onNavigate('portfolio')}
        >
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Award className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-white text-sm">Meu Portfólio</h3>
          </div>
        </Card>

        <Card 
          className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.05] transition-transform"
          onClick={() => onNavigate('activities')}
        >
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Code className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-white text-sm">Atividades</h3>
          </div>
        </Card>

        <Card 
          className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.05] transition-transform"
          onClick={() => onNavigate('progress')}
        >
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-white text-sm">Progresso e XP</h3>
          </div>
        </Card>
      </div>
    </div>
  );
}