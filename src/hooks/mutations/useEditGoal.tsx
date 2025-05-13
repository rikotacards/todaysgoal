// useUpdateActiveEntry.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

type UpdatePayload = {
  id: number;
  description?: string;
  is_done?: boolean;
  is_backlog?: boolean;
  created_at?: string;
};

const updateGoal = async ({
  id,
  description,
  is_done,
  is_backlog,
  created_at,

}: UpdatePayload) => {
  const { data, error } = await supabase
    .from("goals")
    .update({
      description,
      is_done,
      is_backlog,
      created_at
    })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const useEditGoal = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: updateGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      enqueueSnackbar('Goal updated', {
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
