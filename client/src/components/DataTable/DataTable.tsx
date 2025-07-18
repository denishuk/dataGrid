import { useEffect, useState } from 'react';
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
  // stickyHeader = true,
  stickyFooter = false,
  showFilters = true,
  // showColumnConfig = true,
  pageSize: initialPageSize = 10,
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
  const [isSorting, setIsSorting] = useState(false);

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
    // addFilter,
    // removeFilter,
    clearFilters,
    toggleRowSelection,
    selectAllRows,
    toggleGroup,
    filterByColumn,
  } = useDataTable({
    data,
    initialColumns: columns,
    initialGroupBy: typeof initialGroupBy === 'string' ? initialGroupBy : initialGroupBy?.[0] || '',
    selectionMode: 'multiple',
    onRowSelect,
    onCellEdit,
  });

  const totalPages = Math.ceil(filteredData.length / currentPageSize);
  const startIndex = (currentPage - 1) * currentPageSize;
  const endIndex = Math.min(startIndex + currentPageSize, filteredData.length);
  const paginatedData = virtualScrolling ? groupedData : groupedData.slice(startIndex, endIndex);

  const [containerHeight, setContainerHeight] = useState<number>(600);

  useEffect(() => {
    const calculateHeight = () => {
      if (isFullscreen) {
        // In fullscreen mode, use most of the viewport
        const viewportHeight = window.innerHeight;
        const reservedHeight = 140; // Reserve space for action bar + grouping + pagination
        setContainerHeight(Math.max(500, viewportHeight - reservedHeight));
      } else {
        // Calculate available height: viewport - header - action bar - grouping area - pagination
        const viewportHeight = window.innerHeight;
        const headerHeight = 120; // Approximate header height
        const actionBarHeight = 64; // Action bar height
        const groupingAreaHeight = currentGroupBy ? 48 : 0; // Only if grouping is active
        const paginationHeight = !virtualScrolling ? 64 : 0; // Only if pagination is shown
        const padding = 40; // Additional padding

        const availableHeight = viewportHeight - headerHeight - actionBarHeight - groupingAreaHeight - paginationHeight - padding;
        // Subtract additional 8px to prevent gap between footer and last row
        setContainerHeight(Math.max(400, Math.min(availableHeight - 8, 800))); // Min 400px, max 800px
      }
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, [isFullscreen, currentGroupBy, virtualScrolling]);

  const virtualization = useVirtualization({
    itemCount: groupedData.length,
    itemHeight: 48,
    containerHeight,
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

  const handleGroupByChange = (value: string | string[] | null) => {
    setGroupBy(value || '');
  };

  const handleFilterChange = (field: string, filter: any) => {
    filterByColumn(field, filter);
  };

  const toggleSort = (field: string) => {
    setIsSorting(true);
    sortBy(field);
    // Reset sorting animation after a short delay
    setTimeout(() => setIsSorting(false), 300);
  };

  const toggleAllSelection = () => {
    selectAllRows();
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setCurrentPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div
      className={cn(
        isFullscreen && "fixed inset-0 z-50 bg-white overflow-auto",
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
        onGroupByChange={setGroupBy}
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
            virtualScrolling && "overflow-y-auto",
            isSorting && "opacity-80"
          )}
          style={{
            height: virtualScrolling ? `${containerHeight}px` : 'auto',
            minHeight: virtualScrolling ? '400px' : 'auto'
          }}
          onScroll={virtualScrolling ? virtualization.handleScroll : undefined}
        >
          {/* Sorting Indicator */}
          {isSorting && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-30">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md">
                <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600">Sorting...</span>
              </div>
            </div>
          )}
          {virtualScrolling && (
            <div style={{ height: virtualization.totalHeight, position: 'relative' }}>
              <div style={{ transform: `translateY(${virtualization.offsetY}px)` }}>
                <div className="min-w-full text-sm">
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
                    showFilters={showFilters}
                  />
                  <div className="bg-white divide-y divide-gray-200 transition-all duration-300 ease-in-out">
                    {virtualization.visibleItems.map(index => {
                      const row = groupedData[index];
                      if ((row as any).__isGroupHeader) {
                        return (
                          <DataTableGroupHeader
                            key={`group-${(row as any).__groupKey || (row as any).__groupValue}`}
                            groupValue={(row as any).__groupValue}
                            itemCount={(row as any).__itemCount}
                            expanded={(row as any).__expanded}
                            summaries={(row as any).__summaries}
                            columns={columns}
                            level={row.__level}
                            onToggle={() => toggleGroup((row as any).__groupKey || (row as any).__groupValue)}
                          />
                        );
                      }
                      return (
                        <DataTableRow
                          key={(row as any).id || index}
                          row={row}
                          columns={columns}
                          level={currentGroupBy && row.__level}
                          isSelected={
                            (row as any).id
                              ? selectedRows.some(r => (r as any).id === (row as any).id)
                              : selectedRows.some(r => JSON.stringify(r) === JSON.stringify(row))
                          }
                          onRowSelect={toggleRowSelection}
                          onCellEdit={onCellEdit}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!virtualScrolling && (
            <div className="min-w-full text-sm">
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
                showFilters={showFilters}
              />
              <div className="bg-white divide-y divide-gray-200 transition-all duration-300 ease-in-out">
                {paginatedData.map((row, index) => {
                  if ((row as any).__isGroupHeader) {
                    return (
                      <DataTableGroupHeader
                        key={`group-${(row as any).__groupKey || (row as any).__groupValue}`}
                        groupValue={(row as any).__groupValue}
                        itemCount={(row as any).__itemCount}
                        expanded={(row as any).__expanded}
                        summaries={(row as any).__summaries}
                        columns={columns}
                        onToggle={() => toggleGroup((row as any).__groupKey || (row as any).__groupValue)}
                        level={(row as any).__level || 0}
                        field={(row as any).__field}
                      />
                    );
                  }
                  return (
                    <DataTableRow
                      key={(row as any).id || index}
                      row={row}
                      columns={columns}
                      isSelected={
                        (row as any).id
                          ? selectedRows.some(r => (r as any).id === (row as any).id)
                          : selectedRows.some(r => JSON.stringify(r) === JSON.stringify(row))
                      }
                      onRowSelect={toggleRowSelection}
                      onCellEdit={onCellEdit}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Footer */}
      {stickyFooter && (
        <DataTableStickyFooter
          columns={columns}
          data={filteredData}
          visible={true}
        />
      )}

      {/* Pagination - Only show if there are more records than page size */}
      {!virtualScrolling && filteredData.length > currentPageSize && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={currentPageSize}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}

// Export the useDataTable hook for external use
export { useDataTable } from './hooks/use-data-table';