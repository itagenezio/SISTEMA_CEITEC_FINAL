import { ArrowLeft, FileText, Star, Send, Download } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { useState } from 'react';

import { Activity, EnrolledStudent } from '../data/mockData';

interface GradingProps {
  onNavigate: (screen: string) => void;
  submission: any;
  student: EnrolledStudent | undefined;
  activity: Activity | undefined;
  onGrade: (id: string, grade: number, feedback: string) => Promise<void>;
}

export function Grading({ onNavigate, submission, student, activity, onGrade }: GradingProps) {
  const [grade, setGrade] = useState(submission?.grade || 8.5);
  const [feedback, setFeedback] = useState(submission?.feedback || '');
  const [isSaving, setIsSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSaving(true);
    await onGrade(submission.id, grade, feedback);
    setIsSaving(false);
    setSubmitted(true);
    setTimeout(() => {
      onNavigate('submissions-list');
    }, 2000);
  };

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
        <div>
          <h1 className="text-3xl font-bold text-white">Correção de Atividades</h1>
          <p className="text-blue-200">Avalie o trabalho do aluno</p>
        </div>
      </div>

      {submitted ? (
        <Card className="p-12 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Star className="w-12 h-12 text-white fill-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Avaliação Enviada! ✅</h2>
          <p className="text-blue-200 text-lg">O aluno receberá seu feedback</p>
        </Card>
      ) : !submission ? (
        <Card className="p-12 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Entrega não encontrada</h2>
          <Button onClick={() => onNavigate('submissions-list')}>Voltar</Button>
        </Card>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Info do Aluno e Atividade */}
          <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl">{student?.avatar || '👤'}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Corrigir Atividade: {student?.name || 'Aluno'}</h2>
                  <p className="text-sm text-blue-200 mb-2">{activity?.title || 'Atividade'}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                      Entregue
                    </Badge>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                      {submission.submitted_at ? `Enviado em ${new Date(submission.submitted_at).toLocaleDateString('pt-BR')}` : 'Data pendente'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Visualização do Arquivo */}
          <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Material Enviado
              </h3>
              {submission.file_url && (
                <Button
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => window.open(submission.file_url, '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar/Ver Arquivo
                </Button>
              )}
            </div>

            {/* Simulação de preview do arquivo */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 rounded-2xl p-8 mb-4">
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-5xl">{activity?.icon || '📦'}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{submission.file_url ? 'Arquivo do Aluno' : 'Nenhum arquivo anexado'}</h3>
                <p className="text-sm text-blue-200">{submission.file_url ? 'O aluno enviou seu projeto' : 'O aluno enviou apenas comentários'}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-sm text-blue-200 mb-2">📝 Comentários do aluno:</p>
                <p className="text-white italic">
                  "{submission.comments || 'O aluno não deixou comentários adicionais.'}"
                </p>
              </div>
            </div>
          </Card>

          {/* Avaliação */}
          <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              Nota
            </h3>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-200">Atribua uma nota de 0 a 10</span>
                <div className="text-right">
                  <span className="text-5xl font-bold text-white">{grade.toFixed(1)}</span>
                </div>
              </div>

              <Slider
                value={[grade]}
                onValueChange={(value) => setGrade(value[0])}
                max={10}
                min={0}
                step={0.5}
                className="mb-2"
              />

              <div className="flex justify-between text-xs text-blue-200">
                <span>0</span>
                <span>2.5</span>
                <span>5.0</span>
                <span>7.5</span>
                <span>10</span>
              </div>
            </div>

            {/* Indicador visual da nota */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <div
                  key={num}
                  className={`h-2 rounded-full transition-all ${num <= grade
                    ? grade >= 7 ? 'bg-green-500' : grade >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                    : 'bg-white/10'
                    }`}
                />
              ))}
            </div>

            {/* Feedback */}
            <div className="mb-6">
              <label className="text-white font-semibold mb-3 block">
                Feedback para o Aluno
              </label>
              <Textarea
                placeholder="Escreva comentários e sugestões para o aluno..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-40 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 focus:border-cyan-400 focus:ring-cyan-400"
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-6 rounded-xl shadow-lg text-lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Enviar Feedback
            </Button>
          </Card>

          {/* Atividades Pendentes */}
          <Card className="p-6 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 backdrop-blur-lg border-white/20 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Próximas Correções</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👩‍💻</span>
                  <div>
                    <p className="text-white font-semibold">Ana Silva</p>
                    <p className="text-xs text-blue-200">Desafio de Robótica</p>
                  </div>
                </div>
                <Badge className="bg-orange-500/30 text-orange-200 border-orange-400/30">
                  Pendente
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👨‍🎓</span>
                  <div>
                    <p className="text-white font-semibold">João Santos</p>
                    <p className="text-xs text-blue-200">Plano de Negócio</p>
                  </div>
                </div>
                <Badge className="bg-orange-500/30 text-orange-200 border-orange-400/30">
                  Pendente
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
