"use client";
import { create } from "zustand";

type SubmitFn = (() => void | Promise<void>) | null;

type FormSubmitState = {
  submitForm: SubmitFn;
  setSubmitForm: (fn: SubmitFn) => void;
  isSubmitting: boolean;
  setIsSubmitting: (v: boolean) => void;
  reset: () => void;
  deleteForm: SubmitFn;
  setDeleteForm: (fn: SubmitFn) => void;
};

export const useFormSubmit = create<FormSubmitState>((set) => ({
  submitForm: null,
  setSubmitForm: (fn) => set({ submitForm: fn }),
  isSubmitting: false,
  setIsSubmitting: (v) => set({ isSubmitting: v }),
  reset: () => set({ submitForm: null, isSubmitting: false }),
  deleteForm: null,
  setDeleteForm: (fn) => set({ deleteForm: fn }),
}));
