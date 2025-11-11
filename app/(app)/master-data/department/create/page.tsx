"use client";
import { SetPageTitle } from "@/app/components/set-page-title";
import { ACTION, PAGE } from "@/constant/app";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormText } from "@/app/components/ui/form";
import { useFormSubmit } from "@/stores/form-submit";
import {
  DepartmentFormData,
  departmentFormDefaultValues,
  departmentFormSchema,
} from "@/validator/departmentValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDepartmentStore } from "@/stores/master-data/departmentStore";
import { DEPARTMENT_RELATIVE_PARAMS } from "@/constant/params";

function CreateDepartment() {
  const router = useRouter();
  const { create } = useDepartmentStore();
  const { setSubmitForm, setIsSubmitting } = useFormSubmit();
  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: departmentFormDefaultValues,
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: DepartmentFormData) => {
      try {
        setIsSubmitting(true);
        const res = await create(data);
        if (res.id) {
          router.push(DEPARTMENT_RELATIVE_PARAMS);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [create, setIsSubmitting, router]
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
        title={PAGE.MASTER_DATA.DEPARTMENT.CREATE}
        action={ACTION.CREATE}
        alsoDocument
      />

      <div className="container py-10 tracking-wide">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informasi Bagian</h3>
                  <FormText
                    control={form.control}
                    name="department_name"
                    label="Nama Bagian"
                    placeholder="Masukkan nama bagian"
                    error={form.formState.errors.department_name?.message}
                  />
                </div>
              </div>
              <button type="submit" className="hidden" aria-hidden />
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default CreateDepartment;
