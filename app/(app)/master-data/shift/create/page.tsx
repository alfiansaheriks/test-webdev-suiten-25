"use client";
import { SetPageTitle } from "@/app/components/set-page-title";
import { ACTION, PAGE } from "@/constant/app";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormText } from "@/app/components/ui/form";
import { useFormSubmit } from "@/stores/form-submit";
import {
  ShiftFormData,
  shiftFormDefaultValues,
  shiftFormSchema,
} from "@/validator/shiftValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShiftStore } from "@/stores/master-data/shiftStore";
import { useRouter } from "next/navigation";
import { SHIFT_RELATIVE_PARAMS } from "@/constant/params";

function CreateShift() {
  const router = useRouter();
  const { create } = useShiftStore();
  const { setSubmitForm, setIsSubmitting } = useFormSubmit();
  const form = useForm<ShiftFormData>({
    resolver: zodResolver(shiftFormSchema),
    defaultValues: shiftFormDefaultValues,
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: ShiftFormData) => {
      try {
        setIsSubmitting(true);
        const res = await create(data);
        if (res.id) {
          router.push(SHIFT_RELATIVE_PARAMS);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [setIsSubmitting, create, router]
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
        title={PAGE.MASTER_DATA.SHIFT.CREATE}
        action={ACTION.CREATE}
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
                    error={form.formState.errors.shift_name?.message}
                  />
                  <FormText
                    control={form.control}
                    name="start_time"
                    label="Waktu Mulai"
                    placeholder="19:00"
                    error={form.formState.errors.start_time?.message}
                  />
                  <FormText
                    control={form.control}
                    name="end_time"
                    label="Waktu Selesai"
                    placeholder="23:00"
                    error={form.formState.errors.end_time?.message}
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

export default CreateShift;
