"use client";

import { Bank } from "@/types/bank";
import { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "../components/ActionCells";

export const columns: ColumnDef<Bank>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "bank_name",
    header: "Nama Bank",
  },
  {
    accessorKey: "bank_short_name",
    header: "Nama Bank (Singkatan)",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => <ActionCell id={row.original.id} />,
  },
];
