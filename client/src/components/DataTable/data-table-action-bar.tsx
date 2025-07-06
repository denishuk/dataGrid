import React from 'react';
import { Download, Settings, Maximize2, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DataTableColumn, FilterConfig } from './types';
import { cn } from '@/lib/utils';

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
  const hasActiveFilters = filters.length > 0;

  return (
    <div className="bg-blue-50 border-b border-blue-200 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Export CSV Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport?.('csv')}
            className="flex items-center gap-2 bg-white hover:bg-blue-50"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>

          {/* Group By Dropdown */}
          {groupableColumns.length > 0 && (
            <Select 
              value={groupBy || 'none'} 
              onValueChange={(value) => onGroupByChange(value === 'none' ? null : value)}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Group by: None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Group by: None</SelectItem>
                {groupableColumns.map(col => (
                  <SelectItem key={String(col.field)} value={String(col.field)}>
                    Group by: {col.header}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Filter Indicators */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Filter className="h-3 w-3 mr-1" />
                {filters.length} filter{filters.length > 1 ? 's' : ''}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-6 w-6 p-0 hover:bg-blue-100"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Column Configuration */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenColumnConfig}
            className="h-8 w-8 p-0 hover:bg-blue-100"
            title="Column Configuration"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFullscreen}
            className={cn(
              "h-8 w-8 p-0 hover:bg-blue-100",
              isFullscreen && "bg-blue-100"
            )}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}