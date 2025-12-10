import { Link, useLocation } from "wouter";
import { Menu, X, Briefcase, GraduationCap, User, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { NotificationsDropdown } from "./notifications-dropdown";
import { ModeToggle } from "./mode-toggle";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
              <Briefcase className="h-6 w-6" />
              <span>Oficios & Educación</span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <ModeToggle />
            {user ? (
              <>
                <NotificationsDropdown />
                <Link href={user.rol === 'CLIENTE' ? "/dashboard-client" : "/dashboard-young"}>
                  <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive(user.rol === 'CLIENTE' ? '/dashboard-client' : '/dashboard-young') ? 'text-primary' : 'text-muted-foreground'}`}>
                    Mi Dashboard
                  </a>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-2">
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} alt={user.nombre} />
                        <AvatarFallback>{user.nombre.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.nombre}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/auth">
                <Button variant="default" size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-serif">
                  <LogIn className="h-4 w-4" />
                  Acceder
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <button 
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
            {user ? (
              <>
                 <div className="flex items-center justify-between p-2">
                    <span className="text-sm font-medium">Notificaciones</span>
                    <Badge variant="secondary">3</Badge>
                 </div>
                 <Link href={user.rol === 'CLIENTE' ? "/dashboard-client" : "/dashboard-young"}>
                  <a onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-muted rounded-md">
                    <User className="h-4 w-4" /> Mi Dashboard
                  </a>
                </Link>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start" 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                </Button>
              </>
            ) : (
              <Link href="/auth">
                <Button className="w-full bg-primary font-serif">Acceder</Button>
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 mt-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-primary">Oficios & Educación</h3>
            <p className="text-muted-foreground leading-relaxed">
              Conectando talento joven con oportunidades reales. 
              Formación, empleo y crecimiento en una sola plataforma.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/"><a className="hover:text-primary">Inicio</a></Link></li>
              {user && (
                 <li>
                   <Link href={user.rol === 'CLIENTE' ? "/dashboard-client" : "/dashboard-young"}>
                     <a className="hover:text-primary">Mi Dashboard</a>
                   </Link>
                 </li>
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>soporte@plataforma.com</li>
              <li>+1 234 567 890</li>
              <li>Zona Centro, Ciudad Digital</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border text-center text-muted-foreground text-xs">
          © 2024 Plataforma de Oficios y Educación Digital. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
