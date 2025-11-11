"use client";

import { Absence } from "@/types/absence";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Absence>[] = [
  {
    accessorKey: "date",
    header: "Tanggal",
  },
  {
    accessorKey: "employee_name",
    header: "Nama Pegawai",
  },
  {
    accessorKey: "department_id",
    header: "Bagian",
  },
  {
    accessorKey: "clock_out_time",
    header: "Jam Pulang",
  },
  {
    accessorKey: "total_overtime",
    header: "Total Lembur",
  },
  {
    accessorKey: "notes",
    header: "Catatan",
  },
];
