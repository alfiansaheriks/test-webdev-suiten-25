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
import {
  EmployeeFormData,
  employeeFormDefaultValues,
  employeeFormSchema,
} from "@/validator/employeeValidator";
import { useMasterData } from "@/hooks/useMasterData";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEmployeeStore } from "@/stores/master-data/employeeStore";

function CreateEmployee() {
  const { setSubmitForm, setIsSubmitting } = useFormSubmit();
  const { create } = useEmployeeStore();
  const {
    departmentOptions,
    shiftOptions,
    bankOptions,
    salaryPeriodOptions,
    isLoading,
  } = useMasterData();
  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: employeeFormDefaultValues,
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: EmployeeFormData) => {
      try {
        setIsSubmitting(true);
        const formData = {
          ...data,
          department_id: data.department_id.map((d) => d.value),
          shift_id: data.shift_id.map((s) => s.value),
          main_salary: data.main_salary ? Number(data.main_salary) : undefined,
          daily_salary: data.daily_salary
            ? Number(data.daily_salary)
            : undefined,
          eat_salary: data.eat_salary ? Number(data.eat_salary) : undefined,
          holiday_eat_salary: data.holiday_eat_salary
            ? Number(data.holiday_eat_salary)
            : undefined,
          overtime_salary: data.overtime_salary
            ? Number(data.overtime_salary)
            : undefined,
          holiday_overtime_salary: data.holiday_overtime_salary
            ? Number(data.holiday_overtime_salary)
            : undefined,
        };

        const res = await create(formData);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [setIsSubmitting, create]
  );

  useEffect(() => {
    const submitHandler = async () => {
      await form.handleSubmit(onSubmit)();
    };
    setSubmitForm(submitHandler);

    return () => {
      setSubmitForm(null);
    };
  }, [form, onSubmit, setSubmitForm]);

  return (
    <>
      <SetPageTitle
        title={PAGE.MASTER_DATA.EMPLOYEE.CREATE}
        action={ACTION.CREATE}
        alsoDocument
      />

      <div className="container py-10 tracking-wide">
        <div className="w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informasi Pribadi</h3>
                    <FormText
                      control={form.control}
                      name="employee_name"
                      label="Nama Lengkap"
                      placeholder="Masukkan nama lengkap"
                      error={form.formState.errors.employee_name?.message}
                    />
                    <FormSelectArray
                      control={form.control}
                      name="department_id"
                      label="Departemen"
                      options={departmentOptions}
                    />
                    <FormText
                      control={form.control}
                      name="phone_number"
                      label="Nomor Telepon"
                      type="number"
                      placeholder="Masukkan nomor telepon"
                      error={form.formState.errors.phone_number?.message}
                    />
                    <FormText
                      control={form.control}
                      name="bank_number"
                      label="Nomor Rekening"
                      type="number"
                      placeholder="Masukkan nomor rekening"
                      error={form.formState.errors.bank_number?.message}
                    />
                    <FormText
                      control={form.control}
                      name="bank_name"
                      label="Nama Rekening"
                      placeholder="Masukkan nama rekening"
                      error={form.formState.errors.bank_name?.message}
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
                      buttonText="Shift"
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
                      error={form.formState.errors.main_salary?.message}
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
                      error={form.formState.errors.daily_salary?.message}
                    />
                    <FormText
                      control={form.control}
                      name="eat_salary"
                      label="Uang Makan"
                      placeholder="Masukkan uang makan"
                      error={form.formState.errors.eat_salary?.message}
                    />
                    <FormText
                      control={form.control}
                      name="holiday_eat_salary"
                      label="Uang Makan (Tanggal Merah)"
                      placeholder="Masukkan uang makan libur"
                      error={form.formState.errors.holiday_eat_salary?.message}
                    />
                    <FormText
                      control={form.control}
                      name="overtime_salary"
                      label="Rate Lembur"
                      placeholder="Masukkan rate lembur"
                      error={form.formState.errors.overtime_salary?.message}
                    />
                    <FormText
                      control={form.control}
                      name="holiday_overtime_salary"
                      label="Rate Lembur (Tanggal Merah)"
                      placeholder="Masukkan rate lembur libur"
                      error={
                        form.formState.errors.holiday_overtime_salary?.message
                      }
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

export default CreateEmployee;
