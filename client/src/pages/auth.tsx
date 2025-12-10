import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";

export default function AuthPage() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Temporary state to handle role selection in login/register
  const [selectedRole, setSelectedRole] = useState<'CLIENTE' | 'JOVEN'>('CLIENTE');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bienvenido",
        description: "Has iniciado sesión correctamente.",
      });
      // Use auth context login
      login(selectedRole); 
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Cuenta creada",
        description: "Tu registro ha sido exitoso. Iniciando sesión...",
      });
      login(selectedRole);
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-muted/20">
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-primary mb-2">Bienvenido</h1>
            <p className="text-muted-foreground">Accede a la plataforma de oportunidades</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle>Acceder</CardTitle>
                  <CardDescription>Ingresa tus credenciales para continuar.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="usuario@ejemplo.com" required className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input id="password" type="password" required className="bg-background/50" />
                    </div>
                     {/* Temporary Role Selection for Prototype */}
                     <div className="space-y-2 pt-2 border-t">
                      <Label className="text-xs text-muted-foreground">Modo de prueba: Entrar como...</Label>
                      <div className="flex gap-2">
                         <Button 
                           type="button" 
                           variant={selectedRole === 'CLIENTE' ? 'default' : 'outline'}
                           size="sm"
                           onClick={() => setSelectedRole('CLIENTE')}
                           className="flex-1"
                         >
                           Cliente
                         </Button>
                         <Button 
                           type="button" 
                           variant={selectedRole === 'JOVEN' ? 'default' : 'outline'}
                           size="sm"
                           onClick={() => setSelectedRole('JOVEN')}
                           className="flex-1"
                         >
                           Joven Talento
                         </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary font-serif mt-4" disabled={isLoading}>
                      {isLoading ? "Cargando..." : "Ingresar"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="link" className="text-sm text-muted-foreground">
                    ¿Olvidaste tu contraseña?
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <CardTitle>Crear Cuenta</CardTitle>
                  <CardDescription>Únete a nuestra comunidad hoy.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" placeholder="Juan" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastname">Apellido</Label>
                        <Input id="lastname" placeholder="Pérez" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input id="reg-email" type="email" placeholder="usuario@ejemplo.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Contraseña</Label>
                      <Input id="reg-password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Soy...</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          className={`flex items-center space-x-2 border p-3 rounded-md cursor-pointer ${selectedRole === 'CLIENTE' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                          onClick={() => setSelectedRole('CLIENTE')}
                        >
                          <div className={`h-4 w-4 rounded-full border ${selectedRole === 'CLIENTE' ? 'border-[5px] border-primary' : 'border-input'}`}></div>
                          <span className="text-sm font-medium">Cliente</span>
                        </div>
                        <div 
                          className={`flex items-center space-x-2 border p-3 rounded-md cursor-pointer ${selectedRole === 'JOVEN' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                          onClick={() => setSelectedRole('JOVEN')}
                        >
                          <div className={`h-4 w-4 rounded-full border ${selectedRole === 'JOVEN' ? 'border-[5px] border-primary' : 'border-input'}`}></div>
                          <span className="text-sm font-medium">Joven Talento</span>
                        </div>
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-primary font-serif" disabled={isLoading}>
                      {isLoading ? "Creando cuenta..." : "Registrarse"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
