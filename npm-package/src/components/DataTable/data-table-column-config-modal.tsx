import React, { useEffect } from 'react';
import { HeadlessDialog as Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/headless-ui';
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
  useEffect(() => {
    // Create portal container for drag elements to fix positioning
    if (open) {
      const portalContainer = document.createElement('div');
      portalContainer.id = 'drag-portal';
      portalContainer.style.position = 'fixed';
      portalContainer.style.top = '0';
      portalContainer.style.left = '0';
      portalContainer.style.zIndex = '9999';
      portalContainer.style.pointerEvents = 'none';
      document.body.appendChild(portalContainer);

      return () => {
        const portal = document.getElementById('drag-portal');
        if (portal) {
          document.body.removeChild(portal);
        }
      };
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
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