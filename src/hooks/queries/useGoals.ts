// useEntries.ts
import { useQuery } from "@tanstack/react-query";

import supabase from "../../utils/supabase";
import type { IAddedGoal } from "../../types";

export interface FetchEntriesFilters {
  user_id?: string | null;
}

const fetchGoals = async (user_id: string, is_backlog?: boolean): Promise<IAddedGoal[]> => {
  let q = supabase
    .from("goals")
    .select("*")
    .order("created_at", { ascending: false }); // optional ordering
  if (user_id) {
    q = q.eq("user_id", user_id);
  }
  if(is_backlog !== undefined){
    q = q.eq('is_backlog', is_backlog)
  }
  // if(!args?.userId){
  //   return []
  // }
  const { data, error } = await q;
  if (error) throw error;
  return data || [];
};

export const useGoals = (user_id: string, is_backlog?: boolean) => {
  return useQuery<IAddedGoal[], Error>({
    queryKey: ["goals", user_id, is_backlog],
    queryFn: () => fetchGoals(user_id, is_backlog),
    // enabled: !!data
  });
};
