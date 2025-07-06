import React from 'react';
import { Download, Settings, Expand, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { DataTableColumn, FilterConfig } from './types';

interface DataTableActionBarProps<T> {
  columns: DataTableColumn<T>[];
  filters: FilterConfig[];
  groupBy?: string;
  onExport?: (format: 'csv') => void;
  onClearFilters: () => void;
  onOpenColumnConfig: () => void;
  onToggleFullscreen: () => void;
  onGroupByChange: (field: string | null) => void;
  isFullscreen: boolean;
}

export function DataTableActionBar<T>({
  columns,
  filters,
  groupBy,
  onExport,
  onClearFilters,
  onOpenColumnConfig,
  onToggleFullscreen,
  onGroupByChange,
  isFullscreen,
}: DataTableActionBarProps<T>) {
  const groupableColumns = columns.filter(col => col.groupable);
  const activeFiltersCount = filters.length;

  return (
    <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Export Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExport?.('csv')}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>

        {/* Filter Indicator */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white">
              <Filter className="h-3 w-3 mr-1" />
              {activeFiltersCount} Filter{activeFiltersCount > 1 ? 's' : ''}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* Group By Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Group by:</span>
          <Select value={groupBy || ''} onValueChange={(value) => onGroupByChange(value || null)}>
            <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {groupableColumns.map(column => (
                <SelectItem key={String(column.field)} value={String(column.field)}>
                  {column.header}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Column Configuration */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenColumnConfig}
          className="text-white hover:bg-white/20"
        >
          <Settings className="h-4 w-4" />
        </Button>

        {/* Fullscreen Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleFullscreen}
          className="text-white hover:bg-white/20"
        >
          <Expand className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}