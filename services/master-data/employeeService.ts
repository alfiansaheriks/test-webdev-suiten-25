import { supabaseBrowser } from "@/utils/supabase/client";
import { Employee } from "@/types/employee";

export async function getAll() {
  const { data, error, count } = await supabaseBrowser
    .from("employees")
    .select("*", { count: "exact" })
    .range(0, 9);
  if (error) throw error;
  return {
    data,
    total: count || 0,
  };
}

export async function getById(id: string) {
  const { data, error } = await supabaseBrowser
    .from("employees")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createEmployee(data: Omit<Employee, "id">) {
  const { data: response, error } = await supabaseBrowser
    .from("employees")
    .insert(data)
    .select("*")
    .single();
  if (error) throw error;
  return response;
}

export async function update({ id, ...data }: Employee) {
  const { data: response, error } = await supabaseBrowser
    .from("employees")
    .update(data)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return response;
}

export async function remove(id: string) {
  const { data: response, error } = await supabaseBrowser
    .from("employees")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return response;
}

export async function getEmployeeByDepartmentId(departmentIds: string[]) {
  const { data, error } = await supabaseBrowser
    .from("employees")
    .select("*")
    .contains("department_id", departmentIds);
  if (error) throw error;
  return data;
}
