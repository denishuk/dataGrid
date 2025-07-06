import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DataTableGroupHeaderProps {
  groupValue: string;
  itemCount: number;
  expanded: boolean;
  onToggle: () => void;
}

export function DataTableGroupHeader({ 
  groupValue, 
  itemCount, 
  expanded, 
  onToggle 
}: DataTableGroupHeaderProps) {
  return (
    <td colSpan={100} className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-6 w-6"
          onClick={onToggle}
        >
          {expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        <span className="font-medium text-gray-900">{groupValue}</span>
        <span className="text-sm text-gray-500">({itemCount} items)</span>
      </div>
    </td>
  );
}
