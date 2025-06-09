export interface Employee {
  id: string;
  name: string;
  empId: string;
  department: string;
}

export interface TravelRequest {
  id: string;
  employee: Employee;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'pending' | 'booked' | 'completed';
  createdAt: string;
  description?: string;
}