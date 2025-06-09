export interface Employee {
  id: string;
  name: string;
  empId: string;
  department: string;
  email: string;
  phone: string;
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
}

export interface BookingDetails {
  flightTicketNumber?: string;
  flightInvoice?: File | null;
  hotelName?: string;
  hotelInvoice?: File | null;
}