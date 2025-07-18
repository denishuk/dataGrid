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
- July 08, 2025. Removed old Checkbox component and replaced all instances with native HTML checkboxes for consistent styling
- July 08, 2025. Fixed duplicate checkbox columns issue by removing showSelection logic and keeping only useSelection column property
- July 08, 2025. Fixed NPM package React dispatcher error by correcting useDataTable export path in build script
- July 08, 2025. Completely resolved React dispatcher error by improving Vite externalization configuration
- July 08, 2025. Updated build process to properly externalize React, react-dom, and scheduler dependencies
- July 08, 2025. Package now works correctly in external Next.js applications without React context issues
- July 08, 2025. Removed unnecessary hooks folder (use-toast, use-mobile) from NPM package build
- July 08, 2025. Excluded toast-related components (toast.tsx, toaster.tsx) from NPM package to reduce bundle size
- July 08, 2025. Optimized package build process to include only DataTable-specific dependencies
- July 08, 2025. Updated data-table-action-bar styling to use indigo color scheme (bg-indigo-600) instead of blue for consistent theming
- July 08, 2025. Fixed all TypeScript errors in DataTable components including unused imports, variable declarations, and type mismatches
- July 08, 2025. Improved grouping row layout by colspan merging checkbox and first data column for better label width and visual hierarchy
- July 08, 2025. Converted HTML table structure to div elements using Tailwind CSS Grid layout for more flexible styling capabilities
- July 08, 2025. Improved grid layout with first column expanding to fill available space using minmax(200px, 1fr) and integrated checkbox into column definition instead of separate column
- July 09, 2025. Fixed multiple critical issues: range filtering now supports min/max values without reset, multi-column grouping functionality restored, pagination only shows when needed (pageSize reduced to 10), fullscreen mode improved with proper z-index and background, column configuration modal enhanced with better positioning
- July 09, 2025. Added vertical center alignment to all cell content using flex items-center with 44px minimum height across all table components
- July 09, 2025. Replaced hardcoded virtualization containerHeight with dynamic calculation based on viewport size, fullscreen mode, and active components for better responsive behavior
- July 09, 2025. Fixed checkbox integration issue where columns with useSelection=true were not showing filter inputs and sort icons properly
- July 09, 2025. Fixed dynamic height calculation gap (reduced by 8px) and dropdown menu z-index overlap issue with pinned columns, prevented checkbox selection when clicking dropdown actions
- July 09, 2025. Replaced custom dropdown menu with Headless UI Menu component using portal=true to solve z-index issues with pinned columns, ensuring actions dropdown always appears above all table elements
- July 09, 2025. Created comprehensive standalone CSS file (datatable.css) with all component styles to prevent Tailwind CSS purging in external applications. Updated build process to include CSS bundling and extraction. Added React portal solution for dropdown positioning above all table elements with fixed z-index issues.
- July 10, 2025. Implemented dynamic type extraction system for NPM package build process. Created extract-types.js script that automatically reads types.ts and generates export statements, eliminating hardcoded interface definitions in build.sh. Build process now automatically syncs with source code changes.
- July 15, 2025. Fixed extract-types.js debug output issue that was causing TypeScript syntax errors in build.sh by removing debug console.log statements from export generation.
- July 15, 2025. Simplified package architecture by removing server-side dependencies and creating client-only version with hardcoded employee data. Created simple-package/ directory structure with minimal dependencies and relative imports instead of @/ aliases. Updated demo.tsx to use hardcoded data from /data/employees.ts instead of API calls.

## User Preferences

Preferred communication style: Simple, everyday language.