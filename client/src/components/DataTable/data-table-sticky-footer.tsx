import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DataTableColumn } from './types';
import { cn } from '@/lib/utils';

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
  className,
}: DataTableStickyFooterProps<T>) {
  if (!visible) return null;

  const visibleColumns = columns.filter(col => !col.hidden);
  const pinnedLeftColumns = visibleColumns.filter(col => col.pinned === 'left');
  const unpinnedColumns = visibleColumns.filter(col => !col.pinned);
  const pinnedRightColumns = visibleColumns.filter(col => col.pinned === 'right');

  const calculateSummary = (column: DataTableColumn<T>) => {
    if (!column.aggregation) return null;
    
    const values = data.map(row => {
      const value = column.valueGetter ? column.valueGetter(row) : row[column.field];
      return column.type === 'number' ? Number(value) : value;
    });
    
    const numericValues = values.filter(val => !isNaN(val as number)) as number[];
    
    switch (column.aggregation) {
      case 'count':
        return { label: 'Count', value: data.length };
      case 'sum':
        return { label: 'Sum', value: numericValues.reduce((acc, val) => acc + val, 0) };
      case 'avg':
        return { label: 'Avg', value: numericValues.length > 0 ? numericValues.reduce((acc, val) => acc + val, 0) / numericValues.length : 0 };
      case 'min':
        return { label: 'Min', value: Math.min(...numericValues) };
      case 'max':
        return { label: 'Max', value: Math.max(...numericValues) };
      default:
        return null;
    }
  };

  const renderSummaryCell = (column: DataTableColumn<T>, isPinned: boolean = false) => {
    const summary = calculateSummary(column);

    return (
      <td
        key={String(column.field)}
        className={cn(
          "px-4 py-2 text-sm font-medium text-right border-t border-gray-200",
          isPinned && "sticky z-10 bg-gray-50",
          column.pinned === 'left' && "left-0 border-r",
          column.pinned === 'right' && "right-0 border-l"
        )}
        style={{
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
          width: column.width,
        }}
      >
        {summary ? (
          <div className="flex items-center justify-end gap-1">
            <Badge variant="secondary" className="text-xs">{summary.label}</Badge>
            <span className="font-medium text-blue-600">
              {typeof summary.value === 'number' ? 
                (summary.label === 'Avg' ? summary.value.toFixed(2) : summary.value.toLocaleString()) : 
                summary.value
              }
            </span>
          </div>
        ) : null}
      </td>
    );
  };

  return (
    <div className={cn("sticky bottom-0 z-10 bg-white overflow-x-auto", className)}>
      <table className="min-w-full text-sm border-collapse table-fixed">
        <tfoot>
          <tr className="bg-gray-50">
            {visibleColumns.map((column, index) => {
              return renderSummaryCell(column, column.pinned === 'left' || column.pinned === 'right');
            })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}