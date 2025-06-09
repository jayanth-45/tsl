export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  joinedDate: string;
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  employeeCount: number;
  color: string;
  icon: string;
}