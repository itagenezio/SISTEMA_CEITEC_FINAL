import { ArrowLeft, Code, Lightbulb, Play, CheckCircle2, Lock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface LearningPathsProps {
  onNavigate: (screen: string) => void;
}

export function LearningPaths({ onNavigate }: LearningPathsProps) {
  const paths = [
    {
      id: 1,
      title: 'Programação com PictoBlox',
      description: 'Aprenda programação com blocos visuais',
      icon: '🤖',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      progress: 65,
      lessons: 12,
      completed: 8,
      status: 'active'
    },
    {
      id: 2,
      title: 'Empreendedorismo Digital',
      description: 'Desenvolva suas ideias de negócio',
      icon: '💡',
      color: 'from-orange-400 to-yellow-500',
      bgColor: 'from-orange-500/20 to-yellow-500/20',
      progress: 40,
      lessons: 10,
      completed: 4,
      status: 'active'
    }
  ];

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
          <h1 className="text-3xl font-bold text-white">Trilhas de Atividades</h1>
          <p className="text-blue-200">Escolha sua jornada de aprendizado</p>
        </div>
      </div>

      {/* Trilhas */}
      <div className="space-y-6">
        {paths.map((path) => (
          <Card 
            key={path.id}
            className={`p-8 bg-gradient-to-br ${path.bgColor} backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform`}
            onClick={() => onNavigate('activities')}
          >
            <div className="flex items-start gap-6 mb-6">
              <div className={`w-24 h-24 bg-gradient-to-br ${path.color} rounded-3xl flex items-center justify-center shadow-2xl`}>
                <span className="text-5xl">{path.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{path.title}</h2>
                    <p className="text-blue-100">{path.description}</p>
                  </div>
                  <Button 
                    size="sm"
                    className={`bg-gradient-to-r ${path.color} text-white shadow-lg hover:opacity-90`}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Iniciar
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <Badge className="bg-white/20 text-white border-white/20">
                    {path.completed}/{path.lessons} aulas
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/20">
                    {path.progress}% completo
                  </Badge>
                </div>
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${path.color} rounded-full transition-all duration-500`}
                style={{ width: `${path.progress}%` }}
              ></div>
            </div>

            {/* Módulos/Tópicos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-semibold text-white">Módulo 1</span>
                </div>
                <p className="text-xs text-blue-200">Introdução e conceitos básicos</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-white">Módulo 2</span>
                </div>
                <p className="text-xs text-blue-200">Praticando e desenvolvendo</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-xl border border-white/10 opacity-60">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-semibold text-white">Módulo 3</span>
                </div>
                <p className="text-xs text-blue-200">Projetos avançados</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
