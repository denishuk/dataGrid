import { FilterConfig, SortConfig } from '../types';

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
          return Array.isArray(filterValue) && filterValue.includes(value);
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

      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      if (comparison !== 0) {
        return sort.direction === 'asc' ? comparison : -comparison;
      }
    }
    return 0;
  });
}

export function groupData<T>(data: T[], groupField: string, expandedGroups: Set<string>): T[] {
  const groups = new Map<string, T[]>();
  
  data.forEach(item => {
    const groupValue = String((item as any)[groupField]);
    if (!groups.has(groupValue)) {
      groups.set(groupValue, []);
    }
    groups.get(groupValue)!.push(item);
  });

  const result: T[] = [];
  
  groups.forEach((items, groupValue) => {
    // Add group header
    result.push({
      __isGroupHeader: true,
      __groupField: groupField,
      __groupValue: groupValue,
      __itemCount: items.length,
      __expanded: expandedGroups.has(groupValue),
    } as any);

    // Add items if expanded
    if (expandedGroups.has(groupValue)) {
      result.push(...items);
    }
  });

  return result;
}
