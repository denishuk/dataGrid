
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableColumn } from './types';
import { cn } from '@/lib/utils';
import { DEFAULT_ROW_HEIGHT, INDENT_SIZE } from '@/components/DataTable/constants.ts';

interface DataTableGroupHeaderProps<T = any> {
  groupValue: string;
  itemCount: number;
  expanded: boolean;
  summaries?: Map<string, number>;
  columns: DataTableColumn<T>[];
  onToggle: () => void;
  level?: number;
  field?: string;
}

export function DataTableGroupHeader<T>({
  groupValue,
  itemCount,
  expanded,
  summaries,
  columns,
  onToggle,
  level = 0,
  field
}: DataTableGroupHeaderProps<T>) {
  const visibleColumns = columns.filter(col => !col.hidden);

  // Generate grid columns template based on column widths
  const generateGridColumns = () => {
    return visibleColumns.map((column, index) => {
      // First column should expand to fill available space
      if (index === 0) {
        return 'minmax(200px, 1fr)';
      }
      const width = column.width || column.minWidth || (column.filterable ? 180 : 120);
      return `${width}px`;
    }).join(' ');
  };

  return (
    <div
      className="transition-colors grid"
      style={{
        gridTemplateColumns: generateGridColumns(),
        minWidth: 'fit-content'
      }}
    >
      {visibleColumns.map((column, index) => {
        // Check if this is a checkbox column (usually first column with field '__select__' or if it's the first data column)
        const isCheckboxColumn = String(column.field) === '__select__';
        const isFirstDataColumn = !isCheckboxColumn && index === (visibleColumns.some(col => String(col.field) === '__select__') ? 1 : 0);

        if (isCheckboxColumn || isFirstDataColumn) {
          // First column (whether checkbox or data): show the group text with full width
          const indentSize = level * INDENT_SIZE;

          return (
            <div
              key={String(column.field)}
              className={cn(
                `min-h-[${DEFAULT_ROW_HEIGHT}px]`,
                "px-4 py-2 transition-colors bg-white flex items-center justify-start",
                column.pinned === "left" ? "left-0 border-r z-10 sticky border-gray-800/10 shadow-md overflow-x-hidden" : "",
              )}
            >
              <div className="flex items-center gap-3" style={{ paddingLeft: `${indentSize}px` }}>
                {/* Expand/Collapse Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  className={cn(
                    "h-6 w-6 p-0 flex-shrink-0",
                    "transition-all duration-200 ease-in-out",
                    "hover:scale-110 active:scale-95",
                    "hover:bg-gray-200 focus:ring-2 focus:ring-indigo-500"
                  )}
                >
                  <div className="transition-transform duration-200 ease-in-out">
                    {expanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </Button>

                {/* Group Label */}
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 text-sm">
                    {groupValue} ({itemCount})
                  </span>
                  {field && (
                    <span className="text-xs text-gray-500 ml-1">
                      ({field})
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        } else {
          // Other columns: show summary if available
          const fieldName = String(column.field);
          const summary = summaries?.get(fieldName);

          return (
            <div
              key={String(column.field)}
              className={cn(
                `min-w-[${column.minWidth || '120px'}]`,
                `min-h-[${DEFAULT_ROW_HEIGHT}px]`,
                "px-4 py-2 transition-colors flex items-center",
                column.pinned === "left" ? "left-0 border-r sticky z-10  border-gray-800/10 shadow-md overflow-x-hidden" : "",
                column.pinned === "right" ? "right-0 bg-white border-l sticky z-10 border-gray-800/10 shadow-md overflow-x-hidden" : ""
              )}
            >
              {summary && (
                <span className="font-mono text-xs font-medium">
                  ${summary.toLocaleString()}
                </span>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}