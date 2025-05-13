// useEntries.ts
import { useQuery } from "@tanstack/react-query";

import supabase from "../../utils/supabase";
import type { IAddedGoal } from "../../types";

export interface FetchEntriesFilters {
  user_id?: string | null;
}

const fetchBacklog = async (user_id: string): Promise<IAddedGoal[]> => {
  let q = supabase
    .from("backlog")
    .select("*")
    .order("created_at", { ascending: false }); // optional ordering
  if (user_id) {
    q = q.eq("user_id", user_id);
  }
  // if(!args?.userId){
  //   return []
  // }
  const { data, error } = await q;
  if (error) throw error;
  return data || [];
};

export const useBacklog = (user_id: string) => {
  return useQuery<IAddedGoal[], Error>({
    queryKey: ["backlog", user_id],
    queryFn: () => fetchBacklog(user_id),
    // enabled: !!data
  });
};
