import { Link, useLocation } from "wouter";
import { Menu, X, Briefcase, GraduationCap, User, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard-young">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/dashboard-young') ? 'text-primary' : 'text-muted-foreground'}`}>
                Para Jóvenes
              </a>
            </Link>
            <Link href="/dashboard-client">
              <a className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/dashboard-client') ? 'text-primary' : 'text-muted-foreground'}`}>
                Para Clientes
              </a>
            </Link>
            <Link href="/auth">
              <Button variant="default" size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-serif">
                <LogIn className="h-4 w-4" />
                Acceder
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
            <Link href="/dashboard-young">
              <a onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-muted rounded-md">
                <GraduationCap className="h-4 w-4" /> Jóvenes
              </a>
            </Link>
            <Link href="/dashboard-client">
              <a onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium p-2 hover:bg-muted rounded-md">
                <User className="h-4 w-4" /> Clientes
              </a>
            </Link>
            <Link href="/auth">
              <Button className="w-full bg-primary font-serif">Acceder</Button>
            </Link>
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
              <li><Link href="/dashboard-young"><a className="hover:text-primary">Buscar Trabajo</a></Link></li>
              <li><Link href="/dashboard-client"><a className="hover:text-primary">Contratar Servicios</a></Link></li>
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
