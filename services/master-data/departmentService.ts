import { Department } from "@/types/department";
import { supabaseBrowser } from "@/utils/supabase/client";

export async function fetchAllDepartments() {
  const { data, error, count } = await supabaseBrowser
    .from("departments")
    .select("*", { count: "exact" })
    .order("department_name")
    .range(0, 10);
  if (error) throw error;
  return {
    data,
    total: count || 0,
  };
}

export async function createDepartment({
  department_name,
}: Omit<Department, "id">) {
  const { data, error } = await supabaseBrowser
    .from("departments")
    .insert({ department_name })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function editDepartment({ id, department_name }: Department) {
  const { data, error } = await supabaseBrowser
    .from("departments")
    .update({ department_name })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function deleteDepartment(id: string) {
  const { data, error } = await supabaseBrowser
    .from("departments")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return data;
}

export async function getById(id: string) {
  const { data, error } = await supabaseBrowser
    .from("departments")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}
