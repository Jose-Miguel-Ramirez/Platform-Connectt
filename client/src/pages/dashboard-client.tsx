import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Calendar, MapPin, DollarSign, Filter } from "lucide-react";
import { MOCK_REQUESTS, MOCK_SKILLS } from "@/lib/mock-data-extended"; // Updated import
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { ResponsiveTable } from "@/components/responsive-table";
import { StatsDashboard } from "@/components/stats-dashboard";
import { ChatWidget } from "@/components/chat-widget";

export default function ClientDashboard() {
  const { toast } = useToast();
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesSearch = req.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            req.skill.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || req.estado === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [requests, searchTerm, statusFilter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      setIsDialogOpen(false);
      toast({
        title: "Solicitud Creada",
        description: "Tu solicitud de servicio ha sido publicada exitosamente.",
      });
    }, 1000);
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

  const columns = [
    { header: "ID", accessorKey: "id" as keyof typeof requests[0], className: "w-[80px] font-medium" },
    { header: "Servicio", accessorKey: "skill" as keyof typeof requests[0], className: "font-semibold text-primary" },
    { header: "Descripción", accessorKey: "descripcion" as keyof typeof requests[0], className: "max-w-[200px] truncate text-muted-foreground" },
    { 
      header: "Ubicación", 
      cell: (item: any) => (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {item.zona}
        </div>
      )
    },
    { 
      header: "Fecha", 
      cell: (item: any) => (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" /> {item.fechaHora.split(' ')[0]}
        </div>
      )
    },
    { header: "Estado", cell: (item: any) => getStatusBadge(item.estado) },
    { header: "Precio", cell: (item: any) => <span className="font-medium">L {item.precioEstimado}</span>, className: "text-right" },
    { 
      header: "Acciones", 
      cell: () => (
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <span className="sr-only">Menu</span>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </Button>
      ),
      className: "text-right"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in slide-in-from-top-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Panel de Cliente</h1>
            <p className="text-muted-foreground">Gestiona tus solicitudes de servicio y contrataciones.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary font-serif gap-2 shadow-lg hover:shadow-xl transition-all">
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
                    <Label htmlFor="price">Presupuesto Estimado (L)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground font-bold text-sm">L</span>
                      <Input id="price" type="number" className="pl-8" placeholder="0.00" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary w-full" disabled={isLoading}>
                    {isLoading ? "Publicando..." : "Publicar Solicitud"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Solicitudes Activas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Invertido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">L 2,300</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Calificación Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.9/5.0</div>
            </CardContent>
          </Card>
        </div>

        <StatsDashboard role="CLIENTE" />

        {/* Requests Table with Controls */}
        <div className="space-y-4">
           <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar solicitud..." 
                  className="pl-8 bg-background" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                 <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">Todos</SelectItem>
                      <SelectItem value="PENDIENTE">Pendientes</SelectItem>
                      <SelectItem value="ASIGNADA">Asignadas</SelectItem>
                      <SelectItem value="COMPLETADA">Completadas</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
           </div>

           <ResponsiveTable 
             data={filteredRequests}
             columns={columns}
             keyExtractor={(item) => item.id}
             emptyMessage="No se encontraron solicitudes con estos filtros."
           />
        </div>
      </div>
      <ChatWidget />
    </Layout>
  );
}
