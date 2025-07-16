import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Filter } from 'lucide-react';
import { DataTableColumn, FilterConfig } from './types';

interface DataTableFiltersProps<T> {
  columns: DataTableColumn<T>[];
  filters: FilterConfig<T>[];
  onAddFilter: (filter: FilterConfig<T>) => void;
  onRemoveFilter: (field: string) => void;
  onClearFilters: () => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export function DataTableFilters<T>({
  columns,
  filters,
  onAddFilter,
  onClearFilters,
  isExpanded,
  onToggleExpanded,
}: DataTableFiltersProps<T>) {
  const [tempFilters, setTempFilters] = useState<Record<string, any>>({});

  const filterableColumns = columns.filter(col => col.filterable);

  const handleFilterChange = (field: string, value: any, _type: string) => {
    setTempFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const applyFilters = () => {
    Object.entries(tempFilters).forEach(([field, value]) => {
      if (value !== undefined && value !== '') {
        const column = columns.find(col => col.field === field);
        if (column) {
          const operator = column.type === 'number' ? 'gte' : 'contains';
          onAddFilter({
            field,
            operator,
            valueGetter: column.valueGetter,
            value,
            type: column.type || 'text'
          });
        }
      }
    });
    setTempFilters({});
  };

  return (
    <div className="border-b border-gray-200">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpanded}
            className="p-2"
          >
            <Filter className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">Advanced Filters</span>
          {filters.length > 0 && (
            <span className="text-xs text-gray-500">({filters.length} active)</span>
          )}
        </div>
        {filters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            Clear All
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterableColumns.map(column => (
              <div key={String(column.field)} className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  {column.header}
                </Label>
                {column.type === 'select' && column.options ? (
                  <Select
                    value={tempFilters[String(column.field)] || ''}
                    onValueChange={(value) => handleFilterChange(String(column.field), value, column.type!)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {column.options.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : column.type === 'number' ? (
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={tempFilters[`${String(column.field)}_min`] || ''}
                      onChange={(e) => handleFilterChange(`${String(column.field)}_min`, e.target.value, column.type!)}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={tempFilters[`${String(column.field)}_max`] || ''}
                      onChange={(e) => handleFilterChange(`${String(column.field)}_max`, e.target.value, column.type!)}
                    />
                  </div>
                ) : column.type === 'boolean' ? (
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tempFilters[`${String(column.field)}_true`] || false}
                        onChange={(e) =>
                          handleFilterChange(`${String(column.field)}_true`, e.target.checked, column.type!)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span className="ml-2 text-sm">True</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tempFilters[`${String(column.field)}_false`] || false}
                        onChange={(e) =>
                          handleFilterChange(`${String(column.field)}_false`, e.target.checked, column.type!)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span className="ml-2 text-sm">False</span>
                    </label>
                  </div>
                ) : (
                  <Input
                    type="text"
                    placeholder="Contains..."
                    value={tempFilters[String(column.field)] || ''}
                    onChange={(e) => handleFilterChange(String(column.field), e.target.value, column.type!)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClearFilters}>
              Clear All
            </Button>
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
