// Mock Data reflecting the JPA Entities requested

export type Role = 'JOVEN' | 'CLIENTE' | 'ADMIN';

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: Role;
}

export interface Skill {
  id: number;
  nombre: string;
}

export interface YoungProfile {
  id: number;
  userId: number;
  bio: string;
  zona: string;
  disponibilidad: string;
  skills: Skill[];
  ratingPromedio: number;
}

export interface ServiceRequest {
  id: number;
  clientId: number;
  clientName: string;
  skill: string;
  descripcion: string;
  zona: string;
  fechaHora: string;
  estado: 'PENDIENTE' | 'ASIGNADA' | 'COMPLETADA' | 'CANCELADA';
  precioEstimado: number;
}

export interface Course {
  id: number;
  nombre: string;
  descripcion: string;
  skillAsociado: string;
  nivel: 'Básico' | 'Intermedio' | 'Avanzado';
  imagen?: string;
}

// MOCK DATA

export const MOCK_SKILLS: Skill[] = [
  { id: 1, nombre: 'Carpintería' },
  { id: 2, nombre: 'Electricidad' },
  { id: 3, nombre: 'Programación Web' },
  { id: 4, nombre: 'Diseño Gráfico' },
  { id: 5, nombre: 'Marketing Digital' },
];

export const MOCK_REQUESTS: ServiceRequest[] = [
  {
    id: 1,
    clientId: 101,
    clientName: 'Restaurante El Buen Sabor',
    skill: 'Diseño Gráfico',
    descripcion: 'Necesitamos un nuevo menú diseñado para la temporada de verano.',
    zona: 'Centro',
    fechaHora: '2023-10-15 10:00',
    estado: 'PENDIENTE',
    precioEstimado: 1500,
  },
  {
    id: 2,
    clientId: 102,
    clientName: 'Ana García',
    skill: 'Electricidad',
    descripcion: 'Reparación de cableado en cocina doméstica.',
    zona: 'Norte',
    fechaHora: '2023-10-16 14:00',
    estado: 'ASIGNADA',
    precioEstimado: 800,
  },
  {
    id: 3,
    clientId: 103,
    clientName: 'Tech Startups Inc',
    skill: 'Programación Web',
    descripcion: 'Landing page para nuevo producto SaaS.',
    zona: 'Remoto',
    fechaHora: '2023-10-20 09:00',
    estado: 'COMPLETADA',
    precioEstimado: 5000,
  },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 1,
    nombre: 'Introducción a la Carpintería',
    descripcion: 'Aprende los fundamentos de la madera y herramientas básicas.',
    skillAsociado: 'Carpintería',
    nivel: 'Básico',
  },
  {
    id: 2,
    nombre: 'Desarrollo Web con React',
    descripcion: 'Construye aplicaciones modernas desde cero.',
    skillAsociado: 'Programación Web',
    nivel: 'Intermedio',
  },
  {
    id: 3,
    nombre: 'Marketing para Redes Sociales',
    descripcion: 'Estrategias para crecer tu audiencia orgánicamente.',
    skillAsociado: 'Marketing Digital',
    nivel: 'Básico',
  },
];

export const MOCK_YOUNG_PROFILES: YoungProfile[] = [
  {
    id: 1,
    userId: 201,
    bio: 'Estudiante de ingeniería apasionado por el desarrollo web y la tecnología.',
    zona: 'Sur',
    disponibilidad: 'Fines de semana',
    skills: [MOCK_SKILLS[2], MOCK_SKILLS[4]],
    ratingPromedio: 4.8,
  }
];
