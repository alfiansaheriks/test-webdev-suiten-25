"use client";

import { Department } from "@/types/department";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Department>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => <div className="">{row.index + 1}</div>,
  },
  {
    accessorKey: "department_name",
    header: "Nama Bagian",
  },
  {
    accessorKey: "total_employee",
    header: "Jumlah Pegawai",
  },
];
