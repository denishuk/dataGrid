import { users, employees, type User, type InsertUser, type Employee, type InsertEmployee } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getEmployees(): Promise<Employee[]>;
  getEmployee(id: number): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: number, employee: Partial<InsertEmployee>): Promise<Employee | undefined>;
  deleteEmployee(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private employees: Map<number, Employee>;
  private currentUserId: number;
  private currentEmployeeId: number;

  constructor() {
    this.users = new Map();
    this.employees = new Map();
    this.currentUserId = 1;
    this.currentEmployeeId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleEmployees: InsertEmployee[] = [
      {
        name: 'John Doe',
        email: 'john.doe@company.com',
        department: 'Engineering',
        title: 'Senior Developer',
        salary: '95000',
        status: 'Active',
        location: 'New York, NY',
        hireDate: new Date('2022-01-15'),
        isActive: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        department: 'Engineering',
        title: 'Lead Engineer',
        salary: '115000',
        status: 'Active',
        location: 'San Francisco, CA',
        hireDate: new Date('2021-03-20'),
        isActive: true,
      },
      {
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        department: 'Marketing',
        title: 'Marketing Manager',
        salary: '82000',
        status: 'On Leave',
        location: 'Los Angeles, CA',
        hireDate: new Date('2022-06-10'),
        isActive: true,
      },
      {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        department: 'Sales',
        title: 'Sales Director',
        salary: '105000',
        status: 'Active',
        location: 'Chicago, IL',
        hireDate: new Date('2021-09-05'),
        isActive: true,
      },
      {
        name: 'David Brown',
        email: 'david.brown@company.com',
        department: 'HR',
        title: 'HR Manager',
        salary: '78000',
        status: 'Active',
        location: 'Austin, TX',
        hireDate: new Date('2020-11-12'),
        isActive: true,
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@company.com',
        department: 'Engineering',
        title: 'Software Engineer',
        salary: '85000',
        status: 'Active',
        location: 'Seattle, WA',
        hireDate: new Date('2023-02-01'),
        isActive: true,
      },
      {
        name: 'Robert Miller',
        email: 'robert.miller@company.com',
        department: 'Finance',
        title: 'Financial Analyst',
        salary: '72000',
        status: 'Active',
        location: 'Boston, MA',
        hireDate: new Date('2022-08-15'),
        isActive: true,
      },
      {
        name: 'Lisa Garcia',
        email: 'lisa.garcia@company.com',
        department: 'Marketing',
        title: 'Marketing Specialist',
        salary: '68000',
        status: 'Inactive',
        location: 'Miami, FL',
        hireDate: new Date('2021-12-01'),
        isActive: false,
      },
      {
        name: 'James Anderson',
        email: 'james.anderson@company.com',
        department: 'Sales',
        title: 'Sales Representative',
        salary: '65000',
        status: 'Active',
        location: 'Denver, CO',
        hireDate: new Date('2023-04-10'),
        isActive: true,
      },
      {
        name: 'Maria Rodriguez',
        email: 'maria.rodriguez@company.com',
        department: 'Engineering',
        title: 'DevOps Engineer',
        salary: '92000',
        status: 'Active',
        location: 'Portland, OR',
        hireDate: new Date('2022-03-18'),
        isActive: true,
      },
    ];

    sampleEmployees.forEach(employee => {
      this.createEmployee(employee);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getEmployees(): Promise<Employee[]> {
    return Array.from(this.employees.values());
  }

  async getEmployee(id: number): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  async createEmployee(insertEmployee: InsertEmployee): Promise<Employee> {
    const id = this.currentEmployeeId++;
    const employee: Employee = { 
      ...insertEmployee, 
      id,
      isActive: insertEmployee.isActive ?? true
    };
    this.employees.set(id, employee);
    return employee;
  }

  async updateEmployee(id: number, updateData: Partial<InsertEmployee>): Promise<Employee | undefined> {
    const employee = this.employees.get(id);
    if (!employee) return undefined;

    const updatedEmployee: Employee = { ...employee, ...updateData };
    this.employees.set(id, updatedEmployee);
    return updatedEmployee;
  }

  async deleteEmployee(id: number): Promise<boolean> {
    return this.employees.delete(id);
  }
}

export const storage = new MemStorage();
