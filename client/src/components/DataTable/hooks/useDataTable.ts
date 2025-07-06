import { useState, useMemo, useCallback } from 'react';
import { DataTableColumn, FilterConfig, SortConfig } from '../types';
import { filterData, sortData, groupData } from '../utils/dataUtils';

export function useDataTable<T extends Record<string, any>>(
  data: T[],
  columns: DataTableColumn<T>[]
) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [sorts, setSorts] = useState<SortConfig[]>([]);
  const [groupBy, setGroupBy] = useState<string>('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchQuery) {
      result = result.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply filters
    result = filterData(result, filters);

    // Apply sorts
    result = sortData(result, sorts);

    return result;
  }, [data, filters, sorts, searchQuery]);

  const groupedData = useMemo(() => {
    if (!groupBy) return filteredData;
    return groupData(filteredData, groupBy, expandedGroups);
  }, [filteredData, groupBy, expandedGroups]);

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
      const isSelected = prev.some(r => r.id === row.id);
      if (isSelected) {
        return prev.filter(r => r.id !== row.id);
      } else {
        return [...prev, row];
      }
    });
  }, []);

  const toggleAllSelection = useCallback(() => {
    setSelectedRows(prev => prev.length === filteredData.length ? [] : [...filteredData]);
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

  return {
    filteredData,
    groupedData,
    selectedRows,
    filters,
    sorts,
    groupBy,
    expandedGroups,
    searchQuery,
    setSearchQuery,
    setGroupBy,
    toggleSort,
    addFilter,
    removeFilter,
    clearFilters,
    toggleRowSelection,
    toggleAllSelection,
    toggleGroup,
  };
}
