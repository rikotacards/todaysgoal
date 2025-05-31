import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import supabase from "../../utils/supabase";
import { useSnackbar } from "notistack";

interface IInsertFollow {
  follower_id: string;
  following_id: string;
}
const insertFollow = async (args: IInsertFollow): Promise<void> => {
  const { error } = await supabase
    .from("followers")
    .delete()
    .eq("following_id", args.following_id)
    .eq("follower_id", args.follower_id);

  if (error) throw error;
};

export const useUnFollow = (): UseMutationResult<
  void, // returned data
  Error, // error type
  IInsertFollow // argument to mutate()
> => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<void, Error, IInsertFollow>({
    mutationFn: insertFollow, // ✅ CORRECT way to provide the function
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.refetchQueries({ queryKey: ["followers"] });

      enqueueSnackbar("Goal added!", { variant: "success" });
    },
  });
};
