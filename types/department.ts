export type Department = {
  id: string;
  department_name: string;
};

export type DepartmentState = {
  departments: Department[];
  loading: boolean;
  total: number;
  error: string | null;

  fetchAll: () => Promise<void>;
  create: (department: Omit<Department, "id">) => Promise<Department>;
  remove: (id: string) => Promise<void>;
  update: (department: Department) => Promise<void>;
  getById: (id: string) => Promise<Department>;
};
