import { DataTable } from 'advanced-react-datatable';
import type { DataTableColumn } from 'advanced-react-datatable';
import './App.css';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  active: boolean;
  location: string;
  hireDate: string;
}

const columns: DataTableColumn<Employee>[] = [
  {
    field: 'name',
    header: 'Full Name',
    sortable: true,
    filterable: true,
    pinned: 'left',
    width: 200
  },
  {
    field: 'email',
    header: 'Email Address',
    sortable: true,
    filterable: true,
    width: 250
  },
  {
    field: 'department',
    header: 'Department',
    sortable: true,
    filterable: true,
    groupable: true,
    width: 150
  },
  {
    field: 'salary',
    header: 'Salary',
    type: 'number',
    sortable: true,
    filterable: true,
    width: 120,
    cellRenderer: (value) => `$${value.toLocaleString()}`
  },
  {
    field: 'location',
    header: 'Location',
    sortable: true,
    filterable: true,
    width: 120
  },
  {
    field: 'hireDate',
    header: 'Hire Date',
    type: 'date',
    sortable: true,
    filterable: true,
    width: 120
  },
  {
    field: 'active',
    header: 'Status',
    type: 'boolean',
    sortable: true,
    filterable: true,
    width: 100,
    cellRenderer: (value) => (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value ? 'Active' : 'Inactive'}
      </span>
    )
  }
];

const sampleData: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    salary: 75000,
    location: 'San Francisco',
    hireDate: '2023-01-15',
    active: true
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    department: 'Engineering',
    salary: 85000,
    location: 'New York',
    hireDate: '2022-03-20',
    active: true
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    department: 'Sales',
    salary: 65000,
    location: 'Chicago',
    hireDate: '2023-05-10',
    active: true
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@company.com',
    department: 'Marketing',
    salary: 70000,
    location: 'San Francisco',
    hireDate: '2022-11-01',
    active: false
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@company.com',
    department: 'Engineering',
    salary: 90000,
    location: 'Austin',
    hireDate: '2021-09-15',
    active: true
  },
  {
    id: 6,
    name: 'Diana Davis',
    email: 'diana.davis@company.com',
    department: 'Sales',
    salary: 72000,
    location: 'New York',
    hireDate: '2023-02-28',
    active: true
  },
  {
    id: 7,
    name: 'Frank Miller',
    email: 'frank.miller@company.com',
    department: 'Marketing',
    salary: 68000,
    location: 'Los Angeles',
    hireDate: '2022-08-12',
    active: false
  },
  {
    id: 8,
    name: 'Grace Taylor',
    email: 'grace.taylor@company.com',
    department: 'Engineering',
    salary: 82000,
    location: 'Seattle',
    hireDate: '2023-04-03',
    active: true
  }
];

function App() {
  const handleRowSelect = (selectedRows: Employee[]) => {
    console.log('Selected rows:', selectedRows);
  };

  const handleExport = (data: Employee[], format: 'csv') => {
    console.log(`Exporting ${data.length} rows as ${format}`);
    // In a real app, you would handle the export here
  };

  const handleCellEdit = (row: Employee, field: keyof Employee, value: any) => {
    console.log('Cell edit:', { row, field, value });
    // In a real app, you would update your data source here
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Advanced React DataTable Demo
        </h1>
        <p className="text-gray-600">
          A comprehensive example showcasing all features of the Advanced React DataTable component.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <DataTable
          data={sampleData}
          columns={columns}
          pageSize={25}
          selectionMode="multiple"
          showFilters
          showColumnConfig
          onRowSelect={handleRowSelect}
          onExport={handleExport}
          onCellEdit={handleCellEdit}
        />
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>
          <strong>Features demonstrated:</strong>
        </p>
        <ul className="mt-2 space-y-1">
          <li>• Pinned columns (Name is pinned to the left)</li>
          <li>• Custom cell renderers (Salary formatting, Status badges)</li>
          <li>• Multiple selection mode</li>
          <li>• Column filtering and sorting</li>
          <li>• Grouping capability (try grouping by Department)</li>
          <li>• Inline editing (double-click any cell)</li>
          <li>• Export functionality</li>
          <li>• Column configuration modal</li>
        </ul>
      </div>
    </div>
  );
}

export default App;