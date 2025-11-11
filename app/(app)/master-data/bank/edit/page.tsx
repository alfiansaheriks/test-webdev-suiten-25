"use client";
import { SetPageTitle } from "@/app/components/set-page-title";
import { ACTION, PAGE } from "@/constant/app";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormText } from "@/app/components/ui/form";
import { useFormSubmit } from "@/stores/form-submit";

type BankFormData = {
  bank_name: string;
  bank_short_name: string;
};

function EditBank() {
  const { setSubmitForm, setIsSubmitting } = useFormSubmit();
  const form = useForm<BankFormData>({
    defaultValues: {
      bank_name: "",
      bank_short_name: "",
    },
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: BankFormData) => {
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
        title={PAGE.MASTER_DATA.BANK.UPDATE}
        action={ACTION.UPDATE}
        alsoDocument
      />

      <div className="container py-10 tracking-wide">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informasi Bank</h3>
                  <FormText
                    control={form.control}
                    name="bank_name"
                    label="Nama Bank"
                    placeholder="Masukkan nama bank"
                  />
                  <FormText
                    control={form.control}
                    name="bank_short_name"
                    label="Nama Bank (Singkat)"
                    placeholder="Masukkan singkatan bank"
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

export default EditBank;
