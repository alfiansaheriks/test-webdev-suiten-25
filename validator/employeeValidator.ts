import z from "zod";

export const employeeFormSchema = z.object({
  employee_name: z
    .string()
    .min(1, "Nama shift harus diisi")
    .max(100, "Nama shift harus kurang dari 100 karakter"),
  department_id: z
    .array(
      z.object({
        value: z.string().min(1, "Departemen harus diisi"),
      })
    )
    .nonempty("Departemen harus diisi"),
  phone_number: z
    .string()
    .min(1, "Nomor telepon harus diisi")
    .max(100, "Nomor telepon harus kurang dari 100 karakter"),
  bank_id: z
    .string()
    .min(1, "Nama bank harus diisi")
    .max(100, "Nomor rekening harus kurang dari 100 karakter"),
  bank_name: z
    .string()
    .min(1, "Nama pemilik norek harus diisi")
    .max(100, "Nama rekening harus kurang dari 100 karakter"),
  bank_number: z
    .string()
    .min(1, "Nomor rekening harus diisi")
    .max(100, "Nomor rekening harus kurang dari 100 karakter"),
  shift_id: z
    .array(
      z.object({
        value: z.string().min(1, "Shift harus diisi"),
      })
    )
    .nonempty("Shift harus diisi"),
  salary_period: z
    .string()
    .min(1, "Periode gajian harus diisi")
    .max(100, "Periode gajian harus kurang dari 100 karakter"),
  main_salary: z
    .string()
    .min(1, "Gaji pokok harus diisi")
    .max(100, "Gaji pokok harus kurang dari 100 karakter"),
  daily_salary: z
    .string()
    .min(1, "Gaji harian harus diisi")
    .max(100, "Gaji harian harus kurang dari 100 karakter"),
  eat_salary: z
    .string()
    .min(1, "Uang makan harus diisi")
    .max(100, "Uang makan harus kurang dari 100 karakter"),
  holiday_eat_salary: z
    .string()
    .min(1, "Uang makan libur harus diisi")
    .max(100, "Uang makan libur harus kurang dari 100 karakter"),
  overtime_salary: z
    .string()
    .min(1, "Rate lembur harus diisi")
    .max(100, "Rate lembur harus kurang dari 100 karakter"),
  holiday_overtime_salary: z
    .string()
    .min(1, "Rate lembur libur harus diisi")
    .max(100, "Rate lembur libur harus kurang dari 100 karakter"),
});

export type EmployeeFormData = z.infer<typeof employeeFormSchema>;

export const employeeFormDefaultValues: EmployeeFormData = {
  employee_name: "",
  department_id: [],
  phone_number: "",
  bank_id: "",
  bank_name: "",
  bank_number: "",
  shift_id: [],
  salary_period: "",
  main_salary: "",
  daily_salary: "",
  eat_salary: "",
  holiday_eat_salary: "",
  overtime_salary: "",
  holiday_overtime_salary: "",
};
