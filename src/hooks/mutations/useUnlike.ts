import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import supabase from "../../utils/supabase";
import { useSnackbar } from "notistack";

interface IInsertFollow {
  like_sender_id: string;
  like_receiver_id: string;
  liked_content_id: string;
}
const insertFollow = async (args: IInsertFollow): Promise<void> => {
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("like_sender_id", args.like_sender_id)
    .eq("liked_content_id", args.liked_content_id)
    .eq("like_receiver_id", args.like_receiver_id);

  if (error) throw error;
};
interface UseFollowArgs {
  like_sender_id: string;
  like_receiver_id: string;
  liked_content_id: string;
}
export const useUnlike = (
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
      queryClient.invalidateQueries({
        queryKey: ["likeSummary", args.like_receiver_id],
      });
      queryClient.refetchQueries({
        queryKey: ["likeSummary", args.like_receiver_id],
      });
    },
    onError: () => {
      enqueueSnackbar("Failed to unlike", { variant: "default" });
    },
  });
};
