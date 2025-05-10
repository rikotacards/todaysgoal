import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; // if you're using react-router
import supabase from "../../utils/supabase";

export function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const q = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["authUser"] });

      navigate("/"); // or navigate('/') if you want home page
    },
    onError: (error) => {
      console.error("Failed to sign out:", error);
    },
  });

  return q;
}
