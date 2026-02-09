import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    BarChart3,
    Calendar,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Trophy,
    Bell,
    Search,
    Zap,
    GraduationCap,
    Cpu
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../app/components/ui/button';
import { Badge } from '../app/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';

export function MainLayout() {
    const { user, role, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const teacherMenu = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/teacher' },
        { label: 'Minhas Turmas', icon: Users, path: '/teacher/classes' },
        { label: 'Correções', icon: Zap, path: '/teacher/submissions' },
        { label: 'Relatórios', icon: BarChart3, path: '/teacher/reports' },
        { label: 'Calendário', icon: Calendar, path: '/teacher/calendar' },
    ];

    const studentMenu = [
        { label: 'Início', icon: LayoutDashboard, path: '/student' },
        { label: 'Atividades', icon: BookOpen, path: '/student/activities' },
        { label: 'Meu Portfólio', icon: Trophy, path: '/student/portfolio' },
        { label: 'Meu Progresso', icon: BarChart3, path: '/student/progress' },
    ];

    const menuItems = role === 'teacher' ? teacherMenu : studentMenu;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans selection:bg-cyan-500/30">

            {/* HUD Backdrop - VIBRANTE */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse [animation-delay:2s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-80" />
            </div>

            {/* Sidebar Evoluída c/ Efeito Glassmorphism */}
            <motion.aside
                initial={false}
                animate={{ width: isCollapsed ? '90px' : '300px' }}
                className="relative z-30 h-full border-r border-white/5 bg-slate-950/40 backdrop-blur-3xl flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[20px_0_50px_rgba(0,0,0,0.3)]"
            >
                {/* Elemento Decorativo: Scanline na Sidebar */}
                <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(transparent_0%,rgba(6,182,212,0.03)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_6s_linear_infinite] pointer-events-none" />

                {/* Logo Area - PREMIUM */}
                <div className="p-8 flex items-center gap-4 group">
                    <div className="min-w-[48px] h-12 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-500">
                        <GraduationCap className="w-7 h-7 text-white drop-shadow-md" />
                    </div>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            <span className="font-black text-xl tracking-tighter leading-none italic">INOVATEC<span className="text-cyan-400">_OS</span></span>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em]">Build_2026.x</span>
                                <div className="w-1 h-1 rounded-full bg-cyan-500 animate-ping"></div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Navigation - HIGH CONTRAST */}
                <nav className="flex-1 px-5 space-y-3 mt-6 overflow-y-auto no-scrollbar relative z-10">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path) && item.path !== '/student' && item.path !== '/teacher');
                        return (
                            <motion.button
                                key={item.path}
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative
                                    ${isActive
                                        ? 'bg-gradient-to-r from-cyan-500/15 to-transparent text-cyan-400 border-l-4 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                                        : 'text-slate-500 hover:text-white hover:bg-white/5 border-l-4 border-transparent'}
                                `}
                            >
                                <item.icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'group-hover:text-white'}`} />
                                {!isCollapsed && (
                                    <span className={`font-black uppercase tracking-widest text-xs transition-colors duration-300 ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                                        {item.label}
                                    </span>
                                )}
                                {isActive && !isCollapsed && (
                                    <div className="absolute right-4 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]"></div>
                                )}
                            </motion.button>
                        );
                    })}
                </nav>

                {/* User context / Footer - INTEGRATED */}
                <div className="p-6 border-t border-white/5 space-y-6 bg-slate-950/20">
                    {!isCollapsed && (
                        <div className="p-4 bg-slate-900/60 rounded-[1.5rem] border border-white/10 shadow-inner group cursor-pointer hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform overflow-hidden relative">
                                    <span className="text-2xl relative z-10">{user?.avatar || '👤'}</span>
                                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-black truncate text-white uppercase italic tracking-tighter">{user?.name}</p>
                                    <Badge className="p-0 text-[10px] text-cyan-400 font-black uppercase tracking-[0.2em] bg-transparent border-none hover:bg-transparent">STATUS:_{role}</Badge>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleLogout}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group`}
                        >
                            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            {!isCollapsed && <span className="font-black uppercase tracking-widest text-[10px]">Encerrar Link</span>}
                        </button>

                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="w-full flex items-center justify-center p-3 text-slate-600 hover:text-cyan-400 transition-colors bg-white/5 rounded-xl border border-white/5"
                        >
                            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area - VIBRANTE */}
            <main className="flex-1 flex flex-col relative z-20 overflow-hidden bg-transparent">

                {/* Top HUB bar - COMAND CENTER FEEL */}
                <header className="h-24 border-b border-white/5 bg-slate-950/40 backdrop-blur-3xl px-10 flex items-center justify-between shadow-xl">
                    <div className="flex-1 max-w-2xl relative group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="OPERADOR_SEARCH:// COMANDO DE BUSCA... (Ctrl+K)"
                            className="w-full bg-slate-900/60 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm font-black tracking-widest text-white focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900/80 transition-all uppercase placeholder:text-slate-600 shadow-inner"
                        />
                    </div>

                    <div className="flex items-center gap-8 pl-8">
                        <div className="flex items-center gap-6 border-r border-white/10 pr-8">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] leading-none mb-2">DATA_LINK_STATUS</p>
                                <div className="flex items-center justify-end gap-3">
                                    <span className="text-sm font-black text-emerald-400 tracking-tighter">ESTÁVEL_V4.2</span>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-2xl w-12 h-12 transition-all">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#020617] animate-bounce"></span>
                            </Button>
                        </div>

                        {role === 'student' && (
                            <div className="flex items-center gap-5">
                                <div className="text-right">
                                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em] leading-none mb-1">XP_ACCUMULATED</p>
                                    <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic leading-none">{user?.xp || 0} XP</p>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group cursor-pointer hover:border-cyan-400/50 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                                    <Zap className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_10px_#06b6d4] group-hover:scale-110 transition-transform" />
                                </div>
                            </div>
                        )}

                        {role === 'teacher' && (
                            <div className="flex items-center gap-4">
                                <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30 font-black text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                                    <Cpu className="w-3.5 h-3.5 mr-2 animate-spin-slow" /> AI_HUB_ENABLED
                                </Badge>
                            </div>
                        )}
                    </div>
                </header>

                {/* Dynamic Content View with Modern Transitions */}
                <div className="flex-1 overflow-y-auto no-scrollbar custom-scrollbar bg-transparent">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -30, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="p-10 h-full w-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

        </div>
    );
}
