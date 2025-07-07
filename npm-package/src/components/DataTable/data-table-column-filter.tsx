import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { DataTableColumn, FilterConfig } from './types';

interface DataTableColumnFilterProps<T> {
  column: DataTableColumn<T>;
  filter?: FilterConfig;
  onFilterChange: (filter: FilterConfig | null) => void;
}

export function DataTableColumnFilter<T>({
  column,
  filter,
  onFilterChange,
}: DataTableColumnFilterProps<T>) {
  const [filterValue, setFilterValue] = useState(filter?.value || '');
  const [rangeMin, setRangeMin] = useState(filter?.operator === 'gte' ? filter.value : '');
  const [rangeMax, setRangeMax] = useState(filter?.operator === 'lte' ? filter.value : '');

  useEffect(() => {
    if (filter) {
      setFilterValue(filter.value || '');
      if (filter.operator === 'gte') setRangeMin(filter.value);
      if (filter.operator === 'lte') setRangeMax(filter.value);
    } else {
      setFilterValue('');
      setRangeMin('');
      setRangeMax('');
    }
  }, [filter]);

  const handleFilterChange = useCallback((value: any, operator: string = 'contains') => {
    if (value === '' || value === null || value === undefined || value === '__all__') {
      onFilterChange(null);
      return;
    }

    const newFilter: FilterConfig = {
      field: String(column.field),
      operator: operator as any,
      value,
      type: column.type || 'text',
    };
    onFilterChange(newFilter);
  }, [column.field, column.type, onFilterChange]);

  const handleRangeChange = useCallback(() => {
    if (rangeMin !== '' && rangeMax !== '') {
      // For range filters, we'll use a combined approach
      const newFilter: FilterConfig = {
        field: String(column.field),
        operator: 'gte',
        value: { min: rangeMin, max: rangeMax },
        type: column.type || 'number',
      };
      onFilterChange(newFilter);
    } else if (rangeMin !== '') {
      handleFilterChange(rangeMin, 'gte');
    } else if (rangeMax !== '') {
      handleFilterChange(rangeMax, 'lte');
    } else {
      onFilterChange(null);
    }
  }, [rangeMin, rangeMax, handleFilterChange]);

  const clearFilter = useCallback(() => {
    setFilterValue('');
    setRangeMin('');
    setRangeMax('');
    onFilterChange(null);
  }, [onFilterChange]);

  if (!column.filterable) {
    return <div className="h-8"></div>;
  }

  const renderFilter = () => {
    switch (column.type) {
      case 'select':
        return (
          <Select value={filterValue} onValueChange={(value) => handleFilterChange(value, 'equals')}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All</SelectItem>
              {column.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'number':
        return (
          <div className="flex gap-1">
            <Input
              type="number"
              placeholder="Min"
              value={rangeMin}
              onChange={(e) => setRangeMin(e.target.value)}
              onBlur={handleRangeChange}
              className="h-8 text-xs"
            />
            <Input
              type="number"
              placeholder="Max"
              value={rangeMax}
              onChange={(e) => setRangeMax(e.target.value)}
              onBlur={handleRangeChange}
              className="h-8 text-xs"
            />
          </div>
        );
      case 'boolean':
        return (
          <Select value={filterValue} onValueChange={(value) => handleFilterChange(value === 'true', 'equals')}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All</SelectItem>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            type="text"
            placeholder="Filter..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            onBlur={() => handleFilterChange(filterValue)}
            onKeyDown={(e) => e.key === 'Enter' && handleFilterChange(filterValue)}
            className="h-8 text-xs"
          />
        );
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex-1">
        {renderFilter()}
      </div>
      {filter && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={clearFilter}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}