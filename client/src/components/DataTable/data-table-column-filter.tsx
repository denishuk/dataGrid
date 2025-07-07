import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { X, ChevronDown } from 'lucide-react';
import { DataTableColumn, FilterConfig } from './types';
import { getUniqueValues } from './utils/data-utils';

interface DataTableColumnFilterProps<T> {
  column: DataTableColumn<T>;
  filter?: FilterConfig;
  data: T[];
  onFilterChange: (filter: FilterConfig | null) => void;
}

export function DataTableColumnFilter<T>({
  column,
  filter,
  data,
  onFilterChange,
}: DataTableColumnFilterProps<T>) {
  const [filterValue, setFilterValue] = useState(filter?.value || '');
  const [rangeMin, setRangeMin] = useState(filter?.operator === 'gte' ? filter.value : '');
  const [rangeMax, setRangeMax] = useState(filter?.operator === 'lte' ? filter.value : '');
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
      if (filter.operator === 'gte') setRangeMin(filter.value);
      if (filter.operator === 'lte') setRangeMax(filter.value);
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
      
      const newFilter: FilterConfig = {
        field: String(column.field),
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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-full justify-between text-sm font-normal"
              >
                {selectedValues.length === 0 ? (
                  'All'
                ) : selectedValues.length === 1 ? (
                  selectedValues[0]
                ) : (
                  `${selectedValues.length} selected`
                )}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="start">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Filter options</span>
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
                      <Checkbox
                        id={`${String(column.field)}-${option}`}
                        checked={selectedValues.includes(option)}
                        onCheckedChange={(checked) => 
                          handleMultiSelectChange(option, checked as boolean)
                        }
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
              className="h-8 text-sm"
            />
            <Input
              type="number"
              placeholder="Max"
              value={rangeMax}
              onChange={(e) => setRangeMax(e.target.value)}
              onBlur={handleRangeChange}
              className="h-8 text-sm"
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
                className="h-8 w-full justify-between text-sm font-normal"
              >
                {selectedValues.length === 0 ? (
                  'All'
                ) : selectedValues.length === 1 ? (
                  selectedValues[0]
                ) : (
                  `${selectedValues.length} selected`
                )}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2" align="start">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
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
                      <Checkbox
                        id={`${String(column.field)}-${option}`}
                        checked={selectedValues.includes(option)}
                        onCheckedChange={(checked) => 
                          handleMultiSelectChange(option, checked as boolean)
                        }
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
            className="h-8 text-sm"
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