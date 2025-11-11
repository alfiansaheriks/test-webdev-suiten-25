import { Input } from "@/components/ui/input";
import React from "react";

function InputText({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label>{label}</label>
      <Input placeholder={placeholder} value={value} onChange={onChange} />
    </>
  );
}

export default InputText;
