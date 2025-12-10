import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Nuevo mensaje", desc: "Cliente Demo te ha enviado un mensaje.", time: "Hace 5 min", unread: true },
    { id: 2, title: "Solicitud Aceptada", desc: "Tu aplicación para 'Diseño Web' fue vista.", time: "Hace 1 hora", unread: true },
    { id: 3, title: "Recordatorio de Curso", desc: "Continúa tu curso de Marketing Digital.", time: "Hace 1 día", unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-red-500 hover:bg-red-600 border-2 border-background">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
          Notificaciones
          {unreadCount > 0 && (
            <span className="text-xs font-normal text-primary cursor-pointer hover:underline" onClick={markAllRead}>
              Marcar leídas
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No tienes notificaciones.
            </div>
          ) : (
            notifications.map((n) => (
              <DropdownMenuItem key={n.id} className={`flex flex-col items-start p-3 cursor-pointer ${n.unread ? 'bg-muted/30' : ''}`}>
                <div className="flex justify-between w-full mb-1">
                  <span className={`text-sm font-medium ${n.unread ? 'text-primary' : ''}`}>{n.title}</span>
                  <span className="text-[10px] text-muted-foreground">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{n.desc}</p>
              </DropdownMenuItem>
            ))
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-xs text-muted-foreground cursor-pointer">
          Ver todas las notificaciones
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
