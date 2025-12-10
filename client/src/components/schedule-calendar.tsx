import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

export function ScheduleCalendar() {
  // Mock upcoming events
  const events = [
    { id: 1, day: "Hoy", date: "15 Oct", title: "Instalación Eléctrica", client: "Ana García", time: "14:00 - 16:00", type: "work" },
    { id: 2, day: "Mañana", date: "16 Oct", title: "Clase: React Hooks", client: "Curso Online", time: "10:00 - 11:30", type: "study" },
    { id: 3, day: "Jueves", date: "17 Oct", title: "Entrega de Diseño", client: "Restaurante El Buen Sabor", time: "09:00", type: "deadline" },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'study': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'deadline': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-serif">Mi Agenda</h3>
        <Badge variant="outline" className="gap-1">
          <CalendarIcon className="h-3 w-3" /> Octubre 2023
        </Badge>
      </div>

      <div className="grid gap-4">
        {events.map((evt) => (
          <Card key={evt.id} className="overflow-hidden border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-muted/30 p-4 flex flex-col items-center justify-center min-w-[100px] border-r border-border/50">
                <span className="text-xs font-semibold text-muted-foreground uppercase">{evt.day}</span>
                <span className="text-2xl font-bold text-primary">{evt.date.split(' ')[0]}</span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-center gap-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg">{evt.title}</h4>
                  <Badge variant="secondary" className={`text-[10px] border ${getTypeColor(evt.type)}`}>
                    {evt.type === 'work' ? 'Trabajo' : evt.type === 'study' ? 'Estudio' : 'Entrega'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{evt.client}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-medium">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" /> {evt.time}
                  </div>
                  {evt.type === 'work' && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" /> Norte
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Mini Calendar Visual Mock */}
      <Card className="p-4">
        <div className="grid grid-cols-7 text-center text-sm mb-2">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => (
            <div key={d} className="font-bold text-muted-foreground py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
           {Array.from({length: 31}, (_, i) => i + 1).map(d => (
             <div 
               key={d} 
               className={`py-2 rounded-md ${
                 d === 15 ? 'bg-primary text-primary-foreground font-bold' : 
                 d === 16 || d === 17 ? 'bg-primary/10 text-primary' : 
                 'hover:bg-muted cursor-pointer'
               }`}
             >
               {d}
             </div>
           ))}
        </div>
      </Card>
    </div>
  );
}
