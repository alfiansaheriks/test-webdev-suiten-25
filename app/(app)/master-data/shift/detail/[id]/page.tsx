"use client";
import { SetPageTitle } from "@/app/components/set-page-title";
import { ACTION, PAGE } from "@/constant/app";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormText } from "@/app/components/ui/form";
import { useFormSubmit } from "@/stores/form-submit";

type ShiftFormData = {
  shift_name: string;
  start_time: string;
  end_time: string;
};

function EditShift() {
  const { setSubmitForm, setIsSubmitting } = useFormSubmit();
  const form = useForm<ShiftFormData>({
    defaultValues: {
      shift_name: "",
      start_time: "",
      end_time: "",
    },
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: ShiftFormData) => {
      try {
        setIsSubmitting(true);
        // TODO: call API create department
        console.log("Form data:", data);
        // contoh:
        // await api.post("/departments", data);
      } finally {
        setIsSubmitting(false);
      }
    },
    [setIsSubmitting],
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
        title={PAGE.MASTER_DATA.SHIFT.UPDATE}
        action={ACTION.UPDATE}
        alsoDocument
      />

      <div className="container py-10 tracking-wide">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informasi Shift</h3>
                  <FormText
                    control={form.control}
                    name="shift_name"
                    label="Nama Shift"
                    placeholder="Masukkan nama shift"
                  />
                  <FormText
                    control={form.control}
                    name="start_time"
                    label="Waktu Mulai"
                    placeholder="19:00"
                  />
                  <FormText
                    control={form.control}
                    name="end_time"
                    label="Waktu Selesai"
                    placeholder="23:00"
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

export default EditShift;
