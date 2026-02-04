import { ArrowLeft, Circle, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface ActivitiesProps {
  onNavigate: (screen: string) => void;
}

export function Activities({ onNavigate }: ActivitiesProps) {
  const activities = [
    {
      id: 1,
      title: 'Introdução ao PictoBlox',
      description: 'Aprenda os conceitos básicos da programação visual',
      status: 'completed',
      points: 100,
      deadline: '2026-01-15',
      progress: 100,
      icon: '✅',
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 2,
      title: 'Desafio de Robótica',
      description: 'Crie um projeto de robô seguidor de linha',
      status: 'in-progress',
      points: 150,
      deadline: '2026-02-10',
      progress: 45,
      icon: '🤖',
      color: 'from-red-400 to-orange-500'
    },
    {
      id: 3,
      title: 'Plano de Negócio',
      description: 'Desenvolva um plano de negócio digital',
      status: 'in-progress',
      points: 120,
      deadline: '2026-02-08',
      progress: 60,
      icon: '💼',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 4,
      title: 'Projeto Final PictoBlox',
      description: 'Desenvolva um projeto completo usando PictoBlox',
      status: 'pending',
      points: 200,
      deadline: '2026-02-20',
      progress: 0,
      icon: '🚀',
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 5,
      title: 'Pitch do Projeto',
      description: 'Apresente sua ideia de negócio',
      status: 'pending',
      points: 180,
      deadline: '2026-02-25',
      progress: 0,
      icon: '🎯',
      color: 'from-amber-400 to-yellow-500'
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { 
          icon: <CheckCircle2 className="w-5 h-5" />, 
          label: 'Concluída', 
          color: 'bg-green-500/20 text-green-400 border-green-400/30' 
        };
      case 'in-progress':
        return { 
          icon: <Clock className="w-5 h-5" />, 
          label: 'Em andamento', 
          color: 'bg-blue-500/20 text-blue-400 border-blue-400/30' 
        };
      default:
        return { 
          icon: <Circle className="w-5 h-5" />, 
          label: 'Pendente', 
          color: 'bg-gray-500/20 text-gray-400 border-gray-400/30' 
        };
    }
  };

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
          <h1 className="text-3xl font-bold text-white">Lista de Atividades</h1>
          <p className="text-blue-200">Acompanhe suas tarefas e entregas</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        <Badge className="bg-white/20 text-white border-white/20 cursor-pointer hover:bg-white/30 whitespace-nowrap">
          Todas
        </Badge>
        <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 cursor-pointer hover:bg-blue-500/30 whitespace-nowrap">
          Em andamento
        </Badge>
        <Badge className="bg-green-500/20 text-green-300 border-green-400/30 cursor-pointer hover:bg-green-500/30 whitespace-nowrap">
          Concluídas
        </Badge>
        <Badge className="bg-gray-500/20 text-gray-300 border-gray-400/30 cursor-pointer hover:bg-gray-500/30 whitespace-nowrap">
          Pendentes
        </Badge>
      </div>

      {/* Lista de Atividades */}
      <div className="space-y-4">
        {activities.map((activity) => {
          const statusInfo = getStatusInfo(activity.status);
          
          return (
            <Card 
              key={activity.id}
              className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.01] transition-transform"
              onClick={() => activity.status !== 'completed' && onNavigate('submit-activity')}
            >
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${activity.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <span className="text-3xl">{activity.icon}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{activity.title}</h3>
                      <p className="text-sm text-blue-200">{activity.description}</p>
                    </div>
                    <Badge className={`${statusInfo.color} flex items-center gap-1 whitespace-nowrap`}>
                      {statusInfo.icon}
                      {statusInfo.label}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-200">
                        Prazo: {new Date(activity.deadline).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-blue-200">{activity.points} XP</span>
                    </div>
                  </div>

                  {activity.status !== 'pending' && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-blue-200">Progresso</span>
                        <span className="text-xs text-white font-semibold">{activity.progress}%</span>
                      </div>
                      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${activity.color} rounded-full transition-all duration-500`}
                          style={{ width: `${activity.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Botão de enviar atividade */}
      <Card 
        className="p-6 mt-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-green-400/30 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform"
        onClick={() => onNavigate('submit-activity')}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Enviar Nova Atividade</h3>
            <p className="text-sm text-blue-200">Faça o upload do seu trabalho</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">📤</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
