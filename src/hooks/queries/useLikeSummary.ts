// useEntries.ts
import { useQuery } from "@tanstack/react-query";

import supabase from "../../utils/supabase";

export interface FetchEntriesFilters {
  user_id?: string | null;
}
interface Res {
  liked_content_id: string;
  like_sender_id: string;
  sender_ids: string[];
  total_likes: number;
}

const fetchGoals = async (user_id: string): Promise<Res[]> => {
  const q = supabase
    .from("content_like_summary")
    .select("*")
    .eq("like_receiver_id", user_id);

  const { data, error } = await q;
  if (error) throw error;
  return data || [];
};

type QReturn = Map<string, Res>;

export const useLikeSummary = (user_id: string) => {
  return useQuery<Res[], Error, QReturn>({
    queryKey: ["likeSummary", user_id],
    queryFn: () => fetchGoals(user_id),
    select: (data) => {
      const res = new Map<string, Res>();
      data.forEach((d) => {
        res.set(d.liked_content_id, d);
      });

      return res;
    },
    // enabled: !!data
  });
};
