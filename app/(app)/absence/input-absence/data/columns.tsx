"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Absence = {
  id: string;
  date: string;
  employee_name: string;
  department: string;
  clock_out_time: string;
  total_overtime: string;
  notes: string;
};

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
    accessorKey: "department",
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
