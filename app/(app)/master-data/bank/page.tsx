"use client";

import { useEffect } from "react";
import { SetPageTitle } from "../../../components/set-page-title";
import { ACTION, PAGE } from "@/constant/app";
import { columns } from "./data/columns";
import { DataTable } from "@/app/components/ui/DataTable";
import { useBankStore } from "@/stores/master-data/bankStore";

function BankPage() {
  const { banks, fetchAll, loading } = useBankStore();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <>
      <SetPageTitle
        title={PAGE.MASTER_DATA.BANK.LANDING}
        action={ACTION.LANDING}
        alsoDocument
      />
      <div className="font-semibold text-xl">Daftar Bank</div>
      <div className="container py-10">
        <DataTable columns={columns} data={banks} isLoading={loading} />
      </div>
    </>
  );
}

export default BankPage;
