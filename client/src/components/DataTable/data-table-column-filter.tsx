import { useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, X } from 'lucide-react';
import { DataTableColumn, FilterConfig } from './types';
import { getUniqueValues } from '@/lib/utils.ts';

interface DataTableColumnFilterProps<T> {
  column: DataTableColumn<T>;
  filter?: FilterConfig<T>;
  data: T[];
  onFilterChange: (filter: FilterConfig<T> | null) => void;
}

export function DataTableColumnFilter<T>({
  column,
  filter,
  data,
  onFilterChange,
}: DataTableColumnFilterProps<T>) {
  const [filterValue, setFilterValue] = useState(filter?.value || '');
  const [rangeMin, setRangeMin] = useState(
    filter?.operator === 'gte' ? filter.value :
    (filter?.value?.min || '')
  );
  const [rangeMax, setRangeMax] = useState(
    filter?.operator === 'lte' ? filter.value :
    (filter?.value?.max || '')
  );
  const [selectedValues, setSelectedValues] = useState<string[]>(
    filter?.operator === 'in' && Array.isArray(filter.value) ? filter.value : []
  );

  // Auto-collect unique values from data for select/multiselect filters
  const filterOptions = useMemo(() => {
    if (column.type === 'select' || column.type === 'boolean') {
      return getUniqueValues(data, column.field);
    }
    return column.options || [];
  }, [data, column.field, column.type, column.options]);

  useEffect(() => {
    if (filter) {
      setFilterValue(filter.value || '');
      if (filter.operator === 'gte') {
        if (typeof filter.value === 'object' && filter.value.min !== undefined) {
          setRangeMin(filter.value.min);
          setRangeMax(filter.value.max || '');
        } else {
          setRangeMin(filter.value);
        }
      } else if (filter.operator === 'lte') {
        if (typeof filter.value === 'object' && filter.value.max !== undefined) {
          setRangeMax(filter.value.max);
          setRangeMin(filter.value.min || '');
        } else {
          setRangeMax(filter.value);
        }
      }
      if (filter.operator === 'in' && Array.isArray(filter.value)) {
        setSelectedValues(filter.value);
      }
    } else {
      setFilterValue('');
      setRangeMin('');
      setRangeMax('');
      setSelectedValues([]);
    }
  }, [filter]);

  const handleFilterChange = useCallback((value: any, operator: FilterConfig<T>['operator'] = 'contains') => {
    if (value === '' || value === null || value === undefined || value === '__all__') {
      onFilterChange(null);
      return;
    }

    const newFilter: FilterConfig<T> = {
      field: String(column.field),
      valueGetter: column.valueGetter,
      operator: operator,
      value,
      type: column.type || 'text',
    };
    onFilterChange(newFilter);
  }, [column.field, column.type, onFilterChange]);

  // Handler for multiselect filters
  const handleMultiSelectChange = useCallback((value: string, checked: boolean) => {
    setSelectedValues(prev => {
      const newValues = checked
        ? [...prev, value]
        : prev.filter(v => v !== value);

      if (newValues.length === 0) {
        onFilterChange(null);
        return [];
      }

      const newFilter: FilterConfig<T> = {
        field: String(column.field),
        valueGetter: column.valueGetter,
        operator: 'in',
        value: newValues,
        type: column.type || 'text',
      };
      onFilterChange(newFilter);
      return newValues;
    });
  }, [column.field, column.type, onFilterChange]);

  const clearMultiSelect = useCallback(() => {
    setSelectedValues([]);
    onFilterChange(null);
  }, [onFilterChange]);

  const handleRangeChange = useCallback(() => {
    if (rangeMin !== '' && rangeMax !== '') {
      // For range filters, we'll use a combined approach
      const newFilter: FilterConfig<T> = {
        field: String(column.field),
        operator: 'gte',
        valueGetter: column.valueGetter,
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-full border-0 bg-gray-200 rounded-sm justify-between text-sm font-light min-w-0"
              >
                <span className="truncate">
                  {selectedValues.length === 0 ? (
                    'All'
                  ) : selectedValues.length === 1 ? (
                    selectedValues[0]
                  ) : (
                    `${selectedValues.length} selected`
                  )}
                </span>
                <ChevronDown className="h-3 w-3 opacity-50 flex-shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 bg-white ring-1 ring-gray-900/5" align="start">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Filter options</span>
                  {selectedValues.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearMultiSelect}
                      className="h-6 px-2 text-xs"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filterOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2 py-1">
                      <input
                        type="checkbox"
                        id={`${String(column.field)}-${option}`}
                        checked={selectedValues.includes(option)}
                        onChange={(e) =>
                          handleMultiSelectChange(option, e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor={`${String(column.field)}-${option}`}
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {selectedValues.length > 0 && (
                  <div className="border-t pt-2">
                    <div className="flex flex-wrap gap-1">
                      {selectedValues.map((value) => (
                        <Badge
                          key={value}
                          variant="secondary"
                          className="text-xs"
                        >
                          {value}
                          <X
                            className="h-3 w-3 ml-1 cursor-pointer"
                            onClick={() => handleMultiSelectChange(value, false)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
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
              className="h-8 text-sm font-light border-0 bg-gray-200 rounded-sm"
            />
            <Input
              type="number"
              placeholder="Max"
              value={rangeMax}
              onChange={(e) => setRangeMax(e.target.value)}
              onBlur={handleRangeChange}
              className="h-8 text-sm font-light border-0 bg-gray-200 rounded-sm"
            />
          </div>
        );
      case 'boolean':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-full justify-between text-sm font-light border-0 bg-gray-200 rounded-sm min-w-0"
              >
                <span className="truncate">
                  {selectedValues.length === 0 ? (
                    'All'
                  ) : selectedValues.length === 1 ? (
                    selectedValues[0]
                  ) : (
                    `${selectedValues.length} selected`
                  )}
                </span>
                <ChevronDown className="h-3 w-3 opacity-50 flex-shrink-0" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2" align="start">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Status</span>
                  {selectedValues.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearMultiSelect}
                      className="h-6 px-2 text-xs"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="space-y-1">
                  {filterOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`${String(column.field)}-${option}`}
                        checked={selectedValues.includes(option)}
                        onChange={(e) =>
                          handleMultiSelectChange(option, e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor={`${String(column.field)}-${option}`}
                        className="text-xs font-normal cursor-pointer flex-1"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
            className="h-8 text-sm font-light w-full min-w-0 border-0 bg-gray-200 rounded-sm"
          />
        );
    }
  };

  return (
    <div className="flex items-center gap-1 w-full relative">
      <div className="flex-1 min-w-0">
        {renderFilter()}
      </div>
      {filter && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-0 h-6 w-6 p-0 flex-shrink-0"
          onClick={clearFilter}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}