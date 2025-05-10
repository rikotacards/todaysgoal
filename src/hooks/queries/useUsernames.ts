import { useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

interface UsernameRow {
  username: string;
  user_id: string;
}

const fetchUsername = async (username: string): Promise<UsernameRow | null> => {
  const { data, error } = await supabase
    .from("usernames")
    .select("username, user_id")
    .eq("username", username)
    .maybeSingle<UsernameRow>();

  if (error) throw error;
  return data;
};

export const useUsernames = () => {
  const queryClient = useQueryClient();

  const getUsername = async (username: string) => {
    return await queryClient.fetchQuery({
      queryKey: ["usernames"],
      queryFn: () => fetchUsername(username),
    });
  };

  return { getUsername };
};
