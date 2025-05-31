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
const removeFollow = async (args: IInsertFollow): Promise<void> => {
  const { error } = await supabase
    .from("followers")
    .delete()
    .eq("following_id", args.following_id)
    .eq("follower_id", args.follower_id);

  if (error) throw error;
};
interface UseUnfollowProps {
  user_id: string;
  following_id: string;
}
export const useUnFollow = (
  args: UseUnfollowProps
): UseMutationResult<
  void, // returned data
  Error, // error type
  IInsertFollow // argument to mutate()
> => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation<void, Error, IInsertFollow>({
    mutationFn: removeFollow, // ✅ CORRECT way to provide the function
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["isFollowing", args.user_id, args.following_id],
      });
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["isFollowing"] });

      queryClient.refetchQueries({
        queryKey: ["isFollowing"],
      });
      queryClient.refetchQueries({
        queryKey: ["followings", args.user_id, args.following_id],
      });
      queryClient.refetchQueries({
        queryKey: ["followers", args.user_id, args.following_id],
      });
      queryClient.refetchQueries({
        queryKey: ["followings", args.following_id],
      });
      enqueueSnackbar("Unfollowed", { variant: "default" });
    },
  });
};
