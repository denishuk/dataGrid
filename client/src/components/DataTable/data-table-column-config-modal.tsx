import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DataTableColumnConfig } from './data-table-column-config';
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
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Column Configuration</DialogTitle>
          <DialogDescription>
            Configure column visibility, pinning, and ordering for the data table.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 relative">
          <DataTableColumnConfig
            columns={columns}
            onColumnChange={onColumnChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}