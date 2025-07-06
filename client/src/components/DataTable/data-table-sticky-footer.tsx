import React from 'react';
import { DataTableColumn } from './types';

interface DataTableStickyFooterProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  visible: boolean;
  className?: string;
}

export function DataTableStickyFooter<T extends Record<string, any>>({
  columns,
  data,
  visible,
  className = '',
}: DataTableStickyFooterProps<T>) {
  if (!visible) return null;

  const visibleColumns = columns.filter(col => !col.hidden);
  
  const calculateSummary = (column: DataTableColumn<T>) => {
    if (column.type === 'number') {
      const values = data.map(row => {
        const value = row[column.field];
        return typeof value === 'string' ? parseFloat(value.replace(/[$,]/g, '')) : Number(value) || 0;
      });
      const sum = values.reduce((acc, val) => acc + val, 0);
      return column.field === 'salary' ? `$${sum.toLocaleString()}` : sum.toLocaleString();
    }
    return null;
  };

  return (
    <div className={`sticky bottom-0 bg-gray-50 border-t border-gray-200 ${className}`}>
      <div className="flex">
        {visibleColumns.map((column) => {
          const summary = calculateSummary(column);
          const pinnedClass = column.pinned === 'left' 
            ? 'sticky left-0 z-10 bg-gray-50 shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)]' 
            : column.pinned === 'right' 
            ? 'sticky right-0 z-10 bg-gray-50 shadow-[-2px_0_4px_-1px_rgba(0,0,0,0.1)]' 
            : '';

          return (
            <div
              key={String(column.field)}
              className={`p-3 border-r text-sm font-medium text-gray-700 ${pinnedClass}`}
              style={{ 
                minWidth: column.minWidth || 100,
                width: column.width || 'auto',
                maxWidth: column.maxWidth || 'none'
              }}
            >
              {summary || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}