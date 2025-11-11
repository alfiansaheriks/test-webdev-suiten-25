"use client";

import { useEffect } from "react";
import { SetPageTitle } from "../../../components/set-page-title";
import { ACTION, PAGE } from "@/constant/app";
import { columns } from "./data/columns";
import { DataTable } from "@/app/components/ui/DataTable";
import { Form } from "@/components/ui/form";
import { FormSelect } from "@/app/components/ui/form";
import { useForm } from "react-hook-form";
import { useEmployeeStore } from "@/stores/master-data/employeeStore";
import { useRouter } from "next/navigation";
import { EMPLOYEE_DETAIL_RELATIVE_PARAMS } from "@/constant/params";

const departmentOptions = [
  { label: "All", value: "all" },
  { label: "Engineering", value: "engineering" },
  { label: "Sales", value: "sales" },
  { label: "Marketing", value: "marketing" },
  { label: "HR", value: "hr" },
  { label: "Finance", value: "finance" },
];

function EmployeePage() {
  const { employees: data, fetchAll } = useEmployeeStore();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRowClick = (employee: any) => {
    router.push(`${EMPLOYEE_DETAIL_RELATIVE_PARAMS}/${employee.id}`);
  };
  const form = useForm<{ department: string }>({
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchAll();
    };
    fetchData();
  }, [fetchAll]);

  return (
    <>
      <SetPageTitle
        title={PAGE.MASTER_DATA.EMPLOYEE.LANDING}
        action={ACTION.LANDING}
        alsoDocument
      />
      <div className="flex justify-between items-center">
        <div className="font-semibold text-xl">Daftar Pegawai</div>
        <Form {...form}>
          <form onSubmit={() => {}}>
            <div className="flex gap-3">
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
      <div className="container py-10">
        <DataTable columns={columns} data={data} onRowClick={handleRowClick} />
      </div>
    </>
  );
}

export default EmployeePage;
