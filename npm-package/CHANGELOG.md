# Changelog

All notable changes to this project will be documented in this file.

## [1.6.1] - 2025-07-07

### Fixed
- **CSS Styling**: Added comprehensive CSS styles bundle to fix unstyled appearance when used as NPM package
- **Component Styling**: Replaced Tailwind classes with custom CSS classes for better compatibility
- **Border Removal**: Removed default border around DataTable container for cleaner appearance
- **Style Import**: Automatic CSS import ensures styles are included in bundle

### Added
- **Built-in Styles**: Complete CSS stylesheet (style.css) with professional table design
- **Manual CSS Import**: Option to manually import styles if automatic loading fails
- **Style Documentation**: Updated README with styling information and manual import instructions

### Changed
- **Container Classes**: Changed from Tailwind utilities to custom 'datatable-container' class
- **Bundle Size**: Added 7KB CSS file to package output
- **Side Effects**: Marked CSS files as side effects in package.json for proper bundling

## [1.6.0] - 2025-07-07

### Fixed
- **Build System**: Fixed NPM package build to generate proper JavaScript bundles instead of TypeScript source
- **Module Resolution**: Package now properly exports ES and CommonJS modules with correct file extensions
- **Production Bundle**: dist folder now contains compiled JavaScript (index.es.js, index.cjs.js) instead of TypeScript files
- **Module Loading**: Fixed "Module not found" errors when importing the package in projects

### Changed
- **Build Configuration**: Simplified Vite config to generate reliable production bundles
- **Package Structure**: Updated package.json with correct entry points for main and module fields
- **File Extensions**: ES module uses .js extension and CommonJS uses .cjs.js extension

### Added
- **Type Definitions**: Added comprehensive TypeScript definitions (index.d.ts) for full type safety
- **Build Verification**: Added package import test to verify build integrity

## [1.5.9] - 2025-07-07

### Changed
- **React Compatibility**: Updated peer dependencies to support React 18.x and 19.x
  - Changed `react` peer dependency from `^18.0.0` to `>=18.0.0`
  - Changed `react-dom` peer dependency from `^18.0.0` to `>=18.0.0`
  - Updated dev dependencies for broader React version support
- **Improved Compatibility**: Package now supports React 18, 19, and future versions

### Fixed
- Resolved npm install errors when using React 19.x
- Fixed peer dependency conflicts for newer React versions

## [1.5.8] - 2025-07-07

### Added
- **Filter Styling Refinements**: Improved visual consistency across all filter components
- **Enhanced Typography**: Consistent font weights and sizing throughout filter interface

### Fixed
- Filter modal styling with proper text hierarchy
- Input filter font weights for consistent appearance

## [1.5.7] - 2025-07-07

### Added
- **Hierarchical Multi-Level Grouping**: Complete tree-structure grouping implementation
- **Visual Hierarchy**: Progressive background colors and borders for grouping levels
- **Drag-and-Drop Improvements**: Enhanced badge reordering with visual feedback

### Fixed
- Button font weight overrides for consistent light text appearance
- React Fragment warnings in grouping components

## [1.5.6] - 2025-07-07

### Added
- **Export Functionality**: CSV and optional PDF export capabilities
- **Location Grouping**: Added groupable location field for better examples

### Fixed
- Export button hover styling improvements
- Compact checkbox column layout during grouping

## [1.5.5] - 2025-07-07

### Added
- **Simplified Grouping Interface**: Clean badge-based grouping area
- **Multi-Group Support**: Support for multiple grouping levels with reordering

### Changed
- Moved grouping controls from action bar to dedicated area
- Cleaned group headers without field prefixes

## [1.5.4] - 2025-07-07

### Added
- **Actions Column**: Professional dropdown menu with View, Edit, Assign, Delete options
- **Improved Layout**: Enhanced footer alignment and group header spanning

### Fixed
- Group header layout to span full table width
- Right-aligned summary values under data columns

## [1.5.3] - 2025-07-07

### Added
- **Multiselect Filters**: Checkbox-based filters for select and boolean columns
- **Auto-Generated Options**: Filter options collected automatically from data
- **Column Width Stability**: Automatic minWidth calculation to prevent jumping

### Fixed
- Horizontal scrolling for tables with many columns
- Column layout consistency improvements

## [1.5.2] - 2025-07-07

### Added
- **NPM Package Preparation**: Complete build configuration for registry publication
- **Primary Color Updates**: Blue action bar with proper contrast

### Fixed
- Table layout with fixed width for consistent column spacing
- Header borders for better visual separation

## [1.5.1] - 2025-07-07

### Added
- **Fullscreen Mode**: Expand/collapse functionality for maximum data visibility
- **Sticky Footer**: Configurable summary calculations with show/hide toggle
- **Modal Configuration**: Column configuration moved to modal with drag-and-drop

### Enhanced
- Blue action bar with centralized controls
- Improved pinning with shadow effects and transparency
- Enhanced pagination controls below table

## [1.5.0] - 2025-07-06

### Added
- **Advanced DataTable Component**: Complete feature-rich data grid
- **Inline Column Filters**: Filter controls directly under headers
- **Multi-Level Grouping**: Hierarchical grouping with numeric summaries
- **Inline Cell Editing**: Double-click editing with type-specific editors
- **Column Management**: Pin, show/hide, reorder columns
- **Export Capabilities**: CSV and JSON export functionality
- **Responsive Design**: Mobile-friendly with adaptive layouts
- **TypeScript Support**: Full type safety and customizable definitions