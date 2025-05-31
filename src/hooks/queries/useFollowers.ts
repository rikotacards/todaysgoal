// useEntries.ts
import { useQuery } from "@tanstack/react-query";

import supabase from "../../utils/supabase";

export interface FetchEntriesFilters {
  user_id?: string | null;
}

interface IFollower {
    follower_id: string;
    following_id: string;
}

const fetchGoals = async (user_id: string): Promise<IFollower[]> => {
  const q = supabase
    .from("followers")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("follower_id", user_id);

  const { data, error } = await q;
  if (error) throw error;
  return data || [];
};

export const useFollowers = (user_id: string) => {
  return useQuery<IFollower[], Error>({
    queryKey: ["goals", user_id],
    queryFn: () => fetchGoals(user_id),
  });
};
