import { TravelRequest } from "../types/travel";


export const travelRequests: TravelRequest[] = [
  {
    id: '1',
    employee: {
      id: 'emp001',
      name: 'John Smith',
      empId: 'EMP001',
      department: 'Marketing'
    },
    destination: 'New york',
    startDate: 'Oct 15-20,2025',
    endDate: 'Oct 20, 2025',
    budget: 10000,
    status: 'pending',
    createdAt: 'Sep 30'
  },
  {
    id: '2',
    employee: {
      id: 'emp015',
      name: 'Sara Johnson',
      empId: 'EMP015',
      department: 'Sales'
    },
    destination: 'London',
    startDate: 'Nov 15-20,2025',
    endDate: 'Nov 20, 2025',
    budget: 20000,
    status: 'booked',
    createdAt: 'Oct 30'
  },
  {
    id: '3',
    employee: {
      id: 'emp008',
      name: 'Michael Chen',
      empId: 'EMP008',
      department: 'Engineering'
    },
    destination: 'Tokyo',
    startDate: 'Dec 10-15,2025',
    endDate: 'Dec 15, 2025',
    budget: 15000,
    status: 'pending',
    createdAt: 'Nov 15'
  },
  {
    id: '4',
    employee: {
      id: 'emp022',
      name: 'Emma Wilson',
      empId: 'EMP022',
      department: 'Marketing'
    },
    destination: 'Paris',
    startDate: 'Jan 20-25,2026',
    endDate: 'Jan 25, 2026',
    budget: 18000,
    status: 'completed',
    createdAt: 'Dec 01'
  }
];