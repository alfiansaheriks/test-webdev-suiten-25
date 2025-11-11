"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type Option = { label: string; value: string };

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
};

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
}: Props<T>) {
  return (
    <div className="flex w-full gap-2">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1 min-w-0 mb-0">
            {label && <FormLabel className="font-normal">{label}</FormLabel>}
            <FormControl>
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={placeholder || "Pilih salah satu"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
