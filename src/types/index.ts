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

export interface FlightOption {
  id: string;
  airline: string;
  flightNumber: string;
  price: number;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  selected?: boolean;
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
  status: 'pending' | 'flight_options_added' | 'employee_selected' | 'manager_approved' | 'booked' | 'completed';
  createdAt: string;
  actualExpenditure?: number;
  flightOptions?: FlightOption[];
  selectedFlightId?: string;
  bookingConfirmation?: {
    ticketNumber: string;
    bookingReference: string;
    confirmationFile?: File;
  };
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