"use client";

import { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Edit2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Absence } from "@/app/(app)/absence/input-absence/data/columns";

interface AbsenceInputTableProps {
  data: Absence[];
  selectedIds?: Set<string>;
  onEdit?: (id: string, key: keyof Absence, value: string) => void;
  onCheckboxChange?: (id: string) => void;
  onSelectAll?: (checked: boolean) => void;
  onSearchChange?: (term: string) => void;
  onDepartmentChange?: (dept: string) => void;
  onRemove?: (id: string) => void;
  searchTerm?: string;
  selectedDepartment?: string;
  showCheckbox?: boolean;
  showEditAction?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  onRowEdit?: (id: string | number) => void;
}

const JAM_PULANG_OPTIONS = Array.from({ length: 24 }, (_, i) => ({
  label: `${String(i).padStart(2, "0")}:00`,
  value: `${String(i).padStart(2, "0")}:00`,
}));

export function AbsenceInputTable({
  data,
  selectedIds = new Set(),
  onEdit,
  onCheckboxChange,
  onSelectAll,
  onSearchChange,
  onDepartmentChange,
  // onRemove,
  searchTerm = "",
  selectedDepartment = "all",
  showCheckbox = true,
  showEditAction = false,
  showSearch = true,
  showFilter = true,
  onRowEdit,
}: AbsenceInputTableProps) {
  const inputRefs = useRef<{ [key: string]: HTMLInputElement }>({});

  const departments = Array.from(new Set(data.map((item) => item.department)));

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.employee_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.includes(searchTerm);
    const matchesDepartment =
      selectedDepartment === "all" || item.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const allFiltered = filteredData.every((item) => selectedIds.has(item.id));
  const isIndeterminate =
    filteredData.some((item) => selectedIds.has(item.id)) && !allFiltered;

  // Sync ref values with data updates
  useEffect(() => {
    data.forEach((item) => {
      const overtimeRef = inputRefs.current[`overtime-${item.id}`];
      const notesRef = inputRefs.current[`notes-${item.id}`];

      if (overtimeRef && document.activeElement !== overtimeRef) {
        overtimeRef.value = item.total_overtime;
      }
      if (notesRef && document.activeElement !== notesRef) {
        notesRef.value = item.notes;
      }
    });
  }, [data]);

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      {(showSearch || showFilter) && (
        <div className="flex gap-3 mb-6">
          {showSearch && (
            <form
              className="relative flex-1 max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="search"
                placeholder="Cari pegawai..."
                value={searchTerm}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-3 pr-10"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-0 h-9 w-9 p-0"
              >
                <Search className="h-3.5 w-3.5" color="white" />
              </Button>
            </form>
          )}

          {/* Department Filter */}
          {showFilter && (
            <Select
              value={selectedDepartment}
              onValueChange={(val) => onDepartmentChange?.(val)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter bagian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Bagian</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      {/* Shadcn Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader className="bg-[#F5F8FF]">
            <TableRow className="border-none hover:bg-[#F5F8FF]">
              {showCheckbox && (
                <TableHead className="w-10">
                  <input
                    type="checkbox"
                    checked={allFiltered && filteredData.length > 0}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => onSelectAll?.(e.target.checked)}
                    className="rounded border-gray-300 cursor-pointer"
                  />
                </TableHead>
              )}
              <TableHead>Tanggal</TableHead>
              <TableHead>Nama Pegawai</TableHead>
              <TableHead>Bagian</TableHead>
              <TableHead>Jam Pulang</TableHead>
              <TableHead>Total Lembur</TableHead>
              <TableHead>Catatan</TableHead>
              {showEditAction && <TableHead>Aksi</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => {
                const isSelected = selectedIds.has(row.id);
                return (
                  <TableRow key={row.id}>
                    {showCheckbox && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onCheckboxChange?.(row.id)}
                          className="rounded border-gray-300 cursor-pointer"
                        />
                      </TableCell>
                    )}
                    <TableCell className="text-sm">{row.date}</TableCell>
                    <TableCell className="text-sm">
                      {row.employee_name}
                    </TableCell>
                    <TableCell className="text-sm">{row.department}</TableCell>
                    <TableCell>
                      {isSelected ? (
                        <Select
                          value={row.clock_out_time}
                          onValueChange={(val) =>
                            onEdit?.(row.id, "clock_out_time", val)
                          }
                        >
                          <SelectTrigger className="w-full h-9">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {JAM_PULANG_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="text-sm">
                          {row.clock_out_time || "-"}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {isSelected ? (
                        <input
                          ref={(el) => {
                            if (el)
                              inputRefs.current[`overtime-${row.id}`] = el;
                          }}
                          type="text"
                          defaultValue={row.total_overtime}
                          onChange={(e) =>
                            onEdit?.(row.id, "total_overtime", e.target.value)
                          }
                          placeholder="Isi data"
                          className="h-9 w-full px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 inset-shadow-sm"
                        />
                      ) : (
                        <div className="text-sm">
                          {row.total_overtime || "-"}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {isSelected ? (
                        <input
                          ref={(el) => {
                            if (el) inputRefs.current[`notes-${row.id}`] = el;
                          }}
                          type="text"
                          defaultValue={row.notes}
                          onChange={(e) =>
                            onEdit?.(row.id, "notes", e.target.value)
                          }
                          placeholder="Isi data"
                          className="h-9 w-full px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 inset-shadow-sm"
                        />
                      ) : (
                        <div className="text-sm">{row.notes || "-"}</div>
                      )}
                    </TableCell>
                    {showEditAction && (
                      <TableCell>
                        {isSelected ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => onRowEdit?.("save")}
                              className="text-green-500 hover:text-green-700 text-sm font-medium"
                            >
                              Simpan
                            </button>
                            <button
                              onClick={() => onRowEdit?.("cancel")}
                              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                            >
                              Batal
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onRowEdit?.(row.id)}
                            className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    showCheckbox
                      ? showEditAction
                        ? 8
                        : 7
                      : showEditAction
                      ? 7
                      : 6
                  }
                  className="h-24 text-center text-gray-500"
                >
                  Data tidak ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
