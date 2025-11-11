"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SetPageTitle } from "../../../../components/set-page-title";
import { ACTION, PAGE, TAB } from "@/constant/app";
import { useAbsenceStore } from "@/stores/absence-store";
import { useFormSubmit } from "@/stores/form-submit";
import { AbsenceInputTable } from "@/app/components/ui/InputTable";
import { useForm } from "react-hook-form";
import { Calendar22 } from "@/components/ui/date-picker";

type AbsenceFormData = {
  employee_id: string;
  clock_out_time: string;
  total_overtime: number;
  notes: string;
};

function AbsenceCreatePage() {
  const router = useRouter();
  const { isSubmitting, setIsSubmitting, setSubmitForm } = useFormSubmit();
  const { data: storeData, setData } = useAbsenceStore();
  const [editData, setEditData] = useState(storeData);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const form = useForm<AbsenceFormData>({
    defaultValues: {
      employee_id: "",
      clock_out_time: "",
      total_overtime: 0,
      notes: "",
    },
    mode: "onChange",
  });

  const { handleSubmit } = form;

  const handleEdit = (id: string, key: string, value: string) => {
    setEditData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [key]: value } : row))
    );
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const filteredIds = editData
        .filter((item) => {
          const matchesSearch = item.employee_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesDept =
            selectedDepartment === "all" ||
            item.department === selectedDepartment;
          return matchesSearch && matchesDept;
        })
        .map((item) => item.id);
      setSelectedIds(new Set(filteredIds));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleRemove = (id: string) => {
    setEditData((prev) => prev.filter((item) => item.id !== id));
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const onSubmit = useCallback(
    async (data: AbsenceFormData) => {
      try {
        setIsSubmitting(true);

        // Filter only selected rows with filled data
        const selectedData = editData.filter((item) =>
          selectedIds.has(item.id)
        );

        // Validate that required fields are filled
        const hasInvalidData = selectedData.some(
          (item) =>
            !item.clock_out_time ||
            item.total_overtime === "" ||
            item.notes === ""
        );

        if (hasInvalidData) {
          alert("Mohon isi semua kolom yang wajib untuk data yang dipilih");
          return;
        }

        if (selectedData.length === 0) {
          alert("Pilih minimal satu pegawai");
          return;
        }

        console.log("Submitting absence data:", selectedData);

        // TODO: call API to create absence
        // const response = await fetch("/api/absences", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(selectedData),
        // });

        // Mock success response
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Save to store and redirect
        setData(selectedData);
        router.push("/absence/input-absence");
      } catch (error) {
        console.error("Submit error:", error);
        alert("Gagal menyimpan data");
        throw error; // Re-throw to let the form handle the error state
      } finally {
        setIsSubmitting(false);
      }
    },
    [editData, selectedIds, setData, setIsSubmitting, router]
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
      <SetPageTitle title={TAB.ABSENCE} action={ACTION.CREATE} alsoDocument />
      <div className="container py-10">
        <h1 className="font-semibold text-xl mb-6">{PAGE.ABSENCE.CREATE}</h1>
        <AbsenceInputTable
          data={editData}
          selectedIds={selectedIds}
          onEdit={handleEdit}
          onCheckboxChange={handleCheckboxChange}
          onSelectAll={handleSelectAll}
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

export default AbsenceCreatePage;
