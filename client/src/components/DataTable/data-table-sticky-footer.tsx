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
    if (column.type === 'number') {
      const values = data.map(row => Number(row[column.field])).filter(val => !isNaN(val));
      const sum = values.reduce((acc, val) => acc + val, 0);
      const avg = values.length > 0 ? sum / values.length : 0;
      const min = Math.min(...values);
      const max = Math.max(...values);
      
      return { sum, avg, min, max, count: values.length };
    }
    return { count: data.length };
  };

  const renderSummaryCell = (column: DataTableColumn<T>, isPinned: boolean = false) => {
    const summary = calculateSummary(column);
    
    return (
      <td
        key={String(column.field)}
        className={cn(
          "px-4 py-2 text-sm font-medium border-t border-gray-200",
          isPinned && "sticky z-10 bg-gray-50/90 backdrop-blur-sm",
          column.pinned === 'left' && "left-0 border-r border-gray-300 shadow-sm",
          column.pinned === 'right' && "right-0 border-l border-gray-300 shadow-sm"
        )}
        style={{
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
          width: column.width,
        }}
      >
        {column.type === 'number' && summary.sum !== undefined ? (
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Badge variant="secondary" className="text-xs">Sum</Badge>
              <span>{summary.sum.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="secondary" className="text-xs">Avg</Badge>
              <span>{summary.avg?.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="text-xs">Count</Badge>
            <span>{summary.count}</span>
          </div>
        )}
      </td>
    );
  };

  return (
    <div className={cn("sticky bottom-0 z-10 bg-white border-t border-gray-200", className)}>
      <table className="w-full">
        <tfoot>
          <tr className="bg-gray-50">
            <td className="px-4 py-2 text-sm font-medium text-gray-700 border-t border-gray-200">
              Summary
            </td>
            {pinnedLeftColumns.map(column => renderSummaryCell(column, true))}
            {unpinnedColumns.map(column => renderSummaryCell(column))}
            {pinnedRightColumns.map(column => renderSummaryCell(column, true))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}