"use client";

import { useEffect, useState } from "react";
import { useEmployeeStore } from "@/stores/master-data/employeeStore";
import { Employee } from "@/types/employee";

export function useEmployees(departmentIds: string | string[]) {
  const deptArray = Array.isArray(departmentIds)
    ? departmentIds
    : [departmentIds];
  const { getByDepartmentId, loading } = useEmployeeStore();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getByDepartmentId(deptArray);
        setEmployees(data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Gagal memuat data karyawan");
      }
    };

    if (departmentIds && departmentIds.length > 0) fetchEmployees();
  }, [departmentIds, getByDepartmentId]);

  return { employees, loading, error };
}
