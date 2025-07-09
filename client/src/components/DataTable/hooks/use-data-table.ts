import { useState, useMemo, useCallback } from 'react';
import { DataTableColumn, FilterConfig, SortConfig } from '../types';
import { filterData, sortData, groupData } from '../utils/data-utils';

interface UseDataTableProps<T> {
  data: T[];
  initialColumns: DataTableColumn<T>[];
  initialGroupBy?: string | string[];
  selectionMode?: 'single' | 'multiple' | 'none';
  onRowSelect?: (selectedRows: T[]) => void;
  onCellEdit?: (row: T, field: keyof T, value: any) => void;
}

export function useDataTable<T extends Record<string, any>>({
  data,
  initialColumns,
  initialGroupBy,
  // selectionMode = 'none',
  // onRowSelect,
  // onCellEdit,
}: UseDataTableProps<T>) {
  const [columns, setColumns] = useState<DataTableColumn<T>[]>(initialColumns);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [sorts, setSorts] = useState<SortConfig[]>([]);
  const [groupBy, setGroupBy] = useState<string | string[]>(initialGroupBy || '');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply filters
    result = filterData(result, filters);

    // Apply sorts
    result = sortData(result, sorts);

    return result;
  }, [data, filters, sorts]);

  const groupedData = useMemo(() => {
    if (!groupBy || (Array.isArray(groupBy) && groupBy.length === 0) || (typeof groupBy === 'string' && groupBy === '')) {
      return filteredData;
    }
    return groupData(filteredData, groupBy, expandedGroups, columns);
  }, [filteredData, groupBy, expandedGroups, columns]);

  const toggleSort = useCallback((field: string) => {
    setSorts(prev => {
      const existingSort = prev.find(s => s.field === field);
      if (existingSort) {
        if (existingSort.direction === 'asc') {
          return prev.map(s => s.field === field ? { ...s, direction: 'desc' as const } : s);
        } else {
          return prev.filter(s => s.field !== field);
        }
      } else {
        return [...prev, { field, direction: 'asc' as const }];
      }
    });
  }, []);

  const addFilter = useCallback((filter: FilterConfig) => {
    setFilters(prev => [...prev.filter(f => f.field !== filter.field), filter]);
  }, []);

  const removeFilter = useCallback((field: string) => {
    setFilters(prev => prev.filter(f => f.field !== field));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters([]);
  }, []);

  const toggleRowSelection = useCallback((row: T) => {
    setSelectedRows(prev => {
      // Try to use id first, fallback to object comparison
      const rowId = (row as any).id;
      const isSelected = rowId 
        ? prev.some(r => (r as any).id === rowId)
        : prev.some(r => JSON.stringify(r) === JSON.stringify(row));
      
      if (isSelected) {
        return rowId 
          ? prev.filter(r => (r as any).id !== rowId)
          : prev.filter(r => JSON.stringify(r) !== JSON.stringify(row));
      } else {
        return [...prev, row];
      }
    });
  }, []);

  const toggleAllSelection = useCallback(() => {
    setSelectedRows(prev => {
      if (prev.length === filteredData.length && filteredData.length > 0) {
        return [];
      } else {
        return [...filteredData];
      }
    });
  }, [filteredData]);

  const toggleGroup = useCallback((groupKey: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey);
      } else {
        newSet.add(groupKey);
      }
      return newSet;
    });
  }, []);

  // const onFilterChange = useCallback((field: string, filter: FilterConfig | null) => {
  //   if (filter) {
  //     addFilter(filter);
  //   } else {
  //     removeFilter(field);
  //   }
  // }, [addFilter, removeFilter]);

  // Additional methods needed by new data-table component
  const processedData = groupedData; // Alias for backward compatibility
  const sortBy = toggleSort;
  const selectAllRows = toggleAllSelection;
  const clearSelection = useCallback(() => {
    setSelectedRows([]);
  }, []);
  
  const filterByColumn = useCallback((field: string, filter: FilterConfig | null) => {
    if (filter) {
      addFilter(filter);
    } else {
      removeFilter(field);
    }
  }, [addFilter, removeFilter]);

  const handleGroupByChange = useCallback((field: string | string[] | null) => {
    console.log('GroupBy change:', groupBy, '->', field);
    setGroupBy(field || '');
    setExpandedGroups(new Set()); // Reset expanded groups when grouping changes
  }, [groupBy]);

  return {
    columns,
    setColumns,
    processedData,
    filteredData,
    groupedData,
    selectedRows,
    filters,
    sorts,
    groupBy,
    expandedGroups,
    setGroupBy: handleGroupByChange,
    sortBy,
    addFilter,
    removeFilter,
    clearFilters,
    toggleRowSelection,
    selectAllRows,
    clearSelection,
    toggleGroup,
    filterByColumn,
  };
}
