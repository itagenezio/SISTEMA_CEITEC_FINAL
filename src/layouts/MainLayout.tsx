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
    GraduationCap
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
        <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans">

            {/* HUD Backdrop */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-600/5 blur-[120px] rounded-full" />
            </div>

            {/* Sidebar Inovadora */}
            <motion.aside
                initial={false}
                animate={{ width: isCollapsed ? '80px' : '280px' }}
                className="relative z-20 h-full border-r border-white/5 bg-slate-900/40 backdrop-blur-2xl flex flex-col transition-all duration-300 ease-in-out"
            >
                {/* Logo Area */}
                <div className="p-6 flex items-center gap-3">
                    <div className="min-w-[40px] h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col"
                        >
                            <span className="font-black text-lg tracking-tighter leading-none">CEITEC<span className="text-cyan-400">_EDU</span></span>
                            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">OS_v2.5</span>
                        </motion.div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path) && item.path !== '/student' && item.path !== '/teacher');
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative
                  ${isActive
                                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}
                `}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'group-hover:text-white'}`} />
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="font-bold text-sm"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute right-2 w-1.5 h-6 bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]"
                                    />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* User context / Footer */}
                <div className="p-4 border-t border-white/5 space-y-4">
                    {!isCollapsed && (
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-white/5">
                                    <span className="text-xl">{user?.avatar || '👤'}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold truncate">{user?.name}</p>
                                    <p className="text-[10px] text-slate-500 font-black uppercase">{role}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent`}
                    >
                        <LogOut className="w-5 h-5" />
                        {!isCollapsed && <span className="font-bold text-sm">Encerrar Sessão</span>}
                    </button>

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full flex items-center justify-center p-2 text-slate-500 hover:text-white transition-colors"
                    >
                        {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative z-10 overflow-hidden">

                {/* Top HUB bar */}
                <header className="h-20 border-b border-white/5 bg-slate-900/40 backdrop-blur-md px-8 flex items-center justify-between">
                    <div className="flex-1 max-w-xl relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Comando de busca rápida... (Ctrl+K)"
                            className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-6 pl-6">
                        <div className="flex items-center gap-4 border-r border-white/5 pr-6">
                            <div className="text-right">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Net_Status</p>
                                <p className="text-xs font-bold text-emerald-400">STABLE</p>
                            </div>
                            <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white rounded-xl">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#020617]"></span>
                            </Button>
                        </div>

                        {role === 'student' && (
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Power_Level</p>
                                    <p className="text-sm font-black text-cyan-400">{user?.xp || 0} XP</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-cyan-400 shadow-[0_0_10px_#06b6d4]" />
                                </div>
                            </div>
                        )}

                        {role === 'teacher' && (
                            <div className="flex items-center gap-3">
                                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 font-mono text-[10px]">
                                    AI_ASSISTANT_READY
                                </Badge>
                            </div>
                        )}
                    </div>
                </header>

                {/* Dynamic Content View */}
                <div className="flex-1 overflow-y-auto no-scrollbar custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="p-8 h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

        </div>
    );
}
