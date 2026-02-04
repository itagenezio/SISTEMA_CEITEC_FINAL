import { ArrowLeft, Users, UserPlus, Mail, TrendingUp, Award } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface ClassManagementProps {
  onNavigate: (screen: string) => void;
}

export function ClassManagement({ onNavigate }: ClassManagementProps) {
  const students = [
    { id: 1, name: 'Pedro A.', email: 'pedro@email.com', progress: 75, xp: 1450, avatar: '👨‍💻' },
    { id: 2, name: 'Ana Silva', email: 'ana@email.com', progress: 85, xp: 1680, avatar: '👩‍💻' },
    { id: 3, name: 'João Santos', email: 'joao@email.com', progress: 60, xp: 1200, avatar: '👨‍🎓' },
    { id: 4, name: 'Maria Costa', email: 'maria@email.com', progress: 90, xp: 1850, avatar: '👩‍🎓' },
    { id: 5, name: 'Lucas Oliveira', email: 'lucas@email.com', progress: 55, xp: 1100, avatar: '👨‍💼' },
    { id: 6, name: 'Julia Fernandes', email: 'julia@email.com', progress: 80, xp: 1600, avatar: '👩‍💼' },
  ];

  return (
    <div className="min-h-screen p-6" 
         style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)' }}>
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => onNavigate('teacher-dashboard')}
          className="w-10 h-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white">Gestão de Turmas</h1>
          <p className="text-blue-200">Turma 9A</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
          <UserPlus className="w-5 h-5 mr-2" />
          Nova Turma
        </Button>
      </div>

      {/* Estatísticas da Turma */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">10</p>
              <p className="text-sm text-blue-200">Alunos</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">68%</p>
              <p className="text-sm text-blue-200">Progresso Médio</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">24</p>
              <p className="text-sm text-blue-200">Badges Conquistadas</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Progresso da Turma */}
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Progresso da Turma</h3>
        
        <div className="h-48 relative">
          {/* Gráfico de linha simplificado */}
          <svg className="w-full h-full" viewBox="0 0 400 150">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#34d399', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            
            {/* Área sob a curva */}
            <path
              d="M 0 120 L 50 100 L 100 90 L 150 95 L 200 80 L 250 70 L 300 75 L 350 60 L 400 55 L 400 150 L 0 150 Z"
              fill="url(#lineGradient)"
              opacity="0.2"
            />
            
            {/* Linha */}
            <path
              d="M 0 120 L 50 100 L 100 90 L 150 95 L 200 80 L 250 70 L 300 75 L 350 60 L 400 55"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
            />
            
            {/* Pontos */}
            <circle cx="0" cy="120" r="4" fill="#60a5fa" />
            <circle cx="50" cy="100" r="4" fill="#60a5fa" />
            <circle cx="100" cy="90" r="4" fill="#60a5fa" />
            <circle cx="150" cy="95" r="4" fill="#60a5fa" />
            <circle cx="200" cy="80" r="4" fill="#34d399" />
            <circle cx="250" cy="70" r="4" fill="#34d399" />
            <circle cx="300" cy="75" r="4" fill="#34d399" />
            <circle cx="350" cy="60" r="4" fill="#34d399" />
            <circle cx="400" cy="55" r="4" fill="#34d399" />
          </svg>
        </div>
        
        <div className="flex justify-between text-xs text-blue-200 mt-2">
          <span>Jan</span>
          <span>Fev</span>
          <span>Mar</span>
          <span>Abr</span>
          <span>Mai</span>
        </div>
      </Card>

      {/* Lista de Alunos */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Alunos</h2>
        
        <div className="space-y-3">
          {students.map((student) => (
            <Card 
              key={student.id}
              className="p-5 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl hover:bg-white/15 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-2xl">{student.avatar}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white">{student.name}</h3>
                      <p className="text-sm text-blue-200 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {student.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{student.xp} XP</p>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                        Nível 3
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Progress value={student.progress} className="flex-1 h-2 bg-blue-900/50" />
                    <span className="text-sm font-semibold text-white whitespace-nowrap">{student.progress}%</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Botão adicionar turma */}
      <Card 
        className="p-6 mt-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-blue-400/30 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Adicionar Nova Turma</h3>
            <p className="text-sm text-blue-200">Crie e gerencie mais turmas</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg text-2xl">
            ➕
          </div>
        </div>
      </Card>
    </div>
  );
}
