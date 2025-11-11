import { create } from "zustand";

type ActionHandlers = {
  submit?: () => Promise<void> | void;
  delete?: () => Promise<void> | void;
};

type ActionHandlerStore = {
  actions: ActionHandlers;
  setActions: (handlers: ActionHandlers) => void;
  clearActions: () => void;
};

export const useActionHandler = create<ActionHandlerStore>((set) => ({
  actions: {},
  setActions: (handlers) => set({ actions: { ...handlers } }),
  clearActions: () => set({ actions: {} }),
}));
