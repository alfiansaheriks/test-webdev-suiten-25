"use client";

import { SetPageTitle } from "@/app/components/set-page-title";
import { ACTION, PAGE } from "@/constant/app";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormText } from "@/app/components/ui/form";
import { useFormSubmit } from "@/stores/form-submit";
import { useActionHandler } from "@/stores/action-submit";
import { useDepartmentStore } from "@/stores/master-data/departmentStore";
import { useParams, useRouter } from "next/navigation";

type DepartmentFormData = {
  department_name: string;
};

function EditDepartment() {
  const router = useRouter();
  const params = useParams();
  const { setSubmitForm, setIsSubmitting } = useFormSubmit();
  const { setActions, clearActions } = useActionHandler();
  const { getById, update, remove } = useDepartmentStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DepartmentFormData>({
    defaultValues: {
      department_name: "",
    },
    mode: "onChange",
  });

  // Fetch data saat mount
  useEffect(() => {
    const fetchDepartment = async () => {
      if (!params?.id) return;
      try {
        const department = await getById(params.id as string);
        if (department) {
          form.reset({
            department_name: department.department_name,
          });
        } else {
          router.push("/master-data/department");
        }
      } catch (error) {
        console.error("Error fetching department:", error);
      }
    };

    if (params?.id) fetchDepartment();
  }, [params?.id, form, getById, router]);

  // Handler untuk update
  const onSubmit = useCallback(
    async (data: DepartmentFormData) => {
      try {
        setIsSubmitting(true);
        setIsLoading(true);
        await update({
          id: params.id as string,
          ...data,
        });
        router.push("/master-data/department");
      } catch (error) {
        console.error("Error updating department:", error);
      } finally {
        setIsSubmitting(false);
        setIsLoading(false);
      }
    },
    [params?.id, router, setIsSubmitting, update]
  );

  // Handler untuk delete
  const handleDelete = useCallback(async () => {
    if (!params?.id) return;
    if (window.confirm("Yakin ingin menghapus department ini?")) {
      try {
        await remove(params.id as string);
        router.push("/master-data/department");
      } catch (error) {
        console.error("Error deleting department:", error);
      }
    }
  }, [params?.id, remove, router]);

  // Daftarin ke store supaya ActionButton di header bisa pakai
  useEffect(() => {
    setActions({
      submit: async () => {
        await form.handleSubmit(onSubmit)();
      },
      delete: handleDelete,
    });

    setSubmitForm(async () => {
      await form.handleSubmit(onSubmit)();
    });

    return () => {
      clearActions();
      setSubmitForm(null);
    };
  }, [form, onSubmit, handleDelete, setActions, setSubmitForm, clearActions]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <SetPageTitle
        title={PAGE.MASTER_DATA.DEPARTMENT.UPDATE}
        action={ACTION.UPDATE}
        alsoDocument
      />

      <div className="container py-10 tracking-wide">
        <div className="w-full space-y-8">
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

export default EditDepartment;
