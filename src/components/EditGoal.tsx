import React from "react";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEditGoal } from "../hooks/mutations/useEditGoal";
import {

  Close,
} from "@mui/icons-material";
import { useDeleteGoal } from "../hooks/mutations/useDeleteGoal";
interface EditGoalProps {
  open: boolean;
  onClose: () => void;
  id: number;
  description: string;
  isDone: boolean;
}
export const EditGoal: React.FC<EditGoalProps> = ({
  id,
  description,
  open,
  onClose,
}) => {
  const update = useEditGoal();
  const d = useDeleteGoal();
  const [desc, setDesc] = React.useState(description);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const onDelete = () => {
    d.mutateAsync({ id }).then(() => onClose());
  };
  const onUpdate = () => {
    update
      .mutateAsync({
        id,
        description: desc,
      })
      .then(() => {
        onClose();
      });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Toolbar >
          <Typography fontWeight={'bold'}>Edit goal</Typography>
          <Box sx={{ ml: "auto" }}>
            <IconButton size='small' onClick={onClose}>
              <Close fontSize="small"/>
            </IconButton>
          </Box>
        </Toolbar>
        <Box sx={{ display: "flex", flexDirection: "column", p: 2, minWidth: 300 }}>
          <TextField multiline onChange={onChange} value={desc} />
          <Button
            variant={desc !== description ? "contained" : "outlined"}
            sx={{ mt: 1, mb: 2 }}
            loading={update.isPending}
            onClick={onUpdate}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            sx={{ mb: 1 }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            loading={d.isPending}
            color="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        </Box>
      </Dialog>
    </>
  );
};
