"use client";
import { useEffect, useMemo, useState } from "react";
import { useDepartmentStore } from "@/stores/master-data/departmentStore";
import { useShiftStore } from "@/stores/master-data/shiftStore";
import { useBankStore } from "@/stores/master-data/bankStore";

/**
 * useMasterData
 * Hook untuk fetch semua master data + generate dropdown options
 */
export function useMasterData() {
  const { departments, fetchAll: fetchDepartments } = useDepartmentStore();
  const { shifts, fetchAll: fetchShifts } = useShiftStore();
  const { banks, fetchAll: fetchBanks } = useBankStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchDepartments(), fetchShifts(), fetchBanks()]);
      } catch (error) {
        console.error("Error loading master data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fetchDepartments, fetchShifts, fetchBanks]);

  const salaryPeriodOptions = useMemo(
    () => [
      { label: "2 Minggu", value: "Weekly" },
      { label: "Bulanan", value: "Monthly" },
    ],
    []
  );

  const departmentOptions = useMemo(
    () =>
      (departments || []).map((d) => ({
        label: d.department_name,
        value: d.id,
      })),
    [departments]
  );

  const shiftOptions = useMemo(
    () =>
      (shifts || []).map((s) => ({
        label: s.shift_name,
        value: s.id,
      })),
    [shifts]
  );

  const bankOptions = useMemo(
    () =>
      (banks || []).map((b) => ({
        label: b.bank_name,
        value: b.id,
      })),
    [banks]
  );

  return {
    departments,
    shifts,
    banks,
    departmentOptions,
    shiftOptions,
    bankOptions,
    salaryPeriodOptions,
    isLoading,
  };
}
