import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface LoginProps {
  onLogin: (userType: 'student' | 'teacher') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula login - se email contém "prof" é professor, senão é aluno
    const userType = email.toLowerCase().includes('prof') ? 'teacher' : 'student';
    onLogin(userType);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #4c1d95 100%)' }}>
      
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl mb-4 shadow-lg">
              <span className="text-3xl">🚀</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              <span className="font-black">INOVATEC</span> <span className="font-light">EDU</span>
            </h1>
            <p className="text-blue-200">Centro de Inovação e Tecnologia</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 focus:border-cyan-400 focus:ring-cyan-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-100">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 focus:border-cyan-400 focus:ring-cyan-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-6 rounded-xl shadow-lg"
            >
              Entrar
            </Button>

            <div className="text-center">
              <button type="button" className="text-sm text-blue-200 hover:text-white transition-colors">
                Esqueceu sua senha?
              </button>
            </div>
          </form>

          {/* Dica para teste */}
          <div className="mt-6 p-4 bg-blue-900/30 rounded-xl border border-blue-400/20">
            <p className="text-xs text-blue-200 text-center">
              💡 Dica: Use qualquer email com "prof" para entrar como professor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
