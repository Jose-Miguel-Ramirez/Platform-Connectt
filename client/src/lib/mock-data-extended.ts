import { Role } from "./mock-data";

// ... existing types ...

export interface Message {
  id: string;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Review {
  id: number;
  serviceRequestId: number;
  reviewerId: number;
  rating: number; // 1-5
  comment: string;
  date: string;
  tags: string[]; // e.g. "Puntual", "Profesional"
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
}

export interface CourseModule {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  quiz?: QuizQuestion[];
}

// Update existing Course interface
export interface Course {
  id: number;
  nombre: string;
  descripcion: string;
  skillAsociado: string;
  nivel: 'Básico' | 'Intermedio' | 'Avanzado';
  imagen?: string;
  modules: CourseModule[];
}

// ... existing Mock Data ...

// New Mock Data

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: 101, // Client
    receiverId: 201, // Young Talent
    content: 'Hola, vi tu perfil y me interesa para el trabajo de diseño.',
    timestamp: '2023-10-25T10:30:00',
    read: true,
  },
  {
    id: '2',
    senderId: 201,
    receiverId: 101,
    content: '¡Hola! Claro, me encantaría ayudar. ¿Podrías darme más detalles?',
    timestamp: '2023-10-25T10:35:00',
    read: false,
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    serviceRequestId: 3,
    reviewerId: 103,
    rating: 5,
    comment: "Excelente trabajo, muy profesional y entregó antes de tiempo.",
    date: "2023-10-21",
    tags: ["Puntual", "Creativo", "Recomendado"]
  }
];

export const MOCK_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es la etiqueta HTML correcta para el encabezado más grande?",
    options: ["<head>", "<h6>", "<h1>", "<header>"],
    correctOption: 2
  },
  {
    id: 2,
    question: "¿Qué propiedad de CSS se usa para cambiar el color del texto?",
    options: ["text-color", "fg-color", "color", "font-color"],
    correctOption: 2
  }
];

// Update Courses with Modules
export const MOCK_COURSES_EXTENDED: Course[] = [
  {
    id: 1,
    nombre: 'Introducción a la Carpintería',
    descripcion: 'Aprende los fundamentos de la madera y herramientas básicas.',
    skillAsociado: 'Carpintería',
    nivel: 'Básico',
    modules: [
      { id: 1, title: 'Herramientas Manuales', duration: '45m', completed: true },
      { id: 2, title: 'Tipos de Madera', duration: '60m', completed: false, quiz: MOCK_QUIZ }
    ]
  },
  {
    id: 2,
    nombre: 'Desarrollo Web con React',
    descripcion: 'Construye aplicaciones modernas desde cero.',
    skillAsociado: 'Programación Web',
    nivel: 'Intermedio',
    modules: [
      { id: 1, title: 'Componentes y Props', duration: '30m', completed: true },
      { id: 2, title: 'Hooks Básicos', duration: '45m', completed: true },
      { id: 3, title: 'Gestión de Estado', duration: '60m', completed: false, quiz: MOCK_QUIZ }
    ]
  },
  {
    id: 3,
    nombre: 'Marketing para Redes Sociales',
    descripcion: 'Estrategias para crecer tu audiencia orgánicamente.',
    skillAsociado: 'Marketing Digital',
    nivel: 'Básico',
    modules: [
       { id: 1, title: 'Definiendo tu Audiencia', duration: '40m', completed: false }
    ]
  },
];

// Re-export old data for compatibility but we should prefer extended
export * from "./mock-data"; 
