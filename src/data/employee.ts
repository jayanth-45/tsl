import { Employee, Department } from '../types/employee';

export const departments: Department[] = [
  {
    id: 'marketing',
    name: 'Marketing',
    employeeCount: 12,
    color: 'bg-amber-100 text-amber-800',
    icon: 'briefcase'
  },
  {
    id: 'sales',
    name: 'Sales',
    employeeCount: 18,
    color: 'bg-blue-100 text-blue-800',
    icon: 'briefcase'
  },
  {
    id: 'engineering',
    name: 'Engineering',
    employeeCount: 24,
    color: 'bg-green-100 text-green-800',
    icon: 'briefcase'
  }
];

export const employees: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    position: 'Marketing Manager',
    department: 'Marketing',
    email: 'john@gmail.com',
    phone: '+91 1236574536',
    joinedDate: 'May 18 2025'
  },
  {
    id: '2',
    name: 'Sara Joseph',
    position: 'Sales Manager',
    department: 'Sales',
    email: 'sara@gmail.com',
    phone: '+91 1236574536',
    joinedDate: 'May 18 2024'
  },
  {
    id: '3',
    name: 'Michael Chen',
    position: 'Lead Developer',
    department: 'Engineering',
    email: 'michael@gmail.com',
    phone: '+91 1236574536',
    joinedDate: 'Jan 15 2024'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    position: 'Marketing Specialist',
    department: 'Marketing',
    email: 'emma@gmail.com',
    phone: '+91 1236574536',
    joinedDate: 'Mar 10 2024'
  },
  {
    id: '5',
    name: 'David Brown',
    position: 'Sales Executive',
    department: 'Sales',
    email: 'david@gmail.com',
    phone: '+91 1236574536',
    joinedDate: 'Feb 20 2024'
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    position: 'Software Engineer',
    department: 'Engineering',
    email: 'lisa@gmail.com',
    phone: '+91 1236574536',
    joinedDate: 'Apr 05 2024'
  }
];