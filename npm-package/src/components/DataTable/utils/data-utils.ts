import { FilterConfig, SortConfig, DataTableColumn } from '../types';

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
export function filterData<T>(data: T[], filters: FilterConfig[]): T[] {
  return data.filter(row => {
    return filters.every(filter => {
      const value = (row as any)[filter.field];
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

export function sortData<T>(data: T[], sorts: SortConfig[]): T[] {
  if (sorts.length === 0) return data;

  return [...data].sort((a, b) => {
    for (const sort of sorts) {
      const aValue = (a as any)[sort.field];
      const bValue = (b as any)[sort.field];

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
  
  const groups = new Map<string, T[]>();
  
  data.forEach(item => {
    const groupKey = fields.map(field => String((item as any)[field])).join('|');
    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    groups.get(groupKey)!.push(item);
  });

  const result: T[] = [];
  
  groups.forEach((items, groupKey) => {
    const groupValues = groupKey.split('|');
    const groupDisplayValue = fields.map((field, index) => `${field}: ${groupValues[index]}`).join(', ');
    
    // Calculate summaries for numeric columns
    const summaries = new Map<string, number>();
    columns.forEach(column => {
      if (column.type === 'number') {
        const sum = items.reduce((acc, item) => {
          const value = Number((item as any)[column.field]);
          return acc + (isNaN(value) ? 0 : value);
        }, 0);
        summaries.set(String(column.field), sum);
      }
    });
    
    // Add group header
    result.push({
      __isGroupHeader: true,
      __groupFields: fields,
      __groupValue: groupDisplayValue,
      __groupKey: groupKey,
      __itemCount: items.length,
      __expanded: expandedGroups.has(groupKey),
      __summaries: summaries,
    } as any);

    // Add items if expanded
    if (expandedGroups.has(groupKey)) {
      result.push(...items);
    }
  });

  return result;
}
