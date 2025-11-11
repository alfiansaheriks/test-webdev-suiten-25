import { create } from "zustand";
import {
  fetchBanks,
  addBank,
  deleteBank,
} from "@/services/master-data/bankService";
import { BankState } from "@/types/bank";

export const useBankStore = create<BankState>((set) => ({
  banks: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const data = await fetchBanks();
      set({ banks: data, loading: false });
    } catch (err: unknown) {
      set({
        error: err instanceof Error ? err.message : "Unknown error",
        loading: false,
      });
    }
  },

  create: async (bank) => {
    set({ loading: true });
    try {
      const newBank = await addBank(bank);
      set((state) => ({ banks: [...state.banks, newBank], loading: false }));
      return newBank;
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
      await deleteBank(id);
      set((state) => ({
        banks: state.banks.filter((b) => b.id !== id),
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
