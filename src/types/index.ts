export interface Employee {
  id: string;
  name: string;
  empId: string;
  department: string;
  email: string;
  phone: string;
  position?: string;
  joinedDate?: string;
  managerId?: string;
  managerName?: string;
  plant?: string;
  salary?: number;
}

export interface TravelRequest {
  id: string;
  employee: Employee;
  destination: string;
  purpose: string;
  description: string;
  dates: string;
  budget: number;
  type: 'flight' | 'hotel' | 'both';
  status: 'pending' | 'approved' | 'booking' | 'completed';
  createdAt: string;
  actualExpenditure?: number;
}

export interface BookingDetails {
  flightTicketNumber?: string;
  flightInvoice?: File | null;
  hotelName?: string;
  hotelInvoice?: File | null;
}

export interface Plant {
  id: string;
  name: string;
  location: string;
  employeeCount: number;
}

export interface ExpenditureData {
  department: string;
  plant: string;
  totalBudget: number;
  actualExpenditure: number;
  pendingAmount: number;
  employeeCount: number;
  requestCount: number;
}