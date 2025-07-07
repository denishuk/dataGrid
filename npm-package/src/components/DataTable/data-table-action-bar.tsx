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
  groupByFields: string[];
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
  groupByFields,
  isFullscreen,
}: DataTableActionBarProps<T>) {
  const groupableColumns = columns.filter(col => col.groupable);
  const hasActiveFilters = filters.length > 0;

  return (
    <div className="bg-blue-600 text-white p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Export CSV Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport?.('csv')}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white border-blue-500"
          >
            <Download className="h-4 w-4 text-white" />
            Export CSV
          </Button>

          {/* Group by functionality moved to separate area */}

          {/* Filter Indicators */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-500 text-white border-blue-400">
                <Filter className="h-3 w-3 mr-1 text-white" />
                {filters.length} filter{filters.length > 1 ? 's' : ''}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-6 w-6 p-0 hover:bg-blue-700 text-white"
              >
                <X className="h-3 w-3 text-white" />
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
            className="h-8 w-8 p-0 hover:bg-blue-700 text-white"
            title="Column Configuration"
          >
            <Settings className="h-4 w-4 text-white" />
          </Button>

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFullscreen}
            className={cn(
              "h-8 w-8 p-0 hover:bg-blue-700 text-white",
              isFullscreen && "bg-blue-700"
            )}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            <Maximize2 className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}