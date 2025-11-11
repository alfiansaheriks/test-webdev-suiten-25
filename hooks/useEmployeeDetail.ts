"use client";

import { useEffect, useState } from "react";
import { useEmployeeStore } from "@/stores/master-data/employeeStore";
import { Employee } from "@/types/employee";

export function useEmployeeDetail(id?: string) {
  const { getById, loading } = useEmployeeStore();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEmployee = async () => {
      try {
        const data = await getById(id);
        setEmployee(data);
      } catch (err) {
        console.error("Failed to fetch employee:", err);
        setError("Gagal memuat data karyawan");
      }
    };

    fetchEmployee();
  }, [id, getById]);

  return { employee, loading, error };
}
