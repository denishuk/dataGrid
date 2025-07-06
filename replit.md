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
- **Features**: Sorting, filtering, grouping, column pinning
- **Virtualization**: Optional virtual scrolling for large datasets
- **Export**: CSV and JSON export capabilities
- **Responsive**: Mobile-friendly design with adaptive layouts
- **Customizable**: Configurable columns, cell renderers, and styling

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

Changelog:
- July 06, 2025. Initial setup