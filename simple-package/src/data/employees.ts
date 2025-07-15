import { DataTableColumn } from './types'

export interface Employee {
  id: number
  name: string
  email: string
  department: string
  salary: number
  active: boolean
  location: string
  hireDate: string
}

export const employees: Employee[] = [
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
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana.prince@company.com',
    department: 'Engineering',
    salary: 95000,
    active: true,
    location: 'Seattle',
    hireDate: '2021-11-20'
  },
  {
    id: 7,
    name: 'Edward Norton',
    email: 'edward.norton@company.com',
    department: 'Marketing',
    salary: 68000,
    active: true,
    location: 'Boston',
    hireDate: '2023-05-12'
  },
  {
    id: 8,
    name: 'Fiona Green',
    email: 'fiona.green@company.com',
    department: 'Finance',
    salary: 82000,
    active: true,
    location: 'Chicago',
    hireDate: '2022-03-08'
  },
  {
    id: 9,
    name: 'George Harris',
    email: 'george.harris@company.com',
    department: 'HR',
    salary: 67000,
    active: false,
    location: 'Austin',
    hireDate: '2021-07-18'
  },
  {
    id: 10,
    name: 'Helen Clark',
    email: 'helen.clark@company.com',
    department: 'Engineering',
    salary: 88000,
    active: true,
    location: 'Seattle',
    hireDate: '2023-01-30'
  },
  {
    id: 11,
    name: 'Ian Mitchell',
    email: 'ian.mitchell@company.com',
    department: 'Marketing',
    salary: 71000,
    active: true,
    location: 'Denver',
    hireDate: '2022-09-15'
  },
  {
    id: 12,
    name: 'Julia Roberts',
    email: 'julia.roberts@company.com',
    department: 'Finance',
    salary: 79000,
    active: true,
    location: 'Miami',
    hireDate: '2021-12-03'
  },
  {
    id: 13,
    name: 'Kevin Lee',
    email: 'kevin.lee@company.com',
    department: 'Engineering',
    salary: 91000,
    active: true,
    location: 'Portland',
    hireDate: '2022-06-22'
  },
  {
    id: 14,
    name: 'Laura White',
    email: 'laura.white@company.com',
    department: 'HR',
    salary: 63000,
    active: true,
    location: 'Phoenix',
    hireDate: '2023-04-10'
  },
  {
    id: 15,
    name: 'Mike Davis',
    email: 'mike.davis@company.com',
    department: 'Marketing',
    salary: 74000,
    active: false,
    location: 'Atlanta',
    hireDate: '2020-08-14'
  }
]

export const employeeColumns: DataTableColumn<Employee>[] = [
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
    width: 100,
    aggregation: 'avg'
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
    options: ['New York', 'San Francisco', 'Chicago', 'Seattle', 'Boston', 'Austin', 'Denver', 'Miami', 'Portland', 'Phoenix', 'Atlanta']
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