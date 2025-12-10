import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_COURSES, MOCK_REQUESTS, MOCK_YOUNG_PROFILES } from "@/lib/mock-data";
import { Star, Clock, MapPin, CheckCircle, BookOpen } from "lucide-react";

export default function YoungDashboard() {
  const profile = MOCK_YOUNG_PROFILES[0];
  const pendingRequests = MOCK_REQUESTS.filter(r => r.estado === 'PENDIENTE');

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
              {pendingRequests.map(req => (
                <Card key={req.id} className="hover:shadow-lg transition-shadow border-t-4 border-t-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">{req.skill}</Badge>
                      <span className="font-bold text-primary">${req.precioEstimado}</span>
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
                    <Button className="w-full bg-primary font-serif">Aplicar</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {MOCK_COURSES.map(course => (
                <Card key={course.id} className="flex flex-col overflow-hidden">
                  <div className="h-32 bg-secondary/20 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-primary/40" />
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
                         <span>65%</span>
                       </div>
                       <Progress value={65} className="h-2" />
                     </div>
                  </CardContent>
                  <CardFooter className="mt-auto pt-4">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">Continuar Aprendiendo</Button>
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
      </div>
    </Layout>
  );
}
