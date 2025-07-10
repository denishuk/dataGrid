# Dynamic Type Extraction Build Process

The build process now uses dynamic type extraction instead of hardcoded interface definitions.

## How It Works

### 1. Type Extraction Script (`extract-types.js`)

This Node.js script dynamically reads the `types.ts` file and extracts all exported interfaces and types:

```bash
# List all extracted types
node extract-types.js list

# Generate type export statements for index.ts
node extract-types.js exports

# Generate complete TypeScript definition file
node extract-types.js definitions
```

### 2. Build Script Integration

The `build.sh` script now uses the extraction script in two places:

#### Dynamic Index.ts Generation
```bash
TYPE_EXPORTS=$(node extract-types.js exports)
cat > src/index.ts << EOF
export { DataTable } from './components/DataTable/DataTable';
export { useDataTable } from './components/DataTable/hooks/use-data-table';
export { cn } from './lib/utils';
${TYPE_EXPORTS}
EOF
```

#### Dynamic TypeScript Definitions
```bash
DEFINITIONS=$(node extract-types.js definitions)
cat > dist/index.d.ts << EOF
// Type definitions for advanced-react-datatable
${DEFINITIONS}
EOF
```

### 3. Benefits

- **No Hardcoding**: Types are automatically extracted from the source
- **Always in Sync**: Build process reflects actual interface definitions
- **Maintainable**: Adding new interfaces automatically includes them in exports
- **Reduced Errors**: No manual synchronization needed

### 4. Supported Exports

The script automatically detects and includes:

- `export interface InterfaceName { ... }`
- `export type TypeName = ...`

### 5. Example Output

For a types.ts file containing:
```typescript
export interface DataTableColumn<T> { ... }
export interface DataTableProps<T> { ... }
export interface FilterConfig { ... }
```

The script generates:
```typescript
export type {
  DataTableColumn,
  DataTableProps,
  FilterConfig
} from './components/DataTable/types';
```

### 6. Manual Usage

You can also use the script manually:

```bash
# Extract types from any TypeScript file
node extract-types.js exports

# Generate complete definitions
node extract-types.js definitions > my-types.d.ts
```

### 7. Error Handling

The script includes error handling for:
- Missing types.ts file
- Invalid TypeScript syntax
- No exported types found

This ensures the build process is robust and provides clear error messages when issues occur.

## Migration from Hardcoded Types

The previous build process had hardcoded interface definitions in the build.sh file. This new approach:

1. Eliminates the need to manually update type definitions
2. Ensures types stay synchronized with source code
3. Reduces maintenance burden
4. Provides better error checking

The build process is now fully automated and self-maintaining for type exports.