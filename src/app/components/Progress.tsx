import { ArrowLeft, Trophy, Star, Award, TrendingUp, Zap, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Progress as ProgressBar } from './ui/progress';
import { Badge } from './ui/badge';

interface ProgressProps {
  onNavigate: (screen: string) => void;
}

export function Progress({ onNavigate }: ProgressProps) {
  const badges = [
    {
      id: 1,
      name: 'Criador Maker',
      description: 'Completou primeiro projeto',
      icon: '🎨',
      color: 'from-blue-400 to-cyan-500',
      earned: true
    },
    {
      id: 2,
      name: 'Lógica em Ação',
      description: 'Dominou conceitos de programação',
      icon: '🧩',
      color: 'from-green-400 to-emerald-500',
      earned: true
    },
    {
      id: 3,
      name: 'Maker Criativa',
      description: 'Projeto criativo destacado',
      icon: '💡',
      color: 'from-yellow-400 to-orange-500',
      earned: true
    },
    {
      id: 4,
      name: 'Startup Criativa',
      description: 'Desenvolveu plano de negócio',
      icon: '🚀',
      color: 'from-purple-400 to-pink-500',
      earned: true
    },
    {
      id: 5,
      name: 'Mestre IoT',
      description: 'Especialista em Internet das Coisas',
      icon: '🌐',
      color: 'from-indigo-400 to-blue-500',
      earned: false
    },
    {
      id: 6,
      name: 'Empreendedor Pro',
      description: 'Completou trilha de empreendedorismo',
      icon: '💼',
      color: 'from-red-400 to-pink-500',
      earned: false
    }
  ];

  const xp = 1450;
  const maxXp = 2000;
  const level = 3;

  return (
    <div className="min-h-screen p-6" 
         style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)' }}>
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => onNavigate('student-dashboard')}
          className="w-10 h-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">Meu Progresso</h1>
          <p className="text-blue-200">Acompanhe sua evolução</p>
        </div>
      </div>

      {/* Card de XP e Nível */}
      <Card className="p-8 mb-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg border-white/20 shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-2xl mb-4 relative">
            <span className="text-5xl font-bold text-white">XP</span>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">{level}</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            {xp.toLocaleString()} / {maxXp.toLocaleString()}
          </h2>
          <p className="text-lg text-blue-200">Nível {level} • Criador Maker</p>
        </div>

        <ProgressBar value={(xp / maxXp) * 100} className="h-4 bg-blue-900/50 mb-3" />
        
        <p className="text-center text-sm text-blue-200">
          Faltam {(maxXp - xp).toLocaleString()} XP para o próximo nível
        </p>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-sm text-blue-200">Atividades</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">9.2</p>
              <p className="text-sm text-blue-200">Média</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4</p>
              <p className="text-sm text-blue-200">Badges</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">85%</p>
              <p className="text-sm text-blue-200">Conclusão</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Badges */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          Badges Conquistadas
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <Card 
              key={badge.id}
              className={`p-6 backdrop-blur-lg border-white/20 shadow-xl ${
                badge.earned 
                  ? `bg-gradient-to-br ${badge.color}/20` 
                  : 'bg-white/5 opacity-50'
              }`}
            >
              <div className="text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${badge.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg ${
                  !badge.earned && 'grayscale opacity-40'
                }`}>
                  <span className="text-4xl">{badge.icon}</span>
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-blue-200">{badge.description}</p>
                {badge.earned && (
                  <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-400/30 text-xs">
                    ✓ Conquistada
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Progresso por Trilha */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Progresso por Trilha</h2>
        
        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl mb-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white">Programação com PictoBlox</h3>
              <p className="text-sm text-blue-200">65% concluído</p>
            </div>
          </div>
          <ProgressBar value={65} className="h-2 bg-blue-900/50" />
        </Card>

        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">💡</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white">Empreendedorismo Digital</h3>
              <p className="text-sm text-blue-200">40% concluído</p>
            </div>
          </div>
          <ProgressBar value={40} className="h-2 bg-orange-900/50" />
        </Card>
      </div>

      {/* Frequência */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Frequência
        </h2>
        
        <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl mb-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-3xl font-bold text-white">92%</p>
              <p className="text-sm text-blue-200">Presença no mês</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl">✓</span>
            </div>
          </div>
          
          {/* Calendário de presença */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-200">Segunda-feira</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-green-500/30 border border-green-400/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-green-300">✓</span>
                </div>
                <div className="w-8 h-8 bg-green-500/30 border border-green-400/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-green-300">✓</span>
                </div>
                <div className="w-8 h-8 bg-green-500/30 border border-green-400/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-green-300">✓</span>
                </div>
                <div className="w-8 h-8 bg-green-500/30 border border-green-400/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-green-300">✓</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-200">Quarta-feira</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-green-500/30 border border-green-400/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-green-300">✓</span>
                </div>
                <div className="w-8 h-8 bg-green-500/30 border border-green-400/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-green-300">✓</span>
                </div>
                <div className="w-8 h-8 bg-red-500/30 border border-red-400/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-red-300">✗</span>
                </div>
                <div className="w-8 h-8 bg-green-500/30 border border-green-400/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-green-300">✓</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-200">Sexta-feira</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-green-500/30 border border-green-400/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-green-300">✓</span>
                </div>
                <div className="w-8 h-8 bg-green-500/30 border border-green-400/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-green-300">✓</span>
                </div>
                <div className="w-8 h-8 bg-green-500/30 border border-green-400/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-green-300">✓</span>
                </div>
                <div className="w-8 h-8 bg-gray-500/30 border border-gray-400/50 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-300">-</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500/30 border border-green-400/50 rounded"></div>
              <span className="text-xs text-blue-200">Presente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/30 border border-red-400/50 rounded"></div>
              <span className="text-xs text-blue-200">Ausente</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500/30 border border-gray-400/50 rounded"></div>
              <span className="text-xs text-blue-200">Futuro</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}