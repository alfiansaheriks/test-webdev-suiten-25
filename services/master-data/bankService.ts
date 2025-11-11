import { Bank } from "@/types/bank";
import { supabaseBrowser } from "@/utils/supabase/client";

export async function fetchBanks() {
  const { data, error } = await supabaseBrowser
    .from("banks")
    .select("*")
    .order("bank_name");
  if (error) throw error;
  return data;
}

export async function addBank({
  bank_name,
  bank_short_name,
}: Omit<Bank, "id">) {
  const { data, error } = await supabaseBrowser
    .from("banks")
    .insert({ bank_name, bank_short_name })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function deleteBank(id: string) {
  const { data, error } = await supabaseBrowser
    .from("banks")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return data;
}
