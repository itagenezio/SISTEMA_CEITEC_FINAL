import { ArrowLeft, Trophy, Star, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface PortfolioProps {
  onNavigate: (screen: string) => void;
}

export function Portfolio({ onNavigate }: PortfolioProps) {
  const projects = [
    {
      id: 1,
      title: 'Projeto PictoBlox',
      description: 'Robô seguidor de linha com sensores',
      date: '15 Jan 2026',
      grade: 9.5,
      status: 'approved',
      image: '🤖',
      color: 'from-blue-400 to-cyan-500',
      tags: ['PictoBlox', 'Robótica', 'Sensores']
    },
    {
      id: 2,
      title: 'Trilhas Reporte',
      description: 'Projeto de coleta de dados ambientais',
      date: '20 Jan 2026',
      grade: 9.0,
      status: 'approved',
      image: '🌱',
      color: 'from-green-400 to-emerald-500',
      tags: ['Sustentabilidade', 'IoT']
    },
    {
      id: 3,
      title: 'App de Reciclagem',
      description: 'Aplicativo para incentivar reciclagem',
      date: '25 Jan 2026',
      grade: null,
      status: 'pending',
      image: '♻️',
      color: 'from-purple-400 to-pink-500',
      tags: ['Empreendedorismo', 'App']
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
          <h1 className="text-3xl font-bold text-white">Meu Portfólio</h1>
          <p className="text-blue-200">Seus projetos e conquistas</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">12</p>
              <p className="text-sm text-blue-200">Projetos</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Star className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">9.2</p>
              <p className="text-sm text-blue-200">Média</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">🏆</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">8</p>
              <p className="text-sm text-blue-200">Badges</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Lista de Projetos */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white mb-4">Projetos Recentes</h2>
        
        {projects.map((project) => (
          <Card 
            key={project.id}
            className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.01] transition-transform"
          >
            <div className="flex items-start gap-4">
              <div className={`w-20 h-20 bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                <span className="text-4xl">{project.image}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-sm text-blue-200 mb-2">{project.description}</p>
                    <p className="text-xs text-blue-300">{project.date}</p>
                  </div>
                  {project.grade && (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-white">{project.grade}</span>
                      </div>
                      <p className="text-xs text-blue-200 mt-1">Nota</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} className="bg-white/20 text-white border-white/20">
                      {tag}
                    </Badge>
                  ))}
                  {project.status === 'approved' && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                      ✓ Aprovado
                    </Badge>
                  )}
                  {project.status === 'pending' && (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                      ⏳ Aguardando correção
                    </Badge>
                  )}
                </div>

                <button className="mt-4 flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Ver detalhes do projeto
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Botão adicionar projeto */}
      <Card 
        className="p-6 mt-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border-cyan-400/30 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform"
        onClick={() => onNavigate('submit-activity')}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Adicionar Novo Projeto</h3>
            <p className="text-sm text-blue-200">Envie um novo trabalho para seu portfólio</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg text-2xl">
            ➕
          </div>
        </div>
      </Card>
    </div>
  );
}
