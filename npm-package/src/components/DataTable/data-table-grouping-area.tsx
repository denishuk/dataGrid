import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { DataTableColumn } from './types';

interface DataTableGroupingAreaProps<T> {
  columns: DataTableColumn<T>[];
  groupBy?: string;
  onGroupByChange: (field: string | null) => void;
}

export function DataTableGroupingArea<T>({
  columns,
  groupBy,
  onGroupByChange
}: DataTableGroupingAreaProps<T>) {
  const groupableColumns = columns.filter(col => col.groupable);
  
  if (groupableColumns.length === 0) return null;

  return (
    <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-gray-700">Group by</span>
        
        <div className="flex items-center gap-2">
          {/* Currently active grouping */}
          {groupBy && (
            <Badge 
              variant="secondary" 
              className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
            >
              {columns.find(col => String(col.field) === groupBy)?.header}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onGroupByChange(null)}
                className="h-4 w-4 p-0 ml-1 hover:bg-blue-300"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {/* Available grouping options */}
          {groupableColumns
            .filter(col => String(col.field) !== groupBy)
            .map(col => (
              <Badge 
                key={String(col.field)}
                variant="outline"
                className="cursor-pointer hover:bg-gray-200 border-gray-300"
                onClick={() => onGroupByChange(String(col.field))}
              >
                {col.header}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}