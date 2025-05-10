import {
    useMutation,
    useQueryClient,
    type UseMutationResult,
  } from "@tanstack/react-query";
  import supabase from "../../utils/supabase";
  import { useSnackbar } from "notistack";
  
  type ActiveEntry = {
    id: number;
  };
  
  const stopActiveEntry = async (entry: ActiveEntry): Promise<void> => {
    const { error } = await supabase.from("goals").delete().eq("id", entry.id);
    if (error) {
      throw error;
    }
  };
  
  export const useDeleteGoal = (): UseMutationResult<
    void, // returned data
    Error, // error type
    ActiveEntry // argument to mutate()
  > => {
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
  
    return useMutation<void, Error, ActiveEntry>({
      mutationFn: stopActiveEntry, // ✅ CORRECT way to provide the function
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["goals"] });
        
      },
      onError: (e) => {
  
        enqueueSnackbar("Failed " + e.message, { variant: "error" });
      },
    });
  };
  