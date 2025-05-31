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
  const { error } = await supabase.from("followers").insert({
    follower_id: args.follower_id, // person
    following_id: args.following_id,
  });

  if (error) throw error;
};
interface UseFollowArgs {
  follower_id: string;
  following_id: string;
}
export const useFollow = (
  args: UseFollowArgs
): UseMutationResult<
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
      queryClient.invalidateQueries({
        queryKey: ["followings", args.following_id],
      });

      queryClient.invalidateQueries({ queryKey: ["isFollowing"] });
      queryClient.refetchQueries({ queryKey: ["isFollowing"] });
      queryClient.refetchQueries({ queryKey: ["followers", args.follower_id] });
      queryClient.refetchQueries({
        queryKey: ["followings", args.following_id],
      });

      enqueueSnackbar("Followed!", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Failed to follow", { variant: "default" });
    },
  });
};
