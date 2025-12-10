import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MOCK_COURSES_EXTENDED, MOCK_REQUESTS, MOCK_YOUNG_PROFILES, Course } from "@/lib/mock-data-extended";
import { Star, Clock, MapPin, CheckCircle, BookOpen, PlayCircle, Check, Award, FileText, Download, Share2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ChatWidget } from "@/components/chat-widget";
import { StatsDashboard } from "@/components/stats-dashboard";
import { QuizModal } from "@/components/quiz-modal";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { ScheduleCalendar } from "@/components/schedule-calendar";

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
        {/* Modern Profile Header with Cover */}
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm animate-in fade-in slide-in-from-top-4">
          <div className="h-32 bg-gradient-to-r from-primary to-primary/60"></div>
          <div className="px-6 pb-6 pt-0 flex flex-col md:flex-row gap-6 items-start">
             <div className="-mt-12 relative">
               <Avatar className="h-24 w-24 border-4 border-card shadow-lg">
                 <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.userId}`} />
                 <AvatarFallback>YT</AvatarFallback>
               </Avatar>
               <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-card" title="Online"></div>
             </div>
             
             <div className="flex-1 mt-2 space-y-1">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                 <div>
                   <h1 className="text-2xl font-serif font-bold text-foreground">Joven Talento</h1>
                   <p className="text-muted-foreground text-sm flex items-center gap-2">
                     <MapPin className="h-3 w-3" /> {profile.zona} • {profile.bio}
                   </p>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="text-right">
                     <div className="text-2xl font-bold font-serif text-primary">{profile.ratingPromedio}</div>
                     <div className="text-xs text-muted-foreground">Rating</div>
                   </div>
                   <div className="h-8 w-px bg-border"></div>
                   <div className="text-right">
                     <div className="text-2xl font-bold font-serif text-primary">98%</div>
                     <div className="text-xs text-muted-foreground">Éxito</div>
                   </div>
                 </div>
               </div>
               
               <div className="flex flex-wrap gap-2 pt-2">
                 {profile.skills.map(skill => (
                   <Badge key={skill.id} variant="secondary" className="bg-secondary/50 hover:bg-secondary/70 text-secondary-foreground">
                     {skill.nombre}
                   </Badge>
                 ))}
                 <Badge variant="outline" className="border-dashed">+ Agregar Skill</Badge>
               </div>
             </div>
          </div>
        </div>

        <Tabs defaultValue="available" className="w-full">
          <TabsList className="mb-6 h-auto p-1 bg-muted/30 rounded-full border border-border/50 flex-wrap justify-start overflow-auto">
            <TabsTrigger value="available" className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 min-w-[120px]">Oportunidades</TabsTrigger>
            <TabsTrigger value="courses" className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 min-w-[120px]">Mis Cursos</TabsTrigger>
            <TabsTrigger value="agenda" className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 min-w-[120px]">Agenda</TabsTrigger>
            <TabsTrigger value="stats" className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 min-w-[120px]">Estadísticas</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingRequests.map(req => {
                const isApplied = appliedJobs.has(req.id);
                // Mock match score based on skill
                const matchScore = profile.skills.some(s => s.nombre === req.skill) ? 95 : 60;
                
                return (
                  <Card key={req.id} className="group hover:shadow-xl transition-all duration-300 border-border/60 hover:border-primary/30 flex flex-col relative overflow-hidden">
                    {matchScore > 80 && (
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                        {matchScore}% MATCH
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">{req.skill}</Badge>
                      </div>
                      <CardTitle className="text-lg font-serif leading-tight group-hover:text-primary transition-colors">{req.clientName}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-1">{req.descripcion}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-3">
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-2xl font-bold text-primary">L {req.precioEstimado}</span>
                        <span className="text-xs text-muted-foreground">estimado</span>
                      </div>
                      <div className="space-y-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-primary" /> {req.zona}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-primary" /> {req.fechaHora}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        className={`w-full font-serif shadow-sm ${isApplied ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'}`}
                        onClick={() => handleApply(req.id)}
                        disabled={isApplied}
                      >
                        {isApplied ? (
                          <>
                            <Check className="mr-2 h-4 w-4" /> Aplicado
                          </>
                        ) : "Aplicar Ahora"}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 gap-6">
              {MOCK_COURSES_EXTENDED.map(course => (
                <Card key={course.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-all border-border/60 group">
                  <div className="h-40 bg-secondary/20 flex items-center justify-center relative overflow-hidden cursor-pointer" onClick={() => handleContinueCourse(course)}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    {/* Abstract Pattern Background */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
                    
                    <div className="relative z-10 text-center">
                       <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                         <PlayCircle className="h-6 w-6 fill-white/20" />
                       </div>
                       <p className="text-white text-xs font-medium tracking-wide uppercase">Continuar</p>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-1">
                      <Badge variant="secondary" className="text-[10px] px-2 h-5">{course.nivel}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 2h 15m
                      </span>
                    </div>
                    <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">{course.nombre}</CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 pb-4">
                     <div className="space-y-2">
                       <div className="flex justify-between text-xs font-medium text-muted-foreground">
                         <span>Progreso General</span>
                         <span>{courseProgress[course.id] || 0}%</span>
                       </div>
                       <Progress value={courseProgress[course.id] || 0} className="h-2 bg-secondary/50" />
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="agenda" className="animate-in fade-in duration-500">
             <div className="grid md:grid-cols-3 gap-6">
               <div className="md:col-span-2">
                 <ScheduleCalendar />
               </div>
               <div className="space-y-4">
                 <Card className="bg-primary/5 border-none">
                    <CardHeader>
                      <CardTitle className="text-lg">Próximos Recordatorios</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-3 items-start">
                        <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Entrega de Proyecto</p>
                          <p className="text-xs text-muted-foreground">En 2 días</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start">
                        <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Completar Perfil</p>
                          <p className="text-xs text-muted-foreground">Aumenta tu visibilidad</p>
                        </div>
                      </div>
                    </CardContent>
                 </Card>
               </div>
             </div>
          </TabsContent>
          
          <TabsContent value="stats" className="animate-in fade-in duration-500">
             <StatsDashboard role="JOVEN" />
          </TabsContent>
        </Tabs>

        {/* Enhanced Course Player Dialog */}
        <Dialog open={!!activeCourse} onOpenChange={(open) => !open && setActiveCourse(null)}>
          <DialogContent className="sm:max-w-[900px] h-[95vh] sm:h-[85vh] p-0 gap-0 overflow-hidden flex flex-col bg-background">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between bg-card z-10">
              <div>
                <DialogTitle className="text-lg font-serif">{activeCourse?.nombre}</DialogTitle>
                <DialogDescription className="text-xs">
                  {activeCourse?.skillAsociado} • Lección 1 de {activeCourse?.modules?.length || 5}
                </DialogDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setActiveCourse(null)}>Cerrar</Button>
            </div>
            
            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
              {/* Main Content Area (Video & Tabs) */}
              <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Video Player Mock */}
                <div className="aspect-video bg-black relative group shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="icon" className="h-16 w-16 rounded-full bg-primary/90 hover:bg-primary hover:scale-105 transition-all shadow-2xl border-4 border-white/10">
                      <PlayCircle className="h-8 w-8 ml-1" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="h-1 bg-white/30 rounded-full w-full mb-3 cursor-pointer hover:h-2 transition-all">
                        <div className="h-full bg-primary w-1/3 rounded-full relative">
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow scale-0 group-hover:scale-100 transition-transform"></div>
                        </div>
                     </div>
                     <div className="flex justify-between items-center text-white">
                        <div className="flex gap-4 text-xs font-medium">
                          <span>05:20 / 15:00</span>
                        </div>
                        <div className="flex gap-2">
                           {/* Controls Icons Mock */}
                           <div className="h-4 w-4 bg-white/20 rounded"></div>
                           <div className="h-4 w-4 bg-white/20 rounded"></div>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Course Content Tabs */}
                <div className="flex-1 bg-background">
                  <Tabs defaultValue="content" className="w-full h-full flex flex-col">
                    <div className="px-4 pt-2 border-b">
                       <TabsList className="bg-transparent h-auto p-0 gap-6">
                         <TabsTrigger value="content" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-0 py-3">Contenido</TabsTrigger>
                         <TabsTrigger value="resources" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-0 py-3">Recursos</TabsTrigger>
                         <TabsTrigger value="notes" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none px-0 py-3">Mis Notas</TabsTrigger>
                       </TabsList>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 bg-muted/5">
                      <TabsContent value="content" className="mt-0 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                           <h3 className="font-bold text-lg">Módulos del Curso</h3>
                           <Badge variant="outline" className="gap-1 bg-background">
                             <Award className="h-3 w-3 text-yellow-500" /> Certificado disponible
                           </Badge>
                        </div>
                        
                        <div className="space-y-3">
                           {activeCourse?.modules?.map((mod, idx) => (
                             <div key={mod.id} className={`p-4 rounded-xl border transition-all hover:border-primary/30 ${mod.completed ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                     <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${mod.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                       {mod.completed ? <Check className="h-4 w-4" /> : idx + 1}
                                     </div>
                                     <div>
                                       <p className={`font-medium text-sm ${mod.completed ? 'text-primary' : 'text-foreground'}`}>{mod.title}</p>
                                       <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                         <Clock className="h-3 w-3" /> {mod.duration}
                                       </p>
                                     </div>
                                  </div>
                                  <div className="flex gap-2">
                                    {mod.quiz && (
                                      <Button size="sm" variant="secondary" className="h-8 text-xs" onClick={() => setShowQuiz(true)}>
                                        Quiz
                                      </Button>
                                    )}
                                    <Button size="sm" variant={mod.completed ? "ghost" : "outline"} className="h-8 w-8 p-0 rounded-full">
                                      <PlayCircle className="h-4 w-4" />
                                    </Button>
                                  </div>
                               </div>
                             </div>
                           ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="resources" className="mt-0">
                         <div className="space-y-4">
                           <h3 className="font-bold">Material Descargable</h3>
                           <Card>
                             <CardContent className="p-0 divide-y">
                               <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                                  <div className="flex items-center gap-3">
                                     <div className="bg-red-100 p-2 rounded-lg text-red-600">
                                       <FileText className="h-5 w-5" />
                                     </div>
                                     <div>
                                       <p className="font-medium text-sm">Guía de Estudio.pdf</p>
                                       <p className="text-xs text-muted-foreground">2.4 MB • PDF</p>
                                     </div>
                                  </div>
                                  <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                               </div>
                               <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                                  <div className="flex items-center gap-3">
                                     <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                       <Share2 className="h-5 w-5" />
                                     </div>
                                     <div>
                                       <p className="font-medium text-sm">Ejercicios Prácticos.zip</p>
                                       <p className="text-xs text-muted-foreground">15 MB • ZIP</p>
                                     </div>
                                  </div>
                                  <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                               </div>
                             </CardContent>
                           </Card>
                         </div>
                      </TabsContent>

                      <TabsContent value="notes" className="mt-0 h-full">
                         <div className="flex flex-col h-full space-y-4">
                           <div className="flex justify-between items-center">
                             <h3 className="font-bold">Mis Notas</h3>
                             <span className="text-xs text-muted-foreground">Se guardan automáticamente</span>
                           </div>
                           <Textarea 
                             placeholder="Escribe tus notas aquí..." 
                             className="flex-1 min-h-[200px] bg-card resize-none p-4 leading-relaxed"
                           />
                           <Button className="self-end">Guardar Nota</Button>
                         </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
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
