import {
  createAbsences,
  getAbsences,
  updateAbsences,
} from "@/services/absences/absenceService";
import { Absence, AbsenceState } from "@/types/absence";
import { create } from "zustand";

export const useAbsenceStore = create<AbsenceState>((set) => ({
  absences: [],
  employees: [],
  loading: false,
  error: null,

  fetchAll: async (department_id: string, date?: string) => {
    try {
      set({ loading: true });
      const result = await getAbsences(department_id, date);
      set({
        absences: result.absences,
        employees: result.employees,
        loading: false,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      }
      throw error;
    }
  },

  create: async (data: Omit<Absence, "id">) => {
    try {
      set({ loading: true });
      const absence = await createAbsences(data);
      set((state) => ({
        absences: [...state.absences, absence],
        loading: false,
      }));
      return absence;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      }
      throw error;
    }
  },

  update: async (absence: Absence) => {
    try {
      set({ loading: true });
      const formData: Absence = {
        id: absence.id,
        date: absence.date,
        employee_id: absence.employee_id,
        employee_name: absence.employee_name,
        department_id: absence.department_id,
        clock_out_time: absence.clock_out_time,
        total_overtime: absence.total_overtime,
        notes: absence.notes,
      };
      const updatedAbsence = await updateAbsences(formData);
      set((state) => ({
        absences: state.absences.map((a) =>
          a.id === updatedAbsence.id ? updatedAbsence : a
        ),
        loading: false,
      }));
      return updatedAbsence;
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      }
      throw error;
    }
  },
}));
