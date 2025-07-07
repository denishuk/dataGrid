import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTableColumn } from './types';

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
  
  return (
    <React.Fragment>
      {visibleColumns.map((column, index) => {
        // Check if this is a checkbox column (usually first column with field '__select__' or if it's the first data column)
        const isCheckboxColumn = String(column.field) === '__select__';
        const isFirstDataColumn = !isCheckboxColumn && index === (visibleColumns.some(col => String(col.field) === '__select__') ? 1 : 0);
        
        if (isCheckboxColumn) {
          // Checkbox column: part of the group header spanning
          return (
            <td 
              key={String(column.field)} 
              className="px-2 py-3 bg-gray-100 hover:bg-gray-200 transition-colors border-b border-gray-200"
              style={{
                minWidth: '48px',
                width: '48px',
              }}
            >
              <div className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  className="h-6 w-6 p-0"
                >
                  {expanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </td>
          );
        } else if (isFirstDataColumn) {
          // First data column (Email): show the group text with indentation based on level
          const indentSize = level * 30; // 30px per level for better hierarchy visualization
          return (
            <td 
              key={String(column.field)} 
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors border-b border-gray-200"
              style={{
                minWidth: column.minWidth || '120px',
              }}
            >
              <div className="flex items-center gap-2" style={{ paddingLeft: `${indentSize}px` }}>
                <div 
                  className="flex items-center gap-2 py-1 px-2 rounded"
                  style={{ 
                    backgroundColor: level > 0 ? `rgba(59, 130, 246, ${0.1 + (level * 0.05)})` : 'transparent',
                    borderLeft: level > 0 ? `3px solid rgba(59, 130, 246, ${0.3 + (level * 0.2)})` : 'none'
                  }}
                >
                  <span className="font-medium text-gray-900">
                    {groupValue} ({itemCount})
                  </span>
                  {field && (
                    <span className="text-xs text-gray-500 ml-1">
                      ({field})
                    </span>
                  )}
                </div>
              </div>
            </td>
          );
        } else {
          // Other columns: show summary if available
          const fieldName = String(column.field);
          const summary = summaries?.get(fieldName);
          
          return (
            <td 
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
            </td>
          );
        }
      })}
    </React.Fragment>
  );
}