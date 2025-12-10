import { createContext, useContext, useState, ReactNode } from "react";
import { User, Role } from "./mock-data";
import { useLocation } from "wouter";

interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [location, setLocation] = useLocation();

  const login = (role: Role) => {
    // Mock user data
    const mockUser: User = {
      id: role === 'CLIENTE' ? 101 : 201,
      nombre: role === 'CLIENTE' ? 'Cliente Demo' : 'Joven Talento',
      email: 'demo@example.com',
      rol: role
    };
    setUser(mockUser);
    
    // Redirect based on role
    if (role === 'CLIENTE') {
      setLocation("/dashboard-client");
    } else {
      setLocation("/dashboard-young");
    }
  };

  const logout = () => {
    setUser(null);
    setLocation("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
