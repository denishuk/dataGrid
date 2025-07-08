# Advanced React DataTable

## Overview

This is a comprehensive React application featuring an advanced DataTable component with TypeScript support. The application demonstrates sophisticated data grid functionality including sorting, filtering, grouping, pagination, and export capabilities. The project includes both a client-side implementation and preparation for NPM package distribution.

## System Architecture

### Frontend Architecture
- **React 18+** with TypeScript for type safety
- **Vite** as the build tool and development server
- **Tailwind CSS** for styling with custom CSS variables
- **Radix UI** components for accessible UI primitives
- **TanStack React Query** for data fetching and state management
- **Wouter** for lightweight client-side routing

### Backend Architecture
- **Express.js** server with TypeScript
- **Session-based** state management with express-session
- **RESTful API** endpoints for employee data management
- **In-memory storage** implementation for demonstration

### Database Integration
- **Drizzle ORM** configured for PostgreSQL
- **Zod** schema validation for type-safe data operations
- **Neon Database** integration ready (requires DATABASE_URL)

## Key Components

### DataTable Component
The core component provides:
- **Multi-column sorting** with visual indicators
- **Advanced filtering** with column-specific operators
- **Hierarchical grouping** with drag-and-drop reordering
- **Pinned columns** (left/right) with shadow effects
- **Inline editing** with type-specific editors
- **Pagination** with configurable page sizes
- **Export functionality** (CSV and optional PDF)
- **Column management** (show/hide, reorder, resize)
- **Responsive design** with mobile support

### UI Components
- **Radix UI primitives** for accessibility
- **Custom components** built with Tailwind CSS
- **Shadcn/ui** component library integration
- **Consistent theming** with CSS custom properties

### Testing Infrastructure
- **Vitest** with jsdom environment
- **React Testing Library** for component testing
- **V8 coverage** provider with multiple report formats
- **Comprehensive test suite** with 70%+ coverage targets

## Data Flow

1. **Server-side**: Express server provides RESTful API endpoints
2. **Client-side**: React Query manages data fetching and caching
3. **Component State**: useDataTable hook manages table state
4. **Rendering**: Virtual scrolling for large datasets (optional)
5. **Interactions**: Real-time filtering, sorting, and grouping

## External Dependencies

### Core Dependencies
- **React ecosystem**: react, react-dom, react-query
- **UI libraries**: @radix-ui/*, lucide-react, tailwind-merge
- **Development tools**: typescript, vite, vitest
- **Backend**: express, drizzle-orm, zod

### NPM Package Dependencies
- **Peer dependencies**: React 18+ with flexible version support
- **Build tools**: Vite with custom configuration
- **Type definitions**: Complete TypeScript support

## Deployment Strategy

### Development
- **Vite dev server** with hot module replacement
- **Express server** with middleware integration
- **Replit integration** with runtime error overlay

### Production Build
- **Client build**: Vite builds to `dist/public`
- **Server build**: esbuild bundles to `dist/index.js`
- **NPM package**: Separate build process for package distribution

### Package Distribution
- **NPM package** ready for publication
- **Multiple formats**: ES modules and CommonJS
- **Complete documentation** and examples
- **Automated build process** with shell scripts

## Changelog

- July 08, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.