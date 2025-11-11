import { create } from "zustand";

export type Absence = {
  id: string;
  date: string;
  employee_name: string;
  department: string;
  clock_out_time: string;
  total_overtime: string;
  notes: string;
};

type AbsenceStore = {
  data: Absence[];
  mode: "view" | "edit";
  editingIds: Set<string>;

  // Actions
  setData: (data: Absence[]) => void;
  updateRow: (id: string, key: keyof Absence, value: string) => void;
  setMode: (mode: "view" | "edit") => void;
  startEditing: (id: string) => void;
  stopEditing: (id: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
};

export const useAbsenceStore = create<AbsenceStore>((set) => ({
  data: [
    {
      id: "1",
      date: "2025-11-10",
      employee_name: "John Doe",
      department: "IT",
      clock_out_time: "",
      total_overtime: "",
      notes: "",
    },
    {
      id: "2",
      date: "2025-11-11",
      employee_name: "Jane Smith",
      department: "HRD",
      clock_out_time: "",
      total_overtime: "",
      notes: "",
    },
  ],
  mode: "view",
  editingIds: new Set(),

  setData: (data) => set({ data }),

  updateRow: (id, key, value) =>
    set((state) => ({
      data: state.data.map((row) =>
        row.id === id ? { ...row, [key]: value } : row
      ),
    })),

  setMode: (mode) => set({ mode }),

  startEditing: (id) =>
    set((state) => ({
      mode: "edit",
      editingIds: new Set(state.editingIds).add(id),
    })),

  stopEditing: (id) =>
    set((state) => {
      const newEditingIds = new Set(state.editingIds);
      newEditingIds.delete(id);
      return {
        editingIds: newEditingIds,
        mode: newEditingIds.size === 0 ? "view" : "edit",
      };
    }),

  saveChanges: () =>
    set({
      mode: "view",
      editingIds: new Set(),
    }),

  cancelChanges: () =>
    set({
      mode: "view",
      editingIds: new Set(),
    }),
}));
