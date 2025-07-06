import React, { useState, useEffect } from 'react';
import { Search, Download, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTableProps } from './types';
import { DataTableHeader } from './DataTableHeader';
import { DataTableRow } from './DataTableRow';
import { DataTableGroupHeader } from './DataTableGroupHeader';
import { DataTableFilters } from './DataTableFilters';
import { DataTableColumnConfig } from './DataTableColumnConfig';
import { useDataTable } from './hooks/useDataTable';
import { useVirtualization } from './hooks/useVirtualization';
import { exportToCsv, exportToJson } from './utils/exportUtils';
import { cn } from '@/lib/utils';

export function DataTable<T extends Record<string, any>>({
  data,
  columns: initialColumns,
  groupBy: initialGroupBy,
  virtualScrolling = false,
  selectionMode = 'multiple',
  stickyHeader = true,
  showFilters = true,
  showColumnConfig = true,
  pageSize = 50,
  className,
  onRowSelect,
  onExport,
  onColumnChange,
}: DataTableProps<T>) {
  const [columns, setColumns] = useState(initialColumns);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    filteredData,
    groupedData,
    selectedRows,
    filters,
    sorts,
    groupBy,
    searchQuery,
    setSearchQuery,
    setGroupBy,
    toggleSort,
    addFilter,
    removeFilter,
    clearFilters,
    toggleRowSelection,
    toggleAllSelection,
    toggleGroup,
  } = useDataTable(data, columns);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredData.length);
  const paginatedData = virtualScrolling ? groupedData : groupedData.slice(startIndex, endIndex);

  const virtualization = useVirtualization({
    itemCount: groupedData.length,
    itemHeight: 48,
    containerHeight: 600,
    overscan: 10,
  });

  useEffect(() => {
    if (onRowSelect) {
      onRowSelect(selectedRows);
    }
  }, [selectedRows, onRowSelect]);

  useEffect(() => {
    if (onColumnChange) {
      onColumnChange(columns);
    }
  }, [columns, onColumnChange]);

  useEffect(() => {
    if (initialGroupBy) {
      setGroupBy(initialGroupBy);
    }
  }, [initialGroupBy, setGroupBy]);

  const handleExport = (format: 'csv' | 'json') => {
    if (onExport) {
      onExport(filteredData, format);
    } else {
      if (format === 'csv') {
        exportToCsv(filteredData, columns);
      } else {
        exportToJson(filteredData);
      }
    }
  };

  const handleGroupByChange = (value: string) => {
    setGroupBy(value === 'none' ? '' : value);
  };

  const groupableColumns = columns.filter(col => col.groupable);
  const showSelection = selectionMode !== 'none';

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-200", className)}>
      {/* Header Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search across all columns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={groupBy || 'none'} onValueChange={handleGroupByChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Group by: None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Group by: None</SelectItem>
                  {groupableColumns.map(col => (
                    <SelectItem key={String(col.field)} value={String(col.field)}>
                      Group by: {col.header}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Showing {startIndex + 1}-{endIndex} of {filteredData.length} rows
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('json')}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <DataTableFilters
          columns={columns}
          filters={filters}
          onAddFilter={addFilter}
          onRemoveFilter={removeFilter}
          onClearFilters={clearFilters}
          isExpanded={showAdvancedFilters}
          onToggleExpanded={() => setShowAdvancedFilters(!showAdvancedFilters)}
        />
      )}

      {/* Column Configuration */}
      {showColumnConfig && (
        <DataTableColumnConfig
          columns={columns}
          onColumnChange={setColumns}
        />
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <div
          className={cn(
            "relative",
            virtualScrolling && "overflow-y-auto"
          )}
          style={{ height: virtualScrolling ? '600px' : 'auto' }}
          onScroll={virtualScrolling ? virtualization.handleScroll : undefined}
        >
          {virtualScrolling && (
            <div style={{ height: virtualization.totalHeight, position: 'relative' }}>
              <div style={{ transform: `translateY(${virtualization.offsetY}px)` }}>
                <table className="w-full text-sm">
                  <DataTableHeader
                    columns={columns}
                    sorts={sorts}
                    selectedRows={selectedRows}
                    totalRows={filteredData.length}
                    onSort={toggleSort}
                    onSelectAll={toggleAllSelection}
                    showSelection={showSelection}
                  />
                  <tbody className="bg-white divide-y divide-gray-200">
                    {virtualization.visibleItems.map(index => {
                      const row = groupedData[index];
                      if ((row as any).__isGroupHeader) {
                        return (
                          <tr key={`group-${(row as any).__groupValue}`}>
                            <DataTableGroupHeader
                              groupValue={(row as any).__groupValue}
                              itemCount={(row as any).__itemCount}
                              expanded={(row as any).__expanded}
                              onToggle={() => toggleGroup((row as any).__groupValue)}
                            />
                          </tr>
                        );
                      }
                      return (
                        <DataTableRow
                          key={row.id || index}
                          row={row}
                          columns={columns}
                          isSelected={selectedRows.some(r => r.id === row.id)}
                          showSelection={showSelection}
                          onRowSelect={toggleRowSelection}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {!virtualScrolling && (
            <table className="w-full text-sm">
              <DataTableHeader
                columns={columns}
                sorts={sorts}
                selectedRows={selectedRows}
                totalRows={filteredData.length}
                onSort={toggleSort}
                onSelectAll={toggleAllSelection}
                showSelection={showSelection}
              />
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((row, index) => {
                  if ((row as any).__isGroupHeader) {
                    return (
                      <tr key={`group-${(row as any).__groupValue}`}>
                        <DataTableGroupHeader
                          groupValue={(row as any).__groupValue}
                          itemCount={(row as any).__itemCount}
                          expanded={(row as any).__expanded}
                          onToggle={() => toggleGroup((row as any).__groupValue)}
                        />
                      </tr>
                    );
                  }
                  return (
                    <DataTableRow
                      key={row.id || index}
                      row={row}
                      columns={columns}
                      isSelected={selectedRows.some(r => r.id === row.id)}
                      showSelection={showSelection}
                      onRowSelect={toggleRowSelection}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
