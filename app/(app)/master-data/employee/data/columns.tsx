"use client";

import { Employee } from "@/types/employee";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => <div className="">{row.index + 1}</div>,
  },
  {
    accessorKey: "employee_name",
    header: "Nama",
  },
  {
    accessorKey: "department",
    header: "Departemen",
  },
  {
    accessorKey: "phone_number",
    header: "No. Telp",
  },
  {
    accessorKey: "bank_number",
    header: "No. Rekening",
  },
  {
    accessorKey: "bank_name",
    header: "Nama Rekening",
  },
  // {
  //   accessorKey: "bank_id",
  //   header: "Bank",
  // },
];
