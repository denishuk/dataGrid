
import { Badge } from '../../ui/badge';
import { DataTableColumn } from './types';
import { cn } from '../../lib/utils';
import { DEFAULT_ROW_HEIGHT } from './constants.ts';

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
  // const pinnedLeftColumns = visibleColumns.filter(col => col.pinned === 'left');
  // const unpinnedColumns = visibleColumns.filter(col => !col.pinned);
  // const pinnedRightColumns = visibleColumns.filter(col => col.pinned === 'right');

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
      <div
        key={String(column.field)}
        className={cn(
          `min-h-[${DEFAULT_ROW_HEIGHT}px]`,
          "px-4 py-2 font-medium flex text-xs font-mono",
          isPinned && "sticky z-10 bg-gray-50",
          column.pinned === 'left' && "left-0 border-r border-gray-800/10",
          column.pinned === 'right' && "right-0 border-l border-gray-800/10"
        )}
        style={{
          minWidth: column.minWidth,
          maxWidth: column.maxWidth,
          width: column.width,
        }}
      >
        {summary ? (
          <div className="flex gap-1">
            <span className="font-medium">
              {typeof summary.value === 'number' ?
                (summary.label === 'Avg' ? summary.value.toFixed(2) : summary.value.toLocaleString()) :
                summary.value
              }
            </span>
          </div>
        ) : null}
      </div>
    );
  };

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
    <div className={cn("sticky bottom-0 z-10 bg-white overflow-x-auto", className)}>
      <div
        className="min-w-full text-sm bg-gray-50 border-t border-gray-200 grid"
        style={{
          gridTemplateColumns: generateGridColumns(),
          minWidth: 'fit-content'
        }}
      >
        {visibleColumns.map((column, _index) => {
          return renderSummaryCell(column, column.pinned === 'left' || column.pinned === 'right');
        })}
      </div>
    </div>
  );
}