import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Users, BookOpen, Briefcase } from "lucide-react";
import { Link } from "wouter";
// Import generated image
import heroImage from "@assets/generated_images/elegant_hero_image_of_young_professionals_learning_digital_skills.png";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-32 md:pt-24 md:pb-40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left-10 duration-700 fade-in">
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-foreground">
                El futuro del trabajo <br />
                <span className="text-primary italic">empieza aquí.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Conectamos a jóvenes talentosos con clientes que necesitan servicios de calidad. 
                Aprende, trabaja y crece en nuestra plataforma educativa y laboral.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth?role=joven">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-serif h-12 px-8 text-lg">
                    Soy Joven Talento
                  </Button>
                </Link>
                <Link href="/auth?role=cliente">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 font-serif h-12 px-8 text-lg">
                    Busco Servicios
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-in slide-in-from-right-10 duration-1000 fade-in delay-200">
              <div className="absolute -inset-4 bg-secondary/50 rounded-2xl blur-2xl -z-10"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-[4/3] group">
                 <img 
                  src={heroImage} 
                  alt="Jóvenes trabajando" 
                  className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="font-bold text-lg">Comunidad de Expertos</p>
                    <p className="text-white/80 text-sm">Más de 500 oficios digitales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-serif font-bold">1.5k+</div>
            <div className="text-primary-foreground/80 text-sm">Jóvenes Capacitados</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-serif font-bold">800+</div>
            <div className="text-primary-foreground/80 text-sm">Proyectos Completados</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-serif font-bold">98%</div>
            <div className="text-primary-foreground/80 text-sm">Clientes Satisfechos</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-serif font-bold">50+</div>
            <div className="text-primary-foreground/80 text-sm">Cursos Disponibles</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">¿Cómo funciona?</h2>
            <p className="text-muted-foreground">Un ecosistema diseñado para el crecimiento profesional y la satisfacción del cliente.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
              <CardContent className="pt-8 px-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto text-primary">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Educación Continua</h3>
                <p className="text-muted-foreground">Accede a cursos especializados para mejorar tus habilidades y aumentar tu valor en el mercado.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
              <CardContent className="pt-8 px-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Oportunidades Reales</h3>
                <p className="text-muted-foreground">Conectamos tus habilidades con clientes que buscan exactamente lo que sabes hacer.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card">
              <CardContent className="pt-8 px-8 pb-8 text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Comunidad Segura</h3>
                <p className="text-muted-foreground">Sistema de reseñas y verificaciones para garantizar confianza entre todas las partes.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary font-serif">¿Listo para empezar?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/auth?role=joven">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-serif h-14 px-10 text-lg shadow-lg hover:shadow-xl transition-all">
                Únete como Talento
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
