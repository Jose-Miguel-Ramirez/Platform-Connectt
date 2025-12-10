import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Calendar, MapPin, DollarSign } from "lucide-react";
import { MOCK_REQUESTS, MOCK_SKILLS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ClientDashboard() {
  const { toast } = useToast();
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    toast({
      title: "Solicitud Creada",
      description: "Tu solicitud de servicio ha sido publicada exitosamente.",
    });
    // In a real app, we would append to the list here
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PENDIENTE': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pendiente</Badge>;
      case 'ASIGNADA': return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Asignada</Badge>;
      case 'COMPLETADA': return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Completada</Badge>;
      case 'CANCELADA': return <Badge variant="destructive">Cancelada</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Panel de Cliente</h1>
            <p className="text-muted-foreground">Gestiona tus solicitudes de servicio y contrataciones.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary font-serif gap-2">
                <Plus className="h-4 w-4" /> Nueva Solicitud
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Crear Solicitud de Servicio</DialogTitle>
                <DialogDescription>
                  Describe el servicio que necesitas para encontrar al joven talento ideal.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="skill">Tipo de Servicio</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_SKILLS.map(skill => (
                        <SelectItem key={skill.id} value={skill.nombre}>{skill.nombre}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="desc">Descripción Detallada</Label>
                  <Textarea id="desc" placeholder="Describe qué necesitas..." className="resize-none" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="zone">Zona / Ubicación</Label>
                    <Input id="zone" placeholder="Ej. Centro" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Presupuesto Estimado</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="price" type="number" className="pl-8" placeholder="0.00" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary w-full">Publicar Solicitud</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Solicitudes Activas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Invertido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,300</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Calificación Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.9/5.0</div>
            </CardContent>
          </Card>
        </div>

        {/* Requests Table */}
        <Card className="shadow-md border-none overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif">Mis Solicitudes</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar solicitud..." className="pl-8 bg-background" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium">#{req.id}</TableCell>
                    <TableCell className="font-semibold text-primary">{req.skill}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-muted-foreground">{req.descripcion}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {req.zona}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {req.fechaHora.split(' ')[0]}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(req.estado)}</TableCell>
                    <TableCell className="text-right font-medium">${req.precioEstimado}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Menu</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
