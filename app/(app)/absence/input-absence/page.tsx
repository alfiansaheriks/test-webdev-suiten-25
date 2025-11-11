"use client";
import React, { useState } from "react";
import { SetPageTitle } from "../../../components/set-page-title";
import { ACTION, TAB } from "@/constant/app";
import type { Absence } from "./data/columns";
import { useAbsenceStore } from "@/stores/absence-store";
import { AbsenceInputTable } from "@/app/components/ui/InputTable";
import { Calendar22 } from "@/components/ui/date-picker";
import { FormSelect } from "@/app/components/ui/form";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

const departmentOptions = [
  { label: "Engineering", value: "engineering" },
  { label: "Sales", value: "sales" },
  { label: "Marketing", value: "marketing" },
  { label: "HR", value: "hr" },
  { label: "Finance", value: "finance" },
];

function AbsencePage() {
  const { data: storeData, setData } = useAbsenceStore();
  const [editData, setEditData] = useState<Absence[]>(storeData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const form = useForm<Absence>({
    defaultValues: {
      department: "",
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleEdit = (id: string, key: keyof Absence, value: string) => {
    setEditData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [key]: value } : row))
    );
  };

  const handleRowEdit = (id: string | number) => {
    if (id === "save") {
      // Save signal
      setData(editData);
      setEditingId(null);
      console.log("Saved data:", editData);
    } else if (id === "cancel") {
      // Cancel signal
      setEditingId(null);
    } else {
      // Edit signal - set the row to edit mode
      setEditingId(String(id));
    }
  };

  const handleRemove = (id: string) => {
    setEditData((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  return (
    <>
      <SetPageTitle title={TAB.ABSENCE} action={ACTION.LANDING} alsoDocument />
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-semibold text-xl">Daftar Absensi</h1>
          <Form {...form}>
            <form onSubmit={() => {}}>
              <div className="flex gap-3">
                <Calendar22 />
                <FormSelect
                  label=""
                  name="department"
                  control={control}
                  options={departmentOptions}
                />
              </div>
            </form>
          </Form>
        </div>
        <AbsenceInputTable
          data={editData}
          selectedIds={new Set(editingId ? [editingId] : [])}
          onEdit={handleEdit}
          onCheckboxChange={(id) => {
            if (editingId === id) {
              setEditingId(null);
            } else {
              setEditingId(id);
            }
          }}
          showCheckbox={false}
          showEditAction={true}
          showSearch={false}
          showFilter={false}
          onRowEdit={handleRowEdit}
          onSearchChange={setSearchTerm}
          onDepartmentChange={setSelectedDepartment}
          onRemove={handleRemove}
          searchTerm={searchTerm}
          selectedDepartment={selectedDepartment}
        />
      </div>
    </>
  );
}

export default AbsencePage;
