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
    .eq("user_id", username)
    .maybeSingle<UsernameRow>();

  if (error) throw error;
  return data;
};

export const useCheckUserHasUername = () => {
  const queryClient = useQueryClient();

  const checkUsername = async (username: string) => {
    return await queryClient.fetchQuery({
      queryKey: ["usernames", username],
      queryFn: () => fetchUsername(username),
    });
  };

  return { checkUsername };
};
