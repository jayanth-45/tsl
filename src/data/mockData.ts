import { TravelRequest, Employee, Plant, ExpenditureData, FlightOption } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Smith',
    empId: 'EMP001',
    department: 'Marketing',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    position: 'Marketing Manager',
    joinedDate: 'May 18 2025',
    managerId: null,
    managerName: null,
    plant: 'Mumbai Plant',
    salary: 75000
  },
  {
    id: '2',
    name: 'Sara Johnson',
    empId: 'EMP002',
    department: 'Sales',
    email: 'sara.johnson@example.com',
    phone: '+1 (555) 234-5678',
    position: 'Sales Manager',
    joinedDate: 'May 18 2024',
    managerId: null,
    managerName: null,
    plant: 'Delhi Plant',
    salary: 80000
  },
  {
    id: '3',
    name: 'Michael Chen',
    empId: 'EMP003',
    department: 'Engineering',
    email: 'michael.chen@example.com',
    phone: '+1 (555) 345-6789',
    position: 'Lead Developer',
    joinedDate: 'Jan 15 2024',
    managerId: '1',
    managerName: 'John Smith',
    plant: 'Bangalore Plant',
    salary: 95000
  },
  {
    id: '4',
    name: 'Emma Wilson',
    empId: 'EMP004',
    department: 'Marketing',
    email: 'emma.wilson@example.com',
    phone: '+1 (555) 456-7890',
    position: 'Marketing Specialist',
    joinedDate: 'Mar 10 2024',
    managerId: '1',
    managerName: 'John Smith',
    plant: 'Mumbai Plant',
    salary: 55000
  },
  {
    id: '5',
    name: 'David Brown',
    empId: 'EMP005',
    department: 'Sales',
    email: 'david.brown@example.com',
    phone: '+1 (555) 567-8901',
    position: 'Sales Executive',
    joinedDate: 'Feb 20 2024',
    managerId: '2',
    managerName: 'Sara Johnson',
    plant: 'Delhi Plant',
    salary: 45000
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    empId: 'EMP006',
    department: 'Engineering',
    email: 'lisa.anderson@example.com',
    phone: '+1 (555) 678-9012',
    position: 'Software Engineer',
    joinedDate: 'Apr 05 2024',
    managerId: '3',
    managerName: 'Michael Chen',
    plant: 'Bangalore Plant',
    salary: 70000
  }
];

export const mockPlants: Plant[] = [
  {
    id: '1',
    name: 'Mumbai Plant',
    location: 'Mumbai, Maharashtra',
    employeeCount: 150
  },
  {
    id: '2',
    name: 'Delhi Plant',
    location: 'New Delhi, Delhi',
    employeeCount: 120
  },
  {
    id: '3',
    name: 'Bangalore Plant',
    location: 'Bangalore, Karnataka',
    employeeCount: 200
  },
  {
    id: '4',
    name: 'Chennai Plant',
    location: 'Chennai, Tamil Nadu',
    employeeCount: 180
  }
];

export const mockFlightOptions: FlightOption[] = [
  {
    id: 'flight1',
    airline: 'Air India',
    flightNumber: 'AI 131',
    price: 8500,
    departureTime: '06:30',
    arrivalTime: '09:45',
    duration: '3h 15m'
  },
  {
    id: 'flight2',
    airline: 'IndiGo',
    flightNumber: '6E 463',
    price: 7200,
    departureTime: '14:20',
    arrivalTime: '17:30',
    duration: '3h 10m'
  },
  {
    id: 'flight3',
    airline: 'Vistara',
    flightNumber: 'UK 995',
    price: 9800,
    departureTime: '19:15',
    arrivalTime: '22:25',
    duration: '3h 10m'
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
    createdAt: 'Oct 15-20,2025',
    actualExpenditure: 8500
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
    status: 'flight_options_added',
    createdAt: 'Oct 20-25,2025',
    actualExpenditure: 18500,
    flightOptions: mockFlightOptions
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
    status: 'manager_approved',
    createdAt: 'Oct 15-20,2025',
    actualExpenditure: 14200,
    flightOptions: mockFlightOptions,
    selectedFlightId: 'flight2'
  }
];

export const mockExpenditureData: ExpenditureData[] = [
  {
    department: 'Marketing',
    plant: 'Mumbai Plant',
    totalBudget: 150000,
    actualExpenditure: 125000,
    pendingAmount: 25000,
    employeeCount: 25,
    requestCount: 8
  },
  {
    department: 'Sales',
    plant: 'Delhi Plant',
    totalBudget: 200000,
    actualExpenditure: 180000,
    pendingAmount: 20000,
    employeeCount: 30,
    requestCount: 12
  },
  {
    department: 'Engineering',
    plant: 'Bangalore Plant',
    totalBudget: 300000,
    actualExpenditure: 250000,
    pendingAmount: 50000,
    employeeCount: 45,
    requestCount: 15
  },
  {
    department: 'Marketing',
    plant: 'Chennai Plant',
    totalBudget: 120000,
    actualExpenditure: 95000,
    pendingAmount: 25000,
    employeeCount: 20,
    requestCount: 6
  }
];