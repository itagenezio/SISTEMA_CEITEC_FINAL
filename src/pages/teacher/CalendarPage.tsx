import { useNavigate } from 'react-router-dom';
import { Button } from '../../app/components/ui/button';
import { Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';

export default function CalendarPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#1e3a8a] p-8 text-white flex flex-col items-center justify-center text-center">
            <CalendarIcon className="w-20 h-20 text-orange-400 mb-6 animate-bounce" />
            <h1 className="text-4xl font-bold mb-4">Calendário Acadêmico</h1>
            <p className="text-blue-200 max-w-md mb-8">Em breve: Agendamento de aulas, prazos de entrega e eventos integrados com sua agenda.</p>
            <Button onClick={() => navigate('/teacher')} className="bg-white/10 border-white/20 hover:bg-white/20">
                <ArrowLeft className="mr-2" /> Voltar ao Dashboard
            </Button>
        </div>
    );
}
