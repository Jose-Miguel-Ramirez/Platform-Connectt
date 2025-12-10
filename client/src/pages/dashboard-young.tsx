import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MOCK_COURSES_EXTENDED, MOCK_REQUESTS, MOCK_YOUNG_PROFILES, Course } from "@/lib/mock-data-extended";
import { Star, Clock, MapPin, CheckCircle, BookOpen, PlayCircle, Check, Award } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ChatWidget } from "@/components/chat-widget";
import { StatsDashboard } from "@/components/stats-dashboard";
import { QuizModal } from "@/components/quiz-modal";

export default function YoungDashboard() {
  const { toast } = useToast();
  const profile = MOCK_YOUNG_PROFILES[0];
  const pendingRequests = MOCK_REQUESTS.filter(r => r.estado === 'PENDIENTE');
  
  // State for interactivity
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [courseProgress, setCourseProgress] = useState<Record<number, number>>({
    1: 65,
    2: 30,
    3: 0
  });

  const handleApply = (id: number) => {
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
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Profile */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6 flex flex-col md:flex-row gap-6 items-start md:items-center animate-in fade-in slide-in-from-top-4">
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
          <TabsList className="mb-6 bg-muted/50 p-1">
            <TabsTrigger value="available" className="flex-1">Oportunidades</TabsTrigger>
            <TabsTrigger value="courses" className="flex-1">Mis Cursos</TabsTrigger>
            <TabsTrigger value="stats" className="flex-1">Estadísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingRequests.map(req => {
                const isApplied = appliedJobs.has(req.id);
                return (
                  <Card key={req.id} className="hover:shadow-lg transition-shadow border-t-4 border-t-primary flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">{req.skill}</Badge>
                        <span className="font-bold text-primary">L {req.precioEstimado}</span>
                      </div>
                      <CardTitle className="text-lg">{req.clientName}</CardTitle>
                      <CardDescription className="line-clamp-2">{req.descripcion}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
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
            {pendingRequests.length === 0 && (
               <div className="text-center py-12 border-2 border-dashed rounded-xl">
                 <p className="text-muted-foreground">No hay oportunidades disponibles en este momento.</p>
               </div>
            )}
          </TabsContent>

          <TabsContent value="courses" className="space-y-6 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 gap-6">
              {MOCK_COURSES_EXTENDED.map(course => (
                <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-32 bg-secondary/20 flex items-center justify-center relative group cursor-pointer overflow-hidden" onClick={() => handleContinueCourse(course)}>
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                    <BookOpen className="h-12 w-12 text-primary/40 group-hover:opacity-0 transition-opacity" />
                    <PlayCircle className="h-16 w-16 text-primary absolute opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 duration-300" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="secondary">{course.nivel}</Badge>
                      <span className="text-xs text-muted-foreground">Módulo 1/2</span>
                    </div>
                    <CardTitle className="line-clamp-1">{course.nombre}</CardTitle>
                    <CardDescription className="line-clamp-1">{course.descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                     <div className="space-y-1">
                       <div className="flex justify-between text-xs font-medium">
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
          
          <TabsContent value="stats" className="animate-in fade-in duration-500">
             <StatsDashboard role="JOVEN" />
          </TabsContent>
        </Tabs>

        {/* Course Dialog */}
        <Dialog open={!!activeCourse} onOpenChange={(open) => !open && setActiveCourse(null)}>
          <DialogContent className="sm:max-w-[800px] h-[90vh] sm:h-auto overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">{activeCourse?.nombre}</DialogTitle>
              <DialogDescription>
                Nivel: {activeCourse?.nivel} | {activeCourse?.skillAsociado}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6 space-y-6">
              {/* Video Player Mock */}
              <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-50"></div>
                <PlayCircle className="h-24 w-24 text-white/90 cursor-pointer hover:text-white hover:scale-110 transition-all z-10 drop-shadow-lg" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                   <div className="h-1 bg-white/30 rounded-full w-full mb-2">
                      <div className="h-full bg-primary w-1/3 rounded-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow"></div>
                      </div>
                   </div>
                   <div className="flex justify-between text-white/90 text-xs font-medium">
                      <span>05:20</span>
                      <span>15:00</span>
                   </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <h3 className="font-bold text-lg">Módulos del Curso</h3>
                   <Badge variant="outline" className="gap-1">
                     <Award className="h-3 w-3" /> Certificado al completar
                   </Badge>
                </div>
                
                <div className="space-y-2">
                   {activeCourse?.modules?.map((mod, idx) => (
                     <div key={mod.id} className={`p-4 rounded-lg border flex items-center justify-between ${mod.completed ? 'bg-muted/50 border-transparent' : 'bg-card border-border'}`}>
                        <div className="flex items-center gap-3">
                           <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${mod.completed ? 'bg-green-100 text-green-700' : 'bg-secondary text-primary'}`}>
                             {mod.completed ? <Check className="h-4 w-4" /> : idx + 1}
                           </div>
                           <div>
                             <p className="font-medium text-sm">{mod.title}</p>
                             <p className="text-xs text-muted-foreground">{mod.duration}</p>
                           </div>
                        </div>
                        {mod.quiz && (
                          <Button size="sm" variant="secondary" onClick={() => setShowQuiz(true)}>
                            Realizar Quiz
                          </Button>
                        )}
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setActiveCourse(null)}>Cerrar</Button>
              <Button className="bg-primary">Siguiente Lección</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Quiz Modal */}
        {activeCourse?.modules?.[1]?.quiz && (
           <QuizModal 
             isOpen={showQuiz} 
             onClose={() => setShowQuiz(false)} 
             questions={activeCourse.modules[1].quiz}
             courseTitle={activeCourse.nombre}
           />
        )}
      </div>
      <ChatWidget />
    </Layout>
  );
}
