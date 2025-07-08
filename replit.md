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
- **Pinned columns** (left/right) with modern grid layout and shadow effects
- **Inline editing** with type-specific editors
- **Pagination** with configurable page sizes
- **Export functionality** (CSV and optional PDF)
- **Column management** (show/hide, reorder, resize)
- **Responsive design** with mobile support
- **Selection system** with Tailwind-based checkboxes tied to column definitions
- **Sticky headers/footers** with configurable positioning
- **Aggregation functions** (count, sum, avg, min, max) in footer when defined in column properties

### UI Components
- **Headless UI primitives** for accessibility (completely replaced @radix-ui)
- **Custom components** built with Tailwind CSS
- **Pure Tailwind CSS** implementation without external CSS files
- **Consistent theming** with CSS custom properties
- **Reduced bundle size** by removing @radix-ui dependencies

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
- **UI libraries**: @headlessui/react, lucide-react, tailwind-merge
- **Development tools**: typescript, vite, vitest
- **Backend**: express, drizzle-orm, zod

### NPM Package Dependencies
- **Peer dependencies**: React 18+ with flexible version support
- **Build tools**: Vite with custom configuration copying from main folder
- **Type definitions**: Complete TypeScript support with updated interfaces
- **No src folder**: Build process copies components from main folder dynamically

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
- July 08, 2025. Removed all CSS files and converted to pure Tailwind CSS classes
- July 08, 2025. Replaced Radix UI components with Headless UI for toast component
- July 08, 2025. Cleaned up all Radix UI dependencies from package.json
- July 08, 2025. Removed 20+ unnecessary dependencies from root package.json to optimize bundle size
- July 08, 2025. Restructured build process - npm-package now gets DataTable from main folder and builds dist without src folder
- July 08, 2025. Updated to modern grid layout with pinned column alignments and sticky header/footer support
- July 08, 2025. Implemented footer visibility based on property with aggregation functions (count, avg, sum, min, max) applied only when defined in column properties
- July 08, 2025. Updated checkbox implementation to use Tailwind-based design tied to column definition with "useSelection" property
- July 08, 2025. Updated README files with comprehensive documentation of new features
- July 08, 2025. Removed ALL @radix-ui dependencies and replaced with Headless UI components for button, dialog, label, separator, and switch
- July 08, 2025. Reduced bundle size from 130KB to 84KB (ES) and 86KB to 56KB (CommonJS) by removing @radix-ui dependencies

## User Preferences

Preferred communication style: Simple, everyday language.