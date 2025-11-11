import z from "zod";

export const departmentFormSchema = z.object({
  department_name: z
    .string()
    .min(1, "Nama bagian harus diisi")
    .max(100, "Nama bagian harus kurang dari 100 karakter"),
});

export type DepartmentFormData = z.infer<typeof departmentFormSchema>;

export const departmentFormDefaultValues: DepartmentFormData = {
  department_name: "",
};
