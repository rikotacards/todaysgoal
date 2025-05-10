import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import supabase from "../../utils/supabase";

export function useAuth() {
  const queryClient = useQueryClient();

  const q = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }
      return data.session
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      // When login/logout happens, invalidate the query to refetch
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      queryClient.refetchQueries({ queryKey: ["authUser"] });
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [queryClient]);

  return q;
}
