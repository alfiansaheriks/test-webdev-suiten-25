import { Employee } from "./employee";

export type Absence = {
  id?: string;
  date: string;
  employee_id: string;
  employee_name?: string;
  department_id: string;
  clock_out_time: string;
  total_overtime: string;
  notes: string;
};

export type AbsenceState = {
  absences: Absence[];
  employees: Employee[];
  loading: boolean;
  error: string | null;
  fetchAll: (department_id: string, date?: string) => Promise<void>;
  create: (absence: Omit<Absence, "id">) => Promise<Absence>;
  update: (absence: Absence) => Promise<Absence>;
};

export type AbsenceFormData = {
  employee_id: string;
  clock_out_time: string;
  total_overtime: number;
  notes: string;
};
