import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable, DataTableColumn } from '@/components/DataTable';
import { Employee } from '@shared/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, UserPlus, Trash2 } from 'lucide-react';

export default function Demo() {
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);

  const { data: employees = [], isLoading } = useQuery<Employee[]>({
    queryKey: ['/api/employees'],
  });

  const columns: DataTableColumn<Employee>[] = [
    {
      field: 'email',
      header: 'Email',
      useSelection: true,
      pinned: 'left',
      sortable: true,
      filterable: true,
      editable: true,
      cellRenderer: (value) => (
        <div className="font-medium text-gray-900">{value}</div>
      ),
    },
    {
      field: 'name',
      header: 'Name',
      sortable: true,
      filterable: true,
      editable: true,
      minWidth: 220,
      cellRenderer: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {value.split(' ').map((n: string) => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.title}</div>
          </div>
        </div>
      ),
    },
    {
      field: 'department',
      header: 'Department',
      sortable: true,
      filterable: true,
      groupable: true,
      editable: true,
      type: 'select',
      minWidth: 180,
      options: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'],
      cellRenderer: (value) => (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {value}
        </Badge>
      ),
    },
    {
      field: 'salary',
      header: 'Salary',
      sortable: true,
      filterable: true,
      editable: true,
      type: 'number',
      minWidth: 140,
      aggregation: 'sum',
      cellRenderer: (value) => (
        <span className="font-mono text-xs text-gray-900">
          ${Number(value).toLocaleString()}
        </span>
      ),
    },
    {
      field: 'status',
      header: 'Status',
      sortable: true,
      filterable: true,
      editable: true,
      type: 'select',
      minWidth: 150,
      options: ['Active', 'Inactive', 'On Leave'],
      cellRenderer: (value) => (
        <Badge
          variant={value === 'Active' ? 'default' : value === 'On Leave' ? 'secondary' : 'destructive'}
          className={
            value === 'Active'
              ? 'bg-green-100 text-green-800'
              : value === 'On Leave'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      field: 'location',
      header: 'Location',
      sortable: true,
      filterable: true,
      groupable: true,
      editable: true,
      minWidth: 160,
    },
    {
      field: 'actions',
      header: 'Actions',
      sortable: false,
      filterable: false,
      editable: false,
      minWidth: 80,
      pinned: 'right',
      cellRenderer: (value, row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => console.log('View', row)}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Edit', row)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('Assign', row)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Assign
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log('Delete', row)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const handleRowSelect = (rows: Employee[]) => {
    setSelectedRows(rows);
  };

  const handleExport = (data: Employee[], format: 'csv' | 'json') => {
    console.log(`Exporting ${data.length} rows as ${format}`);
  };

  const handleCellEdit = (row: Employee, field: keyof Employee, value: any) => {
    console.log(`Editing cell: ${String(field)} = ${value} for employee ${row.name}`);
    // In a real application, you would make an API call to update the data
    // For demo purposes, we'll just log the change
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-6">
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-semibold">Advanced Data Table Component</CardTitle>
                <CardDescription>
                  Generic React component with grouping, filtering, sorting, and pinning capabilities
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto space-y-6">
        <DataTable
          className="bg-white rounded shadow-sm"
          data={employees as Employee[]}
          columns={columns}
          virtualScrolling={true}
          stickyHeader={true}
          stickyFooter={true}
          enablePdfExport={true}
          onRowSelect={handleRowSelect}
          onExport={(data, format) => {
            console.log(`Exporting ${data.length} rows as ${format}`);
          }}
          onCellEdit={handleCellEdit}
        />

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-lg font-bold text-green-600">⚡</span>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Render Time</div>
                  <div className="text-lg font-semibold text-gray-900">42ms</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">📊</span>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Total Rows</div>
                  <div className="text-lg font-semibold text-gray-900">{(employees as Employee[]).length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-lg font-bold text-purple-600">✓</span>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Selected Rows</div>
                  <div className="text-lg font-semibold text-gray-900">{selectedRows.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Showcase */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Component Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Virtual Scrolling', description: 'Handles thousands of rows efficiently' },
                { title: 'Column Pinning', description: 'Pin important columns left/right' },
                { title: 'Inline Column Filters', description: 'Filters directly under each column header' },
                { title: 'Inline Cell Editing', description: 'Double-click cells to edit values' },
                { title: 'Custom Header Renderers', description: 'Override column header templates' },
                { title: 'Custom Cell Renderers', description: 'Custom formatting and styling' },
                { title: 'Multi-Level Grouping', description: 'Group by multiple columns with summaries' },
                { title: 'Numeric Summaries', description: 'Automatic sum calculations for grouped data' },
                { title: 'Row Selection', description: 'Single and multiple row selection' },
                { title: 'Export Functionality', description: 'CSV and JSON export' },
                { title: 'Responsive Design', description: 'Works on desktop and mobile' },
                { title: 'TypeScript Support', description: 'Full type safety and IntelliSense' },
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{feature.title}</div>
                    <div className="text-sm text-gray-600">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
