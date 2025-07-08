import React, { useState } from 'react';
import { Badge, Button } from '@/components/ui/headless-ui';
import { X, GripVertical } from 'lucide-react';
import { DataTableColumn } from './types';

interface DataTableGroupingAreaProps<T> {
  columns: DataTableColumn<T>[];
  groupBy?: string | string[];
  onGroupByChange: (fields: string[] | null) => void;
}

export function DataTableGroupingArea<T>({
  columns,
  groupBy,
  onGroupByChange
}: DataTableGroupingAreaProps<T>) {
  const groupableColumns = columns.filter(col => col.groupable);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  if (groupableColumns.length === 0) return null;

  const activeGroups = Array.isArray(groupBy) ? groupBy : (groupBy ? [groupBy] : []);

  const handleAddGroup = (field: string) => {
    const newGroups = [...activeGroups, field];
    onGroupByChange(newGroups);
  };

  const handleRemoveGroup = (field: string) => {
    const newGroups = activeGroups.filter(g => g !== field);
    onGroupByChange(newGroups.length > 0 ? newGroups : null);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    console.log('Drag start for index:', index, 'field:', activeGroups[index]);
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    console.log('Drop event - draggedIndex:', draggedIndex, 'dropIndex:', dropIndex);
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      console.log('Drop cancelled - same position or no drag');
      return;
    }

    const newGroups = [...activeGroups];
    const draggedItem = newGroups[draggedIndex];
    newGroups.splice(draggedIndex, 1);
    newGroups.splice(dropIndex, 0, draggedItem);
    
    console.log('Reordering groups:', activeGroups, '->', newGroups);
    onGroupByChange(newGroups);
    setDraggedIndex(null);
  };

  return (
    <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-gray-700">Group by</span>
        
        <div className="flex items-center gap-2">
          {/* Currently active grouping */}
          {activeGroups.map((field, index) => (
            <div
              key={field}
              draggable={activeGroups.length > 1}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={() => {
                console.log('Drag ended');
                setDraggedIndex(null);
              }}
              className="inline-block"
            >
              <Badge 
                variant="secondary" 
                className={`bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 flex items-center gap-1 select-none transition-all duration-200 ${
                  activeGroups.length > 1 ? 'cursor-move' : 'cursor-default'
                } ${
                  draggedIndex === index ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                }`}
              >
              {activeGroups.length > 1 && (
                <GripVertical className="h-3 w-3 cursor-move" />
              )}
              {columns.find(col => String(col.field) === field)?.header}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveGroup(field)}
                className="h-4 w-4 p-0 ml-1 hover:bg-blue-300"
              >
                <X className="h-3 w-3" />
              </Button>
              </Badge>
            </div>
          ))}
          
          {/* Available grouping options */}
          {groupableColumns
            .filter(col => !activeGroups.includes(String(col.field)))
            .map(col => (
              <Badge 
                key={String(col.field)}
                variant="outline"
                className="cursor-pointer hover:bg-gray-200 border-gray-300"
                onClick={() => handleAddGroup(String(col.field))}
              >
                {col.header}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}