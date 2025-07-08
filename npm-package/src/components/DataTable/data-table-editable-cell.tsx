import React, { useCallback, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, X } from 'lucide-react';
import { DataTableColumn } from './types';

interface DataTableEditableCellProps<T> {
  value: any;
  row: T;
  column: DataTableColumn<T>;
  onSave: (value: any) => void;
  onCancel: () => void;
}

export function DataTableEditableCell<T>({
  value,
  // row,
  column,
  onSave,
  onCancel,
}: DataTableEditableCellProps<T>) {
  const [editValue, setEditValue] = useState(value);

  const handleSave = useCallback(() => {
    onSave(editValue);
  }, [editValue, onSave]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  }, [handleSave, onCancel]);

  const renderEditor = () => {
    switch (column.type) {
      case 'select':
        return (
          <Select value={editValue} onValueChange={setEditValue}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {column.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'number':
        return (
          <Input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-8 text-sm"
            autoFocus
          />
        );
      case 'boolean':
        return (
          <Select value={editValue ? 'true' : 'false'} onValueChange={(val) => setEditValue(val === 'true')}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-8 text-sm"
            autoFocus
          />
        );
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex-1">
        {renderEditor()}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={handleSave}
      >
        <Check className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0"
        onClick={onCancel}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}