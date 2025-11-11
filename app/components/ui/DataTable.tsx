"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DataNotFound from "../feedback/data-not-found";
import { Pagination } from "./Pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  onRowClick?: (row: TData) => void;
  rowClassName?: string;
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  isLoading,
  onRowClick,
  rowClassName,
}: DataTableProps<TData, TValue>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-none">
      <Table className="">
        <TableHeader className="bg-[#F5F8FF] border-none">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className="border-none hover:bg-[#F5F8FF]"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.original.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => onRowClick?.(row.original)}
                className={rowClassName}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={`${row.original.id}-${cell.column.id}`}
                    className="font-medium tracking-wider cursor-pointer"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <DataNotFound />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <div className="flex items-center justify-start space-x-2 py-4 bg-[#F5F8FF] border-none">
        <div className="flex items-center space-x-2">
          <ChevronLeft />
          <p>Previous</p>
        </div>
        <div className="flex items-center space-x-2">
          <p>Next</p>
          <ChevronRight />
        </div>
        <div className="flex items-center space-x-2 border-l-2 border-l-gray-200 pl-2">
          <p>Page {table.getState().pagination.pageIndex + 1}</p>
          <p>of {table.getState().pagination.pageSize}</p>
        </div>
      </div> */}
      <div className="flex items-center justify-start bg-[#F5F8FF] border-none">
        <Pagination
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getState().pagination.pageSize}
          onPageChange={(page) => table.getState().pagination.pageIndex + 1}
        />
      </div>
    </div>
  );
}
