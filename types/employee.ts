export type Employee = {
  id: string;
  employee_name: string;
  department_id: string[];
  phone_number: string;
  bank_id: string;
  bank_name: string;
  bank_number: string;
  shift_id: string[];
  salary_period?: "Daily" | "Weekly" | "Monthly";
  main_salary?: number;
  daily_salary?: number;
  eat_salary?: number;
  holiday_eat_salary?: number;
  overtime_salary?: number;
  holiday_overtime_salary?: number;
};

export type EmployeeState = {
  employees: Employee[];
  loading: boolean;
  total: number;
  error: string | null;

  fetchAll: () => Promise<void>;
  create: (employee: Omit<Employee, "id">) => Promise<Employee>;
  remove: (id: string) => Promise<void>;
  update: (employee: Employee) => Promise<void>;
  getById: (id: string) => Promise<Employee>;
};
