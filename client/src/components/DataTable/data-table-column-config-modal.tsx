import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Pin, PinOff, Eye, EyeOff, GripVertical } from 'lucide-react';
import { DataTableColumn } from './types';

interface DataTableColumnConfigModalProps<T> {
  open: boolean;
  onClose: () => void;
  columns: DataTableColumn<T>[];
  onColumnChange: (columns: DataTableColumn<T>[]) => void;
}

export function DataTableColumnConfigModal<T>({
  open,
  onClose,
  columns,
  onColumnChange,
}: DataTableColumnConfigModalProps<T>) {
  const handleToggleVisibility = (field: keyof T) => {
    const newColumns = columns.map(col => 
      col.field === field ? { ...col, hidden: !col.hidden } : col
    );
    onColumnChange(newColumns);
  };

  const handleTogglePin = (field: keyof T, position: 'left' | 'right' | null) => {
    const newColumns = columns.map(col => 
      col.field === field ? { ...col, pinned: col.pinned === position ? null : position } : col
    );
    onColumnChange(newColumns);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Column Configuration</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {columns.map((column) => (
            <div key={String(column.field)} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-medium">{column.header}</div>
                  <div className="text-sm text-gray-500">{String(column.field)}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Pinning Controls */}
                <div className="flex items-center gap-1">
                  <Button
                    variant={column.pinned === 'left' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleTogglePin(column.field, 'left')}
                  >
                    <Pin className="h-3 w-3 mr-1" />
                    L
                  </Button>
                  <Button
                    variant={column.pinned === 'right' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleTogglePin(column.field, 'right')}
                  >
                    <Pin className="h-3 w-3 mr-1" />
                    R
                  </Button>
                  {column.pinned && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePin(column.field, null)}
                    >
                      <PinOff className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-2">
                  {column.pinned && (
                    <Badge variant="secondary" className="text-xs">
                      Pinned {column.pinned}
                    </Badge>
                  )}
                  {column.sortable && (
                    <Badge variant="outline" className="text-xs">
                      Sortable
                    </Badge>
                  )}
                  {column.filterable && (
                    <Badge variant="outline" className="text-xs">
                      Filterable
                    </Badge>
                  )}
                </div>

                {/* Visibility Toggle */}
                <div className="flex items-center gap-2">
                  <Switch
                    checked={!column.hidden}
                    onCheckedChange={() => handleToggleVisibility(column.field)}
                  />
                  {column.hidden ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-600" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end pt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}