"use client";
import React, { useEffect, useState } from "react";
import { SetPageTitle } from "../../../components/set-page-title";
import { ACTION, TAB } from "@/constant/app";
import { AbsenceInputTable } from "@/app/components/ui/InputTable";
import { Calendar22 } from "@/components/ui/date-picker";
import { FormSelect } from "@/app/components/ui/form";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Absence } from "@/types/absence";
import { useAbsenceStore } from "@/stores/absence/absenceStore";
import { useMasterData } from "@/hooks/useMasterData";

function AbsencePage() {
  const {
    absences: storeAbsences,
    employees: storeEmployees,
    fetchAll,
    create,
    update,
    loading,
  } = useAbsenceStore();
  const { departmentOptions, departments } = useMasterData();
  const [editData, setEditData] = useState<Absence[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // Merge employees with absences
  useEffect(() => {
    if (storeEmployees.length > 0) {
      console.log("[AbsencePage] Merging employees with absences");
      const absenceMap = new Map(
        storeAbsences.map((a) => [a.employee_name, a])
      );

      const mergedData = storeEmployees.map((emp) => {
        const existing = absenceMap.get(emp.employee_name);
        if (existing) {
          return existing;
        }
        return {
          id: `temp-${emp.id}`,
          date: selectedDate,
          employee_name: emp.employee_name,
          department: selectedDepartment,
          department_id: selectedDepartment,
          clock_out_time: "",
          total_overtime: "",
          notes: "",
        };
      });

      console.log("[AbsencePage] Merged data:", mergedData);
      setEditData(mergedData);
    } else {
      setEditData(storeAbsences);
    }
  }, [storeEmployees, storeAbsences, selectedDate, selectedDepartment]);

  // Set default department on first load
  useEffect(() => {
    console.log("[AbsencePage] Departments loaded:", departments);
    if (departments.length > 0 && !selectedDepartment) {
      console.log(
        "[AbsencePage] Setting default department to:",
        departments[0].id
      );
      setSelectedDepartment(departments[0].id);
    }
  }, [departments, selectedDepartment]);

  const form = useForm<{ department: string }>({
    defaultValues: {
      department: "",
    },
    mode: "onChange",
  });

  // Update form default when selectedDepartment changes
  useEffect(() => {
    if (selectedDepartment) {
      console.log(
        "[AbsencePage] Resetting form with department:",
        selectedDepartment
      );
      form.reset({ department: selectedDepartment });
    }
  }, [selectedDepartment, form]);

  const { control, watch } = form;

  // 🔁 Fetch data when department or date changes
  const watchDepartment = watch("department");

  // Sync form changes to selectedDepartment
  useEffect(() => {
    if (watchDepartment && watchDepartment !== selectedDepartment) {
      setSelectedDepartment(watchDepartment);
    }
  }, [watchDepartment, selectedDepartment]);

  const handleEdit = (
    id: string,
    key: string | number | symbol,
    value: string
  ) => {
    setEditData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [key]: value } : row))
    );
  };

  const handleRowEdit = (id: string | number) => {
    if (id === "save") {
      const row = editData.find((r) => r.id === editingId);
      console.log("Ini ROW :", row);
      if (row) {
        const sortedRow: Absence = {
          // id: row.id,
          date: row.date,
          employee_id: row.id!.replace("temp-", ""),
          department_id: row.department_id,
          clock_out_time: row.clock_out_time,
          total_overtime: row.total_overtime,
          notes: row.notes,
        };
        if (row.id?.startsWith("temp-")) {
          create(sortedRow);
        } else {
          update(sortedRow);
        }
      }
      setEditingId(null);
    } else if (id === "cancel") {
      setEditingId(null);
    } else {
      setEditingId(String(id));
    }
  };

  const handleRemove = (id: string) => {
    setEditData((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  useEffect(() => {
    if (selectedDepartment) {
      console.log(
        "[AbsencePage] selectedDepartment changed:",
        selectedDepartment
      );
      console.log("[AbsencePage] Calling fetchAll with:", {
        department_id: selectedDepartment,
        date: selectedDate,
      });
      fetchAll(selectedDepartment, selectedDate);
    }
  }, [selectedDepartment, selectedDate, fetchAll]);

  return (
    <>
      <SetPageTitle title={TAB.ABSENCE} action={ACTION.LANDING} alsoDocument />
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-semibold text-xl">Daftar Absensi</h1>
          <Form {...form}>
            <form onSubmit={() => {}}>
              <div className="flex gap-3">
                <Calendar22
                  value={selectedDate ? new Date(selectedDate) : new Date()}
                  onChange={(date: Date | undefined) =>
                    setSelectedDate(
                      date
                        ? date.toISOString().split("T")[0]
                        : new Date().toISOString().split("T")[0]
                    )
                  }
                />
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

        {loading ? (
          <div className="text-center py-10">Loading data...</div>
        ) : (
          <AbsenceInputTable
            data={editData}
            selectedIds={new Set(editingId ? [editingId] : [])}
            onEdit={handleEdit}
            onCheckboxChange={(id) => {
              setEditingId(editingId === id ? null : id);
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
        )}
      </div>
    </>
  );
}

export default AbsencePage;
