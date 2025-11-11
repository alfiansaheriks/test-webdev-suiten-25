"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
  error?: string;
};

export function FormText<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  error,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className="font-normal">{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className="inset-shadow-sm"
              value={field.value || ""}
            />
          </FormControl>
          {error && <FormMessage>{error}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
