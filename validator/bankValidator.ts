import { z } from "zod";

export const bankFormSchema = z.object({
  bank_name: z
    .string()
    .min(1, "Nama Bank harus diisi")
    .max(100, "Nama Bank harus kurang dari 100 karakter"),
  bank_short_name: z
    .string()
    .min(1, "Nama Bank (singkat) harus diisi")
    .max(10, "Nama Bank (singkat) harus kurang dari 10 karakter"),
});

export type BankFormData = z.infer<typeof bankFormSchema>;

export const bankFormDefaultValues: BankFormData = {
  bank_name: "",
  bank_short_name: "",
};
