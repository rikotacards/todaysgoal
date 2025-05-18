// useUpdateActiveEntry.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

type UpdatePayload = {
  user_id: string;
  username?: string;
};

const updateGoal = async ({
  user_id,
  username,

}: UpdatePayload) => {
  const { data, error } = await supabase
    .from("usernames")
    .update({
      user_id,
      username
    })
    .eq("user_id", user_id)
    .select();

  if (error) throw error;
  return data;
};

export const useEditUsername = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: updateGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usernames"] });
      enqueueSnackbar('Username updated.', {
        variant: "success",
        action: (snackbarId) => (
          <IconButton
            onClick={() => closeSnackbar(snackbarId)}
            sx={{ color: "white" }} // make sure it's visible
          >
            <Close />
          </IconButton>
        ),
      });
    },
  });
};
