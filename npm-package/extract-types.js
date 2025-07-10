#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Extract TypeScript interface and type definitions from types.ts file
 * This script dynamically reads the types file and generates export statements
 */
function extractTypes() {
  const typesFilePath = path.join(__dirname, 'src', 'components', 'DataTable', 'types.ts');
  
  if (!fs.existsSync(typesFilePath)) {
    console.error('Types file not found:', typesFilePath);
    process.exit(1);
  }
  
  const content = fs.readFileSync(typesFilePath, 'utf8');
  
  // Extract all export interface and export type declarations
  const interfaceRegex = /export\s+interface\s+(\w+)/g;
  const typeRegex = /export\s+type\s+(\w+)/g;
  
  const interfaces = [];
  const types = [];
  
  let match;
  
  // Extract interfaces
  while ((match = interfaceRegex.exec(content)) !== null) {
    interfaces.push(match[1]);
  }
  
  // Extract types
  while ((match = typeRegex.exec(content)) !== null) {
    types.push(match[1]);
  }
  
  const allTypes = [...interfaces, ...types];
  
  return allTypes;
}

/**
 * Generate the type export string for index.ts
 */
function generateTypeExports() {
  const types = extractTypes();
  
  if (types.length === 0) {
    return '';
  }
  
  return `export type {
  ${types.join(',\n  ')}
} from './components/DataTable/types';`;
}

/**
 * Generate the complete TypeScript definition file content
 */
function generateTypeDefinitions() {
  const typesFilePath = path.join(__dirname, 'src', 'components', 'DataTable', 'types.ts');
  
  if (!fs.existsSync(typesFilePath)) {
    console.error('Types file not found:', typesFilePath);
    process.exit(1);
  }
  
  const content = fs.readFileSync(typesFilePath, 'utf8');
  
  // Remove imports and add React import
  let processedContent = content
    // Remove any existing imports
    .replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '')
    // Add React import at the top
    .replace(/^/, "import React from 'react';\n\n");
  
  // Add additional function declarations
  const additionalDeclarations = `

export function DataTable<T = any>(props: DataTableProps<T>): React.ReactElement;

export function useDataTable<T = any>(props: {
  data: T[];
  initialColumns: DataTableColumn<T>[];
  initialGroupBy?: string | string[];
  selectionMode?: 'single' | 'multiple' | 'none';
  onRowSelect?: (selectedRows: T[]) => void;
  onCellEdit?: (row: T, field: keyof T, value: any) => void;
}): {
  data: T[];
  columns: DataTableColumn<T>[];
  filteredData: T[];
  sortedData: T[];
  paginatedData: T[];
  groupedData: any[];
  filters: FilterConfig[];
  sorts: SortConfig[];
  groupBy: string | string[] | null;
  selectedRows: T[];
  currentPage: number;
  totalPages: number;
  isFiltersExpanded: boolean;
  addFilter: (filter: FilterConfig) => void;
  removeFilter: (field: string) => void;
  clearFilters: () => void;
  addSort: (field: string) => void;
  removeSort: (field: string) => void;
  clearSorts: () => void;
  setGroupBy: (fields: string | string[] | null) => void;
  toggleRowSelection: (row: T) => void;
  clearSelection: () => void;
  selectAll: () => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  toggleFiltersExpanded: () => void;
  updateColumns: (columns: DataTableColumn<T>[]) => void;
};

export function cn(...inputs: any[]): string;
`;
  
  return processedContent + additionalDeclarations;
}

// Main execution based on command line arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'exports':
    console.log(generateTypeExports());
    break;
  case 'definitions':
    console.log(generateTypeDefinitions());
    break;
  case 'list':
    const types = extractTypes();
    console.log('Found types:', types.join(', '));
    break;
  default:
    console.error('Usage: node extract-types.js [exports|definitions|list]');
    console.error('  exports     - Generate type export statements for index.ts');
    console.error('  definitions - Generate complete TypeScript definition file');
    console.error('  list        - List all extracted type names');
    process.exit(1);
}