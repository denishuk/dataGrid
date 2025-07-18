
import { Download, Filter, Maximize2, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FilterConfig } from './types';
import { cn } from '@/lib/utils';

interface DataTableActionBarProps {
  filters: FilterConfig[];
  onExport?: (format: 'csv' | 'pdf') => void;
  onClearFilters: () => void;
  onOpenColumnConfig: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  enablePdfExport?: boolean;
}

export function DataTableActionBar({
  filters,
  onExport,
  onClearFilters,
  onOpenColumnConfig,
  onToggleFullscreen,
  isFullscreen,
  enablePdfExport = false,
}: DataTableActionBarProps) {
  const hasActiveFilters = filters.length > 0;

  return (
    <div className="bg-gray-900 text-white p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport?.('csv')}
              className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800 text-white border-gray-400 hover:border-gray-400/10"
            >
              <Download className="h-4 w-4 text-white" />
              Export CSV
            </Button>

            {enablePdfExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExport?.('pdf')}
                className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-800 text-white border-gray-400 hover:border-gray-400/10"
              >
                <Download className="h-4 w-4 text-white" />
                Export PDF
              </Button>
            )}
          </div>

          {/* Filter Indicators */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-indigo-500 text-white border-indigo-400">
                <Filter className="h-3 w-3 mr-1 text-white" />
                {filters.length} filter{filters.length > 1 ? 's' : ''}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-6 w-6 p-0 hover:bg-indigo-700 text-white"
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
            className="h-8 w-8 p-0 hover:bg-indigo-700 text-white"
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
              "h-8 w-8 p-0 hover:bg-indigo-700 text-white",
              isFullscreen && "bg-indigo-700"
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