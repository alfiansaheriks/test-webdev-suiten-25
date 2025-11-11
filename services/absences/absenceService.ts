import { Absence } from "@/types/absence";
import { supabaseBrowser } from "@/utils/supabase/client";

export const getAbsences = async (department_id: string, date?: string) => {
  const employeeData = await supabaseBrowser
    .from("employees")
    .select("*")
    .overlaps("department_id", [department_id]);

  if (employeeData.error) {
    throw employeeData.error;
  }

  const employeeIds = employeeData.data.map((employee) => employee.id);

  const absenceData = await supabaseBrowser
    .from("absences")
    .select("*")
    .in("employee_id", employeeIds)
    .eq("date", date || new Date().toISOString().split("T")[0]);

  if (absenceData.error) {
    throw absenceData.error;
  }

  const transformedAbsences = (absenceData.data || []).map((absence: any) => ({
    ...absence,
  }));
  return {
    employees: employeeData.data,
    absences: transformedAbsences,
  };
};

export const createAbsences = async (data: Omit<Absence, "id">) => {
  const { data: insertedData, error } = await supabaseBrowser
    .from("absences")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return insertedData;
};

export const updateAbsences = async (absence: Absence) => {
  const { data: updatedData, error } = await supabaseBrowser
    .from("absences")
    .update(absence)
    .eq("id", absence.id)
    .select()
    .single();

  if (error) throw error;
  return updatedData;
};
