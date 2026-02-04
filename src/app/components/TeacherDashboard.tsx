import { Users, CheckSquare, TrendingUp, BookOpen, BarChart3, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface TeacherDashboardProps {
  onNavigate: (screen: string) => void;
}

export function TeacherDashboard({ onNavigate }: TeacherDashboardProps) {
  return (
    <div className="min-h-screen p-6" 
         style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)' }}>
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Dashboard do Professor 👨‍🏫
            </h1>
            <p className="text-blue-200">Bem-vindo de volta!</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">👤</span>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-blue-500/30 text-white border-blue-400/30">Ativo</Badge>
          </div>
          <p className="text-3xl font-bold text-white mb-1">22</p>
          <p className="text-sm text-blue-200">Alunos Online</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-green-500/30 text-white border-green-400/30">Hoje</Badge>
          </div>
          <p className="text-3xl font-bold text-white mb-1">12</p>
          <p className="text-sm text-blue-200">Atividades Pendentes</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-purple-500/30 text-white border-purple-400/30">Média</Badge>
          </div>
          <p className="text-3xl font-bold text-white mb-1">66,88%</p>
          <p className="text-sm text-blue-200">Progresso da Turma</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg border-white/20 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-orange-500/30 text-white border-orange-400/30">Ativas</Badge>
          </div>
          <p className="text-3xl font-bold text-white mb-1">2</p>
          <p className="text-sm text-blue-200">Turmas</p>
        </Card>
      </div>

      {/* Turmas Ativas */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Turmas Ativas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => onNavigate('class-management')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">9A</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Turma 9A</h3>
                  <p className="text-sm text-blue-200">10 alunos</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                Gerenciar
              </Badge>
            </div>
            <div className="flex gap-2 text-sm text-blue-200">
              <span>📊 68% progresso médio</span>
            </div>
          </Card>

          <Card 
            className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => onNavigate('class-management')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">9B</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Turma 9B</h3>
                  <p className="text-sm text-blue-200">12 alunos</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                Gerenciar
              </Badge>
            </div>
            <div className="flex gap-2 text-sm text-blue-200">
              <span>📊 65% progresso médio</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Progresso da Turma */}
      <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl mb-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Progresso da Turma
        </h3>
        
        <div className="h-48 flex items-end justify-between gap-2">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gradient-to-t from-blue-400 to-cyan-500 rounded-t-lg" style={{ height: '75%' }}></div>
            <p className="text-xs text-blue-200 mt-2">Seg</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gradient-to-t from-blue-400 to-cyan-500 rounded-t-lg" style={{ height: '60%' }}></div>
            <p className="text-xs text-blue-200 mt-2">Ter</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gradient-to-t from-blue-400 to-cyan-500 rounded-t-lg" style={{ height: '85%' }}></div>
            <p className="text-xs text-blue-200 mt-2">Qua</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gradient-to-t from-blue-400 to-cyan-500 rounded-t-lg" style={{ height: '70%' }}></div>
            <p className="text-xs text-blue-200 mt-2">Qui</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gradient-to-t from-blue-400 to-cyan-500 rounded-t-lg" style={{ height: '95%' }}></div>
            <p className="text-xs text-blue-200 mt-2">Sex</p>
          </div>
        </div>
        
        <p className="text-sm text-blue-200 text-center mt-4">Frequência da Semana</p>
      </Card>

      {/* Menu de navegação */}
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.05] transition-transform"
          onClick={() => onNavigate('class-management')}
        >
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-white text-sm">Gestão de Turmas</h3>
          </div>
        </Card>

        <Card 
          className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.05] transition-transform"
          onClick={() => onNavigate('grading')}
        >
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <CheckSquare className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-white text-sm">Correção de Atividades</h3>
          </div>
        </Card>

        <Card 
          className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.05] transition-transform"
        >
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-white text-sm">Relatórios</h3>
          </div>
        </Card>

        <Card 
          className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl cursor-pointer hover:scale-[1.05] transition-transform"
        >
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-white text-sm">Calendário</h3>
          </div>
        </Card>
      </div>
    </div>
  );
}
