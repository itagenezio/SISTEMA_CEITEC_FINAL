import { ArrowLeft, Upload, FileText, Send, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

interface SubmitActivityProps {
  onNavigate: (screen: string) => void;
}

export function SubmitActivity({ onNavigate }: SubmitActivityProps) {
  const [file, setFile] = useState<File | null>(null);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onNavigate('activities');
    }, 2000);
  };

  return (
    <div className="min-h-screen p-6" 
         style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)' }}>
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => onNavigate('activities')}
          className="w-10 h-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">Entrega de Atividade</h1>
          <p className="text-blue-200">Envie seu projeto abaixo</p>
        </div>
      </div>

      {submitted ? (
        <Card className="p-12 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Atividade Enviada! 🎉</h2>
          <p className="text-blue-200 text-lg">Seu professor receberá em breve</p>
        </Card>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Info da atividade */}
          <Card className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/20 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🤖</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Projeto PictoBlox</h2>
                <p className="text-sm text-blue-200">Envie seu projeto abaixo</p>
              </div>
            </div>
          </Card>

          {/* Upload de arquivo */}
          <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Arquivo
            </h3>
            
            <label className="block">
              <div className="border-2 border-dashed border-white/30 rounded-2xl p-12 text-center cursor-pointer hover:border-cyan-400 hover:bg-white/5 transition-all">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                {file ? (
                  <div>
                    <p className="text-white font-semibold mb-1">{file.name}</p>
                    <p className="text-sm text-blue-200">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-white font-semibold mb-1">Clique para selecionar arquivo</p>
                    <p className="text-sm text-blue-200">ou arraste e solte aqui</p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => e.target.files && setFile(e.target.files[0])}
                  accept=".pdf,.doc,.docx,.zip,.sb3"
                />
              </div>
            </label>
          </Card>

          {/* Comentários */}
          <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Comentários
            </h3>
            <Textarea
              placeholder="Adicione comentários sobre seu projeto (opcional)..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-32 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 focus:border-cyan-400 focus:ring-cyan-400"
            />
          </Card>

          {/* Botão enviar */}
          <Button
            onClick={handleSubmit}
            disabled={!file}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            <Send className="w-5 h-5 mr-2" />
            Enviar Atividade
          </Button>
        </div>
      )}
    </div>
  );
}
