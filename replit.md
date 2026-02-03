# Oficios y Educación Digital - TalentoLab

## Overview

TalentoLab is a digital platform connecting young talent with clients who need professional services, while also providing educational courses. The platform serves two main user types: young professionals (JOVEN) seeking work opportunities and skill development, and clients (CLIENTE) looking to hire services. The system includes service request management, course progress tracking, messaging, and review capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state, React Context for auth state
- **Styling**: Tailwind CSS v4 with shadcn/ui component library (New York style)
- **Build Tool**: Vite with custom plugins for Replit integration
- **Fonts**: Playfair Display (serif headings) and Inter (body text) for elegant typography

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Development**: Hot module replacement via Vite middleware in development mode
- **Production**: Static file serving from compiled dist/public directory

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Current Storage**: In-memory storage implementation (MemStorage class) with interface ready for database migration

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components including shadcn/ui
│   │   ├── pages/        # Route page components
│   │   ├── lib/          # Utilities, mock data, auth context
│   │   └── hooks/        # Custom React hooks
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data storage interface
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared code between client/server
│   └── schema.ts     # Drizzle database schema
└── migrations/       # Drizzle database migrations
```

### Authentication Design
- Currently uses mock authentication with React Context
- Role-based access: JOVEN (young professional), CLIENTE (client), ADMIN
- Session management ready for connect-pg-simple integration
- Login redirects users to role-specific dashboards

### Key Design Patterns
- **Storage Interface**: IStorage interface abstracts data operations, allowing easy swap between MemStorage and database implementations
- **Mock Data**: Extensive mock data in `lib/mock-data.ts` and `lib/mock-data-extended.ts` for development
- **Responsive Design**: Components built with mobile-first approach, using ResponsiveTable pattern for data display
- **Dark Mode**: Theme toggle with CSS custom properties

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)
- **Drizzle Kit**: Schema migrations via `db:push` command

### UI Components
- **Radix UI**: Comprehensive primitive component library for accessibility
- **shadcn/ui**: Pre-built component collection using Radix primitives
- **Lucide React**: Icon library
- **Recharts**: Charting library for statistics dashboards
- **Embla Carousel**: Carousel component
- **Framer Motion**: Animation library (used in quiz modal)

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod integration for React Hook Form

### Development Tools
- **Vite**: Build tool with React plugin
- **esbuild**: Production server bundling
- **TypeScript**: Type checking across the stack

### Session Management (Ready for Implementation)
- **express-session**: Session middleware
- **connect-pg-simple**: PostgreSQL session store
- **memorystore**: Development session store alternative