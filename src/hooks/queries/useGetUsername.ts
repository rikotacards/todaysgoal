// useEntries.ts
import { useQuery } from "@tanstack/react-query";

import supabase from "../../utils/supabase";


export interface FetchEntriesFilters {
  user_id?: string| null;

}
interface Row {
  user_id: string;
  username: string
}
const fetchGoals = async (user_id:string): Promise<Row> => {
  const q = supabase
    .from("usernames")
    .select("*")
    .eq('user_id', user_id)
    .maybeSingle()
 
  // if(!args?.userId){
  //   return []
  // }
  const { data, error } = await q;
  if (error) throw error;
  return data 
};

export const useGetUserName = (user_id:string) => {

  return useQuery<Row, Error>({
    queryKey: ["usernames"],
    queryFn:  () => fetchGoals(user_id),
    // enabled: !!data
  });
};
