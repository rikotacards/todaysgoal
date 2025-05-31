// useEntries.ts
import { useQuery } from "@tanstack/react-query";

import supabase from "../../utils/supabase";

export interface FetchEntriesFilters {
  user_id?: string | null;
}

interface IFollower {
    usernames: any;
    follower_id: string;
}

const fetchGoals = async (user_id: string): Promise<IFollower[]> => {
  const q = supabase
    .from("followers")
    .select("follower_id, username:follower_id(username)")
    .eq("following_id", user_id);

  const { data, error } = await q;
  if (error) throw error;
  return data || [];
};

export const useFollowers = (user_id: string) => {
  return useQuery<IFollower[], Error>({
    queryKey: ["followers", user_id],
    queryFn: () => fetchGoals(user_id),
  });
};
