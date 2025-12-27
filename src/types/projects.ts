export interface EmployeeAssignment {
  employee: {
    _id: string;
    name: string;
  };
  role: string;
  compensation: number;
  assignedAt: string;
}

export interface Service {
  _id: string;
  name: string;
}

export interface Payment {
  amount: number;
  notes: string;
  addedBy: string;
  date: string;
  employee?: string;
}

export interface CreatedBy {
  _id: string;
  name: string;
}

export interface Project {
  _id: string;
  id: string;
  name: string;
  description: string;
  client: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: string;
  department: string;
  employees: EmployeeAssignment[];
  services: Service[];
  isActive: boolean;
  createdBy: CreatedBy;
  client_payments: Payment[];
  employee_payments: Payment[];
  createdAt: string;
  updatedAt: string;
  moneyCollected: number;
  moneyPaid: number;
  grossProfit: number;
  netProfitToDate: number;
  clientBalanceDue: number;
  employeeBalanceDue: number;
  totalCost: number;
}
