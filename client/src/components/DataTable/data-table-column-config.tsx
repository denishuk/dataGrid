import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Eye, EyeOff, GripVertical, Pin, PinOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { DataTableColumn } from './types';
import { cn } from '@/lib/utils';

interface DataTableColumnConfigProps<T> {
  columns: DataTableColumn<T>[];
  onColumnChange: (columns: DataTableColumn<T>[]) => void;
}

export function DataTableColumnConfig<T>({ columns, onColumnChange }: DataTableColumnConfigProps<T>) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newColumns = Array.from(columns);
    const [reorderedColumn] = newColumns.splice(result.source.index, 1);
    newColumns.splice(result.destination.index, 0, reorderedColumn);

    onColumnChange(newColumns);
  };

  const toggleVisibility = (index: number) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], hidden: !newColumns[index].hidden };
    onColumnChange(newColumns);
  };

  const togglePin = (index: number, side: 'left' | 'right' | null) => {
    const newColumns = [...columns];
    newColumns[index] = { ...newColumns[index], pinned: side };
    onColumnChange(newColumns);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        Drag and drop to reorder columns. Use the controls to show/hide and pin columns.
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="columns">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {columns.map((column, index) => (
                <Draggable
                  key={String(column.field)}
                  draggableId={String(column.field)}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={cn(
                        "flex items-center gap-3 p-3 bg-white border rounded-lg",
                        snapshot.isDragging && "shadow-lg",
                        column.hidden && "opacity-50"
                      )}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="text-gray-400 hover:text-gray-600 cursor-grab"
                      >
                        <GripVertical className="h-4 w-4" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{column.header}</span>
                          {column.pinned && (
                            <Badge variant="secondary" className="text-xs">
                              Pinned {column.pinned}
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Field: {String(column.field)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Pin Controls */}
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePin(index, column.pinned === 'left' ? null : 'left')}
                            className={cn(
                              "h-8 w-8 p-0",
                              column.pinned === 'left' && "bg-blue-100 text-blue-600"
                            )}
                            title="Pin Left"
                          >
                            <Pin className="h-3 w-3 rotate-[-90deg]" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => togglePin(index, column.pinned === 'right' ? null : 'right')}
                            className={cn(
                              "h-8 w-8 p-0",
                              column.pinned === 'right' && "bg-blue-100 text-blue-600"
                            )}
                            title="Pin Right"
                          >
                            <Pin className="h-3 w-3 rotate-90" />
                          </Button>
                        </div>

                        {/* Visibility Toggle */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleVisibility(index)}
                          className="h-8 w-8 p-0"
                          title={column.hidden ? "Show Column" : "Hide Column"}
                        >
                          {column.hidden ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}