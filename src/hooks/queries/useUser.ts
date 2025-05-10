// useEntries.ts
import { useQuery } from "@tanstack/react-query";

import supabase from "../../utils/supabase";
import type { IAddedGoal } from "../../types";


export interface FetchEntriesFilters {
  user_id?: string| null;

}
const fetchGoals = async (user_id: string): Promise<IAddedGoal[]> => {
  const q = supabase
    .from("users")
    .select("*")
    .eq('user_id', user_id)
 
  // if(!args?.userId){
  //   return []
  // }
  const { data, error } = await q;
  if (error) throw error;
  return data || [];
};

export const useUsers = (userId: string) => {

  return useQuery<IAddedGoal[], Error>({
    queryKey: ["users"],
    queryFn:  () => fetchGoals(userId),
    // enabled: !!data
  });
};
