import { DataTableColumn } from '@/components/DataTable/types'

export interface MockEmployee {
  id: number
  name: string
  email: string
  department: string
  salary: number
  active: boolean
  location: string
  hireDate: string
}

export const mockEmployees: MockEmployee[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    salary: 85000,
    active: true,
    location: 'New York',
    hireDate: '2022-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    department: 'Marketing',
    salary: 72000,
    active: true,
    location: 'San Francisco',
    hireDate: '2021-09-10'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    department: 'Engineering',
    salary: 92000,
    active: false,
    location: 'New York',
    hireDate: '2020-03-22'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@company.com',
    department: 'Finance',
    salary: 78000,
    active: true,
    location: 'Chicago',
    hireDate: '2023-02-14'
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@company.com',
    department: 'HR',
    salary: 65000,
    active: true,
    location: 'San Francisco',
    hireDate: '2022-08-05'
  }
]

export const mockColumns: DataTableColumn<MockEmployee>[] = [
  {
    field: 'id',
    header: 'ID',
    sortable: true,
    type: 'number',
    width: 80
  },
  {
    field: 'name',
    header: 'Name',
    sortable: true,
    filterable: true,
    type: 'text',
    width: 150
  },
  {
    field: 'email',
    header: 'Email',
    sortable: true,
    filterable: true,
    type: 'text',
    width: 200
  },
  {
    field: 'department',
    header: 'Department',
    sortable: true,
    filterable: true,
    groupable: true,
    type: 'select',
    width: 120,
    options: ['Engineering', 'Marketing', 'Finance', 'HR']
  },
  {
    field: 'salary',
    header: 'Salary',
    sortable: true,
    filterable: true,
    type: 'number',
    width: 100
  },
  {
    field: 'active',
    header: 'Active',
    sortable: true,
    filterable: true,
    type: 'boolean',
    width: 80
  },
  {
    field: 'location',
    header: 'Location',
    sortable: true,
    filterable: true,
    groupable: true,
    type: 'select',
    width: 120,
    options: ['New York', 'San Francisco', 'Chicago']
  },
  {
    field: 'hireDate',
    header: 'Hire Date',
    sortable: true,
    filterable: true,
    type: 'date',
    width: 120
  }
]