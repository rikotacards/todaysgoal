// useEntries.ts
import { useQuery } from "@tanstack/react-query";

import supabase from "../../utils/supabase";
import type { IFollowers } from "../../types";

export interface FetchEntriesFilters {
  user_id?: string | null;
}
interface Arg {
  following_id: string;
  follower_id: string;
}
const isFollowing = async (arg: Arg): Promise<IFollowers> => {
  let q = supabase
    .from("followers")
    .select("*")
    .order("created_at", { ascending: false }); // optional ordering
  if (arg.follower_id) {
    q = q.eq("follower_id", arg.follower_id);
  }
  if (arg.follower_id) {
    q = q.eq("following_id", arg.following_id);
  }

  const { data, error } = await q.maybeSingle();
  if (error) throw error;
  return data;
};

export const useIsFollowing = (arg: Arg) => {
  return useQuery<IFollowers, Error>({
    queryKey: ["isFollowing", arg],
    queryFn: () => isFollowing(arg),
    // enabled: !!data
  });
};
