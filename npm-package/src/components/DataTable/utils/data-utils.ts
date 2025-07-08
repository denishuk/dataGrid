import { FilterConfig, SortConfig, DataTableColumn } from '../types';

// Helper function to get value from row using valueGetter or field
function getRowValue<T>(row: T, column: DataTableColumn<T>): any {
  if (column.valueGetter) {
    return column.valueGetter(row);
  }
  return (row as any)[column.field];
}

// Utility function to extract unique values from data for filter options
export function getUniqueValues<T>(data: T[], field: keyof T): string[] {
  const values = new Set<string>();
  data.forEach(row => {
    const value = row[field];
    if (value != null) {
      values.add(String(value));
    }
  });
  return Array.from(values).sort();
}

// Enhanced filter function with multiselect support
export function filterData<T>(data: T[], filters: FilterConfig[], columns: DataTableColumn<T>[] = []): T[] {
  return data.filter(row => {
    return filters.every(filter => {
      const column = columns.find(col => String(col.field) === filter.field);
      const value = column ? getRowValue(row, column) : (row as any)[filter.field];
      const filterValue = filter.value;

      if (value == null) return false;

      switch (filter.operator) {
        case 'contains':
          return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
        case 'equals':
          return value === filterValue;
        case 'startsWith':
          return String(value).toLowerCase().startsWith(String(filterValue).toLowerCase());
        case 'endsWith':
          return String(value).toLowerCase().endsWith(String(filterValue).toLowerCase());
        case 'gt':
          return Number(value) > Number(filterValue);
        case 'lt':
          return Number(value) < Number(filterValue);
        case 'gte':
          return Number(value) >= Number(filterValue);
        case 'lte':
          return Number(value) <= Number(filterValue);
        case 'in':
          if (Array.isArray(filterValue)) {
            return filterValue.includes(String(value));
          }
          return filterValue === String(value);
        default:
          return true;
      }
    });
  });
}

export function sortData<T>(data: T[], sorts: SortConfig[], columns: DataTableColumn<T>[] = []): T[] {
  if (sorts.length === 0) return data;

  return [...data].sort((a, b) => {
    for (const sort of sorts) {
      const column = columns.find(col => String(col.field) === sort.field);
      const aValue = column ? getRowValue(a, column) : (a as any)[sort.field];
      const bValue = column ? getRowValue(b, column) : (b as any)[sort.field];

      if (aValue == null && bValue == null) continue;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      let comparison = 0;

      // Handle numeric values
      const aNum = Number(aValue);
      const bNum = Number(bValue);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        comparison = aNum - bNum;
      } else {
        // Handle string comparison
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        comparison = aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
      }

      if (comparison !== 0) {
        return sort.direction === 'asc' ? comparison : -comparison;
      }
    }
    return 0;
  });
}

export function groupData<T>(data: T[], groupFields: string | string[], expandedGroups: Set<string>, columns: any[]): T[] {
  const fields = Array.isArray(groupFields) ? groupFields : [groupFields];
  if (fields.length === 0 || fields[0] === '') return data;
  
  // Helper function to build hierarchical group structure
  function buildHierarchy(items: T[], fieldIndex: number, parentPath: string = ''): any[] {
    if (fieldIndex >= fields.length) {
      return items;
    }
    
    const currentField = fields[fieldIndex];
    const groups = new Map<string, T[]>();
    
    // Group items by current field
    items.forEach(item => {
      const column = columns.find(col => String(col.field) === currentField);
      const value = column ? 
        String(getRowValue(item, column) || 'Ungrouped') : 
        String((item as any)[currentField] || 'Ungrouped');
      if (!groups.has(value)) {
        groups.set(value, []);
      }
      groups.get(value)!.push(item);
    });
    
    const result: any[] = [];
    
    groups.forEach((groupItems, groupValue) => {
      const groupPath = parentPath ? `${parentPath}|${groupValue}` : groupValue;
      const isExpanded = expandedGroups.has(groupPath);
      
      // Calculate total count for this group (including nested items)
      function getTotalCount(items: T[]): number {
        return items.length;
      }
      
      // Calculate summaries for numeric columns
      const summaries = new Map<string, number>();
      columns.forEach(column => {
        if (column.type === 'number') {
          const sum = groupItems.reduce((acc, item) => {
            const value = Number(getRowValue(item, column));
            return acc + (isNaN(value) ? 0 : value);
          }, 0);
          summaries.set(String(column.field), sum);
        }
      });
      
      // Create group header with level information
      const groupHeader = {
        __isGroupHeader: true,
        __groupFields: [currentField],
        __groupValue: groupValue,
        __groupKey: groupPath,
        __itemCount: getTotalCount(groupItems),
        __expanded: isExpanded,
        __summaries: summaries,
        __level: fieldIndex,
        __field: currentField,
        __groupRows: groupItems // Add the group rows for custom rendering
      } as any;
      
      result.push(groupHeader);
      
      // Add nested content if expanded
      if (isExpanded) {
        if (fieldIndex === fields.length - 1) {
          // Last level - add actual data rows
          result.push(...groupItems);
        } else {
          // Intermediate level - recursively add nested groups
          const nestedGroups = buildHierarchy(groupItems, fieldIndex + 1, groupPath);
          result.push(...nestedGroups);
        }
      }
    });
    
    return result;
  }
  
  return buildHierarchy(data, 0);
}
