"use client";

import React, { useEffect } from "react";
import { SetPageTitle } from "../../../components/set-page-title";
import { ACTION, PAGE } from "@/constant/app";
import { columns } from "./data/columns";
import { DataTable } from "@/app/components/ui/DataTable";
import { useShiftStore } from "@/stores/master-data/shiftStore";

function ShiftPage() {
  const { shifts: data, loading, fetchAll } = useShiftStore();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <>
      <SetPageTitle
        title={PAGE.MASTER_DATA.SHIFT.LANDING}
        action={ACTION.LANDING}
        alsoDocument
      />
      <div className="font-semibold text-xl">Daftar Shift</div>
      <div className="container py-10">
        <DataTable columns={columns} data={data} isLoading={loading} />
      </div>
    </>
  );
}

export default ShiftPage;
