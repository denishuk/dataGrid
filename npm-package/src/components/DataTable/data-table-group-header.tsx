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
}

export function DataTableGroupHeader<T>({ 
  groupValue, 
  itemCount, 
  expanded, 
  summaries,
  columns,
  onToggle 
}: DataTableGroupHeaderProps<T>) {
  const visibleColumns = columns.filter(col => !col.hidden);
  
  return (
    <>
      {visibleColumns.map((column, index) => {
        if (index === 0) {
          // First column: show the toggle and group info
          return (
            <td 
              key={String(column.field)} 
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors border-b border-gray-200"
              style={{
                minWidth: column.minWidth || '120px',
              }}
            >
              <div className="flex items-center gap-2">
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
                <span className="font-medium text-gray-900">
                  {groupValue} ({itemCount} items)
                </span>
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
    </>
  );
}