import { create } from "zustand";
import {
  createDepartment,
  deleteDepartment,
  editDepartment,
  fetchAllDepartments,
  getById,
} from "@/services/master-data/departmentService";
import { Department, DepartmentState } from "@/types/department";

export const useDepartmentStore = create<DepartmentState>((set) => ({
  departments: [],
  total: 0,
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const data = await fetchAllDepartments();
      set({ departments: data.data, total: data.total, loading: false });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Unknown error";
      set({
        error,
        loading: false,
      });
      throw error;
    }
  },

  create: async (department) => {
    set({ loading: true });
    try {
      const data = await createDepartment(department);
      set((state) => ({
        departments: [...state.departments, data],
        loading: false,
      }));
      return data;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Unknown error";
      set({
        error,
        loading: false,
      });
      throw error;
    }
  },

  remove: async (id) => {
    set({ loading: true });
    try {
      await deleteDepartment(id);
      set((state) => ({
        departments: state.departments.filter((d) => d.id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Unknown error";
      set({
        error,
        loading: false,
      });
      throw error;
    }
  },

  update: async (department: Department) => {
    set({ loading: true });
    try {
      const data = await editDepartment(department);
      set((state) => ({
        departments: state.departments.map((d) =>
          d.id === department.id ? data : d
        ),
        loading: false,
        error: null,
      }));
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Unknown error";
      set({
        error,
        loading: false,
      });
      throw error;
    }
  },

  getById: async (id: string) => {
    set({ loading: true });
    try {
      const data = await getById(id);
      return data;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Unknown error";
      set({
        error,
        loading: false,
      });
      throw error;
    }
  },
}));
