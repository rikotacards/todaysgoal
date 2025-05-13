import {
    useMutation,
    useQueryClient,
    type UseMutationResult,
  } from "@tanstack/react-query";
  import supabase from "../../utils/supabase";
  import { useSnackbar } from "notistack";
import type { IGoal } from "../../types";
  
  type NewActiveEntry = {
    description: string;
    user_id: string;
    is_backlog?: boolean;
  };
  

  
  const insertGoal = async (
    goal: NewActiveEntry
  ): Promise<IGoal[]> => {
    const { data, error } = await supabase
      .from("goals")
      .insert({
        user_id: goal.user_id,
        description: goal.description,
        is_done: false,
        is_backlog: goal.is_backlog
      })
      .select();
  
    if (error) throw error;
    return data || [];
  };
  
  export const useAddGoal = (): UseMutationResult<
    IGoal[], // returned data
    Error, // error type
    NewActiveEntry // argument to mutate()
  > => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    return useMutation<IGoal[], Error, NewActiveEntry>({
      mutationFn: insertGoal, // ✅ CORRECT way to provide the function
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["goals"] });
        queryClient.refetchQueries({ queryKey: ["goals"] });
  
        enqueueSnackbar('Goal added!', { variant: "success" });
      },
    });
  };
  