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
  const { error } = await supabase.from("likes").insert({
    like_sender_id: args.like_sender_id, // person
    like_receiver_id: args.like_receiver_id,
    like_content_id: args.liked_content_id
  });

  if (error) throw error;
};
interface UseFollowArgs {
  like_sender_id: string;
  like_receiver_id: string;
  liked_content_id: string;
}
export const useLike = (
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
      queryClient.invalidateQueries({ queryKey: ["goals", args.like_receiver_id] });

      enqueueSnackbar("Liked!", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Failed to follow", { variant: "default" });
    },
  });
};
