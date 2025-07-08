import React, { useState, useEffect } from 'react';
import { DataTableProps } from './types';
import { DataTableHeader } from './data-table-header';
import { DataTableRow } from './data-table-row';
import { DataTableGroupHeader } from './data-table-group-header';
import { DataTableActionBar } from './data-table-action-bar';
import { DataTableGroupingArea } from './data-table-grouping-area';
import { DataTableColumnConfigModal } from './data-table-column-config-modal';
import { DataTablePagination } from './data-table-pagination';
import { DataTableStickyFooter } from './data-table-sticky-footer';
import { useDataTable } from './hooks/use-data-table';
import { useVirtualization } from './hooks/use-virtualization';
import { exportToCsv } from './utils/export-utils';
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
  pageSize: initialPageSize = 50,
  className,
  enablePdfExport = false,
  onRowSelect,
  onExport,
  onColumnChange,
  onCellEdit,
}: DataTableProps<T>) {
  const [columns, setColumns] = useState(initialColumns);
  const [showColumnConfigModal, setShowColumnConfigModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showStickyFooter, setShowStickyFooter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(initialPageSize);

  const {
    filteredData,
    groupedData,
    selectedRows,
    filters,
    sorts,
    groupBy: currentGroupBy,
    setGroupBy,
    sortBy,
    addFilter,
    removeFilter,
    clearFilters,
    toggleRowSelection,
    selectAllRows,
    toggleGroup,
    filterByColumn,
  } = useDataTable({
    data,
    initialColumns: columns,
    initialGroupBy: typeof initialGroupBy === 'string' ? initialGroupBy : initialGroupBy?.[0] || '',
    selectionMode,
    onRowSelect,
    onCellEdit,
  });

  const totalPages = Math.ceil(filteredData.length / currentPageSize);
  const startIndex = (currentPage - 1) * currentPageSize;
  const endIndex = Math.min(startIndex + currentPageSize, filteredData.length);
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
      const groupByField = typeof initialGroupBy === 'string' ? initialGroupBy : initialGroupBy[0];
      if (groupByField) {
        setGroupBy(groupByField);
      }
    }
  }, [initialGroupBy, setGroupBy]);

  const handleExport = (format: 'csv' | 'pdf') => {
    if (onExport) {
      onExport(filteredData, format);
    } else if (format === 'csv') {
      exportToCsv(filteredData, columns);
    } else if (format === 'pdf') {
      // PDF export functionality - could be implemented with libraries like jsPDF
      console.log('PDF export not implemented yet');
    }
  };

  const handleGroupByChange = (value: string | null) => {
    setGroupBy(value || '');
  };

  const handleFilterChange = (field: string, filter: any) => {
    filterByColumn(field, filter);
  };

  const toggleSort = (field: string) => {
    sortBy(field);
  };

  const toggleAllSelection = () => {
    selectAllRows();
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setCurrentPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const showSelection = selectionMode !== 'none';

  return (
    <div
      className={cn(
        isFullscreen && "fixed inset-0 z-50",
        className
      )}
    >
      {/* Blue Action Bar */}
      <DataTableActionBar
        filters={filters}
        onExport={handleExport}
        onClearFilters={clearFilters}
        onOpenColumnConfig={() => setShowColumnConfigModal(true)}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        isFullscreen={isFullscreen}
        enablePdfExport={enablePdfExport}
      />

      {/* Grouping Area */}
      <DataTableGroupingArea
        columns={columns}
        groupBy={currentGroupBy}
        onGroupByChange={handleGroupByChange}
      />

      {/* Column Configuration Modal */}
      <DataTableColumnConfigModal
        open={showColumnConfigModal}
        onClose={() => setShowColumnConfigModal(false)}
        columns={columns}
        onColumnChange={setColumns}
      />

      {/* Table Container */}
      <div className="overflow-x-auto">
        <div
          className={cn(
            "relative overflow-x-auto",
            virtualScrolling && "overflow-y-auto"
          )}
          style={{ height: virtualScrolling ? '600px' : 'auto' }}
          onScroll={virtualScrolling ? virtualization.handleScroll : undefined}
        >
          {virtualScrolling && (
            <div style={{ height: virtualization.totalHeight, position: 'relative' }}>
              <div style={{ transform: `translateY(${virtualization.offsetY}px)` }}>
                <table className="min-w-full text-sm border-collapse table-fixed">
                  <DataTableHeader
                    columns={columns}
                    sorts={sorts || []}
                    filters={filters || []}
                    selectedRows={selectedRows}
                    totalRows={filteredData.length}
                    data={data}
                    onSort={toggleSort}
                    onSelectAll={toggleAllSelection}
                    onFilterChange={handleFilterChange}
                    showSelection={showSelection}
                    showFilters={showFilters}
                  />
                  <tbody className="bg-white divide-y divide-gray-200">
                    {virtualization.visibleItems.map(index => {
                      const row = groupedData[index];
                      if ((row as any).__isGroupHeader) {
                        return (
                          <tr key={`group-${(row as any).__groupKey || (row as any).__groupValue}`}>
                            <DataTableGroupHeader
                              groupValue={(row as any).__groupValue}
                              itemCount={(row as any).__itemCount}
                              expanded={(row as any).__expanded}
                              summaries={(row as any).__summaries}
                              columns={showSelection ? [{ field: '__select__' as any, header: '' }, ...columns] : columns}
                              onToggle={() => toggleGroup((row as any).__groupKey || (row as any).__groupValue)}
                            />
                          </tr>
                        );
                      }
                      return (
                        <DataTableRow
                          key={(row as any).id || index}
                          row={row}
                          columns={columns}
                          isSelected={selectedRows.some(r => (r as any).id === (row as any).id)}
                          showSelection={showSelection}
                          onRowSelect={toggleRowSelection}
                          onCellEdit={onCellEdit}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!virtualScrolling && (
            <table className="min-w-full text-sm border-collapse table-fixed">
              <DataTableHeader
                columns={columns}
                sorts={sorts || []}
                filters={filters || []}
                selectedRows={selectedRows}
                totalRows={filteredData.length}
                data={data}
                onSort={toggleSort}
                onSelectAll={toggleAllSelection}
                onFilterChange={handleFilterChange}
                showSelection={showSelection}
                showFilters={showFilters}
              />
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((row, index) => {
                  if ((row as any).__isGroupHeader) {
                    return (
                      <tr key={`group-${(row as any).__groupKey || (row as any).__groupValue}`}>
                        <DataTableGroupHeader
                          groupValue={(row as any).__groupValue}
                          itemCount={(row as any).__itemCount}
                          expanded={(row as any).__expanded}
                          summaries={(row as any).__summaries}
                          columns={showSelection ? [{ field: '__select__' as any, header: '' }, ...columns] : columns}
                          onToggle={() => toggleGroup((row as any).__groupKey || (row as any).__groupValue)}
                          level={(row as any).__level || 0}
                          field={(row as any).__field}
                        />
                      </tr>
                    );
                  }
                  return (
                    <DataTableRow
                      key={(row as any).id || index}
                      row={row}
                      columns={columns}
                      isSelected={selectedRows.some(r => (r as any).id === (row as any).id)}
                      showSelection={showSelection}
                      onRowSelect={toggleRowSelection}
                      onCellEdit={onCellEdit}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Sticky Footer */}
      <DataTableStickyFooter
        columns={columns}
        data={filteredData}
        visible={showStickyFooter}
      />

      {/* Pagination */}
      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={currentPageSize}
        totalItems={filteredData.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}