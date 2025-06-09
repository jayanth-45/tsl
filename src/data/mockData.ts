import { TravelRequest, Employee } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    empId: 'EMP001',
    department: 'Marketing',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567'
  },
  {
    id: '2',
    name: 'Sara Johnson',
    empId: 'EMP002',
    department: 'Sales',
    email: 'sara.johnson@example.com',
    phone: '+1 (555) 234-5678'
  },
  {
    id: '3',
    name: 'Micheal Chage',
    empId: 'EMP003',
    department: 'Engineering',
    email: 'micheal.chage@example.com',
    phone: '+1 (555) 345-6789'
  }
];

export const mockRequests: TravelRequest[] = [
  {
    id: '1',
    employee: mockEmployees[0],
    destination: 'New York',
    purpose: 'Business Conference',
    description: 'Conference attendance for MarketExpo 2025. Need flight and accommodation near the venue.',
    dates: 'Oct 15-20, 2025',
    budget: 10000,
    type: 'both',
    status: 'pending',
    createdAt: 'Oct 15-20,2025'
  },
  {
    id: '2',
    employee: mockEmployees[1],
    destination: 'Singapore',
    purpose: 'Client Meeting',
    description: 'Important client presentation and contract negotiation.',
    dates: 'Oct 20-25,2025',
    budget: 20000,
    type: 'both',
    status: 'pending',
    createdAt: 'Oct 20-25,2025'
  },
  {
    id: '3',
    employee: mockEmployees[2],
    destination: 'London',
    purpose: 'Technical Training',
    description: 'Advanced technical training program for new technologies.',
    dates: 'Oct 15-20,2025',
    budget: 15000,
    type: 'both',
    status: 'pending',
    createdAt: 'Oct 15-20,2025'
  }
];