# Employee Management System

## Overview

This is a full-stack employee management system built with React, TypeScript, Express, and Drizzle ORM. The application provides a comprehensive interface for managing employee data with advanced filtering, sorting, and data visualization capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Query for server state, local React state for UI
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **API Pattern**: RESTful endpoints under `/api` prefix

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema**: Type-safe database schema with Zod validation
- **Migrations**: Drizzle Kit for database migrations

## Key Components

### Database Schema
- **Users Table**: Authentication with username/password
- **Employees Table**: Comprehensive employee data including:
  - Personal information (name, email)
  - Employment details (department, title, salary)
  - Status tracking (active/inactive, hire date, location)

### Advanced DataTable Component
- **Core Features**: Sorting, filtering, grouping, column pinning, virtual scrolling
- **Inline Editing**: Double-click cells to edit values with type-specific editors
- **Custom Renderers**: Override column headers and cell templates  
- **Inline Column Filters**: Filter controls directly under each column header
- **Multi-Level Grouping**: Group by multiple columns with automatic numeric summaries
- **Column Management**: Pin left/right, show/hide, reorder columns
- **Export**: CSV and JSON export capabilities
- **Responsive**: Mobile-friendly design with adaptive layouts
- **TypeScript**: Full type safety and customizable column definitions

### API Endpoints
- `GET /api/employees` - List all employees
- `GET /api/employees/:id` - Get specific employee
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Storage Layer
- **Interface**: IStorage abstraction for data operations
- **Implementation**: MemStorage for development with sample data
- **Production**: Database-backed storage (ready for PostgreSQL)

## Data Flow

1. **Client Requests**: React components use React Query for API calls
2. **API Layer**: Express routes handle HTTP requests with validation
3. **Business Logic**: Storage interface abstracts data operations
4. **Database**: Drizzle ORM manages PostgreSQL interactions
5. **Response**: JSON responses with proper error handling

## External Dependencies

### UI Libraries
- **Radix UI**: Headless UI primitives for accessibility
- **Lucide React**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Component variant management

### Data Management
- **React Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Runtime type validation and schema parsing
- **React Hook Form**: Form state management with validation

### Development Tools
- **Vite**: Fast build tool with HMR
- **ESBuild**: Fast JavaScript bundler for production
- **TypeScript**: Type safety and developer experience
- **Replit Integration**: Development environment optimization

## Deployment Strategy

### Development
- **Hot Reload**: Vite middleware for instant updates
- **Error Handling**: Runtime error overlay for debugging
- **Logging**: Request/response logging with performance metrics

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: ESBuild bundles server code with external packages
- **Assets**: Static files served from Express with proper caching

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL
- **Sessions**: Secure session management with PostgreSQL store
- **CORS**: Configured for production deployment

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

- July 06, 2025: Initial setup with basic DataTable component
- July 06, 2025: Enhanced DataTable with advanced features:
  - Added inline column filters under each header
  - Implemented inline cell editing with double-click
  - Added custom header and cell renderer support
  - Implemented multi-level grouping with numeric summaries
  - Enhanced column management with pinning and visibility controls
  - Improved TypeScript integration with better type safety
- July 06, 2025: Major UI overhaul and architecture improvements:
  - **Blue Action Bar**: Created centralized control panel with export, filter indicators, and settings
  - **Modal Configuration**: Moved column configuration to modal with drag-and-drop reordering
  - **Improved Pinning**: Added shadow effects for pinned columns with semi-transparent backgrounds
  - **Fullscreen Mode**: Added expand/collapse functionality for maximum data visibility
  - **Sticky Footer**: Implemented configurable summary calculations with show/hide toggle
  - **Enhanced Pagination**: Moved pagination below table with improved controls and page size selection
  - **Removed Features**: Eliminated JSON export, advanced filters section, and global search as requested
  - **File Structure**: All components now use kebab-case naming convention
  - **Performance**: Fixed opacity issues with pinned columns using backdrop-blur for better text visibility
  - **Documentation**: Created comprehensive README with full feature documentation and usage examples
- July 07, 2025: Final polish and NPM preparation:
  - **Clean Demo**: Removed icon-based headers from demo template for cleaner appearance
  - **Primary Colors**: Updated action bar to use Tailwind primary blue (blue-600) with white text and icons
  - **Header Borders**: Added border-bottom to table headers instead of first body row for better visibility
  - **Table Layout**: Fixed table width issues with table-fixed layout for consistent column spacing
  - **NPM Package Guide**: Created comprehensive PACKAGE_PREPARATION.md with complete publishing instructions
  - **Component Ready**: DataTable is now production-ready and prepared for NPM registry publication
- July 07, 2025: Multiselect filters and stability improvements:
  - **Multiselect Filters**: Added checkbox-based multiselect filters for select and boolean column types
  - **Auto-Generated Options**: Filter options are automatically collected from actual data
  - **Column Width Stability**: Added automatic minWidth calculation (180px for filterable, 120px for others) to prevent column jumping
  - **Horizontal Scrolling**: Implemented proper horizontal scrolling for tables with many columns using min-w-full and overflow-x-auto
  - **Updated Documentation**: Comprehensive README with screenshots, installation instructions, and multiselect feature documentation
  - **NPM Package v1.1.0**: Updated package with all new features and proper build configuration
- July 07, 2025: Actions column and footer alignment improvements:
  - **Actions Column**: Added professional dropdown menu with View, Edit, Assign, Delete options pinned to right
  - **Group Header Layout**: Fixed grouping to span full table width with summaries under respective columns
  - **Footer Alignment**: Improved table footer to match column layout, removed count from actions column
  - **Right-Aligned Summaries**: Summary values now align to the right under their data columns for better readability
  - **NPM Package v1.2.0**: Updated package with actions column and improved layout alignment
- July 07, 2025: Simplified grouping interface and enhanced multi-grouping:
  - **Clean Group Headers**: Removed field prefixes from group headers (shows "Engineering (3)" instead of "department: Engineering (3 items)")
  - **Badge-Based Grouping**: Moved grouping from blue action bar to dedicated gray area with intuitive badge interface
  - **Multi-Group Support**: Added support for multiple grouping levels with drag-and-drop reordering
  - **Visual Improvements**: Cleaner action bar focused on essential functions, better visual hierarchy
  - **NPM Package v1.3.0**: Updated package with simplified grouping interface and multi-level grouping capabilities
- July 07, 2025: Export improvements and location grouping:
  - **Fixed Export CSV Button**: Improved hover styling to maintain white text on blue background
  - **Added PDF Export**: Added optional PDF export button controlled by enablePdfExport property
  - **Functional CSV Export**: Fixed CSV export functionality to properly generate and download files
  - **Location Grouping**: Made location field groupable in demo data for better grouping examples
  - **Compact Checkbox Column**: Reduced spacing in checkbox column during grouping for better layout
  - **NPM Package v1.4.0**: Updated package with export improvements and location grouping support
- July 07, 2025: Hierarchical multi-level grouping implementation:
  - **Multi-Level Tree Grouping**: Implemented nested hierarchical grouping where multiple columns create tree structure
  - **Level-Based Indentation**: Each grouping level shows proper visual indentation (30px per level for better hierarchy)
  - **Hierarchical Expand/Collapse**: Each group level can be independently expanded or collapsed
  - **Field Indicators**: Group headers show which field they represent (department, location, etc.)
  - **Nested Summaries**: Numeric summaries calculate correctly at each hierarchy level
  - **Fixed Drag-and-Drop**: Improved badge reordering with proper DOM structure for HTML5 drag events
  - **Enhanced Visual Hierarchy**: Added background colors and left borders for each grouping level with increasing opacity
  - **Console Error Fixes**: Fixed React Fragment warnings by replacing with flatMap approach to avoid Replit metadata issues
  - **Drag-and-Drop Improvements**: Enhanced badge reordering with better event handling and debug logging
  - **Enhanced Visual Hierarchy**: Added progressive background colors and borders for grouping levels
  - **Filter Styling Consistency**: Standardized all filter input fields to use text-sm for consistent font sizing
  - **Drag-and-Drop Visual Feedback**: Added opacity and scale effects when dragging grouping badges  
  - **Filter Font Weight Fix**: Changed all filter text from font-medium to font-normal for consistent light text appearance
  - **Fixed Button Font Weight Override**: Used !font-light to override button component's default font-medium styling
  - **NPM Package v1.5.7**: Updated package with properly overridden button font weights for consistent light text