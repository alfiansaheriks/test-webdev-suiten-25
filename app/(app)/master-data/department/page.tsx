"use client";

import React, { useEffect } from "react";
import { SetPageTitle } from "../../../components/set-page-title";
import { ACTION, PAGE } from "@/constant/app";
import { columns } from "./data/columns";
import { DataTable } from "@/app/components/ui/DataTable";
import { useDepartmentStore } from "@/stores/master-data/departmentStore";
import { useRouter } from "next/navigation";
import { DEPARTMENT_DETAIL_RELATIVE_PARAMS } from "@/constant/params";

function DepartmentPage() {
  const { departments: data, loading, fetchAll } = useDepartmentStore();
  const router = useRouter();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRowClick = (department: any) => {
    router.push(`${DEPARTMENT_DETAIL_RELATIVE_PARAMS}/${department.id}`);
  };

  return (
    <>
      <SetPageTitle
        title={PAGE.MASTER_DATA.DEPARTMENT.LANDING}
        action={ACTION.LANDING}
        alsoDocument
      />
      <div className="font-semibold text-xl">Daftar Bagian</div>
      <div className="container py-10">
        <DataTable
          columns={columns}
          data={data}
          isLoading={loading}
          onRowClick={handleRowClick}
          rowClassName="cursor-pointer"
        />
      </div>
    </>
  );
}

export default DepartmentPage;
