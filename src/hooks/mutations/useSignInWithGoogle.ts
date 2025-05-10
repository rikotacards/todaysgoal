import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; // if you're using react-router
import supabase from "../../utils/supabase";

export function useSignInWithGoogle() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const q = useMutation({
    mutationFn: async () => {
      await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
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
