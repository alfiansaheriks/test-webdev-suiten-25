/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useFieldArray,
  Control,
  FieldValues,
  FieldArrayPath,
  PathValue,
} from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormField,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Button } from "../Button";
import { Plus } from "lucide-react";

type Option = { label: string; value: string };

export type FormSelectArrayItem = {
  value: string;
  id?: string;
};

type Props<T extends FieldValues, A extends FieldArrayPath<T>> = {
  control: Control<T>;
  name: A;
  label?: string;
  buttonText?: string;
  options: Option[];
  allowPerRowDelete?: boolean;
};

export function FormSelectArray<
  T extends FieldValues,
  A extends FieldArrayPath<T>
>({
  control,
  name,
  label,
  buttonText = "Add",
  options = [],
  allowPerRowDelete,
}: Props<T, A>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    keyName: "id",
  });

  const [selectedValue, setSelectedValue] = React.useState("");

  const availableOptions = options.filter((opt) => {
    const currentValues = fields.map((f: any) => f.value?.value || f.value);
    return !currentValues.includes(opt.value);
  });

  const handleAddOption = (value?: string) => {
    const valueToAdd = value || selectedValue;
    if (valueToAdd) {
      const selectedOption = options.find((opt) => opt.value === valueToAdd);
      if (selectedOption) {
        const newItem = { value: valueToAdd };
        console.log("Appending new item:", newItem);
        append(newItem as any);
        setSelectedValue("");
      }
    }
  };

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    // Automatically append when user selects an option
    handleAddOption(value);
  };

  return (
    <div className="space-y-2">
      {label && <FormLabel className="font-normal">{label}</FormLabel>}
      <div className="space-y-2">
        {fields.map((f, index) => (
          <div key={f.id} className="flex w-full gap-2">
            <FormField
              control={control}
              name={`${name}.${index}` as any}
              render={({ field }) => (
                <FormItem className="flex-1 min-w-0 mb-0">
                  <FormControl>
                    <Select
                      value={field.value?.value ?? ""}
                      onValueChange={(value) => {
                        field.onChange({ value });
                      }}
                    >
                      <SelectTrigger className="w-full focus-visible:ring-[#155EEF] focus-visible:ring-1">
                        <SelectValue placeholder="Pilih opsi" />
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
                  <FormMessage className="mt-1" />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="shrink-0"
              onClick={() => remove(index)}
            >
              Hapus
            </Button>
          </div>
        ))}
      </div>
      {fields.length < options.length && (
        <div className="flex w-full gap-2">
          <div className="flex-1 min-w-0">
            <Select value={selectedValue} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full focus-visible:ring-[#155EEF] focus-visible:ring-1">
                <SelectValue placeholder="Pilih opsi" />
              </SelectTrigger>
              <SelectContent>
                {availableOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            size="sm"
            className="shrink-0 p-4 bg-[#155EEF] text-white"
            disabled={!selectedValue || fields.length >= options.length}
            onClick={() => handleAddOption()}
          >
            <Plus />
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
}
