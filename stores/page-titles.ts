"use client";

import { create } from "zustand";

type State = {
  title: string;
  action: string;
};

type Actions = {
  setTitle: (t: string) => void;
  reset: () => void;
  setAction: (a: string) => void;
  resetAction: () => void;
};

export const usePageTitleStore = create<State & Actions>((set) => ({
  title: "",
  setTitle: (t) => set({ title: t }),
  reset: () => set({ title: "" }),
  action: "",
  setAction: (a) => set({ action: a }),
  resetAction: () => set({ action: "" }),
}));
