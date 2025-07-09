
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableColumn } from './types';
import { cn } from '@/lib/utils';

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
    return visibleColumns.map(column => {
      const width = column.width || column.minWidth || (column.filterable ? 180 : 120);
      return `${width}px`;
    }).join(' ');
  };

  return (
    <div 
      className="bg-gray-100 hover:bg-gray-200 transition-colors border-b border-gray-200 grid"
      style={{
        gridTemplateColumns: generateGridColumns(),
        minWidth: 'fit-content'
      }}
    >
      {visibleColumns.map((column, index) => {
        // Check if this is a checkbox column (usually first column with field '__select__' or if it's the first data column)
        const isCheckboxColumn = String(column.field) === '__select__';
        const isFirstDataColumn = !isCheckboxColumn && index === (visibleColumns.some(col => String(col.field) === '__select__') ? 1 : 0);
        
        if (isCheckboxColumn) {
          // Checkbox column: Skip rendering - will be handled by colSpan in first data column
          return null;
        } else if (isFirstDataColumn) {
          // First data column: show the group text with indentation based on level
          // ColSpan with checkbox column if it exists for more width
          const hasCheckboxColumn = visibleColumns.some(col => String(col.field) === '__select__');
          const indentSize = level * 30; // 30px per level for better hierarchy visualization
          
          return (
            <div 
              key={String(column.field)} 
              className={cn(
                "px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors border-b border-gray-200",
                hasCheckboxColumn && "col-span-2"
              )}
              style={{
                minWidth: hasCheckboxColumn ? '200px' : (column.minWidth || '120px'),
              }}
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
                <div 
                  className="flex items-center gap-2 py-1 px-3 rounded-lg flex-grow"
                  style={{ 
                    backgroundColor: level > 0 ? `rgba(59, 130, 246, ${0.1 + (level * 0.05)})` : 'rgba(59, 130, 246, 0.05)',
                    borderLeft: level > 0 ? `3px solid rgba(59, 130, 246, ${0.3 + (level * 0.2)})` : '3px solid rgba(59, 130, 246, 0.2)'
                  }}
                >
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
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors border-b border-gray-200"
              style={{
                minWidth: column.minWidth || '120px',
              }}
            >
              {summary ? (
                <span className="text-sm text-blue-600 font-medium">
                  ${summary.toLocaleString()}
                </span>
              ) : null}
            </div>
          );
        }
      })}
    </div>
  );
}