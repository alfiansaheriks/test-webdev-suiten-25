import z from "zod";

export const shiftFormSchema = z.object({
  shift_name: z
    .string()
    .min(1, "Nama shift harus diisi")
    .max(100, "Nama shift harus kurang dari 100 karakter"),
  start_time: z
    .string()
    .min(1, "Waktu mulai harus diisi")
    .max(100, "Waktu mulai harus kurang dari 100 karakter"),
  end_time: z
    .string()
    .min(1, "Waktu selesai harus diisi")
    .max(100, "Waktu selesai harus kurang dari 100 karakter"),
});

export type ShiftFormData = z.infer<typeof shiftFormSchema>;

export const shiftFormDefaultValues: ShiftFormData = {
  shift_name: "",
  start_time: "",
  end_time: "",
};
