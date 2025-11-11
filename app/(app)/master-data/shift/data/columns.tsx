"use client";

import { Shift } from "@/types/shift";
import { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "../components/ActionCells";

export const columns: ColumnDef<Shift>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "shift_name",
    header: "Nama Shift",
  },
  {
    accessorKey: "start_time",
    header: "Waktu Mulai",
  },
  {
    accessorKey: "end_time",
    header: "Waktu Selesai",
  },
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => <ActionCell id={row.original.id} />,
  },
];
