# Overview

This is a school management web application for managing student groups and students. Built as a React-based single-page application, it allows users to view groups, create new groups with descriptions, add students with contact information, and assign students to groups. The application demonstrates modern web development practices using React, TypeScript, Redux Toolkit for state management, and ShadCN UI components for the interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The application follows an adapted Feature-Sliced Design approach with modular organization:

**Component Structure**
- Reusable UI components built on ShadCN/Radix UI primitives
- Custom business components (GroupCard, StudentCard, Navigation) that compose base UI elements
- Page-level components handling routing and data orchestration
- Clear separation between presentational and container components

**State Management**
- Redux Toolkit for global state management with two primary slices: groups and students
- Local component state for form inputs and UI interactions
- Custom typed hooks (useAppDispatch, useAppSelector) for type-safe Redux access
- State organized by domain (groups, students) rather than by feature

**Routing**
- Wouter for lightweight client-side routing
- Three main routes: groups list, create group, add student
- No server-side rendering or authentication flows

**Styling**
- Tailwind CSS for utility-first styling
- CSS variables for theme customization
- Custom design tokens defined in index.css
- Responsive design patterns built into ShadCN components

**Form Handling**
- React Hook Form with Zod validation schemas (via @hookform/resolvers)
- Client-side validation with custom error messages
- Toast notifications for user feedback
- Controlled form inputs with real-time validation

## Backend Architecture

**Server Framework**
- Express.js with TypeScript for minimal API server
- Vite development server integration for HMR in development
- Static file serving for production builds

**Data Storage**
- In-memory storage implementation (MemStorage class) for development
- Interface-based storage design (IStorage) allowing easy swap to persistent storage
- Storage methods follow CRUD patterns
- Currently stores user data; group/student data lives in Redux on client

**Build System**
- Vite for frontend bundling and development
- esbuild for backend compilation
- TypeScript compilation with path aliases (@/, @shared/, @assets/)
- Separate client and server build outputs

## External Dependencies

**UI Framework**
- React 18 with TypeScript
- Radix UI primitives (@radix-ui/*) for accessible component foundations
- ShadCN UI component library (configured in components.json)
- Lucide React for icons

**State & Data**
- Redux Toolkit (@reduxjs/toolkit) for global state
- TanStack React Query (@tanstack/react-query) configured but not actively used
- Wouter for routing (lightweight alternative to React Router)

**Database (Configured but Not Used)**
- Drizzle ORM (drizzle-orm, drizzle-kit) with PostgreSQL dialect
- Neon Database serverless driver (@neondatabase/serverless)
- Database schema defined in shared/schema.ts for users table
- Migration support via drizzle-kit push command

**Styling**
- Tailwind CSS with PostCSS
- class-variance-authority for variant-based component styling
- clsx and tailwind-merge for className utilities

**Development Tools**
- Vite plugins for Replit integration (@replit/vite-plugin-*)
- TypeScript for type safety across client, server, and shared code
- ESModules throughout the codebase

**Note**: While Drizzle and PostgreSQL are configured in the project, the current implementation uses in-memory storage. The application can be extended to use persistent database storage by implementing the IStorage interface with Drizzle queries.