import {
    useMutation,
    useQueryClient,
    type UseMutationResult,
  } from "@tanstack/react-query";
  import supabase from "../../utils/supabase";
import type { IGoal } from "../../types";
  
  type NewActiveEntry = {
    user_id: string;
    username: string;
  };
  

  
  const insertGoal = async (
    goal: NewActiveEntry
  ): Promise<IGoal[]> => {
    const { data, error } = await supabase
      .from("usernames")
      .insert({
        user_id: goal.user_id,
        username: goal.username,
      })
      .select();
  
    if (error) throw error;
    return data || [];
  };
  
  export const useAddUsername = (): UseMutationResult<
    IGoal[], // returned data
    Error, // error type
    NewActiveEntry // argument to mutate()
  > => {
    const queryClient = useQueryClient();
    return useMutation<IGoal[], Error, NewActiveEntry>({
      
      mutationFn: insertGoal, // ✅ CORRECT way to provide the function
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["usernames"] });
        queryClient.refetchQueries({ queryKey: ["usernames"] });
  
      },
    });
  };
  