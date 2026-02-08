import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Key, ShieldCheck, Zap, GraduationCap, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Role } from '../../types';

interface LoginProps {
  onLogin: (userType: Role, userData: any) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [loginMethod, setLoginMethod] = useState<'creds' | 'code'>('creds');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt started...', { loginMethod, email });
    setIsLoading(true);

    try {
      if (loginMethod === 'creds') {
        const userType = email.toLowerCase().includes('prof') ? 'teacher' : 'student';
        const rawName = email.split('@')[0].split(/[._-]/).map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');

        onLogin(userType, {
          id: userType === 'teacher' ? 'prof-1' : `user-${email.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'anon'}`,
          name: userType === 'teacher' ? `PROF. ${rawName || 'COORDENADOR'}` : (rawName.toUpperCase() || 'ESTUDANTE'),
          email: email.includes('@') ? email : `${email}@ceitec.edu`,
          role: userType,
          avatar: userType === 'teacher' ? '👨‍🏫' : '👤',
          xp: userType === 'teacher' ? 0 : 1250
        });
        toast.success('AUTENTICAÇÃO_SINC_CONCLUÍDA');
      } else {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('access_code', accessCode)
          .single();

        if (error || !data) {
          toast.error('CÓDIGO_INVÁLIDO', { description: 'Acesso negado pelo firewall CEITEC.' });
        } else {
          onLogin('student', data);
          toast.success(`BEM-VINDO_AGENTE_${data.name.toUpperCase()}`);
        }
      }
    } catch (err) {
      toast.error('ERRO_CRÍTICO_SISTEMA');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#020617] relative overflow-hidden font-sans selection:bg-cyan-500/30">

      {/* Background Tech Effects - NOW MOVED BEHIND EVERYTHING */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden group">
          {/* Animated Glow Border */}
          <div className="absolute inset-0 border border-cyan-500/20 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mb-6 shadow-[0_0_20px_rgba(6,182,212,0.4)] relative">
              <GraduationCap className="w-10 h-10 text-white" />
              <div className="absolute -inset-2 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter mb-2 italic">
              CEITEC<span className="text-cyan-400">_EDU</span>
            </h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Ambiente de Aprendizagem Criativa</p>
          </div>

          {/* Toggle de Acesso */}
          <div className="flex bg-slate-950 p-1.5 rounded-2xl mb-8 border border-white/5 font-bold uppercase text-[9px] tracking-widest">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLoginMethod('creds');
              }}
              className={`flex-1 py-3 rounded-xl transition-all ${loginMethod === 'creds' ? 'bg-slate-800 text-cyan-400 shadow-inner' : 'text-slate-500 hover:text-white'}`}
            >
              Protocolo_Email
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLoginMethod('code');
              }}
              className={`flex-1 py-3 rounded-xl transition-all ${loginMethod === 'code' ? 'bg-slate-800 text-cyan-400 shadow-inner' : 'text-slate-500 hover:text-white'}`}
            >
              Código_Acesso
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {loginMethod === 'creds' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">USUÁRIO_OU_EMAIL</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
                    <Input
                      type="text"
                      name="terminal_id"
                      id="terminal_id"
                      autoComplete="off"
                      placeholder="usuario_ou_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 bg-slate-950/50 border-white/5 text-white h-14 rounded-2xl focus:border-cyan-500/50 focus:bg-slate-950 transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">SENHA_DE_ACESSO</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="access_key"
                      id="access_key"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 bg-slate-950/50 border-white/5 text-white h-14 rounded-2xl focus:border-cyan-500/50 focus:bg-slate-950 transition-all font-medium"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2 text-center">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Matrícula_Sincronizada</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <Input
                      placeholder="INV-XXXX"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      className="pl-12 bg-slate-950/50 border-white/5 text-center text-xl font-mono tracking-[0.4em] h-16 rounded-2xl text-cyan-400 placeholder:text-slate-800"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              onClick={(e) => {
                console.log('Button clicked directly');
                // If form doesn't submit for some reason, we can force it here
                // But standard type="submit" inside <form> is best
              }}
              className="w-full h-16 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black rounded-2xl shadow-[0_4px_20px_rgba(6,182,212,0.3)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group text-xs tracking-widest uppercase border-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  INICIAR_SESSÃO_CORE
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <div className="mt-4 p-4 bg-slate-950/50 rounded-2xl border border-white/5 text-[10px] text-slate-500 text-center font-bold">
              {loginMethod === 'creds'
                ? '💡 DICA: USE "PROF" NO EMAIL PARA ACESSO_COORDENADOR.'
                : '💡 INFO: INSIRA O CÓDIGO DE MATRÍCULA FORNECIDO.'}
            </div>
          </form>

          <footer className="mt-6 text-center bg-slate-950/30 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
              <ShieldCheck className="w-3 h-3 text-cyan-500" /> Sistema de Segurança Ativo
            </div>
            <p className="text-[10px] text-slate-600 font-bold mt-1">Versão 2.5 // Baseado em Protocolo Inovatec</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Emergency reset triggered');
                localStorage.clear();
                window.location.reload();
              }}
              className="mt-2 text-[8px] text-slate-700 hover:text-cyan-500 transition-colors uppercase tracking-[0.2em] font-black relative z-50 p-2"
            >
              [ RESETAR_EMERGÊNCIA_TOTAL ]
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}
