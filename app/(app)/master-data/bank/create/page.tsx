"use client";
import { SetPageTitle } from "@/app/components/set-page-title";
import { ACTION, PAGE } from "@/constant/app";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormText } from "@/app/components/ui/form";
import { useFormSubmit } from "@/stores/form-submit";
import { useBankStore } from "@/stores/master-data/bankStore";
import {
  BankFormData,
  bankFormDefaultValues,
  bankFormSchema,
} from "@/validator/bankValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { BANK_RELATIVE_PARAMS } from "@/constant/params";

function CreateBank() {
  const router = useRouter();
  const { setSubmitForm, setIsSubmitting } = useFormSubmit();
  const { create } = useBankStore();
  const form = useForm<BankFormData>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: bankFormDefaultValues,
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (data: BankFormData) => {
      try {
        setIsSubmitting(true);
        console.log("Form data:", data);
        const res = await create(data);
        if (res.id) {
          router.push(BANK_RELATIVE_PARAMS);
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
  }, [form, onSubmit, setSubmitForm, router]);

  return (
    <>
      <SetPageTitle
        title={PAGE.MASTER_DATA.BANK.CREATE}
        action={ACTION.CREATE}
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
                    error={form.formState.errors.bank_name?.message}
                  />
                  <FormText
                    control={form.control}
                    name="bank_short_name"
                    label="Nama Bank (Singkat)"
                    placeholder="Masukkan singkatan bank"
                    error={form.formState.errors.bank_short_name?.message}
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

export default CreateBank;
