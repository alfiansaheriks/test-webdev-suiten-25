import {
  getAll,
  remove,
  update,
  getById as fetchById,
  createEmployee,
  getEmployeeByDepartmentId,
} from "@/services/master-data/employeeService";
import { EmployeeState } from "@/types/employee";
import { create } from "zustand";

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  loading: false,
  total: 0,
  error: null,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const { data, total } = await getAll();
      set({ employees: data || [], total: total || 0, loading: false });
    } catch (error) {
      const err = error as Error;
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  create: async (data) => {
    set({ loading: true });
    try {
      const response = await createEmployee(data);
      const newEmployee = response.data?.[0];
      set((state) => ({
        employees: [...state.employees, newEmployee],
        loading: false,
      }));
      return newEmployee;
    } catch (error) {
      const err = error as Error;
      set({ error: err.message, loading: false });
      throw err;
    }
  },
  remove: async (id) => {
    set({ loading: true });
    try {
      await remove(id);
      set((state) => ({
        employees: state.employees.filter((employee) => employee.id !== id),
        loading: false,
      }));
    } catch (error) {
      const err = error as Error;
      set({ error: err.message, loading: false });
      throw err;
    }
  },
  update: async (employee) => {
    set({ loading: true });
    try {
      const response = await update(employee);
      set((state) => ({
        employees: state.employees.map((e) =>
          e.id === employee.id ? response : e
        ),
        loading: false,
      }));
      return response;
    } catch (error) {
      const err = error as Error;
      set({ error: err.message, loading: false });
      throw err;
    }
  },
  getById: async (id) => {
    set({ loading: true });
    try {
      const response = await fetchById(id);
      set({ loading: false });
      return response;
    } catch (error) {
      const err = error as Error;
      set({ error: err.message, loading: false });
      throw err;
    }
  },
  getByDepartmentId: async (departmentIds: string[]) => {
    set({ loading: true });
    try {
      const response = await getEmployeeByDepartmentId(departmentIds);
      set({ loading: false });
      return response;
    } catch (error) {
      const err = error as Error;
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
