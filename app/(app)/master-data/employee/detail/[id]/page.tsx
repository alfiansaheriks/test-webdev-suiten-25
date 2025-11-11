"use client";

import { SetPageTitle } from "@/app/components/set-page-title";
import { ACTION, PAGE } from "@/constant/app";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  FormText,
  FormSelect,
  FormSelectArray,
} from "@/app/components/ui/form";
import { useFormSubmit } from "@/stores/form-submit";
import { useActionHandler } from "@/stores/action-submit";
import { useEmployeeStore } from "@/stores/master-data/employeeStore";
import { useParams, useRouter } from "next/navigation";
import { useEmployeeDetail } from "@/hooks/useEmployeeDetail";
import { Loader2 } from "lucide-react";
import { Employee } from "@/types/employee";
import { EmployeeFormData } from "@/validator/employeeValidator";
import { useMasterData } from "@/hooks/useMasterData";

export default function EditEmployee() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { departmentOptions, bankOptions, shiftOptions, salaryPeriodOptions } =
    useMasterData();
  const { setSubmitForm, setIsSubmitting } = useFormSubmit();
  const { setActions, clearActions } = useActionHandler();
  const { update, remove } = useEmployeeStore();

  const { employee, loading } = useEmployeeDetail(id);

  const form = useForm<EmployeeFormData>({
    defaultValues: {
      employee_name: "",
      phone_number: "",
      department_id: [],
      bank_id: "",
      bank_name: "",
      bank_number: "",
      shift_id: [],
      salary_period: "Weekly",
      main_salary: "",
      daily_salary: "",
      eat_salary: "",
      holiday_eat_salary: "",
      overtime_salary: "",
      holiday_overtime_salary: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (employee) {
      form.reset({
        employee_name: employee.employee_name,
        phone_number: employee.phone_number,
        department_id: (employee.department_id || []).map((d) => ({
          value: d,
        })),
        bank_id: employee.bank_id ?? "",
        bank_name: employee.bank_name ?? "",
        bank_number: employee.bank_number ?? "",
        shift_id: (employee.shift_id || []).map((s) => ({ value: s })),
        salary_period: employee.salary_period ?? "Weekly",
        main_salary: employee.main_salary?.toString() || "",
        daily_salary: employee.daily_salary?.toString() || "",
        eat_salary: employee.eat_salary?.toString() || "",
        holiday_eat_salary: employee.holiday_eat_salary?.toString() || "",
        overtime_salary: employee.overtime_salary?.toString() || "",
        holiday_overtime_salary:
          employee.holiday_overtime_salary?.toString() || "",
      });
    }
  }, [employee, form]);

  const handleUpdate = useCallback(
    async (data: EmployeeFormData) => {
      try {
        setIsSubmitting(true);

        const payload: Employee = {
          id,
          employee_name: data.employee_name,
          department_id: data.department_id.map((d) => d.value),
          phone_number: data.phone_number,
          bank_id: data.bank_id,
          bank_name: data.bank_name,
          bank_number: data.bank_number,
          shift_id: data.shift_id.map((s) => s.value),
          salary_period: data.salary_period as "Daily" | "Weekly" | "Monthly",
          main_salary: Number(data.main_salary),
          daily_salary: Number(data.daily_salary),
          eat_salary: Number(data.eat_salary),
          holiday_eat_salary: Number(data.holiday_eat_salary),
          overtime_salary: Number(data.overtime_salary),
          holiday_overtime_salary: Number(data.holiday_overtime_salary),
        };

        await update(payload);
        alert("Data karyawan berhasil diperbarui ✅");
        router.push("/master-data/employee");
      } catch (error) {
        console.error("Error updating employee:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [id, setIsSubmitting, update, router]
  );

  const handleDelete = useCallback(async () => {
    if (!id) return;
    if (window.confirm("Yakin ingin menghapus data karyawan ini?")) {
      try {
        await remove(id);
        alert("Data karyawan berhasil dihapus ❌");
        router.push("/master-data/employee");
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  }, [id, remove, router]);

  useEffect(() => {
    setActions({
      submit: async () => await form.handleSubmit(handleUpdate)(),
      delete: handleDelete,
    });

    return () => clearActions();
  }, [form, handleUpdate, handleDelete, setActions, clearActions]);

  useEffect(() => {
    const submitHandler = async () => {
      await form.handleSubmit(handleUpdate)();
    };
    setSubmitForm(submitHandler);

    return () => {
      setSubmitForm(null);
    };
  }, [form, handleUpdate, setSubmitForm]);
  return (
    <>
      <SetPageTitle
        title={PAGE.MASTER_DATA.EMPLOYEE.UPDATE}
        action={ACTION.UPDATE}
        alsoDocument
      />

      <div className="container py-10 tracking-wide">
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdate)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informasi Pribadi</h3>
                    <FormText
                      control={form.control}
                      name="employee_name"
                      label="Nama Lengkap"
                      placeholder="Masukkan nama lengkap"
                    />
                    <FormSelectArray
                      control={form.control}
                      name="department_id"
                      label="Departemen"
                      options={departmentOptions}
                      allowPerRowDelete
                    />
                    <FormText
                      control={form.control}
                      name="phone_number"
                      label="Nomor Telepon"
                      type="number"
                      placeholder="Masukkan nomor telepon"
                    />
                    <FormText
                      control={form.control}
                      name="bank_number"
                      label="Nomor Rekening"
                      type="number"
                      placeholder="Masukkan nomor rekening"
                    />
                    <FormText
                      control={form.control}
                      name="bank_name"
                      label="Nama Rekening"
                      placeholder="Masukkan nama rekening"
                    />
                    <FormSelect
                      control={form.control}
                      name="bank_id"
                      label="Bank"
                      options={bankOptions}
                    />
                    <FormSelectArray
                      control={form.control}
                      name="shift_id"
                      label="Shift"
                      options={shiftOptions}
                      allowPerRowDelete
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informasi Tambahan</h3>
                    <FormText
                      control={form.control}
                      name="main_salary"
                      label="Gaji Pokok"
                      placeholder="Masukkan gaji pokok"
                    />
                    <FormSelect
                      control={form.control}
                      name="salary_period"
                      label="Periode Gajian"
                      options={salaryPeriodOptions}
                    />
                    <FormText
                      control={form.control}
                      name="daily_salary"
                      label="Gaji Harian"
                      placeholder="Masukkan gaji harian"
                    />
                    <FormText
                      control={form.control}
                      name="eat_salary"
                      label="Uang Makan"
                      placeholder="Masukkan uang makan"
                    />
                    <FormText
                      control={form.control}
                      name="holiday_eat_salary"
                      label="Uang Makan (Tanggal Merah)"
                      placeholder="Masukkan uang makan libur"
                    />
                    <FormText
                      control={form.control}
                      name="overtime_salary"
                      label="Rate Lembur"
                      placeholder="Masukkan rate lembur"
                    />
                    <FormText
                      control={form.control}
                      name="holiday_overtime_salary"
                      label="Rate Lembur (Tanggal Merah)"
                      placeholder="Masukkan rate lembur libur"
                    />
                  </div>
                </div>

                <button type="submit" className="hidden" aria-hidden />
              </form>
            </Form>
          )}
        </div>
      </div>
    </>
  );
}
