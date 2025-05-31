// useEntries.ts
import { useQuery } from "@tanstack/react-query";

import supabase from "../../utils/supabase";

export interface FetchEntriesFilters {
  user_id?: string | null;
}

interface IFollower {
    following_id: string;
}

const fetchGoals = async (user_id: string): Promise<IFollower[]> => {
  const q = supabase
    .from("followers")
    .select("following_id, usernames:following_id(username)")
    .eq("follower_id", user_id);

  const { data, error } = await q;
  if (error) throw error;
  return data || [];
};

export const useFollowings = (user_id: string) => {
  return useQuery<IFollower[], Error>({
    queryKey: ["followings", user_id],
    queryFn: () => fetchGoals(user_id),
  });
};
