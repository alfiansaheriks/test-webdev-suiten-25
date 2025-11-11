import { Shift } from "@/types/shift";
import { supabaseBrowser } from "@/utils/supabase/client";

export async function fetchShifts() {
  const { data, error, count } = await supabaseBrowser
    .from("shifts")
    .select("*", { count: "exact" })
    .order("shift_name")
    .range(0, 10);
  if (error) throw error;
  return {
    data,
    total: count || 0,
  };
}

export async function addShift({
  shift_name,
  start_time,
  end_time,
}: Omit<Shift, "id">) {
  const { data, error } = await supabaseBrowser
    .from("shifts")
    .insert({ shift_name, start_time, end_time })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function removeShift(id: string) {
  const { error } = await supabaseBrowser.from("shifts").delete().eq("id", id);
  if (error) throw error;
}
