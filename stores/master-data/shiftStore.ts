import { ShiftState } from "@/types/shift";
import { create } from "zustand";
import {
  addShift,
  removeShift,
  fetchShifts,
} from "@/services/master-data/shiftService";

export const useShiftStore = create<ShiftState>((set) => ({
  shifts: [],
  totalItems: 0,
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const data = await fetchShifts();
      set({ shifts: data.data, totalItems: data.total, loading: false });
    } catch (err: unknown) {
      set({
        error: err instanceof Error ? err.message : "Unknown error",
        loading: false,
      });
    }
  },
  create: async (shift) => {
    set({ loading: true });
    try {
      const newShift = await addShift(shift);
      set((state) => ({ shifts: [...state.shifts, newShift], loading: false }));
      return newShift;
    } catch (err: unknown) {
      set({
        error: err instanceof Error ? err.message : "Unknown error",
        loading: false,
      });
    }
  },
  remove: async (id) => {
    set({ loading: true });
    try {
      await removeShift(id);
      set((state) => ({
        shifts: state.shifts.filter((s) => s.id !== id),
        loading: false,
      }));
    } catch (err: unknown) {
      set({
        error: err instanceof Error ? err.message : "Unknown error",
        loading: false,
      });
    }
  },
}));
