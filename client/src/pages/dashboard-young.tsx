import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MOCK_COURSES, MOCK_REQUESTS, MOCK_YOUNG_PROFILES, Course } from "@/lib/mock-data";
import { Star, Clock, MapPin, CheckCircle, BookOpen, PlayCircle, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function YoungDashboard() {
  const { toast } = useToast();
  const profile = MOCK_YOUNG_PROFILES[0];
  const pendingRequests = MOCK_REQUESTS.filter(r => r.estado === 'PENDIENTE');
  
  // State for interactivity
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [courseProgress, setCourseProgress] = useState<Record<number, number>>({
    1: 65,
    2: 30,
    3: 0
  });

  const handleApply = (id: number) => {
    // Simulate API call
    toast({
      title: "Aplicación enviada",
      description: "El cliente recibirá tu perfil. ¡Buena suerte!",
    });
    
    setAppliedJobs(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const handleContinueCourse = (course: Course) => {
    setActiveCourse(course);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Profile */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.userId}`} />
            <AvatarFallback>YT</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-serif font-bold text-primary">Hola, Joven Talento</h1>
            <p className="text-muted-foreground">{profile.bio}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.skills.map(skill => (
                <Badge key={skill.id} variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  {skill.nombre}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
             <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
               <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
               <span className="font-bold text-yellow-700">{profile.ratingPromedio}</span>
             </div>
             <p className="text-xs text-muted-foreground">Rating Promedio</p>
          </div>
        </div>

        <Tabs defaultValue="available" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="available">Oportunidades Disponibles</TabsTrigger>
            <TabsTrigger value="courses">Mis Cursos</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingRequests.map(req => {
                const isApplied = appliedJobs.has(req.id);
                return (
                  <Card key={req.id} className="hover:shadow-lg transition-shadow border-t-4 border-t-primary">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">{req.skill}</Badge>
                        <span className="font-bold text-primary">L {req.precioEstimado}</span>
                      </div>
                      <CardTitle className="text-lg">{req.clientName}</CardTitle>
                      <CardDescription className="line-clamp-2">{req.descripcion}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" /> {req.zona}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" /> {req.fechaHora}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className={`w-full font-serif ${isApplied ? 'bg-green-600 hover:bg-green-700' : 'bg-primary'}`}
                        onClick={() => handleApply(req.id)}
                        disabled={isApplied}
                      >
                        {isApplied ? (
                          <>
                            <Check className="mr-2 h-4 w-4" /> Aplicado
                          </>
                        ) : "Aplicar"}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {MOCK_COURSES.map(course => (
                <Card key={course.id} className="flex flex-col overflow-hidden">
                  <div className="h-32 bg-secondary/20 flex items-center justify-center relative group cursor-pointer" onClick={() => handleContinueCourse(course)}>
                    <BookOpen className="h-12 w-12 text-primary/40 group-hover:opacity-0 transition-opacity" />
                    <PlayCircle className="h-16 w-16 text-primary absolute opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge>{course.nivel}</Badge>
                      <span className="text-xs text-muted-foreground">En progreso</span>
                    </div>
                    <CardTitle>{course.nombre}</CardTitle>
                    <CardDescription>{course.descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                     <div className="space-y-1">
                       <div className="flex justify-between text-xs">
                         <span>Progreso</span>
                         <span>{courseProgress[course.id] || 0}%</span>
                       </div>
                       <Progress value={courseProgress[course.id] || 0} className="h-2" />
                     </div>
                  </CardContent>
                  <CardFooter className="mt-auto pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary/5"
                      onClick={() => handleContinueCourse(course)}
                    >
                      Continuar Aprendiendo
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="text-center py-12 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Aún no tienes trabajos completados en tu historial.</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Course Dialog */}
        <Dialog open={!!activeCourse} onOpenChange={(open) => !open && setActiveCourse(null)}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">{activeCourse?.nombre}</DialogTitle>
              <DialogDescription>
                Nivel: {activeCourse?.nivel} | {activeCourse?.skillAsociado}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              <div className="aspect-video bg-black/90 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="w-full">
                    <div className="h-1 bg-white/30 rounded-full w-full mb-2">
                      <div className="h-full bg-primary w-1/3 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-white/80 text-xs">
                      <span>05:20</span>
                      <span>15:00</span>
                    </div>
                  </div>
                </div>
                <PlayCircle className="h-20 w-20 text-white/80 cursor-pointer hover:text-white hover:scale-105 transition-all" />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Contenido del Módulo 1</h3>
                <p className="text-muted-foreground leading-relaxed">
                  En esta lección aprenderemos los conceptos fundamentales necesarios para dominar esta habilidad. 
                  Comenzaremos con una introducción teórica y luego pasaremos a ejercicios prácticos.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-sm mb-2">Recursos Descargables</h4>
                  <ul className="text-sm space-y-1 text-primary">
                    <li className="hover:underline cursor-pointer">• Guía de estudio (PDF)</li>
                    <li className="hover:underline cursor-pointer">• Archivos de práctica (ZIP)</li>
                  </ul>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setActiveCourse(null)}>Cerrar</Button>
              <Button className="bg-primary">Siguiente Lección</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
